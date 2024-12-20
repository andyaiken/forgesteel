import { Alert, Badge, Button, Divider, Input, Popover, Select, Space, Tabs, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryData } from '../../../../data/ancestry-data';
import { AncestryPanel } from '../../../panels/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerData } from '../../../../data/career-data';
import { CareerPanel } from '../../../panels/career-panel/career-panel';
import { ClassData } from '../../../../data/class-data';
import { ClassPanel } from '../../../panels/class-panel/class-panel';
import { Complication } from '../../../../models/complication';
import { ComplicationData } from '../../../../data/complication-data';
import { ComplicationPanel } from '../../../panels/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CultureData } from '../../../../data/culture-data';
import { CulturePanel } from '../../../panels/culture-panel/culture-panel';
import { Domain } from '../../../../models/domain';
import { DomainData } from '../../../../data/domain-data';
import { DomainPanel } from '../../../panels/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { HeroClass } from '../../../../models/class';
import { Item } from '../../../../models/item';
import { ItemData } from '../../../../data/item-data';
import { ItemPanel } from '../../../panels/item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitData } from '../../../../data/kit-data';
import { KitPanel } from '../../../panels/kit-panel/kit-panel';
import { MonsterGroup } from '../../../../models/monster';
import { MonsterGroupData } from '../../../../data/monster-group-data';
import { MonsterGroupPanel } from '../../../panels/monster-group-panel/monster-group-panel';
import { Perk } from '../../../../models/perk';
import { PerkData } from '../../../../data/perk-data';
import { PerkPanel } from '../../../panels/perk-panel/perk-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './library-list.scss';

interface Props {
	sourcebooks: Sourcebook[];
	hiddenSourcebookIDs: string[];
	goHome: () => void;
	showAbout: () => void;
	showSourcebooks: () => void;
	viewAncestry: (ancestry: Ancestry) => void;
	viewCulture: (cultiure: Culture) => void;
	viewCareer: (career: Career) => void;
	viewClass: (heroClass: HeroClass) => void;
	viewComplication: (complication: Complication) => void;
	viewDomain: (domain: Domain) => void;
	viewKit: (kit: Kit) => void;
	viewPerk: (perk: Perk) => void;
	viewItem: (item: Item) => void;
	viewMonsterGroup: (monsterGroup: MonsterGroup) => void;
	onCreateHomebrew: (type: string, sourcebookID: string | null) => void;
	onImportHomebrew: (type: string, sourcebookID: string | null, element: Element) => void;
}

