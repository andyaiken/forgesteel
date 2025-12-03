import { Feature, FeatureTaggedFeatureChoiceData } from '@/models/feature';
import { Input, Select, Space } from 'antd';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureTaggedFeatureChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoTaggedFeatureChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.selected.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} />)
				}
			</Space>
		);
	}

	if (!props.feature.description) {
		return (
			<div className='ds-text'>Choose {props.data.count > 1 ? props.data.count : 'a'} '{props.data.tag}' {props.data.count > 1 ? 'features' : 'feature'}.</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureTaggedFeatureChoiceData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureTaggedFeatureChoiceData) => void;
}

export const EditTaggedFeatureChoice = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureTaggedFeatureChoiceData>(Utils.copy(props.data));

	const setTag = (value: string) => {
		const copy = Utils.copy(data);
		copy.tag = value;
		setData(copy);
		props.setData(copy);
	};

	const setCount = (value: number) => {
		const copy = Utils.copy(data);
		copy.count = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Tag</HeaderText>
			<Input
				status={data.tag === '' ? 'warning' : ''}
				placeholder='Tag'
				allowClear={true}
				value={data.tag}
				onChange={e => setTag(e.target.value)}
			/>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
		</Space>
	);
};

interface ConfigProps {
	data: FeatureTaggedFeatureChoiceData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureTaggedFeatureChoiceData) => void;
}

export const ConfigTaggedFeatureChoice = (props: ConfigProps) => {
	const currentTaggedFeatureIDs = HeroLogic.getFeatures(props.hero)
		.map(f => f.feature)
		.filter(f => f.id !== props.feature.id)
		.filter(f => f.type === FeatureType.TaggedFeatureChoice)
		.filter(f => f.data.tag === props.data.tag)
		.flatMap(f => f.data.selected)
		.map(p => p.id);

	const features = HeroLogic.getFeatures(props.hero)
		.map(f => f.feature)
		.filter(f => f.type === FeatureType.TaggedFeature)
		.filter(f => f.data.tag === props.data.tag);
	const sortedFeatures = Collections.sort(features, f => f.name);

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{props.data.count > 1 ? <div className='ds-text'>Choose {props.data.count}:</div> : null}
			{
				sortedFeatures.length > 0 ?
					<Select
						style={{ width: '100%' }}
						status={props.data.selected.length < props.data.count ? 'warning' : ''}
						mode={props.data.count === 1 ? undefined : 'multiple'}
						maxCount={props.data.count === 1 ? undefined : props.data.count}
						allowClear={true}
						placeholder={props.data.count === 1 ? 'Select a feature' : 'Select features'}
						options={sortedFeatures.map(f => ({ label: f.name, value: f.id, desc: f.description || f.type, disabled: currentTaggedFeatureIDs.includes(f.id) }))}
						optionRender={option => <Field disabled={option.data.disabled} label={option.data.label} value={option.data.desc} />}
						value={props.data.count === 1 ? (props.data.selected.length > 0 ? props.data.selected[0].id : null) : props.data.selected.map(k => k.id)}
						onChange={value => {
							let ids: string[] = [];
							if (props.data.count === 1) {
								ids = value !== undefined ? [ value as string ] : [];
							} else {
								ids = value as string[];
							}
							const dataCopy = Utils.copy(props.data);
							dataCopy.selected = [];
							ids.forEach(id => {
								const feature = features.find(f => f.id === id);
								if (feature) {
									dataCopy.selected.push(feature);
								}
							});
							props.setData(dataCopy);
						}}
					/>
					:
					<Empty text='There are no options to choose for this feature.' />
			}
			{
				props.data.selected.map(feature => {
					return (
						<FeaturePanel key={feature.id} feature={feature} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
					);
				})
			}
		</Space>
	);
};
