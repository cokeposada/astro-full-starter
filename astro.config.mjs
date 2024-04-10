import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import robotsTxt from 'astro-robots-txt';
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  site: 'https://cokeposada.com',
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), sitemap({
    i18n: {
      defaultLocale: "es",
      locales: {
        es: 'es-ES',
        en: 'en-US',
      },
    }
  }), robotsTxt(), astroI18next()],
  prefetch: true,
  build: {
    assets: '_cokeposada',
  }
});