import type { Plugin } from 'vite';

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
export function generateManifest(shieldIconPath?: string) {
	const iconPath = shieldIconPath || '/forgesteel/assets/shield.png';

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
}

export function manifestPlugin(): Plugin {
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
}
