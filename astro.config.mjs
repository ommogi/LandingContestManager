import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  adapter: node({ mode: 'middleware' }),
  site: 'https://contestmanager.app',
  integrations: [sitemap(), react(), tailwind()],
  vite: {
    assetsInclude: ['**/*.glb', '**/*.png'],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  }
});
