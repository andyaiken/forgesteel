import { BookOutlined, DoubleLeftOutlined, DoubleRightOutlined, PlayCircleOutlined, PlusOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Flex, Segmented } from 'antd';
import { AppFooter } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Tip } from '@/models/tip';
import { TipData } from '@/data/tip-data';
import { TipPanel } from '@/components/panels/tip/tip-panel';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useNavigation } from '@/hooks/use-navigation';
import { useState } from 'react';

import pbds from '@/assets/powered-by-draw-steel.png';

import './welcome-page.scss';
import { Trans, useTranslation } from 'react-i18next';

type WelcomeType = 'player' | 'director-prep' | 'director-run' | 'creator';

interface Props {
	highlightAbout: boolean;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
	showSettings: () => void;
	onNewHero: () => void;
	onNewEncounter: () => void;
}

export const WelcomePage = (props: Props) => {
	const { t, i18n } = useTranslation([ 'common', 'welcomePage' ]);
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const [ page, setPage ] = useState<WelcomeType>('player');
	const [ tips ] = useState<Tip[]>(Collections.shuffle(TipData.getTips()));
	const [ tipIndex, setTipIndex ] = useState<number>(0);

	const prevTip = () => {
		const index = tipIndex - 1;
		setTipIndex(Math.max(index, 0));
	};

	const nextTip = () => {
		const index = tipIndex + 1;
		setTipIndex(Math.min(index, tips.length - 1));
	};

	if (isSmall) {
		return (
			<ErrorBoundary name='welcome-page'>
				<div className='welcome-page'>
					<AppHeader />
					<ErrorBoundary>
						<div className='welcome-page-content compact'>
							<div className='welcome-column'>
								<div className='ds-text centered-text'>
									<Trans
										i18n={i18n}
										ns='welcomePage'
										i18nKey='welcomePage:description'
										components={{ b: <b /> }}
										defaults='<b>FORGE STEEL</b> is an app for <b>DRAW STEEL</b> players, directors, and content creators.'
									/>
								</div>
								<Segmented
									style={{ margin: '15px 0' }}
									block={true}
									options={[
										{
											value: 'player',
											label: (
												<div className='welcome-tab-button'>
													<div className='title'>{t('Players')}</div>
												</div>
											)
										},
										{
											value: 'director-prep',
											label: (
												<div className='welcome-tab-button'>
													<div className='title'>{t('Directors')}</div>
													<div className='subtitle'>{t('Prep Time')}</div>
												</div>
											)
										},
										{
											value: 'director-run',
											label: (
												<div className='welcome-tab-button'>
													<div className='title'>{t('Directors')}</div>
													<div className='subtitle'>{t('Game Time')}</div>
												</div>
											)
										},
										{
											value: 'creator',
											label: (
												<div className='welcome-tab-button'>
													<div className='title'>{t('Creators')}</div>
												</div>
											)
										}
									]}
									value={page}
									onChange={setPage}
								/>
								<SelectablePanel>
									<WelcomeContent
										type={page}
									/>
									<WelcomeButtons
										type={page}
										onNewHero={props.onNewHero}
										onNewEncounter={props.onNewEncounter}
									/>
								</SelectablePanel>
							</div>
						</div>
					</ErrorBoundary>
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
	}

	return (
		<ErrorBoundary name='welcome-page'>
			<div className='welcome-page'>
				<AppHeader
					children={
						<div className='logo-container'>
							<img src={pbds} />
						</div>
					}
				/>
				<ErrorBoundary>
					<div className='welcome-page-content'>
						<div className='welcome-column'>
							<div className='ds-text centered-text'>
								<Trans
									i18n={i18n}
									ns='welcomePage'
									i18nKey='welcomePage:description'
									components={{ b: <b /> }}
									defaults='<b>FORGE STEEL</b> is an app for <b>DRAW STEEL</b> players, directors, and content creators.'
								/>
							</div>
							<Segmented
								style={{ margin: '15px 0' }}
								block={true}
								options={[
									{
										value: 'player',
										label: (
											<div className='welcome-tab-button'>
												<div className='title'>{t('Players')}</div>
											</div>
										)
									},
									{
										value: 'director-prep',
										label: (
											<div className='welcome-tab-button'>
												<div className='title'>{t('Directors')}</div>
												<div className='subtitle'>{t('Prep Time')}</div>
											</div>
										)
									},
									{
										value: 'director-run',
										label: (
											<div className='welcome-tab-button'>
												<div className='title'>{t('Directors')}</div>
												<div className='subtitle'>{t('Game Time')}</div>
											</div>
										)
									},
									{
										value: 'creator',
										label: (
											<div className='welcome-tab-button'>
												<div className='title'>{t('Creators')}</div>
											</div>
										)
									}
								]}
								value={page}
								onChange={setPage}
							/>
							<SelectablePanel>
								<WelcomeContent
									type={page}
								/>
								<WelcomeButtons
									type={page}
									onNewHero={props.onNewHero}
									onNewEncounter={props.onNewEncounter}
								/>
							</SelectablePanel>
						</div>
						<div className='tip-column'>
							<Flex justify='space-evenly'>
								<Button disabled={tipIndex === 0} onClick={prevTip}>
									<DoubleLeftOutlined />
									{t('Prev Tip', { ns: 'welcomePage' })}
								</Button>
								<Button disabled={tipIndex === tips.length - 1} onClick={nextTip}>
									{t('Next Tip', { ns: 'welcomePage' })}
									<DoubleRightOutlined />
								</Button>
							</Flex>
							<TipPanel tip={tips[tipIndex]} />
						</div>
					</div>
				</ErrorBoundary>
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

interface WelcomeContentProps {
	type: WelcomeType;
}

const WelcomeContent = (props: WelcomeContentProps) => {
	const { t, i18n } = useTranslation([ 'common', 'welcomePage' ]);
	switch (props.type) {
		case 'player':
			return (
				<div className='welcome-section'>
					<HeaderText>
						{t('For Players', { ns: 'welcomePage' })}
					</HeaderText>
					<div className='ds-text'>
						<Trans
							i18n={i18n}
							i18nKey='welcomePage:theRightPlace'
							components={{ b: <b /> }}
							defaults="If you're a <b>DRAW STEEL</b> player, you've come to the right place."
						/>
					</div>
					<div className='ds-text'>
						<Trans
							i18n={i18n}
							i18nKey='welcomePage:heroesScreenDescription'
							components={{ b: <b /> }}
							defaults='In the <b>HEROES</b> screen you can easily create your characters; the hero builder leads you through the process step-by-step.'
						/>
					</div>
					<ul>
						<li>
							{t('welcomePage:includedContent')}
						</li>
						<li>
							{t('welcomePage:heroesTracking')}
						</li>
						<li>
							{t('welcomePage:offlinePlay')}
						</li>
						<li>
							{t('welcomePage:customizeAbilities')}
						</li>
						<li>
							{t('welcomePage:heroCustomization')}
						</li>
					</ul>
					<div className='ds-text'>
						<Trans
							i18n={i18n}
							ns='welcomePage'
							i18nKey='rulesLookup'
							defaults='In addition, you can quickly look up rules at any time using the Reference button at the bottom right of the screen.'
						/>
					</div>
				</div>
			);
		case 'director-prep':
			return (
				<div className='welcome-section'>
					<HeaderText>
						For Directors: Prep Time
					</HeaderText>
					<div className='ds-text'>
						In your <b>PLAYBOOK</b>, you can build anything you might need for your games:
					</div>
					<ul>
						<li>
							You can build <b>encounters</b>, ensuring that they're perfectly balanced for your heroes.
							Add monsters and terrain objects, and the app will automatically calculate the encounter's difficulty - or let the app generate a random encounter for you.
							You can specify the encounter's objectives, or you can use one of the predefined options.
						</li>
						<li>
							You can build <b>montage tests</b>, laying out all the options the players can take and how many times they can take them.
						</li>
						<li>
							You can build <b>negotiations</b>, specifying motivations, pitfalls, and outcomes.
						</li>
						<li>
							You can choose from a set of predefined encounters, montages, and negotiations - or use them as a starting point for your own creations.
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
					<HeaderText>
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
					<HeaderText>
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

interface WelcomeButtonsProps {
	type: WelcomeType;
	onNewHero: () => void;
	onNewEncounter: () => void;
}

const WelcomeButtons = (props: WelcomeButtonsProps) => {
	const navigation = useNavigation();

	switch (props.type) {
		case 'player':
			return (
				<div className='welcome-buttons'>
					<Flex align='center' justify='center' gap={10}>
						<Button type='primary' icon={<TeamOutlined />} onClick={() => navigation.goToHeroList()}>Heroes</Button>
						<Button icon={<PlusOutlined />} onClick={props.onNewHero}>New Hero</Button>
					</Flex>
				</div>
			);
		case 'director-prep':
			return (
				<div className='welcome-buttons'>
					<Flex align='center' justify='center' gap={10}>
						<Button type='primary' icon={<ReadOutlined />} onClick={() => navigation.goToPlaybook('adventure')}>Playbook</Button>
						<Button icon={<PlusOutlined />} onClick={props.onNewEncounter}>New Encounter</Button>
					</Flex>
				</div>
			);
		case 'director-run':
			return (
				<div className='welcome-buttons'>
					<Flex align='center' justify='center' gap={10}>
						<Button type='primary' icon={<PlayCircleOutlined />} onClick={() => navigation.goToSession()}>Session</Button>
					</Flex>
				</div>
			);
		case 'creator':
			return (
				<div className='welcome-buttons'>
					<Flex align='center' justify='center' gap={10}>
						<Button type='primary' icon={<BookOutlined />} onClick={() => navigation.goToLibrary('ancestry')}>Library</Button>
					</Flex>
				</div>
			);
	}
};
