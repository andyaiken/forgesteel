import { ConnectionSettings } from '@/models/connection-settings';
import { LocalService } from '@/service/storage/local-service';
import { StorageService } from '@/service/storage/storage-service';
import { WarehouseService } from '@/service/storage/warehouse-service';

export class StorageServiceFactory {
	static fromConnectionSettings = (settings: ConnectionSettings): StorageService => {
		if (settings.useWarehouse) {
			return new WarehouseService(settings);
		} else {
			return new LocalService();
		}
	};
};
