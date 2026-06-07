# ZenCloudAU Deployment Map

This document defines the deployment model for the ZenCloudAU / Velocity Architecture ecosystem.

## Deployment Principles

1. Source files and generated build files should be kept separate where practical.
2. Cloudflare Pages is used for commercial or primary brand surfaces where recorded below.
3. GitHub Pages is used for static learning assets, tools, demos, and public reference sites.
4. Cloudflare may provide DNS, TLS, redirects, caching, or edge services in front of an origin platform; the origin and edge roles must be recorded separately.
5. Each repository should declare:
   - purpose;
   - source of truth;
   - origin/deployment target;
   - DNS and edge provider;
   - canonical production URL;
   - build command;
   - output directory;
   - owner role in the ecosystem.

## Cloudflare Pages Sites

| Repo | Role | Production URL | Build Command | Output | Status |
|---|---|---|---|---|---|
| zencloud-advisory | Commercial advisory site | https://www.zencloud.com.au/ | npm run build | dist | Active main-dev project |
| velocity-academy | Learning hub | https://velocityarchitecture.com.au/ | Static / Cloudflare Pages | root | Verify production deployment freshness |
| studiosix | Product/media studio | https://studiosix.com.au/ | npm run build | dist | Active |
| pmi-portal | PMO / delivery governance workspace | TBD | npm run build | dist | Confirm production URL |
| ea-artefact-generator | EA artefact tooling | https://ea.velocityarchitecture.com.au/ | npm run build | dist | Active |

## GitHub Pages Sites

| Repo | Role | Canonical Production URL | Origin Model | Edge | Status |
|---|---|---|---|---|---|
| velocity-architecture | Framework authority and publication estate | https://velocityarchitectureframework.com/ | GitHub Pages from `main` repository root | Cloudflare | Active; route-sensitive root deployment |
| vaf-sa | Solution architecture method | https://zencloudau.github.io/vaf-sa/ | GitHub Pages static | GitHub Pages | Active |
| vsf-match | Career readiness tool | https://zencloudau.github.io/vsf-match/ | GitHub Actions Pages | GitHub Pages | Active; review generated asset strategy |
| trading-dashboard | Personal / educational trading lab | https://zencloudau.github.io/trading-dashboard/ | GitHub Pages static | GitHub Pages | Active lab asset |
| vaf-python-zero-to-hero | Python course | https://zencloudau.github.io/vaf-python-zero-to-hero/ | GitHub Pages static | GitHub Pages | Active course |
| vaf-typescript-zero-to-hero | TypeScript course | https://zencloudau.github.io/vaf-typescript-zero-to-hero/ | GitHub Pages / docs redirect | GitHub Pages | Active course |
| learn-with-claude | AI-assisted coding learning path | https://zencloudau.github.io/learn-with-claude/ | GitHub Pages static | GitHub Pages | Active |
| SAPEACertification | SAP EA certification study hub | https://zencloudau.github.io/SAPEACertification/ | GitHub Pages static | GitHub Pages | Active |
| AzureSACertification | Azure SA certification study hub | https://zencloudau.github.io/AzureSACertification/ | GitHub Pages static | GitHub Pages | Active |
| CISSPCertification | CISSP certification study hub | https://zencloudau.github.io/CISSPCertification/ | GitHub Pages static | GitHub Pages | Active |
| agentic-cert | Agentic AI certification hub | https://zencloudau.github.io/agentic-cert/ | GitHub Pages static | GitHub Pages | Active |

## Velocity Architecture Deployment Contract

The Velocity Architecture repository currently publishes from the repository root. Therefore:

- repository paths for rendered HTML are public routes;
- root-relative links assume the custom domain;
- `velocityarchitectureframework.com` is canonical;
- the `github.io/velocity-architecture/` address is retired or technical;
- Markdown source paths are embedded in reader pages and cannot be moved independently;
- a broad repository cleanup must preserve all public routes.

See `docs/public-site-content-location-review.md` for the route and content-location assessment.

## Deployment Health Checks

For every repository:

- README has the canonical live URL;
- GitHub About section has the canonical website URL;
- repository description exists;
- origin platform is known;
- edge/DNS provider is known;
- production branch and deployment source are known;
- main branch is source of truth unless the repository explicitly states otherwise;
- no accidental `node_modules` are committed;
- no secrets are committed;
- no local-only agent settings are committed unless intentionally tracked;
- generated build assets are either intentionally committed or excluded;
- custom-domain routes are validated after deployment;
- canonical tags, Open Graph URLs, sitemap, robots, and 404 behaviour are verified.

## Known Follow-up Items

1. Confirm Cloudflare Pages production branch for velocity-academy.
2. Confirm whether velocity-academy deploys from root or build output.
3. Decide whether vsf-match should continue committing generated assets back to the repository.
4. Standardise README deployment blocks across all repositories.
5. Add consistent footer routing across public sites.
6. Confirm production URL and deployment target for pmi-portal.
7. Confirm Cloudflare build settings for zencloud-advisory before replacing the primary ZenCloud site.
8. Move Velocity Architecture from route-sensitive root publication to an explicit generated site artifact after route parity is established.

## Execution Rule

Automation-first. Do not perform manual local edits unless explicitly requested. Deployment and workflow changes require a confidence threshold of at least 90%; otherwise pause and request verification.
