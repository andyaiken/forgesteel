import { Badge, Button, Divider, Flex } from 'antd';
import { BookOutlined, PlayCircleOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { SyncStatus } from '@/components/panels/sync-status/sync-status';
import { useIsSmall } from '@/hooks/use-is-small';
import { useNavigation } from '@/hooks/use-navigation';

import './app-footer.scss';

import shield from '@/assets/shield.png';

interface Props {
	page: 'welcome' | 'heroes' | 'library' | 'playbook' | 'session' | 'player-view';
	highlightAbout: boolean;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
}

export const AppFooter = (props: Props) => {
	const isSmall = useIsSmall();
	const navigation = useNavigation();

	return (
		<ErrorBoundary>
			<div className='app-footer'>
				{
					(props.page === 'player-view') ?
						<div />
						:
						<Flex className='navigation-buttons-panel' align='center' gap={2}>
							<Button type='text' className={props.page === 'welcome' ? 'selected' : ''} icon={<img className='logo-icon' src={shield} />} onClick={() => navigation.goToWelcome()} />
							<Divider type='vertical' />
							<Button type='text' className={props.page === 'heroes' ? 'selected' : ''} icon={<TeamOutlined />} onClick={() => navigation.goToHeroList()}>
								{isSmall ? null : 'Heroes'}
							</Button>
							<Divider type='vertical' />
							<Button type='text' className={props.page === 'library' ? 'selected' : ''} icon={<BookOutlined />} onClick={() => navigation.goToLibrary('ancestry')}>
								{isSmall ? null : 'Library'}
							</Button>
							<Divider type='vertical' />
							<Button type='text' className={props.page === 'playbook' ? 'selected' : ''} icon={<ReadOutlined />} onClick={() => navigation.goToPlaybook('adventure')}>
								{isSmall ? null : 'Playbook'}
							</Button>
							<Divider type='vertical' />
							<Button type='text' className={props.page === 'session' ? 'selected' : ''} icon={<PlayCircleOutlined />} onClick={() => navigation.goToSession()}>
								{isSmall ? null : 'Session'}
							</Button>
						</Flex>
				}
				<div className='action-buttons-panel'>
					<SyncStatus />
					<Button onClick={props.showReference}>Reference</Button>
					<Button onClick={props.showRoll}>Roll</Button>
					<Badge dot={props.highlightAbout}>
						<Button onClick={props.showAbout}>About</Button>
					</Badge>
				</div>
			</div>
		</ErrorBoundary>
	);
};
