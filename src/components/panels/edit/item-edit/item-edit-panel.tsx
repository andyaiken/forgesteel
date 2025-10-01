import { Button, Input, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityLogic } from '@/logic/ability-logic';
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
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NameGenerator } from '@/utils/name-generator';
import { Options } from '@/models/options';
import { Project } from '@/models/project';
import { ProjectEditPanel } from '@/components/panels/edit/project-edit/project-edit';
import { Sourcebook } from '@/models/sourcebook';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './item-edit-panel.scss';

interface Props {
	item: Item;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (item: Item) => void;
}

export const ItemEditPanel = (props: Props) => {
	const [ item, setItem ] = useState<Item>(props.item);

	try {
		const getNameAndDescriptionSection = () => {
			const setName = (value: string) => {
				const copy = Utils.copy(item);
				copy.name = value;
				setItem(copy);
				props.onChange(copy);
			};

			const setDescription = (value: string) => {
				const copy = Utils.copy(item);
				copy.description = value;
				setItem(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={item.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={item.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={item.description} onChange={setDescription} />
				</Space>
			);
		};

		const getItemDetailsEditSection = () => {
			const setType = (value: ItemType) => {
				const copy = Utils.copy(item);
				copy.type = value;
				setItem(copy);
				props.onChange(copy);
			};

			const setKeywords = (value: (AbilityKeyword | KitArmor | KitWeapon)[]) => {
				const copy = Utils.copy(item);
				copy.keywords = value;
				setItem(copy);
				props.onChange(copy);
			};

			const setEffect = (value: string) => {
				const copy = Utils.copy(item);
				copy.effect = value;
				setItem(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Item Type</HeaderText>
					<Select
						style={{ width: '100%' }}
						placeholder='Type'
						options={[ ItemType.Artifact, ItemType.Consumable, ItemType.LeveledArmor, ItemType.LeveledImplement, ItemType.LeveledWeapon, ItemType.Leveled, ItemType.Trinket1st, ItemType.Trinket2nd, ItemType.Trinket3rd, ItemType.Trinket4th ].map(option => ({ value: option }))}
						optionRender={option => <div className='ds-text'>{option.data.value}</div>}
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.value
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						value={item.type}
						onChange={setType}
					/>
					<HeaderText>Keywords</HeaderText>
					<Select
						style={{ width: '100%' }}
						placeholder='Keywords'
						mode='multiple'
						allowClear={true}
						options={AbilityLogic.getKeywords().map(option => ({ value: option }))}
						optionRender={option => <div className='ds-text'>{option.data.value}</div>}
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.value
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						value={item.keywords}
						onChange={setKeywords}
					/>
					<HeaderText>Effect</HeaderText>
					<MultiLine value={item.effect} onChange={setEffect} />
				</Space>
			);
		};

		const getFeaturesByLevelEditSection = () => {
			const addFeature = (level: number) => {
				const copy = Utils.copy(item);
				copy.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						lvl.features.push(FactoryLogic.feature.create({
							id: Utils.guid(),
							name: '',
							description: ''
						}));
					});
				setItem(copy);
				props.onChange(copy);
			};

			const changeFeature = (level: number, feature: Feature) => {
				const copy = Utils.copy(item);
				copy.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						const index = lvl.features.findIndex(f => f.id === feature.id);
						if (index !== -1) {
							lvl.features[index] = feature;
						}
					});
				setItem(copy);
				props.onChange(copy);
			};

			const moveFeature = (level: number, feature: Feature, direction: 'up' | 'down') => {
				const copy = Utils.copy(item);
				copy.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						const index = lvl.features.findIndex(f => f.id === feature.id);
						lvl.features = Collections.move(lvl.features, index, direction);
					});
				setItem(copy);
				props.onChange(copy);
			};

			const deleteFeature = (level: number, feature: Feature) => {
				const copy = Utils.copy(item);
				copy.featuresByLevel
					.filter(lvl => lvl.level === level)
					.forEach(lvl => {
						lvl.features = lvl.features.filter(f => f.id !== feature.id);
					});
				setItem(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						item.featuresByLevel.map(lvl => (
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

		const getCraftingEditSection = () => {
			const setCraftable = (value: boolean) => {
				const copy = Utils.copy(item);
				copy.crafting = value ?
					FactoryLogic.createProject({ id: `${item.id}-crafting`, name: `Craft ${item.name}`, description: item.name })
					: null;
				setItem(copy);
				props.onChange(copy);
			};

			const setCrafting = (value: Project) => {
				const copy = Utils.copy(item);
				copy.crafting = Utils.copy(value);
				setItem(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<Toggle label='Can be crafted' value={!!item.crafting} onChange={setCraftable} />
					{
						item.crafting ?
							<ProjectEditPanel
								project={item.crafting}
								includeNameAndDescription={false}
								onChange={setCrafting}
							/>
							: null
					}
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='item-edit-panel'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Item',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getItemDetailsEditSection()
							},
							{
								key: '3',
								label: 'Crafting',
								children: getCraftingEditSection()
							},
							{
								key: '4',
								label: 'Levels',
								children: getFeaturesByLevelEditSection()
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
