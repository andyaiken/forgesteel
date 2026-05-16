import { BookOutlined, DatabaseFilled, InfoCircleOutlined, PlayCircleOutlined, ReadOutlined, SettingOutlined, TeamOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Divider, Drawer, Flex, Space, Tag } from 'antd';
import { ButtonConfig, ButtonGroup } from '@/components/controls/button-group/button-group';
import { useDataManager, useOptions } from '@/contexts/data-context';
import { ConnectionSettings } from '@/models/connection-settings';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { SyncStatus } from '@/components/panels/sync-status/sync-status';
import shield from '@/assets/shield.png';
import { useIsSmall } from '@/hooks/use-is-small';
import { useNavigation } from '@/hooks/use-navigation';
import { useState } from 'react';

import './app-footer.scss';

import patreon from '@/assets/icons/patreon.svg';

export interface FooterParams {
	errorsExist: boolean;
	showReference: () => void;
	showAbout: () => void;
	showSettings: () => void;
	showErrors: () => void;
	connectionSettings: ConnectionSettings;
}

interface Props {
	page: 'welcome' | 'heroes' | 'library' | 'session' | 'player-view';
	params: FooterParams;
}

export const AppFooter = (props: Props) => {
	const isSmall = useIsSmall();
	const navigation = useNavigation();
	const [ showSidebar, setShowSidebar ] = useState<boolean>(false);
	const options = useOptions();
	const dataManager = useDataManager();
	const saveOptions = (options: Options) => {
		dataManager.saveOptions(options);
	};

	const onOK = () => {
		saveOptions({ ...options, cookieConsent: true });
		setShowSidebar(false);
	};

	const onCancel = () => {
		window.location.assign('https://www.google.com');
	};

	const onPatreon = () => {
		window.open('https://www.patreon.com/cw/andyaiken', '_blank');
	};

	const actions: ButtonConfig[] = [
		{ type: 'button', label: isSmall ? undefined : 'Reference', icon: <ReadOutlined />, tooltip: 'Reference', onClick: props.params.showReference },
		{ type: 'button', label: isSmall ? undefined : 'Settings', icon: <SettingOutlined />, tooltip: 'Settings', onClick: props.params.showSettings },
		{ type: 'button', label: isSmall ? undefined : 'About', icon: <InfoCircleOutlined />, tooltip: 'About', onClick: props.params.showAbout },
		{ type: 'button', label: isSmall ? undefined : 'Patreon', icon: <img className='patreon-logo' src={patreon} style={{ width: '14px', height: '14px' }} />, tooltip: 'Patreon', onClick: onPatreon }
	];
	if (props.params.errorsExist) {
		actions.push({ type: 'button', icon: <WarningFilled className='danger' />, tooltip: 'Errors', onClick: props.params.showErrors });
	}

	const dataSource = props.params.connectionSettings.dataSource;

	return (
		<ErrorBoundary>
			<div className='app-footer'>
				{
					(props.page === 'player-view') ?
						<div />
						:
						<Flex className='navigation-buttons-panel' align='center' gap={2}>
							<Button type='text' className={props.page === 'welcome' ? 'selected' : ''} icon={<img className='logo-icon' src={shield} />} onClick={() => navigation.goToWelcome()} />
							<Divider orientation='vertical' />
							<Button type='text' className={props.page === 'heroes' ? 'selected' : ''} icon={<TeamOutlined />} onClick={() => navigation.goToHeroList()}>
								{isSmall ? null : 'Heroes'}
							</Button>
							<Divider orientation='vertical' />
							<Button type='text' className={props.page === 'library' ? 'selected' : ''} icon={<BookOutlined />} onClick={() => navigation.goToLibrary('ancestry')}>
								{isSmall ? null : 'Library'}
							</Button>
							<Divider orientation='vertical' />
							<Button type='text' className={props.page === 'session' ? 'selected' : ''} icon={<PlayCircleOutlined />} onClick={() => navigation.goToSession()}>
								{isSmall ? null : 'Session'}
							</Button>
						</Flex>
				}
				{
					!options.cookieConsent ?
						<ButtonGroup
							buttons={[
								{ type: 'button', label: 'Cookies', onClick: () => setShowSidebar(true) }
							]}
						/>
						: null
				}
				<Space>
					<SyncStatus />
					{
						dataSource && !isSmall ?
							<Tag
								icon={<DatabaseFilled />}
								variant='outlined'
								color='blue'
							>
								{dataSource}
							</Tag>
							: null
					}
					<ButtonGroup buttons={actions} />
				</Space>
			</div>
			<Drawer open={showSidebar} onClose={() => setShowSidebar(false)} closeIcon={null} size={500}>
				<Modal
					content={
						showSidebar ?
							<Space orientation='vertical' style={{ width: '100%', padding: '20px' }}>
								<div className='ds-text'>
									Just so you know, <b>FORGE STEEL</b> uses cookies. We good?
								</div>
								<Button type='primary' block={true} onClick={onOK}>
									Yes, obviously that's completely fine
								</Button>
								<Button block={true} onClick={onCancel}>
									I'm not OK with that, I had a bad experience with cookies as a child
								</Button>
							</Space>
							: null
					}
					onClose={() => setShowSidebar(false)}
				/>
			</Drawer>
		</ErrorBoundary>
	);
};
