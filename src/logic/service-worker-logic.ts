import { ConnectionSettings } from '../models/connection-settings';

export class ServiceWorkerLogic {
	public static shouldDisableServiceWorker(connectionSettings: ConnectionSettings): boolean {
		return connectionSettings.useWarehouse && 'serviceWorker' in navigator;
	}
}
