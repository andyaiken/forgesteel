import { Button, Drawer, Empty, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Feature, FeatureSwitchOptionsData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { FeatureTypeSelectModal } from '@/components/modals/select/feature-type-select/feature-type-select-modal';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { InfoFeature } from '../feature';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSwitchOptionsData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoSwitchOptions = (props: InfoProps) => {
	const getDescription = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.Text:
				return <Markdown text={feature.description} />;
			default:
				return <InfoFeature feature={feature} hero={props.hero} sourcebooks={props.sourcebooks} options={props.options} />;
		}
	};

	if (props.hero) {
		const featureValue = HeroLogic.getFeatures(props.hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.SwitchValue)
			.find(f => f.data.switch === props.data.switch);
		if (featureValue) {
			const option = props.data.options.find(o => o.value === featureValue.data.value);
			return option ? getDescription(option.feature) : (props.data.defaultOption ? getDescription(props.data.defaultOption) : null);
		}
	}

	return (
		<>
			<Field label='Switch' value={props.data.switch} />
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.options.map(f => (
						<Expander key={f.feature.id} title={f.value}>
							{getDescription(f.feature)}
						</Expander>
					))
				}
				{props.data.options.length === 0 ? <Empty /> : null}
				{
					props.data.defaultOption ?
						<>
							<HeaderText>Default Option</HeaderText>
							{getDescription(props.data.defaultOption)}
						</>
						: null
				}
			</Space>
		</>
	);
};

interface EditProps {
	data: FeatureSwitchOptionsData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureSwitchOptionsData) => void;
}

export const EditSwitchOptions = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSwitchOptionsData>(Utils.copy(props.data));
	const [ typeSelectorVisible, setTypeSelectorVisible ] = useState<boolean>(false);

	const setSwitch = (value: string) => {
		const copy = Utils.copy(data);
		copy.switch = value;
		setData(copy);
		props.setData(copy);
	};

	const setSwitchValue = (index: number, value: string) => {
		const copy = Utils.copy(data);
		copy.options[index].value = value;
		setData(copy);
		props.setData(copy);
	};

	const addFeature = (type: FeatureType) => {
		const f = {
			id: Utils.guid(),
			name: '',
			description: '',
			type: type,
			data: FeatureLogic.getFeatureData(type)
		} as Feature;

		const copy = Utils.copy(data);
		copy.options.push({ value: '', feature: f });
		setData(copy);
		props.setData(copy);
	};

	const changeFeature = (index: number, value: Feature) => {
		const copy = Utils.copy(data);
		copy.options[index].feature = value;
		setData(copy);
		props.setData(copy);
	};

	const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
		const copy = Utils.copy(data);
		const index = copy.options.findIndex(f => f.feature.id === feature.id);
		copy.options = Collections.move(copy.options, index, direction);
		setData(copy);
		props.setData(copy);
	};

	const deleteFeature = (feature: Feature) => {
		const copy = Utils.copy(data);
		copy.options = copy.options.filter(f => f.feature.id !== feature.id);
		setData(copy);
		props.setData(copy);
	};

	const setHasDefaultOption = (value: boolean) => {
		const copy = Utils.copy(data);
		copy.defaultOption = value ? FactoryLogic.feature.create({ id: Utils.guid(), name: '', description: '' }) : null;
		setData(copy);
		props.setData(copy);
	};

	const changeDefaultOption = (value: Feature) => {
		const copy = Utils.copy(data);
		copy.defaultOption = value;
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
			<HeaderText
				extra={
					<Button type='text' icon={<PlusOutlined />} onClick={() => setTypeSelectorVisible(true)} />
				}
			>
				Features
			</HeaderText>
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					data.options.map((f, n) => (
						<Expander
							key={f.feature.id}
							title={f.value || '(no switch value)'}
							tags={[ FeatureLogic.getFeatureTag(f.feature) ]}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f.feature, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f.feature, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(f.feature); }} />
							]}
						>
							<HeaderText>Switch Value</HeaderText>
							<TextInput
								status={f.value === '' ? 'warning' : ''}
								placeholder='Switch'
								allowClear={true}
								value={f.value}
								onChange={value => setSwitchValue(n, value)}
							/>
							<FeatureEditPanel
								feature={f.feature}
								allowedTypes={FeatureLogic.getSelectableFeatureTypes()}
								sourcebooks={props.sourcebooks}
								options={props.options}
								onChange={feature => changeFeature(n, feature)}
							/>
						</Expander>
					))
				}
				{
					data.options.length === 0 ?
						<Empty />
						: null
				}
			</Space>
			<HeaderText>Default Option</HeaderText>
			<Toggle
				label='Has Default Option'
				value={data.defaultOption !== null}
				onChange={setHasDefaultOption}
			/>
			{
				data.defaultOption ?
					<FeatureEditPanel
						feature={data.defaultOption}
						allowedTypes={FeatureLogic.getSelectableFeatureTypes()}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={changeDefaultOption}
					/>
					: null
			}
			<Drawer open={typeSelectorVisible} onClose={() => setTypeSelectorVisible(false)} closeIcon={null} size={500}>
				<FeatureTypeSelectModal
					types={FeatureLogic.getSelectableFeatureTypes()}
					onSelect={type => { addFeature(type); setTypeSelectorVisible(false); }}
					onClose={() => setTypeSelectorVisible(false)}
				/>
			</Drawer>
		</Space>
	);
};
