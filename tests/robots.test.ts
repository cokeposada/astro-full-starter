import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { APIContext } from 'astro'
import { GET } from '../src/pages/robots.txt.ts'

test('robots uses the configured site and allows crawling', async () => {
	const response = await GET({ site: new URL('https://example.org/') } as APIContext)
	assert.equal(response.status, 200)
	assert.equal(response.headers.get('Content-Type'), 'text/plain; charset=utf-8')
	assert.equal(
		await response.text(),
		'User-agent: *\nAllow: /\nSitemap: https://example.org/sitemap-index.xml\n'
	)
})

test('robots rejects missing site configuration instead of publishing a broken sitemap URL', () => {
	assert.throws(() => GET({ site: undefined } as APIContext), /site/)
})
