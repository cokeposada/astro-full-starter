import { expect, test } from '@playwright/test'

for (const [path, lang] of [
	['/', 'en'],
	['/es/', 'es']
]) {
	test(`${lang} homepage renders assets without overflow`, async ({ page }) => {
		const errors: string[] = []
		page.on('pageerror', (error) => errors.push(error.message))
		await page.goto(path)
		await expect(page.locator('html')).toHaveAttribute('lang', lang)
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Astro Full Starter')
		await expect(page.locator('svg.lucide')).toHaveCount(5)
		expect(
			await page
				.locator('img')
				.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
		).toBe(true)
		await page.evaluate(() => document.fonts.ready)
		expect(await page.evaluate(() => document.fonts.check('500 16px "Geist Sans"'))).toBe(true)
		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
		).toBe(true)
		expect(
			await page
				.locator('.grid > div')
				.evaluateAll((cards) => cards.every((card) => card.scrollWidth <= card.clientWidth))
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
	await expect(page).toHaveURL('http://127.0.0.1:4321/es/?ref=nav#top')
	await expect(page.locator('html')).toHaveAttribute('lang', 'es')
	expect(await page.evaluate(() => Reflect.get(window, 'navigationMarker'))).toBe('persisted')
	await page.getByRole('combobox').selectOption('/')
	await expect(page).toHaveURL('http://127.0.0.1:4321/?ref=nav#top')
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
		await expect(page).toHaveURL(`http://127.0.0.1:4321${home}`)
		await expect(page.getByRole('combobox')).toBeVisible()
	})
}
