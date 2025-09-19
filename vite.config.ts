import { generateManifest, manifestPlugin } from './vite-plugin-manifest';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/forgesteel/',
	build: {
		chunkSizeWarningLimit: 10000,
		rollupOptions: {
			input: {
				main: './index.html',
				sw: './src/sw.ts'
			},
			output: {
				entryFileNames: chunkInfo => {
					return chunkInfo.name === 'sw' ? 'sw.js' : '[name]-[hash].js';
				}
			}
		}
	},
	plugins: [
		react(),
		manifestPlugin(),
		// Dev server plugin to serve manifest.json and sw.js
		{
			name: 'dev-pwa-files',
			configureServer(server) {
				// Serve manifest.json during development
				server.middlewares.use('/forgesteel/manifest.json', (_, res) => {
					const manifest = generateManifest();
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify(manifest, null, 2));
				});

				// Serve sw.js during development (compiled on-the-fly)
				server.middlewares.use('/forgesteel/sw.js', async (_, res) => {
					try {
						// Import and compile the service worker
						const { build } = await import('esbuild');
						const result = await build({
							entryPoints: [ 'src/sw.ts' ],
							bundle: true,
							write: false,
							format: 'iife',
							target: 'es2020',
							minify: false
						});

						const swCode = result.outputFiles[0].text;
						res.setHeader('Content-Type', 'application/javascript');
						res.end(swCode);
					} catch (error) {
						console.error('Error compiling service worker:', error);
						res.statusCode = 500;
						res.end('Error compiling service worker');
					}
				});
			}
		}
	],
	publicDir: 'public',
	server: {
		headers: {
			'Service-Worker-Allowed': '/forgesteel/'
		}
	}
});
