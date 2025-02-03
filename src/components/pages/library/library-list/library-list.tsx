import { Alert, Badge, Button, Divider, Input, Popover, Select, Space, Tabs, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Sourcebook, SourcebookElementKind } from '../../../../models/sourcebook';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerPanel } from '../../../panels/elements/career-panel/career-panel';
import { ClassPanel } from '../../../panels/elements/class-panel/class-panel';
import { Complication } from '../../../../models/complication';
import { ComplicationPanel } from '../../../panels/elements/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/elements/culture-panel/culture-panel';
import { Domain } from '../../../../models/domain';
import { DomainPanel } from '../../../panels/elements/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { Format } from '../../../../utils/format';
import { HeroClass } from '../../../../models/class';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { MonsterGroup } from '../../../../models/monster';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Title } from '../../../../models/title';
import { TitlePanel } from '../../../panels/elements/title-panel/title-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useSourcebookTabKey } from '../../../../hooks/use-sourcebook-tab-key';
import { useState } from 'react';

import './library-list.scss';

interface Props {
	sourcebooks: Sourcebook[];
	hiddenSourcebookIDs: string[];
	showNavigation: () => void;
	showAbout: () => void;
 	showSourcebooks: () => void;
	createElement: (kind: SourcebookElementKind, sourcebookID: string | null) => void;
	importElement: (kind: SourcebookElementKind, sourcebookID: string | null, element: Element) => void;
}

