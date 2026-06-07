# Public Site Content Location Review

Status: repository and route assessment  
Scope: the live Velocity Architecture site published from this repository through GitHub Pages, using the custom domain `velocityarchitectureframework.com` and Cloudflare at the DNS/edge layer.

## Executive conclusion

The documents are **not all in their correct long-term locations**, but many of them are currently in **route-critical locations**.

This repository is not only source control. With GitHub Pages publishing from `main` and the repository root, file placement directly controls public URLs and browser behaviour. A conventional root cleanup performed without a route migration would break the live site.

The correct approach is therefore:

1. freeze existing public URLs;
2. classify every file as public output, canonical content source, application source, operational documentation, or archive;
3. create a route/content registry;
4. move canonical source independently of public URLs;
5. deploy only an explicit public-site artifact;
6. preserve old routes with compatibility pages or redirects.

## Confirmed publishing model

Repository evidence establishes the following model:

- `CNAME` declares `velocityarchitectureframework.com` as the GitHub Pages custom domain;
- `_config.yml` describes a GitHub Pages static site and declares the same URL;
- deployment documentation says the source branch is `main` and the site source is static;
- root HTML uses domain-root paths such as `/_tokens.css`;
- Cloudflare is the DNS/edge layer for the custom domain.

The canonical public address should therefore be:

```text
https://velocityarchitectureframework.com/
```

The `zencloudau.github.io/velocity-architecture/` address is a retired or technical GitHub Pages address, not the public canonical URL. Documentation should not present both as equivalent production destinations.

## Why location matters

Under the current root-published model:

```text
repository path                         public route
index.html                              /
research/index.html                     /research/
research/example/index.html             /research/example/
publications/index.html                 /publications/
publications/book/chapter.html          /publications/book/chapter.html
app/portal.html                         /app/portal.html
site-map.html                           /site-map.html
_tokens.css                             /_tokens.css
```

Moving a rendered HTML file changes or removes its public URL.

Moving a Markdown source file can also break a public page because several readers fetch source directly from `raw.githubusercontent.com` at runtime. Generated reader pages embed the exact Markdown path in their JavaScript and GitHub source links.

## Current content classes

### 1. Public route layer — generally in the correct functional locations

