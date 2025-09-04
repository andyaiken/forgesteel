import { BookOutlined, PlayCircleOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Divider, Flex } from 'antd';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { useMediaQuery } from '../../../hooks/use-media-query';
import { useNavigation } from '../../../hooks/use-navigation';

import './app-footer.scss';

import shield from './../../../assets/shield.png';

interface Props {
	page: 'welcome' | 'heroes' | 'library' | 'playbook' | 'session' | 'player-view';
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
}

export const AppFooter = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const navigation = useNavigation();

	try {
		return (
			<ErrorBoundary>
				<div className='app-footer'>
					{
						isSmall || (props.page === 'player-view') ?
							<div />
							:
							<Flex className='navigation-buttons-panel' align='center'>
								<Button type='text' className={props.page === 'welcome' ? 'selected' : ''} icon={<img className='logo-icon' src={shield} />} onClick={() => navigation.goToWelcome()} />
								<Divider type='vertical' />
								<Button type='text' className={props.page === 'heroes' ? 'selected' : ''} icon={<TeamOutlined />} onClick={() => navigation.goToHeroList()}>
									Heroes
								</Button>
								<Divider type='vertical' />
								<Button type='text' className={props.page === 'library' ? 'selected' : ''} icon={<BookOutlined />} onClick={() => navigation.goToLibraryList('ancestry')}>
									Library
								</Button>
								<Divider type='vertical' />
								<Button type='text' className={props.page === 'playbook' ? 'selected' : ''} icon={<ReadOutlined />} onClick={() => navigation.goToPlaybookList('adventure')}>
									Playbook
								</Button>
								<Divider type='vertical' />
								<Button type='text' className={props.page === 'session' ? 'selected' : ''} icon={<PlayCircleOutlined />} onClick={() => navigation.goToSession()}>
									Session
								</Button>
							</Flex>
					}
					<div className='action-buttons-panel'>
						<Button onClick={props.showReference}>Reference</Button>
						<Button onClick={props.showRoll}>Roll</Button>
						<Button onClick={props.showAbout}>About</Button>
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
