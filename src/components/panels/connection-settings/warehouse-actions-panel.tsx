import { Alert, Button, Divider } from 'antd';
import { ConnectionSettings } from '@/models/connection-settings';
import { useNavigate } from 'react-router';

interface Props {
	connectionSettings: ConnectionSettings;
}

export const WarehouseActionsPanel = (props: Props) => {
	const navigate = useNavigate();
	const showTransferButton = props.connectionSettings.useManualWarehouse
		|| props.connectionSettings.usePatreonWarehouse;

	const goToTransferPage = () => {
		navigate('/transfer');
	};

	return (
		<>
			{
				props.connectionSettings.usePatreonWarehouse ?
					<Alert
						type='info'
						title='Patron Warehouse'
						description='You are a patron with automatic access to the Patron cloud storage - you can transfer your local data to the cloud here:'
						showIcon={true}
					/>
					: null
			}
			{
				showTransferButton ?
					<Button
						block={true}
						type='primary'
						onClick={goToTransferPage}
					>
						Transfer Data
					</Button>
					: null
			}
			{
				showTransferButton ?
					<Divider size='small' />
					: null
			}
		</>
	);
};
