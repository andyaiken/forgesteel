import { Project } from '@/models/project';

export class ProjectLogic {
	static getPrerequisitesMet = (project: Project) => {
		if (project.itemPrerequisites && project.progress && !project.progress.prerequisites) {
			return false;
		}

		if (project.source && project.progress && !project.progress.source) {
			return false;
		}

		return true;
	};

	static getStatus = (project: Project) => {
		if (!ProjectLogic.getPrerequisitesMet(project)) {
			return 'Preparing';
		}

		if ((project.goal > 0) && project.progress) {
			if (project.progress.points >= project.goal) {
				return 'Finished';
			}

			const pc = 100 * project.progress.points / project.goal;
			return `${Math.round(pc || 0)}%`;
		}

		return 'In progress';
	};
};
