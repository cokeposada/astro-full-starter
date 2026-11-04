import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ui } from '../src/i18n/ui.ts'
import { getLangFromUrl, getTranslatedPath, useTranslations } from '../src/i18n/utils.ts'

for (const [input, lang, expected] of [
	['/', 'en', '/'],
	['/', 'es', '/es/'],
	['/es/', 'en', '/'],
	['/es/', 'es', '/es/'],
	['/es/about/team/', 'en', '/about/team/'],
	['/about/team/', 'es', '/es/about/team/'],
	['/enterprise/', 'es', '/es/enterprise/'],
	['/especial/', 'en', '/especial/'],
	['/en/about/', 'es', '/es/about/'],
	['/es/about/?ref=nav#team', 'en', '/about/?ref=nav#team'],
	['/?ref=nav#top', 'es', '/es/?ref=nav#top']
] as const) {
	test(`${input} translated to ${lang}`, () =>
		assert.equal(getTranslatedPath(input, lang), expected))
}
test('only recognizes own supported locale keys', () => {
	assert.equal(getLangFromUrl(new URL('https://example.com/es/')), 'es')
	assert.equal(getLangFromUrl(new URL('https://example.com/enterprise/')), 'en')
	assert.equal(getLangFromUrl(new URL('https://example.com/toString/')), 'en')
})
test('returns translated strings and handles missing or inherited keys', () => {
	assert.equal(useTranslations('es')('404.back'), ui.es['404'].back)
	assert.equal(useTranslations('en')('missing.key'), 'missing.key')
	assert.equal(useTranslations('en')('toString'), 'toString')
})
