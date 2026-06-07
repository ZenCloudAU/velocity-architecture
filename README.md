# Velocity Architecture Framework™

Velocity Architecture Framework is a decision-first architecture framework and tooling ecosystem for enterprise architecture, solution architecture, governance, research, and AI-assisted delivery.

This repository is the source of truth for the framework, its practitioner material, public publications, reference artefacts, and the Velocity Agentic Architect application.

- **Public site:** [velocityarchitectureframework.com](https://velocityarchitectureframework.com)
- **Source repository:** [github.com/ZenCloudAU/velocity-architecture](https://github.com/ZenCloudAU/velocity-architecture)

## Start Here

| Need | Location |
|---|---|
| Understand the framework | [Framework home](https://velocityarchitectureframework.com/) |
| Navigate the publication estate | [Public site map](https://velocityarchitectureframework.com/site-map.html) |
| Read research | [Research library](https://velocityarchitectureframework.com/research/) |
| Review the formal specification | [`spec/`](spec/) |
| Browse viewpoints and correspondence rules | [`viewpoints/`](viewpoints/) and [`correspondence-rules/`](correspondence-rules/) |
| Use practitioner guidance and templates | [`guides/`](guides/) and [`templates/`](templates/) |
| Inspect the application | [`app/`](app/) |

GitHub holds the canonical source. The custom domain is the reader-facing publication layer, backed by GitHub Pages and served through Cloudflare.

## Repository Role

The repository has grown into three coordinated layers:

1. **Framework authority** — principles, specifications, viewpoints, correspondence rules, diagnostics, guides, templates, examples, and reference material.
2. **Publication estate** — research papers, article series, public operating models, and generated reader pages.
3. **Tooling** — a TypeScript/Node.js application that loads framework knowledge, routes structured requests through specialised generators, validates outputs, and prepares repository-aligned artefacts.

The objective is not documentation volume. The objective is to make architecture intent, decisions, guardrails, evidence, and delivery action explicit and traceable.

## Core Framework Areas

| Path | Purpose |
|---|---|
| `spec/` | Formal framework specification |
| `foundation/` | Foundational principles and concepts |
| `viewpoints/` | Viewpoint definitions and instruments |
| `correspondence-rules/` | Cross-viewpoint alignment and validation rules |
| `frameworks/` | Supporting framework references and classifications |
| `diagnostics/` | Decision and organisational diagnostic material |
| `guides/` | Practitioner operating guidance |
| `templates/` | Reusable architecture templates |
| `examples/` | Worked examples and reference outputs |
| `research/` | Research papers, evidence, and source material |
| `series/` | Long-form article and thought-series source |
| `publications/` | Reader-facing publication pages and published material |
| `ecosystem/` | Cross-repository links and change protocols |

## Application and Generated Artefacts

The Velocity Agentic Architect is implemented in `app/`. It currently provides:

- an Express API and portal entry point;
- a framework knowledge loader;
- an orchestration layer;
- six generator families covering governance, strategy, design, velocity, rhythm, and practitioner outputs;
- routing for strategic, design, governance, assurance, delivery, and value artefacts;
- validation and GitHub action support;
- structured output metadata and repository paths.

Primary endpoints:

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/` | Portal UI |
| `GET` | `/health` | Runtime health |
| `GET` | `/status` | Runtime and capability status |
| `POST` | `/artefacts/generate` | Generate requested architecture artefacts |

Generated and reference outputs are held under `artefacts/`. Templates and worked examples remain separate so generated output is not treated as canonical framework doctrine.

## Public Site and Publishing

The repository also contains a static publication estate served at `velocityarchitectureframework.com`. Source Markdown is rendered into reader pages through repository scripts and section-specific HTML.

Relevant areas include:

- `scripts/` — publishing and repository utility scripts;
- `design-system/` and `assets/` — shared visual and brand resources;
- root and section-level HTML — GitHub Pages publication surfaces;
- `.github/workflows/` — deployment, publication, and repository checks;
- `docs/` — deployment, continuity, and operational documentation.

Public source and generated publication output should remain distinguishable. Generated pages should not become a second source of truth for framework content. Existing public routes must remain stable when source documents are relocated.

## Local Development

Requirements:

- Node.js 20 or later;
- npm;
- an Anthropic API key for generation;
- a GitHub token only where repository write operations are enabled.

```bash
npm ci
cp .env.example .env
npm run dev
```

Build and run compiled output:

```bash
npm run build
npm start
```

Other available commands:

```bash
npm test
npm run lint
npm run format
```

The application uses port `3000` by default. Environment variables and safe placeholders are documented in `.env.example`.

## Repository Controls

- Do not commit credentials, tokens, private environment files, or client data.
- Treat generated artefacts as outputs, not automatically accepted architecture decisions.
- Preserve human review and professional accountability for AI-assisted outputs.
- Keep framework source, generated publication output, application code, and operational evidence clearly separated.
- Preserve public custom-domain routes when moving canonical source files.
- Update cross-repository links through the ecosystem registry and change protocol.
- Use `main` as the source of truth unless a release process explicitly states otherwise.

See [`AI_AND_CLIENT_DATA_USAGE_POLICY.md`](AI_AND_CLIENT_DATA_USAGE_POLICY.md), [`CONTRIBUTING.md`](CONTRIBUTING.md), and the material under `ecosystem/` for supporting controls.

## Project Status

Active and evolving.

The repository now operates as a combined framework authority, publication estate, and architecture tooling codebase. Current maintenance priorities are structural consolidation, consistent naming, removal of duplicate operational files, clearer separation of source and generated assets, preservation of public routes, and alignment of version and licensing metadata.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Changes should preserve framework traceability, distinguish source from generated output, avoid duplicating canonical material across directories, and validate public routes before relocation.

## Licence and Trademark

Licensing and usage terms are recorded in [`LICENSE.md`](LICENSE.md) and [`LICENCE-TERMS.md`](LICENCE-TERMS.md). Velocity Architecture Framework™ and related marks remain subject to the trademark statements in those files.

© 2026 Phil Myint / ZenCloud Global Consultants.
