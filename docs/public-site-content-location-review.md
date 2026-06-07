# Public Site Content Location Review

Status: repository and route assessment  
Scope: the live static framework, article, research, and publication site at `velocityarchitectureframework.com`.

## Executive conclusion

The public site works as intended as a static GitHub Pages publication site served through the custom domain and Cloudflare.

The question is not whether the article site is operational. It is whether the repository content is organised well enough to maintain that live site safely.

The documents are not all in their ideal long-term source locations, but many currently occupy route-critical locations. A conventional root cleanup without route-aware migration would break working public pages.

The correct approach is:

1. preserve the current public URL structure;
2. classify files as public route output, canonical source, operational documentation, supporting code, or archive;
3. create a route/content registry;
4. move canonical source without changing established public URLs;
5. update readers and build manifests in the same change as each move;
6. retain compatibility routes for previously published links.

## Confirmed publishing model

The article and publication site uses:

- GitHub Pages as the static content origin;
- `main` and the repository root as the current publication source;
- `CNAME` for `velocityarchitectureframework.com`;
- Cloudflare for the custom-domain DNS and edge layer;
- static HTML entry points and Markdown-backed document readers.

Separate Azure container or application artefacts in the repository are not part of the article-site delivery model and are outside the scope of this assessment.

## Why repository location matters

Under the current root-published model:

```text
repository path                         public route
index.html                              /
research/index.html                     /research/
research/example/index.html             /research/example/
publications/index.html                 /publications/
publications/book/chapter.html          /publications/book/chapter.html
site-map.html                           /site-map.html
_tokens.css                             /_tokens.css
```

Moving rendered HTML changes or removes its public URL.

Moving Markdown can also break public readers because several pages fetch exact source paths from `raw.githubusercontent.com` at runtime and embed matching GitHub source links.

## Content-location findings

### 1. Public route layer — correctly located for the current deployment

These files and directories define working public routes and should remain route-stable until a controlled publishing migration:

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
public assets used by those pages
```

The public information architecture is broadly coherent:

- `/research/`
- `/frameworks/`
- `/guides/`
- `/diagnostics/`
- `/examples/`
- `/spec/`
- `/templates/`
- `/viewpoints/`
- `/publications/`

These route names should remain stable even if repository source files are reorganised later.

### 2. Canonical Markdown source — mostly in sensible domain locations

These source areas are reasonably grouped:

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

The current publishing patterns are valid:

```text
book/*.md                -> publications/book/*.html
series/**/*.md           -> publications/thought-series/**/*.html
signals-series/*.md      -> publications/signal/*.html
research/*.md            -> research/<slug>/index.html
```

The structural weakness is that source Markdown and rendered HTML share the same deployable repository tree. This is manageable, but it increases the risk of accidental route breakage during cleanup.

### 3. Root public documents — poorly grouped but currently route-critical

A set of root Markdown files is intentionally exposed through:

```text
/docs.html?doc=<filename>
```

The viewer allowlist includes files such as:

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

These are not ideal root-level locations, but moving them immediately would break:

- the `docs.html` allowlist;
- relative source fetches;
- homepage links;
- raw Markdown links;
- shared query-string URLs;
- generated publication pages that reference root source paths.

They should move only after the viewer supports a registry that separates public document IDs from repository source paths.

### 4. Generated publication output — correct namespace, incomplete generation boundary

`publications/` is correctly used as a reader-facing route namespace.

It currently contains a mixture of:

- generated article HTML;
- handcrafted publication pages;
- reader wrappers;
- indexes;
- shared styles;
- aliases for source content stored elsewhere.

That mixture works, but the long-term build should distinguish canonical source from generated output more explicitly.

### 5. Operational and workspace material — wrong for a public-site deployment artifact

These classes are not public article content and should eventually be excluded from a dedicated static-site artifact:

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
server-side application source
standalone tool source
```

They may remain in the public GitHub repository where transparency is intentional, but they do not need to be part of what GitHub Pages publishes.

### 6. Duplicate or legacy site surfaces

The following deserve consolidation:

```text
website/_config.yml
website/landing-page.html
repository/
_tokens.css versus design-system/vaf-tokens.css
```

Treatment:

- `website/` appears to be a legacy alternate site surface and should be archived or removed after reference checks.
- `repository/` duplicates repository-level material and should not remain as a repository-inside-the-repository structure.
- `_tokens.css` is route-critical because the live homepage imports it from `/_tokens.css`; it cannot be removed until all consumers move to a replacement public stylesheet path.
- `docs.html` is active and should remain until a registry-based reader replaces it with compatibility handling.

## Navigation and discoverability findings

`site-map.html` is useful human navigation, but it is not a search-engine sitemap.

Recommended additions:

```text
sitemap.xml
robots.txt
404.html
```

Generate `sitemap.xml` from a route registry so all articles and publication routes can be covered consistently.

Canonical URLs and Open Graph URLs should use:

```text
https://velocityarchitectureframework.com/
```

The public site should not promote the GitHub Pages project URL as an equivalent canonical destination.

## Recommended target architecture

The preferred long-term model is an explicit generated site artifact:

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

site-src/                    static templates and reader components
site/                        generated GitHub Pages artifact
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

GitHub Actions would deploy only `site/` to Pages. Cloudflare and the custom domain would remain unchanged.

Benefits:

- repository source locations stop controlling public URLs directly;
- operational files are excluded from the site artifact;
- public routes can remain stable while source files move;
- build validation can cover links and source mappings;
- metadata, sitemap, and public assets can be generated consistently.

## Required content registry

Create a machine-readable registry such as:

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

The registry should drive:

- publication indexes;
- reader pages;
- homepage cards;
- navigation;
- `sitemap.xml`;
- source links;
- route validation;
- compatibility routes.

## Route stability policy

Do not change these without compatibility handling:

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
/docs.html?doc=<legacy-file>
```

A source document may move without changing its public route. A public route should change only with a redirect or compatibility page.

## Revised cleanup sequence

### Phase A — capture the working public contract

- inventory current public routes;
- create the content registry;
- add route, link, and source-path validation;
- add `sitemap.xml`, `robots.txt`, and `404.html`;
- record the GitHub Pages and Cloudflare publication model consistently.

### Phase B — remove material that is not route-dependent

- remove local settings and generated workspace artefacts;
- remove duplicate operational files;
- move wrong-repository design plans;
- archive obsolete project records;
- do not move root viewer documents yet.

### Phase C — migrate root public documents

For each document:

1. move canonical Markdown to its domain directory;
2. update the registry source path;
3. update the document viewer;
4. update homepage links;
5. update the build manifest;
6. regenerate public output;
7. preserve the old query-string route;
8. validate through the custom domain.

### Phase D — separate the deployment artifact

- build `site/` from canonical source;
- deploy only `site/` through GitHub Pages;
- preserve the custom domain and Cloudflare configuration;
- compare the complete route inventory before cutover;
- remove root-publishing assumptions only after route parity is proven.

## Immediate decision

The article site is working. Do not disturb its route structure during the cleanup.

The next implementation change should create the public route/content inventory. Structural document moves should follow only after each public dependency is mapped.
