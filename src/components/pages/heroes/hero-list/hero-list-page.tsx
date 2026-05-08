import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { Button, Divider, Space, Tabs, Upload } from 'antd';
import { DownloadOutlined, PlusOutlined, TeamOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Hero, HeroOverview } from '@/models/hero';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroOverviewPanel } from '@/components/panels/hero-overview/hero-overview-panel';
import { PregenData } from '@/data/pregen-data';
import { PregenInfo } from '@/components/panels/token/token';
import { PregenLogic } from '@/logic/pregen-logic';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useIsSmall } from '@/hooks/use-is-small';
import { useNavigation } from '@/hooks/use-navigation';
import { useOptions } from '@/contexts/data-context';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useTitle } from '@/hooks/use-title';

import './hero-list-page.scss';

interface Props {
	heroes: HeroOverview[];
	sourcebooks: Sourcebook[];
	params: FooterParams;
	addHero: (folder: string) => void;
	importHero: (hero: Hero, folder: string) => void;
	showParty: (folder: string) => void;
}

export const HeroListPage = (props: Props) => {
	const isSmall = useIsSmall();
	const navigation = useNavigation();
	const { folder } = useParams<{ folder: string }>();
	const [ previousTab, setPreviousTab ] = useState<string | undefined>(folder);
	const [ currentTab, setCurrentTab ] = useState<string>(folder ?? '');
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	useTitle('Heroes');
	const options = useOptions();

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
				h.ancestry || '',
				h.background || '',
				h.class || '',
				h.complication || ''
			], searchTerm));
	};

	const getHeroesSection = (list: HeroOverview[]) => {
		if (list.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='hero-section-row'>
				{
					list.map(hero => (
						<SelectablePanel key={hero.id} watermark={hero.picture || undefined} onSelect={() => navigation.goToHeroView(hero.id)}>
							<HeroOverviewPanel hero={hero} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	return (
		<ErrorBoundary>
			<div className='hero-list-page'>
				<AppHeader subheader='Heroes'>
					<ButtonGroup
						buttons={[
							{ type: 'control', control: <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> },
							{
								type: 'dropdown',
								label: isSmall ? undefined : 'Add',
								icon: <PlusOutlined />,
								primary: true,
								popover: (
									<Space orientation='vertical' style={{ width: '300px' }}>
										<Button type='primary' block={true} icon={<PlusOutlined />} onClick={() => props.addHero(currentTab)}>
											Create a New Hero
										</Button>
										<Divider />
										<Upload
											style={{ width: '100%' }}
											accept='.drawsteel-hero,.ds-hero'
											showUploadList={false}
											beforeUpload={file => {
												file
													.text()
													.then(json => {
														const hero = JSON.parse(json) as Hero;
														props.importHero(hero, currentTab);
													});
												return false;
											}}
										>
											<Button block={true} icon={<DownloadOutlined />}>
												Import a Hero File
											</Button>
										</Upload>
										<Button block={true} icon={<ThunderboltOutlined />} onClick={() => props.importHero(HeroLogic.createRandomHero(), currentTab)}>
											Generate a Random Hero
										</Button>
										<Expander title='Use a premade example'>
											<Space orientation='vertical' style={{ width: '100%', maxHeight: '220px', overflowY: 'auto' }}>
												{
													PregenData.getPregens().map(p => (
														<Button
															key={p.id}
															className='container-button'
															block={true}
															onClick={() => {
																const hero = PregenLogic.pregenToHero(p, props.sourcebooks, options);
																props.importHero(hero, currentTab);
															}}
														>
															<PregenInfo pregen={p} />
														</Button>
													))
												}
											</Space>
										</Expander>
									</Space>
								)
							},
							{ type: 'button', label: isSmall ? undefined : 'Party', icon: <TeamOutlined />, disabled: getHeroes(currentTab).length < 2, onClick: () => props.showParty(currentTab) }
						]}
					/>
				</AppHeader>
				<ErrorBoundary>
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
				</ErrorBoundary>
				<AppFooter
					page='heroes'
					params={props.params}
				/>
			</div>
		</ErrorBoundary>
	);
};