export const LibraryListPage = (props: Props) => {
	const navigation = useNavigation();
	const [ tabKey, setTabKey ] = useSourcebookTabKey();
	const [ previousTab, setPreviousTab ] = useState(tabKey);
	const [ element, setElement ] = useState<SourcebookElementKind>(tabKey);
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ sourcebookID, setSourcebookID ] = useState<string | null>(props.sourcebooks.filter(cs => cs.isHomebrew).length > 0 ? props.sourcebooks.filter(cs => cs.isHomebrew)[0].id : null);

	if (tabKey !== previousTab) {
		setElement(tabKey);
		setPreviousTab(tabKey);
	}

	const getSourcebooks = () => {
		return props.sourcebooks.filter(cs => !props.hiddenSourcebookIDs.includes(cs.id));
	};

	const createElement = () => {
		props.createElement(element, sourcebookID);
	};

	const getAncestries = () => {
		return SourcebookLogic
			.getAncestries(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getCultures = () => {
		return SourcebookLogic
			.getCultures(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getCareers = () => {
		return SourcebookLogic
			.getCareers(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getClasses = () => {
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
	};

	const getComplications = () => {
		return SourcebookLogic
			.getComplications(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getDomains = () => {
		return SourcebookLogic
			.getDomains(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description,
				...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name))
			], searchTerm));
	};

	const getKits = () => {
		return SourcebookLogic
			.getKits(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getPerks = () => {
		return SourcebookLogic
			.getPerks(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getTitles = () => {
		return SourcebookLogic
			.getTitles(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getItems = () => {
		return SourcebookLogic
			.getItems(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description,
				...item.keywords,
				...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name))
			], searchTerm));
	};

	const getMonsterGroups = () => {
		return SourcebookLogic
			.getMonsterGroups(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				item.description,
				...item.monsters.map(m => m.name)
			], searchTerm));
	};

	const getAncestriesSection = (list: Ancestry[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No ancestries'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(a => {
						const item = (
							<SelectablePanel key={a.id} onSelect={() => navigation.goToLibraryView('ancestry', a.id)}>
								<AncestryPanel ancestry={a} />
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
	};

	const getCulturesSection = (list: Culture[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No cultures'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(c => {
						const item = (
							<SelectablePanel key={c.id} onSelect={() => navigation.goToLibraryView('culture', c.id)}>
								<CulturePanel culture={c} />
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
	};

	const getCareersSection = (list: Career[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No careers'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(c => {
						const item = (
							<SelectablePanel key={c.id} onSelect={() => navigation.goToLibraryView('career', c.id)}>
								<CareerPanel career={c} />
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
	};

	const getClassesSection = (list: HeroClass[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No classes'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(c => {

						const item = (
							<SelectablePanel key={c.id} onSelect={() => navigation.goToLibraryView('class', c.id)}>
								<ClassPanel heroClass={c} />
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
	};

	const getComplicationsSection = (list: Complication[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No complications'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(c => {
						const item = (
							<SelectablePanel key={c.id} onSelect={() => navigation.goToLibraryView('complication', c.id)}>
								<ComplicationPanel complication={c} />
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
	};

	const getDomainsSection = (list: Domain[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No domains'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(d => {
						const item = (
							<SelectablePanel key={d.id} onSelect={() => navigation.goToLibraryView('domain', d.id)}>
								<DomainPanel domain={d} />
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
	};

	const getKitsSection = (list: Kit[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No kits'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(k => {
						const item = (
							<SelectablePanel key={k.id} onSelect={() => navigation.goToLibraryView('kit', k.id)}>
								<KitPanel kit={k} />
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
	};

	const getPerksSection = (list: Perk[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No perks'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(p => {
						const item = (
							<SelectablePanel key={p.id} onSelect={() => navigation.goToLibraryView('perk', p.id)}>
								<PerkPanel perk={p} />
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
	};

	const getTitlesSection = (list: Title[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No titles'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(t => {
						const item = (
							<SelectablePanel key={t.id} onSelect={() => navigation.goToLibraryView('title', t.id)}>
								<TitlePanel title={t} />
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
	};

	const getItemsSection = (list: Item[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No items'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(i => {
						const item = (
							<SelectablePanel key={i.id} onSelect={() => navigation.goToLibraryView('item', i.id)}>
								<ItemPanel item={i} />
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
	};

	const getMonsterGroupsSection = (list: MonsterGroup[]) => {
		if (list.length === 0) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					message='No monster groups'
				/>
			);
		}

		return (
			<div className='library-section-row'>
				{
					list.map(mg => {
						const item = (
							<SelectablePanel key={mg.id} onSelect={() => navigation.goToLibraryView('monster-group', mg.id)}>
								<MonsterGroupPanel monsterGroup={mg} />
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
		);
	};

	try {
		const elementOptions = [ 'ancestry', 'culture', 'career', 'class', 'complication', 'domain', 'kit', 'perk', 'title', 'item', 'monster-group' ]
			.map(e => ({
				value: e,
				label: Format.capitalize(e, '-')
			}));
		const sourcebookOptions = props.sourcebooks.filter(cs => cs.isHomebrew).map(cs => ({ label: cs.name || 'Unnamed Sourcebook', value: cs.id }));

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

		return (
			<div className='library-list-page'>
				<AppHeader breadcrumbs={[ { label: 'Library' } ]} showNavigation={props.showNavigation} showAbout={props.showAbout}>
					<Input
						placeholder='Search'
						allowClear={true}
						value={searchTerm}
						suffix={<SearchOutlined />}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<div>
									<div className='ds-text'>What do you want to add?</div>
									<Select
										style={{ width: '100%' }}
										placeholder='Select'
										options={elementOptions}
										optionRender={option => <div className='ds-text'>{option.data.label}</div>}
										value={element}
										onChange={setElement}
									/>
								</div>
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
								<Divider />
								<Space>
									<Button block={true} icon={<PlusCircleOutlined />} onClick={createElement}>Create</Button>
									<div className='ds-text'>or</div>
									<Upload
										style={{ width: '100%' }}
										accept={`.drawsteel-${element.toLowerCase()}`}
										showUploadList={false}
										beforeUpload={file => {
											file
												.text()
												.then(json => {
													const e = (JSON.parse(json) as Element);
													props.importElement(element, sourcebookID, e);
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
						<Button>
							Create
							<DownOutlined />
						</Button>
					</Popover>
					<Button onClick={props.showSourcebooks}>
						Sourcebooks
					</Button>
				</AppHeader>
				<div className='library-list-page-content'>
					<Tabs
						activeKey={tabKey}
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
								key: 'title',
								label: (
									<div className='section-header'>
										<div className='section-title'>Titles</div>
										<div className='section-count'>{titles.length}</div>
									</div>
								),
								children: getTitlesSection(titles)
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
								key: 'monster-group',
								label: (
									<div className='section-header'>
										<div className='section-title'>Monsters</div>
										<div className='section-count'>{monsterGroups.length}</div>
									</div>
								),
								children: getMonsterGroupsSection(monsterGroups)
							}
						]}
						onChange={tabKey => setTabKey(tabKey as SourcebookElementKind)}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
