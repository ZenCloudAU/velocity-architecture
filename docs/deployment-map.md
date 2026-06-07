# ZenCloudAU Deployment Map

This document records the deployment model for the ZenCloudAU / Velocity Architecture ecosystem.

## Deployment Principles

1. Source files and generated build files should be separate.
2. Canonical URL, origin, DNS/edge provider, build command, and output directory must be recorded independently.
3. Cloudflare may provide DNS, TLS, redirects, caching, and security without being the content origin.
4. Public route stability is part of the deployment contract.

## Velocity Architecture Public Site

| Field | Value |
|---|---|
| Role | Framework authority and publication estate |
| Canonical URL | https://velocityarchitectureframework.com/ |
| Origin | GitHub Pages |
| Source | `main`, repository root |
| Edge and DNS | Cloudflare |
| Content model | Static HTML with source-backed Markdown readers |
| Status | Operational |

The public site includes framework pages, research, articles, publications, guides, diagnostics, templates, specifications, examples, and viewpoints.

Repository paths for rendered HTML currently map directly to public routes. Source Markdown paths are also embedded in several reader pages. A cleanup must therefore preserve routes and update source mappings atomically.

## Separate Azure Application Instance

The repository contains Azure container deployment and TypeScript application artefacts. That instance is separate from the article and publication site and is out of scope for static-site availability and content-location assessment.

It should be treated as a distinct application concern even though the code currently shares this repository.

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

## Public-Site Acceptance Checks

Verify after structural changes:

```text
GET /
GET /research/
GET /publications/
GET /site-map.html
GET /_tokens.css
GET /docs.html?doc=VELOCITY_ENTERPRISE_ONE_PAGER.md
```

Also verify:

- Cloudflare custom-domain routing;
- GitHub Pages deployment freshness;
- browser console and network errors;
- source-backed document loading;
- mobile navigation;
- 404 behaviour;
- cache invalidation.

## Execution Rule

Do not relocate route-critical content until the public route inventory and source mappings are captured.
