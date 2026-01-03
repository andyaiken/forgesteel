import { Utils } from './utils';

export class Config {
	static getTokenHandlerHost = (): string => {
		const envVal = import.meta.env.VITE_PATREON_TOKEN_HANDLER_HOST;
		return Utils.valueOrDefault(envVal, 'https://somewhere.forgesteel-app.com');
	};

	static getPatreonWarehouseHost = (): string => {
		const envVal = import.meta.env.VITE_PATREON_TOKEN_HANDLER_HOST;
		return Utils.valueOrDefault(envVal, 'https://somewhere.forgesteel-app.com');
	};
};
