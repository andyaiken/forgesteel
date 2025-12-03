import { Alert, Button, Flex, Input, Space } from 'antd';
import { CloudServerOutlined, SaveFilled } from '@ant-design/icons';
import { JSX, useState } from 'react';
import { ConnectionSettings } from '@/models/connection-settings';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import axios from 'axios';

interface Props {
	connectionSettings: ConnectionSettings;
	setConnectionSettings: (settings: ConnectionSettings) => void
}

export const ConnectionSettingsPanel = (props: Props) => {
	const [ connectionSettings, setConnectionSettings ] = useState<ConnectionSettings>(Utils.copy(props.connectionSettings));
	const [ connectionSettingsChanged, setConnectionSettingsChanged ] = useState<boolean>(false);
	const [ testingWarehouseConnection, setTestingWarehouseConnection ] = useState<boolean>(false);
	const [ testStatusAlert, setTestStatusAlert ] = useState<JSX.Element | null>(null);

	const setUseWarehouse = (value: boolean) => {
		const copy = Utils.copy(connectionSettings);
		copy.useWarehouse = value;
		setConnectionSettings(copy);
		setConnectionSettingsChanged(true);
	};

	const setWarehouseUrl = (value: string) => {
		const copy = Utils.copy(connectionSettings);
		copy.warehouseHost = value;
		setConnectionSettings(copy);
		setConnectionSettingsChanged(true);
	};

	const setWarehouseToken = (value: string) => {
		const copy = Utils.copy(connectionSettings);
		copy.warehouseToken = value;
		setConnectionSettings(copy);
		setConnectionSettingsChanged(true);
	};

	const testWarehouseConnection = () => {
		setTestingWarehouseConnection(true);
		const connectUrl = `${connectionSettings.warehouseHost}/connect`;
		axios.get(connectUrl, { headers: { Authorization: `Bearer ${connectionSettings.warehouseToken}` } })
			.then(() => {
				setTestStatusAlert(<Alert title='Success!' type='success' showIcon closable />);
			})
			.catch(err => {
				console.error('Error connecting to Warehouse', err);
				if (err.response) {
					const code = err.response.status;
					const msg = err.response.data.message ?? err.response.data;
					setTestStatusAlert(<Alert title={`${code} Error: ${msg}`} type='error' showIcon closable />);
				} else {
					setTestStatusAlert(<Alert title={`Unable to connect to warehouse: ${err.message}`} type='error' showIcon closable />);
				}
			})
			.finally(() => {
				setTestingWarehouseConnection(false);
				setTimeout(() => {
					setTestStatusAlert(null);
				}, 10000);
			});
	};

	const saveWarehouseSettings = () => {
		props.setConnectionSettings(connectionSettings);
		setConnectionSettingsChanged(false);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<Toggle
				label='Connect with Forge Steel Warehouse'
				value={connectionSettings.useWarehouse}
				onChange={setUseWarehouse}
			/>
			{
				connectionSettings.useWarehouse ?
					<>
						<HeaderText>Warehouse Host</HeaderText>
						<Input
							placeholder='Warehouse Host'
							allowClear={true}
							value={connectionSettings.warehouseHost}
							onChange={e => setWarehouseUrl(e.target.value)}
						/>
						<HeaderText>API Token</HeaderText>
						<Input.Password
							placeholder='Warehouse API Token'
							value={connectionSettings.warehouseToken}
							onChange={e => setWarehouseToken(e.target.value)}
						/>
					</>
					: null
			}
			<Flex gap='small' justify='flex-end' wrap>
				{
					connectionSettings.useWarehouse ?
						<Button
							variant='solid'
							loading={testingWarehouseConnection}
							icon={<CloudServerOutlined />}
							onClick={testWarehouseConnection}
						>
							Test Connection
						</Button>
						: null
				}
				<Button
					color='primary'
					variant='solid'
					icon={<SaveFilled />}
					onClick={saveWarehouseSettings}
					disabled={!connectionSettingsChanged}
				>
					Save
				</Button>
			</Flex>
			{testStatusAlert}
		</Space>
	);
};
