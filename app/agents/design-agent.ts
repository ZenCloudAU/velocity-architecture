import { Anthropic } from '@anthropic-ai/sdk';
import { EARequest, Artefact, VAFFramework } from '../types/index';
import { logger } from '../logger';

const client = new Anthropic();

export const designAgent = {
  async generate(request: EARequest, framework: VAFFramework): Promise<Artefact> {
    const startTime = Date.now();

    const systemPrompt = buildSystemPrompt(framework);

    try {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Generate an Architecture Decision Record (ADR) (VP3) for the following technical architecture challenge:

Topic: ${request.topic}

Context: ${request.context || 'No additional context provided.'}

Constraints: ${request.constraints?.join(', ') || 'No constraints provided.'}

Requirements:
1. Follow the ISO 42010 ADR structure exactly
2. Use technical, precise, implementation-focused tone
3. Include: Decision Context, Decision, Rationale, Consequences, Fitness Functions
4. Align with governance (VP1) and strategy (VP2) if provided
5. Reference VAF concepts (Truth, Integrity Gap, Compliance)
6. Format as valid Markdown
7. Do not include preamble or explanation; output the artefact only`,
          },
        ],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      const artefact: Artefact = {
        id: `${request.id}-design`,
        type: 'design',
        content: content.text,
        metadata: {
          requestId: request.id,
          generatedBy: 'design-agent',
          timestamp: new Date(),
          vafVersion: '2.0.0',
          tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
          validationPassed: false,
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
        'Design artefact generated'
      );

      return artefact;
    } catch (error) {
      logger.error(
        {
          requestId: request.id,
          error: error instanceof Error ? error.message : String(error),
        },
        'Design artefact generation failed'
      );
      throw error;
    }
  },
};

function buildSystemPrompt(framework: VAFFramework): string {
  return `You are the Design Agent for the Velocity Architecture Framework (VAF) v2.

Your role: Generate technical artefacts (Architecture Decision Records — VP3) that establish implementation decisions and fitness functions.

## VAF Framework Context

### Framework Specification
${framework.spec.slice(0, 5000)}...

### Viewpoint 3: Truth (Design)
${framework.viewpoints.vp3?.slice(0, 3000) || 'Not available'}...

### Correspondence Rules (Must Comply)
${framework.correspondenceRules.slice(0, 3000)}...

### Foundation Layer (Guiding Principles)
${framework.foundation.slice(0, 2000)}...

### Reference Example
${framework.examples.design?.slice(0, 2000) || 'Not available'}...

## Your Constraints

1. **Tone:** Technical, precise, implementation-focused. Ground in facts.
2. **Structure:** Always follow VP3 (ADR) structure.
3. **VAF Concepts:** Apply Truth, Integrity Gap, Compliance, Fitness Functions.
4. **Alignment:** Must align with governance (VP1) AND strategy (VP2) when available.
5. **Output:** Valid Markdown only. No preamble. The artefact is your output.
6. **Quality:** Match the style of the reference example.

## Generation Rules

- Define decision context precisely (what problem are we solving?).
- State the decision clearly (what are we choosing?).
- Provide detailed rationale (why this decision?).
- Identify consequences (what changes, costs, risks?).
- Define fitness functions (how do we measure success?).
- Reference implementation constraints (technical, organizational).
- If alignment with governance or strategy is impossible, flag the contradiction.
- If you cannot generate a compliant artefact, explain why and fail loudly.`;
}
