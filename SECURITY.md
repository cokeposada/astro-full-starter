# Dependency security notes

## Current remediation

The native static endpoint at `src/pages/robots.txt.ts` replaces `astro-robots-txt` and removes its Zod 3 dependency. It preserves the robots directives and derives the sitemap URL from Astro's `site` configuration. No Zod version override is required. The exception below applies only to the published v2.0.0 dependency tree.

## v2.0.0 audit — 2026-11-03

Compatible transitive updates resolve the reported `fast-uri` and `source-map-js` advisories and update the sitemap integration's Zod dependency.

One high-severity advisory remains in `astro-robots-txt@1.0.0 > zod@3.25.76`: [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5). The advisory concerns memory exhaustion when validating oversized attacker-controlled collections. Its published fix is Zod >=4.6.6; the robots integration uses Zod 3 APIs, including `z.function().args()`, so forcing Zod 4 would break the integration.

In this starter, that validation runs only during the static build against repository-controlled robots options. No request handler accepts visitor input, and Zod is not shipped as a server runtime. We assess the reported attack path as unreachable in the supplied application. This does not make the dependency patched: `pnpm audit` still exits nonzero and reports the advisory.

Keep robots configuration trusted. Reassess this exception if adding SSR, accepting untrusted build configuration, or reusing this dependency for request validation. Remove the exception when a compatible upstream patch is available. The dependency remains in place to preserve the starter's existing robots integration.
