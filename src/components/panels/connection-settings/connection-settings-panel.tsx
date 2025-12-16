import { Alert, Button, Flex, Input, Space, Tag } from 'antd';
import { CloudServerOutlined, SaveFilled, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { JSX, useState, useEffect } from 'react';
import { ConnectionSettings } from '@/models/connection-settings';
import { FeatureFlags } from '@/utils/feature-flags';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import axios from 'axios';
import { GoogleDriveClient } from '@/utils/google-drive-client';

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
	const [ driveStatusAlert, setDriveStatusAlert ] = useState<JSX.Element | null>(null);
	const [ driveIsConnected, setDriveIsConnected ] = useState<boolean>(false);

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

	const setUseGoogleDrive = (value: boolean) => {
		const copy = Utils.copy(connectionSettings);
		copy.useGoogleDrive = value;
		setConnectionSettings(copy);
		setConnectionSettingsChanged(true);
		if (value) {
			FeatureFlags.add(FeatureFlags.remoteGoogleDrive.code);
		} else {
			FeatureFlags.remove(FeatureFlags.remoteGoogleDrive.code);
		}
	};

	const setGoogleClientId = (value: string) => {
		const copy = Utils.copy(connectionSettings);
		copy.googleClientId = value;
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

	const envGoogleClientId = (import.meta as any).env?.VITE_GDRIVE_CLIENT_ID as string | undefined;
	const effectiveGoogleClientId = connectionSettings.googleClientId || envGoogleClientId || '';
	const gdc = effectiveGoogleClientId ? new GoogleDriveClient(effectiveGoogleClientId) : null;

	useEffect(() => {
		const checkOnce = async () => {
			if (!gdc || !connectionSettings.useGoogleDrive) {
				setDriveIsConnected(false);
				return;
			}
			if (!gdc.isAuthorized()) {
				try {
					await gdc.getAccessToken(false);
				} catch {
					// silent refresh failed; user can connect interactively
				}
			}
			setDriveIsConnected(gdc.isAuthorized());
		};

		checkOnce();
	}, [gdc, connectionSettings.useGoogleDrive]);

	const connectGoogleDrive = async () => {
		try {
			if (!gdc) {
				setDriveStatusAlert(<Alert title='Google Client ID not configured' type='error' showIcon closable />);
				return;
			}
			await gdc.getAccessToken(true);
			const copy = Utils.copy(connectionSettings);
			copy.useGoogleDrive = true;
			setConnectionSettings(copy);
			setConnectionSettingsChanged(true);
			setDriveStatusAlert(<Alert title='Connected to Google Drive' type='success' showIcon closable />);
		} catch (e: any) {
			setDriveStatusAlert(<Alert title={`Google Drive connect failed: ${e?.message || e}`} type='error' showIcon closable />);
		} finally {
			setTimeout(() => setDriveStatusAlert(null), 10000);
		}
	};

	const disconnectGoogleDrive = () => {
		try {
			gdc?.revoke();
			const copy = Utils.copy(connectionSettings);
			copy.useGoogleDrive = false;
			setConnectionSettings(copy);
			setConnectionSettingsChanged(true);
			setDriveStatusAlert(<Alert title='Disconnected from Google Drive' type='success' showIcon closable />);
		} catch (e: any) {
			setDriveStatusAlert(<Alert title={`Google Drive disconnect failed: ${e?.message || e}`} type='error' showIcon closable />);
		} finally {
			setTimeout(() => setDriveStatusAlert(null), 10000);
		}
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
			{
				FeatureFlags.hasFlag(FeatureFlags.remoteGoogleDrive.code) ?
					<>
						<Toggle
							label='Connect with Google Drive'
							value={!!connectionSettings.useGoogleDrive}
							onChange={setUseGoogleDrive}
						/>
						{
							connectionSettings.useGoogleDrive ?
								<>
									{(!envGoogleClientId) ? (
										<>
											<HeaderText>Google OAuth Client ID</HeaderText>
											<Input
												placeholder='Web Client ID from Google Cloud Console'
												allowClear={true}
												value={connectionSettings.googleClientId}
												onChange={e => setGoogleClientId(e.target.value)}
											/>
										</>
									) : null}
					<p style={{ fontSize: '12px', color: '#999' }}>
										
										For security reasons, ForgeSteel
										does not have access to your main  Google Drive files, only the ForgeSteel app's settings folder.
										Uses Google Identity Services to store data in the Drive <strong>appDataFolder</strong> scope.
									</p>
									<Flex gap='small' align='center' style={{ marginBottom: '12px' }}>
										{driveIsConnected ? (
											<Tag icon={<CheckCircleOutlined />} color='success'>Connected</Tag>
										) : (
											<Tag icon={<ClockCircleOutlined />} color='default'>Not connected</Tag>
										)}
									</Flex>
									<Flex gap='small'>
										{!driveIsConnected ? (
											<Button onClick={connectGoogleDrive}>Connect Google Drive</Button>
										) : (
											<Button onClick={disconnectGoogleDrive}>Disconnect</Button>
										)}
									</Flex>
									<p style={{ fontSize: '12px', color: '#999', marginTop: 8 }}>
										Please enable popups for this site to allow Google sign‑in.
									</p>
								</>
								: null
						}
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
