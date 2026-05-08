import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://contestmanager.app',
  integrations: [sitemap(), react(), tailwind()],
  vite: {
    assetsInclude: ['**/*.glb', '**/*.png'],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  }
});
