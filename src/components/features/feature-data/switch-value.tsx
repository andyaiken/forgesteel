import { Feature, FeatureSwitchValueData } from '@/models/feature';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSwitchValueData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoSwitchValue = (props: InfoProps) => {
	return (
		<Field label={props.data.switch} value={props.data.value} />
	);
};

interface EditProps {
	data: FeatureSwitchValueData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureSwitchValueData) => void;
}

export const EditSwitchValue = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSwitchValueData>(Utils.copy(props.data));

	const setSwitch = (value: string) => {
		const copy = Utils.copy(data);
		copy.switch = value;
		setData(copy);
		props.setData(copy);
	};

	const setValue = (value: string) => {
		const copy = Utils.copy(data);
		copy.value = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Switch</HeaderText>
			<TextInput
				status={data.switch === '' ? 'warning' : ''}
				placeholder='Switch'
				allowClear={true}
				value={data.switch}
				onChange={setSwitch}
			/>
			<HeaderText>Value</HeaderText>
			<TextInput
				status={data.value === '' ? 'warning' : ''}
				placeholder='Value'
				allowClear={true}
				value={data.value}
				onChange={setValue}
			/>
		</Space>
	);
};
