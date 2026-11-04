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
  components/             # Language selector and SEO.astro
  i18n/                   # Translation dictionaries and route helpers
  layouts/                # Shared HTML and language alternates
  pages/                  # English/Spanish pages and robots.txt.ts
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
pnpm audit --audit-level high
```

CI runs installation, dependency audit (high/critical), type, format, build, and test checks on pull requests and pushes to `main`. Only `esbuild` and `sharp` dependency build scripts are permitted explicitly.

## Customize your site

- Set `site` in `astro.config.mjs` to your production origin; canonical, alternate-language, sitemap, robots, and Open Graph image URLs derive from it.
- Replace the favicon, `public/og-image.jpg`, logo, and author links.
- Edit `src/i18n/ui.ts` and add matching routes under `src/pages/` and `src/pages/es/`. Keep dictionary structures and unprefixed paths aligned; translated slugs need an explicit route mapping. The selector preserves query strings and fragments.

### Fonts with Fontsource

Install any [Fontsource family](https://fontsource.org/), for example `pnpm add @fontsource/inter`. In `src/layouts/Layout.astro`, replace the Geist Mono import with the weights you need:

```ts
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
```

In `src/styles/global.css`, set `html`'s `font-family` to `'Inter', sans-serif` for body text and `--font-heading` to `'Inter', sans-serif` for headings. You can use different families for each; import every weight your styles request.

If replacing both Geist families, remove their unused `@font-face` rules and files from `public/fonts/`, then run `pnpm remove @fontsource/geist-mono`. Fonts remain self-hosted; no Astro Fonts API configuration is required.

### SEO and robots

Pass each page's `title` and `description` to the shared layout:

```astro
<Layout title="About us" description="Meet our team.">
	<!-- Page content -->
</Layout>
```

- Edit `src/components/SEO.astro` for the title suffix, Twitter creator, Open Graph image path/alt text, or additional metadata. The layout supplies the canonical URL and language alternates.
- Add `noindex` to `<Layout>` to prevent indexing and omit language alternates. For additional pages, also update the sitemap `filter` in `astro.config.mjs`; only the bundled 404 pages are excluded automatically.
- Edit the response text in `src/pages/robots.txt.ts` to change crawler directives, such as adding `Disallow: /private/`. Keep the generated `Sitemap` line. The endpoint builds into `dist/robots.txt`; do not also create `public/robots.txt`. Robots rules control crawling, not access or guaranteed removal from search results.

After customization, run `pnpm build` and inspect `dist/`. Run `pnpm test` and `pnpm test:e2e`; checks use your configured site and translations, so changing branding does not require editing test fixtures.

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
