# Deployment

Canonical public URL: https://velocityarchitectureframework.com/

## Current repository evidence

The repository contains two deployment models:

1. **Static publication estate**
   - GitHub Pages configuration in `_config.yml`;
   - custom-domain declaration in `CNAME`;
   - root and section-level HTML routes.

2. **Agent application**
   - container deployment through `.github/workflows/deploy.yml`;
   - Azure Container Instances origin;
   - Cloudflare proxy instructions in `PHASE5_RUNBOOK.md`;
   - Express endpoints for `/`, `/health`, `/status`, and `/artefacts/generate`.

The repository does not establish which origin currently receives the custom domain or whether Cloudflare splits routes between the two origins.

## Consequence

- GitHub Pages can serve the static framework and publications but cannot execute the agent API.
- The Azure container can serve the agent portal and API but does not package or serve the complete static publication estate.

Do not describe the service as fully operational until DNS and Cloudflare routing are inspected and all public routes pass an acceptance test.

## Required target

Use either:

- separate static and API domains; or
- documented Cloudflare path routing between a static origin and the Azure API origin.

Related material:

- `docs/deployment-map.md`
- `docs/public-site-content-location-review.md`
- `ecosystem/LINK-REGISTRY.md`
- `PHASE5_RUNBOOK.md`
