import { Input, Select } from 'antd';
import { Characteristic } from '../../../../enums/characteristic';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Project } from '../../../../models/project';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './project-edit.scss';

interface Props {
	project: Project;
	includeNameAndDescription: boolean;
	onChange: (project: Project) => void;
}

export const ProjectEditPanel = (props: Props) => {
	const [ project, setProject ] = useState<Project>(props.project);

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

	const setEffect = (value: string) => {
		const copy = Utils.copy(project);
		copy.effect = value;
		setProject(copy);
		props.onChange(copy);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='project-edit-panel'>
					{
						props.includeNameAndDescription ?
							<>
								<HeaderText>Name</HeaderText>
								<Input
									status={project.name === '' ? 'warning' : ''}
									placeholder='Name'
									allowClear={true}
									value={project.name}
									onChange={e => setName(e.target.value)}
								/>
								<HeaderText>Description</HeaderText>
								<MultiLine value={project.description} onChange={setDescription} />
							</>
							: null
					}
					<HeaderText>Item Prerequisites</HeaderText>
					<Input
						placeholder='Prerequisites'
						allowClear={true}
						value={project.itemPrerequisites}
						onChange={e => setPrerequisites(e.target.value)}
					/>
					<HeaderText>Source</HeaderText>
					<Input
						placeholder='Source'
						allowClear={true}
						value={project.source}
						onChange={e => setSource(e.target.value)}
					/>
					<HeaderText>Characteristic</HeaderText>
					<Select
						style={{ width: '100%' }}
						placeholder='Characteristic'
						mode='multiple'
						options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
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
						value={project.characteristic}
						onChange={setCharacteristic}
					/>
					<HeaderText>Goal</HeaderText>
					<NumberSpin min={0} max={500} steps={[ 5 ]} value={project.goal} onChange={setGoal} />
					<HeaderText>Effect</HeaderText>
					<MultiLine value={project.effect} onChange={setEffect} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
