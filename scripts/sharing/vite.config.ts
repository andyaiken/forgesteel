import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// A minimal config for running the dictionary builder under vite-node; the app's own
// config pulls in React and the PWA plugin, neither of which a build script needs.
export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('../../src', import.meta.url))
		}
	}
});
