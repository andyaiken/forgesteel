import { PatreonConnection } from './patreon-connection';

export interface ConnectionSettings {
	useManualWarehouse: boolean;
	warehouseHost: string;
	warehouseToken: string;
	patreonConnected: boolean;
	usePatreonWarehouse: boolean;
	patreonConnections: PatreonConnection[];
}
