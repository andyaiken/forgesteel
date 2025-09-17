import { defineConfig } from 'vite';
import { manifestPlugin } from './vite-plugin-manifest';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/forgesteel/',
	build: {
		chunkSizeWarningLimit: 10000,
		rollupOptions: {
			input: {
				main: './index.html',
				sw: './public/sw.ts'
			},
			output: {
				entryFileNames: chunkInfo => {
					return chunkInfo.name === 'sw' ? 'sw.js' : '[name]-[hash].js';
				}
			}
		}
	},
	plugins: [ react(), manifestPlugin() ],
	publicDir: 'public',
	server: {
		headers: {
			'Service-Worker-Allowed': '/forgesteel/'
		}
	}
});
