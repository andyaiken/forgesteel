import { BookOutlined, PlayCircleOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Segmented } from 'antd';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { useMediaQuery } from '../../../hooks/use-media-query';
import { useNavigation } from '../../../hooks/use-navigation';

import './app-footer.scss';

import shield from './../../../assets/shield.png';

interface Props {
	page?: 'welcome' | 'heroes' | 'library' | 'playbook' | 'session';
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
}

export const AppFooter = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const navigation = useNavigation();

	return (
		<ErrorBoundary>
			<div className='app-footer'>
				{
					isSmall || !props.page ?
						<div />
						:
						<Segmented
							options={[
								{ value: 'welcome', icon: <img className='logo-icon' src={shield} /> },
								{ value: 'heroes', icon: <TeamOutlined />, label: 'Heroes' },
								{ value: 'library', icon: <BookOutlined />, label: 'Library' },
								{ value: 'playbook', icon: <ReadOutlined />, label: 'Playbook' },
								{ value: 'session', icon: <PlayCircleOutlined />, label: 'Session' }
							]}
							value={props.page}
							onChange={value => {
								switch (value) {
									case 'welcome':
										navigation.goToWelcome();
										break;
									case 'heroes':
										navigation.goToHeroList();
										break;
									case 'library':
										navigation.goToLibraryList('ancestry');
										break;
									case 'playbook':
										navigation.goToPlaybookList('adventure');
										break;
									case 'session':
										navigation.goToSession();
										break;
								}
							}}
						/>
				}
				<div className='action-buttons-panel'>
					<Button onClick={props.showReference}>Reference</Button>
					<Button onClick={props.showRoll}>Roll</Button>
					<Button onClick={props.showAbout}>About</Button>
				</div>
			</div>
		</ErrorBoundary>
	);
};
