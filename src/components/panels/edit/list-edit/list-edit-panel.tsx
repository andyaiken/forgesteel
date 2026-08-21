import { Ability, isAbility } from '@/models/ability';
import { Button, Drawer, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownloadOutlined, PlusOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Feature, isFeature } from '@/models/feature';
import { useBuiltInSourcebooks, useOptions } from '@/contexts/data-context';
import { AbilityEditPanel } from '@/components/panels/edit/ability-edit/ability-edit-panel';
import { AbilitySelectModal } from '@/components/modals/select/ability-select/ability-select-modal';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { FeatureTypeSelectModal } from '@/components/modals/select/feature-type-select/feature-type-select-modal';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useClipboard } from '@/hooks/use-clipboard';
import { useState } from 'react';

import './list-edit-panel.scss';

interface AbilityListEditPanelProps {
	abilities: Ability[];
	onChange: (abilities: Ability[]) => void;
}

export const AbilityListEditPanel = (props: AbilityListEditPanelProps) => {
	const [ abilities, setAbilities ] = useState(Utils.copy(props.abilities));
	const [ browserOpen, setBrowserOpen ] = useState<boolean>(false);
	const options = useOptions();
	const clipboard = useClipboard();

	const sourcebooks = useBuiltInSourcebooks();
	const allAbilities = Collections.sort(sourcebooks.flatMap(SourcebookLogic.getAllAbilities), a => a.name);

	const addAbility = () => {
		const copy = Utils.copy(abilities);
		copy.push(FactoryLogic.createAbility({
			id: Utils.guid(),
			name: '',
			description: '',
			type: FactoryLogic.type.createMain(),
			keywords: [],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '',
			sections: []
		}));
		setAbilities(copy);
		props.onChange(copy);
	};

	const importAbility = (ability: Ability) => {
		const abilityCopy = Utils.copy(ability);
		abilityCopy.id = Utils.guid();

		const copy = Utils.copy(abilities);
		copy.push(abilityCopy);
		setAbilities(copy);
		props.onChange(copy);
	};

	const pasteAbility = () => {
		const ability = clipboard.getData(isAbility);
		if (ability) {
			ability.id = Utils.guid();

			const copy = Utils.copy(abilities);
			copy.push(ability);
			setAbilities(copy);
			props.onChange(copy);
		}
	};

	const changeAbility = (ability: Ability) => {
		const copy = Utils.copy(abilities);
		const index = copy.findIndex(a => a.id === ability.id);
		if (index !== -1) {
			copy[index] = ability;
		}
		setAbilities(copy);
		props.onChange(copy);
	};

	const moveAbility = (ability: Ability, direction: 'up' | 'down') => {
		let copy = Utils.copy(abilities);
		const index = copy.findIndex(a => a.id === ability.id);
		copy = Collections.move(copy, index, direction);
		setAbilities(copy);
		props.onChange(copy);
	};

	const deleteAbility = (ability: Ability) => {
		let copy = Utils.copy(abilities);
		copy = copy.filter(a => a.id !== ability.id);
		setAbilities(copy);
		props.onChange(copy);
	};

	return (
		<div className='ability-list-edit-panel'>
			<HeaderText
				extra={
					<ButtonGroup
						buttons={[
							{ type: 'button', icon: <PlusOutlined />, tooltip: 'Add', onClick: addAbility },
							{ type: 'button', icon: <DownloadOutlined />, tooltip: 'Copy an existing ability', onClick: () => setBrowserOpen(true) },
							options.showClipboardOptions ?
								{
									type: 'button',
									icon: <SnippetsOutlined />,
									tooltip: clipboard.hasData(isAbility) ? `Paste ${clipboard.getData(isAbility)?.name || 'Unknown Ability'}` : 'Paste Ability',
									disabled: !clipboard.hasData(isAbility),
									onClick: pasteAbility
								}
								: null
						]}
					/>
				}
			>
				Abilities
			</HeaderText>
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					abilities.map(a => (
						<Expander
							key={a.id}
							title={a.name || 'Unnamed Ability'}
							tags={[ a.type.usage ]}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveAbility(a, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveAbility(a, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteAbility(a); }} />
							]}
						>
							<AbilityEditPanel
								ability={a}
								onChange={changeAbility}
							/>
						</Expander>
					))
				}
				{
					abilities.length === 0 ?
						<Empty />
						: null
				}
			</Space>
			<Drawer open={browserOpen} onClose={() => setBrowserOpen(false)} closeIcon={null} size={500}>
				<AbilitySelectModal
					abilities={allAbilities}
					showFilter={true}
					onSelect={a => {
						importAbility(a);
						setBrowserOpen(false);
					}}
					onClose={() => setBrowserOpen(false)}
				/>
			</Drawer>
		</div>
	);
};

