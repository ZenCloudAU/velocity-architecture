# Repository Cleanup Plan

Status: assessment and proposed migration plan  
Scope: `ZenCloudAU/velocity-architecture` at `main` commit `38265e1272e50b01bbd282808034580280615f43`

## Objective

Reduce root-level clutter, establish a predictable naming system, separate canonical source from generated publication output, and align the repository identity with its current role as:

1. a framework and standards authority;
2. a research and publication estate; and
3. a TypeScript architecture-generation application.

This plan deliberately separates low-risk cleanup from moves that can break GitHub Pages, build scripts, Docker deployment, or external links.

## Principal Findings

### 1. The root is carrying several unrelated classes of material

The root currently mixes:

- framework and policy documents;
- partner and commercial collateral;
- project-phase completion records;
- deployment files;
- machine-readable architecture descriptions;
- sample requests;
- static website entry points;
- legal and licensing files;
- constitutional governance files;
- application package files.

The root should be an entry and configuration surface, not the primary document library.

### 2. Repository identity and version metadata conflict

Observed declarations include:

- `package.json`: application version `2.0.0`, proprietary licence;
- `app/app.ts`: runtime version `4.0.0`;
- `vaf-architecture-v2.json`: Phase 1 / v2 architecture description;
- `LICENSE.md`: CC BY 4.0;
- `LICENCE-TERMS.md`: MIT;
- `assets/LICENCE.md`: informal open-use terms;
- `repository/USAGE-AND-TERMS.md`: duplicate MIT statement.

One version source and one explicit licensing model are required. Documentation and software may use different licences, but that split must be deliberate and stated.

### 3. A constitutional bootstrap conflicts with the implemented repository

The root constitutional material describes a v0.1 standards authority that must not contain application code, dependencies, workflows, deployment automation, or integrations. The repository already contains all of those and has materially grown beyond that baseline.

The constitutional pack must either:

- be updated to govern the current framework, publication, and application estate; or
- be moved to the repository that owns the institutional bootstrap.

It must not remain as a contradictory second repository identity.

### 4. Source and generated publication output are partly separated, but not consistently

The following patterns are structurally sound and should be retained:

- `book/` Markdown source → `publications/book/` rendered output;
- `series/` Markdown source → `publications/thought-series/` rendered output;
- `signals-series/` Markdown source → `publications/signal/` rendered output.

However, multiple root-level Markdown files are also used as publication source by `scripts/build-docs.js`. Their source role is not apparent from their location.

### 5. Local and agent-workspace files have been committed

Examples include:

- `.claude/settings.local.json`, including a founder-specific Windows path and local command permissions;
- `.superpowers/brainstorm/**` generated mock-ups;
- `docs/superpowers/**zencloud-advisory**`, which belongs to another repository or a cross-repository workspace.

These should not remain in the framework repository unless they are intentionally published evidence.

### 6. Deployment duplication exists

`deploy.yml` at the root is an older, inactive copy of `.github/workflows/deploy.yml`. Only the file under `.github/workflows/` is executed by GitHub Actions.

### 7. Design token duplication exists

`_tokens.css` defines a local token set, while `design-system/vaf-tokens.css` declares itself the master source of truth. One canonical design-token file should remain.

### 8. The `repository/` directory duplicates the repository itself

`repository/README.md`, `repository/USAGE-AND-TERMS.md`, and `repository/spec/` overlap with root and top-level canonical material. This creates a repository-inside-the-repository model and encourages drift.

## Target Top-Level Structure

The proposed steady-state layout is:

```text
/
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE.md
├── LICENCE-TERMS.md
├── CITATION.cff
├── package.json
├── package-lock.json
├── tsconfig.json
├── Dockerfile
├── CNAME
│
├── app/                         # TypeScript application
├── artefacts/                   # generated/reference artefacts
├── spec/                        # formal framework specification
├── foundation/                  # foundational doctrine
├── viewpoints/                  # viewpoint definitions
├── correspondence-rules/        # alignment rules
├── frameworks/                  # framework references
├── diagnostics/                 # diagnostic instruments
├── guides/                      # practitioner guidance
├── templates/                   # reusable templates
├── examples/                    # worked examples and sample requests
├── research/                    # research source
├── series/                      # thought-series source
├── book/                        # book source
├── signals-series/              # signal-series source
├── publications/                # generated/handcrafted reader output
├── ecosystem/                   # cross-repository operating material
├── engagements/                 # public engagement and partner material
├── policies/                    # public policies
├── design-system/               # canonical design tokens and brand rules
├── assets/                      # images, media and downloadable assets
├── scripts/                     # build and maintenance scripts
├── tools/                       # standalone supporting tools
├── docs/                        # engineering and operational documentation
│   ├── architecture/
│   ├── development/
│   ├── operations/
│   ├── agents/
│   ├── continuity/
│   └── archive/
├── ops/                         # runtime/deployment support files
│   ├── container/
│   └── deployment/
└── .github/workflows/           # executable CI/CD only
```

The existing root-level GitHub Pages entry files may remain temporarily. Moving them into a dedicated site output directory is a separate deployment change.

## File Naming System

### General rule

Use lowercase kebab-case for all non-standard files and directories.

Examples:

- `velocity-decision-maturity-assessment.md`
- `partner-engagement-model.md`
- `content-publishing-pipeline.md`
- `cloud-governance-request.json`

### Files permitted to remain uppercase

Only conventional repository control files should remain uppercase or mixed case:

