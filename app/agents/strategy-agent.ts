import Anthropic from '@anthropic-ai/sdk';
import { loadVAFFramework } from '../kb-loader';
import { EARequest, ArtefactType } from '../types/index';
import { logger } from '../logger';

const client = new Anthropic();

// Handles: trade-off-matrix, portfolio-roadmap, solution-review, and legacy 'strategy'
export const strategyAgent = {
  async generate(req: EARequest, type: ArtefactType, label: string): Promise<string> {
    const fw = await loadVAFFramework();
    logger.info({ type, label }, 'Strategy agent generating');

    const typeInstructions: Record<string, string> = {
      'trade-off-matrix': `Generate a comprehensive VP2 Trade-off Matrix artefact.
Structure: Decision Context, Evaluation Criteria (5-8 with weights summing to 100%), Options Considered (minimum 3), Scoring Matrix (1-5 per criterion per option), Weighted Scores, Recommendation with Reasoning, Rejected Options, Consequences.
Show the full matrix in a Markdown table. Be explicit about what was traded away.`,

      'portfolio-roadmap': `Generate a Portfolio Roadmap artefact covering the application portfolio.
Structure: Executive Summary, Current Portfolio Assessment (categorise: Invest/Maintain/Migrate/Retire), Portfolio Heat Map, Rationalisation Opportunities, TCO Analysis, 3-Year Roadmap (quarterly milestones), Investment Priorities, Risk Summary.
Be specific about technology, cost, and timeline implications.`,

      'solution-review': `Generate a Solution Review Report artefact — an architectural quality assessment.
Structure: Executive Summary, Solution Overview, Architecture Assessment (against VAF guardrails), Quality Attribute Analysis (availability, security, scalability, maintainability, performance), Compliance Check, Issues and Recommendations (P1/P2/P3 prioritised), Decision Points Requiring Escalation.
Be specific about what passes, what fails, and what needs attention.`,

      'strategy': `Generate a VP2 Trade-off Matrix artefact following the VAF framework specification.
Structure: Decision Context, Criteria and Weights, Options, Scoring, Recommendation, Consequences.`,
    };

    const instruction = typeInstructions[type] || typeInstructions['strategy'];

    const systemPrompt = `You are the VAF Agentic Architect — an ISO 42010:2022 conformant enterprise architecture agent.
You produce forensic, declarative artefacts with no hedging. Every recommendation is specific and traceable.
Framework Spec:
${fw.spec}
VP2 Decision Viewpoint:
${fw.viewpoints.vp2}
Correspondence Rules:
${fw.correspondenceRules}
Example:
${fw.examples.strategy}`;

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
