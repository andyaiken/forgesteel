import { Button, Input, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Ancestry } from '../../../../models/ancestry';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Feature } from '../../../../models/feature';
import { FeatureEditPanel } from '../feature-edit/feature-edit-panel';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { Options } from '../../../../models/options';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './ancestry-edit-panel.scss';

interface Props {
	ancestry: Ancestry;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (ancestry: Ancestry) => void;
}

export const AncestryEditPanel = (props: Props) => {
	const [ ancestry, setAncestry ] = useState<Ancestry>(props.ancestry);

	try {
		const getNameAndDescriptionSection = () => {
			const setName = (value: string) => {
				const copy = Utils.copy(ancestry);
				copy.name = value;
				setAncestry(copy);
				props.onChange(copy);
			};

			const setDescription = (value: string) => {
				const copy = Utils.copy(ancestry);
				copy.description = value;
				setAncestry(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={ancestry.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={ancestry.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={ancestry.description} onChange={setDescription} />
				</Space>
			);
		};

		const getFeaturesEditSection = () => {
			const addFeature = () => {
				const copy = Utils.copy(ancestry);
				copy.features.push(FactoryLogic.feature.create({
					id: Utils.guid(),
					name: '',
					description: ''
				}));
				setAncestry(copy);
				props.onChange(copy);
			};

			const changeFeature = (feature: Feature) => {
				const copy = Utils.copy(ancestry);
				const index = copy.features.findIndex(f => f.id === feature.id);
				if (index !== -1) {
					copy.features[index] = feature;
				}
				setAncestry(copy);
				props.onChange(copy);
			};

			const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
				const copy = Utils.copy(ancestry);
				const index = copy.features.findIndex(f => f.id === feature.id);
				copy.features = Collections.move(copy.features, index, direction);
				setAncestry(copy);
				props.onChange(copy);
			};

			const deleteFeature = (feature: Feature) => {
				const copy = Utils.copy(ancestry);
				copy.features = copy.features.filter(f => f.id !== feature.id);
				setAncestry(copy);
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
						ancestry.features.map(f => (
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
						ancestry.features.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='ancestry-edit-panel'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Ancestry',
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
