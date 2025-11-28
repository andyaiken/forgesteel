import { Button, Input, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Title } from '@/models/title';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './title-edit-panel.scss';

interface Props {
	title: Title;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (title: Title) => void;
}

export const TitleEditPanel = (props: Props) => {
	const [ title, setTitle ] = useState<Title>(props.title);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(title);
			copy.name = value;
			setTitle(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(title);
			copy.description = value;
			setTitle(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						status={title.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={title.name}
						onChange={e => setName(e.target.value)}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={title.description} onChange={setDescription} />
			</Space>
		);
	};

	const getTitleEditSection = () => {
		const setEchelon = (value: number) => {
			const copy = Utils.copy(title);
			copy.echelon = value;
			setTitle(copy);
			props.onChange(copy);
		};

		const setPrerequisites = (value: string) => {
			const copy = Utils.copy(title);
			copy.prerequisites = value;
			setTitle(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Echelon</HeaderText>
				<NumberSpin min={1} max={4} value={title.echelon} onChange={setEchelon} />
				<HeaderText>Prerequisites</HeaderText>
				<Input
					placeholder='Prerequisites'
					allowClear={true}
					value={title.prerequisites}
					onChange={e => setPrerequisites(e.target.value)}
				/>
			</Space>
		);
	};

	const getFeaturesEditSection = () => {
		const addFeature = () => {
			const copy = Utils.copy(title);
			copy.features.push(FactoryLogic.feature.create({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setTitle(copy);
			props.onChange(copy);
		};

		const changeFeature = (feature: Feature) => {
			const copy = Utils.copy(title);
			const index = copy.features.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				copy.features[index] = feature;
			}
			setTitle(copy);
			props.onChange(copy);
		};

		const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
			const copy = Utils.copy(title);
			const index = copy.features.findIndex(f => f.id === feature.id);
			copy.features = Collections.move(copy.features, index, direction);
			setTitle(copy);
			props.onChange(copy);
		};

		const deleteFeature = (feature: Feature) => {
			const copy = Utils.copy(title);
			copy.features = copy.features.filter(f => f.id !== feature.id);
			setTitle(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addFeature} />
					}
				>
					Features
				</HeaderText>
				{
					title.features.map(f => (
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
					title.features.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	return (
		<ErrorBoundary>
			<div className='title-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Title',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Details',
							children: getTitleEditSection()
						},
						{
							key: '3',
							label: 'Features',
							children: getFeaturesEditSection()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
