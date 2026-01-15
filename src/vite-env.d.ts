/// <reference types="vite/client" />

interface ImportMetaEnv {
	// API Configuration
	readonly VITE_PATREON_TOKEN_HANDLER_HOST: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
