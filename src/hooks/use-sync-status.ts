import { useCallback, useEffect, useState } from 'react';

export interface SyncStatus {
	isSynced: boolean;
	isSyncing: boolean;
	isOnline: boolean;
	lastSyncTime: Date | null;
	statusMessage: string;
}

enum Messages {
	OnlineNotSynced = 'Online - Not synced',
	OnlineSyncing = 'Online - Syncing data',
	OnlineSynced = 'Online - Data available for offline use',
	Offline = 'Offline - Using cached data'
}

export const useSyncStatus = () => {
	const [ syncStatus, setSyncStatus ] = useState<SyncStatus>({
		isSynced: false,
		isSyncing: false,
		isOnline: navigator.onLine,
		lastSyncTime: null,
		statusMessage: Messages.OnlineNotSynced
	});

	const updateStatusMessage = (
		isOnline: boolean,
		isSynced: boolean,
		isSyncing: boolean
	) => {
		if (!isOnline) {
			return Messages.Offline;
		}
		if (isSyncing) {
			return Messages.OnlineSyncing;
		}
		return isSynced ? Messages.OnlineSynced : Messages.OnlineNotSynced;
	};

	const checkSyncStatus = useCallback(async () => {
		if ('serviceWorker' in navigator && 'caches' in window) {
			try {
				const cache = await caches.open('forgesteel-v1');
				const keys = await cache.keys();

				// Check if we have the essential files cached
				const hasIndex = keys.some(request =>
					request.url.includes('/index.html')
				);
				const hasManifest = keys.some(request =>
					request.url.includes('/manifest.json')
				);
				const hasAssets = keys.some(request =>
					request.url.includes('/assets/')
				);

				const isSynced = hasIndex && hasManifest && hasAssets;

				setSyncStatus(prev => {
					const newStatus = {
						...prev,
						isSynced,
						lastSyncTime: isSynced ? new Date() : prev.lastSyncTime
					};
					return {
						...newStatus,
						statusMessage: updateStatusMessage(
							prev.isOnline,
							newStatus.isSynced,
							newStatus.isSyncing
						)
					};
				});
			} catch (error) {
				console.error('Error checking sync status:', error);
			}
		}
	}, []);

	const syncForOffline = useCallback(async () => {
		if ('serviceWorker' in navigator && 'caches' in window) {
			setSyncStatus(prev => ({
				...prev,
				isSyncing: true,
				statusMessage: updateStatusMessage(prev.isOnline, prev.isSynced, true)
			}));

			try {
				const cache = await caches.open('forgesteel-v1');

				// Cache essential files
				const urlsToCache = [
					'/forgesteel/',
					'/forgesteel/index.html',
					'/forgesteel/manifest.json'
				];

				await cache.addAll(urlsToCache);

				// Cache current page and any loaded assets
				const currentUrl = window.location.href;
				await cache.add(currentUrl);

				setSyncStatus(prev => {
					const newStatus = {
						isSynced: true,
						isSyncing: false,
						isOnline: prev.isOnline,
						lastSyncTime: new Date()
					};
					return {
						...newStatus,
						statusMessage: updateStatusMessage(
							newStatus.isOnline,
							newStatus.isSynced,
							newStatus.isSyncing
						)
					};
				});
			} catch (error) {
				console.error('Error syncing for offline:', error);
				setSyncStatus(prev => ({
					...prev,
					isSyncing: false,
					statusMessage: updateStatusMessage(
						prev.isOnline,
						prev.isSynced,
						false
					)
				}));
			}
		}
	}, []);

	useEffect(() => {
		checkSyncStatus();

		// Auto-sync on load if online
		if (navigator.onLine) {
			syncForOffline();
		}

		// Handle online/offline events
		const handleOnline = () => {
			setSyncStatus(prev => {
				const newStatus = { ...prev, isOnline: true };
				return {
					...newStatus,
					statusMessage: updateStatusMessage(
						newStatus.isOnline,
						newStatus.isSynced,
						newStatus.isSyncing
					)
				};
			});
			checkSyncStatus();
		};

		const handleOffline = () => {
			setSyncStatus(prev => {
				const newStatus = { ...prev, isOnline: false };
				return {
					...newStatus,
					statusMessage: updateStatusMessage(
						newStatus.isOnline,
						newStatus.isSynced,
						newStatus.isSyncing
					)
				};
			});
		};

		// Check sync status when service worker updates
		const handleServiceWorkerMessage = (event: MessageEvent) => {
			if (event.data && event.data.type === 'CACHE_UPDATED') {
				checkSyncStatus();
			}
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.addEventListener(
				'message',
				handleServiceWorkerMessage
			);
		}

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.removeEventListener(
					'message',
					handleServiceWorkerMessage
				);
			}
		};
	}, [ checkSyncStatus, syncForOffline ]);

	// Function to trigger sync when data changes
	const triggerSyncOnChange = useCallback(() => {
		if (navigator.onLine && !syncStatus.isSyncing) {
			syncForOffline();
		}
	}, [ syncStatus.isSyncing, syncForOffline ]);

	return {
		...syncStatus,
		syncForOffline,
		checkSyncStatus,
		triggerSyncOnChange
	};
};
