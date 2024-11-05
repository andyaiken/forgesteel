import { Button, Input, Popover } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, ThunderboltOutlined, UploadOutlined } from '@ant-design/icons';
import { CampaignSetting } from '../../../models/campaign-setting';
import { CampaignSettingLogic } from '../../../logic/campaign-setting-logic';
import { NameGenerator } from '../../../utils/name-generator';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './campaign-setting-panel.scss';

interface Props {
	setting: CampaignSetting;
	visible: boolean;
	onSetVisible: (setting: CampaignSetting, visible: boolean) => void;
	onChange: (setting: CampaignSetting) => void;
	onDelete: (setting: CampaignSetting) => void;
}

export const CampaignSettingPanel = (props: Props) => {
	const [ setting, setSetting ] = useState<CampaignSetting>(JSON.parse(JSON.stringify(props.setting)));
	const [ isEditing, setIsEditing ] = useState<boolean>(false);

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	const onExport = () => {
		Utils.export(setting.id, setting.name || 'Unnamed Collection', setting, 'setting', 'json');
	};

	const onDelete = () => {
		props.onDelete(setting);
	};

	const setName = (name: string) => {
		const copy = JSON.parse(JSON.stringify(setting)) as CampaignSetting;
		copy.name = name;
		setSetting(copy);
		props.onChange(copy);
	};

	try {
		return (
			<div className='campaign-setting-panel' id={setting.id}>
				{
					isEditing ?
						<div>
							<Input
								placeholder='Name'
								allowClear={true}
								addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
								value={setting.name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						:
						<div>
							<div className='ds-text bold-text'>{setting.name || 'Unnamed Collection'}</div>
							<div className='ds-text description-text'>{CampaignSettingLogic.getElementCount(setting)} elements</div>
							{setting.isHomebrew ? <div className='ds-text description-text'>Homebrew</div> : null}
						</div>
				}
				<div className='action-buttons'>
					{
						!isEditing ?
							<Button type='text' title='Show / Hide' icon={props.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />} onClick={() => props.onSetVisible(setting, !props.visible)} />
							: null
					}
					{
						setting.isHomebrew && !isEditing ?
							<Button type='text' title='Edit' icon={<EditOutlined />} onClick={toggleEditing} />
							: null
					}
					{
						setting.isHomebrew && isEditing ?
							<Button type='text' title='OK' icon={<CheckCircleOutlined />} onClick={toggleEditing} />
							: null
					}
					{
						setting.isHomebrew && !isEditing ?
							<Button type='text' title='Export' icon={<UploadOutlined />} onClick={onExport} />
							: null
					}
					{
						setting.isHomebrew && isEditing ?
							<Popover
								trigger='click'
								placement='bottom'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<div>This can't be undone; are you sure?</div>
										<Button danger={true} onClick={onDelete}>Delete</Button>
									</div>
								)}
							>
								<Button type='text' title='Delete' icon={<DeleteOutlined />} />
							</Popover>
							: null
					}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
