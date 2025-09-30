import { SyncOutlined, WifiOutlined } from '@ant-design/icons';
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
			<div className='sync-status offline'>
				<WifiOutlined title={statusMessage} />;
			</div>
		);
	}

	if (isSyncing) {
		return (
			<div className='sync-status syncing'>
				<SyncOutlined title={statusMessage} spin={true} />
			</div>
		);
	}

	return null;
};
