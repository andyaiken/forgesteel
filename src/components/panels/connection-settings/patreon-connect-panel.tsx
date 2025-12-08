import { Button, Flex, Space } from 'antd';
import { useEffect, useState } from 'react';
import { ConnectionSettings } from '@/models/connection-settings';
import { DataService } from '@/utils/data-service';
import Icon from '@ant-design/icons';
import { PatreonSession } from '@/models/patreon-connection';
import { PatreonStatusPanel } from './patreon-status-panel';
import { Utils } from '@/utils/utils';

interface Props {
	dataService: DataService;
	connectionSettings: ConnectionSettings;
	setConnectionSettings: (settings: ConnectionSettings) => void
}

export const PatreonConnectPanel = (props: Props) => {
	const [ patreonSession, setPatreonSession ] = useState<PatreonSession | null>(null);

	const PatreonSvg: React.FC = () => (
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
			<path d='M490 153.8c-.1-65.4-51-119-110.7-138.3-74.2-24-172-20.5-242.9 12.9-85.8 40.5-112.8 129.3-113.8 217.8-.8 72.8 6.4 264.4 114.6 265.8 80.3 1 92.3-102.5 129.5-152.3 26.4-35.5 60.5-45.5 102.4-55.9 72-17.8 121.1-74.7 121-150l-.1 0z' />
		</svg>
	);

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
		props.dataService.getPatreonSession()
			.then(setPatreonSession);
	};

	useEffect(updateSession, [ props.dataService ]);

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<Flex gap='small'>

				<Button
					color='primary'
					variant='solid'
					icon={<Icon component={PatreonSvg} style={{ fill: 'white', width: '1em', height: '1em' }} />}
					disabled={patreonSession?.authenticated}
					onClick={connectOAuth}
				>
					Connect with Patreon
				</Button>
				{
					patreonSession?.authenticated ?
						<Button onClick={logout} danger={true}>
							Disconnect Patreon
						</Button>
						: null
				}
			</Flex>
			{
				patreonSession?.connections.map((conn, i) => {
					return (
						<PatreonStatusPanel
							key={`patreon-connection-${i}`}
							title={conn.name}
							status={conn.status}
						/>
					);
				})
			}
		</Space>
	);
};
