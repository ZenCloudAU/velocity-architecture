import { Anthropic } from '@anthropic-ai/sdk';
import { EARequest, TaskPlan, OrchestratorState, Artefact, VAFFramework } from './types/index';
import { governanceAgent } from './agents/governance-agent';
import { strategyAgent } from './agents/strategy-agent';
import { designAgent } from './agents/design-agent';
import { validationAgent } from './agents/validation-agent';
import { loadVAFFramework } from './kb-loader';
import { logger } from './logger';

class Orchestrator {
  private client = new Anthropic();
  private framework: VAFFramework | null = null;

  async execute(request: EARequest): Promise<OrchestratorState> {
    const state: OrchestratorState = {
      requestId: request.id,
      phase: 'planning',
      artefacts: [],
      errors: [],
      startTime: new Date(),
    };

    try {
      // Load VAF framework
      logger.info({ requestId: request.id }, 'Phase: Loading VAF Framework');
      if (!this.framework) {
        this.framework = await loadVAFFramework();
      }

      // Phase 1: Planning
      logger.info({ requestId: request.id }, 'Phase: Planning');
      state.phase = 'planning';
      const plan = await this.createPlan(request);

      if (!plan || !plan.artefactsNeeded || plan.artefactsNeeded.length === 0) {
        state.errors.push('Planning failed: no artefacts identified');
        state.phase = 'failed';
        return state;
      }

      // Phase 2: Generation
      logger.info({ requestId: request.id, artefactsNeeded: plan.artefactsNeeded }, 'Phase: Generation');
      state.phase = 'generation';

      for (const artefactType of plan.artefactsNeeded) {
        try {
          const artefact = await this.generateArtefact(request, artefactType);
          if (artefact) {
            state.artefacts.push(artefact);
          }
        } catch (error) {
          state.errors.push(`Generation failed for ${artefactType}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }

      if (state.artefacts.length === 0) {
        state.phase = 'failed';
        return state;
      }

      // Phase 3: Validation
      logger.info({ requestId: request.id, artefactCount: state.artefacts.length }, 'Phase: Validation');
      state.phase = 'validation';

      for (const artefact of state.artefacts) {
        try {
          const isValid = await validationAgent.validate(artefact, this.framework, state.artefacts);
          if (!isValid) {
            state.errors.push(`Validation failed for ${artefact.type}`);
          }
        } catch (error) {
          state.errors.push(`Validation error for ${artefact.type}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }

      // Phase 4: Publishing (if validation passed or allowed to proceed)
      // Note: In MVP, we skip publishing to GitHub for now
      state.phase = 'complete';
      state.endTime = new Date();
      state.duration = state.endTime.getTime() - state.startTime.getTime();

      logger.info(
        {
          requestId: request.id,
          artefactCount: state.artefacts.length,
          durationMs: state.duration,
          errors: state.errors.length,
        },
        'Request complete'
      );

      return state;
    } catch (error) {
      state.phase = 'failed';
      state.errors.push(`Orchestration failed: ${error instanceof Error ? error.message : String(error)}`);
      state.endTime = new Date();
      state.duration = state.endTime.getTime() - state.startTime.getTime();

      logger.error(
        { requestId: request.id, error, duration: state.duration },
        'Request failed'
      );

      return state;
    }
  }

  private async createPlan(request: EARequest): Promise<TaskPlan> {
    try {
      // Determine which artefacts to generate based on request
      const requestedArtefacts = request.requestedArtefacts || ['governance', 'strategy', 'design'];

      // For MVP, we'll use a simple heuristic
      // In production, this could be a Claude call to plan more intelligently
      const plan: TaskPlan = {
        requestId: request.id,
        artefactsNeeded: requestedArtefacts,
        validationRules: ['structure', 'tone', 'alignment', 'vaf-concepts'],
        sequenceOrder: ['governance', 'strategy', 'design'],
      };

      return plan;
    } catch (error) {
      logger.error({ error }, 'Plan creation failed');
      throw error;
    }
  }

  private async generateArtefact(request: EARequest, type: string): Promise<Artefact | null> {
    if (!this.framework) {
      throw new Error('VAF framework not loaded');
    }

    let agent;
    switch (type) {
      case 'governance':
        agent = governanceAgent;
        break;
      case 'strategy':
        agent = strategyAgent;
        break;
      case 'design':
        agent = designAgent;
        break;
      default:
        logger.warn({ type }, 'Unknown artefact type');
        return null;
    }

    return agent.generate(request, this.framework);
  }
}

export const orchestrator = new Orchestrator();
