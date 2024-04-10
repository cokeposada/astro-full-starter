/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
    defaultLocale: "en",
    locales: ["es", "en"],
    i18nextServer: {
      backend: {
        loadPath: './public/locales/{{lng}}/{{ns}}.json',
      },
    },
  };