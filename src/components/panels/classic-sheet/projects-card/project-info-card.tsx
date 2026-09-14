import { ProjectInfoComponent } from '@/components/panels/classic-sheet/components/project-info-component';
import { ProjectSheet } from '@/models/classic-sheets/hero-sheet';

import './project-info-card.scss';

interface Props {
	projects: ProjectSheet[];
}

export const ProjectsOverviewCard = (props: Props) => {
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
