import { Button, Input, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Ancestry } from '@/models/ancestry';
import { Collections } from '@/utils/collections';
import { Culture } from '@/models/culture';
import { CultureEditPanel } from '@/components/panels/edit/culture-edit/culture-edit-panel';
import { CultureType } from '@/enums/culture-type';
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
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
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
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						status={ancestry.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={ancestry.name}
						onChange={e => setName(e.target.value)}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={ancestry.description} onChange={setDescription} />
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
			<Space orientation='vertical' style={{ width: '100%' }}>
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

	const getAncestryPointsEditSection = () => {
		const setPoints = (value: number) => {
			const copy = Utils.copy(ancestry);
			copy.ancestryPoints = value;
			setAncestry(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Ancestry Points</HeaderText>
				<NumberSpin min={1} value={ancestry.ancestryPoints} onChange={setPoints} />
			</Space>
		);
	};

	const getCultureEditSection = () => {
		const setHasCulture = (value: boolean) => {
			const copy = Utils.copy(ancestry);
			copy.culture = value ? FactoryLogic.createCulture(ancestry.name, '', CultureType.Ancestral) : undefined;
			setAncestry(copy);
			props.onChange(copy);
		};

		const setCulture = (value: Culture) => {
			const copy = Utils.copy(ancestry);
			copy.culture = value;
			setAncestry(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Culture</HeaderText>
				<Toggle label='Include a culture' value={!!ancestry.culture} onChange={setHasCulture} />
				{
					ancestry.culture ?
						<CultureEditPanel culture={ancestry.culture} sourcebooks={props.sourcebooks} onChange={setCulture} />
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
						},
						{
							key: '3',
							label: 'Ancestry Points',
							children: getAncestryPointsEditSection()
						},
						{
							key: '4',
							label: 'Culture',
							children: getCultureEditSection()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
