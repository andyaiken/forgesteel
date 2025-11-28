import { Button, Input, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Career } from '@/models/career';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Element } from '@/models/element';
import { ElementEditPanel } from '@/components/panels/edit/element-edit/element-edit-panel';
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
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './career-edit-panel.scss';

interface Props {
	career: Career;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (career: Career) => void;
}

export const CareerEditPanel = (props: Props) => {
	const [ career, setCareer ] = useState<Career>(props.career);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(career);
			copy.name = value;
			setCareer(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(career);
			copy.description = value;
			setCareer(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						status={career.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={career.name}
						onChange={e => setName(e.target.value)}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={career.description} onChange={setDescription} />
			</Space>
		);
	};

	const getFeaturesEditSection = () => {
		const addFeature = () => {
			const copy = Utils.copy(career);
			copy.features.push(FactoryLogic.feature.create({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setCareer(copy);
			props.onChange(copy);
		};

		const changeFeature = (feature: Feature) => {
			const copy = Utils.copy(career);
			const index = copy.features.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				copy.features[index] = feature;
			}
			setCareer(copy);
			props.onChange(copy);
		};

		const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
			const copy = Utils.copy(career);
			const index = copy.features.findIndex(f => f.id === feature.id);
			copy.features = Collections.move(copy.features, index, direction);
			setCareer(copy);
			props.onChange(copy);
		};

		const deleteFeature = (feature: Feature) => {
			const copy = Utils.copy(career);
			copy.features = copy.features.filter(f => f.id !== feature.id);
			setCareer(copy);
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
					career.features.map(f => (
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
					career.features.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getIncitingIncidentsSection = () => {
		const addIncident = () => {
			const copy = Utils.copy(career);
			copy.incitingIncidents.options.push({
				id: Utils.guid(),
				name: '',
				description: ''
			});
			setCareer(copy);
			props.onChange(copy);
		};

		const changeIncident = (e: Element) => {
			const copy = Utils.copy(career);
			const index = copy.incitingIncidents.options.findIndex(o => o.id === e.id);
			if (index !== -1) {
				copy.incitingIncidents.options[index] = e;
			}
			setCareer(copy);
			props.onChange(copy);
		};

		const moveIncident = (e: Element, direction: 'up' | 'down') => {
			const copy = Utils.copy(career);
			const index = copy.incitingIncidents.options.findIndex(o => o.id === e.id);
			copy.incitingIncidents.options = Collections.move(copy.incitingIncidents.options, index, direction);
			setCareer(copy);
			props.onChange(copy);
		};

		const deleteIncident = (e: Element) => {
			const copy = Utils.copy(career);
			copy.incitingIncidents.options = copy.incitingIncidents.options.filter(o => o.id !== e.id);
			setCareer(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addIncident} />
					}
				>
					Inciting Incidents
				</HeaderText>
				{
					career.incitingIncidents.options.map(o => (
						<Expander
							key={o.id}
							title={o.name || 'Unnamed Incident'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveIncident(o, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveIncident(o, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteIncident(o); }} />
							]}
						>
							<ElementEditPanel
								element={o}
								onChange={changeIncident}
							/>
						</Expander>
					))
				}
				{
					career.incitingIncidents.options.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	return (
		<ErrorBoundary>
			<div className='career-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Career',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Features',
							children: getFeaturesEditSection()
						},
						{
							key: '3',
							label: 'Inciting Incidents',
							children: getIncitingIncidentsSection()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
