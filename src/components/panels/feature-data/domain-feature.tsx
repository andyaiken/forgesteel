import { Alert, Select, Space } from 'antd';
import { Feature, FeatureDomainFeatureData } from '@/models/feature';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
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
	data: FeatureDomainFeatureData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoDomainFeature = (props: InfoProps) => {
	if (props.data.selected.length === 0) {
		return null;
	}

	if (!props.feature.description) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.selected.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} />)
				}
			</Space>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureDomainFeatureData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureDomainFeatureData) => void;
}

export const EditDomainFeature = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureDomainFeatureData>(Utils.copy(props.data));

	const setLevel = (value: number) => {
		const copy = Utils.copy(data);
		copy.level = value;
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
			<HeaderText>Level</HeaderText>
			<NumberSpin min={1} value={data.level} onChange={setLevel} />
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
		</Space>
	);
};

interface ConfigProps {
	data: FeatureDomainFeatureData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureDomainFeatureData) => void;
}

export const ConfigDomainFeature = (props: ConfigProps) => {
	const options: Feature[] = [];
	HeroLogic.getDomains(props.hero).forEach(d => {
		d.featuresByLevel
			.filter(lvl => lvl.level === props.data.level)
			.forEach(lvl => options.push(...lvl.features));
	});

	if (options.length === 0) {
		return (
			<Alert
				type='info'
				showIcon={true}
				title='Choose a domain to enable this feature.'
			/>
		);
	}

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{props.data.count > 1 ? <div className='ds-text'>Choose {props.data.count}:</div> : null}
			<Select
				style={{ width: '100%' }}
				status={props.data.selected.length < props.data.count ? 'warning' : ''}
				mode={props.data.count === 1 ? undefined : 'multiple'}
				maxCount={props.data.count === 1 ? undefined : props.data.count}
				allowClear={true}
				placeholder={props.data.count === 1 ? 'Select an option' : 'Select options'}
				options={options.map(o => ({ label: o.name, value: o.id, desc: o.description }))}
				optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
				value={props.data.count === 1 ? (props.data.selected.length > 0 ? props.data.selected[0].id : null) : props.data.selected.map(f => f.id)}
				onChange={value => {
					let ids: string[] = [];
					if (props.data.count === 1) {
						ids = value !== undefined ? [ value as string ] : [];
					} else {
						ids = value as string[];
					}
					const features: Feature[] = [];
					ids.forEach(id => {
						const option = options.find(o => o.id === id);
						if (option) {
							const featureCopy = Utils.copy(option) as Feature;
							features.push(featureCopy);
						}
					});
					const dataCopy = Utils.copy(props.data);
					dataCopy.selected = features;
					props.setData(dataCopy);
				}}
			/>
			{
				props.data.selected.map(f => (
					<FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
				))
			}
		</Space>
	);
};
