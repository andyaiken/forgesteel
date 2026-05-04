import { Button, Space } from 'antd';
import { Feature, FeatureToggleData } from '@/models/feature';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { InfoFeature } from '../feature';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureToggleData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoToggle = (props: InfoProps) => {
	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<div className='ds-text'>{props.data.condition}</div>
			{
				props.data.featureChecked ?
					<Expander title={props.data.featureChecked.name}>
						<InfoFeature feature={props.data.featureChecked} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />
					</Expander>
					:
					<Empty />
			}
			{
				props.data.featureUnchecked ?
					<>
						<div className='ds-text'>Otherwise:</div>
						<Expander title={props.data.featureUnchecked.name}>
							<InfoFeature feature={props.data.featureUnchecked} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />
						</Expander>
					</>
					: null
			}
		</Space>
	);
};

interface EditProps {
	data: FeatureToggleData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureToggleData) => void;
}

export const EditToggle = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureToggleData>(Utils.copy(props.data));

	const setCondition = (value: string) => {
		const copy = Utils.copy(data);
		copy.condition = value;
		setData(copy);
		props.setData(copy);
	};

	const setFeatureChecked = (value: Feature | null) => {
		const copy = Utils.copy(data);
		copy.featureChecked = value;
		setData(copy);
		props.setData(copy);
	};

	const setFeatureUnchecked = (value: Feature | null) => {
		const copy = Utils.copy(data);
		copy.featureUnchecked = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Condition</HeaderText>
			<TextInput
				status={data.condition === '' ? 'warning' : ''}
				placeholder='Condition'
				allowClear={true}
				value={data.condition}
				onChange={setCondition}
			/>
			{
				data.featureChecked ?
					<>
						<FeatureEditPanel
							feature={data.featureChecked}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={setFeatureChecked}
						/>
						<Button block={true} onClick={() => setFeatureChecked(null)}>Remove</Button>
					</>
					:
					<Button
						block={true}
						onClick={() => {
							setFeatureChecked(FactoryLogic.feature.create({
								id: Utils.guid(),
								name: '',
								description: ''
							}));
						}}
					>
						Add Checked
					</Button>
			}
			{
				data.featureUnchecked ?
					<>
						<FeatureEditPanel
							feature={data.featureUnchecked}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={setFeatureUnchecked}
						/>
						<Button block={true} onClick={() => setFeatureUnchecked(null)}>Remove</Button>
					</>
					:
					<Button
						block={true}
						onClick={() => {
							setFeatureUnchecked(FactoryLogic.feature.create({
								id: Utils.guid(),
								name: '',
								description: ''
							}));
						}}
					>
						Add Unchecked
					</Button>
			}
		</Space>
	);
};

interface ConfigProps {
	data: FeatureToggleData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureToggleData) => void;
}

export const ConfigToggle = (props: ConfigProps) => {
	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<Toggle
				label={props.data.condition}
				value={props.data.checked}
				onChange={checked => {
					const dataCopy = Utils.copy(props.data);
					dataCopy.checked = checked;
					props.setData(dataCopy);
				}}
			/>
			{
				props.data.checked && props.data.featureChecked ?
					<Expander title={props.data.featureChecked.name}>
						<InfoFeature feature={props.data.featureChecked} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />
					</Expander>
					: null
			}
			{
				!props.data.checked && props.data.featureUnchecked ?
					<Expander title={props.data.featureUnchecked.name}>
						<InfoFeature feature={props.data.featureUnchecked} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />
					</Expander>
					: null
			}
		</Space>
	);
};
