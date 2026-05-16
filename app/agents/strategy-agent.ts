import { Anthropic } from '@anthropic-ai/sdk';
import { EARequest, Artefact, VAFFramework } from '../types/index';
import { logger } from '../logger';

const client = new Anthropic();

export const strategyAgent = {
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
            content: `Generate a Trade-off Matrix (VP2) for the following enterprise strategy challenge:

Topic: ${request.topic}

Context: ${request.context || 'No additional context provided.'}

Constraints: ${request.constraints?.join(', ') || 'No constraints provided.'}

Requirements:
1. Follow the ISO 42010 Trade-off Matrix structure exactly
2. Use narrative-driven, evidence-based tone
3. Include: Decision Options, Trade-offs, Sequencing Rationale, Investment Profile
4. Align with governance artefact if provided (same request)
5. Reference VAF concepts (Decision Latency, Velocity of Truth, Integrity Gap)
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
        id: `${request.id}-strategy`,
        type: 'strategy',
        content: content.text,
        metadata: {
          requestId: request.id,
          generatedBy: 'strategy-agent',
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
        'Strategy artefact generated'
      );

      return artefact;
    } catch (error) {
      logger.error(
        {
          requestId: request.id,
          error: error instanceof Error ? error.message : String(error),
        },
        'Strategy artefact generation failed'
      );
      throw error;
    }
  },
};

function buildSystemPrompt(framework: VAFFramework): string {
  return `You are the Strategy Agent for the Velocity Architecture Framework (VAF) v2.

Your role: Generate strategic artefacts (Trade-off Matrix — VP2) that establish decision sequencing and investment priorities.

## VAF Framework Context

### Framework Specification
${framework.spec.slice(0, 5000)}...

### Viewpoint 2: Decision (Strategy)
${framework.viewpoints.vp2?.slice(0, 3000) || 'Not available'}...

### Correspondence Rules (Must Comply)
${framework.correspondenceRules.slice(0, 3000)}...

### Foundation Layer (Guiding Principles)
${framework.foundation.slice(0, 2000)}...

### Reference Example
${framework.examples.strategy?.slice(0, 2000) || 'Not available'}...

## Your Constraints

1. **Tone:** Narrative-driven, evidence-based, reasoning transparent.
2. **Structure:** Always follow VP2 (Trade-off Matrix) structure.
3. **VAF Concepts:** Apply Decision Latency, Velocity of Truth, Integrity Gap, Sequencing Rationale.
4. **Alignment:** Must align with governance artefact (VP1) from same request when available.
5. **Output:** Valid Markdown only. No preamble. The artefact is your output.
6. **Quality:** Match the style of the reference example.

## Generation Rules

- Identify trade-offs explicitly. Show costs and benefits.
- Provide sequencing rationale (why this order of decisions).
- Quantify investment profiles where possible (cost, effort, risk).
- Assess decision latency (how quickly can each decision be implemented).
- If alignment with governance is impossible, flag the contradiction.
- If you cannot generate a compliant artefact, explain why and fail loudly.`;
}
