import { Alert, Button, Flex, Input, Space, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, SaveFilled } from '@ant-design/icons';
import { JSX, useEffect, useState } from 'react';
import { ConnectionSettings } from '@/models/connection-settings';
import { FeatureFlags } from '@/utils/feature-flags';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { useNavigate } from 'react-router';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { GoogleDriveClient } from '@/utils/google-drive-client';

interface Props {
	connectionSettings: ConnectionSettings;
	setConnectionSettings: (settings: ConnectionSettings) => void;
	showReload?: boolean;
}

export const GoogleDriveSettingsPanel = (props: Props) => {
	const [ connectionSettings, setConnectionSettings ] = useState<ConnectionSettings>(Utils.copy(props.connectionSettings));
	const [ connectionSettingsChanged, setConnectionSettingsChanged ] = useState<boolean>(false);
	const [ reloadNeeded, setReloadNeeded ] = useState<boolean>(false);
	const [ driveStatusAlert, setDriveStatusAlert ] = useState<JSX.Element | null>(null);
	const [ driveIsConnected, setDriveIsConnected ] = useState<boolean>(false);
	const navigate = useNavigate();

	const showReload = props.showReload ?? false;

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

	const envGoogleClientId = (import.meta as any).env?.VITE_GDRIVE_CLIENT_ID as string | undefined;
	const effectiveGoogleClientId = connectionSettings.googleClientId || envGoogleClientId || '';
	const gdc = effectiveGoogleClientId ? new GoogleDriveClient(effectiveGoogleClientId) : null;

	const checkGoogleAccessToken = async () => {
		if (!gdc || !connectionSettings.useGoogleDrive) {
			setDriveIsConnected(false);
			return;
		}
		setDriveIsConnected(gdc.isAuthorized());
	};

	useEffect(() => {
		checkGoogleAccessToken();
	}, [ gdc, connectionSettings.useGoogleDrive ]);

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

	const goToTransferPage = async () => {
		await checkGoogleAccessToken();
		navigate('/transfer');
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
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
									{(!envGoogleClientId)
										? (
											<Alert 
												message="Google OAuth Client ID Missing" 
												description="The Google OAuth Client ID is missing from the environment variables. Please configure VITE_GDRIVE_CLIENT_ID." 
												type="error" 
												showIcon 
											/>
										)
										: (
									<>
										<p style={{ fontSize: '12px', color: '#999' }}>
											For security reasons, ForgeSteel
											does not have access to your main  Google Drive files, only the ForgeSteel app's settings folder.
											Uses Google Identity Services to store data in the Drive <strong>appDataFolder</strong> scope.
										</p>
										<Flex gap='small' align='center' style={{ marginBottom: '12px' }}>
											{driveIsConnected
												? (
													<Tag icon={<CheckCircleOutlined />} color='success'>Connected</Tag>
												)
												: (
													<Tag icon={<ClockCircleOutlined />} color='default'>Not connected</Tag>
												)}
										</Flex>
										<Flex gap='small'>
											{!driveIsConnected
												? (
													<Button onClick={connectGoogleDrive}>Connect Google Drive</Button>
												)
												: (
													<Button onClick={disconnectGoogleDrive}>Disconnect</Button>
												)}
										</Flex>
										<p style={{ fontSize: '12px', color: '#999', marginTop: 8 }}>
											Please enable popups for this site to allow Google sign‑in.
										</p>
										{driveStatusAlert}
										<Space orientation='vertical' style={{ width: '100%' }}>
											{
												driveIsConnected ?
													<Button
														block={true}
														onClick={goToTransferPage}
													>
														Transfer Data
													</Button>
													: null
											}
										</Space>										
									</>
										)}
								</>
								: null
						}
					</>
					: null
			}
			<Flex gap='small' justify='flex-end' wrap>
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
