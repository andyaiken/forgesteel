import { Feature, FeatureSurgeGainData } from '@/models/feature';
import { Flex, Segmented, Select, Space } from 'antd';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Pill } from '@/components/controls/pill/pill';
import { ResourceGainFrequency } from '@/enums/resource-gain-frequency';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSurgeGainData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoSurgeGain = (props: InfoProps) => {
	// A feature panel gives no clue which resource a gain is for, so name surges here
	const unit = props.data.value === '1' ? 'surge' : 'surges';

	return (
		<div>
			<Flex align='center' justify='space-between' gap={10}>
				<div className='ds-text compact-text'>{props.data.trigger}</div>
				<Pill>+{props.data.value} {unit} {props.data.frequency !== ResourceGainFrequency.AtWill ? props.data.frequency : null}</Pill>
			</Flex>
			{
				props.data.condition ?
					<div className='ds-text compact-text'>{props.data.condition}</div>
					: null
			}
		</div>
	);
};

interface EditProps {
	data: FeatureSurgeGainData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureSurgeGainData) => void;
}

export const EditSurgeGain = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSurgeGainData>(Utils.copy(props.data));

	const setTag = (value: string) => {
		const copy = Utils.copy(data);
		copy.tag = value;
		setData(copy);
		props.setData(copy);
	};

	const setTrigger = (value: string) => {
		const copy = Utils.copy(data);
		copy.trigger = value;
		setData(copy);
		props.setData(copy);
	};

	const setValue = (value: string) => {
		const copy = Utils.copy(data);
		copy.value = value;
		setData(copy);
		props.setData(copy);
	};

	const setFrequency = (value: ResourceGainFrequency) => {
		const copy = Utils.copy(data);
		copy.frequency = value;
		setData(copy);
		props.setData(copy);
	};

	const setCondition = (value: string) => {
		const copy = Utils.copy(data);
		copy.condition = value;
		setData(copy);
		props.setData(copy);
	};

	const setReplacesTags = (value: string[]) => {
		const copy = Utils.copy(data);
		copy.replacesTags = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Tag</HeaderText>
			<TextInput
				placeholder='Tag'
				allowClear={true}
				value={data.tag}
				onChange={setTag}
			/>
			<HeaderText>Trigger</HeaderText>
			<TextInput
				status={data.trigger === '' ? 'warning' : ''}
				placeholder='Trigger'
				allowClear={true}
				value={data.trigger}
				onChange={setTrigger}
			/>
			<HeaderText>Value</HeaderText>
			<TextInput
				status={data.value === '' ? 'warning' : ''}
				placeholder='Value'
				allowClear={true}
				value={data.value}
				onChange={setValue}
			/>
			<HeaderText>Frequency</HeaderText>
			<Segmented
				name='frequency'
				block={true}
				options={[ ResourceGainFrequency.AtWill, ResourceGainFrequency.OncePerRound, ResourceGainFrequency.OncePerEncounter ].map(o => ({ value: o, label: o }))}
				value={data.frequency}
				onChange={value => setFrequency(value as ResourceGainFrequency)}
			/>
			<HeaderText>Condition</HeaderText>
			<TextInput
				placeholder='Any restriction on the surges themselves'
				allowClear={true}
				value={data.condition}
				onChange={setCondition}
			/>
			<HeaderText>Replaces Tags</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Replaces tags'
				mode='tags'
				allowClear={true}
				value={data.replacesTags}
				onChange={setReplacesTags}
			/>
		</Space>
	);
};
