import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { Progress } from 'antd';
import { Project } from '../../../../models/project';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './project-panel.scss';

interface Props {
	project: Project;
	mode?: PanelMode;
	onChange?: (project: Project) => void;
}

export const ProjectPanel = (props: Props) => {
	const [ project, setProject ] = useState<Project>(Utils.copy(props.project));

	const setPrerequisites = (value: boolean) => {
		const copy = Utils.copy(project);
		copy.progress!.prerequisites = value;
		setProject(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setSource = (value: boolean) => {
		const copy = Utils.copy(project);
		copy.progress!.source = value;
		setProject(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const setPoints = (value: number) => {
		const copy = Utils.copy(project);
		copy.progress!.points = value;
		setProject(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	try {
		let itemOK = true;
		if (project.itemPrerequisites && project.progress && !project.progress.prerequisites) {
			itemOK = false;
		}
		let sourceOK = true;
		if (project.source && project.progress && !project.progress.source) {
			sourceOK = false;
		}

		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'project-panel' : 'project-panel compact'} id={props.mode === PanelMode.Full ? props.project.id : undefined}>
					<HeaderText level={1}>{props.project.name || 'Unnamed Project'}</HeaderText>
					<Markdown text={props.project.description} />
					{
						props.mode === PanelMode.Full ?
							<>
								{project.itemPrerequisites ? <Field label='Item Prerequisites' value={props.project.itemPrerequisites} /> : null}
								{project.itemPrerequisites && project.progress ? <Toggle label='Obtained Items' value={project.progress.prerequisites} onChange={setPrerequisites} /> : null}
								{project.source ? <Field label='Source' value={props.project.source} /> : null}
								{project.source && project.progress ? <Toggle label='Obtained Source' value={project.progress.source} onChange={setSource} /> : null}
								<Field label='Characteristic' value={props.project.characteristic.length === 5 ? 'highest characteristic' : props.project.characteristic.join(' or ')} />
								<Field label='Goal' value={props.project.goal || '(varies)'} />
								{
									project.progress && itemOK && sourceOK ?
										<NumberSpin
											label='Progress'
											min={0}
											max={project.goal || undefined}
											steps={[ 1, 10 ]}
											value={project.progress.points}
											onChange={setPoints}
										/>
										: null
								}
								{
									project.progress && itemOK && sourceOK && (project.goal > 0) ?
										<Progress
											className='project-progress'
											type='dashboard'
											percent={100 * project.progress.points / project.goal}
											format={value => `${Math.round(value || 0)}%`}
										/>
										: null
								}
								<Markdown text={props.project.effect} />
							</>
							: null
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