These files and directories currently define public URLs and should remain route-stable until a controlled site migration:

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
assets used by public HTML
```

The public route taxonomy is broadly understandable:

- `/research/`
- `/frameworks/`
- `/guides/`
- `/diagnostics/`
- `/examples/`
- `/spec/`
- `/templates/`
- `/viewpoints/`
- `/publications/`

These route names should be preserved even if the repository source structure changes.

### 2. Canonical Markdown source — mostly in reasonable domain locations

The following source areas are correctly grouped by subject and can remain canonical source locations in the short term:

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

The patterns below are valid:

```text
book/*.md                -> publications/book/*.html
series/**/*.md           -> publications/thought-series/**/*.html
signals-series/*.md      -> publications/signal/*.html
research/*.md            -> research/<slug>/index.html
```

The weakness is not the domain names. It is that source Markdown and generated HTML are mixed inside the same deployable repository tree, and some public pages load source from GitHub dynamically instead of containing a built copy.

### 3. Root public documents — incorrectly organised, but currently route-critical

A set of root Markdown files is intentionally exposed through `docs.html?doc=<filename>`.

The viewer allowlist currently includes files such as:

```text
VELOCITY_ENTERPRISE_ONE_PAGER.md
VELOCITY_EXECUTIVE_ARCHITECTURE_FASTSTART.md
ARCHITECTURE_DECISION_SPRINT.md
SLT_DISCOVERY_WORKSHOP_AGENDA.md
VELOCITY_DECISION_MATURITY_ASSESSMENT.md
VELOCITY_AI_ARCHITECTURE_COORDINATION_LAYER.md
VELOCITY_EA_VALUE_METRICS.md
AI_AND_CLIENT_DATA_USAGE_POLICY.md
VELOCITY_ENTERPRISE_ENGAGEMENT_PACK.md
CONTENT_AND_PUBLISHING_PIPELINE.md
FUTURE_FRAMEWORK_LENSES.md
ECOSYSTEM_OPERATING_MODEL.md
BRAND_SYSTEM.md
PORTFOLIO_REPO_MAP.md
```

These files are in the wrong long-term repository locations, but moving them immediately would break:

- `docs.html` allowlist keys;
- relative `fetch(requestedDoc)` requests;
- raw Markdown links;
- homepage engagement-asset links;
- external links using `docs.html?doc=...`;
- generated publication pages that reference the root source path.

They should move only after the public viewer is registry-driven and supports source paths independently of public route slugs.

### 4. Generated publication output — correct route concept, weak generation boundary

`publications/` is correctly serving as a reader-facing output namespace.

However, it currently contains a mixture of:

- handcrafted HTML;
- generated reader wrappers;
- full standalone article HTML;
- publication indexes;
- stylesheets;
- aliases for content whose canonical source lives elsewhere.

This is acceptable as a deployment output directory. It should not be treated as canonical source unless a page is intentionally handcrafted.

The build should eventually recreate this directory from source and metadata. Generated output should not need manual source-of-truth decisions.

### 5. Operational and continuity documents — wrong for the public deployment artifact

The following classes do not belong in the deployed public-site artifact unless explicitly published:

```text
docs/continuity/
docs/superpowers/
docs/live-deployment-audit.md
project completion and phase records
migration instructions
local working notes
agent workspace output
```

They may remain in the public GitHub repository if they are intentionally transparent, but the website deployment should not copy them to the custom domain by default.

### 6. Local and generated workspaces — wrong repository locations

The following are not public-site content and should be removed, ignored, or moved to an external workspace archive:

```text
.claude/settings.local.json
.superpowers/brainstorm/
docs/superpowers/*zencloud-advisory*
```

The ZenCloud Advisory redesign plans also have the wrong repository owner.

### 7. Duplicate or legacy site surfaces — wrong locations

The following create competing site implementations or stale public routes:

```text
website/_config.yml
website/landing-page.html
docs.html
repository/
_tokens.css versus design-system/vaf-tokens.css
```

Specific treatment:

- `website/` appears to be a legacy alternate site implementation and should be archived or removed after reference checks.
- `repository/` is a repository-inside-the-repository duplicate and should not be part of the public information architecture.
- `docs.html` is an active public viewer despite its generic name. It should be replaced by a stable route such as `/library/` or `/documents/`, while retaining `docs.html` as a compatibility redirect.
- `_tokens.css` is route-critical because the homepage imports it from `/_tokens.css`. It cannot be removed until every consumer is migrated to a canonical public stylesheet route such as `/assets/css/tokens.css`.

### 8. Application files — mixed public and server concerns

`app/` contains both TypeScript server code and public HTML.

The public site links to:

```text
/app/portal.html
```

GitHub Pages can serve that HTML, but it cannot run the Express API. The portal should only be advertised as operational if Cloudflare or another origin routes its API calls to the deployed backend.

The preferred separation is:

```text
app/                         application source only
site/tools/agent/            static public client
```

or a dedicated application domain with the framework site linking to it.

The current `app/portal.html` route should remain only as a compatibility route if it has already been distributed publicly.

### 9. Embedded standalone tool — wrong boundary

`vsf-scorer/` is a standalone Vite application inside the framework repository.

A source application should not be accidentally published merely because the main repository root is the Pages source. It should either:

- move to its own repository;
- remain as source but be excluded from the public site build; or
- publish only its built static output to an intentional route.

## Navigation and discoverability findings

### The current site map is a navigation page, not a search-engine sitemap

`site-map.html` is useful for people but:

- it is not `sitemap.xml`;
- it does not enumerate the full public publication estate;
- it is not clearly linked from the main homepage navigation;
- it labels the bare custom-domain URL as the agent even though that URL is also the framework homepage.

Add:

```text
sitemap.xml
robots.txt
404.html
```

Generate `sitemap.xml` from the route registry rather than maintaining it manually.

### Canonical URL usage is inconsistent

Current documentation alternates between:

```text
https://velocityarchitectureframework.com/
https://zencloudau.github.io/velocity-architecture/
```

The custom domain should be canonical everywhere. Public HTML should add:

```html
<link rel="canonical" href="https://velocityarchitectureframework.com/<route>">
```

Open Graph URLs should also use the custom domain for each page, not only the homepage.

### Relative path styles are mixed

The site uses both:

```text
/index-like relative paths
/domain-root absolute paths beginning with /
```

Root-relative paths are valid for the custom domain and reinforce that the `github.io/velocity-architecture/` project path is not an equivalent browsing URL.

Use the custom domain as the only canonical public URL and test all pages against that route model.

## Recommended target architecture

### Preferred target: explicit site artifact deployed by GitHub Actions

```text
content/
├── research/
├── frameworks/
├── guides/
├── diagnostics/
├── templates/
├── publications/
├── engagements/
└── policies/

app/                         # TypeScript application source
repository source domains/   # specifications, code, evidence and operations

site/                        # generated deployment artifact
├── index.html
├── site-map.html
├── sitemap.xml
├── robots.txt
├── 404.html
├── assets/
├── research/
├── frameworks/
├── guides/
├── diagnostics/
├── examples/
├── spec/
├── templates/
├── viewpoints/
└── publications/
```

A GitHub Actions Pages workflow should build `site/` and deploy only that directory.

Benefits:

- repository source location no longer dictates public URL;
- operational documents are not accidentally deployed;
- public routes remain stable while source files move;
- one build can validate all links and source mappings;
- `CNAME`, `sitemap.xml`, canonical tags, and public assets are generated consistently;
- Cloudflare DNS and the public domain do not need to change.

### Interim target: retain root deployment but introduce strict controls

If an Actions-based site artifact is deferred:

1. keep all current public HTML paths unchanged;
2. create a content/route registry;
3. stop adding new root Markdown files;
4. update `_config.yml` exclusions for operational and source-only areas;
5. migrate `docs.html` to registry-driven source paths;
6. update all reader generators to use the registry;
7. relocate root Markdown in small batches;
8. retain compatibility HTML for old public routes.

## Required content registry

Create one machine-readable source, for example:

```text
site/content-registry.json
```

Recommended fields:

```json
{
  "id": "velocity-enterprise-one-pager",
  "title": "Velocity Enterprise One Pager",
  "type": "engagement",
  "status": "published",
  "source": "content/engagements/offers/velocity-enterprise-one-pager.md",
  "route": "/publications/velocity-enterprise-one-pager/",
  "legacy_routes": [
    "/docs.html?doc=VELOCITY_ENTERPRISE_ONE_PAGER.md"
  ],
  "listed": true,
  "searchable": true
}
```

This registry should drive:

- publication indexes;
- reader pages;
- homepage cards;
- navigation;
- `sitemap.xml`;
- source links;
- route validation;
- redirects and compatibility pages.

## Route stability policy

### Do not change without compatibility handling

```text
/
/research/
/research/<slug>/
/frameworks/
/frameworks/<slug>/
/guides/
/guides/<slug>/
/diagnostics/
/diagnostics/<slug>/
/examples/
/spec/
/spec/<slug>/
/templates/
/templates/<slug>/
/viewpoints/
/publications/
/publications/book/
/publications/thought-series/
/publications/signal/
/publications/<slug>/
/app/portal.html
/docs.html?doc=<legacy-file>
```

A source document may move without changing its public route. A public route should change only with a redirect or compatibility page.

## Revised cleanup sequence

### Phase A — establish the public contract

- declare `velocityarchitectureframework.com` canonical;
- document GitHub Pages as origin and Cloudflare as DNS/edge;
- inventory every public route;
- create the content registry;
- add route, link, and source-path validation;
- add `sitemap.xml`, `robots.txt`, and `404.html`.

### Phase B — remove material that is not route-dependent

- remove local settings and workspace artefacts;
- remove the duplicate root deployment workflow;
- move wrong-repository ZenCloud Advisory plans;
- archive clearly obsolete project records;
- do not move root viewer documents yet.

### Phase C — migrate root public documents

For each document:

1. move canonical Markdown to its domain directory;
2. update the registry source path;
3. update `docs.html` or replace it with the registry reader;
4. update homepage links;
5. update `scripts/build-docs.js` or its replacement;
6. regenerate public reader output;
7. preserve the old query-string route;
8. validate through the custom domain.

### Phase D — separate the deployment artifact

- build `site/` from canonical source;
- deploy `site/` through GitHub Actions Pages;
- preserve the custom domain and Cloudflare configuration;
- compare the complete route manifest before cutover;
- remove root-publishing assumptions only after route parity is proven.

## Immediate decision

Do **not** perform a broad root relocation yet.

The next implementation change should first create a public route/content inventory and update the cleanup plan so that every relocation is tested against the live custom-domain route contract.
