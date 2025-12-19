import { Plugin, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Base manifest template
const BASE_MANIFEST = {
	name: 'Forge Steel',
	short_name: 'Forge Steel',
	description: 'Heroes, monsters, encounters ... everything you need for Draw Steel.',
	start_url: '/forgesteel/',
	display: 'standalone',
	background_color: '#ffffff',
	theme_color: '#1890ff',
	orientation: 'any',
	scope: '/forgesteel/',
	categories: [ 'games', 'entertainment', 'utilities' ],
	lang: 'en',
	dir: 'ltr'
};

// Generate manifest with icon paths
const generateManifest = (shieldIconPath?: string) => {
	const iconPath = shieldIconPath || '/forgesteel/src/assets/shield.png';

	return {
		...BASE_MANIFEST,
		icons: [
			{
				src: iconPath,
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any maskable'
			},
			{
				src: iconPath,
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any maskable'
			}
		]
	};
};

const manifestPlugin = (): Plugin => {
	return {
		name: 'manifest-plugin',
		generateBundle(_, bundle) {
			// Find the shield icon in the bundle
			const shieldIcon = Object.keys(bundle).find(
				key => key.includes('shield') && key.endsWith('.png')
			);

			if (shieldIcon) {
				const manifest = generateManifest(`/forgesteel/${shieldIcon}`);

				// Write the manifest to the dist folder
				this.emitFile({
					type: 'asset',
					fileName: 'manifest.json',
					source: JSON.stringify(manifest, null, 2)
				});
			}
		}
	};
};

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
		tsconfigPaths(),
		manifestPlugin(),
		// Dev server plugin to serve manifest.json and sw.js
		{
			name: 'dev-pwa-files',
			configureServer(server) {
				// Serve manifest.json during development
				// Handle both possible paths due to Vite's base path resolution
				server.middlewares.use('/forgesteel/forgesteel/manifest.json', (_, res) => {
					const manifest = generateManifest();
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify(manifest, null, 2));
				});
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
