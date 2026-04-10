import { Button, Flex, Select, Space, Tabs } from 'antd';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityLogic } from '@/logic/ability-logic';
import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureListEditPanel } from '@/components/panels/edit/feature-list-edit/feature-list-edit-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Item } from '@/models/item';
import { ItemPanel } from '@/components/panels/elements/item-panel/item-panel';
import { ItemType } from '@/enums/item-type';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Project } from '@/models/project';
import { ProjectEditPanel } from '@/components/panels/edit/project-edit/project-edit';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './item-edit-panel.scss';

interface Props {
	item: Item;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onChange: (item: Item) => void;
}

export const ItemEditPanel = (props: Props) => {
	const [ item, setItem ] = useState<Item>(props.item);
	const [ revision, setRevision ] = useState<number>(0);

	const updateItem = (value: Item) => {
		setItem(value);
		setRevision(revision + 1);
		props.onChange(value);
	};

	const getNameAndDescriptionSection = () => {
		const onChange = (name: string, desc: string) => {
			const copy = Utils.copy(item);
			copy.name = name;
			copy.description = desc;
			updateItem(copy);
			props.onChange(copy);
		};

		return (
			<NameDescEditPanel
				element={item}
				onChange={onChange}
			/>
		);
	};

	const getItemDetailsEditSection = () => {
		const setType = (value: ItemType) => {
			const copy = Utils.copy(item);
			copy.type = value;
			updateItem(copy);
			props.onChange(copy);
		};

		const setKeywords = (value: (AbilityKeyword | KitArmor | KitWeapon)[]) => {
			const copy = Utils.copy(item);
			copy.keywords = value;
			updateItem(copy);
			props.onChange(copy);
		};

		const setEffect = (value: string) => {
			const copy = Utils.copy(item);
			copy.effect = value;
			updateItem(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Item Type</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Type'
					options={[ ItemType.Artifact, ItemType.Consumable1st, ItemType.Consumable2nd, ItemType.Consumable3rd, ItemType.Consumable4th, ItemType.LeveledArmor, ItemType.LeveledImplement, ItemType.LeveledWeapon, ItemType.Leveled, ItemType.Trinket1st, ItemType.Trinket2nd, ItemType.Trinket3rd, ItemType.Trinket4th ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={item.type}
					onChange={setType}
				/>
				<HeaderText>Keywords</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Keywords'
					mode='tags'
					allowClear={true}
					options={AbilityLogic.getKeywords().map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={item.keywords}
					onChange={setKeywords}
				/>
				<HeaderText>Effect</HeaderText>
				<MarkdownEditor value={item.effect} onChange={setEffect} />
			</Space>
		);
	};

	const getFeaturesByLevelEditSection = () => {
		const onChange = (level: number, features: Feature[]) => {
			const copy = Utils.copy(item);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => lvl.features = Utils.copy(features));
			updateItem(copy);
			props.onChange(copy);
		};

		const onAddLevel = (level: number) => {
			const copy = Utils.copy(item);
			copy.featuresByLevel.push({ level, features: [] });
			copy.featuresByLevel = Collections.sort(copy.featuresByLevel, lvl => `${lvl.level}`);
			updateItem(copy);
			props.onChange(copy);
		};

		const currentLevels = item.featuresByLevel.map(lvl => lvl.level);
		const extraLevels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].filter(lvl => !currentLevels.includes(lvl));

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					item.featuresByLevel.map(lvl => (
						<FeatureListEditPanel
							key={lvl.level}
							title={`Level ${lvl.level}`}
							features={lvl.features}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={features => onChange(lvl.level, features)}
						/>
					))
				}
				{
					extraLevels.length > 0 ?
						<>
							<HeaderText>Add a Level</HeaderText>
							<Flex align='center' justify='space-between' gap={5}>
								{extraLevels.map(lvl => <Button key={lvl} onClick={() => onAddLevel(lvl)}>Level {lvl}</Button>)}
							</Flex>
						</>
						: null
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
			updateItem(copy);
			props.onChange(copy);
		};

		const setCrafting = (value: Project) => {
			const copy = Utils.copy(item);
			copy.crafting = Utils.copy(value);
			updateItem(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<Toggle label='Can be crafted' value={!!item.crafting} onChange={setCraftable} />
				{
					item.crafting ?
						<ProjectEditPanel
							project={item.crafting}
							includeNameAndDescription={false}
							sourcebooks={props.sourcebooks}
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
				<div className='item-workspace-column'>
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
				{
					props.mode === PanelMode.Full ?
						<div className='item-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<ItemPanel
													key={revision}
													item={item}
													sourcebooks={props.sourcebooks}
													options={props.options}
													mode={PanelMode.Full}
												/>
											</SelectablePanel>
										)
									}
								]}
							/>
						</div>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
