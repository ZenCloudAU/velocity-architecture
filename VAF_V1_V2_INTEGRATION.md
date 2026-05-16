# VAF v1 → VAF v2 Agentic Architect — Gap Analysis & Integration Plan

**Current State:** VAF v1 framework complete (knowledge base, templates, viewpoints, correspondence rules).  
**Target State:** VAF v2 with agentic agent that reads v1 KB and generates EA artefacts autonomously.

---

## Existing Assets (in repo)

### V1 Knowledge Base
```
velocity-architecture/
├── spec/FRAMEWORK-SPEC.md              ← Full ISO 42010 specification
├── viewpoints/                         ← 6 viewpoints (VP1-VP6)
│   ├── vp1-direction/guardrail-canvas.md
│   ├── vp2-decision/trade-off-matrix.md
│   ├── vp3-truth/adr-template.md
│   ├── vp4-velocity/adl-template.md
│   ├── vp5-rhythm/pulse-system.md
│   └── vp6-practitioner/integrity-arc.md
├── templates/                          ← Ready-to-use blank artefacts
├── correspondence-rules/RULES.md        ← 17 correspondence rules
├── foundation/EPISTEMOLOGY.md           ← Foundation layer (concepts)
├── diagnostics/                         ← Health checks
└── examples/                            ← Reference examples
```

### Strength: Authoritative
- ISO/IEC/IEEE 42010:2022 conformant
- Structured, documented framework
- Clear correspondence rules (artefact relationships)
- Multiple viewpoints (coverage)
- Examples provided

---

## What's Missing for VAF v2 Agent

### 1. **Agentic Code Layer** (Does NOT exist)
```
app/                                    ← NEW
├── app.ts                              ← Express HTTP server
├── orchestrator.ts                     ← Task router & state machine
├── action-engine.ts                    ← GitHub integration
├── agents/
│   ├── governance-agent.ts
│   ├── strategy-agent.ts
│   ├── design-agent.ts
│   ├── validation-agent.ts
│   └── consolidation-agent.ts
├── prompts/                            ← Externalized instructions
│   ├── governance.md                   ← Agent system prompts (NEW)
│   ├── strategy.md                     ← Loaded at runtime
│   ├── design.md
│   └── validation.md
├── types/index.ts                      ← TypeScript interfaces
└── mcp-server.ts                       ← MCP adapter
```

### 2. **CI/CD & Deployment Infrastructure** (Does NOT exist)
```
.github/workflows/
└── deploy.yml                          ← GitHub Actions pipeline (NEW)

k8s/                                    ← Kubernetes manifests (NEW)
├── deployment.yaml
├── service.yaml
├── configmap.yaml
└── secret.yaml.template

Dockerfile                              ← Container definition (NEW)
package.json                            ← Node.js project (NEW)
tsconfig.json                           ← TypeScript config (NEW)
```

### 3. **Documentation** (Partially exists)
```
docs/
├── vaf-architecture-dashboard.html     ← Interactive viz (NEW)
├── vaf-architecture-v2.json            ← Machine-readable spec (NEW)
├── LAUNCH_CHECKLIST.md                 ← Implementation guide (NEW)
└── architecture-decisions.md           ← Agent design decisions (NEW)
```

---

## Integration Points: V1 KB → V2 Agent

### How the Agent Uses V1 Knowledge Base

**At Runtime:**

1. **Framework Spec** (`spec/FRAMEWORK-SPEC.md`)
   - Agent reads full spec as context
   - Learns ISO 42010 structure, requirements
   - Understands correspondence rules

2. **Viewpoints** (`viewpoints/`)
   - Agent reads each viewpoint definition
   - Understands what each artefact (Guardrail Canvas, Trade-off Matrix, ADRs, ADL, etc.) must contain
   - Uses as generation templates/constraints

3. **Correspondence Rules** (`correspondence-rules/RULES.md`)
   - Agent validates cross-artefact consistency
   - Ensures governance → strategy → design alignment
   - Flags violations

4. **Examples** (`examples/`)
   - Agent uses as few-shot examples in prompts
   - Shows quality/style expectations
   - Demonstrates tone (forensic, declarative)

