import { ui, defaultLang } from './ui'

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/')
	if (lang in ui) return lang as keyof typeof ui
	return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: string) {
		return getNestedValue(ui[lang], key) || getNestedValue(ui[defaultLang], key)
	}
}

// Obtiene un valor anidado de un objeto usando una ruta como 'home.content.1.title'
function getNestedValue(obj: any, path: string) {
	return path.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : null
	}, obj)
}

export function getTranslatedPath(path: string, lang: string) {
	const pathWithoutLeadingSlash = path.startsWith('/') ? path.slice(1) : path

	// Si estamos en la ruta raíz
	if (pathWithoutLeadingSlash === '') {
		if (lang === defaultLang) return '/'
		return `/${lang}/`
	}

	if (lang === defaultLang) return `/${pathWithoutLeadingSlash}`
	return `/${lang}/${pathWithoutLeadingSlash}`
}
