import { ConnectionSettings } from '@/models/connection-settings';
import { LocalService } from '@/services/storage/local-service';
import { StorageService } from '@/services/storage/storage-service';
import { WarehouseService } from '@/services/storage/warehouse-service';

export class StorageServiceFactory {
	static fromConnectionSettings = (settings: ConnectionSettings): StorageService => {
		if (settings.useManualWarehouse || settings.usePatreonWarehouse) {
			return new WarehouseService(settings);
		} else {
			return new LocalService();
		}
	};
};
