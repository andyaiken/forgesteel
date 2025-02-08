import { Segmented, Space } from 'antd';
import { Condition } from '../../../models/hero';
import { ConditionEndType } from '../../../enums/condition-type';
import { ConditionLogic } from '../../../logic/condition-logic';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { HeaderText } from '../../controls/header-text/header-text';
import { Markdown } from '../../controls/markdown/markdown';
import { useState } from 'react';

import './condition-panel.scss';

interface Props {
	condition: Condition;
	onChange: (condition: Condition) => void;
	onDelete: (condition: Condition) => void;
}

export const ConditionPanel = (props: Props) => {
	const [ condition, setCondition ] = useState<Condition>(JSON.parse(JSON.stringify(props.condition)));

	const setConditionEndType = (ends: ConditionEndType) => {
		if (props.onChange) {
			const copy = JSON.parse(JSON.stringify(condition)) as Condition;
			copy.ends = ends;
			setCondition(copy);
			props.onChange(copy);
		}
	};

	try {
		return (
			<div className='condition-panel'>
				<Space direction='vertical' style={{ width: '100%', margin: '5px 0' }}>
					<HeaderText>{condition.type}</HeaderText>
					<Segmented
						block={true}
						options={[ ConditionEndType.EndOfTurn, ConditionEndType.SaveEnds ]}
						value={condition.ends}
						onChange={setConditionEndType}
					/>
					<Markdown text={ConditionLogic.getDescription(condition.type)} />
				</Space>
				<div className='action-buttons'>
					<DangerButton mode='icon' onConfirm={() => props.onDelete(condition)} />
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
