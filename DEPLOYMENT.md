# Deployment

Canonical public URL: https://velocityarchitectureframework.com/

## Public site

The framework, articles, research, guides, templates, and publication library are delivered as a static GitHub Pages site.

- Source branch: `main`
- Pages source: repository root
- Custom domain: declared in `CNAME`
- DNS and edge: Cloudflare
- Canonical content source: this repository

Repository paths for rendered HTML are public routes. Route-entry files and source-backed reader documents must not be relocated without updating links, readers, build manifests, and compatibility routes.

## Separate application artefacts

The Azure container and related TypeScript application files are separate from the public article and publication-site delivery model. They should be documented and maintained independently and must not be used to assess whether the static article site is operational.

Related material:

- `docs/deployment-map.md`
- `docs/public-site-content-location-review.md`
- `ecosystem/LINK-REGISTRY.md`
