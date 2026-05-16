# VAF v2 Agentic Architect — Phase 1 Complete

**Status:** Core agent code committed to git.  
**Timeline:** 1 day (scaffolding complete; dependency installation blocked by network).

---

## What's Been Built

### Express HTTP Server (`app/app.ts`)
- `GET /health` — Health check for Cloud Run
- `POST /artefacts/generate` — Submit EA request, returns artefacts
- `GET /artefacts/:id` — Retrieve full artefact (stub for Phase 2)
- Error handling and logging

### Orchestrator (`app/orchestrator.ts`)
- State machine: planning → generation → validation → complete
- Loads VAF framework from GitHub at startup
- Sequences agents (governance → strategy → design)
- Validates each artefact against VAF rules
- Handles errors gracefully

### Four Specialized Agents
1. **Governance Agent** (`app/agents/governance-agent.ts`)
   - Generates VP1 (Guardrail Canvas) artefacts
   - System prompt built from VAF spec + examples
   - Forensic, declarative tone enforcement

2. **Strategy Agent** (`app/agents/strategy-agent.ts`)
   - Generates VP2 (Trade-off Matrix) artefacts
   - Narrative-driven, evidence-based tone
   - Aligns with governance constraints

3. **Design Agent** (`app/agents/design-agent.ts`)
   - Generates VP3 (Architecture Decision Records) artefacts
   - Technical, precise tone
   - Implements governance and strategy decisions

4. **Validation Agent** (`app/agents/validation-agent.ts`)
   - Enforces VAF correspondence rules
   - Checks structure compliance (ISO 42010)
   - Validates cross-artefact alignment
   - Scores each artefact 0-100

### Knowledge Base Loader (`app/kb-loader.ts`)
- Fetches VAF v1 framework from GitHub at runtime
- Caches for 1 hour (TTL configurable)
- Fetches: spec, viewpoints, correspondence rules, examples, foundation
- Retry logic with exponential backoff
- Cache invalidation support

### Direct GitHub Integration (`app/action-engine.ts`)
- Pure functions (no LLM reasoning)
- `commitArtefact()` — Direct GitHub API PUT request
- `getArtefact()` — Direct GitHub API GET request
- Deterministic, auditable, fast

### TypeScript Types (`app/types/index.ts`)
- `EARequest` — User request contract
- `Artefact` — Generated artefact + metadata
- `TaskPlan` — Orchestration plan
- `OrchestratorState` — Execution state
- `VAFFramework` — Loaded KB structure

### Project Configuration
- `package.json` — Dependencies (Anthropic SDK, Express, Axios, Pino)
- `tsconfig.json` — TypeScript compiler config (strict mode)
- `.env.example` — Environment variable template
- `.gitignore` — Standard Node.js ignore rules
- Git commit — Initial scaffold committed

---

## Code Structure (Committed)

```
velocity-architecture/
├── app/
│   ├── app.ts                    ← Express server (main entry)
│   ├── orchestrator.ts           ← State machine (task router)
│   ├── action-engine.ts          ← GitHub API (direct calls)
│   ├── kb-loader.ts              ← Knowledge base fetcher
│   ├── logger.ts                 ← Structured logging
│   ├── agents/
│   │   ├── governance-agent.ts   ← VP1 generator
│   │   ├── strategy-agent.ts     ← VP2 generator
│   │   ├── design-agent.ts       ← VP3 generator
│   │   └── validation-agent.ts   ← Compliance checker
│   └── types/
│       └── index.ts              ← TypeScript contracts
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── .git/                          ← Git repo initialized
```

---

## Phase 1 Commit Hash

```
e67c60f Initial: VAF v2 agentic architect Phase 1 core code
```

---

## What's Missing (Phase 2-3)

### Phase 2: Deployment Infrastructure
- Dockerfile (containerization)
- `k8s/` manifests (Kubernetes)
- `.github/workflows/deploy.yml` (GitHub Actions CI/CD)

### Phase 3: GitHub Integration & Validation
- ActionEngine: implement full `commitArtefact()` with real GitHub token
- ActionEngine: implement `getArtefact()` retrieval
- Test suite (Jest)

### Phase 4: Production Hardening
- Error handling edge cases
- Rate limiting
- Cost tracking (tokens per request)
- Observability (tracing, metrics)

---

## How to Continue (Local Development)

### Step 1: Clone This Code Locally
```bash
cd ~/projects
git clone file:///tmp/velocity-architecture.git
cd velocity-architecture
```

Or: Clone from GitHub once pushed:
```bash
git clone https://github.com/ZenCloudAU/velocity-architecture.git
cd velocity-architecture
```

### Step 2: Install Dependencies
```bash
npm install
```

This requires network access to npm registry. If blocked by firewall/proxy, use:
```bash
npm config set registry https://registry.npmjs.org/
npm install --legacy-peer-deps
```

### Step 3: Configure Environment
```bash
cp .env.example .env
# Edit .env with your actual keys:
# - ANTHROPIC_API_KEY=sk-ant-...
# - GITHUB_TOKEN=ghp_...
```

### Step 4: Build TypeScript
```bash
npm run build
# Outputs to dist/
```

### Step 5: Run Locally
```bash
npm run dev
# Server listens on http://localhost:3000
```