5. **Foundation Layer** (`foundation/EPISTEMOLOGY.md`)
   - Agent grounds reasoning in VAF concepts
   - Applies "Integrity Gap", "Decision Latency", "Velocity of Truth"
   - Ensures philosophical consistency

---

## Migration Path: Phase 0 (Prep) → Phase 1 (Code) → Phase 2 (Deploy)

### Phase 0: Repo Preparation (Before Coding)

**Checklist:**
- [ ] Clone/update ZenCloudAU/velocity-architecture locally
- [ ] Read `/spec/FRAMEWORK-SPEC.md` (understand VAF fully)
- [ ] Identify which viewpoints VAF v2 agent will target
  - **MVP scope:** VP1 (Guardrail Canvas), VP2 (Trade-off Matrix), VP3 (ADRs)
  - **Future:** VP4 (ADL), VP5 (Pulse System), VP6 (Integrity Arc)
- [ ] Create `/prompts/` directory in repo
- [ ] Create agent system prompts based on viewpoint definitions

**New Files to Create in Repo:**
```
velocity-architecture/
├── app/                                ← New directory
├── .github/workflows/deploy.yml        ← New file
├── k8s/                                ← New directory
├── Dockerfile                          ← New file
├── package.json                        ← New file
├── tsconfig.json                       ← New file
├── docs/
│   ├── vaf-architecture-v2.json        ← Spec (move from outputs/)
│   ├── vaf-architecture-dashboard.html ← Dashboard (move from outputs/)
│   └── LAUNCH_CHECKLIST.md             ← Guide (move from outputs/)
└── prompts/                            ← New directory (agent instructions)
    ├── governance.md                   ← System prompt for VP1
    ├── strategy.md                     ← System prompt for VP2
    ├── design.md                       ← System prompt for VP3
    └── validation.md                   ← Validation rules prompt
```

---

### Phase 1: Code Implementation

**Work Package 1.1: Agent Core (TypeScript)**
- Implement `app/app.ts` (Express HTTP server)
- Implement `app/orchestrator.ts` (state machine)
- Implement `app/action-engine.ts` (GitHub direct API calls)
- Implement agents (governance, strategy, design, validation)

**How Agent Reads V1 KB:**
```typescript
// In governance-agent.ts, at runtime:
async function loadFramework() {
  const spec = await fetch(`https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/spec/FRAMEWORK-SPEC.md`);
  const vp1 = await fetch(`https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/viewpoints/vp1-direction/README.md`);
  const rules = await fetch(`https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/correspondence-rules/RULES.md`);
  const examples = await fetch(`https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/examples/guardrail-canvas-example.md`);
  
  // Inject into agent context (system prompt)
  const systemPrompt = `
    You are a VAF Governance Agent. 
    
    VAF Framework Spec: ${spec}
    Viewpoint 1 (Direction): ${vp1}
    Correspondence Rules: ${rules}
    Example Guardrail Canvas: ${examples}
    
    Your job: Generate a Guardrail Canvas (VP1 artefact) that:
    1. Follows the ISO 42010 structure
    2. Uses forensic, declarative tone (no hedging)
    3. Complies with all correspondence rules
    4. Matches the style of the example
  `;
}
```

**Work Package 1.2: Prompt Engineering**
- Create `/prompts/governance.md` (instructions for VP1 artefact generation)
- Create `/prompts/strategy.md` (instructions for VP2 artefact generation)
- Create `/prompts/design.md` (instructions for VP3 artefact generation)
- Create `/prompts/validation.md` (validation rules from correspondence-rules/RULES.md)

**Work Package 1.3: Integration with V1 Knowledge Base**
- Agent loads framework spec at startup (or per-request)
- Validates generated artefacts against correspondence rules (from KB)
- Applies VAF concepts (from foundation layer)
- References examples (from examples/)

---

### Phase 2: Deployment & Validation

**Work Package 2.1: Containerization**
- `Dockerfile` (seal agent + KB access)
- `k8s/` manifests (multi-tenant support)

**Work Package 2.2: CI/CD**
- `.github/workflows/deploy.yml` (GitHub Actions)
- Build Docker image on push
- Deploy to Cloud Run

