// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

const fullReloadAlways = {
  handleHotUpdate({ server }: { server: any }) {
    server.ws.send({ type: "full-reload" });
    return [];
  },
};

export default defineConfig({
  plugins: [
    react(),
    // @ts-ignore
    fullReloadAlways,
    // VitePWA({
    //   // ── enable in dev ──────────────────────────────────────────
    //   devOptions: {
    //     enabled: true,   // register SW when running `vite dev`
    //     type: 'module',  // keep module format
    //   },
    //   // ── your existing config ───────────────────────────────────
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
    //   manifest: {
    //     name: 'My Vite PWA',
    //     short_name: 'VitePWA',
    //     description: 'A Progressive Web App built with Vite and React',
    //     theme_color: '#ffffff',
    //     background_color: '#ffffff',
    //     display: 'standalone',
    //     scope: '/',
    //     start_url: '/',
    //     icons: [
    //       { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    //       { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    //       { src: 'icons/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    //     ]
    //   },
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern: ({ request }) => request.destination === 'document',
    //         handler: 'NetworkFirst',
    //         options: { cacheName: 'html-cache' },
    //       },
    //       {
    //         urlPattern: ({ request }) =>
    //           ['script', 'style', 'image', 'font'].includes(request.destination),
    //         handler: 'CacheFirst',
    //         options: {
    //           cacheName: 'asset-cache',
    //           expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
    //         },
    //       }
    //     ]
    //   }
    // })
  ],
})
