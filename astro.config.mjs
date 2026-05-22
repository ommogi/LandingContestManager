import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://contestmanager.app',
  integrations: [sitemap(), react(), tailwind()],
  vite: {
    ssr: {
      noExternal: ['gsap'],
    },
    assetsInclude: ['**/*.glb', '**/*.png'],
    resolve: {
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
  }
});
