/**
 * VAF v2 — Validation Agent
 * app/agents/validation-agent.ts
 *
 * Validates artefact output from governance, strategy, and design agents.
 * Fix: strips markdown code fences from Claude responses before JSON.parse().
 */

import Anthropic from "@anthropic-ai/sdk";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ArtefactType = "governance" | "strategy" | "design";

export interface ValidationInput {
  artefactType: ArtefactType;
  artefactContent: string;
  context?: Record<string, unknown>;
}

export interface ValidationResult {
  valid: boolean;
  score: number; // 0–100
  issues: ValidationIssue[];
  recommendations: string[];
  summary: string;
}

export interface ValidationIssue {
  severity: "critical" | "major" | "minor";
  field: string;
  message: string;
}

export interface ValidationAgentResponse {
  success: boolean;
  artefactType: ArtefactType;
  validation: ValidationResult;
  rawResponse?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/**
 * Strips markdown code fences that Claude may wrap around JSON responses.
 * Handles: ```json ... ``` and ``` ... ```
 */
function stripCodeFences(raw: string): string {
  return raw
    .replace(/^```(?:json|JSON)?\s*\n?/i, "")
    .replace(/\n?\s*```\s*$/i, "")
    .trim();
}

/**
 * Extracts the first text block from a Claude content array and strips fences.
 */
function extractText(
  content: Anthropic.Messages.ContentBlock[]
): string {
  const text = content
    .filter((block): block is Anthropic.Messages.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
  return stripCodeFences(text);
}

/**
 * Safely parses JSON after stripping code fences.
 */
function safeParseJSON<T = unknown>(raw: string): { data: T | null; error: string | null } {
  const cleaned = stripCodeFences(raw);
  try {
    const data = JSON.parse(cleaned) as T;
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "JSON parse failed",
    };
  }
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are the VAF v2 Validation Agent. Your role is to validate artefacts 
produced by the governance, strategy, and design agents within the Velocity Architecture Framework.

You must respond ONLY with a valid JSON object — no markdown, no code fences, no preamble, 
no explanation. Raw JSON only.

The JSON must conform exactly to this schema:
{
  "valid": boolean,
  "score": number (0–100),
  "issues": [
    {
      "severity": "critical" | "major" | "minor",
      "field": string,
      "message": string
    }
  ],
  "recommendations": string[],
  "summary": string
}

Validation criteria by artefact type:
- governance: completeness of controls, policy alignment, risk coverage, decision altitude clarity
- strategy: alignment to business outcomes, coherence, measurability, time-horizon coverage
- design: technical correctness, pattern compliance, scalability considerations, documentation quality

Score interpretation:
- 90–100: Production ready
- 75–89: Minor remediation required
- 50–74: Major gaps — revise before use
- 0–49: Critical failures — reject and regenerate`;

function buildUserPrompt(input: ValidationInput): string {
  return `Validate the following ${input.artefactType} artefact.

${input.context ? `Context: ${JSON.stringify(input.context, null, 2)}\n` : ""}
--- ARTEFACT START ---
${input.artefactContent}
--- ARTEFACT END ---

Return only the JSON validation result. No code fences. No preamble.`;
}

// ---------------------------------------------------------------------------
// Validation Agent
// ---------------------------------------------------------------------------

export class ValidationAgent {
  private client: Anthropic;
  private model: string;

  constructor(options?: { model?: string; apiKey?: string }) {
    this.client = new Anthropic({
      apiKey: options?.apiKey ?? process.env.ANTHROPIC_API_KEY,
    });
    this.model = options?.model ?? "claude-sonnet-4-6";
  }

  async validate(input: ValidationInput): Promise<ValidationAgentResponse> {
    let rawResponse: string | undefined;

    try {
      const message = await this.client.messages.create({
        model: this.model,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: buildUserPrompt(input),
          },
        ],
      });

      // Extract text and strip any code fences Claude included despite instructions
      rawResponse = message.content
        .filter((b): b is Anthropic.Messages.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("");

      const { data, error } = safeParseJSON<ValidationResult>(rawResponse);

      if (error || !data) {
        return {
          success: false,
          artefactType: input.artefactType,
          validation: this.fallbackValidation(`JSON parse failed: ${error}`),
          rawResponse,
          error: `Parse error: ${error}`,
        };
      }

      // Normalise: ensure required fields are present
      const validation: ValidationResult = {
        valid: Boolean(data.valid),
        score: typeof data.score === "number" ? Math.min(100, Math.max(0, data.score)) : 0,
        issues: Array.isArray(data.issues) ? data.issues : [],
        recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
        summary: typeof data.summary === "string" ? data.summary : "No summary returned.",
      };

      return {
        success: true,
        artefactType: input.artefactType,
        validation,
        rawResponse,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return {
        success: false,
        artefactType: input.artefactType,
        validation: this.fallbackValidation(errorMessage),
        rawResponse,
        error: errorMessage,
      };
    }
  }

  async validateAll(inputs: ValidationInput[]): Promise<ValidationAgentResponse[]> {
    return Promise.all(inputs.map((input) => this.validate(input)));
  }

  private fallbackValidation(reason: string): ValidationResult {
    return {
      valid: false,
      score: 0,
      issues: [
        {
          severity: "critical",
          field: "agent",
          message: `Validation agent failed to produce a parseable result: ${reason}`,
        },
      ],
      recommendations: ["Retry validation. If persistent, inspect raw Claude response for fence stripping issues."],
      summary: `Validation failed internally. Reason: ${reason}`,
    };
  }
}

// ---------------------------------------------------------------------------
// Convenience export
// ---------------------------------------------------------------------------

export async function runValidationAgent(
  input: ValidationInput
): Promise<ValidationAgentResponse> {
  const agent = new ValidationAgent();
  return agent.validate(input);
}

export default ValidationAgent;
