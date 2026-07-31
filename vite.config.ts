import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	build: {
		chunkSizeWarningLimit: 10000,
		rollupOptions: {
			output: {
				assetFileNames: chunkInfo => {
					if (chunkInfo.names && chunkInfo.names[0].match(/\.(ttf|otf)$/)) {
						return 'assets/[name][extname]';
					}
					return 'assets/[name]-[hash][extname]';
				}
			}
		}
	},
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: null,
			manifestFilename: 'manifest.json',
			manifest: {
				name: 'Forge Steel',
				short_name: 'Forge Steel',
				description: 'Heroes, monsters, encounters ... everything you need for Draw Steel.',
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#1890ff',
				orientation: 'any',
				scope: '/',
				categories: [ 'games', 'entertainment', 'utilities' ],
				lang: 'en',
				dir: 'ltr',
				icons: [
					{
						src: '/shield.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: '/shield.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				cleanupOutdatedCaches: true,
				navigateFallback: '/index.html',
				globPatterns: [ '**/*.{js,css,html}' ],
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.destination === 'image',
						handler: 'CacheFirst',
						options: {
							cacheName: 'images',
							expiration: {
								maxEntries: 200,
								maxAgeSeconds: 60 * 60 * 24 * 30
							}
						}
					},
					{
						urlPattern: ({ request }) => request.destination === 'font',
						handler: 'CacheFirst',
						options: {
							cacheName: 'fonts',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 60 * 60 * 24 * 365
							}
						}
					}
				]
			}
		})
	],
	publicDir: 'public',
	resolve: {
		tsconfigPaths: true
	}
});
