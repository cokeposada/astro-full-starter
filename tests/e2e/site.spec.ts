import { expect, test } from '@playwright/test'
import config from '../../astro.config.mjs'
import { ui } from '../../src/i18n/ui'

for (const [path, lang] of [
	['/', 'en'],
	['/es/', 'es']
]) {
	test(`${lang} homepage renders assets without overflow`, async ({ page }) => {
		const errors: string[] = []
		page.on('pageerror', (error) => errors.push(error.message))
		await page.goto(path)
		await expect(page.locator('html')).toHaveAttribute('lang', lang)
		await expect(page.getByRole('heading', { level: 1 })).toContainText(/\S/)
		await page.evaluate(async () => {
			await Promise.all([...document.images].map((image) => image.decode()))
			await document.fonts.ready
		})
		expect(
			await page.evaluate(() =>
				[...document.fonts].filter((font) => font.status === 'error').map((font) => font.family)
			)
		).toEqual([])

		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
		).toBe(true)
		expect(errors).toEqual([])
	})
}

test('language changes preserve query and hash through client navigation', async ({
	page
}, testInfo) => {
	await page.goto('/?ref=nav#top')
	await page.evaluate(() => {
		Object.assign(window, { navigationMarker: 'persisted' })
	})
	const select = page.getByRole('combobox')
	await select.focus()
	await expect(select).toBeFocused()
	if (testInfo.project.name === 'mobile') {
		await page.keyboard.press('ArrowDown')
		await page.keyboard.press('Enter')
	} else {
		// Desktop native popup keyboard selection is not exposed by macOS headless Chromium.
		await select.selectOption('/es/')
	}
	await expect(page).toHaveURL(/\/es\/\?ref=nav#top$/)
	await expect(page.locator('html')).toHaveAttribute('lang', 'es')
	expect(await page.evaluate(() => Reflect.get(window, 'navigationMarker'))).toBe('persisted')
	await page.getByRole('combobox').selectOption('/')
	await expect(page).toHaveURL(new URL('/?ref=nav#top', test.info().project.use.baseURL).href)
	await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})

for (const [path, lang, home] of [
	['/404.html', 'en', '/'],
	['/es/404/', 'es', '/es/']
]) {
	test(`${lang} error page returns home via client router`, async ({ page }) => {
		await page.goto(path)
		await expect(page.locator('html')).toHaveAttribute('lang', lang)
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
		await page.locator(`main a[href="${home}"]`).click()
		await expect(page).toHaveURL(new URL(home, test.info().project.use.baseURL).href)
		await expect(page.getByRole('combobox')).toBeVisible()
	})
}

for (const [path, lang, noindex] of [
	['/', 'en', false],
	['/es/', 'es', false],
	['/404.html', 'en', true],
	['/es/404/', 'es', true]
] as const) {
	test(`${path} publishes consistent SEO for the configured site`, async ({ page, request }) => {
		await page.goto(path)
		const canonicalPath = path === '/404.html' ? '/404/' : path
		const canonical = new URL(canonicalPath, config.site).href
		const meta = (name: string) => page.locator(`meta[name="${name}"], meta[property="${name}"]`)
		await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
		await expect(meta('og:url')).toHaveAttribute('content', canonical)
		await expect(meta('og:type')).toHaveAttribute('content', 'website')
		await expect(meta('robots')).toHaveAttribute('content', noindex ? /\bnoindex\b/ : /\bindex\b/)
		const content = noindex ? ui[lang]['404'] : ui[lang].home
		await expect(meta('og:title')).toHaveAttribute('content', content.title)
		await expect(meta('description')).toHaveAttribute('content', content.description)
		await expect(meta('og:description')).toHaveAttribute('content', content.description)
		expect(await page.title()).toContain(content.title)
		const image = await meta('og:image').getAttribute('content')
		expect(image).toBeTruthy()
		const imageURL = new URL(image!)
		expect(imageURL.origin).toBe(new URL(config.site!).origin)
		const imageResponse = await request.get(imageURL.pathname)
		expect(imageResponse.ok()).toBe(true)
		expect(imageResponse.headers()['content-type']).toMatch(/^image\//)
		await expect(meta('og:image:alt')).toHaveAttribute('content', /\S/)
		const alternates = page.locator('link[rel="alternate"][hreflang]')
		await expect(alternates).toHaveCount(noindex ? 0 : 3)
		if (!noindex) {
			for (const [locale, route] of [
				['en', '/'],
				['es', '/es/'],
				['x-default', '/']
			]) {
				await expect(page.locator(`link[hreflang="${locale}"]`)).toHaveAttribute(
					'href',
					new URL(route, config.site).href
				)
			}
		}
	})
}
