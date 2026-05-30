import Anthropic from '@anthropic-ai/sdk';
import { loadVAFFramework } from '../kb-loader';
import { EARequest, ArtefactType } from '../types/index';
import { logger } from '../logger';

const client = new Anthropic();

// Handles: data-architecture, integration-map, technology-radar, risk-register, tech-debt-dashboard, and legacy 'velocity'
export const velocityAgent = {
  async generate(req: EARequest, type: ArtefactType, label: string): Promise<string> {
    const fw = await loadVAFFramework();
    logger.info({ type, label }, 'Velocity agent generating');

    const typeInstructions: Record<string, string> = {
      'data-architecture': `Generate a Data Architecture Blueprint artefact.
Structure: Executive Summary, Data Domain Map (key domains with owners), Data Governance Model, Data Quality Standards, Master Data Management Approach, Data Lineage (key flows), Privacy and Classification Framework, Tooling and Platform Decisions, Data Debt Inventory, Roadmap.
Be specific about ownership, standards, and tooling choices.`,

      'integration-map': `Generate an Integration Architecture artefact covering the integration landscape.
Structure: Executive Summary, Integration Principles, Current Integration Inventory, Integration Patterns (approved for use), API Governance Model, Event-Driven vs Request-Response boundaries, Key Integration Flows (described with sequence), Dependency Map, Technical Debt in Integration, Target State Integration Platform.
Name the actual integration technologies and patterns.`,

      'technology-radar': `Generate a Technology Radar artefact for the domain.
Structure: Executive Summary, Radar Summary Table (Adopt/Trial/Assess/Hold per technology), Languages & Frameworks section, Tools section, Platforms section, Techniques section, Changes from Last Quarter, Decision Rationale for each entry, Governance Implications.
Each entry: name, ring, rationale, constraints or conditions.`,

      'risk-register': `Generate an Architectural Risk Register artefact.
Structure: Executive Summary, Risk Inventory (each with: ID, description, type, likelihood H/M/L, impact H/M/L, decision latency date, owner, mitigation), Overdue Items (past latency date), Risk Heat Map (narrative), Top 3 Risks requiring immediate action, Risk Velocity Trend.
Be specific. Name the risks. Don't use generic descriptions.`,

      'tech-debt-dashboard': `Generate a Technical Debt Dashboard artefact.
Structure: Executive Summary, Debt Inventory (by category: Architecture/Code/Data/Infrastructure/Test), Debt Severity Assessment (each item: description, age, remediation cost estimate, risk if unaddressed), Debt Heat Map by system, Prioritised Remediation Roadmap (quarterly), Backlog Metrics, Debt Velocity Trend.
Be specific about what the debt is and what it costs.`,

      'velocity': `Generate a VP4 Velocity Dashboard and ADL Index following the VAF framework specification.
Structure: Decision Health Summary, ADL Index, Open Decisions, Recently Superseded, Velocity Score, Trend.`,
    };

    const instruction = typeInstructions[type] || typeInstructions['velocity'];

    const systemPrompt = `You are the VAF Agentic Architect — an ISO 42010:2022 conformant enterprise architecture agent.
You produce precise, control-surface artefacts. Every item is specific, owned, and actionable.
Framework Spec:
${fw.spec}
VP4 Velocity Viewpoint:
${fw.viewpoints.vp4}
Correspondence Rules:
${fw.correspondenceRules}
Example:
${fw.examples.velocity}`;

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
