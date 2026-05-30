import Anthropic from '@anthropic-ai/sdk';
import { loadVAFFramework } from '../kb-loader';
import { EARequest, ArtefactType } from '../types/index';
import { logger } from '../logger';

const client = new Anthropic();

// Handles: value-dashboard, and legacy 'rhythm'
export const rhythmAgent = {
  async generate(req: EARequest, type: ArtefactType, label: string): Promise<string> {
    const fw = await loadVAFFramework();
    logger.info({ type, label }, 'Rhythm agent generating');

    const typeInstructions: Record<string, string> = {
      'value-dashboard': `Generate a Value Tracking Dashboard artefact covering benefit realisation and KPI performance.
Structure: Executive Summary, Value Hypothesis (what value was expected), KPI Dashboard (each KPI: target, current, trend, owner), Benefits Register (each benefit: description, expected value, realised to date, realisation confidence), Investment-to-Value Ratio, Variance Analysis (where value is not being realised and why), Next Period Commitments, Board-level Summary (one paragraph).
Be specific about numbers, owners, and timelines.`,

      'rhythm': `Generate a VP5 Pulse System artefact following the VAF framework specification.
Structure: Pulse Tier Selection, Pulse Briefing, Board agenda, Open decisions, Escalation protocol, Anti-patterns for this context.`,
    };

    const instruction = typeInstructions[type] || typeInstructions['rhythm'];

    const systemPrompt = `You are the VAF Agentic Architect — an ISO 42010:2022 conformant enterprise architecture agent.
You produce precise operating artefacts that sustain architectural governance rhythm.
Framework Spec:
${fw.spec}
VP5 Rhythm Viewpoint:
${fw.viewpoints.vp5}
Correspondence Rules:
${fw.correspondenceRules}
Example:
${fw.examples.rhythm}`;

    const userPrompt = `${instruction}

Topic: ${req.topic}
${req.context ? `Context: ${req.context}` : ''}
${req.constraints?.length ? `Constraints: ${req.constraints.join(', ')}` : ''}

Produce the complete ${label} now. Use Markdown formatting. Minimum 800 words. Be specific to the topic.`;

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
