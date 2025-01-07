import { Button, Input, Space } from 'antd';
import { CheckCircleOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, ThunderboltOutlined, UploadOutlined } from '@ant-design/icons';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { NameGenerator } from '../../../../utils/name-generator';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './sourcebook-panel.scss';

interface Props {
	sourcebook: Sourcebook;
	visible: boolean;
	onSetVisible: (sourcebook: Sourcebook, visible: boolean) => void;
	onChange: (sourcebook: Sourcebook) => void;
	onDelete: (sourcebook: Sourcebook) => void;
}

export const SourcebookPanel = (props: Props) => {
	const [ sourcebook, setSourcebook ] = useState<Sourcebook>(JSON.parse(JSON.stringify(props.sourcebook)));
	const [ isEditing, setIsEditing ] = useState<boolean>(false);

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	const onExport = () => {
		Utils.export([ sourcebook.id ], sourcebook.name || 'Unnamed Sourcebook', sourcebook, 'sourcebook', 'json');
	};

	const onDelete = () => {
		props.onDelete(sourcebook);
	};

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(sourcebook)) as Sourcebook;
		copy.name = value;
		setSourcebook(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(sourcebook)) as Sourcebook;
		copy.description = value;
		setSourcebook(copy);
		props.onChange(copy);
	};

	try {
		return (
			<div className={isEditing ? 'sourcebook-panel editing' : 'sourcebook-panel'} id={sourcebook.id}>
				{
					isEditing ?
						<Space direction='vertical' style={{ width: '100%' }}>
							<Input
								className={sourcebook.name === '' ? 'input-empty' : ''}
								placeholder='Name'
								allowClear={true}
								addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
								value={sourcebook.name}
								onChange={e => setName(e.target.value)}
							/>
							<Input
								placeholder='Description'
								allowClear={true}
								value={sourcebook.description}
								onChange={e => setDescription(e.target.value)}
							/>
						</Space>
						:
						<div style={{ width: '100%' }}>
							<HeaderText tags={sourcebook.isHomebrew ? [ 'Homebrew' ] : []}>{sourcebook.name || 'Unnamed Sourcebook'}</HeaderText>
							<Markdown text={props.sourcebook.description} />
							<div className='ds-text'>{SourcebookLogic.getElementCount(sourcebook)} elements</div>
						</div>
				}
				<div className='action-buttons'>
					{
						!isEditing ?
							<Button type='text' title='Show / Hide' icon={props.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />} onClick={() => props.onSetVisible(sourcebook, !props.visible)} />
							: null
					}
					{
						sourcebook.isHomebrew && !isEditing ?
							<Button type='text' title='Edit' icon={<EditOutlined />} onClick={toggleEditing} />
							: null
					}
					{
						sourcebook.isHomebrew && isEditing ?
							<Button type='text' title='OK' icon={<CheckCircleOutlined />} onClick={toggleEditing} />
							: null
					}
					{
						sourcebook.isHomebrew && !isEditing ?
							<Button type='text' title='Export' icon={<UploadOutlined />} onClick={onExport} />
							: null
					}
					{
						sourcebook.isHomebrew && isEditing ?
							<DangerButton mode='icon' onConfirm={onDelete} />
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
