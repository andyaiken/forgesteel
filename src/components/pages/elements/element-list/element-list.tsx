import { Badge, Button, Divider, Input, Popover, Select, Space, Tabs, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryData } from '../../../../data/ancestry-data';
import { AncestryPanel } from '../../../panels/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CampaignSetting } from '../../../../models/campaign-setting';
import { CampaignSettingLogic } from '../../../../logic/campaign-setting-logic';
import { CampaignSettingPanel } from '../../../panels/campaign-setting-panel/campaign-setting-panel';
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
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './element-list.scss';

interface Props {
	campaignSettings: CampaignSetting[];
	hiddenSettingIDs: string[];
	goHome: () => void;
	showAbout: () => void;
	viewAncestry: (ancestry: Ancestry) => void;
	viewCulture: (cultiure: Culture) => void;
	viewCareer: (career: Career) => void;
	viewClass: (heroClass: HeroClass) => void;
	viewComplication: (complication: Complication) => void;
	viewDomain: (domain: Domain) => void;
	viewKit: (kit: Kit) => void;
	viewPerk: (perk: Perk) => void;
	viewItem: (item: Item) => void;
	onSettingCreate: () => CampaignSetting;
	onSettingChange: (setting: CampaignSetting) => void;
	onSettingDelete: (setting: CampaignSetting) => void;
	onCreateHomebrew: (type: string, settingID: string | null) => void;
	onImportHomebrew: (type: string, settingID: string | null, element: Element) => void;
	onImportSetting: (setting: CampaignSetting) => void;
	setHiddenSettingIDs: (ids: string[]) => void;
}

export const ElementListPage = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ element, setElement ] = useState<string>('Ancestry');
	const [ settingID, setSettingID ] = useState<string | null>(props.campaignSettings.filter(cs => cs.isHomebrew).length > 0 ? props.campaignSettings.filter(cs => cs.isHomebrew)[0].id : null);

	const setVisibility = (setting: CampaignSetting, visible: boolean) => {
		if (visible) {
			const copy = JSON.parse(JSON.stringify(props.hiddenSettingIDs.filter(id => id !== setting.id))) as string[];
			props.setHiddenSettingIDs(copy);
		} else {
			const copy = JSON.parse(JSON.stringify(props.hiddenSettingIDs)) as string[];
			copy.push(setting.id);
			props.setHiddenSettingIDs(copy);
		}
	};

	const getSettings = () => {
		return props.campaignSettings.filter(cs => !props.hiddenSettingIDs.includes(cs.id));
	};

	const createSetting = () => {
		const setting = props.onSettingCreate();
		setSettingID(setting.id);
	};

	const deleteSetting = (setting: CampaignSetting) => {
		props.onSettingDelete(setting);
		if (settingID === setting.id) {
			setSettingID(null);
		}
	};

	const createHomebrew = () => {
		props.onCreateHomebrew(element, settingID);
	};

	const getAncestries = () => {
		return AncestryData
			.getAncestries(getSettings())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getCultures = () => {
		return CultureData
			.getCultures(getSettings())
			.filter(item => Utils.textMatches([
				item.name
			], searchTerm));
	};

	const getCareers = () => {
		return CareerData
			.getCareers(getSettings())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getClasses = () => {
		return ClassData
			.getClasses(getSettings())
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
			.getComplications(getSettings())
			.filter(item => Utils.textMatches([
				item.name
			], searchTerm));
	};

	const getDomains = () => {
		return DomainData
			.getDomains(getSettings())
			.filter(item => Utils.textMatches([
				item.name,
				...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name))
			], searchTerm));
	};

	const getKits = () => {
		return KitData
			.getKits(getSettings())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getPerks = () => {
		return PerkData
			.getPerks(getSettings())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getItems = () => {
		return ItemData
			.getItems(getSettings())
			.filter(item => Utils.textMatches([
				item.name,
				...item.features.map(f => f.name)
			], searchTerm));
	};

	const getAncestriesSection = (list: Ancestry[]) => {
		if (list.length === 0) {
			return (
				<div className='ds-text dimmed-text'>None</div>
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

						const setting = CampaignSettingLogic.getAncestrySetting(props.campaignSettings, a);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={a.id} text={setting.name || 'Unnamed Collection'}>
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
				<div className='ds-text dimmed-text'>None</div>
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

						const setting = CampaignSettingLogic.getCultureSetting(props.campaignSettings, c);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={c.id} text={setting.name || 'Unnamed Collection'}>
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
				<div className='ds-text dimmed-text'>None</div>
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

						const setting = CampaignSettingLogic.getCareerSetting(props.campaignSettings, c);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={c.id} text={setting.name || 'Unnamed Collection'}>
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
				<div className='ds-text dimmed-text'>None</div>
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

						const setting = CampaignSettingLogic.getClassSetting(props.campaignSettings, c);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={c.id} text={setting.name || 'Unnamed Collection'}>
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
				<div className='ds-text dimmed-text'>None</div>
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

						const setting = CampaignSettingLogic.getComplicationSetting(props.campaignSettings, c);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={c.id} text={setting.name || 'Unnamed Collection'}>
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
				<div className='ds-text dimmed-text'>None</div>
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

						const setting = CampaignSettingLogic.getDomainSetting(props.campaignSettings, d);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={d.id} text={setting.name || 'Unnamed Collection'}>
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
				<div className='ds-text dimmed-text'>None</div>
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

						const setting = CampaignSettingLogic.getKitSetting(props.campaignSettings, k);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={k.id} text={setting.name || 'Unnamed Collection'}>
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
				<div className='ds-text dimmed-text'>None</div>
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

						const setting = CampaignSettingLogic.getPerkSetting(props.campaignSettings, p);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={p.id} text={setting.name || 'Unnamed Collection'}>
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
				<div className='ds-text dimmed-text'>None</div>
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

						const setting = CampaignSettingLogic.getItemSetting(props.campaignSettings, i);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={i.id} text={setting.name || 'Unnamed Collection'}>
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
		const settingOptions = props.campaignSettings.filter(cs => cs.isHomebrew).map(cs => ({ label: cs.name || 'Unnamed Collection', value: cs.id }));

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
				<AppHeader goHome={props.goHome} showAbout={props.showAbout}>
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
									settingOptions.length > 1 ?
										<div>
											<div className='ds-text'>Where do you want it to live?</div>
											<Select
												style={{ width: '100%' }}
												placeholder='Select'
												options={settingOptions}
												optionRender={option => <div className='ds-text'>{option.data.label}</div>}
												value={settingID}
												onChange={setSettingID}
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
													props.onImportHomebrew(element, settingID, e);
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
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								{
									props.campaignSettings.map(cs => (
										<CampaignSettingPanel
											key={cs.id}
											setting={cs}
											mode='elements'
											visible={!props.hiddenSettingIDs.includes(cs.id)}
											onSetVisible={setVisibility}
											onChange={props.onSettingChange}
											onDelete={deleteSetting}
										/>
									))
								}
								<Divider />
								<Space direction='vertical'>
									<Button block={true} onClick={createSetting}>Create a new collection</Button>
									<Upload
										style={{ width: '100%' }}
										accept='.drawsteel-collection'
										showUploadList={false}
										beforeUpload={file => {
											file
												.text()
												.then(json => {
													const setting = (JSON.parse(json) as CampaignSetting);
													props.onImportSetting(setting);
												});
											return false;
										}}
									>
										<Button block={true} icon={<DownloadOutlined />}>Import a collection</Button>
									</Upload>
								</Space>
							</div>
						)}
					>
						<Button>
							Collections
							<DownOutlined />
						</Button>
					</Popover>
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
