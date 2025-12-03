import { Button, Empty, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Feature, FeatureMultipleData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureMultipleData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoMultiple = (props: InfoProps) => {
	if (props.data.features.length === 0) {
		return null;
	}

	return (
		<div>
			{
				props.data.features.map(f => (
					<div key={f.id} className='container'>
						<FeaturePanel feature={f} options={props.options} mode={PanelMode.Full} />
					</div>
				))
			}
		</div>
	);
};

interface EditProps {
	data: FeatureMultipleData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureMultipleData) => void;
}

export const EditMultiple = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureMultipleData>(Utils.copy(props.data));

	const addMultipleFeature = (data: FeatureMultipleData) => {
		const copy = Utils.copy(data);
		copy.features.push(FactoryLogic.feature.create({
			id: Utils.guid(),
			name: '',
			description: ''
		}));
		setData(copy);
		props.setData(copy);
	};

	const moveMultipleFeature = (data: FeatureMultipleData, index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(data);
		copy.features = Collections.move(copy.features, index, direction);
		setData(copy);
		props.setData(copy);
	};

	const deleteMultipleFeature = (data: FeatureMultipleData, index: number) => {
		const copy = Utils.copy(data);
		copy.features.splice(index, 1);
		setData(copy);
		props.setData(copy);
	};

	const setMultipleFeature = (data: FeatureMultipleData, index: number, value: Feature) => {
		const copy = Utils.copy(data);
		copy.features[index] = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText
				extra={
					<Button type='text' icon={<PlusOutlined />} onClick={() => addMultipleFeature(data)} />
				}
			>
				Features
			</HeaderText>
			{
				data.features.map((feature, n) => (
					<Expander
						key={feature.id}
						title={feature.name}
						extra={[
							<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMultipleFeature(data, n, 'up'); }} />,
							<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMultipleFeature(data, n, 'down'); }} />,
							<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMultipleFeature(data, n); }} />
						]}
					>
						<FeatureEditPanel
							feature={feature}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={f => setMultipleFeature(data, n, f)}
						/>
					</Expander>
				))
			}
			{
				data.features.length === 0 ?
					<Empty />
					: null
			}
		</Space>
	);
};
