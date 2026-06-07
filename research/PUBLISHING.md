# Velocity Research Publishing Workflow

This folder uses a source-backed publishing model.

## Principle

Markdown is the source of truth. Public readers should see rendered HTML at the canonical custom domain.

Do not publish raw GitHub Markdown links on LinkedIn unless the intent is to show the source file. Publish the rendered research reader URL instead.

## Canonical domain

```text
https://velocityarchitectureframework.com/
```

The `zencloudau.github.io/velocity-architecture/` address is retired or technical and must not be used in new public links.

## Current publishing pattern

1. Add the paper as a Markdown file in `research/`.
2. Add it to the rendered research library in `research/index.html`.
3. Add or regenerate its clean reader route.
4. Publish the rendered custom-domain URL, not the raw Markdown URL.

Example:

```text
Source file:
research/zencloud-it-governance-working-paper-may-2026.md

Reader page:
https://velocityarchitectureframework.com/research/

Featured article page:
https://velocityarchitectureframework.com/research/it-governance-frameworks-australian-public-sector-2025-2026/
```

## Reader experience standard

Every research paper must provide:

- readable HTML rendering;
- a stable custom-domain route;
- top navigation back to the framework, research library, ZenCloud, StudioSix, Academy, and GitHub;
- footer links back into the ecosystem;
- a GitHub source link for audit/source-of-truth purposes;
- a canonical URL declaration;
- no dead-end article pages.

## Scalable target state

For hundreds of policy papers, cloud patterns, architecture patterns, and research articles, the target workflow should become:

```text
1. Add Markdown file to the canonical content source
2. Add metadata to the content registry
3. The research library lists it automatically
4. A reusable reader route renders it automatically
5. The sitemap and source links are generated automatically
6. Public channels point to the rendered custom-domain URL
```

The preferred target URL shape is:

```text
https://velocityarchitectureframework.com/research/example-paper/
```

The source path should not determine the public URL.

## Recommended metadata fields

Each paper should have:

```text
id
title
subtitle
slug
type
published_date
updated_date
tags
source_file
public_route
author
status
listed
searchable
legacy_routes
```

## Do not duplicate content

Do not manually recreate the same paper as separate canonical HTML content unless it is a deliberately handcrafted publication.

Use Markdown once. Render it everywhere.

Generated HTML is a publication artifact, not a second source of truth.

## Relocation rule

A Markdown source file referenced by a public reader must not be moved independently. The same change must update:

- the content registry or reader manifest;
- `research/index.html` while it remains manually maintained;
- generated reader JavaScript source paths;
- GitHub source links;
- the build script;
- route validation;
- any legacy compatibility route.

## Publishing rule

If a paper is for LinkedIn or public sharing, the link must open a styled HTML reader on `velocityarchitectureframework.com`, not raw GitHub text or the retired GitHub Pages project URL.
