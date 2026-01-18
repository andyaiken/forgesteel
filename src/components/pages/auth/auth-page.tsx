import { Alert, Button, Divider, Space } from 'antd';
import { useEffect, useState } from 'react';
import { AppFooter } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { ConnectionSettings } from '@/models/connection-settings';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { PatreonLogic } from '@/logic/patreon-logic';
import { PatreonService } from '@/service/patreon-service';
import { PatreonSession } from '@/models/patreon-connection';
import { PatreonStatusPanel } from '@/components/panels/connection-settings/patreon-status-panel';
import { Utils } from '@/utils/utils';
import axios from 'axios';
import { useNavigation } from '@/hooks/use-navigation';
import { useSearchParams } from 'react-router';

import './auth-page.scss';

interface Props {
	connectionSettings: ConnectionSettings;
	highlightAbout: boolean;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
	showSettings: () => void;
	setConnectionSettings: (settings: ConnectionSettings) => void
}

export const AuthPage = (props: Props) => {
	const [ searchParams ] = useSearchParams();
	const navigation = useNavigation();
	const service = new PatreonService();

	const [ showTransferButton, setShowTransferButton ] = useState<boolean>(false);

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
			setShowTransferButton(PatreonLogic.hasWarehouseAccess(responseData));
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
			service.finishPatreonLogin(code, state)
				.then(updatePatronStatus)
				.catch(reason => {
					console.error(reason);
					setConnectionState('failure');
				});
		} else {
			service.getPatreonSession().then(updatePatronStatus);
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

	const getTransferButton = () => {
		if (showTransferButton) {
			return (
				<>
					<Space orientation='vertical' style={{ width: '400px' }}>
						<Alert
							type='info'
							title='Patron Warehouse'
							description='You are a patron with automatic access to the Patron cloud storage - you can transfer your local data to the cloud here:'
							showIcon={true}
						/>
						<Button
							block={true}
							type='primary'
							onClick={transferAndReload}
						>
							Transfer Data
						</Button>
					</Space>
					<Divider size='small' />
				</>
			);
		}
	};

	const transferAndReload = () => {
		navigation.goToTransfer();
		location.reload();
	};

	const returnAndReload = () => {
		navigation.goToWelcome();
		location.reload();
	};

	return (
		<ErrorBoundary>
			<div className='auth-page'>
				<AppHeader />
				<div className='auth-page-content'>
					<div className='data-loader-container'>
						<div className='overall-state'>
							<CheckIcon state={connectionState} />
						</div>
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
						{getTransferButton()}
						<Button block={true} type='primary' onClick={returnAndReload}>
							Return
						</Button>
					</div>
				</div>
				<AppFooter
					page='welcome'
					highlightAbout={props.highlightAbout}
					showReference={props.showReference}
					showRoll={props.showRoll}
					showAbout={props.showAbout}
					showSettings={props.showSettings}
				/>
			</div>
		</ErrorBoundary>
	);
};
