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
							<Carousel autoplay={{ dotDuration: true }} autoplaySpeed={8000}>
								<div className='carousel-page'>
									<HeaderText
										extra={<Button type='primary' icon={<TeamOutlined />} onClick={() => navigation.goToHeroList()}>Heroes</Button>}
									>
										For Players
									</HeaderText>
									<div className='ds-text'>
										In the <b>HEROES</b> section you can create characters for <b>DRAW STEEL</b>.
									</div>
									<ul>
										<li>
											All the official content is included (for levels 1 to 3), and you can also use any homebrew content your director has created.
										</li>
										<li>
											You can use the app to track your hero's stamina, conditions, surges, etc.
										</li>
										<li>
											If you're playing offline, you can export your heroes in PNG or PDF formats.
										</li>
									</ul>
								</div>
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
										In your <b>PLAYBOOK</b>, you can build encounters, ensuring that they're perfectly balanced for your heroes, and craft negotiations and montage tests.
									</div>
									<div className='ds-text'>
										You can also create detailed tactical maps for your heroes to explore.
									</div>
									<div className='ds-text'>
										You can then combine all these into an adventure.
									</div>
									<div className='ds-text'>
										In the <b>SESSION</b> screen, you can run your encounters, montages, and negotiations.
									</div>
								</div>
								<div className='carousel-page'>
									<HeaderText
										extra={<Button type='primary' icon={<BookOutlined />} onClick={() => navigation.goToLibraryList('ancestry')}>Library</Button>}
									>
										For Content Creators
									</HeaderText>
									<div className='ds-text'>
										In the <b>LIBRARY</b>, you can browse the collections of ancestries, classes, kits - all of the elements you need to build a hero - and other useful elements like monsters and terrain objects.
									</div>
									<div className='ds-text'>
										You can use these as a base from which to design your own homebrew elements, or create them from whole cloth.
									</div>
								</div>
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
