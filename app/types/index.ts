// VAF Artefact Types — v4 (16 agent model)
export type ArtefactType =
  // Strategic EA
  | 'guardrail-canvas'
  | 'trade-off-matrix'
  | 'capability-map'
  | 'portfolio-roadmap'
  // Architecture Design
  | 'domain-model'
  | 'data-architecture'
  | 'application-blueprint'
  | 'integration-map'
  | 'technology-radar'
  // Governance & Assurance
  | 'compliance-report'
  | 'risk-register'
  | 'tech-debt-dashboard'
  | 'adr'
  // Delivery & Value
  | 'solution-review'
  | 'spec-validation'
  | 'integrity-arc'
  | 'value-dashboard'
  // Legacy aliases (kept for backward compat with existing GitHub artefacts)
  | 'governance'
  | 'strategy'
  | 'design'
  | 'velocity'
  | 'rhythm'
  | 'practitioner';

export interface EARequest {
  id: string;
  topic: string;
  context?: string;
  constraints?: string[];
  requestedArtefacts: ArtefactType[];
  userId: string;
  timestamp: Date;
}

export interface Artefact {
  id: string;
  type: ArtefactType;
  content: string;
  metadata: {
    generatedAt: string;
    tokens?: number;
    model?: string;
    viewpoint?: string;
    githubPath?: string;
  };
}

export interface EAResponse {
  requestId: string;
  phase: string;
  artefacts: Artefact[];
  errors: string[];
  duration: number;
}

export interface VAFFramework {
  spec: string;
  viewpoints: {
    vp1: string;
    vp2: string;
    vp3: string;
    vp4: string;
    vp5: string;
    vp6: string;
  };
  correspondenceRules: string;
  examples: {
    governance: string;
    strategy: string;
    design: string;
    velocity: string;
    rhythm: string;
    practitioner: string;
  };
  foundation: string;
  practitionerManual?: string;
  lastLoaded: Date;
  expiresAt: Date;
}
