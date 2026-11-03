import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('Configure site in astro.config.mjs to generate robots.txt')
	const sitemap = new URL('sitemap-index.xml', site)
	return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap.href}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	})
}
