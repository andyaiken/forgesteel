import { Button, Result } from 'antd';
import { useEffect, useState } from 'react';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { ConnectionSettings } from '@/models/connection-settings';
import { DataService } from '@/utils/data-service';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { PatreonSession } from '@/models/patreon-connection';
import { PatreonStatusPanel } from '@/components/panels/connection-settings/patreon-status-panel';
import { Utils } from '@/utils/utils';
import axios from 'axios';
import { useNavigation } from '@/hooks/use-navigation';
import { useSearchParams } from 'react-router';

import './oauth-redirect.scss';

interface Props {
	connectionSettings: ConnectionSettings;
	setConnectionSettings: (settings: ConnectionSettings) => void
	dataService: DataService;
}

export const OAuthRedirectPage = (props: Props) => {
	const [ searchParams ] = useSearchParams();
	const navigation = useNavigation();

	const [ connectionState, setConnectionState ] = useState<'pending' | 'success' | 'failure' | undefined>(undefined);
	const [ patreonSession, setPatreonSession ] = useState<PatreonSession | null>(null);

	const setConnected = () => {
		setConnectionState('success');
		const settingsCopy = Utils.copy(props.connectionSettings);
		settingsCopy.patreonConnected = true;
		props.setConnectionSettings(settingsCopy);
	};

	const updatePatronStatus = (responseData: PatreonSession) => {
		if (responseData.authenticated) {
			setConnected();
			setPatreonSession(responseData);
		} else {
			setConnectionState('failure');
		}
	};

	const checkPatreonStatus = () => {
		setConnectionState('pending');
		axios.defaults.withCredentials = true;
		const code = searchParams.get('code');
		const state = searchParams.get('state');

		if (code && state) {
			props.dataService.finishPatreonLogin(code, state)
				.then(updatePatronStatus)
				.catch(reason => {
					console.error(reason);
					setConnectionState('failure');
				});
		} else {
			props.dataService.getPatreonSession().then(updatePatronStatus);
		}
	};

	// Do ONCE
	useEffect(() => {
		const check = setTimeout(checkPatreonStatus, 200);

		return () => clearTimeout(check);
	},
	// dependencies here needs to be an empty array so that it only runs once
	// otherwise, it runs several times as things change.
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[]);

	return (
		<ErrorBoundary>
			<AppHeader />
			<Result
				className='patreon-connect-status'
				icon={<CheckIcon state={connectionState} />}
				title='Patreon Connection'
				extra={[
					<Button type='primary' key='return' onClick={() => navigation.goToWelcome()}>
						Return
					</Button>
				]}
			>
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
			</Result>
		</ErrorBoundary>
	);
};
