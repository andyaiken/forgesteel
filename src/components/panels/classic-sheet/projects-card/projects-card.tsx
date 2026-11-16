import { DrawSteelSymbolText } from '@/components/panels/classic-sheet/components/ds-symbol-text-component';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { ProjectSheet } from '@/models/classic-sheets/hero-sheet';
import './projects-card.scss';

interface Props {
	projects: ProjectSheet[];
	projectPoints?: number;
}

export const ProjectsCard = (props: Props) => {
	const emptyProject = {
		name: '',
		characteristic: '',
		assignee: '',
		pointsGoal: null,
		pointsCurrent: null
	};
	const projects = [];
	let i = 0;
	for (i; i < 7; ++i) {
		if (props.projects.length > i) {
			projects.push(props.projects[i]);
		} else {
			projects.push(emptyProject);
		}
	}

	return (
		<div className='projects card'>
			<div className='projects-header'>
				<h2>Projects</h2>
				<LabeledTextField
					label='Project Points'
					content={props.projectPoints}
					additionalClasses={[ 'project-points' ]}
				/>
			</div>
			<div className='projects-table'>
				<div className='header'>
					<div>Project Name</div>
					<div>Assigned Hero / Follower</div>
					<div>Roll Characteristic</div>
					<div>Goal Points</div>
				</div>
				{projects.map(proj =>
					<div className='project' key={proj.name || i++}>
						<div>{proj.name}</div>
						<div>{proj.assignee}</div>
						<div className='roll-characteristic'>
							<DrawSteelSymbolText
								content={proj.characteristic}
								lookFor='characteristics'
							/>
						</div>
						<div className='points'>
							<span>{proj.pointsCurrent}</span>
							<span>/</span>
							<span>{proj.pointsGoal}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
