import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'one-dark-pro',
      },
      defaultColor: false,
      wrap: true,
      langAlias: {
        cjs: 'javascript',
        tsx: 'typescript',
      },
    },
  },
});
