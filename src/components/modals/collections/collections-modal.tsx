import { Button, Divider, Space, Upload } from 'antd';
import { CampaignSetting } from '../../../models/campaign-setting';
import { CampaignSettingPanel } from '../../panels/campaign-setting-panel/campaign-setting-panel';
import { DownloadOutlined } from '@ant-design/icons';
import { FactoryLogic } from '../../../logic/factory-logic';
import { useState } from 'react';

import './collections-modal.scss';

interface Props {
	officialSettings: CampaignSetting[];
	homebrewSettings: CampaignSetting[];
	hiddenSettingIDs: string[];
	onSettingsChange: (campaignSettings: CampaignSetting[]) => void;
	setHiddenSettingIDs: (ids: string[]) => void;
}

export const CollectionsModal = (props: Props) => {
	const [ homebrewSettings, setHomebrewSettings ] = useState<CampaignSetting[]>(JSON.parse(JSON.stringify(props.homebrewSettings)) as CampaignSetting[]);
	const [ hiddenSettingIDs, setHiddenSettingIDs ] = useState<string[]>(JSON.parse(JSON.stringify(props.hiddenSettingIDs)) as string[]);

	try {
		const createSetting = () => {
			const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
			const setting = FactoryLogic.createCampaignSetting();
			copy.push(setting);
			setHomebrewSettings(copy);
			props.onSettingsChange(copy);
		};

		const changeSetting = (setting: CampaignSetting) => {
			const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
			const index = copy.findIndex(cs => cs.id === setting.id);
			if (index !== -1) {
				copy[index] = setting;
				setHomebrewSettings(copy);
				props.onSettingsChange(copy);
			}
		};

		const deleteSetting = (setting: CampaignSetting) => {
			const copy = JSON.parse(JSON.stringify(homebrewSettings.filter(cs => cs.id !== setting.id))) as CampaignSetting[];
			setHomebrewSettings(copy);
			props.onSettingsChange(copy);
		};

		const importSetting = (setting: CampaignSetting) => {
			const copy = JSON.parse(JSON.stringify(homebrewSettings)) as CampaignSetting[];
			copy.push(setting);
			setHomebrewSettings(copy);
			props.onSettingsChange(copy);
		};

		const setVisibility = (setting: CampaignSetting, visible: boolean) => {
			if (visible) {
				const copy = JSON.parse(JSON.stringify(hiddenSettingIDs.filter(id => id !== setting.id))) as string[];
				setHiddenSettingIDs(copy);
				props.setHiddenSettingIDs(copy);
			} else {
				const copy = JSON.parse(JSON.stringify(hiddenSettingIDs)) as string[];
				copy.push(setting.id);
				setHiddenSettingIDs(copy);
				props.setHiddenSettingIDs(copy);
			}
		};

		return (
			<div className='collections-modal'>
				{
					[ ...props.officialSettings, ...homebrewSettings ].map(cs => (
						<CampaignSettingPanel
							key={cs.id}
							setting={cs}
							visible={!hiddenSettingIDs.includes(cs.id)}
							onSetVisible={setVisibility}
							onChange={changeSetting}
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
									importSetting(setting);
								});
							return false;
						}}
					>
						<Button block={true} icon={<DownloadOutlined />}>Import a collection</Button>
					</Upload>
				</Space>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
