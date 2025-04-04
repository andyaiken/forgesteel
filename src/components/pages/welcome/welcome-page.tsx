import { BookOutlined, PlayCircleOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Carousel } from 'antd';
import { AppHeader } from '../../panels/app-header/app-header';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { HeaderText } from '../../controls/header-text/header-text';
import { useNavigation } from '../../../hooks/use-navigation';

import './welcome-page.scss';

interface Props {
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showRules: () => void;
}

export const WelcomePage = (props: Props) => {
	const navigation = useNavigation();

	const getContent = (type: 'player' | 'director' | 'creator') => {
		switch (type) {
			case 'player':
				return (
					<div className='carousel-page'>
						<HeaderText
							extra={<Button type='primary' icon={<TeamOutlined />} onClick={() => navigation.goToHeroList()}>Heroes</Button>}
						>
							For Players
						</HeaderText>
						<div className='ds-text'>
							If you're a <b>DRAW STEEL</b> player, you've come to the right place.
						</div>
						<div className='ds-text'>
							In the <b>HEROES</b> screen you can easily create your characters; the hero builder leads you through the process step-by-step.
						</div>
						<ul>
							<li>
								All the official content is included (for levels 1 to 3), and you can also use any homebrew content your director has created.
							</li>
							<li>
								You can use the app to track your hero's stamina, conditions, surges, etc.
							</li>
							<li>
								If you're playing offline, you can export your heroes in PNG or PDF formats (either portrait or landscape).
							</li>
						</ul>
					</div>
				);
			case 'director':
				return (
					<div className='carousel-page'>
						<HeaderText
							extra={
								<div style={{ display: 'flex', gap: '5px' }}>
									<Button type='primary' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybookList('adventure')}>Playbook</Button>
									<Button icon={<PlayCircleOutlined />} onClick={() => navigation.goToSession()}>Session</Button>
								</div>
							}
						>
							For Directors
						</HeaderText>
						<div className='ds-text'>
							In your <b>PLAYBOOK</b>, you can build anything you might need for your games:
						</div>
						<ul>
							<li>
								You can build <b>encounters</b>, ensuring that they're perfectly balanced for your heroes.
							</li>
							<li>
								You can build <b>negotiations</b> and <b>montage tests</b> - or copy a predefined one - making them as simple or as complex as you need.
							</li>
							<li>
								You can also create detailed <b>tactical maps</b> for your heroes to explore.
							</li>
						</ul>
						<div className='ds-text'>
							You can then combine all these into an adventure.
						</div>
						<div className='ds-text'>
							In the <b>SESSION</b> screen, you can run your encounters, montages, negotiations, and maps.
						</div>
					</div>
				);
			case 'creator':
				return (
					<div className='carousel-page'>
						<HeaderText
							extra={<Button type='primary' icon={<BookOutlined />} onClick={() => navigation.goToLibraryList('ancestry')}>Library</Button>}
						>
							For Content Creators
						</HeaderText>
						<div className='ds-text'>
							In the <b>LIBRARY</b>, you can browse the collections of official content.
						</div>
						<ul>
							<li>
								For heroes: ancestries, careers, classes, complications, cultures, domains, kits, perks, titles
							</li>
							<li>
								For directors: magic items, monsters, terrain objects
							</li>
						</ul>
						<div className='ds-text'>
							When you're creating your own homebrew content, you can create a copy of an existing element and modify it to suit your needs, or you can create it from scratch.
						</div>
						<div className='ds-text'>
							If you're creating a monster, <b>FORGE STEEL</b> provides lots of extra tools so you can build exactly the monster you're imagining, and gauge exactly how much of a challenge it will be.
						</div>
					</div>
				);
		}
	};

	try {
		return (
			<ErrorBoundary>
				<div className='welcome-page'>
					<AppHeader showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll} showRules={props.showRules} />
					<div className='welcome-page-content'>
						<div className='welcome-column'>
							<HeaderText level={1}>Welcome to FORGE STEEL</HeaderText>
							<div className='ds-text'>
								<b>FORGE STEEL</b> is an app for <b>DRAW STEEL</b> players, directors, and content creators.
							</div>
							<Carousel autoplay={{ dotDuration: true }} autoplaySpeed={10 * 1000}>
								{getContent('player')}
								{getContent('director')}
								{getContent('creator')}
							</Carousel>
						</div>
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
