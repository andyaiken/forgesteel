import { Feature, FeaturePotencyResistanceData } from '@/models/feature';
import { Select, Space } from 'antd';
import { Characteristic } from '@/enums/characteristic';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeaturePotencyResistanceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoPotencyResistance = (props: InfoProps) => {
	const characteristics = props.data.characteristics.length > 0 ? props.data.characteristics.join(', ') : 'All characteristics';

	return (
		<Field label='Resisting potencies' value={`${characteristics} +${props.data.value}`} />
	);
};

interface EditProps {
	data: FeaturePotencyResistanceData;
	sourcebooks: Sourcebook[];
	setData: (data: FeaturePotencyResistanceData) => void;
}

export const EditPotencyResistance = (props: EditProps) => {
	const [ data, setData ] = useState<FeaturePotencyResistanceData>(Utils.copy(props.data));

	const setCharacteristics = (value: Characteristic[]) => {
		const copy = Utils.copy(data);
		copy.characteristics = value;
		setData(copy);
		props.setData(copy);
	};

	const setValue = (value: number) => {
		const copy = Utils.copy(data);
		copy.value = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Characteristics</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Any characteristic'
				mode='multiple'
				allowClear={true}
				options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(o => ({ value: o }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.characteristics}
				onChange={setCharacteristics}
			/>
			<HeaderText>Value</HeaderText>
			<NumberSpin min={1} value={data.value} onChange={setValue} />
		</Space>
	);
};
