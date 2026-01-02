import { ConnectionSettings } from '@/models/connection-settings';
import { LocalService } from './local-service';
import { StorageService } from './storage-service';
import { WarehouseService } from './warehouse-service';

export class StorageServiceFactory {
	static fromConnectionSettings = (settings: ConnectionSettings): StorageService => {
		if (settings.useManualWarehouse || settings.usePatreonWarehouse) {
			return new WarehouseService(settings);
		} else {
			return new LocalService();
		}
	};
};
