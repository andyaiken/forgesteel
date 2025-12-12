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
	setConnectionSettings: (settings: ConnectionSettings) => void;
	showReload?: boolean;
}

export const ConnectionSettingsPanel = (props: Props) => {
	const [ connectionSettings, setConnectionSettings ] = useState<ConnectionSettings>(Utils.copy(props.connectionSettings));
	const [ connectionSettingsChanged, setConnectionSettingsChanged ] = useState<boolean>(false);
	const [ testingWarehouseConnection, setTestingWarehouseConnection ] = useState<boolean>(false);
	const [ testStatusAlert, setTestStatusAlert ] = useState<JSX.Element | null>(null);
	const [ reloadNeeded, setReloadNeeded ] = useState<boolean>(false);

	const showReload = props.showReload ?? false;

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const showTestConnectionError = (err: any) => {
		console.error('Error connecting to Warehouse', err);
		if (err.response) {
			const code = err.response.status;
			const msg = err.response.data.message ?? err.response.data;
			setTestStatusAlert(<Alert title={`${code} Error: ${msg}`} type='error' showIcon closable />);
		} else {
			setTestStatusAlert(<Alert title={`Unable to connect to warehouse: ${err.message}`} type='error' showIcon closable />);
		}
	};

	const testWarehouseConnection = () => {
		setTestingWarehouseConnection(true);
		axios.defaults.xsrfCookieName = 'csrf_access_token';
		axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
		const healthUrl = `${connectionSettings.warehouseHost}/healthz`;
		const connectUrl = `${connectionSettings.warehouseHost}/connect`;
		axios.get(healthUrl)
			.then(response => {
				const version = response.data.version;
				const maj = parseInt(version.split('.')[0]);
				const method = maj > 0 ? 'post' : 'get';
				axios.request({
					url: connectUrl,
					method: method,
					headers: { Authorization: `Bearer ${connectionSettings.warehouseToken}` },
					withCredentials: true,
					withXSRFToken: true
				}).then(() => {
					setTestStatusAlert(<Alert title={`Success! (v${version})`} type='success' showIcon closable />);
				}).catch(showTestConnectionError);
			}).catch(showTestConnectionError)
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
		setReloadNeeded(true);
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
			{
				reloadNeeded && showReload ?
					<Alert
						title='Reload Forge Steel to use new settings'
						type='info'
						showIcon
						action={
							<Button size='small' type='primary' onClick={() => location.reload()}>
								Reload
							</Button>
						}
					/>
					: null
			}
		</Space>
	);
};
