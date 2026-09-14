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
						src: '/icon-192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: '/shield.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						// Padded so the whole shield sits inside the maskable safe
						// zone (centred circle, 80% of the canvas). The unpadded
						// icons above lose ~24% of the glyph to Android's mask.
						src: '/icon-maskable-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				],
				// Drives Chrome's rich install dialog. `sizes` must match each
				// file exactly, or the screenshot is silently dropped.
				screenshots: [
					{
						src: '/pwa/wide.png',
						sizes: '2732x2048',
						type: 'image/png',
						form_factor: 'wide'
					},
					{
						src: '/pwa/narrow.png',
						sizes: '1320x2868',
						type: 'image/png',
						form_factor: 'narrow'
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
