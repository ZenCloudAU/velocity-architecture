export interface EARequest {
  id: string;
  topic: string;
  context?: string;
  constraints?: string[];
  requestedArtefacts?: ('governance' | 'strategy' | 'design')[];
  userId?: string;
  timestamp: Date;
}

export interface Artefact {
  id: string;
  type: 'governance' | 'strategy' | 'design';
  content: string;
  metadata: {
    requestId: string;
    generatedBy: string;
    timestamp: Date;
    vafVersion: string;
    tokensUsed: number;
    validationPassed: boolean;
  };
}

export interface TaskPlan {
  requestId: string;
  artefactsNeeded: string[];
  validationRules: string[];
  sequenceOrder: string[];
}

export interface OrchestratorState {
  requestId: string;
  phase: 'planning' | 'generation' | 'validation' | 'publishing' | 'complete' | 'failed';
  artefacts: Artefact[];
  errors: string[];
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

export interface VAFFramework {
  spec: string;
  viewpoints: {
    vp1?: string;
    vp2?: string;
    vp3?: string;
  };
  correspondenceRules: string;
  examples: {
    governance?: string;
    strategy?: string;
    design?: string;
  };
  foundation: string;
  lastLoaded: Date;
  expiresAt: Date;
}

export interface GenerationRequest {
  topic: string;
  context?: string;
  constraints?: string[];
}