- `README.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `LICENSE.md`
- `CITATION.cff`
- `Dockerfile`
- `CNAME`

### Date rules

Use ISO dates only for immutable records, handoffs, audits, or historical snapshots:

```text
2026-06-08-visible-ecosystem-continuity-handoff.md
```

Do not include dates in living policy, framework, or operating-model filenames.

### Version rules

Do not put `v1`, `v2`, `phase1`, or `final` in a living filename. Store version and status in front matter or a version manifest. Versioned filenames are permitted only inside `docs/archive/`.

### Document-type suffixes

Use a stable suffix where it clarifies purpose:

- `-policy.md`
- `-operating-model.md`
- `-runbook.md`
- `-assessment.md`
- `-checklist.md`
- `-template.md`
- `-example.md`
- `-decision.md`

### Generated output rules

Generated HTML routes should mirror the canonical source slug:

```text
research/example-paper.md
publications/research/example-paper/index.html
```

Use `index.html` only as a route entry point, not as an arbitrary document name.

## Proposed Relocations

### Immediate removals or de-duplication

| Current path | Proposed action | Reason |
|---|---|---|
| `deploy.yml` | Delete after confirming workflow parity | Older inactive duplicate of `.github/workflows/deploy.yml` |
| `.claude/settings.local.json` | Delete and add to `.gitignore` | Local machine paths and permissions |
| `.superpowers/brainstorm/` | Remove from repository or export to an external workspace archive | Generated design-session material |
| `docs/superpowers/specs/2026-06-06-zencloud-advisory-ux-redesign.md` | Move to `zencloud-advisory` | Wrong owning repository |
| `docs/superpowers/plans/2026-06-06-zencloud-advisory-ux-redesign.md` | Move to `zencloud-advisory` | Wrong owning repository |
| `_tokens.css` | Remove after consumers use `design-system/vaf-tokens.css` | Duplicate design-token source |
| `repository/USAGE-AND-TERMS.md` | Remove after licence consolidation | Duplicate of root licence terms |
| `repository/README.md` | Archive or remove | Stale repository-inside-repository README |

### Policies, ecosystem and design system

| Current path | Proposed path |
|---|---|
| `AI_AND_CLIENT_DATA_USAGE_POLICY.md` | `policies/ai-and-client-data-usage-policy.md` |
| `BRAND_SYSTEM.md` | `design-system/brand-system.md` |
| `ECOSYSTEM_OPERATING_MODEL.md` | `ecosystem/operating-model.md` |
| `PORTFOLIO_REPO_MAP.md` | `ecosystem/portfolio-repository-map.md` |
| `CONTENT_AND_PUBLISHING_PIPELINE.md` | `docs/operations/content-publishing-pipeline.md` |
| `VELOCITY_AI_ARCHITECTURE_COORDINATION_LAYER.md` | `ecosystem/ai-architecture-coordination-layer.md` |
| `VELOCITY_CHANNEL_PARTNER_MODEL.md` | `engagements/partners/channel-partner-model.md` |

### Framework evolution and diagnostics

| Current path | Proposed path |
|---|---|
| `FUTURE_FRAMEWORK_LENSES.md` | `spec/evolution/future-framework-lenses.md` |
| `VAF_V1_V2_INTEGRATION.md` | `spec/evolution/v1-v2-integration.md` |
| `VELOCITY_DECISION_MATURITY_ASSESSMENT.md` | `diagnostics/decision-maturity-assessment.md` |
| `VELOCITY_EA_VALUE_METRICS.md` | `research/ea-value-metrics.md` |
| `ARCHITECTURE_DECISION_SPRINT.md` | `engagements/offers/architecture-decision-sprint.md` |

### Agent and operating documentation

| Current path | Proposed path |
|---|---|
| `HERMES_AGENT_OPERATING_MODEL.md` | `docs/agents/hermes/operating-model.md` |
| `HERMES_INTAKE_ROUTING_MATRIX.md` | `docs/agents/hermes/intake-routing-matrix.md` |
| `DEPLOYMENT.md` | `docs/operations/deployment.md` |
| `DELIVERY_CAPACITY_MODEL.md` | `docs/operations/delivery-capacity-model.md` |

### Engagement and partner collateral

These files should either move to the commercial owner repository or be grouped under `engagements/` if they are intentionally public framework assets:

```text
PARTNER_BRIEFING_PACK_OUTLINE.md
PARTNER_BRIEFING_SCRIPT.md
PARTNER_DEMO_FLOW.md
PARTNER_ENGAGEMENT_MODEL.md
PARTNER_SALES_CHEAT_SHEET.md
ENGAGEMENT_COLLATERAL_INDEX.md
ENGAGEMENT_QUALIFICATION_CHECKLIST.md
SLT_DISCOVERY_WORKSHOP_AGENDA.md
SUBCONTRACTED_ARCHITECTURE_DELIVERY_MODEL.md
SUBCONTRACTED_PARTNER_OPERATING_MODEL.md
WHITE_LABEL_DELIVERY_MODEL.md
VELOCITY_COMMERCIAL_OFFER_SHEET.md
VELOCITY_ENTERPRISE_ENGAGEMENT_PACK.md
VELOCITY_ENTERPRISE_ONE_PAGER.md
VELOCITY_EXECUTIVE_ARCHITECTURE_FASTSTART.md
```

Recommended retained structure:

```text
engagements/
├── offers/
├── partners/
├── workshops/
├── qualification/
└── delivery-models/
```

Do not keep sales collateral at the repository root.

### Project history and temporary instructions

| Current path | Proposed path |
|---|---|
| `README_PHASE1.md` | `docs/archive/project-history/phase-1-readme.md` |
| `PHASE_1_COMPLETE.md` | `docs/archive/project-history/phase-1-completion.md` |
| `PHASE5_RUNBOOK.md` | `docs/archive/project-history/phase-5-runbook.md` |
| `VELOCITY_PROJECT_COMPLETION_AUDIT.md` | `docs/archive/project-history/project-completion-audit.md` |
| `LAUNCH_CHECKLIST.md` | `docs/archive/project-history/launch-checklist.md` unless still active |
| `EXPORT-README.md` | `docs/archive/migration/export-readme.md` |
| `WINDOWS_COPY_INSTRUCTIONS.md` | `docs/archive/migration/windows-copy-instructions.md` |

### Machine-readable and sample files

| Current path | Proposed path |
|---|---|
| `request.json` | `examples/requests/cloud-governance-request.json` |
| `vaf-architecture-v2.json` | `docs/archive/architecture/v2-agentic-architect.json` unless rebuilt as a current manifest |
| `vaf-architecture-dashboard.html` | `tools/architecture-dashboard/index.html` |

If a current machine-readable architecture manifest is required, create a new canonical file such as `config/architecture-manifest.json` and generate it from code or validated metadata.

### Constitutional governance pack

Review these together rather than moving them individually:

```text
CHARTER.md
AGENTS.md
DATA.md
INTERFACES.md
ROADMAP.md
KANBAN.md
SECURITY.md
```

Two valid outcomes exist:

1. update them to govern the repository that actually exists, then place the non-standard records under `governance/`; or
2. move the full pack to the institutional repository that owns the v0.1 constitutional baseline.

Do not leave the current prohibition on implementation beside a production application and deployment workflow.

## Publication Migration Rules

Any move of a Markdown source currently referenced by `scripts/build-docs.js` must be atomic with:

1. the source-file move;
2. manifest-path updates in `scripts/build-docs.js`;
3. generated page regeneration;
4. source links in existing HTML updates;
5. README and site-map updates;
6. redirect or compatibility handling for published URLs where required.

The source path may change without changing the public route. This is preferable for externally linked content.

## Root Files to Retain

The final root should normally contain only:

- repository identity and contribution files;
- legal and citation files;
- package/build manifests;
- conventional container entry files where tool expectations make root placement valuable;
- the GitHub Pages entry files required by the current deployment model.

All other documents should have a domain owner.

## Execution Sequence

### Phase 1 — documentation and metadata

- merge the README change;
- select the canonical project name and version source;
- decide the software/content licensing split;
- decide whether the constitutional pack is current or misplaced;
- add this cleanup plan to the repository.

### Phase 2 — zero-risk removals

- delete root `deploy.yml`;
- delete and ignore `.claude/settings.local.json`;
- remove `.superpowers/brainstorm/`;
- move the ZenCloud Advisory redesign plans to their owning repository;
- de-duplicate identical licence/usage files.

### Phase 3 — root document relocation

- create `policies/`, `engagements/`, `spec/evolution/`, and the required `docs/` subdirectories;
- move files in small, thematic commits;
- update links and build manifests in the same commit as each move.

### Phase 4 — publishing boundary

- formally declare source directories and output directories;
- decide whether GitHub Pages continues to publish from the repository root;
- if moving to a dedicated site output directory, change Pages configuration and workflow in a separate release.

### Phase 5 — runtime and version alignment

- reconcile package, runtime, health endpoint, architecture manifest, image tag, and documentation versions;
- derive runtime version from `package.json` or a single build-time source;
- remove stale phase labels from live configuration.

## Validation Checklist

Before merging each relocation batch:

```bash
npm ci
npm run build
npm test
npm run lint
node scripts/build-docs.js
```

Also verify:

- GitHub Pages routes and navigation;
- raw GitHub source links;
- `scripts/build-docs.js` source paths;
- Docker build and startup;
- workflow references;
- no references to deleted paths;
- no committed local settings or credentials;
- no duplicate canonical documents;
- link-check workflow passes;
- public URLs remain stable or have redirects.

## Recommended First Cleanup Pull Request

The first structural PR should remain intentionally small:

1. remove root `deploy.yml`;
2. remove `.claude/settings.local.json` and ignore it;
3. remove or relocate `.superpowers/` workspace output;
4. move `request.json` to `examples/requests/cloud-governance-request.json`;
5. archive `vaf-architecture-v2.json`;
6. move phase/completion records under `docs/archive/project-history/`;
7. update all references and run the validation checklist.

The licensing, constitutional governance, and GitHub Pages directory changes should be separate decisions because they have wider legal or deployment impact.
