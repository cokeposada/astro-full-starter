// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-full-starter.pages.dev/',
	compressHTML: true,
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false
		}
	},
	integrations: [
		react(),
		sitemap({
			filter: (page) => !/\/404(?:\.html|\/)?$/.test(new URL(page).pathname),
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US',
					es: 'es-ES'
				}
			}
		}),
		robotsTxt()
	],
	vite: {
		plugins: [tailwindcss()],
		server: {
			watch: {
				usePolling: true
			}
		}
	}
})