export const LibraryListPage = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ element, setElement ] = useState<string>('Ancestry');
	const [ sourcebookID, setSourcebookID ] = useState<string | null>(props.sourcebooks.filter(cs => cs.isHomebrew).length > 0 ? props.sourcebooks.filter(cs => cs.isHomebrew)[0].id : null);

	const getSourcebooks = () => {
		return props.sourcebooks.filter(cs => !props.hiddenSourcebookIDs.includes(cs.id));
	};

	const createHomebrew = () => {
		props.onCreateHomebrew(element, sourcebookID);
	};

	const getAncestries = () => {
		return AncestryData
			.getAncestries(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getCultures = () => {
		return CultureData
			.getCultures(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name
			], searchTerm));
	};

	const getCareers = () => {
		return CareerData
			.getCareers(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getClasses = () => {
		return ClassData
			.getClasses(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name)),
				...item.abilities.flatMap(a => a.name),
				...item.subclasses.map(sc => sc.name),
				...item.subclasses.flatMap(sc => sc.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name)))
			], searchTerm));
	};

	const getComplications = () => {
		return ComplicationData
			.getComplications(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name
			], searchTerm));
	};

	const getDomains = () => {
		return DomainData
			.getDomains(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name))
			], searchTerm));
	};

	const getKits = () => {
		return KitData
			.getKits(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getPerks = () => {
		return PerkData
			.getPerks(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getItems = () => {
		return ItemData
			.getItems(getSourcebooks())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getMonsterGroups = () => {
		return MonsterGroupData
			.getMonsterGroups(getSourcebooks())
			.filter(mg => Utils.textMatches([
				mg.name,
				...mg.monsters.map(m => m.name)
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
							<SelectablePanel key={a.id} onSelect={() => props.viewAncestry(a)}>
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
							<SelectablePanel key={c.id} onSelect={() => props.viewCulture(c)}>
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
							<SelectablePanel key={c.id} onSelect={() => props.viewCareer(c)}>
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
							<SelectablePanel key={c.id} onSelect={() => props.viewClass(c)}>
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
							<SelectablePanel key={c.id} onSelect={() => props.viewComplication(c)}>
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
							<SelectablePanel key={d.id} onSelect={() => props.viewDomain(d)}>
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
							<SelectablePanel key={k.id} onSelect={() => props.viewKit(k)}>
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
							<SelectablePanel key={p.id} onSelect={() => props.viewPerk(p)}>
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
							<SelectablePanel key={i.id} onSelect={() => props.viewItem(i)}>
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
							<SelectablePanel key={mg.id} onSelect={() => props.viewMonsterGroup(mg)}>
								<MonsterGroupPanel monsterGroup={mg} sourcebooks={props.sourcebooks} />
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
		const elementOptions = [ 'Ancestry', 'Culture', 'Career', 'Class', 'Complication', 'Domain', 'Kit', 'Perk', 'Item', 'Monster Group' ].map(e => ({ label: e, value: e }));
		const sourcebookOptions = props.sourcebooks.filter(cs => cs.isHomebrew).map(cs => ({ label: cs.name || 'Unnamed Sourcebook', value: cs.id }));

		const ancestries = getAncestries();
		const cultures = getCultures();
		const careers = getCareers();
		const classes = getClasses();
		const complications = getComplications();
		const domains = getDomains();
		const kits = getKits();
		const perks = getPerks();
		const items = getItems();
		const monsterGroups = getMonsterGroups();

		return (
			<div className='library-list-page'>
				<AppHeader subtitle='Library' goHome={props.goHome} showAbout={props.showAbout}>
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
									<Button block={true} icon={<PlusCircleOutlined />} onClick={createHomebrew}>Create</Button>
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
													props.onImportHomebrew(element, sourcebookID, e);
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
						items={[
							{
								key: 'Ancestry',
								label: (
									<div className='section-header'>
										<div className='section-title'>Ancestries</div>
										<div className='section-count'>{ancestries.length}</div>
									</div>
								),
								children: getAncestriesSection(ancestries)
							},
							{
								key: 'Culture',
								label: (
									<div className='section-header'>
										<div className='section-title'>Cultures</div>
										<div className='section-count'>{cultures.length}</div>
									</div>
								),
								children: getCulturesSection(cultures)
							},
							{
								key: 'Career',
								label: (
									<div className='section-header'>
										<div className='section-title'>Careers</div>
										<div className='section-count'>{careers.length}</div>
									</div>
								),
								children: getCareersSection(careers)
							},
							{
								key: 'Class',
								label: (
									<div className='section-header'>
										<div className='section-title'>Classes</div>
										<div className='section-count'>{classes.length}</div>
									</div>
								),
								children: getClassesSection(classes)
							},
							{
								key: 'Complication',
								label: (
									<div className='section-header'>
										<div className='section-title'>Complications</div>
										<div className='section-count'>{complications.length}</div>
									</div>
								),
								children: getComplicationsSection(complications)
							},
							{
								key: 'Kit',
								label: (
									<div className='section-header'>
										<div className='section-title'>Kits</div>
										<div className='section-count'>{kits.length}</div>
									</div>
								),
								children: getKitsSection(kits)
							},
							{
								key: 'Domain',
								label: (
									<div className='section-header'>
										<div className='section-title'>Domains</div>
										<div className='section-count'>{domains.length}</div>
									</div>
								),
								children: getDomainsSection(domains)
							},
							{
								key: 'Perk',
								label: (
									<div className='section-header'>
										<div className='section-title'>Perks</div>
										<div className='section-count'>{perks.length}</div>
									</div>
								),
								children: getPerksSection(perks)
							},
							{
								key: 'Item',
								label: (
									<div className='section-header'>
										<div className='section-title'>Items</div>
										<div className='section-count'>{items.length}</div>
									</div>
								),
								children: getItemsSection(items)
							},
							{
								key: 'Monster Group',
								label: (
									<div className='section-header'>
										<div className='section-title'>Monsters</div>
										<div className='section-count'>{monsterGroups.length}</div>
									</div>
								),
								children: getMonsterGroupsSection(monsterGroups)
							}
						]}
						onChange={setElement}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
