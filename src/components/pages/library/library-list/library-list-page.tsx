import { Badge, Button, Divider, Input, Popover, Segmented, Select, Space, Table, Tabs, Upload } from 'antd';
import { BarsOutlined, BookOutlined, DownOutlined, DownloadOutlined, PlusOutlined, SearchOutlined, SettingOutlined, TableOutlined } from '@ant-design/icons';
import { EnvironmentData, OrganizationData, UpbringingData } from '../../../../data/culture-data';
import { HistogramPanel, HistogramTextPanel } from '../../../panels/histogram/histogram-panel';
import { Sourcebook, SourcebookElementKind } from '../../../../models/sourcebook';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerPanel } from '../../../panels/elements/career-panel/career-panel';
import { Characteristic } from '../../../../enums/characteristic';
import { ClassPanel } from '../../../panels/elements/class-panel/class-panel';
import { Collections } from '../../../../utils/collections';
import { Complication } from '../../../../models/complication';
import { ComplicationPanel } from '../../../panels/elements/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/elements/culture-panel/culture-panel';
import { CultureType } from '../../../../enums/culture-type';
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
import { Imbuement } from '../../../../models/imbuement';
import { ImbuementPanel } from '../../../panels/elements/imbuement-panel/imbuement-panel';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitArmor } from '../../../../enums/kit-armor';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { KitWeapon } from '../../../../enums/kit-weapon';
import { Monster } from '../../../../models/monster';
import { MonsterFilter } from '../../../../models/filter';
import { MonsterFilterPanel } from '../../../panels/monster-filter/monster-filter-panel';
import { MonsterGroup } from '../../../../models/monster-group';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '../../../../enums/monster-role-type';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { SubClass } from '../../../../models/subclass';
import { SubclassPanel } from '../../../panels/elements/subclass-panel/subclass-panel';
import { Terrain } from '../../../../models/terrain';
import { TerrainCategory } from '../../../../enums/terrain-category';
import { TerrainPanel } from '../../../panels/elements/terrain-panel/terrain-panel';
import { TerrainRoleType } from '../../../../enums/terrain-role-type';
import { Title } from '../../../../models/title';
import { TitlePanel } from '../../../panels/elements/title-panel/title-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './library-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	hiddenSourcebookIDs: string[];
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
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
	const [ monsterFilter, setMonsterFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter());

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

	const getSubClasses = () => {
		try {
			return SourcebookLogic
				.getSubClasses(getSourcebooks())
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

	const getImbuements = () => {
		try {
			return SourcebookLogic
				.getImbuements(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
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

	const getTerrainObjects = () => {
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

	const getAncestriesSection = (list: Ancestry[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(a => ({
								key: a.id,
								name: a.name,
								sourcebook: SourcebookLogic.getAncestrySourcebook(props.sourcebooks, a)!.name,
								features: a.features.map(f => f.name).join(', ')
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(a => ({ text: a.name, value: a.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Features',
									dataIndex: 'features',
									filters: Collections.distinct(list.flatMap(a => a.features).map(f => f.name), f => f).sort().map(f => ({ text: f, value: f })),
									onFilter: (value, record) => record.features.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.features.localeCompare(b.features)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	const getCareersSection = (list: Career[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(c => ({
								key: c.id,
								name: c.name,
								sourcebook: SourcebookLogic.getCareerSourcebook(props.sourcebooks, c)!.name,
								features: c.features.map(f => f.name).join(', ')
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(c => ({ text: c.name, value: c.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Features',
									dataIndex: 'features',
									filters: Collections.distinct(list.flatMap(c => c.features).map(f => f.name), f => f).sort().map(f => ({ text: f, value: f })),
									onFilter: (value, record) => record.features.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.features.localeCompare(b.features)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(c => ({
								key: c.id,
								name: c.name,
								sourcebook: SourcebookLogic.getClassSourcebook(props.sourcebooks, c)!.name,
								characteristics: c.primaryCharacteristicsOptions.map(o => o.join(', ')).join(' or '),
								subclasses: c.subclasses.map(sc => sc.name).join(', ')
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(c => ({ text: c.name, value: c.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Characteristics',
									dataIndex: 'characteristics',
									filters: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(c => ({ text: c, value: c })),
									onFilter: (value, record) => record.characteristics.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.characteristics.localeCompare(b.characteristics)
								},
								{
									key: '4',
									title: 'Subclasses',
									dataIndex: 'subclasses',
									filters: list.flatMap(c => c.subclasses).sort().map(sc => ({ text: sc.name, value: sc.name })),
									onFilter: (value, record) => record.subclasses.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.subclasses.localeCompare(b.subclasses)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	const getSubClassesSection = (list: SubClass[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(sc => ({
								key: sc.id,
								name: sc.name,
								sourcebook: SourcebookLogic.getSubClassSourcebook(props.sourcebooks, sc)!.name
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(c => ({ text: c.name, value: c.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
					{
						list.map(sc => {
							const item = (
								<SelectablePanel key={sc.id} onSelect={() => navigation.goToLibraryView('subclass', sc.id)}>
									<SubclassPanel subclass={sc} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getSubClassSourcebook(props.sourcebooks, sc);
							if (sourcebook && sourcebook.id) {
								return (
									<Badge.Ribbon key={sc.id} text={sourcebook.name || 'Unnamed Sourcebook'}>
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

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(c => ({
								key: c.id,
								name: c.name,
								sourcebook: SourcebookLogic.getComplicationSourcebook(props.sourcebooks, c)!.name,
								features: c.features.map(f => f.name).join(', ')
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(c => ({ text: c.name, value: c.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Features',
									dataIndex: 'features',
									filters: Collections.distinct(list.flatMap(c => c.features).map(f => f.name), f => f).sort().map(f => ({ text: f, value: f })),
									onFilter: (value, record) => record.features.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.features.localeCompare(b.features)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	const getCulturesSection = (list: Culture[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(c => ({
								key: c.id,
								name: c.name,
								sourcebook: SourcebookLogic.getCultureSourcebook(props.sourcebooks, c)!.name,
								type: c.type,
								languages: c.language.data.selected.join(', '),
								environment: c.environment ? c.environment.name : '',
								organization: c.organization ? c.organization.name : '',
								upbringing: c.upbringing ? c.upbringing.name : ''
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(c => ({ text: c.name, value: c.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Type',
									dataIndex: 'type',
									filters: [ CultureType.Ancestral, CultureType.Professional ].map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.type.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.type.localeCompare(b.type)
								},
								{
									key: '4',
									title: 'Languages',
									dataIndex: 'languages',
									filters: SourcebookLogic.getLanguages(props.sourcebooks).map(l => ({ text: l.name, value: l.name })),
									onFilter: (value, record) => record.languages.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.languages.localeCompare(b.languages)
								},
								{
									key: '5',
									title: 'Environment',
									dataIndex: 'environment',
									filters: EnvironmentData.getEnvironments().map(e => ({ text: e.name, value: e.name })),
									onFilter: (value, record) => record.environment.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.environment.localeCompare(b.environment)
								},
								{
									key: '6',
									title: 'Organization',
									dataIndex: 'organization',
									filters: OrganizationData.getOrganizations().map(o => ({ text: o.name, value: o.name })),
									onFilter: (value, record) => record.organization.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.organization.localeCompare(b.organization)
								},
								{
									key: '7',
									title: 'Upbringing',
									dataIndex: 'upbringing',
									filters: UpbringingData.getUpbringings().map(u => ({ text: u.name, value: u.name })),
									onFilter: (value, record) => record.upbringing.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.upbringing.localeCompare(b.upbringing)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	const getDomainsSection = (list: Domain[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(d => ({
								key: d.id,
								name: d.name,
								sourcebook: SourcebookLogic.getDomainSourcebook(props.sourcebooks, d)!.name
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(d => ({ text: d.name, value: d.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	const getImbuementsSection = (list: Imbuement[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(i => ({
								key: i.id,
								name: i.name,
								sourcebook: SourcebookLogic.getImbuementSourcebook(props.sourcebooks, i)!.name,
								type: i.type,
								level: i.level
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(i => ({ text: i.name, value: i.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '2',
									title: 'Type',
									dataIndex: 'type',
									filters: Collections.distinct(list.map(i => i.type), t => t).sort().map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.type.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.type.localeCompare(b.type)
								},
								{
									key: '3',
									title: 'Level',
									dataIndex: 'level',
									filters: Collections.distinct(list.map(i => i.level), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.level === value,
									sorter: (a, b) => a.level - b.level
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
					{
						list.map(i => {
							const item = (
								<SelectablePanel key={i.id} onSelect={() => navigation.goToLibraryView('imbuement', i.id)}>
									<ImbuementPanel imbuement={i} options={props.options} />
								</SelectablePanel>
							);

							const sourcebook = SourcebookLogic.getImbuementSourcebook(props.sourcebooks, i);
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

	const getItemsSection = (list: Item[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(i => ({
								key: i.id,
								name: i.name,
								sourcebook: SourcebookLogic.getItemSourcebook(props.sourcebooks, i)!.name,
								type: i.type,
								keywords: i.keywords.join(', ')
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(i => ({ text: i.name, value: i.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '2',
									title: 'Type',
									dataIndex: 'type',
									filters: Collections.distinct(list.map(i => i.type), t => t).sort().map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.type.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.type.localeCompare(b.type)
								},
								{
									key: '2',
									title: 'Keywords',
									dataIndex: 'keywords',
									filters: Collections.distinct(list.flatMap(i => i.keywords), k => k).sort().map(k => ({ text: k, value: k })),
									onFilter: (value, record) => record.keywords.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.keywords.localeCompare(b.keywords)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	const getKitsSection = (list: Kit[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(k => ({
								key: k.id,
								name: k.name,
								sourcebook: SourcebookLogic.getKitSourcebook(props.sourcebooks, k)!.name,
								type: k.type,
								armor: k.armor.join(', '),
								weapon: k.weapon.join(', '),
								stamina: k.stamina,
								speed: k.speed,
								stability: k.stability,
								disengage: k.disengage
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(k => ({ text: k.name, value: k.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Type',
									dataIndex: 'type',
									filters: Collections.distinct(list.map(k => k.type), t => t).sort().map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.type.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.type.localeCompare(b.type)
								},
								{
									key: '4',
									title: 'Armor',
									dataIndex: 'armor',
									filters: [ KitArmor.Heavy, KitArmor.Light, KitArmor.Medium, KitArmor.Shield ].map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.armor.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.armor.localeCompare(b.armor)
								},
								{
									key: '5',
									title: 'Weapon',
									dataIndex: 'weapon',
									filters: [ KitWeapon.Bow, KitWeapon.Ensnaring, KitWeapon.Heavy, KitWeapon.Light, KitWeapon.Medium, KitWeapon.Polearm, KitWeapon.Unarmed, KitWeapon.Whip ].map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.weapon.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.weapon.localeCompare(b.weapon)
								},
								{
									key: '6',
									title: 'Stamina',
									dataIndex: 'stamina',
									filters: Collections.distinct(list.map(k => k.stamina), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.stamina === value,
									sorter: (a, b) => a.stamina - b.stamina
								},
								{
									key: '7',
									title: 'Speed',
									dataIndex: 'speed',
									filters: Collections.distinct(list.map(k => k.speed), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.speed === value,
									sorter: (a, b) => a.speed - b.speed
								},
								{
									key: '8',
									title: 'Stability',
									dataIndex: 'stability',
									filters: Collections.distinct(list.map(k => k.stability), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.stability === value,
									sorter: (a, b) => a.stability - b.stability
								},
								{
									key: '9',
									title: 'Disengage',
									dataIndex: 'disengage',
									filters: Collections.distinct(list.map(k => k.disengage), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.disengage === value,
									sorter: (a, b) => a.disengage - b.disengage
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	const getMonsterGroupsSection = (list: MonsterGroup[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(mg => ({
								key: mg.id,
								name: mg.name,
								sourcebook: SourcebookLogic.getMonsterGroupSourcebook(props.sourcebooks, mg)!.name,
								monsters: mg.monsters.length,
								malice: mg.malice.map(m => m.name).join(', ')
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(mg => ({ text: mg.name, value: mg.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Monsters',
									dataIndex: 'monsters',
									filters: Collections.distinct(list.map(k => k.monsters.length), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.monsters === value,
									sorter: (a, b) => a.monsters - b.monsters
								},
								{
									key: '4',
									title: 'Malice',
									dataIndex: 'malice',
									filters: Collections.distinct(list.flatMap(mg => mg.malice).map(m => m.name), m => m).sort().map(m => ({ text: m, value: m })),
									onFilter: (value, record) => record.malice.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.malice.localeCompare(b.malice)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<div className='library-section-grid'>
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
						<HeaderText>Filter</HeaderText>
						<MonsterFilterPanel
							monsterFilter={monsterFilter}
							monsters={props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(g => g.monsters)}
							includeNameFilter={true}
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

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(m => ({
								key: m.id,
								name: m.name,
								sourcebook: SourcebookLogic.getMonsterSourcebook(props.sourcebooks, m)!.name,
								level: m.level,
								role: m.role.type,
								organization: m.role.organization,
								keywords: m.keywords.join(', '),
								encounterValue: m.encounterValue,
								features: m.features.map(f => f.name).join(', ')
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(m => ({ text: m.name, value: m.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Role',
									dataIndex: 'role',
									filters: [ MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(r => ({ text: r, value: r })),
									onFilter: (value, record) => record.role.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.role.localeCompare(b.role)
								},
								{
									key: '4',
									title: 'Organization',
									dataIndex: 'organization',
									filters: [ MonsterOrganizationType.Horde, MonsterOrganizationType.Leader, MonsterOrganizationType.Minion, MonsterOrganizationType.Platoon, MonsterOrganizationType.Retainer, MonsterOrganizationType.Solo, MonsterOrganizationType.Elite ].map(r => ({ text: r, value: r })),
									onFilter: (value, record) => record.organization.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.organization.localeCompare(b.organization)
								},
								{
									key: '5',
									title: 'Keywords',
									dataIndex: 'keywords',
									filters: Collections.distinct(list.flatMap(m => m.keywords), kw => kw).sort().map(kw => ({ text: kw, value: kw })),
									onFilter: (value, record) => record.keywords.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.keywords.localeCompare(b.keywords)
								},
								{
									key: '6',
									title: 'EV',
									dataIndex: 'encounterValue',
									filters: Collections.distinct(list.map(k => k.encounterValue), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.encounterValue === value,
									sorter: (a, b) => a.encounterValue - b.encounterValue
								},
								{
									key: '7',
									title: 'Features',
									dataIndex: 'features',
									filters: Collections.distinct(list.flatMap(m => m.features).map(f => f.name), f => f).sort().map(f => ({ text: f, value: f })),
									onFilter: (value, record) => record.features.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.features.localeCompare(b.features)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{tools}
					<Divider />
					<div className='library-section-grid'>
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

	const getPerksSection = (list: Perk[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(p => ({
								key: p.id,
								name: p.name,
								sourcebook: SourcebookLogic.getPerkSourcebook(props.sourcebooks, p)!.name,
								list: p.list,
								type: p.type
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(p => ({ text: p.name, value: p.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'List',
									dataIndex: 'list',
									filters: Collections.distinct(list.map(p => p.list), l => l).sort().map(l => ({ text: l, value: l })),
									onFilter: (value, record) => record.list.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.list.localeCompare(b.list)
								},
								{
									key: '4',
									title: 'Type',
									dataIndex: 'type',
									filters: Collections.distinct(list.map(p => p.type), t => t).sort().map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.type.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.type.localeCompare(b.type)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	const getTerrainObjectsSection = (list: Terrain[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(t => ({
								key: t.id,
								name: t.name,
								sourcebook: SourcebookLogic.getTerrainSourcebook(props.sourcebooks, t)!.name,
								level: t.level,
								category: t.category,
								type: t.role.type,
								terrainType: t.role.terrainType,
								encounterValue: t.encounterValue
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(t => ({ text: t.name, value: t.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Level',
									dataIndex: 'level',
									filters: Collections.distinct(list.map(k => k.level), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.level === value,
									sorter: (a, b) => a.level - b.level
								},
								{
									key: '4',
									title: 'Category',
									dataIndex: 'category',
									filters: [ TerrainCategory.ArcaneObject, TerrainCategory.Environmental, TerrainCategory.Fieldwork, TerrainCategory.Mechanism, TerrainCategory.PowerFixture, TerrainCategory.SiegeEngine ].map(r => ({ text: r, value: r })),
									onFilter: (value, record) => record.category.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.category.localeCompare(b.category)
								},
								{
									key: '5',
									title: 'Type',
									dataIndex: 'type',
									filters: [ MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(r => ({ text: r, value: r })),
									onFilter: (value, record) => record.type.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.type.localeCompare(b.type)
								},
								{
									key: '6',
									title: 'Terrain Type',
									dataIndex: 'terrainType',
									filters: [ TerrainRoleType.Fortification, TerrainRoleType.Hazard, TerrainRoleType.Relic, TerrainRoleType.SiegeEngine, TerrainRoleType.Trap, TerrainRoleType.Trigger ].map(r => ({ text: r, value: r })),
									onFilter: (value, record) => record.terrainType.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.terrainType.localeCompare(b.terrainType)
								},
								{
									key: '7',
									title: 'EV',
									dataIndex: 'encounterValue',
									filters: Collections.distinct(list.map(k => k.encounterValue), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.encounterValue === value,
									sorter: (a, b) => a.encounterValue - b.encounterValue
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	const getTitlesSection = (list: Title[]) => {
		try {
			if (list.length === 0) {
				return (
					<Empty />
				);
			}

			if (props.options.showContentInTable) {
				return (
					<div className='library-section-table'>
						<Table
							dataSource={list.map(t => ({
								key: t.id,
								name: t.name,
								sourcebook: SourcebookLogic.getTitleSourcebook(props.sourcebooks, t)!.name,
								echelon: t.echelon,
								prerequisites: t.prerequisites,
								features: t.features.map(f => f.name).join(', ')
							}))}
							columns={[
								{
									key: '1',
									title: 'Name',
									dataIndex: 'name',
									filters: list.map(t => ({ text: t.name, value: t.name })),
									onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.name.localeCompare(b.name),
									sortDirections: [ 'ascend', 'descend', 'ascend' ],
									defaultSortOrder: 'ascend'
								},
								{
									key: '2',
									title: 'Sourcebook',
									dataIndex: 'sourcebook',
									filters: props.sourcebooks.map(sb => ({ text: sb.name, value: sb.name })),
									onFilter: (value, record) => record.sourcebook.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.sourcebook.localeCompare(b.sourcebook)
								},
								{
									key: '3',
									title: 'Echelon',
									dataIndex: 'echelon',
									filters: Collections.distinct(list.map(t => t.echelon), t => t).sort((a, b) => a - b).map(t => ({ text: t, value: t })),
									onFilter: (value, record) => record.echelon === value,
									sorter: (a, b) => a.echelon - b.echelon
								},
								{
									key: '4',
									title: 'Prerequisites',
									dataIndex: 'prerequisites',
									sorter: (a, b) => a.prerequisites.localeCompare(b.prerequisites)
								},
								{
									key: '5',
									title: 'Features',
									dataIndex: 'features',
									filters: Collections.distinct(list.flatMap(t => t.features).map(f => f.name), f => f).sort().map(f => ({ text: f, value: f })),
									onFilter: (value, record) => record.features.toLowerCase().includes((value as string).toLowerCase()),
									sorter: (a, b) => a.features.localeCompare(b.features)
								}
							]}
							pagination={false}
						/>
					</div>
				);
			}

			return (
				<div className='library-section-grid'>
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

	try {
		const sourcebookOptions = props.sourcebooks
			.filter(cs => cs.isHomebrew)
			.map(cs => ({ label: cs.name || 'Unnamed Sourcebook', value: cs.id }));

		const ancestries = getAncestries();
		const careers = getCareers();
		const classes = getClasses();
		const complications = getComplications();
		const cultures = getCultures();
		const domains = getDomains();
		const imbuements = getImbuements();
		const items = getItems();
		const kits = getKits();
		const monsterGroups = getMonsterGroups();
		const monsters = Collections.sort(getMonsters(), m => m.name);
		const perks = getPerks();
		const subclasses = getSubClasses();
		const terrains = getTerrainObjects();
		const titles = getTitles();

		return (
			<ErrorBoundary>
				<div className='library-list-page'>
					<AppHeader subheader='Library' showDirectory={props.showDirectory}>
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
								<div style={{ display: 'flex', flexDirection: 'column', minWidth: '150px' }}>
									{
										sourcebookOptions.length > 1 ?
											<div>
												<div className='ds-text'>Where do you want it to live?</div>
												<Select
													style={{ width: '100%' }}
													placeholder='Select'
													options={sourcebookOptions}
													optionRender={option => <div className='ds-text'>{option.data.label}</div>}
													showSearch={true}
													filterOption={(input, option) => {
														const strings = option ?
															[
																option.label
															]
															: [];
														return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
													}}
													value={sourcebookID}
													onChange={setSourcebookID}
												/>
											</div>
											: null
									}
									{sourcebookOptions.length > 1 ? <Divider /> : null}
									<Space direction='vertical' style={{ width: '100%' }}>
										<Button type='primary' block={true} icon={<PlusOutlined />} onClick={createElement}>Create</Button>
										<Upload
											style={{ width: '100%' }}
											accept={`.drawsteel-${currentTab.toLowerCase()},.ds-${currentTab.toLowerCase()}`}
											showUploadList={false}
											beforeUpload={file => {
												file
													.text()
													.then(json => {
														const e = JSON.parse(json) as Element;
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
							<Button type='primary'>
								Add
								<DownOutlined />
							</Button>
						</Popover>
						<div className='divider' />
						<Button icon={<BookOutlined />} onClick={props.showSourcebooks}>
							Sourcebooks
						</Button>
						<Popover
							trigger='click'
							content={<OptionsPanel mode='library' options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
						>
							<Button icon={<SettingOutlined />}>
								Options
								<DownOutlined />
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
									key: 'imbuement',
									label: (
										<div className='section-header'>
											<div className='section-title'>Imbuements</div>
											<div className='section-count'>{imbuements.length}</div>
										</div>
									),
									children: getImbuementsSection(imbuements)
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
									key: 'subclass',
									label: (
										<div className='section-header'>
											<div className='section-title'>Subclasses</div>
											<div className='section-count'>{subclasses.length}</div>
										</div>
									),
									children: getSubClassesSection(subclasses)
								},
								{
									key: 'terrain',
									label: (
										<div className='section-header'>
											<div className='section-title'>Terrain</div>
											<div className='section-count'>{terrains.length}</div>
										</div>
									),
									children: getTerrainObjectsSection(terrains)
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
							tabBarExtraContent={
								<Segmented
									name='view'
									options={[
										{ value: false, label: <TableOutlined /> },
										{ value: true, label: <BarsOutlined /> }
									]}
									value={props.options.showContentInTable}
									onChange={value => {
										const copy = Utils.copy(props.options);
										copy.showContentInTable = value;
										props.setOptions(copy);
									}}
								/>
							}
						/>
					</div>
					<AppFooter page='library' showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
