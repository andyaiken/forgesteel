/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
	// API Configuration
	readonly VITE_PATREON_TOKEN_HANDLER_HOST: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
