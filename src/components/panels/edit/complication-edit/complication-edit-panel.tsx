import { Button, Input, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NameGenerator } from '@/utils/name-generator';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './complication-edit-panel.scss';

interface Props {
	complication: Complication;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (complication: Complication) => void;
}

export const ComplicationEditPanel = (props: Props) => {
	const [ complication, setComplication ] = useState<Complication>(props.complication);

	try {
		const getNameAndDescriptionSection = () => {
			const setName = (value: string) => {
				const copy = Utils.copy(complication);
				copy.name = value;
				setComplication(copy);
				props.onChange(copy);
			};

			const setDescription = (value: string) => {
				const copy = Utils.copy(complication);
				copy.description = value;
				setComplication(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={complication.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={complication.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={complication.description} onChange={setDescription} />
				</Space>
			);
		};

		const getFeaturesEditSection = () => {
			const addFeature = () => {
				const copy = Utils.copy(complication);
				copy.features.push(FactoryLogic.feature.create({
					id: Utils.guid(),
					name: '',
					description: ''
				}));
				setComplication(copy);
				props.onChange(copy);
			};

			const changeFeature = (feature: Feature) => {
				const copy = Utils.copy(complication);
				const index = copy.features.findIndex(f => f.id === feature.id);
				if (index !== -1) {
					copy.features[index] = feature;
				}
				setComplication(copy);
				props.onChange(copy);
			};

			const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
				const copy = Utils.copy(complication);
				const index = copy.features.findIndex(f => f.id === feature.id);
				copy.features = Collections.move(copy.features, index, direction);
				setComplication(copy);
				props.onChange(copy);
			};

			const deleteFeature = (feature: Feature) => {
				const copy = Utils.copy(complication);
				copy.features = copy.features.filter(f => f.id !== feature.id);
				setComplication(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText
						extra={
							<Button type='text' icon={<PlusOutlined />} onClick={addFeature} />
						}
					>
						Features
					</HeaderText>
					{
						complication.features.map(f => (
							<Expander
								key={f.id}
								title={f.name || 'Unnamed Feature'}
								tags={[ FeatureLogic.getFeatureTag(f) ]}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(f); }} />
								]}
							>
								<FeatureEditPanel
									feature={f}
									sourcebooks={props.sourcebooks}
									options={props.options}
									onChange={changeFeature}
								/>
							</Expander>
						))
					}
					{
						complication.features.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='complication-edit-panel'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Complication',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Features',
								children: getFeaturesEditSection()
							}
						]}
					/>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
