import { BookOutlined, PlayCircleOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Popover, Space } from 'antd';
import { Collections } from '../../../utils/collections';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Hero } from '../../../models/hero';
import { useMediaQuery } from '../../../hooks/use-media-query';
import { useNavigation } from '../../../hooks/use-navigation';

import './app-footer.scss';

import shield from './../../../assets/shield.png';

interface Props {
	page: 'welcome' | 'heroes' | 'library' | 'playbook' | 'session' | 'player-view';
	heroes: Hero[];
	showSourcebooks: () => void;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
}

export const AppFooter = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const navigation = useNavigation();

	try {
		const getNavigation = () => {
			const folders = Collections.distinct(props.heroes.map(h => h.folder), f => f).sort();
			if (folders.length === 0) {
				folders.push('');
			}

			return (
				<Flex className='navigation-buttons-panel' align='center'>
					<Button type='text' className={props.page === 'welcome' ? 'selected' : ''} icon={<img className='logo-icon' src={shield} />} onClick={() => navigation.goToWelcome()} />
					<Divider type='vertical' />
					{
						folders.length > 1 ?
							<Popover
								trigger='click'
								content={
									<Space direction='vertical'>
										{
											folders.map((f, n) => (
												<Button key={n} type='text' block={true} onClick={() => navigation.goToHeroList(f)}>{f || 'Heroes'}</Button>
											))
										}
									</Space>
								}
							>
								<Button type='text' className={props.page === 'heroes' ? 'selected' : ''} icon={<TeamOutlined />}>
									Heroes
								</Button>
							</Popover>
							:
							<Button type='text' className={props.page === 'heroes' ? 'selected' : ''} icon={<TeamOutlined />} onClick={() => navigation.goToHeroList(folders[0])}>
								Heroes
							</Button>
					}
					<Divider type='vertical' />
					<Popover
						trigger='click'
						content={
							<div>
								<Space direction='vertical' style={{ width: '350px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('ancestry')}>Ancestries</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('career')}>Careers</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('class')}>Classes</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('complication')}>Complications</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('culture')}>Cultures</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('domain')}>Domains</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('imbuement')}>Imbuements</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('item')}>Items</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('kit')}>Kits</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('monster-group')}>Monsters</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('perk')}>Perks</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('subclass')}>Subclasses</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('terrain')}>Terrain</Button>
									<Button type='text' block={true} onClick={() => navigation.goToLibraryList('title')}>Titles</Button>
								</Space>
								<Divider />
								<Button type='text' block={true} onClick={() => props.showSourcebooks()}>Sourcebooks</Button>
							</div>
						}
					>
						<Button type='text' className={props.page === 'library' ? 'selected' : ''} icon={<BookOutlined />}>
							Library
						</Button>
					</Popover>
					<Divider type='vertical' />
					<Popover
						trigger='click'
						content={
							<Space direction='vertical'>
								<Button type='text' block={true} onClick={() => navigation.goToPlaybookList('adventure')}>Adventures</Button>
								<Button type='text' block={true} onClick={() => navigation.goToPlaybookList('encounter')}>Encounters</Button>
								<Button type='text' block={true} onClick={() => navigation.goToPlaybookList('montage')}>Montages</Button>
								<Button type='text' block={true} onClick={() => navigation.goToPlaybookList('negotiation')}>Negotiations</Button>
								<Button type='text' block={true} onClick={() => navigation.goToPlaybookList('tactical-map')}>Tactical Maps</Button>
							</Space>
						}
					>
						<Button type='text' className={props.page === 'playbook' ? 'selected' : ''} icon={<ReadOutlined />}>
							Playbook
						</Button>
					</Popover>
					<Divider type='vertical' />
					<Button type='text' className={props.page === 'session' ? 'selected' : ''} icon={<PlayCircleOutlined />} onClick={() => navigation.goToSession()}>
						Session
					</Button>
				</Flex>
			);
		};

		return (
			<ErrorBoundary>
				<div className='app-footer'>
					{isSmall || (props.page === 'player-view') ? <div /> : getNavigation()}
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
