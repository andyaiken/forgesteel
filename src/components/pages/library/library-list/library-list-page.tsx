import { Badge, Button, Divider, Input, Popover, Select, Space, Tabs, Upload } from 'antd';
import { BookOutlined, DownloadOutlined, PlusOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { HistogramPanel, HistogramTextPanel } from '../../../panels/histogram/histogram-panel';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Sourcebook, SourcebookElementKind } from '../../../../models/sourcebook';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerPanel } from '../../../panels/elements/career-panel/career-panel';
import { ClassPanel } from '../../../panels/elements/class-panel/class-panel';
import { Collections } from '../../../../utils/collections';
import { Complication } from '../../../../models/complication';
import { ComplicationPanel } from '../../../panels/elements/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/elements/culture-panel/culture-panel';
import { Domain } from '../../../../models/domain';
import { DomainPanel } from '../../../panels/elements/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { MonsterFilter } from '../../../../models/filter';
import { MonsterFilterPanel } from '../../../panels/monster-filter/monster-filter-panel';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Terrain } from '../../../../models/terrain';
import { TerrainPanel } from '../../../panels/elements/terrain-panel/terrain-panel';
import { Title } from '../../../../models/title';
import { TitlePanel } from '../../../panels/elements/title-panel/title-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './library-list-page.scss';

interface Props {
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	hiddenSourcebookIDs: string[];
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showRules: () => void;
	setOptions: (options: Options) => void;
 	showSourcebooks: () => void;
	createElement: (kind: SourcebookElementKind, sourcebookID: string | null) => void;
	importElement: (kind: SourcebookElementKind, sourcebookID: string | null, element: Element) => void;
}

