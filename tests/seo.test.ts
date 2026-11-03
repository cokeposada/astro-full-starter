import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
const read = (file: string) => readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8')
for (const [file, lang, canonical] of [
	['index.html', 'en', 'https://astro-full-starter.pages.dev/'],
	['es/index.html', 'es', 'https://astro-full-starter.pages.dev/es/']
]) {
	test(`${lang} publishes reciprocal alternates and canonical`, () => {
		const html = read(file)
		assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`))
		assert.ok(html.includes(`rel="canonical" href="${canonical}"`))
		assert.match(
			html,
			/<link[^>]*href="https:\/\/astro-full-starter.pages.dev\/"[^>]*hreflang="en"/
		)
		assert.match(
			html,
			/<link[^>]*href="https:\/\/astro-full-starter.pages.dev\/es\/"[^>]*hreflang="es"/
		)
		assert.match(
			html,
			/<link[^>]*href="https:\/\/astro-full-starter.pages.dev\/"[^>]*hreflang="x-default"/
		)
		assert.ok(html.includes('https://astro-full-starter.pages.dev/og-image.jpg'))
	})
}
for (const file of ['404.html', 'es/404/index.html']) {
	test(`${file} prevents indexing and uses its own OG title`, () => {
		const html = read(file)
		assert.match(html, /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/)
		assert.ok(!html.includes('property="og:title" content="Astro Full Starter"'))
	})
}
test('sitemap excludes errors and robots references the sitemap', () => {
	assert.ok(!read('sitemap-0.xml').includes('/404'))
	assert.ok(read('robots.txt').includes('https://astro-full-starter.pages.dev/sitemap-index.xml'))
})
