# Changelog

## 2.0.0 — 2026-11-03

### Breaking changes

- Require Node.js >=22.23.4 and pin pnpm 11.1.1.
- Upgrade Astro 6 to Astro 7 and the React integration to version 7.
- Restrict route helper locale arguments to the supported `en | es` union.

### Updated

- Upgrade React, Tailwind CSS, Lucide, SEO, font, image, and formatting dependencies.
- Add explicit TypeScript 6, React types, and Astro Check dependencies.
- Preserve the previous HTML whitespace behavior with `compressHTML: true`.

### Fixed

- Generate reciprocal language alternates for the current page, with English at `/` and an English `x-default`.
- Derive canonical and Open Graph image URLs from the configured site and use page-specific Open Graph titles.
- Mark both 404 pages `noindex` and exclude error routes from sitemap output.
- Remove only a leading locale segment during language switching, preserving ordinary path names, query strings, and fragments.
- Safely resolve nested translation keys without inherited properties or `any`.

- Match the Spanish mobile card layout to the English responsive layout, preventing text overflow.

### Added

- Reproducible dependency installation and explicit native build-script permissions.
- Type checks, formatting checks, route regression tests, generated-output tests, and desktop/mobile Playwright tests.
- GitHub Actions verification for pull requests and `main`.
- Updated setup, customization, deployment, and migration documentation.

[Compare with v1.1.1](https://github.com/cokeposada/astro-full-starter/compare/v1.1.1...v2.0.0)

### Known dependency advisory

- `astro-robots-txt` still depends on Zod 3, affected by GHSA-mrhx-c7xc-m3w5. The supplied static build validates trusted repository configuration only; no visitor input reaches it. See [SECURITY.md](SECURITY.md) for the assessment and remediation constraint. The release does not claim a clean dependency audit.