**Work Package 2.3: Testing**
- Endpoint: POST `/artefacts/generate` with VAF request
- Agent reads `/spec/FRAMEWORK-SPEC.md`
- Generates Guardrail Canvas (VP1)
- Validates against correspondence rules
- Commits to `/artefacts/governance/{request-id}.md`

---

## File-by-File Integration: V1 KB → V2 Agent

### VP1 (Direction) → Governance Agent
```
V1 KB Source:
  viewpoints/vp1-direction/README.md         ← Viewpoint definition
  viewpoints/vp1-direction/guardrail-canvas.md ← Artefact template
  examples/guardrail-canvas-example.md       ← Reference example

V2 Agent Usage:
  app/agents/governance-agent.ts             ← Reads all 3 sources
  app/prompts/governance.md                  ← System prompt (synthesized)

Output:
  artefacts/governance/{id}.md               ← Generated Guardrail Canvas
```

### VP2 (Decision) → Strategy Agent
```
V1 KB Source:
  viewpoints/vp2-decision/README.md
  viewpoints/vp2-decision/trade-off-matrix.md
  examples/trade-off-matrix-example.md

V2 Agent Usage:
  app/agents/strategy-agent.ts
  app/prompts/strategy.md

Output:
  artefacts/strategy/{id}.md
```

### VP3 (Truth) → Design Agent
```
V1 KB Source:
  viewpoints/vp3-truth/README.md
  viewpoints/vp3-truth/adr-template.md
  examples/adr-example.md

V2 Agent Usage:
  app/agents/design-agent.ts
  app/prompts/design.md

Output:
  artefacts/design/{id}.md
```

### Correspondence Rules → Validation Agent
```
V1 KB Source:
  correspondence-rules/RULES.md              ← All 17 rules

V2 Agent Usage:
  app/agents/validation-agent.ts             ← Enforces rules
  app/prompts/validation.md                  ← Rules as constraints

Validation:
  Checks governance ← strategy ← design alignment
  Flags rule violations
```

---

## Repo Structure After V2 Integration

```
velocity-architecture/
│
├── README.md                                ← Updated with v2 info
├── CONTRIBUTING.md
├── LICENSE
│
├── spec/                                    ← V1: Framework spec (unchanged)
├── viewpoints/                              ← V1: Viewpoints (unchanged)
├── correspondence-rules/                    ← V1: Rules (unchanged)
├── foundation/                              ← V1: Epistemology (unchanged)
├── leadership/                              ← V1: Leadership (unchanged)
├── diagnostics/                             ← V1: Diagnostics (unchanged)
├── examples/                                ← V1: Examples (unchanged)
├── templates/                               ← V1: Templates (unchanged)
│
├── app/                                     ← V2: NEW — Agentic layer
│   ├── app.ts
│   ├── orchestrator.ts
│   ├── action-engine.ts
│   ├── agents/
│   │   ├── governance-agent.ts
│   │   ├── strategy-agent.ts
│   │   ├── design-agent.ts
│   │   ├── validation-agent.ts
│   │   └── consolidation-agent.ts
│   ├── prompts/                             ← V2: NEW — Externalized instructions
│   │   ├── governance.md
│   │   ├── strategy.md
│   │   ├── design.md
│   │   └── validation.md
│   ├── types/
│   │   └── index.ts
│   └── mcp-server.ts
│
├── k8s/                                     ← V2: NEW — Deployment
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   └── secret.yaml.template
│
├── .github/                                 ← V2: NEW — CI/CD
│   └── workflows/
│       └── deploy.yml
│
├── docs/                                    ← V2: NEW — Documentation
│   ├── vaf-architecture-v2.json
│   ├── vaf-architecture-dashboard.html
│   ├── LAUNCH_CHECKLIST.md
│   └── ARCHITECTURE_DECISIONS.md
│
├── Dockerfile                               ← V2: NEW
├── package.json                             ← V2: NEW
├── tsconfig.json                            ← V2: NEW
├── .env.example                             ← V2: NEW
└── .gitignore                               ← V2: Updated
```

---

## Immediate Next Steps

### Today (Phase 0):
1. **Read VAF v1 framework spec** (`spec/FRAMEWORK-SPEC.md`)
2. **Clone repo locally:**
   ```bash
   git clone https://github.com/ZenCloudAU/velocity-architecture.git
   cd velocity-architecture
   ```
