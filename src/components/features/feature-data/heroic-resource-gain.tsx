import { Feature, FeatureHeroicResourceGainData } from '@/models/feature';
import { Flex, Select, Space } from 'antd';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Pill } from '@/components/controls/pill/pill';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureHeroicResourceGainData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoHeroicResourceGain = (props: InfoProps) => {
	return (
		<>
			<div className='ds-text'></div>
			<Flex align='center' justify='space-between' gap={10}>
				<div className='ds-text compact-text'>{props.data.trigger}</div>
				<Pill>+{props.data.value}</Pill>
			</Flex>
		</>
	);
};

interface EditProps {
	data: FeatureHeroicResourceGainData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureHeroicResourceGainData) => void;
}

export const EditHeroicResourceGain = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureHeroicResourceGainData>(Utils.copy(props.data));

	const setHeroicResourceGainTag = (data: FeatureHeroicResourceGainData, value: string) => {
		const copy = Utils.copy(data);
		copy.tag = value;
		setData(copy);
		props.setData(copy);
	};

	const setHeroicResourceGainTrigger = (data: FeatureHeroicResourceGainData, value: string) => {
		const copy = Utils.copy(data);
		copy.trigger = value;
		setData(copy);
		props.setData(copy);
	};

	const setHeroicResourceGainValue = (data: FeatureHeroicResourceGainData, value: string) => {
		const copy = Utils.copy(data);
		copy.value = value;
		setData(copy);
		props.setData(copy);
	};

	const setHeroicResourceGainReplacesTags = (data: FeatureHeroicResourceGainData, value: string[]) => {
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
				onChange={value => setHeroicResourceGainTag(data, value)}
			/>
			<HeaderText>Trigger</HeaderText>
			<TextInput
				status={data.value === '' ? 'warning' : ''}
				placeholder='Trigger'
				allowClear={true}
				value={data.trigger}
				onChange={value => setHeroicResourceGainTrigger(data, value)}
			/>
			<HeaderText>Value</HeaderText>
			<TextInput
				status={data.value === '' ? 'warning' : ''}
				placeholder='Value'
				allowClear={true}
				value={data.value}
				onChange={value => setHeroicResourceGainValue(data, value)}
			/>
			<HeaderText>Replaces Tags</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Replaces tags'
				mode='tags'
				allowClear={true}
				value={data.replacesTags}
				onChange={value => setHeroicResourceGainReplacesTags(data, value)}
			/>
		</Space>
	);
};
