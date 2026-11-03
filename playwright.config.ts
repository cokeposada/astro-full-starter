import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './tests/e2e',
	use: { baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure' },
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } }
	],
	webServer: {
		command: 'pnpm preview --host 127.0.0.1 --ignore-lock',
		url: 'http://127.0.0.1:4321',
		reuseExistingServer: !process.env.CI
	}
})
