import { AbilityListEditPanel, FeatureListEditPanel } from '@/components/panels/edit/list-edit/list-edit-panel';
import { Space, Tabs } from 'antd';
import { Ability } from '@/models/ability';
import { Feature } from '@/models/feature';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
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
							onChange={features => onChange(lvl.level, features)}
						/>
					))
				}
			</Space>
		);
	};

	const getAbilitiesEditSection = () => {
		const onChange = (abilities: Ability[]) => {
			const copy = Utils.copy(subClass);
			copy.abilities = Utils.copy(abilities);
			setSubClass(copy);
			props.onChange(copy);
		};

		return (
			<AbilityListEditPanel
				abilities={subClass.abilities}
				onChange={onChange}
			/>
		);
	};

	return (
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
	);
};
