# ZenCloudAU Deployment Map

This document records the deployment model for the ZenCloudAU / Velocity Architecture ecosystem.

## Deployment Principles

1. Source files and generated build files should be separate.
2. Canonical URL, origin, DNS/edge provider, build command, and output directory must be recorded independently.
3. Cloudflare may provide DNS, TLS, redirects, caching, security, or path routing without being the application origin.
4. A service must not be declared operational until its public routes and APIs pass acceptance tests.

## Velocity Architecture — unresolved topology

Canonical URL:

```text
https://velocityarchitectureframework.com/
```

Repository evidence currently describes two different origins:

| Layer | Repository evidence | Capability |
|---|---|---|
| Static publication estate | `CNAME`, `_config.yml`, root and section-level HTML | Framework, research, guides, publications and public readers |
| Agent application | `.github/workflows/deploy.yml`, `Dockerfile`, `nginx.conf`, `app/app.ts`, `PHASE5_RUNBOOK.md` | Portal, health/status endpoints and artefact generation API |

The live Cloudflare DNS target and any path-routing rules must be inspected before the active topology can be declared.

### Static-origin limitation

GitHub Pages can serve the publication estate but cannot execute:

```text
GET /health
GET /status
POST /artefacts/generate
```

### Azure-origin limitation

The Azure container packages the compiled application and `app/portal.html`, but not the full static website. Express serves the portal at `/` and returns JSON 404 responses for unimplemented routes. It therefore cannot serve the full publication estate as currently built.

### Required production model

Preferred:

```text
velocityarchitectureframework.com      -> static site origin
api.velocityarchitectureframework.com  -> Azure application origin
```

Alternative:

```text
/artefacts/*, /health, /status -> Azure
all other routes               -> static origin
```

The alternative requires documented Cloudflare routing or a reverse proxy that is version-controlled and tested.

## Other Ecosystem Sites

| Repo | Role | Canonical URL | Origin | Edge | Status |
|---|---|---|---|---|---|
| zencloud-advisory | Commercial advisory site | https://www.zencloud.com.au/ | Cloudflare Pages | Cloudflare | Active |
| velocity-academy | Learning hub | https://velocityarchitecture.com.au/ | Verify | Cloudflare | Verify deployment freshness |
| studiosix | Product/media studio | https://studiosix.com.au/ | GitHub Pages | Cloudflare | Active |
| ea-artefact-generator | EA artefact tooling | https://ea.velocityarchitecture.com.au/ | GitHub Pages | Cloudflare | Active |
| vaf-sa | Solution architecture method | https://zencloudau.github.io/vaf-sa/ | GitHub Pages | GitHub Pages | Active |
| vsf-match | Career readiness tool | https://zencloudau.github.io/vsf-match/ | GitHub Actions Pages | GitHub Pages | Active |
| vaf-python-zero-to-hero | Python course | https://zencloudau.github.io/vaf-python-zero-to-hero/ | GitHub Pages | GitHub Pages | Active |
| vaf-typescript-zero-to-hero | TypeScript course | https://zencloudau.github.io/vaf-typescript-zero-to-hero/ | GitHub Pages | GitHub Pages | Active |
| learn-with-claude | AI-assisted coding path | https://zencloudau.github.io/learn-with-claude/ | GitHub Pages | GitHub Pages | Active |
| SAPEACertification | SAP EA certification | https://zencloudau.github.io/SAPEACertification/ | GitHub Pages | GitHub Pages | Active |
| AzureSACertification | Azure SA certification | https://zencloudau.github.io/AzureSACertification/ | GitHub Pages | GitHub Pages | Active |
| CISSPCertification | CISSP certification | https://zencloudau.github.io/CISSPCertification/ | GitHub Pages | GitHub Pages | Active |

## Velocity Acceptance Test

Verify through the public domain:

```text
GET  /
GET  /research/
GET  /publications/
GET  /site-map.html
GET  /_tokens.css
GET  /docs.html?doc=VELOCITY_ENTERPRISE_ONE_PAGER.md
GET  /app/portal.html or the selected portal route
GET  /health
GET  /status
POST /artefacts/generate
```

Also inspect:

- Cloudflare DNS records and proxy status;
- Cloudflare Workers, Origin Rules, Redirect Rules, and path routing;
- GitHub Pages custom-domain status;
- Azure container FQDN and current public IP;
- browser console and network errors;
- cache invalidation;
- mobile navigation and document-reader loading.

## Execution Rule

Do not relocate route-critical content or change DNS until the active topology is confirmed and a route inventory is captured.