export const LibraryListPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind } = useParams<{ kind: SourcebookElementKind }>();
	const [ previousTab, setPreviousTab ] = useState<SourcebookElementKind | undefined>(kind);
	const [ currentTab, setCurrentTab ] = useState<SourcebookElementKind>(kind ?? 'ancestry');
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ sourcebookID, setSourcebookID ] = useState<string | null>(props.sourcebooks.filter(cs => cs.isHomebrew).length > 0 ? props.sourcebooks.filter(cs => cs.isHomebrew)[0].id : null);
	const [ monsterFilter, setMonsterFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter(1, 10));

	if (kind !== previousTab) {
		setCurrentTab(kind ?? 'ancestry');
		setPreviousTab(kind);
	}

	const getSourcebooks = () => {
		return props.sourcebooks.filter(cs => !props.hiddenSourcebookIDs.includes(cs.id));
	};

	const createElement = () => {
		props.createElement(currentTab, sourcebookID);
	};

	const getAncestries = () => {
		try {
			return SourcebookLogic
				.getAncestries(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.features.map(f => f.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getCultures = () => {
		try {
			return SourcebookLogic
				.getCultures(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getCareers = () => {
		try {
			return SourcebookLogic
				.getCareers(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.features.map(f => f.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getClasses = () => {
		try {
			return SourcebookLogic
				.getClasses(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name)),
					...item.abilities.flatMap(a => a.name),
					...item.subclasses.map(sc => sc.name),
					...item.subclasses.flatMap(sc => sc.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name)))
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getComplications = () => {
		try {
			return SourcebookLogic
				.getComplications(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getDomains = () => {
		try {
			return SourcebookLogic
				.getDomains(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name))
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getKits = () => {
		try {
			return SourcebookLogic
				.getKits(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.features.map(f => f.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getPerks = () => {
		try {
			return SourcebookLogic
				.getPerks(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getTitles = () => {
		try {
			return SourcebookLogic
				.getTitles(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.features.map(f => f.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getItems = () => {
		try {
			return SourcebookLogic
				.getItems(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.keywords,
					...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name))
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getMonsterGroups = () => {
		try {
			return SourcebookLogic
				.getMonsterGroups(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.monsters.map(m => m.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getMonsters = () => {
		try {
			return SourcebookLogic
				.getMonsterGroups(getSourcebooks())
				.flatMap(mg => mg.monsters)
				.filter(m => MonsterLogic.matches(m, monsterFilter))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getTerrains = () => {
		try {
			return SourcebookLogic
				.getTerrains(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getAncestriesSection = (list: Ancestry[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(a => {
							const item = (
								<SelectablePanel key={a.id} onSelect={() => navigation.goToLibraryView('ancestry', a.id)}>
									<AncestryPanel ancestry={a} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getAncestrySourcebook(props.sourcebooks, a);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={a.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getCulturesSection = (list: Culture[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(c => {
							const item = (
								<SelectablePanel key={c.id} onSelect={() => navigation.goToLibraryView('culture', c.id)}>
									<CulturePanel culture={c} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getCultureSourcebook(props.sourcebooks, c);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={c.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getCareersSection = (list: Career[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(c => {
							const item = (
								<SelectablePanel key={c.id} onSelect={() => navigation.goToLibraryView('career', c.id)}>
									<CareerPanel career={c} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getCareerSourcebook(props.sourcebooks, c);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={c.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getClassesSection = (list: HeroClass[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(c => {

							const item = (
								<SelectablePanel key={c.id} onSelect={() => navigation.goToLibraryView('class', c.id)}>
									<ClassPanel heroClass={c} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getClassSourcebook(props.sourcebooks, c);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={c.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getComplicationsSection = (list: Complication[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(c => {
							const item = (
								<SelectablePanel key={c.id} onSelect={() => navigation.goToLibraryView('complication', c.id)}>
									<ComplicationPanel complication={c} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getComplicationSourcebook(props.sourcebooks, c);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={c.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getDomainsSection = (list: Domain[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(d => {
							const item = (
								<SelectablePanel key={d.id} onSelect={() => navigation.goToLibraryView('domain', d.id)}>
									<DomainPanel domain={d} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getDomainSourcebook(props.sourcebooks, d);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={d.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getKitsSection = (list: Kit[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(k => {
							const item = (
								<SelectablePanel key={k.id} onSelect={() => navigation.goToLibraryView('kit', k.id)}>
									<KitPanel kit={k} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getKitSourcebook(props.sourcebooks, k);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={k.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getPerksSection = (list: Perk[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(p => {
							const item = (
								<SelectablePanel key={p.id} onSelect={() => navigation.goToLibraryView('perk', p.id)}>
									<PerkPanel perk={p} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getPerkSourcebook(props.sourcebooks, p);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={p.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getTitlesSection = (list: Title[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(t => {
							const item = (
								<SelectablePanel key={t.id} onSelect={() => navigation.goToLibraryView('title', t.id)}>
									<TitlePanel title={t} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getTitleSourcebook(props.sourcebooks, t);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={t.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getItemsSection = (list: Item[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(i => {
							const item = (
								<SelectablePanel key={i.id} onSelect={() => navigation.goToLibraryView('item', i.id)}>
									<ItemPanel item={i} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getItemSourcebook(props.sourcebooks, i);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={i.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getMonsterGroupsSection = (list: MonsterGroup[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<div className='library-section-row'>
						{
							list.map(mg => {
								const item = (
									<SelectablePanel key={mg.id} onSelect={() => navigation.goToLibraryView('monster-group', mg.id)}>
										<MonsterGroupPanel monsterGroup={mg} options={props.options} />
									</SelectablePanel>
								);

								const sourcebook = SourcebookLogic.getMonsterGroupSourcebook(props.sourcebooks, mg);
								if (sourcebook && sourcebook.id) {
									return (
										<Badge.Ribbon key={mg.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
											{item}
										</Badge.Ribbon>
									);
								}

								return item;
							})
						}
					</div>
				</Space>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getMonstersSection = (list: Monster[]) => {
		try {
			const tools = (
				<>
					<Expander title='Filter'>
						<HeaderText>Monster Filter</HeaderText>
						<MonsterFilterPanel
							monsterFilter={monsterFilter}
							monsters={props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(g => g.monsters)}
							onChange={setMonsterFilter}
						/>
					</Expander>
					<Expander title='Demographics'>
						<HeaderText>By Level</HeaderText>
						<HistogramPanel values={list.map(m => m.level)} />
						<HeaderText>By Organization</HeaderText>
						<HistogramTextPanel values={list.map(m => m.role.organization)} />
						<HeaderText>By Role</HeaderText>
						<HistogramTextPanel values={list.map(m => m.role.type)} />
					</Expander>
				</>
			);

			if (list.length === 0) {
				return (
					<Space direction='vertical' style={{ width: '100%' }}>
						{tools}
						<Divider />
						<Empty />
					</Space>
				);
			}

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{tools}
					<Divider />
					<div className='library-section-row'>
						{
							list.map(m => {
								const mg = SourcebookLogic.getMonsterGroup(props.sourcebooks, m.id) as MonsterGroup;

								const item = (
									<SelectablePanel key={m.id} onSelect={() => navigation.goToLibraryView('monster-group', mg.id, m.id)}>
										<MonsterPanel monster={m} monsterGroup={mg} options={props.options} />
									</SelectablePanel>
								);

								const sourcebook = SourcebookLogic.getMonsterGroupSourcebook(props.sourcebooks, mg);
								if (sourcebook && sourcebook.id) {
									return (
										<Badge.Ribbon key={mg.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
											{item}
										</Badge.Ribbon>
									);
								}

								return item;
							})
						}
					</div>
				</Space>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	const getTerrainsSection = (list: Terrain[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			return (
				<div className='library-section-row'>
					{
						list.map(t => {
							const item = (
								<SelectablePanel key={t.id} onSelect={() => navigation.goToLibraryView('terrain', t.id)}>
									<TerrainPanel terrain={t} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getTerrainSourcebook(props.sourcebooks, t);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={t.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
										{item}
									</Badge.Ribbon>
								);
							}

							return item;
						})
					}
				</div>
			);
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	try {
		const sourcebookOptions = props.sourcebooks
			.filter(cs => cs.isHomebrew)
			.map(cs => ({ label: cs.name || 'Unnamed Sourcebook', value: cs.id }));

		const ancestries = getAncestries();
		const cultures = getCultures();
		const careers = getCareers();
		const classes = getClasses();
		const complications = getComplications();
		const domains = getDomains();
		const kits = getKits();
		const perks = getPerks();
		const titles = getTitles();
		const items = getItems();
		const monsterGroups = getMonsterGroups();
		const monsters = Collections.sort(getMonsters(), m => m.name);
		const terrains = getTerrains();

		return (
			<ErrorBoundary>
				<div className='library-list-page'>
					<AppHeader subheader='Library' showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll} showRules={props.showRules}>
						<Input
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
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									{
										sourcebookOptions.length > 1 ?
											<div>
												<div className='ds-text'>Where do you want it to live?</div>
												<Select
													style={{ width: '100%' }}
													placeholder='Select'
													options={sourcebookOptions}
													optionRender={option => <div className='ds-text'>{option.data.label}</div>}
													value={sourcebookID}
													onChange={setSourcebookID}
												/>
											</div>
											: null
									}
									{sourcebookOptions.length > 1 ? <Divider /> : null}
									<Space>
										<Button type='primary' block={true} icon={<PlusOutlined />} onClick={createElement}>Create</Button>
										<div className='ds-text'>or</div>
										<Upload
											style={{ width: '100%' }}
											accept={`.drawsteel-${currentTab.toLowerCase()}`}
											showUploadList={false}
											beforeUpload={file => {
												file
													.text()
													.then(json => {
														const e = (JSON.parse(json) as Element);
														props.importElement(currentTab, sourcebookID, e);
													});
												return false;
											}}
										>
											<Button block={true} icon={<DownloadOutlined />}>Import</Button>
										</Upload>
									</Space>
								</div>
							)}
						>
							<Button type='primary' icon={<PlusOutlined />}>
								Add
							</Button>
						</Popover>
						<div className='divider' />
						<Button icon={<BookOutlined />} onClick={props.showSourcebooks}>
							Sourcebooks
						</Button>
						<Popover
							trigger='click'
							content={<OptionsPanel mode='library' options={props.options}heroes={props.heroes} setOptions={props.setOptions} />}
						>
							<Button icon={<SettingOutlined />}>
								Options
							</Button>
						</Popover>
					</AppHeader>
					<div className='library-list-page-content'>
						<Tabs
							activeKey={currentTab}
							items={[
								{
									key: 'ancestry',
									label: (
										<div className='section-header'>
											<div className='section-title'>Ancestries</div>
											<div className='section-count'>{ancestries.length}</div>
										</div>
									),
									children: getAncestriesSection(ancestries)
								},
								{
									key: 'career',
									label: (
										<div className='section-header'>
											<div className='section-title'>Careers</div>
											<div className='section-count'>{careers.length}</div>
										</div>
									),
									children: getCareersSection(careers)
								},
								{
									key: 'class',
									label: (
										<div className='section-header'>
											<div className='section-title'>Classes</div>
											<div className='section-count'>{classes.length}</div>
										</div>
									),
									children: getClassesSection(classes)
								},
								{
									key: 'complication',
									label: (
										<div className='section-header'>
											<div className='section-title'>Complications</div>
											<div className='section-count'>{complications.length}</div>
										</div>
									),
									children: getComplicationsSection(complications)
								},
								{
									key: 'culture',
									label: (
										<div className='section-header'>
											<div className='section-title'>Cultures</div>
											<div className='section-count'>{cultures.length}</div>
										</div>
									),
									children: getCulturesSection(cultures)
								},
								{
									key: 'domain',
									label: (
										<div className='section-header'>
											<div className='section-title'>Domains</div>
											<div className='section-count'>{domains.length}</div>
										</div>
									),
									children: getDomainsSection(domains)
								},
								{
									key: 'item',
									label: (
										<div className='section-header'>
											<div className='section-title'>Items</div>
											<div className='section-count'>{items.length}</div>
										</div>
									),
									children: getItemsSection(items)
								},
								{
									key: 'kit',
									label: (
										<div className='section-header'>
											<div className='section-title'>Kits</div>
											<div className='section-count'>{kits.length}</div>
										</div>
									),
									children: getKitsSection(kits)
								},
								{
									key: 'monster-group',
									label: (
										<div className='section-header'>
											<div className='section-title'>Monsters</div>
											<div className='section-count'>{props.options.showMonstersInGroups ? monsterGroups.length : monsters.length}</div>
										</div>
									),
									children: props.options.showMonstersInGroups ? getMonsterGroupsSection(monsterGroups) : getMonstersSection(monsters)
								},
								{
									key: 'perk',
									label: (
										<div className='section-header'>
											<div className='section-title'>Perks</div>
											<div className='section-count'>{perks.length}</div>
										</div>
									),
									children: getPerksSection(perks)
								},
								{
									key: 'terrain',
									label: (
										<div className='section-header'>
											<div className='section-title'>Terrain</div>
											<div className='section-count'>{terrains.length}</div>
										</div>
									),
									children: getTerrainsSection(terrains)
								},
								{
									key: 'title',
									label: (
										<div className='section-header'>
											<div className='section-title'>Titles</div>
											<div className='section-count'>{titles.length}</div>
										</div>
									),
									children: getTitlesSection(titles)
								}
							]}
							onChange={k => navigation.goToLibraryList(k as SourcebookElementKind)}
						/>
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
