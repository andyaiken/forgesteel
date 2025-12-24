export interface ConnectionSettings {
	useWarehouse: boolean;
	warehouseHost: string;
	warehouseToken: string;
	patreonConnected: boolean;

	// Google Drive
	useGoogleDrive?: boolean;
	googleClientId?: string;
}
