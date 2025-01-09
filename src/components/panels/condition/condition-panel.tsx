import { Button, Select, Space } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { Condition } from '../../../models/hero';
import { ConditionLogic } from '../../../logic/condition-logic';
import { Markdown } from '../../controls/markdown/markdown';
import { useState } from 'react';

import './condition-panel.scss';

interface Props {
	condition: Condition;
	onChange?: (condition: Condition) => void;
	onDelete?: (condition: Condition) => void;
}

export const ConditionPanel = (props: Props) => {
	const [ condition, setCondition ] = useState<Condition>(JSON.parse(JSON.stringify(props.condition)));
	const [ isEditing, setIsEditing ] = useState<boolean>(false);

	const setConditionType = (type: ConditionType) => {
		if (props.onChange) {
			const copy = JSON.parse(JSON.stringify(condition)) as Condition;
			copy.type = type;
			setCondition(copy);
			props.onChange(copy);
		}
	};

	const setConditionEndType = (ends: ConditionEndType) => {
		if (props.onChange) {
			const copy = JSON.parse(JSON.stringify(condition)) as Condition;
			copy.ends = ends;
			setCondition(copy);
			props.onChange(copy);
		}
	};

	const deleteCondition = () => {
		if (props.onDelete) {
			props.onDelete(condition);
		}
	};

	try {
		return (
			<div className='condition-panel'>
				{
					isEditing ?
						<Space direction='vertical' style={{ width: '100%', margin: '5px 0' }}>
							<Select
								style={{ width: '100%' }}
								placeholder='Select'
								options={[ ConditionType.Bleeding, ConditionType.Dazed, ConditionType.Frightened, ConditionType.Grabbed, ConditionType.Prone, ConditionType.Restrained, ConditionType.Slowed, ConditionType.Taunted, ConditionType.Weakened ].map(o => ({ label: o, value: o }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={condition.type}
								onChange={setConditionType}
							/>
							<Select
								style={{ width: '100%' }}
								placeholder='Select'
								options={[ ConditionEndType.EndOfTurn, ConditionEndType.EndOfEncounter, ConditionEndType.SaveEnds ].map(o => ({ label: o, value: o }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={condition.ends}
								onChange={setConditionEndType}
							/>
						</Space>
						:
						<div>
							<div className='ds-text bold-text'>{condition.type} ({condition.ends})</div>
							<Markdown text={ConditionLogic.getDescription(condition.type)} />
						</div>
				}
				<div className='action-buttons'>
					{
						props.onChange && !isEditing ?
							<Button type='text' title='Edit' icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
							: null
					}
					{
						props.onDelete && !isEditing ?
							<Button type='text' title='Delete' icon={<DeleteOutlined />} onClick={deleteCondition} />
							: null
					}
					{
						props.onChange && isEditing ?
							<Button type='text' title='Done' icon={<CheckCircleOutlined />} onClick={() => setIsEditing(false)} />
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
