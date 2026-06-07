# Ecosystem Link Registry

Canonical URLs for the ZenCloud ecosystem. This is the source of truth for cross-site links.

## Hosting terminology

- **Origin** is the platform that publishes or runs the site.
- **Edge** is the DNS, TLS, redirect, proxy, caching, or security layer in front of the origin.
- **Canonical URL** is the only URL that public navigation, metadata, and publishing guidance should promote.

## Canonical URLs

| Repo | Canonical URL | Origin | Edge | Status |
|------|--------------|--------|------|--------|
| velocity-architecture | `https://velocityarchitectureframework.com/` | GitHub Pages from `main` repository root | Cloudflare | Live — custom domain; route-sensitive root deployment |
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

## Velocity Agent Entry Point

The currently published static entry route is:

```text
https://velocityarchitectureframework.com/app/portal.html
```

All agent launch links must point to this route rather than the bare domain.

This route is served as static HTML by the public site. It must only be described as operational when its API requests are confirmed to reach a live backend through the deployed routing model.

Site navigation back-links may link to the bare canonical domain.

## Retired or redirected URLs

These URLs are not canonical. Update all live links to the current canonical destination.

| Old URL | Canonical destination |
|---------|-----------------------|
| `https://zencloudau.github.io/velocity-architecture/` | `https://velocityarchitectureframework.com/` |
| `https://zencloudau.github.io/velocity-academy/` | `https://velocityarchitecture.com.au/` |
| `https://velocity-academy.pages.dev/` | `https://velocityarchitecture.com.au/` |

## Public metadata standard

Every index and article page intended for public discovery should carry:

```text
<title>
meta description
link rel=canonical
og:url
og:title
og:description
```

The canonical and Open Graph URLs must use the canonical domain recorded above.

The current repository confirms these fields for selected entry points, but the full publication estate still requires a generated metadata audit.

## Change control

A URL change is not complete until the following are updated together:

- this registry;
- repository README and deployment documentation;
- navigation and footer links;
- canonical and Open Graph metadata;
- sitemap and robots directives;
- source-to-route registry;
- compatibility redirects or pages;
- Cloudflare redirect rules where applicable.

*Reviewed: 2026-06-08. See `CHANGE-PROTOCOL.md` and `docs/public-site-content-location-review.md`.*
