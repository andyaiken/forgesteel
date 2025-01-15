import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';
import { Project } from '../../../../models/project';

import './project-panel.scss';

interface Props {
	project: Project;
	mode?: PanelMode;
}

export const ProjectPanel = (props: Props) => {
	try {
		return (
			<div className='project-panel' id={props.mode === PanelMode.Full ? props.project.id : undefined}>
				<HeaderText level={1}>{props.project.name || 'Unnamed Project'}</HeaderText>
				<Markdown text={props.project.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<Field label='Item Prerequisites' value={props.project.itemPrerequisites} />
							<Field label='Source' value={props.project.source} />
							<Field label='Characteristic' value={props.project.characteristic.join(' or ')} />
							<Field label='Goal' value={props.project.goal} />
							<Markdown text={props.project.effect} />
						</>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
