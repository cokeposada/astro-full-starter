/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		fontFamily: {
			heading: ["Geist Sans", "sans-serif"],
		},
		container: {
			center: true,
		},
		fluidTypography: {
			remSize: 14,
			minScreenSize: 320,
			maxScreenSize: 1920,
			minTypeScale: 1.2,
			maxTypeScale: 1.333,
			lineHeight: 1.1
		}
	},
	plugins: [require("tailwind-fluid-typography")],
}
