import { AbilityListEditPanel, FeatureListEditPanel } from '@/components/panels/edit/list-edit/list-edit-panel';
import { Select, Space, Tabs } from 'antd';
import { Ability } from '@/models/ability';
import { Feature } from '@/models/feature';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
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

		const setClassID = (value: string) => {
			const copy = Utils.copy(subClass);
			copy.classID = value;
			setSubClass(copy);
			props.onChange(copy);
		};

		const classes = SourcebookLogic.getClasses(props.sourcebooks);
		const classOrphaned = !!subClass.classID && !classes.some(c => c.id === subClass.classID);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<NameDescEditPanel
					element={subClass}
					onChange={onChange}
				/>
				<HeaderText>Class</HeaderText>
				<Select
					style={{ width: '100%' }}
					allowClear={!!subClass.classID}
					placeholder='Choose a class'
					options={[
						{ value: '', label: 'Any class' },
						...(classOrphaned ? [ { value: subClass.classID, label: 'Unknown class' } ] : []),
						...classes.map(c => ({ value: c.id, label: c.name }))
					]}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					value={subClass.classID || ''}
					onChange={value => setClassID(value || '')}
				/>
			</Space>
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
