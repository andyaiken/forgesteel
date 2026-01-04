import { Button, Space } from 'antd';
import { ConnectionSettings } from '@/models/connection-settings';
import { useNavigate } from 'react-router';

interface Props {
	connectionSettings: ConnectionSettings;
}

export const WarehouseActionsPanel = (props: Props) => {
	const navigate = useNavigate();

	const goToTransferPage = () => {
		navigate('/transfer');
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{
				props.connectionSettings.useWarehouse ?
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
