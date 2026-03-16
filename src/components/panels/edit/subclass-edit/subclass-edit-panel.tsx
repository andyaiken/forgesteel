import { Button, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Ability } from '@/models/ability';
import { AbilityEditPanel } from '@/components/panels/edit/ability-edit/ability-edit-panel';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureListEditPanel } from '@/components/panels/edit/feature-list-edit/feature-list-edit-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SubClass } from '@/models/subclass';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './subclass-edit-panel.scss';

interface Props {
	subClass: SubClass;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onChange: (subClass: SubClass) => void;
}

export const SubClassEditPanel = (props: Props) => {
	const [ subClass, setSubClass ] = useState<SubClass>(props.subClass);

	const getNameAndDescriptionSection = () => {
		const onChange = (name: string, desc: string) => {
			const copy = Utils.copy(subClass);
			copy.name = name;
			copy.description = desc;
			setSubClass(copy);
			props.onChange(copy);
		};

		return (
			<NameDescEditPanel
				element={subClass}
				onChange={onChange}
			/>
		);
	};

	const getFeaturesByLevelEditSection = () => {
		const onChange = (level: number, features: Feature[]) => {
			const copy = Utils.copy(subClass);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => lvl.features = Utils.copy(features));
			setSubClass(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					subClass.featuresByLevel.map(lvl => (
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
			</Space>
		);
	};

	const getAbilitiesEditSection = () => {
		const addAbility = () => {
			const copy = Utils.copy(subClass);
			copy.abilities.push(FactoryLogic.createAbility({
				id: Utils.guid(),
				name: '',
				description: '',
				type: FactoryLogic.type.createMain(),
				keywords: [],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '',
				sections: []
			}));
			setSubClass(copy);
			props.onChange(copy);
		};

		const changeAbility = (ability: Ability) => {
			const copy = Utils.copy(subClass);
			const index = copy.abilities.findIndex(a => a.id === ability.id);
			if (index !== -1) {
				copy.abilities[index] = ability;
			}
			setSubClass(copy);
			props.onChange(copy);
		};

		const moveAbility = (ability: Ability, direction: 'up' | 'down') => {
			const copy = Utils.copy(subClass);
			const index = copy.abilities.findIndex(a => a.id === ability.id);
			copy.abilities = Collections.move(copy.abilities, index, direction);
			setSubClass(copy);
			props.onChange(copy);
		};

		const deleteAbility = (ability: Ability) => {
			const copy = Utils.copy(subClass);
			copy.abilities = copy.abilities.filter(a => a.id !== ability.id);
			setSubClass(copy);
			props.onChange(copy);
		};

		return (
			<>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addAbility} />
					}
				>
					Abilities
				</HeaderText>
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						subClass.abilities.map(a => (
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
						subClass.abilities.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			</>
		);
	};

	return (
		<ErrorBoundary>
			<div className='subclass-edit-panel'>
				<div className='subclass-workspace-column'>
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
							},
							{
								key: '3',
								label: 'Abilities',
								children: getAbilitiesEditSection()
							}
						]}
					/>
				</div>
				{
					props.mode === PanelMode.Full ?
						<div className='subclass-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<SubclassPanel
													subclass={subClass}
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
