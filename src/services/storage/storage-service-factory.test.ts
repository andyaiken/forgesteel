import { describe, expect, test } from 'vitest';
import { ConnectionSettings } from '@/models/connection-settings';
import { LocalService } from '@/services/storage/local-service';
import { StorageServiceFactory } from '@/services/storage/storage-service-factory';
import { WarehouseService } from '@/services/storage/warehouse-service';

describe('StorageServiceFactory', () => {
	describe('fromConnectionSettings', () => {
		test('returns LocalService when appropriate', () => {
			const settings = {
				useManualWarehouse: false,
				usePatreonWarehouse: false
			} as ConnectionSettings;

			expect(StorageServiceFactory.fromConnectionSettings(settings)).toBeInstanceOf(LocalService);
		});

		test('returns WarehouseService when using manual warehouse', () => {
			const settings = {
				useManualWarehouse: true,
				usePatreonWarehouse: false
			} as ConnectionSettings;

			expect(StorageServiceFactory.fromConnectionSettings(settings)).toBeInstanceOf(WarehouseService);
		});

		test('returns WarehouseService when using patreon warehouse', () => {
			const settings = {
				useManualWarehouse: false,
				usePatreonWarehouse: true
			} as ConnectionSettings;

			expect(StorageServiceFactory.fromConnectionSettings(settings)).toBeInstanceOf(WarehouseService);
		});
	});
});
