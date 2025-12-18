import { Alert, Button, Flex, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Browser } from '@/utils/browser';
import { ConnectionSettings } from '@/models/connection-settings';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { DataService } from '@/utils/data-service';
import { PatreonSession } from '@/models/patreon-connection';
import { PatreonStatusPanel } from '@/components/panels/connection-settings/patreon-status-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Utils } from '@/utils/utils';

import patreon from '@/assets/icons/patreon.svg';

interface Props {
	dataService: DataService;
	connectionSettings: ConnectionSettings;
	setConnectionSettings: (settings: ConnectionSettings) => void
}

export const PatreonConnectPanel = (props: Props) => {
	const [ loadingSession, setLoadingSession ] = useState<boolean>(true);
	const [ patreonSession, setPatreonSession ] = useState<PatreonSession | null>(null);

	const connectOAuth = () => {
		props.dataService.getPatreonAuthUrl()
			.then(authorizationUrl => {
				window.location.href = authorizationUrl;
			});
	};

	const logout = () => {
		props.dataService.logoutPatreon()
			.then(() => {
				const settingsCopy = Utils.copy(props.connectionSettings);
				settingsCopy.patreonConnected = false;
				props.setConnectionSettings(settingsCopy);
				updateSession();
			});
	};

	const updateSession = () => {
		setLoadingSession(true);
		props.dataService.getPatreonSession()
			.then(setPatreonSession)
			.finally(() => {
				setLoadingSession(false);
			});
	};

	useEffect(updateSession, [ props.dataService ]);

	if (loadingSession) {
		return (
			<Flex align='center' justify='center'>
				<Spin />
			</Flex>
		);
	}

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{
				Browser.isSafari() ?
					<Alert
						type='warning'
						showIcon={true}
						title='To  use this feature, you will need to disable "Prevent cross-site tracking" in Safari preferences.'
					/>
					: null
			}
			{
				!patreonSession || !patreonSession.authenticated ?
					<Button
						block={true}
						type='primary'
						onClick={connectOAuth}
					>
						<img className='patreon-logo' src={patreon} style={{ width: '16px', height: '16px' }} />
						Connect with Patreon
					</Button>
					: null
			}
			{
				patreonSession?.connections.map((conn, i) => {
					return (
						<SelectablePanel key={`patreon-connection-${i}`}>
							<PatreonStatusPanel
								key={`patreon-connection-${i}`}
								title={conn.name}
								status={conn.status}
							/>
						</SelectablePanel>
					);
				})
			}
			{
				patreonSession && patreonSession.authenticated ?
					<DangerButton
						mode='block'
						label='Disconnect from Patreon'
						onConfirm={logout}
					/>
					: null
			}
		</Space>
	);
};
