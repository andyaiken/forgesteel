import { Badge, Button, Divider, Input, Popover, Select, Space, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CampaignSetting } from '../../../../models/campaign-setting';
import { CampaignSettingLogic } from '../../../../logic/campaign-setting-logic';
import { CampaignSettingPanel } from '../../../panels/campaign-setting-panel/campaign-setting-panel';
import { MonsterGroup } from '../../../../models/monster';
import { MonsterGroupData } from '../../../../data/monster-group-data';
import { MonsterGroupPanel } from '../../../panels/monster-group-panel/monster-group-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './monster-list.scss';

interface Props {
	campaignSettings: CampaignSetting[];
	hiddenSettingIDs: string[];
	goHome: () => void;
	showAbout: () => void;
	viewMonsterGroup: (monsterGroup: MonsterGroup) => void;
	onSettingCreate: () => CampaignSetting;
	onSettingChange: (setting: CampaignSetting) => void;
	onSettingDelete: (setting: CampaignSetting) => void;
	onCreateHomebrew: (type: string, settingID: string | null) => void;
	onImportHomebrew: (type: string, settingID: string | null, monsterGroup: MonsterGroup) => void;
	onImportSetting: (setting: CampaignSetting) => void;
	setHiddenSettingIDs: (ids: string[]) => void;
}

export const MonsterListPage = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');
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
		props.onCreateHomebrew('Monster Group', settingID);
	};

	const getMonsterGroups = () => {
		return MonsterGroupData
			.getMonsterGroups(getSettings())
			.filter(item => Utils.textMatches([
				item.name,
				...item.information.map(f => f.name),
				...item.monsters.map(m => m.name)
			], searchTerm));
	};

	const getMonsterGroupsSection = (list: MonsterGroup[]) => {
		if (list.length === 0) {
			return (
				<div className='ds-text dimmed-text'>None</div>
			);
		}

		return (
			<div className='monster-section-row'>
				{
					list.map(mg => {
						const item = (
							<SelectablePanel key={mg.id} onSelect={() => props.viewMonsterGroup(mg)}>
								<MonsterGroupPanel monsterGroup={mg} />
							</SelectablePanel>
						);

						const setting = CampaignSettingLogic.getMonsterGroupSetting(props.campaignSettings, mg);
						if (setting && setting.id) {
							return (
								<Badge.Ribbon key={mg.id} text={setting.name || 'Unnamed Collection'}>
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
		const settingOptions = props.campaignSettings.filter(cs => cs.isHomebrew).map(cs => ({ label: cs.name || 'Unnamed Collection', value: cs.id }));

		const monsterGroups = getMonsterGroups();

		return (
			<div className='monster-list-page'>
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
								{ settingOptions.length > 1 ? <Divider /> : null }
								<Space>
									<Button block={true} icon={<PlusCircleOutlined />} onClick={createHomebrew}>Create</Button>
									<div className='ds-text'>or</div>
									<Upload
										style={{ width: '100%' }}
										accept='.drawsteel-monster-group'
										showUploadList={false}
										beforeUpload={file => {
											file
												.text()
												.then(json => {
													const mg = (JSON.parse(json) as MonsterGroup);
													props.onImportHomebrew('Monster Group', settingID, mg);
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
											mode='monsters'
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
				<div className='monster-list-page-content'>
					{getMonsterGroupsSection(monsterGroups)}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
