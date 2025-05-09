import { BookOutlined, PlayCircleOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Flex, Segmented } from 'antd';
import { AppFooter } from '../../panels/app-footer/app-footer';
import { AppHeader } from '../../panels/app-header/app-header';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { HeaderText } from '../../controls/header-text/header-text';
import { useNavigation } from '../../../hooks/use-navigation';
import { useState } from 'react';

import './welcome-page.scss';

interface Props {
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
}

export const WelcomePage = (props: Props) => {
	const navigation = useNavigation();
	const [ page, setPage ] = useState<'player' | 'director-prep' | 'director-run' | 'creator'>('player');

	const getContent = (type: 'player' | 'director-prep' | 'director-run' | 'creator') => {
		switch (type) {
			case 'player':
				return (
					<div className='welcome-section'>
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
								You can use the app to track your hero's stamina, conditions, surges, and so on.
							</li>
							<li>
								If you're playing offline, you can export your heroes in PNG or PDF formats (either portrait or landscape).
							</li>
							<li>
								Want something a little different? You can customize any of your abilities to make them more unique to your hero.
							</li>
							<li>
								Need to tweak your hero in a way that's not strictly by the book? No problem! You can customize your hero in any number of ways - an extra ability, bonuses to your characteristics, extra skills, retainers, etc.
							</li>
						</ul>
						<div className='ds-text'>
							In addition, you can quickly look up rules at any time using the Reference button at the bottom right of the screen.
						</div>
					</div>
				);
			case 'director-prep':
				return (
					<div className='welcome-section'>
						<HeaderText
							extra={<Button type='primary' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybookList('adventure')}>Playbook</Button>}
						>
							For Directors: Prep Time
						</HeaderText>
						<div className='ds-text'>
							In your <b>PLAYBOOK</b>, you can build anything you might need for your games:
						</div>
						<ul>
							<li>
								You can build <b>encounters</b>, ensuring that they're perfectly balanced for your heroes.
								Add monsters and terrain objects, and the app will automatically calculate the encounter's difficulty.
								You can specify the encounter objectives, or you can use one of the predefined options.
							</li>
							<li>
								You can build <b>montage tests</b> - or copy a predefined one - laying out all the options the players can take and how many times they can take them.
							</li>
							<li>
								You can build <b>negotiations</b> - or copy a predefined one - specifying all the motivations and pitfalls.
							</li>
							<li>
								You can also create detailed <b>tactical maps</b> for your heroes to explore, adding tiles and walls and overlays - or you can generate a random map of whatever size you need.
								You can use battlemap images for your maps - even animated maps!
							</li>
						</ul>
						<div className='ds-text'>
							All of these elements can be bundled together into an <b>adventure</b>.
						</div>
					</div>
				);
			case 'director-run':
				return (
					<div className='welcome-section'>
						<HeaderText
							extra={<Button type='primary' icon={<PlayCircleOutlined />} onClick={() => navigation.goToSession()}>Session</Button>}
						>
							For Directors: Game Time
						</HeaderText>
						<div className='ds-text'>
							In the <b>SESSION</b> screen, you can run your encounters, montages, negotiations, and maps.
						</div>
						<ul>
							<li>
								In an <b>encounter</b> you can see at a glance the current stamina and conditions of all your monsters (and heroes) and you can add a captain to your minions.
								When you start a round the app will automatically grant you the appropriate amount of malice.
								It lists all the ways in which you can spend malice, and it provides a cheat sheet for any triggered actions your monsters or terrain objects have.
							</li>
							<li>
								In a <b>montage</b> you can see which skills the heroes have used, and how many successes and failures they have accumulated.
							</li>
							<li>
								In a <b>negotiation</b> you can track the interest and negotiation stats, and see all the details for motivations and pitfalls.
							</li>
							<li>
								In a <b>tactical map</b> you can modify the fog of war and even edit the map on the fly.
							</li>
							<li>
								You can also create a <b>counter</b> that can count down (or up) to track time, alert levels, or anything else you might need.
							</li>
						</ul>
						<div className='ds-text'>
							Any of these elements can be shared with your players by opening the <b>player view</b>, a separate tab that you can share (using Discord etc).
						</div>
					</div>
				);
			case 'creator':
				return (
					<div className='welcome-section'>
						<HeaderText
							extra={<Button type='primary' icon={<BookOutlined />} onClick={() => navigation.goToLibraryList('ancestry')}>Library</Button>}
						>
							For Content Creators
						</HeaderText>
						<div className='ds-text'>
							In the <b>LIBRARY</b>, you can browse the collections of official <b>DRAW STEEL</b> content.
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
						<ul>
							<li>
								Want to quickly re-use an ability from an existing monster? You can do that with a click.
							</li>
							<li>
								Need to check how your monster compares to others of the same level? You can do that with a click.
							</li>
							<li>
								Want to create a monster that's a mashup of two or three existing monsters? You can do that with a click.
							</li>
						</ul>
					</div>
				);
		}
	};

	try {
		return (
			<ErrorBoundary>
				<div className='welcome-page'>
					<AppHeader showDirectory={props.showDirectory} />
					<div className='welcome-page-content'>
						<div className='welcome-column'>
							<HeaderText level={1}>Welcome to FORGE STEEL</HeaderText>
							<div className='ds-text'>
								<b>FORGE STEEL</b> is an app for <b>DRAW STEEL</b> players, directors, and content creators.
							</div>
							<Flex justify='center' style={{ margin: '15px 0 10px 0' }}>
								<Segmented
									options={[
										{
											value: 'player',
											label: (
												<div className='welcome-tab-button'>
													<div className='title'>Players</div>
												</div>
											)
										},
										{
											value: 'director-prep',
											label: (
												<div className='welcome-tab-button'>
													<div className='title'>Directors</div>
													<div className='subtitle'>Prep Time</div>
												</div>
											)
										},
										{
											value: 'director-run',
											label: (
												<div className='welcome-tab-button'>
													<div className='title'>Directors</div>
													<div className='subtitle'>Game Time</div>
												</div>
											)
										},
										{
											value: 'creator',
											label: (
												<div className='welcome-tab-button'>
													<div className='title'>Creators</div>
												</div>
											)
										}
									]}
									value={page}
									onChange={setPage}
								/>
							</Flex>
							{getContent(page)}
						</div>
					</div>
					<AppFooter page='welcome' showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
