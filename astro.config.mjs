import { defineConfig } from 'astro/config';

// Production canonical domain is always https://hostedhavens.co.
// BASE_PATH is only set for the GitHub Pages preview build (e.g. "/hostedhaven").
export default defineConfig({
  site: 'https://hostedhavens.co',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
});
