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
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NameGenerator } from '@/utils/name-generator';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { SubClass } from '@/models/subclass';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './subclass-edit-panel.scss';

interface Props {
	subClass: SubClass;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (subClass: SubClass) => void;
}

export const SubClassEditPanel = (props: Props) => {
	const [ subClass, setSubClass ] = useState<SubClass>(props.subClass);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(subClass);
			copy.name = value;
			setSubClass(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(subClass);
			copy.description = value;
			setSubClass(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					status={subClass.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
					value={subClass.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine value={subClass.description} onChange={setDescription} />
			</Space>
		);
	};

	const getFeaturesByLevelEditSection = () => {
		const addFeature = (level: number) => {
			const copy = Utils.copy(subClass);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features.push(FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					}));
				});
			setSubClass(copy);
			props.onChange(copy);
		};

		const changeFeature = (level: number, feature: Feature) => {
			const copy = Utils.copy(subClass);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.id === feature.id);
					if (index !== -1) {
						lvl.features[index] = feature;
					}
				});
			setSubClass(copy);
			props.onChange(copy);
		};

		const moveFeature = (level: number, feature: Feature, direction: 'up' | 'down') => {
			const copy = Utils.copy(subClass);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.id === feature.id);
					lvl.features = Collections.move(lvl.features, index, direction);
				});
			setSubClass(copy);
			props.onChange(copy);
		};

		const deleteFeature = (level: number, feature: Feature) => {
			const copy = Utils.copy(subClass);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features = lvl.features.filter(f => f.id !== feature.id);
				});
			setSubClass(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					subClass.featuresByLevel.map(lvl => (
						<div key={lvl.level}>
							<HeaderText
								extra={
									<Button type='text' icon={<PlusOutlined />} onClick={() => addFeature(lvl.level)} />
								}
							>
								Level {lvl.level.toString()}
							</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									lvl.features.map(f => (
										<Expander
											key={f.id}
											title={f.name || 'Unnamed Feature'}
											tags={[ FeatureLogic.getFeatureTag(f) ]}
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(lvl.level, f); }} />
											]}
										>
											<FeatureEditPanel
												feature={f}
												sourcebooks={props.sourcebooks}
												options={props.options}
												onChange={feature => changeFeature(lvl.level, feature)}
											/>
										</Expander>
									))
								}
								{
									lvl.features.length === 0 ?
										<Empty />
										: null
								}
							</Space>
						</div>
					))
				}
			</Space>
		);
	};

	return (
		<ErrorBoundary>
			<div className='subclass-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Subclass',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Levels',
							children: getFeaturesByLevelEditSection()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
