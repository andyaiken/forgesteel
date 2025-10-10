import { SyncOutlined, WifiOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { useSyncStatus } from '@/hooks/use-sync-status';

import './sync-status.scss';

export const SyncStatus = () => {
	const {
		isSyncing,
		isOnline,
		statusMessage
	} = useSyncStatus();

	if (!isOnline) {
		return (
			<ErrorBoundary>
				<div className='sync-status offline'>
					<WifiOutlined title={statusMessage} />;
				</div>
			</ErrorBoundary>
		);
	}

	if (isSyncing) {
		return (
			<ErrorBoundary>
				<div className='sync-status syncing'>
					<SyncOutlined title={statusMessage} spin={true} />
				</div>
			</ErrorBoundary>
		);
	}

	return null;
};