3. **Decide MVP scope:** Which viewpoints to implement first?
   - Recommended: VP1 (Governance), VP2 (Strategy), VP3 (Design)
   - Optional: VP4 (ADL/Dashboard), VP5 (Pulse), VP6 (Practitioner)

### Week 1 (Phase 1.1 - Core Agent):
1. Create `/app/` directory structure
2. Implement `app.ts` + `orchestrator.ts`
3. Implement first agent (governance-agent.ts)
4. Create `/app/prompts/governance.md` (system prompt)
5. Test locally: agent reads VAF spec, generates Guardrail Canvas

### Week 2 (Phase 1.2-1.3 - Agents & Validation):
1. Implement remaining agents (strategy, design)
2. Implement validation agent (enforce correspondence rules)
3. Test: orchestrator sequences agents correctly
4. Test: generated artefacts comply with correspondence rules

### Week 3 (Phase 2 - Deployment):
1. Create Dockerfile
2. Create GitHub Actions workflow
3. Deploy to Cloud Run
4. End-to-end test

---

## Architecture Decision: How Agent Accesses V1 KB

**Option 1: Load at Startup (Cached)**
```typescript
// Load entire KB into memory once, reuse for all requests
const framework = await loadKBOnStartup();
// In each agent call: use cached framework
```
**Pros:** Fast, predictable  
**Cons:** Large memory footprint if KB grows

**Option 2: Fetch Per Request (Fresh)**
```typescript
// Each agent call fetches latest KB from GitHub
const framework = await loadKBPerRequest();
```
**Pros:** Always up-to-date, low memory  
**Cons:** Slower, depends on network

**Recommendation:** **Hybrid — Cache with invalidation**
```typescript
// Load KB at startup, cache for 1 hour
// On cache miss or manual refresh: fetch from GitHub
// Reduces network calls, ensures freshness
```

---

## Success Criteria: V1 ↔ V2 Integration

- [ ] Agent successfully reads VAF v1 framework spec
- [ ] Agent generates Guardrail Canvas (VP1) that matches example style
- [ ] Generated artefacts comply with all correspondence rules
- [ ] Agent validates cross-artefact consistency (governance ← strategy ← design)
- [ ] Prompts are externalized in `/app/prompts/`
- [ ] Non-technical stakeholders can iterate on prompts without code changes
- [ ] Artefacts committed to GitHub with VAF metadata (version, rules applied, etc.)
- [ ] Container deploys to Cloud Run successfully
- [ ] End-to-end: request → agent reads KB → generates artefact → commits → success

---

## Risk Mitigation

**Risk 1: KB too large for agent context**  
*Mitigation:* Split KB into viewpoint-specific chunks. Governance agent loads only VP1 + rules. Strategy agent loads VP2 + rules.

**Risk 2: Agent generates non-compliant artefacts**  
*Mitigation:* Validation agent enforces correspondence rules. Flag violations, require human review before commit.

**Risk 3: KB changes break agent prompts**  
*Mitigation:* Version KB. Pin agent prompts to specific KB version. Update prompts when KB changes.

**Risk 4: Agent hallucination/inconsistency**  
*Mitigation:* Use multi-model consortium (Claude + GPT-4). Reasoning agent consolidates. Apply few-shot examples in prompts.

---

## Roadmap

| Phase | Focus | Timeline | Output |
|-------|-------|----------|--------|
| 0 | Repo prep, scope decision | 1 day | Phase 1 plan |
| 1.1 | Core agent (app.ts, orchestrator) | 3-4 days | Working HTTP server |
| 1.2 | Agents (governance, strategy, design) | 3-4 days | Three functioning agents |
| 1.3 | Validation + KB integration | 2-3 days | Compliance checking |
| 2.1 | Containerization | 2-3 days | Working Dockerfile |
| 2.2 | CI/CD pipeline | 2 days | GitHub Actions deployment |
| 2.3 | Validation + launch | 1-2 days | Live on Cloud Run |

**Total: 2-3 weeks to production.**

---

**Status:** Ready to code. All V1 assets identified. Integration path clear. Begin Phase 1.
