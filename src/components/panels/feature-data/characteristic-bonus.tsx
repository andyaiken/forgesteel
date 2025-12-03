import { Feature, FeatureCharacteristicBonusData } from '@/models/feature';
import { Select, Space } from 'antd';
import { Characteristic } from '@/enums/characteristic';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureCharacteristicBonusData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoCharacteristicBonus = (props: InfoProps) => {
	return (
		<Field label={props.data.characteristic} value={props.data.value} />
	);
};

interface EditProps {
	data: FeatureCharacteristicBonusData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureCharacteristicBonusData) => void;
}

export const EditCharacteristicBonus = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureCharacteristicBonusData>(Utils.copy(props.data));

	const setCharacteristic = (value: Characteristic) => {
		const copy = Utils.copy(data);
		copy.characteristic = value;
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
			<HeaderText>Characteristic</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select field'
				options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(o => ({ value: o, label: <div className='ds-text'>{o}</div> }))}
				value={data.characteristic}
				onChange={setCharacteristic}
			/>
			<HeaderText>Value</HeaderText>
			<NumberSpin label='Value' min={0} value={data.value} onChange={setValue} />
		</Space>
	);
};
