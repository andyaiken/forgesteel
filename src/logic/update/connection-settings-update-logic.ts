import { ConnectionSettings } from '@/models/connection-settings';

export class ConnectionSettingsUpdateLogic {
	static updateSettings = (settings: ConnectionSettings) => {
		if (settings.useWarehouse === undefined) {
			settings.useWarehouse = false;
		}

		if (settings.warehouseHost === undefined) {
			settings.warehouseHost = '';
		}

		if (settings.warehouseToken === undefined) {
			settings.warehouseToken = '';
		}
	};
}