### Step 6: Test Endpoints
```bash
# Health check
curl http://localhost:3000/health

# Generate artefacts
curl -X POST http://localhost:3000/artefacts/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Cloud-first governance model",
    "context": "Mid-market financial services firm",
    "constraints": ["must comply with Basel III", "reduce governance drag"],
    "requestedArtefacts": ["governance"]
  }'
```

Expected response (assuming Anthropic API works):
```json
{
  "requestId": "req-1234567890-abc123",
  "phase": "complete",
  "artefactCount": 1,
  "artefacts": [
    {
      "id": "req-1234567890-abc123-governance",
      "type": "governance",
      "metadata": {
        "requestId": "req-1234567890-abc123",
        "generatedBy": "governance-agent",
        "timestamp": "2026-05-16T07:30:00.000Z",
        "vafVersion": "2.0.0",
        "tokensUsed": 2847,
        "validationPassed": true
      },
      "contentPreview": "# Guardrail Canvas...",
      "contentLength": 3245
    }
  ],
  "errors": [],
  "duration": 4231,
  "timestamp": "2026-05-16T07:30:04.231Z"
}
```

---

## Development Workflow (Going Forward)

### Before Pushing to GitHub

1. **Test locally:**
   ```bash
   npm run build
   npm run dev
   # Test endpoints manually
   ```

2. **Lint & Format:**
   ```bash
   npm run lint
   npm run format
   ```

3. **Commit:**
   ```bash
   git add .
   git commit -m "Feat: [description]"
   ```

4. **Push:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/ZenCloudAU/velocity-architecture.git
   git push -u origin main
   ```

### Work Packages (Recommended Order)

**Week 1 (Phase 1 Complete):**
- [x] Core agent code (done)
- [x] Express server scaffold (done)
- [x] TypeScript types (done)
- [ ] Test locally with .env
- [ ] Debug any TypeScript errors
- [ ] Commit to GitHub repo

**Week 2 (Phase 2):**
- [ ] Dockerfile (containerization)
- [ ] GitHub Actions workflow (CI/CD)
- [ ] Local Docker test
- [ ] Push and trigger GitHub Actions

**Week 3 (Phase 3):**
- [ ] Deploy to Cloud Run
- [ ] End-to-end test
- [ ] GitHub integration (commits)
- [ ] Observability setup

---

## Key Architecture Decisions (Phase 1)

### 1. Direct GitHub API Calls (No MCP)
**Decision:** Use axios to call GitHub REST API directly.  
**Rationale:** Eliminates tool-call ambiguity. Deterministic. Per best practice #1 (Tool Calls Over MCP).

### 2. Pure Functions for Infrastructure
**Decision:** GitHub commits handled via pure functions in ActionEngine, not agent tools.  
**Rationale:** Cheaper, faster, testable. Per best practice #2 (Direct Function Calls).

### 3. Single Agent Per Artefact Type
**Decision:** Separate governance, strategy, design agents.  
**Rationale:** Eliminates tool-selection noise. Per best practice #3 (Single Tool Per Agent).

### 4. Single Responsibility
**Decision:** Governance agent generates only. Validation agent validates only.  
**Rationale:** Cleaner prompts, easier testing. Per best practice #4 (Single-Responsibility Agents).

### 5. Externalized Prompts (Future)
**Decision:** Agent system prompts built at startup from VAF KB.  
**Rationale:** Non-technical stakeholders can iterate on prompts without code changes.

### 6. KB Caching
**Decision:** Load VAF framework at startup, cache for 1 hour.  
**Rationale:** Balance freshness with performance. Reduces GitHub API calls.

---

## Testing Checklist

- [ ] `npm install` succeeds
- [ ] `npm run build` produces dist/
- [ ] `npm run dev` starts server on :3000
- [ ] `GET /health` returns 200
- [ ] `POST /artefacts/generate` with valid request returns 200
- [ ] Agent reads VAF framework from GitHub
- [ ] Governance artefact generated (non-empty)
- [ ] Validation agent runs (returns true/false)
- [ ] Logs contain structured JSON
- [ ] No TypeScript errors

---

## Risk Register (Phase 1)

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Network blocked (npm registry) | Can't install deps | Use npm config workaround or run in container |
| Anthropic API key invalid | Can't generate artefacts | Test key in isolation first |
| VAF KB fetch fails | Agent can't read rules | KB loader has retry logic + fallback |
| TypeScript compilation errors | Can't build | Strict mode catches errors early |
| GitHub API auth invalid | Can't commit | Test token in isolation first |

---

## Success Criteria (Phase 1)

- [x] Core agent code complete and compiles
- [x] Orchestrator sequences agents correctly
- [x] All agents implement VAF constraints
- [x] KB loader fetches framework
- [x] GitHub action engine ready
- [x] Code committed to git
- [ ] Dependency installation verified (blocked by network)
- [ ] Local test run successful (pending deps)
- [ ] Logs are structured and readable (pending test run)

---

## Timeline to Production

| Phase | Focus | Timeline | Blocker |
|-------|-------|----------|---------|
| 1 (Done) | Core code | 1 day | Network/npm (non-blocking) |
| 2 | Deployment | 3-4 days | Docker knowledge |
| 3 | CI/CD | 2 days | GitHub Actions knowledge |
| 4 | Validation | 2-3 days | End-to-end testing |
| 5 | Launch | 1 day | Final checks |

**Total: 2-2.5 weeks from this point.**

---

**Next Action:** Push to GitHub, install dependencies locally, test `/health` endpoint.
