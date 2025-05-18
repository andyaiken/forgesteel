import { Button, Input, Popover, Tabs, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusOutlined, SearchOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Collections } from '../../../../utils/collections';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Hero } from '../../../../models/hero';
import { HeroData } from '../../../../data/hero-data';
import { HeroInfo } from '../../../controls/token/token';
import { HeroLogic } from '../../../../logic/hero-logic';
import { HeroPanel } from '../../../panels/hero/hero-panel';
import { Options } from '../../../../models/options';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './hero-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	addHero: (folder: string) => void;
	importHero: (hero: Hero, folder: string) => void;
	showParty: (folder: string) => void;
}

export const HeroListPage = (props: Props) => {
	const navigation = useNavigation();
	const { folder } = useParams<{ folder: string }>();
	const [ previousTab, setPreviousTab ] = useState<string | undefined>(folder);
	const [ currentTab, setCurrentTab ] = useState<string>(folder ?? '');
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	if (folder !== previousTab) {
		setCurrentTab(folder ?? '');
		setPreviousTab(folder);
	}

	const folders = Collections.distinct(props.heroes.map(h => h.folder).sort(), f => f);
	if (folders.length === 0) {
		folders.push('');
	}

	const getHeroes = (folder: string) => {
		return props.heroes
			.filter(h => h.folder === folder)
			.filter(h => Utils.textMatches([
				h.name,
				h.ancestry?.name || '',
				h.culture?.name || '',
				h.career?.name || '',
				h.class?.name || '',
				h.complication?.name || ''
			], searchTerm));
	};

	const getHeroesSection = (list: Hero[]) => {
		if (list.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='hero-section-row'>
				{
					list.map(hero => (
						<SelectablePanel key={hero.id} onSelect={() => navigation.goToHeroView(hero.id)}>
							<HeroPanel hero={hero} sourcebooks={props.sourcebooks} options={props.options} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	try {

		const exampleHeroes = [
			HeroData.dwarfFury,
			HeroData.highElfTactician,
			HeroData.humanCensor,
			HeroData.humanNull,
			HeroData.humanTalent,
			HeroData.orcConduit,
			HeroData.polderElementalist,
			HeroData.polderShadow,
			HeroData.wodeElfTroubadour
		];

		return (
			<ErrorBoundary>
				<div className='hero-list-page'>
					<AppHeader subheader='Heroes' showDirectory={props.showDirectory}>
						<Input
							name='search'
							placeholder='Search'
							allowClear={true}
							value={searchTerm}
							suffix={<SearchOutlined />}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<div className='divider' />
						<Popover
							trigger='click'
							content={(
								<div style={{ width: '500px' }}>
									<Button type='primary' block={true} icon={<PlusOutlined />} onClick={() => props.addHero(currentTab)}>
										Create a New Hero
									</Button>
									<div className='ds-text centered-text'>or</div>
									<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
										<Button block={true} icon={<ThunderboltOutlined />} onClick={() => props.importHero(HeroLogic.createRandomHero(), currentTab)}>
											Generate a Random Hero
										</Button>
										<Upload
											style={{ width: '100%' }}
											accept='.drawsteel-hero'
											showUploadList={false}
											beforeUpload={file => {
												file
													.text()
													.then(json => {
														const hero = (JSON.parse(json) as Hero);
														props.importHero(hero, currentTab);
													});
												return false;
											}}
										>
											<Button block={true} icon={<DownloadOutlined />}>
												Import a Hero File
											</Button>
										</Upload>
									</div>
									<div className='ds-text centered-text'>or start with a premade example:</div>
									<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
										{
											exampleHeroes.map(h => (
												<Button key={h.id} className='container-button' block={true} onClick={() => props.importHero(h, currentTab)}>
													<HeroInfo hero={h} />
												</Button>
											))
										}
									</div>
								</div>
							)}
						>
							<Button type='primary'>
								Add
								<DownOutlined />
							</Button>
						</Popover>
						{
							getHeroes(currentTab).length > 1 ?
								<>
									<div className='divider' />
									<Button onClick={() => props.showParty(currentTab)}>
										Party Overview
									</Button>
								</>
								: null
						}
					</AppHeader>
					<div className='hero-list-page-content'>
						<Tabs
							activeKey={currentTab}
							items={folders.map(f => ({
								key: f,
								label: (
									<div className='section-header'>
										<div className='section-title'>{f || 'Heroes'}</div>
										<div className='section-count'>{getHeroes(f).length}</div>
									</div>
								),
								children: getHeroesSection(getHeroes(f))
							}))}
							onChange={navigation.goToHeroList}
						/>
					</div>
					<AppFooter page='heroes' showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
