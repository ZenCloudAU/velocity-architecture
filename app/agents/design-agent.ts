import Anthropic from '@anthropic-ai/sdk';
import { loadVAFFramework } from '../kb-loader';
import { EARequest, ArtefactType } from '../types/index';
import { logger } from '../logger';

const client = new Anthropic();

// Handles: adr, domain-model, application-blueprint, and legacy 'design'
export const designAgent = {
  async generate(req: EARequest, type: ArtefactType, label: string): Promise<string> {
    const fw = await loadVAFFramework();
    logger.info({ type, label }, 'Design agent generating');

    const typeInstructions: Record<string, string> = {
      'adr': `Generate a comprehensive VP3 Architecture Decision Record (ADR).
Structure: Decision Title (verb+noun), Status, Context (what required a decision), Decision (one sentence), Options Considered (minimum 3), Reasoning (why this option), Consequences (what is now binding), Fitness Functions (how we know if this holds), Related Decisions.
Be forensic. Record the actual reasoning, not a summary of it.`,

      'domain-model': `Generate a Domain Model artefact — a structured vocabulary alignment for the domain.
Structure: Executive Summary, Key Concepts (name + definition for each), Concept Relationships, Bounded Contexts, Contested Definitions (where teams use the same word differently), Agreed Definitions (resolved in this artefact), Events and Commands, Domain Rules, Integration Points.
Write definitions in plain language. Name every concept precisely.`,

      'application-blueprint': `Generate an Application Blueprint artefact for the target state architecture.
Structure: Executive Summary, Current State Assessment, Target State Architecture, Application Components (with responsibilities and interfaces), Key Design Decisions (as mini-ADRs), Technology Choices, Integration Pattern, Data Flow, Security Controls, Deployment Model, Migration Path.
Be specific about what changes and in what sequence.`,

      'design': `Generate a VP3 Architecture Decision Record following the VAF framework specification.
Structure: Title, Status, Context, Decision, Options, Reasoning, Consequences, Related ADRs.`,
    };

    const instruction = typeInstructions[type] || typeInstructions['design'];

    const systemPrompt = `You are the VAF Agentic Architect — an ISO 42010:2022 conformant enterprise architecture agent.
You produce precise, forensic artefacts. Every decision is recorded with its full reasoning.
Framework Spec:
${fw.spec}
VP3 Truth Viewpoint:
${fw.viewpoints.vp3}
Correspondence Rules:
${fw.correspondenceRules}
Example:
${fw.examples.design}`;

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
