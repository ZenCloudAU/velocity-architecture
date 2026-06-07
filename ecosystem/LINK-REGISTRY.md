# Ecosystem Link Registry

Canonical URLs for the ZenCloud ecosystem. This is the source of truth for cross-site links.

## Hosting terminology

- **Origin** is the platform that publishes or runs the site.
- **Edge** is the DNS, TLS, redirect, proxy, caching, or security layer in front of the origin.
- **Canonical URL** is the URL public navigation, metadata, and publishing guidance should promote.

## Canonical URLs

| Repo | Canonical URL | Origin | Edge | Status |
|------|--------------|--------|------|--------|
| velocity-architecture | `https://velocityarchitectureframework.com/` | Conflicting repository evidence: GitHub Pages static estate and Azure Container application | Cloudflare | Canonical URL known; live origin and route split require verification |
| velocity-academy | `https://velocityarchitecture.com.au/` | GitHub Pages or Cloudflare Pages — verify project configuration | Cloudflare | Live — custom domain |
| zencloud-advisory | `https://www.zencloud.com.au/` | Cloudflare Pages | Cloudflare | Active |
| studiosix | `https://studiosix.com.au/` | GitHub Pages | Cloudflare | Live — custom domain |
| ea-artefact-generator | `https://ea.velocityarchitecture.com.au/` | GitHub Pages | Cloudflare | Live — custom domain |
| vaf-sa | `https://zencloudau.github.io/vaf-sa/` | GitHub Pages | GitHub Pages | Live |
| vsf-match | `https://zencloudau.github.io/vsf-match/` | GitHub Pages | GitHub Pages | Live |
| vaf-python-zero-to-hero | `https://zencloudau.github.io/vaf-python-zero-to-hero/` | GitHub Pages | GitHub Pages | Live |
| vaf-typescript-zero-to-hero | `https://zencloudau.github.io/vaf-typescript-zero-to-hero/` | GitHub Pages | GitHub Pages | Live |
| AzureSACertification | `https://zencloudau.github.io/AzureSACertification/` | GitHub Pages | GitHub Pages | Live |
| SAPEACertification | `https://zencloudau.github.io/SAPEACertification/` | GitHub Pages | GitHub Pages | Live |
| CISSPCertification | `https://zencloudau.github.io/CISSPCertification/` | GitHub Pages | GitHub Pages | Live |
| learn-with-claude | `https://zencloudau.github.io/learn-with-claude/` | GitHub Pages | GitHub Pages | Live |
| trading-dashboard | `https://zencloudau.github.io/trading-dashboard/` | GitHub Pages | GitHub Pages | Live |
| pmi-portal | `https://zencloudau.github.io/pmi-portal/` | GitHub Pages | GitHub Pages | Verify canonical production status |

## Velocity application routes

Two different entry assumptions currently exist:

```text
Static-site navigation: https://velocityarchitectureframework.com/app/portal.html
Express application:     https://velocityarchitectureframework.com/
```

The Azure application serves the portal at `/`, while the static site links to `/app/portal.html`. The intended route must be selected and implemented consistently.

The portal submits generation requests to:

```text
POST /artefacts/generate
```

That endpoint requires the Azure application origin or an explicit Cloudflare proxy route. It cannot execute on GitHub Pages.

## Retired or redirected URLs

Do not declare a URL retired until the live DNS and redirect behaviour have been verified.

Proposed canonical destination:

| Alternate URL | Intended canonical destination |
|---------|-----------------------|
| `https://zencloudau.github.io/velocity-architecture/` | `https://velocityarchitectureframework.com/` |
| `https://zencloudau.github.io/velocity-academy/` | `https://velocityarchitecture.com.au/` |
| `https://velocity-academy.pages.dev/` | `https://velocityarchitecture.com.au/` |

## Public metadata standard

Every public index and article page should carry:

```text
<title>
meta description
link rel=canonical
og:url
og:title
og:description
```

The canonical and Open Graph URLs must use the canonical domain recorded above after live route verification.

## Change control

A URL or origin change is not complete until the following are updated together:

- this registry;
- repository README and deployment documentation;
- navigation and footer links;
- canonical and Open Graph metadata;
- sitemap and robots directives;
- source-to-route registry;
- compatibility redirects or pages;
- Cloudflare DNS, redirect, Worker, and origin rules;
- public acceptance-test results.

*Reviewed: 2026-06-08. See `CHANGE-PROTOCOL.md` and `docs/public-site-content-location-review.md`.*
