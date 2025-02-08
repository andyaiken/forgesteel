import { ConditionLogic } from '../../../logic/condition-logic';
import { ConditionType } from '../../../enums/condition-type';
import { HeaderText } from '../../controls/header-text/header-text';
import { Modal } from '../modal/modal';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Space } from 'antd';

import './conditions-modal.scss';

interface Props {
	onSelect: (condition: ConditionType) => void;
}

export const ConditionsModal = (props: Props) => {
	try {
		const conditions = [
			ConditionType.Bleeding,
			ConditionType.Dazed,
			ConditionType.Frightened,
			ConditionType.Grabbed,
			ConditionType.Prone,
			ConditionType.Restrained,
			ConditionType.Slowed,
			ConditionType.Taunted,
			ConditionType.Weakened
		];

		return (
			<Modal
				content={
					<div className='conditions-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								conditions.map(c => (
									<SelectablePanel
										key={c}
										onSelect={() => props.onSelect(c)}
									>
										<HeaderText>{c}</HeaderText>
										<div className='ds-text'>{ConditionLogic.getDescription(c)}</div>
									</SelectablePanel>
								))
							}
						</Space>
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
