import { Button, Space } from 'antd';
import { ConnectionSettings } from '@/models/connection-settings';
import { FeatureFlags } from '@/utils/feature-flags';
import { useNavigate } from 'react-router';

interface Props {
	connectionSettings: ConnectionSettings;
}

export const WarehouseActionsPanel = (props: Props) => {
	const navigate = useNavigate();

	const goToTransferPage = () => {
		navigate('/transfer');
	};

	const showTransferButton = props.connectionSettings.useWarehouse || 
		(props.connectionSettings.useGoogleDrive && FeatureFlags.hasFlag(FeatureFlags.remoteGoogleDrive.code));

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{
				showTransferButton ?
					<Button
						block={true}
						onClick={goToTransferPage}
					>
						Transfer Data
					</Button>
					: null
			}
		</Space>
	);
};
