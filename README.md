# Astro Full Starter

A base Astro project to start building your website quickly and efficiently.

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

| Command           | Action                         |
| :---------------- | :----------------------------- |
| `npm run dev`     | Start local development server |
| `npm run build`   | Build site for production      |
| `npm run preview` | Preview production build       |
| `npm run astro`   | Run Astro CLI commands         |

## 🧩 Frameworks and Libraries

This project includes the following technologies:

- [Astro](https://astro.build/) - Web framework for content-focused websites
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Icon set
- [Astro SEO](https://github.com/jonasmerlin/astro-seo) - Component for managing SEO
- i18n Support - Multi-language internationalization (EN/ES)

## 📁 Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and files
│   ├── components/     # Reusable components
│   ├── i18n/           # Internationalization files
│   ├── layouts/        # Page templates
│   ├── pages/          # Site pages
│   └── styles/         # Global styles
├── astro.config.mjs    # Astro configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🌐 Internationalization

The project is configured to support multiple languages:

- English (default)
- Spanish

The i18n configuration can be found in `astro.config.mjs`.

## 📄 License

MIT - See the [LICENSE](LICENSE) file for details.
