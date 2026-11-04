import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import config from '../astro.config.mjs'

const read = (file: string) => readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8')

test('robots points to the generated sitemap on the configured site', () => {
	const sitemap = new URL('sitemap-index.xml', config.site).href
	const directives = read('robots.txt').split(/\r?\n/)
	assert.ok(directives.includes(`Sitemap: ${sitemap}`))
	assert.match(read('sitemap-index.xml'), /<sitemapindex[\s>]/)
})

test('sitemap contains both homepages and excludes error pages and robots', () => {
	const xml = read('sitemap-0.xml')
	const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
	for (const path of ['/', '/es/']) {
		assert.ok(locations.includes(new URL(path, config.site).href))
	}
	for (const location of locations) {
		const url = new URL(location)
		assert.equal(url.origin, new URL(config.site!).origin)
		assert.ok(!/\/404(?:\.html|\/)?$/.test(url.pathname))
		assert.notEqual(url.pathname, '/robots.txt')
	}
})
