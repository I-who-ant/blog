import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import markdoc from '@astrojs/markdoc';

export default defineConfig({
  site: 'https://seeback.xyz',

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

  integrations: [mdx(), markdoc()],
});