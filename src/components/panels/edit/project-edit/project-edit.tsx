import { Select, Space, Tabs } from 'antd';
import { Characteristic } from '@/enums/characteristic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { PanelMode } from '@/enums/panel-mode';
import { Project } from '@/models/project';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './project-edit.scss';

interface Props {
	project: Project;
	includeNameAndDescription: boolean;
	sourcebooks: Sourcebook[];
	mode?: PanelMode;
	onChange: (project: Project) => void;
}

export const ProjectEditPanel = (props: Props) => {
	const [ project, setProject ] = useState<Project>(props.project);

	const getNameAndDescriptionSection = () => {
		const onChange = (name: string, desc: string) => {
			const copy = Utils.copy(project);
			copy.name = name;
			copy.description = desc;
			setProject(copy);
			props.onChange(copy);
		};

		return (
			<NameDescEditPanel
				element={project}
				onChange={onChange}
			/>
		);
	};

	const getDetailsSection = () => {
		const setPrerequisites = (value: string) => {
			const copy = Utils.copy(project);
			copy.itemPrerequisites = value;
			setProject(copy);
			props.onChange(copy);
		};

		const setSource = (value: string) => {
			const copy = Utils.copy(project);
			copy.source = value;
			setProject(copy);
			props.onChange(copy);
		};

		const setCharacteristic = (value: Characteristic[]) => {
			const copy = Utils.copy(project);
			copy.characteristic = value;
			setProject(copy);
			props.onChange(copy);
		};

		const setGoal = (value: number) => {
			const copy = Utils.copy(project);
			copy.goal = value;
			setProject(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Item Prerequisites</HeaderText>
				<TextInput
					placeholder='Prerequisites'
					allowClear={true}
					value={project.itemPrerequisites}
					onChange={setPrerequisites}
				/>
				<HeaderText>Source</HeaderText>
				<TextInput
					placeholder='Source'
					allowClear={true}
					value={project.source}
					onChange={setSource}
				/>
				<HeaderText>Characteristic</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Characteristic'
					mode='multiple'
					options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
					value={project.characteristic}
					onChange={setCharacteristic}
				/>
				<HeaderText>Goal</HeaderText>
				<NumberSpin min={0} max={1000} steps={[ 5, 50 ]} value={project.goal} onChange={setGoal} />
			</Space>
		);
	};

	if (!props.includeNameAndDescription) {
		return getDetailsSection();
	}

	return (
		<ErrorBoundary>
			<div className='project-edit-panel'>
				<div className='project-workspace-column'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Project',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getDetailsSection()
							}
						]}
					/>
				</div>
				{
					props.mode === PanelMode.Full ?
						<div className='project-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<ProjectPanel
													project={project}
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
		</ErrorBoundary>
	);
};
