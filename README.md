
# Astro Full Starter

Astro project preconfigured with tailwindcss, tailwind-fluid-typography, react, astro-i18next, astro-seo and astro-robots-txt


## Installation

```bash
npm install
```
    
## Run Locally

Start the server

```bash
npm run dev
```

Regenerate translated content

```bash
npm run trans
```

## Deployment

Published in Cloudflare Pages, it only requires a push to the `main` branch.
- [Git integration]( https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/](https://developers.cloudflare.com/pages/get-started/git-integration/ )
- [CLI]( https://developers.cloudflare.com/pages/get-started/c3/ )

Important: Cloudflare currently builds by default using Node 18, if you have problems publishing the project, or you are using a higher version (like me), you can specify it as a variable in the configuration, as follows:

| Type | Name     | Value                       |
| :-------- | :------- | :-------------------------------- |
| `Plaintext`      | `NODE_VERSION` | 20.18.0 |

## Build

```bash
npm run build
```
    
## Authors

- [@cokeposada](https://github.com/cokeposada)

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
