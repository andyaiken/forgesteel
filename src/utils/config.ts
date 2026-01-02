import { Utils } from './utils';

export class Config {
	static getTokenHandlerHost = (): string => {
		const envVal = import.meta.env.VITE_PATREON_TOKEN_HANDLER_HOST;
		return Utils.valueOrDefault(envVal, 'https://forgesteel-warehouse-b7wsk.ondigitalocean.app');
	};

	static getPatreonWarehouseHost = (): string => {
		const envVal = import.meta.env.VITE_PATREON_TOKEN_HANDLER_HOST;
		return Utils.valueOrDefault(envVal, 'https://forgesteel-warehouse-b7wsk.ondigitalocean.app');
	};
};
