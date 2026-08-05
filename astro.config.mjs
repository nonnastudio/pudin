// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Update `site` to match your GitHub Pages URL.
// If deploying from a repo called "pudin" under user "myuser":
//   site: 'https://myuser.github.io'
//   base: '/pudin'
// If using a custom domain or deploying to the root:
//   site: 'https://mycustomdomain.com'
//   (remove the `base` line)
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/pudin',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});