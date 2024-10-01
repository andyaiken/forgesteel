import { Button, Select, Space } from 'antd';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { Characteristic } from '../../../enums/characteristic';
import { Condition } from '../../../models/hero';
import { ConditionLogic } from '../../../logic/condition-logic';
import { Utils } from '../../../utils/utils';
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

	const setConditionResist = (characteristic: Characteristic) => {
		if (props.onChange) {
			const copy = JSON.parse(JSON.stringify(condition)) as Condition;
			copy.resistCharacteristic = characteristic;
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
		let ends = condition.ends.toString();
		if (condition.ends === ConditionEndType.ResistanceEnds) {
			ends = `${condition.resistCharacteristic} resistance ends`;
		}

		return (
			<div className='condition-panel'>
				{
					isEditing ?
						<Space direction='vertical' style={{ width: '100%' }}>
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
								options={[ ConditionEndType.EndOfTurn, ConditionEndType.EndOfEncounter, ConditionEndType.ResistanceEnds ].map(o => ({ label: o, value: o }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={condition.ends}
								onChange={setConditionEndType}
							/>
							<Select
								style={{ width: '100%' }}
								placeholder='Select'
								disabled={condition.ends !== ConditionEndType.ResistanceEnds}
								options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(o => ({ label: o, value: o }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={condition.resistCharacteristic}
								onChange={setConditionResist}
							/>
						</Space>
						:
						<div>
							<div className='ds-text'>{condition.type} ({ends})</div>
							<div className='ds-text description-text' dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(ConditionLogic.getDescription(condition.type)) }} />
						</div>
				}
				<div className='action-buttons'>
					{
						props.onChange && !isEditing ?
							<Button title='Edit' icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
							: null
					}
					{
						props.onChange && isEditing ?
							<Button title='Done' icon={<CheckOutlined />} onClick={() => setIsEditing(false)} />
							: null
					}
					{
						props.onDelete ?
							<Button title='Delete' icon={<DeleteOutlined />} onClick={deleteCondition} />
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
