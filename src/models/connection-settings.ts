export interface ConnectionSettings {
	useWarehouse: boolean;
	warehouseHost: string;
	warehouseToken: string;
	patreonConnected: boolean;
	useJsonBin: boolean;
	jsonBinId: string;
	jsonBinAccessKey: string;

	// Google Drive (client-side, no backend)
	useGoogleDrive?: boolean;
	googleClientId?: string;
}
