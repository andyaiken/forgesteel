import { Button, Input, Select, Space, Tabs } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Imbuement } from '@/models/imbuement';
import { ItemType } from '@/enums/item-type';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Project } from '@/models/project';
import { ProjectEditPanel } from '@/components/panels/edit/project-edit/project-edit';
import { Sourcebook } from '@/models/sourcebook';
import { ThunderboltOutlined } from '@ant-design/icons';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './imbuement-edit-panel.scss';

interface Props {
	imbuement: Imbuement;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (imbuemenet: Imbuement) => void;
}

export const ImbuementEditPanel = (props: Props) => {
	const [ imbuement, setImbuement ] = useState<Imbuement>(props.imbuement);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(imbuement);
			copy.name = value;
			setImbuement(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(imbuement);
			copy.description = value;
			setImbuement(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						status={imbuement.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={imbuement.name}
						onChange={e => setName(e.target.value)}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={imbuement.description} onChange={setDescription} />
			</Space>
		);
	};

	const getImbuementEditSection = () => {
		const setLevel = (value: number) => {
			const copy = Utils.copy(imbuement);
			copy.level = value;
			setImbuement(copy);
			props.onChange(copy);
		};

		const setType = (value: ItemType) => {
			const copy = Utils.copy(imbuement);
			copy.type = value;
			setImbuement(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Level</HeaderText>
				<NumberSpin min={1} max={9} steps={[ 4 ]} value={imbuement.level} onChange={setLevel} />
				<HeaderText>Item Type</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Type'
					options={[ ItemType.ImbuedArmor, ItemType.ImbuedImplement, ItemType.ImbuedWeapon ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={imbuement.type}
					onChange={setType}
				/>
			</Space>
		);
	};

	const getCraftingEditSection = () => {
		const setCraftable = (value: boolean) => {
			const copy = Utils.copy(imbuement);
			copy.crafting = value ?
				FactoryLogic.createProject({ id: `${imbuement.id}-crafting`, name: `Imbue ${imbuement.name}`, description: imbuement.name })
				: null;
			setImbuement(copy);
			props.onChange(copy);
		};

		const setCrafting = (value: Project) => {
			const copy = Utils.copy(imbuement);
			copy.crafting = Utils.copy(value);
			setImbuement(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<Toggle label='Can be crafted' value={!!imbuement.crafting} onChange={setCraftable} />
				{
					imbuement.crafting ?
						<ProjectEditPanel
							project={imbuement.crafting}
							includeNameAndDescription={false}
							onChange={setCrafting}
						/>
						: null
				}
			</Space>
		);
	};

	const getFeatureEditSection = () => {
		const changeFeature = (feature: Feature) => {
			const copy = Utils.copy(imbuement);
			copy.feature = feature;
			setImbuement(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>
					Feature
				</HeaderText>
				<FeatureEditPanel
					feature={imbuement.feature}
					sourcebooks={props.sourcebooks}
					options={props.options}
					onChange={changeFeature}
				/>
			</Space>
		);
	};

	return (
		<ErrorBoundary>
			<div className='imbuement-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'imbuement',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Details',
							children: getImbuementEditSection()
						},
						{
							key: '3',
							label: 'Crafting',
							children: getCraftingEditSection()
						},
						{
							key: '4',
							label: 'Feature',
							children: getFeatureEditSection()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
