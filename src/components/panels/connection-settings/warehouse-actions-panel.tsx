import { Button, Space } from 'antd';
import { ConnectionSettings } from '@/models/connection-settings';
import { FeatureFlags } from '@/utils/feature-flags';
import { useNavigate } from 'react-router';
import { GoogleDriveClient } from '@/utils/google-drive-client';

interface Props {
	connectionSettings: ConnectionSettings;
}

export const WarehouseActionsPanel = (props: Props) => {
	const navigate = useNavigate();

	const checkGoogleAccessToken = async () => {
		const settings = props.connectionSettings;
		const gdriveEnabled = settings.useGoogleDrive && FeatureFlags.hasFlag(FeatureFlags.remoteGoogleDrive.code);
		if (!gdriveEnabled) return;

		const envGoogleClientId = (import.meta as any).env?.VITE_GDRIVE_CLIENT_ID as string | undefined;
		const clientId = settings.googleClientId || envGoogleClientId || '';
		if (!clientId) return;

		const gdc = new GoogleDriveClient(clientId);
		if (!gdc.isAuthorized()) {
			try {
				await gdc.getAccessToken(false);
			} catch {
				// ignore; user can connect interactively on settings page
			}
		}
	};

	const goToTransferPage = async () => {
		await checkGoogleAccessToken();
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
