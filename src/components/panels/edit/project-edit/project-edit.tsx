import { Button, Select, Space, Tabs } from 'antd';
import { Characteristic } from '@/enums/characteristic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { PanelMode } from '@/enums/panel-mode';
import { Project } from '@/models/project';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { TextInput } from '@/components/controls/text-input/text-input';
import { ThunderboltOutlined } from '@ant-design/icons';
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
		const setName = (value: string) => {
			const copy = Utils.copy(project);
			copy.name = value;
			setProject(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(project);
			copy.description = value;
			setProject(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<TextInput
						status={project.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={project.name}
						onChange={setName}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={project.description} onChange={setDescription} />
			</Space>
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
				<NumberSpin min={0} max={500} steps={[ 5 ]} value={project.goal} onChange={setGoal} />
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
