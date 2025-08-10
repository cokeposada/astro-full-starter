# Astro Full Starter

A base Astro project to start building your website quickly and efficiently.

## 🧩 Frameworks and Libraries

This project includes the following technologies:

- [Astro v5.12.6](https://astro.build/) - Web framework for content-focused websites
- [React v19.1.0](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS v4.1.5](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React v0.508.0](https://lucide.dev/) - Icon set
- [Astro SEO v0.8.4](https://github.com/jonasmerlin/astro-seo) - Component for managing SEO
- [Astro Sitemap v3.4.2](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - Automatic sitemap generation
- [Astro Robots.txt v1.0.0](https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt) - Robots.txt generation
- i18n Support - Multi-language internationalization (EN/ES)
- Optimized fonts with @fontsource (Geist Mono, Roboto)

## 📁 Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and files
│   ├── components/     # Reusable components
│   │   └── LanguageSelector.astro  # Language selector
│   ├── i18n/           # Internationalization files
│   │   ├── ui.ts       # UI translations
│   │   └── utils.ts    # i18n utilities
│   ├── layouts/        # Page templates
│   ├── pages/          # Site pages
│   │   ├── index.astro # Main page
│   │   ├── 404.astro   # 404 error page
│   │   └── es/         # Spanish pages
│   └── styles/         # Global styles
├── astro.config.mjs    # Astro configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🌐 Internationalization

The project is configured to support multiple languages:

- English (default)
- Spanish

The i18n configuration can be found in `astro.config.mjs` and uses Astro's built-in i18n routing.

## ⚡ Features

- **Optimized Performance**: Fast and efficient build with Astro's Islands Architecture
- **SEO Friendly**: Integration with astro-seo, sitemap, and robots.txt
- **Multilingual**: Full support for English and Spanish
- **Responsive**: Design that adapts to all types of devices
- **Accessibility**: Best a11y practices implemented
- **TypeScript**: Type safety throughout the project
- **React Components**: Seamless integration with React
- **Modern Styling**: Tailwind CSS v4 for fast and consistent design

## 🚀 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/astro-full-starter.git
   cd astro-full-starter
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser at `http://localhost:4321`

## 📦 Commands

| Command        | Action                         |
| :------------- | :----------------------------- |
| `pnpm dev`     | Start local development server |
| `pnpm build`   | Build site for production      |
| `pnpm preview` | Preview production build       |
| `pnpm astro`   | Run Astro CLI commands         |

## 📄 License

MIT - See the [LICENSE](LICENSE) file for details.