interface FeatureListEditPanelProps {
	title: string;
	features: Feature[];
	allowedTypes?: FeatureType[];
	sourcebooks: Sourcebook[];
	onChange: (features: Feature[]) => void;
}

export const FeatureListEditPanel = (props: FeatureListEditPanelProps) => {
	const [ features, setFeatures ] = useState(Utils.copy(props.features));
	const [ typeSelectorVisible, setTypeSelectorVisible ] = useState<boolean>(false);
	const options = useOptions();
	const clipboard = useClipboard();

	const addFeature = (type: FeatureType) => {
		const f = {
			id: Utils.guid(),
			name: type,
			description: '',
			type: type,
			data: FeatureLogic.getFeatureData(type)
		} as Feature;

		const copy = Utils.copy(features);
		copy.push(f);
		setFeatures(copy);
		props.onChange(copy);
	};

	const pasteFeature = () => {
		const feature = clipboard.getData(isFeature);
		if (feature) {
			FeatureLogic.changeFeatureIDs(feature);

			const copy = Utils.copy(features);
			copy.push(feature);
			setFeatures(copy);
			props.onChange(copy);
		}
	};

	const changeFeature = (feature: Feature) => {
		const copy = Utils.copy(features);
		const index = copy.findIndex(f => f.id === feature.id);
		if (index !== -1) {
			copy[index] = feature;
		}
		setFeatures(copy);
		props.onChange(copy);
	};

	const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
		let copy = Utils.copy(features);
		const index = copy.findIndex(f => f.id === feature.id);
		copy = Collections.move(copy, index, direction);
		setFeatures(copy);
		props.onChange(copy);
	};

	const deleteFeature = (feature: Feature) => {
		let copy = Utils.copy(features);
		copy = copy.filter(f => f.id !== feature.id);
		setFeatures(copy);
		props.onChange(copy);
	};

	return (
		<>
			<div className='feature-list-edit-panel'>
				<HeaderText
					extra={
						<ButtonGroup
							buttons={[
								{ type: 'button', icon: <PlusOutlined />, tooltip: 'Add', onClick: () => setTypeSelectorVisible(true) },
								options.showClipboardOptions ?
									{
										type: 'button',
										icon: <SnippetsOutlined />,
										tooltip: clipboard.hasData(isFeature) ? `Paste ${clipboard.getData(isFeature)?.name || 'Unknown Feature'}` : 'Paste Feature',
										disabled: !clipboard.hasData(isFeature),
										onClick: pasteFeature
									}
									: null
							]}
						/>
					}
				>
					{props.title}
				</HeaderText>
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						features.map(f => (
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
									allowedTypes={props.allowedTypes}
									sourcebooks={props.sourcebooks}
									onChange={feature => changeFeature(feature)}
								/>
							</Expander>
						))
					}
					{
						features.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			</div>
			<Drawer open={typeSelectorVisible} onClose={() => setTypeSelectorVisible(false)} closeIcon={null} size={500}>
				<FeatureTypeSelectModal
					types={props.allowedTypes || FeatureLogic.getSelectableFeatureTypes()}
					onSelect={type => { addFeature(type); setTypeSelectorVisible(false); }}
					onClose={() => setTypeSelectorVisible(false)}
				/>
			</Drawer>
		</>
	);
};
