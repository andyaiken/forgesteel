import { ConnectionSettings } from '@/models/connection-settings';

export class ConnectionSettingsUpdateLogic {
	static updateSettings = (settings: ConnectionSettings) => {
		if (settings.useManualWarehouse === undefined) {
			settings.useManualWarehouse = false;
		}

		if (settings.warehouseHost === undefined) {
			settings.warehouseHost = '';
		}

		if (settings.warehouseToken === undefined) {
			settings.warehouseToken = '';
		}

		if (settings.patreonConnected === undefined) {
			settings.patreonConnected = false;
		}

		if (settings.usePatreonWarehouse === undefined) {
			settings.usePatreonWarehouse = false;
		}
	};
}
