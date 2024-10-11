import { Badge, Button, Popover, Select, Space, Upload } from 'antd';
import { DownloadOutlined, PlusCircleOutlined } from '@ant-design/icons';
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
import { Element } from '../../../../models/element';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HeroClass } from '../../../../models/class';
import { Kit } from '../../../../models/kit';
import { KitData } from '../../../../data/kit-data';
import { KitPanel } from '../../../panels/kit-panel/kit-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { useState } from 'react';

import './sourcebook-list.scss';

interface Props {
	campaignSettings: CampaignSetting[];
	goHome: () => void;
	showAbout: () => void;
	viewAncestry: (ancestry: Ancestry) => void;
	viewCulture: (cultiure: Culture) => void;
	viewCareer: (career: Career) => void;
	viewClass: (heroClass: HeroClass) => void;
	viewKit: (kit: Kit) => void;
	viewComplication: (complication: Complication) => void;
	onSettingChange: (setting: CampaignSetting) => void;
	onSettingDelete: (setting: CampaignSetting) => void;
	onCreateHomebrew: (type: string, settingID: string) => void;
	onImportHomebrew: (type: string, settingID: string, element: Element) => void;
}

export const SourcebookListPage = (props: Props) => {
	const [ element, setElement ] = useState<string>('Ancestry');
	const [ settingID, setSettingID ] = useState<string>(props.campaignSettings.filter(cs => cs.isHomebrew).length > 0 ? props.campaignSettings.filter(cs => cs.isHomebrew)[0].id : '');
	const [ hiddenSettingIDs, setHiddenSettingIDs ] = useState<string[]>([]);

	const setVisibility = (setting: CampaignSetting, visible: boolean) => {
		if (visible) {
			const copy = JSON.parse(JSON.stringify(hiddenSettingIDs.filter(id => id !== setting.id))) as string[];
			setHiddenSettingIDs(copy);
		} else {
			const copy = JSON.parse(JSON.stringify(hiddenSettingIDs)) as string[];
			copy.push(setting.id);
			setHiddenSettingIDs(copy);
		}
	};

	const getSettings = () => {
		return props.campaignSettings.filter(cs => !hiddenSettingIDs.includes(cs.id));
	};

	const createHomebrew = () => {
		props.onCreateHomebrew(element, settingID);
	};

	const getAncestries = () => {
		const list = AncestryData.getAncestries(getSettings());
		if (list.length === 0) {
			return (
				<div className='ds-text dimmed-text'>None</div>
			);
		}

		return (
			<div className='sourcebook-section-row'>
				{
					list.map(a => {
						const item = (
							<SelectablePanel onSelect={() => props.viewAncestry(a)}>
								<AncestryPanel key={a.id} ancestry={a} />
							</SelectablePanel>
						);

						const setting = CampaignSettingLogic.getAncestrySetting(props.campaignSettings, a);
						if (setting && setting.id) {
							return (
								<div key={a.id}>
									<Badge.Ribbon text={setting.name || 'Unnamed Setting'}>
										{item}
									</Badge.Ribbon>
								</div>
							);
						}

						return (
							<div key={a.id}>
								{item}
							</div>
						);
					})
				}
			</div>
		);
	};

	const getCultures = () => {
		const list = CultureData.getCultures(getSettings());
		if (list.length === 0) {
			return (
				<div className='ds-text dimmed-text'>None</div>
			);
		}

		return (
			<div className='sourcebook-section-row'>
				{
					list.map(c => {
						const item = (
							<SelectablePanel onSelect={() => props.viewCulture(c)}>
								<CulturePanel key={c.id} culture={c} />
							</SelectablePanel>
						);

						const setting = CampaignSettingLogic.getCultureSetting(props.campaignSettings, c);
						if (setting && setting.id) {
							return (
								<div key={c.id}>
									<Badge.Ribbon text={setting.name || 'Unnamed Setting'}>
										{item}
									</Badge.Ribbon>
								</div>
							);
						}

						return (
							<div key={c.id}>
								{item}
							</div>
						);
					})
				}
			</div>
		);
	};

	const getCareers = () => {
		const list = CareerData.getCareers(getSettings());
		if (list.length === 0) {
			return (
				<div className='ds-text dimmed-text'>None</div>
			);
		}

		return (
			<div className='sourcebook-section-row'>
				{
					list.map(c => {
						const item = (
							<SelectablePanel onSelect={() => props.viewCareer(c)}>
								<CareerPanel key={c.id} career={c} />
							</SelectablePanel>
						);
						const setting = CampaignSettingLogic.getCareerSetting(props.campaignSettings, c);
						if (setting && setting.id) {
							return (
								<div key={c.id}>
									<Badge.Ribbon text={setting.name || 'Unnamed Setting'}>
										{item}
									</Badge.Ribbon>
								</div>
							);
						}

						return (
							<div key={c.id}>
								{item}
							</div>
						);
					})
				}
			</div>
		);
	};

	const getClasses = () => {
		const list = ClassData.getClasses(getSettings());
		if (list.length === 0) {
			return (
				<div className='ds-text dimmed-text'>None</div>
			);
		}

		return (
			<div className='sourcebook-section-row'>
				{
					list.map(c => {

						const item = (
							<SelectablePanel onSelect={() => props.viewClass(c)}>
								<ClassPanel key={c.id} heroClass={c} />
							</SelectablePanel>
						);
						const setting = CampaignSettingLogic.getClassSetting(props.campaignSettings, c);
						if (setting && setting.id) {
							return (
								<div key={c.id}>
									<Badge.Ribbon text={setting.name || 'Unnamed Setting'}>
										{item}
									</Badge.Ribbon>
								</div>
							);
						}

						return (
							<div key={c.id}>
								{item}
							</div>
						);
					})
				}
			</div>
		);
	};

	const getKits = () => {
		const list = KitData.getKits(getSettings());
		if (list.length === 0) {
			return (
				<div className='ds-text dimmed-text'>None</div>
			);
		}

		return (
			<div className='sourcebook-section-row'>
				{
					list.map(k => {
						const item = (
							<SelectablePanel onSelect={() => props.viewKit(k)}>
								<KitPanel key={k.id} kit={k} />
							</SelectablePanel>
						);

						const setting = CampaignSettingLogic.getKitSetting(props.campaignSettings, k);
						if (setting && setting.id) {
							return (
								<div key={k.id}>
									<Badge.Ribbon text={setting.name || 'Unnamed Setting'}>
										{item}
									</Badge.Ribbon>
								</div>
							);
						}

						return (
							<div key={k.id}>
								{item}
							</div>
						);
					})
				}
			</div>
		);
	};

	const getComplications = () => {
		const list = ComplicationData.getComplications(getSettings());
		if (list.length === 0) {
			return (
				<div className='ds-text dimmed-text'>None</div>
			);
		}

		return (
			<div className='sourcebook-section-row'>
				{
					list.map(c => {
						const item = (
							<SelectablePanel onSelect={() => props.viewComplication(c)}>
								<ComplicationPanel key={c.id} complication={c} />
							</SelectablePanel>
						);

						const setting = CampaignSettingLogic.getComplicationSetting(props.campaignSettings, c);
						if (setting && setting.id) {
							return (
								<div key={c.id}>
									<Badge.Ribbon text={setting.name || 'Unnamed Setting'}>
										{item}
									</Badge.Ribbon>
								</div>
							);
						}

						return (
							<div key={c.id}>
								{item}
							</div>
						);
					})
				}
			</div>
		);
	};

	try {
		const elementOptions = [ 'Ancestry', 'Culture', 'Career', 'Class', 'Kit', 'Complication' ].map(e => ({ label: e, value: e }));
		const settingOptions = props.campaignSettings.filter(cs => cs.isHomebrew).map(cs => ({ label: cs.name || 'Unnamed Setting', value: cs.id }));
		settingOptions.push({ label: 'A new campaign setting', value: '' });

		return (
			<div className='sourcebook-list-page'>
				<AppHeader goHome={props.goHome} showAbout={props.showAbout}>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Select
									style={{ width: '100%' }}
									placeholder='Select'
									options={elementOptions}
									optionRender={option => <div className='ds-text'>{option.data.label}</div>}
									value={element}
									onChange={setElement}
								/>
								<Select
									style={{ width: '100%' }}
									placeholder='Select'
									options={settingOptions}
									optionRender={option => <div className='ds-text'>{option.data.label}</div>}
									value={settingID}
									onChange={setSettingID}
								/>
								<Space>
									<Button type='primary' icon={<PlusCircleOutlined />} onClick={createHomebrew}>Create</Button>
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
							Create Homebrew
						</Button>
					</Popover>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								{
									props.campaignSettings.map(cs => (
										<CampaignSettingPanel
											key={cs.id}
											setting={cs}
											visible={!hiddenSettingIDs.includes(cs.id)}
											onSetVisible={setVisibility}
											onChange={props.onSettingChange}
											onDelete={props.onSettingDelete}
										/>
									))
								}
							</div>
						)}
					>
						<Button>
							Campaign Settings
						</Button>
					</Popover>
				</AppHeader>
				<div className='sourcebook-list-page-content'>
					<div>
						<HeaderText level={1}>Ancestries</HeaderText>
						{getAncestries()}
					</div>
					<div>
						<HeaderText level={1}>Cultures</HeaderText>
						{getCultures()}
					</div>
					<div>
						<HeaderText level={1}>Careers</HeaderText>
						{getCareers()}
					</div>
					<div>
						<HeaderText level={1}>Classes</HeaderText>
						{getClasses()}
					</div>
					<div>
						<HeaderText level={1}>Kits</HeaderText>
						{getKits()}
					</div>
					<div>
						<HeaderText level={1}>Complications</HeaderText>
						{getComplications()}
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
