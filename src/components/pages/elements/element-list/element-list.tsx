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
import { Perk } from '../../../../models/perk';
import { PerkData } from '../../../../data/perk-data';
import { PerkPanel } from '../../../panels/perk-panel/perk-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './element-list.scss';

interface Props {
	sourcebooks: Sourcebook[];
	hiddenSourcebookIDs: string[];
	goHome: () => void;
	showAbout: () => void;
	showCollections: () => void;
	viewAncestry: (ancestry: Ancestry) => void;
	viewCulture: (cultiure: Culture) => void;
	viewCareer: (career: Career) => void;
	viewClass: (heroClass: HeroClass) => void;
	viewComplication: (complication: Complication) => void;
	viewDomain: (domain: Domain) => void;
	viewKit: (kit: Kit) => void;
	viewPerk: (perk: Perk) => void;
	viewItem: (item: Item) => void;
	onCreateHomebrew: (type: string, sourcebookID: string | null) => void;
	onImportHomebrew: (type: string, sourcebookID: string | null, element: Element) => void;
}

export const ElementListPage = (props: Props) => {
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
			<div className='element-section-row'>
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
								<Badge.Ribbon key={a.id} text={sourcebook.name || 'Unnamed Collection'}>
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
			<div className='element-section-row'>
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
								<Badge.Ribbon key={c.id} text={sourcebook.name || 'Unnamed Collection'}>
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
			<div className='element-section-row'>
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
								<Badge.Ribbon key={c.id} text={sourcebook.name || 'Unnamed Collection'}>
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
			<div className='element-section-row'>
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
								<Badge.Ribbon key={c.id} text={sourcebook.name || 'Unnamed Collection'}>
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
			<div className='element-section-row'>
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
								<Badge.Ribbon key={c.id} text={sourcebook.name || 'Unnamed Collection'}>
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
			<div className='element-section-row'>
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
								<Badge.Ribbon key={d.id} text={sourcebook.name || 'Unnamed Collection'}>
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
			<div className='element-section-row'>
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
								<Badge.Ribbon key={k.id} text={sourcebook.name || 'Unnamed Collection'}>
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
			<div className='element-section-row'>
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
								<Badge.Ribbon key={p.id} text={sourcebook.name || 'Unnamed Collection'}>
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
			<div className='element-section-row'>
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
								<Badge.Ribbon key={i.id} text={sourcebook.name || 'Unnamed Collection'}>
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
		const elementOptions = [ 'Ancestry', 'Culture', 'Career', 'Class', 'Complication', 'Domain', 'Kit', 'Perk', 'Item' ].map(e => ({ label: e, value: e }));
		const sourcebookOptions = props.sourcebooks.filter(cs => cs.isHomebrew).map(cs => ({ label: cs.name || 'Unnamed Collection', value: cs.id }));

		const ancestries = getAncestries();
		const cultures = getCultures();
		const careers = getCareers();
		const classes = getClasses();
		const complications = getComplications();
		const domains = getDomains();
		const kits = getKits();
		const perks = getPerks();
		const items = getItems();

		return (
			<div className='element-list-page'>
				<AppHeader subtitle='Elements' goHome={props.goHome} showAbout={props.showAbout}>
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
					<Button onClick={props.showCollections}>
						Collections
					</Button>
				</AppHeader>
				<div className='element-list-page-content'>
					<Tabs
						items={[
							{
								key: '1',
								label: `Ancestries (${ancestries.length})`,
								children: getAncestriesSection(ancestries)
							},
							{
								key: '2',
								label: `Cultures (${cultures.length})`,
								children: getCulturesSection(cultures)
							},
							{
								key: '3',
								label: `Careers (${careers.length})`,
								children: getCareersSection(careers)
							},
							{
								key: '4',
								label: `Classes (${classes.length})`,
								children: getClassesSection(classes)
							},
							{
								key: '5',
								label: `Complications (${complications.length})`,
								children: getComplicationsSection(complications)
							},
							{
								key: '6',
								label: `Kits (${kits.length})`,
								children: getKitsSection(kits)
							},
							{
								key: '7',
								label: `Domains (${domains.length})`,
								children: getDomainsSection(domains)
							},
							{
								key: '8',
								label: `Perks (${perks.length})`,
								children: getPerksSection(perks)
							},
							{
								key: '9',
								label: `Items (${items.length})`,
								children: getItemsSection(items)
							}
						]}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
