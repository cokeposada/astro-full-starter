# Astro Full Starter

A bilingual, static Astro starter for building websites with React, Tailwind CSS, and built-in SEO defaults.

## Requirements

- Node.js **22.23.4 or newer** (`nvm use` selects the tested minimum).
- pnpm **11.1.1**, pinned in `packageManager` and used by CI.

## Quick start

```bash
git clone https://github.com/cokeposada/astro-full-starter.git
cd astro-full-starter
nvm use
npm install --global pnpm@11.1.1
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4321`. English lives at `/`; Spanish lives at `/es/`.

## Stack

- Astro 7 with static output and `ClientRouter` navigation
- React 19 and Lucide React icons
- Tailwind CSS 4 through its Vite plugin
- Native Astro SEO metadata, `@astrojs/sitemap`, and a native static endpoint for `robots.txt`
- Local Geist Sans files and self-hosted Geist Mono from Fontsource
- TypeScript 6, Astro Check, Prettier, Node tests, and Playwright

The exact installed versions are recorded in `pnpm-lock.yaml`.

## Project structure

```text
.github/workflows/ci.yml   # Pull request and main verification
public/                   # Favicon, Open Graph image, local fonts
src/
  assets/                 # Imported images and logo
  components/             # Language selector
  i18n/                   # Translation dictionaries and route helpers
  layouts/                # Shared HTML and SEO metadata
  pages/                  # English pages and Spanish pages under es/
  styles/global.css       # Tailwind import, theme, fonts, and base styles
tests/                    # Route and generated-output tests
  e2e/                    # Desktop and mobile browser tests
astro.config.mjs          # Site URL, integrations, and locale routing
playwright.config.ts      # Browser verification against preview
pnpm-workspace.yaml       # Explicit dependency build-script permissions
```

Tailwind is configured in CSS; there is no `tailwind.config.js`.

## Commands

| Command             | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `pnpm dev`          | Start the development server                                   |
| `pnpm check`        | Check Astro and TypeScript diagnostics                         |
| `pnpm build`        | Generate the static site in `dist/`                            |
| `pnpm preview`      | Serve the production build locally                             |
| `pnpm test`         | Test route utilities and generated SEO output; run build first |
| `pnpm test:e2e`     | Test the production build in Chromium desktop and mobile       |
| `pnpm format:check` | Check formatting                                               |
| `pnpm format`       | Apply formatting                                               |
| `pnpm astro`        | Run Astro CLI commands                                         |

Run the full verification locally:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm format:check
pnpm build
pnpm test
pnpm exec playwright install chromium
pnpm test:e2e
pnpm audit
```

CI runs the same checks, including browser tests, on pull requests and pushes to `main`. Only `esbuild` and `sharp` dependency build scripts are permitted explicitly.

## Customize your site

1. Set `site` in `astro.config.mjs` to your production origin. Canonical URLs, alternate-language URLs, sitemap entries, robots.txt, and the Open Graph image URL derive from it.
2. Replace `public/og-image.jpg`, the favicon, logo, author links, and the title template and Twitter creator in the shared layout.
3. Edit translations in `src/i18n/ui.ts`. Keep the English and Spanish dictionary structures aligned.
4. Add corresponding routes under `src/pages/` and `src/pages/es/`. Both languages use the same unprefixed path; translated slugs and partially translated route trees require an explicit route mapping.
5. Pass a page-specific `title` and `description` to `Layout`. Pass `noindex` for pages that must not be indexed; those pages omit language alternates. Both bundled 404 pages are also excluded from the sitemap.
6. Edit `src/styles/global.css` for typography and Tailwind theme values.

The language selector preserves the current query string and fragment. Route normalization removes only a recognized leading locale segment, so paths such as `/enterprise/` and `/especial/` remain intact. Missing translation keys fall back to English and then to the key itself.

## Deployment

Deploy `dist/` to a static host using `pnpm build`. Configure the host to use a supported Node version and the pinned pnpm version. This starter does not require an SSR adapter.

`/404.html` is the default error document. `/es/404/` is an explicit Spanish error page; routing arbitrary missing Spanish URLs to that page depends on your host's error-page configuration.

## Migrating from v1.1.1

Version 2 requires Node.js **>=22.23.4** and upgrades Astro 6 to Astro 7. Update local and hosting runtimes before installing. Review the [Astro 7 migration guide](https://docs.astro.build/en/guides/upgrade-to/v7/) when applying these changes to an existing project.

Use the committed pnpm lockfile and build-script permissions. `compressHTML: true` preserves the previous whitespace behavior. TypeScript stays on 6 because the selected Astro Check release does not support TypeScript 7.

The public routes stay `/` and `/es/`. `getTranslatedPath(path, locale)` now accepts paths that already contain a locale and restricts the locale argument to `en | es`. Layout accepts an optional `noindex` boolean. SEO metadata uses the configured site origin and page title; 404 pages are no longer indexable.

See [CHANGELOG.md](CHANGELOG.md) for release details.

## License

MIT — see [LICENSE](LICENSE).
