import { ui, defaultLang, languages } from './ui.ts'

export type Locale = keyof typeof languages

export function getLangFromUrl(url: URL): Locale {
	const lang = url.pathname.split('/')[1]
	return Object.hasOwn(languages, lang) ? (lang as Locale) : defaultLang
}

export function useTranslations(lang: Locale) {
	return function t(key: string): string {
		return getNestedValue(ui[lang], key) ?? getNestedValue(ui[defaultLang], key) ?? key
	}
}

function getNestedValue(obj: unknown, path: string): string | undefined {
	let value = obj
	for (const key of path.split('.')) {
		if (typeof value !== 'object' || value === null || !Object.hasOwn(value, key)) return undefined
		value = (value as Record<string, unknown>)[key]
	}
	return typeof value === 'string' ? value : undefined
}

export function getTranslatedPath(path: string, lang: Locale): string {
	const suffixIndex = path.search(/[?#]/)
	const pathname = suffixIndex < 0 ? path : path.slice(0, suffixIndex)
	const suffix = suffixIndex < 0 ? '' : path.slice(suffixIndex)
	const segments = pathname.replace(/^\/+/, '').split('/')
	if (Object.hasOwn(languages, segments[0])) segments.shift()
	const unprefixed = '/' + segments.join('/')
	return (lang === defaultLang ? unprefixed : `/${lang}${unprefixed}`) + suffix
}
