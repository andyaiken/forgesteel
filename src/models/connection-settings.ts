import { PatreonConnection } from '@/models/patreon-connection';

export type FSDataSource = 'Local' | 'Patron' | 'Warehouse' | undefined;

export interface ConnectionSettings {
	useManualWarehouse: boolean;
	warehouseHost: string;
	warehouseToken: string;
	patreonConnected: boolean;
	usePatreonWarehouse: boolean;
	patreonConnections: PatreonConnection[];
	dataSource: FSDataSource;
}
