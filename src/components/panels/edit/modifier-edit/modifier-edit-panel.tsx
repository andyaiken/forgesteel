import { Characteristic } from '@/enums/characteristic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Modifier } from '@/models/damage-modifier';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Select } from 'antd';

import './modifier-edit-panel.scss';

interface ModifierProps {
	modifier: Modifier;
	setValue: (value: number) => void;
	setValuePerLevel: (value: number) => void;
	setValuePerEchelon: (value: number) => void;
	setValueCharacteristics: (value: Characteristic[]) => void;
}

export const ModifierEditor = (props: ModifierProps) => {
	return (
		<ErrorBoundary>
			<div className='modifier-edit-panel'>
				<NumberSpin label='Value' value={props.modifier.value} onChange={props.setValue} />
				<NumberSpin label='Per Level After 1st' value={props.modifier.valuePerLevel} onChange={props.setValuePerLevel} />
				<NumberSpin label='Per Echelon' value={props.modifier.valuePerEchelon} onChange={props.setValuePerEchelon} />
				<Select
					style={{ width: '100%' }}
					placeholder='Characteristics'
					mode='multiple'
					options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={props.modifier.valueCharacteristics}
					onChange={props.setValueCharacteristics}
				/>
			</div>
		</ErrorBoundary>
	);
};
