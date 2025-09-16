import { Button, Tooltip } from 'antd';
import {
	CheckCircleOutlined,
	CloudDownloadOutlined,
	SyncOutlined,
	WifiOutlined
} from '@ant-design/icons';
import { useSyncStatus } from '../../../hooks/use-sync-status';
import './sync-status.scss';

interface Props {
	className?: string;
}

export const SyncStatus = ({ className }: Props) => {
	const {
		isSynced,
		isSyncing,
		isOnline,
		lastSyncTime,
		statusMessage,
		syncForOffline
	} = useSyncStatus();

	const formatLastSync = (date: Date | null) => {
		if (!date) return '';
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / (1000 * 60));

		if (diffMins < 1) return 'just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		const diffHours = Math.floor(diffMins / 60);
		if (diffHours < 24) return `${diffHours}h ago`;
		const diffDays = Math.floor(diffHours / 24);
		return `${diffDays}d ago`;
	};

	const getIcon = () => {
		if (!isOnline) {
			return <WifiOutlined style={{ color: '#ff4d4f' }} />;
		}
		if (isSyncing) {
			return <SyncOutlined spin style={{ color: '#1890ff' }} />;
		}
		if (isSynced) {
			return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
		}
		return <CloudDownloadOutlined style={{ color: '#faad14' }} />;
	};

	const getTooltipTitle = () => {
		const lastSync = lastSyncTime
			? `last synced ${formatLastSync(lastSyncTime)}`
			: '';
		return `${lastSync}`;
	};

	const canSync = isOnline && !isSyncing;

	return (
		<Tooltip title={getTooltipTitle()}>
			<Button
				type='text'
				icon={getIcon()}
				onClick={canSync ? syncForOffline : undefined}
				loading={isSyncing}
				disabled={!canSync}
				className={`sync-status-button ${className || ''}`}
				style={{
					color: 'inherit'
				}}
			>
				{statusMessage}
			</Button>
		</Tooltip>
	);
};
