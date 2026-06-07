# Public Site Content Location and Runtime Review

Status: repository and deployment assessment  
Scope: `velocityarchitectureframework.com`, the static framework estate, and the Velocity Agentic Architect runtime.

## Executive conclusion

The site is **not configured to work end-to-end as one coherent public service**.

The repository currently contains two incompatible deployment models:

1. a root-published GitHub Pages static site, indicated by `CNAME`, `_config.yml`, and the large static HTML estate; and
2. a Cloudflare-proxied Azure Container Instance, indicated by `PHASE5_RUNBOOK.md`, `.github/workflows/deploy.yml`, `Dockerfile`, `nginx.conf`, and the Express application.

Either model can serve part of the experience, but neither model alone can serve the complete experience as currently implemented.

The current DNS target and Cloudflare rules must be inspected outside the repository before the live origin can be declared conclusively. Repository documentation is contradictory and must not be treated as proof of current DNS behaviour.

## Deployment conflict

### Static-site model

Repository evidence for GitHub Pages includes:

- `CNAME` containing `velocityarchitectureframework.com`;
- `_config.yml` identifying GitHub Pages;
- root `index.html` and section-level static routes;
- public reader pages under `research/`, `frameworks/`, `guides/`, `diagnostics/`, `templates/`, `spec/`, and `publications/`.

If Cloudflare points the custom domain to GitHub Pages, the static framework and publication routes can work.

However, GitHub Pages cannot execute:

```text
POST /artefacts/generate
GET /health
GET /status
```

The public agent portal posts to `/artefacts/generate`, so generation will fail unless Cloudflare or another edge component explicitly proxies API routes to the Azure application.

### Azure application model

Repository evidence for Azure Container Instances includes:

- `.github/workflows/deploy.yml`, which builds and deploys the container on every push to `main`;
- `PHASE5_RUNBOOK.md`, which instructs Cloudflare to proxy an A record to an Azure public IP;
- `nginx.conf`, which proxies every request to Express;
- `app/app.ts`, which implements the agent API.

If Cloudflare points the custom domain to Azure, the agent API can work.

However, the container does not package or serve the complete static framework site:

- `Dockerfile` copies only `app/portal.html` as a non-TypeScript asset;
- Express serves that portal only at `/`;
- there is no `express.static()` middleware;
- Nginx proxies every path to Express;
- Express returns JSON 404 responses for all other paths.

Under that model, routes such as these will fail:

```text
/research/
/publications/
/frameworks/
/guides/
/site-map.html
/_tokens.css
/app/portal.html
```

The Azure application currently serves the portal at `/`, not `/app/portal.html`, despite public navigation linking to `/app/portal.html`.

## No route-splitting implementation is recorded

A complete combined service would require Cloudflare routing similar to:

```text
/artefacts/*  -> Azure application
/health       -> Azure application
/status       -> Azure application
/*            -> GitHub Pages or static-site origin
```

No Cloudflare Worker, Pages Function, route manifest, reverse-proxy configuration, or infrastructure-as-code implementation for this split is present in the repository.

A manual Cloudflare rule may exist outside the repository, but it is not evidenced or governed here.

## Azure IP stability risk

The Azure workflow deletes and recreates the container on deployment. The runbook instructs Cloudflare to use a fixed A record pointing to an Azure public IP.

A recreated Azure Container Instance may receive a different public IP. The workflow assigns a DNS label but does not update the Cloudflare A record. This creates a deployment risk where every redeployment can leave Cloudflare pointing at a stale address.

The stable Azure FQDN should be used through a CNAME where supported, or the deployment workflow should update Cloudflare DNS automatically.

## Content-location findings

### Route-critical public output

These currently define public routes and must not move without compatibility handling:

```text
index.html
site-map.html
CNAME
_config.yml
_tokens.css
favicon.svg
publications/
research/**/index.html
frameworks/**/index.html
guides/**/index.html
diagnostics/**/index.html
examples/**/index.html
spec/**/index.html
templates/**/index.html
viewpoints/index.html
```

### Canonical Markdown source

These are generally reasonable source locations:

```text
research/
frameworks/
guides/
diagnostics/
templates/
viewpoints/
book/
series/
signals-series/
```

The main structural problem is that canonical source, generated HTML, application code, operational documents, and local workspace files are all inside the same repository and potentially the same deployment source.

### Root public documents

Several root Markdown documents are loaded by `docs.html?doc=<filename>` through a hardcoded allowlist and relative fetch requests.

They are in poor long-term locations but cannot be moved independently. A move must update:

- the viewer allowlist;
- homepage links;
- source fetch paths;
- generated reader pages;
- GitHub source links;
- build manifests;
- legacy public URLs.

### Wrong deployment content

These should not be included in a public static-site artifact unless intentionally published:

```text
.claude/settings.local.json
.superpowers/brainstorm/
docs/continuity/
docs/superpowers/
project completion records
migration instructions
local working notes
repository/
website/
vsf-scorer/ source
server-side TypeScript source
```

## Required target architecture

### Recommended public topology

Use separate origins with explicit routing:

```text
www/custom domain static routes -> generated static-site artifact
api.velocityarchitectureframework.com -> Azure application
```

Preferred public routes:

```text
https://velocityarchitectureframework.com/                 static framework
https://velocityarchitectureframework.com/research/        static publication
https://api.velocityarchitectureframework.com/             agent API
```

The static agent client can remain on the framework domain but should call an explicit API base URL:

```text
https://api.velocityarchitectureframework.com/artefacts/generate
```

This is clearer and safer than depending on undocumented path-based Cloudflare proxy rules.

### Recommended repository layout

```text
content/                     canonical publication source
app/                         server application source
site-src/                    static-site templates and client source
site/                        generated deployment artifact
ops/                         deployment configuration
```

Deploy only `site/` to GitHub Pages. Deploy only the built application to Azure.

## Required verification

A live acceptance test must verify all of the following through the public domain:

```text
GET  /
GET  /research/
GET  /publications/
GET  /site-map.html
GET  /_tokens.css
GET  /docs.html?doc=VELOCITY_ENTERPRISE_ONE_PAGER.md
GET  /app/portal.html or its replacement route
GET  /health
GET  /status
POST /artefacts/generate with a controlled test request
```

Also verify:

- DNS A/CNAME targets;
- Cloudflare proxied status;
- Cloudflare redirect, origin, and Worker rules;
- TLS mode;
- GitHub Pages custom-domain status;
- Azure container FQDN and current public IP;
- browser console errors;
- mobile navigation;
- source-backed document loading;
- 404 behaviour;
- cache invalidation after deployment.

## Immediate decision

Do not relocate route-critical documents yet.

First resolve and document the live topology:

1. determine whether Cloudflare currently sends the apex domain to GitHub Pages or Azure;
2. inspect whether any path-based Cloudflare routing exists;
3. establish one static-site origin and one API origin;
4. run the full acceptance test;
5. only then begin route-safe source relocation.
