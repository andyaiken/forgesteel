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
		statusMessage
	} = useSyncStatus();

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

	return (
		<div className={`sync-status-text ${className || ''}`}>
			{getIcon()}
			<span>{statusMessage}</span>
		</div>
	);
};
