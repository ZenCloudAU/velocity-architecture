import { Anthropic } from '@anthropic-ai/sdk';
import { EARequest, Artefact, VAFFramework } from '../types/index';
import { logger } from '../logger';

const client = new Anthropic();

export const governanceAgent = {
  async generate(request: EARequest, framework: VAFFramework): Promise<Artefact> {
    const startTime = Date.now();
    const startTokens = 0;

    const systemPrompt = buildSystemPrompt(framework);

    try {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Generate a Guardrail Canvas (VP1) for the following enterprise architecture challenge:

Topic: ${request.topic}

Context: ${request.context || 'No additional context provided.'}

Constraints: ${request.constraints?.join(', ') || 'No constraints provided.'}

Requirements:
1. Follow the ISO 42010 Guardrail Canvas structure exactly
2. Use forensic, declarative tone (no hedging, no speculation)
3. Include: Decision Authority, Governance Drag Analysis, Compliance Mappings, Altitude Collapse Risk
4. Reference VAF concepts (Integrity Gap, Decision Latency, Velocity of Truth)
5. Format as valid Markdown
6. Do not include preamble or explanation; output the artefact only`,
          },
        ],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      const artefact: Artefact = {
        id: `${request.id}-governance`,
        type: 'governance',
        content: content.text,
        metadata: {
          requestId: request.id,
          generatedBy: 'governance-agent',
          timestamp: new Date(),
          vafVersion: '2.0.0',
          tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
          validationPassed: false, // Set by validation agent
        },
      };

      const duration = Date.now() - startTime;
      logger.info(
        {
          requestId: request.id,
          type: artefact.type,
          tokens: artefact.metadata.tokensUsed,
          durationMs: duration,
        },
        'Governance artefact generated'
      );

      return artefact;
    } catch (error) {
      logger.error(
        {
          requestId: request.id,
          error: error instanceof Error ? error.message : String(error),
        },
        'Governance artefact generation failed'
      );
      throw error;
    }
  },
};

function buildSystemPrompt(framework: VAFFramework): string {
  return `You are the Governance Agent for the Velocity Architecture Framework (VAF) v2.

Your role: Generate authoritative governance artefacts (Guardrail Canvas — VP1) that establish decision authority and compliance frameworks for enterprise architecture.

## VAF Framework Context

### Framework Specification
${framework.spec.slice(0, 5000)}...

### Viewpoint 1: Direction (Governance)
${framework.viewpoints.vp1?.slice(0, 3000) || 'Not available'}...

### Correspondence Rules (Must Comply)
${framework.correspondenceRules.slice(0, 3000)}...

### Foundation Layer (Guiding Principles)
${framework.foundation.slice(0, 2000)}...

### Reference Example
${framework.examples.governance?.slice(0, 2000) || 'Not available'}...

## Your Constraints

1. **Tone:** Forensic, declarative, no hedging. State facts with precision.
2. **Structure:** Always follow VP1 (Guardrail Canvas) structure. Never deviate.
3. **VAF Concepts:** Apply Integrity Gap, Decision Latency, Velocity of Truth, Governance Drag, Altitude Collapse.
4. **Compliance:** Every artefact must satisfy the correspondence rules listed above.
5. **Output:** Valid Markdown only. No preamble. No explanation. The artefact is your output.
6. **Quality:** Match the style and precision of the reference example.

## Generation Rules

- Do not make assumptions. If information is missing, state it explicitly.
- Ground every decision authority claim in the provided context.
- Identify governance drag (implicit vs. explicit decision points).
- Assess altitude collapse risk (misalignment between strategic intent and operational reality).
- Use bullet points for clarity. Use clear hierarchies.
- If you cannot generate a compliant artefact, explain why and fail loudly.`;
}
