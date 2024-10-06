import { Button, Input, Popover } from 'antd';
import { DeleteOutlined, EditOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { CampaignSetting } from '../../../models/campaign-setting';
import { NameGenerator } from '../../../utils/name-generator';
import { useState } from 'react';

import './campaign-setting-panel.scss';

interface Props {
	setting: CampaignSetting;
	onChange: (setting: CampaignSetting) => void;
	onDelete: (setting: CampaignSetting) => void;
}

export const CampaignSettingPanel = (props: Props) => {
	const [ setting, setSetting ] = useState<CampaignSetting>(JSON.parse(JSON.stringify(props.setting)));
	const [ isEditing, setIsEditing ] = useState<boolean>(false);

	const toggleEditing = () => {
		setIsEditing(!isEditing);
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
						<Input
							placeholder='Name'
							allowClear={true}
							addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
							value={setting.name}
							onChange={e => setName(e.target.value)}
						/>
						:
						<div className='ds-text'>{props.setting.name || 'Unnamed Setting'}</div>
				}
				<div className='action-buttons'>
					{
						setting.isHomebrew ?
							<Button type='text' title='Edit' icon={<EditOutlined />} onClick={toggleEditing} />
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
