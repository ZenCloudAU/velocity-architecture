import Anthropic from '@anthropic-ai/sdk';
import { loadVAFFramework } from '../kb-loader';
import { EARequest, ArtefactType } from '../types/index';
import { logger } from '../logger';

const client = new Anthropic();

// Handles: guardrail-canvas, capability-map, and legacy 'governance'
export const governanceAgent = {
  async generate(req: EARequest, type: ArtefactType, label: string): Promise<string> {
    const fw = await loadVAFFramework();
    logger.info({ type, label }, 'Governance agent generating');

    const typeInstructions: Record<string, string> = {
      'guardrail-canvas': `Generate a comprehensive VP1 Guardrail Canvas artefact.
Structure: Executive Summary, Strategic Intent, Guardrails (non-negotiable constraints), Out of Scope, Success Criteria (12-month), Stop Conditions, Unverified Assumptions, Sign-off.
Tone: forensic, declarative. No hedging. Every guardrail must be specific and testable.`,

      'capability-map': `Generate a Capability Map artefact at L2 resolution.
Structure: Executive Summary, Customer-Facing Capabilities, Enabling Capabilities, Governing Capabilities, Capability Gaps (relative to topic), Heat Map Assessment (H/M/L maturity per capability), Recommended Investments.
Tone: analytical, evidence-based. Map to the specific domain and constraints provided.`,

      'governance': `Generate a VP1 Guardrail Canvas artefact following the VAF framework specification.
Structure: Executive Summary, Strategic Intent, Guardrails, Out of Scope, Success Criteria, Stop Conditions, Assumptions, Sign-off.`,
    };

    const instruction = typeInstructions[type] || typeInstructions['governance'];

    const systemPrompt = `You are the VAF Agentic Architect — an ISO 42010:2022 conformant enterprise architecture agent.
You operate from the Velocity Architecture Framework™ knowledge base.
You produce forensic, declarative artefacts. No hedging. No filler. Every statement is specific and actionable.
Framework Spec:
${fw.spec}
VP1 Direction Viewpoint:
${fw.viewpoints.vp1}
Correspondence Rules:
${fw.correspondenceRules}
Example Artefact:
${fw.examples.governance}`;

    const userPrompt = `${instruction}

Topic: ${req.topic}
${req.context ? `Context: ${req.context}` : ''}
${req.constraints?.length ? `Constraints: ${req.constraints.join(', ')}` : ''}

Produce the complete ${label} artefact now. Use Markdown formatting. Minimum 800 words. Be specific to the topic provided.`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');
    return content.text;
  },
};
