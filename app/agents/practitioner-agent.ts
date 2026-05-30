import Anthropic from '@anthropic-ai/sdk';
import { loadVAFFramework } from '../kb-loader';
import { EARequest, ArtefactType } from '../types/index';
import { logger } from '../logger';

const client = new Anthropic();

// Handles: compliance-report, spec-validation, integrity-arc, and legacy 'practitioner'
export const practitionerAgent = {
  async generate(req: EARequest, type: ArtefactType, label: string): Promise<string> {
    const fw = await loadVAFFramework();
    logger.info({ type, label }, 'Practitioner agent generating');

    const typeInstructions: Record<string, string> = {
      'compliance-report': `Generate a Compliance Report artefact — an architectural compliance assessment.
Structure: Executive Summary, Compliance Scope (standards and policies assessed), Assessment Findings (each finding: requirement, status Pass/Fail/Partial, evidence, remediation required), Policy Violations Register, Exception Register, Regulatory Mapping (requirements to architecture controls), Compliance Score, Remediation Roadmap, Sign-off Requirements.
Be specific. Name the requirements. Name the violations.`,

      'spec-validation': `Generate a Spec Validation Report artefact — a requirements traceability and completeness assessment.
Structure: Executive Summary, Specification Inventory (all requirements listed), Traceability Matrix (requirement → architecture component → test evidence), Completeness Assessment (what is missing), Consistency Check (where requirements conflict), Assumption Register (what the spec assumes but doesn't state), Risk from Gaps, Recommended Additions, Acceptance Recommendation.
Be exhaustive about what is and isn't covered.`,

      'integrity-arc': `Generate a VP6 Integrity Arc artefact — an architect's self-assessment of operating integrity on this engagement.
Structure: Engagement Context, Integrity Assessment across five positions (Authorship — are recommendations yours?, Boundaries — are scope lines held?, Refusal — what was declined and why?, Staying — is there a reason to stay?, Exit — what would trigger withdrawal), Sacred Cows (assumptions being carried that haven't been challenged), Analytic Tests (five integrity questions answered honestly), Velocity Signal (overall integrity rating 1-10 with rationale), Corrective Intent.
Be forensic. This is a practitioner instrument, not a client document.`,

      'practitioner': `Generate a VP6 Integrity Arc artefact following the VAF framework specification.
Structure: Five integrity positions, Sacred Cows, Analytic Tests, Velocity Signal.`,
    };

    const instruction = typeInstructions[type] || typeInstructions['practitioner'];

    const systemPrompt = `You are the VAF Agentic Architect — an ISO 42010:2022 conformant enterprise architecture agent.
You produce practitioner-grade artefacts with unflinching honesty. These are instruments for serious architects.
Framework Spec:
${fw.spec}
VP6 Practitioner Viewpoint:
${fw.viewpoints.vp6}
Correspondence Rules:
${fw.correspondenceRules}
Example:
${fw.examples.practitioner}`;

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
