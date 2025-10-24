import { ProjectInfoComponent } from '../components/project-info-component';
import { ProjectSheet } from '@/models/classic-sheets/hero-sheet';

import './project-info-card.scss';

interface InfoProps {
	project: ProjectSheet;
}

export const ProjectInfoCard = (props: InfoProps) => {
	const project = props.project;
	return (
		<div className='project-info card'>
			<h2>Project: {project.name}</h2>
			<ProjectInfoComponent project={project} />
		</div>
	);
};

interface OverviewProps {
	projects: ProjectSheet[];
}

export const ProjectsOverviewCard = (props: OverviewProps) => {
	const projects = props.projects;
	return (
		<div className='projects-overview card'>
			<h2>Projects</h2>
			{
				projects.map(p => {
					return (
						<div className='project-info' key={`project-overview-${p.id}`}>
							<h3>{p.name}</h3>
							<ProjectInfoComponent project={p} />
						</div>
					);
				})
			}
		</div>
	);
};
