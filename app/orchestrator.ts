import { governanceAgent } from './agents/governance-agent';
import { strategyAgent } from './agents/strategy-agent';
import { designAgent } from './agents/design-agent';
import { velocityAgent } from './agents/velocity-agent';
import { rhythmAgent } from './agents/rhythm-agent';
import { practitionerAgent } from './agents/practitioner-agent';
import { EARequest, EAResponse, Artefact, ArtefactType } from './types/index';
import { logger } from './logger';

// Maps all 16 agent types to a base generator + context label
const AGENT_ROUTING: Record<ArtefactType, { generator: string; label: string; githubFolder: string }> = {
  // Strategic EA
  'guardrail-canvas':      { generator: 'governance',    label: 'VP1 Guardrail Canvas',        githubFolder: 'governance'    },
  'trade-off-matrix':      { generator: 'strategy',      label: 'VP2 Trade-off Matrix',         githubFolder: 'strategy'      },
  'capability-map':        { generator: 'governance',    label: 'Capability Map',               githubFolder: 'governance'    },
  'portfolio-roadmap':     { generator: 'strategy',      label: 'Portfolio Roadmap',            githubFolder: 'strategy'      },
  // Architecture Design
  'domain-model':          { generator: 'design',        label: 'Domain Model',                 githubFolder: 'design'        },
  'data-architecture':     { generator: 'velocity',      label: 'Data Architecture Blueprint',  githubFolder: 'design'        },
  'application-blueprint': { generator: 'design',        label: 'Application Blueprint',        githubFolder: 'design'        },
  'integration-map':       { generator: 'velocity',      label: 'Integration Map',              githubFolder: 'design'        },
  'technology-radar':      { generator: 'velocity',      label: 'Technology Radar',             githubFolder: 'governance'    },
  // Governance & Assurance
  'compliance-report':     { generator: 'practitioner',  label: 'Compliance Report',            githubFolder: 'governance'    },
  'risk-register':         { generator: 'velocity',      label: 'Risk Register',                githubFolder: 'governance'    },
  'tech-debt-dashboard':   { generator: 'velocity',      label: 'Technical Debt Dashboard',     githubFolder: 'design'        },
  'adr':                   { generator: 'design',        label: 'VP3 ADR',                      githubFolder: 'design'        },
  // Delivery & Value
  'solution-review':       { generator: 'strategy',      label: 'Solution Review Report',       githubFolder: 'strategy'      },
  'spec-validation':       { generator: 'practitioner',  label: 'Spec Validation Report',       githubFolder: 'design'        },
  'integrity-arc':         { generator: 'practitioner',  label: 'VP6 Integrity Arc',            githubFolder: 'practitioner'  },
  'value-dashboard':       { generator: 'rhythm',        label: 'Value Dashboard',              githubFolder: 'governance'    },
  // Legacy aliases
  'governance':            { generator: 'governance',    label: 'VP1 Guardrail Canvas',        githubFolder: 'governance'    },
  'strategy':              { generator: 'strategy',      label: 'VP2 Trade-off Matrix',         githubFolder: 'strategy'      },
  'design':                { generator: 'design',        label: 'VP3 ADR',                      githubFolder: 'design'        },
  'velocity':              { generator: 'velocity',      label: 'VP4 Velocity Dashboard',       githubFolder: 'governance'    },
  'rhythm':                { generator: 'rhythm',        label: 'VP5 Pulse System',             githubFolder: 'governance'    },
  'practitioner':          { generator: 'practitioner',  label: 'VP6 Integrity Arc',            githubFolder: 'practitioner'  },
};

const GENERATORS: Record<string, (req: EARequest, type: ArtefactType, label: string) => Promise<string>> = {
  governance:   (req, type, label) => governanceAgent.generate(req, type, label),
  strategy:     (req, type, label) => strategyAgent.generate(req, type, label),
  design:       (req, type, label) => designAgent.generate(req, type, label),
  velocity:     (req, type, label) => velocityAgent.generate(req, type, label),
  rhythm:       (req, type, label) => rhythmAgent.generate(req, type, label),
  practitioner: (req, type, label) => practitionerAgent.generate(req, type, label),
};

export const orchestrator = {
  async execute(req: EARequest): Promise<EAResponse> {
    const start = Date.now();
    logger.info({ requestId: req.id, artefacts: req.requestedArtefacts }, 'Orchestrator executing');

    const artefacts: Artefact[] = [];
    const errors: string[] = [];

    // Parallel generation across all requested types
    const tasks = req.requestedArtefacts.map(async (type) => {
      const routing = AGENT_ROUTING[type];
      if (!routing) {
        errors.push(`Unknown artefact type: ${type}`);
        return;
      }

      const generator = GENERATORS[routing.generator];
      if (!generator) {
        errors.push(`No generator for: ${type}`);
        return;
      }

      try {
        const content = await generator(req, type, routing.label);
        artefacts.push({
          id: `${req.id}-${type}`,
          type,
          content,
          metadata: {
            generatedAt: new Date().toISOString(),
            tokens: Math.round(content.length / 4),
            model: 'claude-sonnet-4-6',
            viewpoint: routing.label,
            githubPath: `artefacts/${routing.githubFolder}`,
          },
        });
        logger.info({ type, label: routing.label }, 'Artefact generated');
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${type}: ${msg}`);
        logger.error({ type, error: msg }, 'Agent failed');
      }
    });

    await Promise.allSettled(tasks);

    const duration = Date.now() - start;
    logger.info({ requestId: req.id, count: artefacts.length, errors: errors.length, duration }, 'Orchestration complete');

    return {
      requestId: req.id,
      phase: 'complete',
      artefacts,
      errors,
      duration,
    };
  },
};
