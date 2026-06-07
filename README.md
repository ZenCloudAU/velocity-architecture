# Velocity Architecture Framework™

Velocity Architecture Framework is a decision-first architecture framework and tooling ecosystem for enterprise architecture, solution architecture, governance, research, and AI-assisted delivery.

This repository is the source of truth for the framework, its practitioner material, public publications, reference artefacts, and supporting tooling.

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

GitHub holds the canonical source. GitHub Pages publishes the static site, while Cloudflare provides the custom-domain edge layer. Separate Azure application experiments or instances are not part of the article and publication-site delivery model.

## Repository Role

The repository has grown into three coordinated areas:

1. **Framework authority** — principles, specifications, viewpoints, correspondence rules, diagnostics, guides, templates, examples, and reference material.
2. **Publication estate** — research papers, article series, public operating models, and rendered reader pages.
3. **Supporting tooling** — scripts and application experiments that support framework development but are not necessarily part of the public publication runtime.

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

## Public Site and Publishing

The static publication estate is served at `velocityarchitectureframework.com`. Source Markdown is rendered into reader pages through repository scripts and section-specific HTML.

Relevant areas include:

- `scripts/` — publishing and repository utility scripts;
- `design-system/` and `assets/` — shared visual and brand resources;
- root and section-level HTML — GitHub Pages publication surfaces;
- `docs/` — deployment, continuity, and operational documentation.

Public source and generated publication output should remain distinguishable. Generated pages should not become a second source of truth for framework content. Existing public routes must remain stable when source documents are relocated.

## Supporting Application Code

The repository also contains TypeScript and Node.js application code under `app/`, plus related deployment artefacts. This code is separate from the static article and publication site unless a future release explicitly integrates it.

Generated and reference outputs are held under `artefacts/`. Templates and worked examples remain separate so generated output is not treated as canonical framework doctrine.

## Local Development

Requirements:

- Node.js 20 or later;
- npm;
- an Anthropic API key where generation features are used;
- a GitHub token only where repository write operations are enabled.

```bash
npm ci
cp .env.example .env
npm run dev
```

Build compiled application output:

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

## Repository Controls

- Do not commit credentials, tokens, private environment files, or client data.
- Treat generated artefacts as outputs, not automatically accepted architecture decisions.
- Preserve human review and professional accountability for AI-assisted outputs.
- Keep framework source, rendered publication output, application code, and operational evidence clearly separated.
- Preserve public custom-domain routes when moving canonical source files.
- Update cross-repository links through the ecosystem registry and change protocol.
- Use `main` as the source of truth unless a release process explicitly states otherwise.

See [`AI_AND_CLIENT_DATA_USAGE_POLICY.md`](AI_AND_CLIENT_DATA_USAGE_POLICY.md), [`CONTRIBUTING.md`](CONTRIBUTING.md), and the material under `ecosystem/` for supporting controls.

## Project Status

Active and evolving.

The public article and publication site is operational. Current maintenance priorities are structural consolidation, consistent naming, removal of duplicate operational files, clearer separation of source and generated assets, preservation of public routes, and alignment of version and licensing metadata.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Changes should preserve framework traceability, distinguish source from generated output, avoid duplicating canonical material across directories, and validate public routes before relocation.

## Licence and Trademark

Licensing and usage terms are recorded in [`LICENSE.md`](LICENSE.md) and [`LICENCE-TERMS.md`](LICENCE-TERMS.md). Velocity Architecture Framework™ and related marks remain subject to the trademark statements in those files.

© 2026 Phil Myint / ZenCloud Global Consultants.
