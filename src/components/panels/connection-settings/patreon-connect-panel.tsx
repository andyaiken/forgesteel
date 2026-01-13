import { Alert, Button, Flex, Space, Spin, notification } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Browser } from '@/utils/browser';
import { ConnectionSettings } from '@/models/connection-settings';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { PatreonService } from '@/service/patreon-service';
import { PatreonSession } from '@/models/patreon-connection';
import { PatreonStatusPanel } from '@/components/panels/connection-settings/patreon-status-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Utils } from '@/utils/utils';

import patreon from '@/assets/icons/patreon.svg';

interface Props {
	connectionSettings: ConnectionSettings;
	setConnectionSettings: (settings: ConnectionSettings) => void
}

export const PatreonConnectPanel = (props: Props) => {
	const [ loadingSession, setLoadingSession ] = useState<boolean>(true);
	const [ patreonSession, setPatreonSession ] = useState<PatreonSession | null>(null);
	const [ notify, notifyContext ] = notification.useNotification();

	const service = useMemo(() => new PatreonService(), []);

	const connectOAuth = () => {
		service.getPatreonAuthUrl()
			.then(authorizationUrl => {
				window.location.href = authorizationUrl;
			});
	};

	const logout = () => {
		service.logoutPatreon()
			.then(() => {
				const settingsCopy = Utils.copy(props.connectionSettings);
				settingsCopy.patreonConnected = false;
				settingsCopy.usePatreonWarehouse = false;
				props.setConnectionSettings(settingsCopy);
				updateSession();
			}).then(() => location.reload());
	};

	const hasRun = useRef(false);

	const updateSession = () => {
		if (hasRun.current)
			return;
		hasRun.current = true;

		setLoadingSession(true);
		service.getPatreonSession()
			.then(setPatreonSession)
			.catch(err => {
				console.error(err);
				notify.error({
					title: 'Error connecting with Patreon',
					description: Utils.getErrorMessage(err),
					placement: 'top'
				});
			})
			.finally(() => {
				setLoadingSession(false);
			});
	};

	useEffect(updateSession, [ notify, service ]);

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
			{notifyContext}
		</Space>
	);
};
