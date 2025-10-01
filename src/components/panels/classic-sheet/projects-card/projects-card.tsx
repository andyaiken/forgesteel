import { DrawSteelSymbolText } from '@/components/panels/classic-sheet/components/ds-symbol-text-component';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import './projects-card.scss';

interface Props {
	character: HeroSheet;
}

export const ProjectsCard = (props: Props) => {
	const character = props.character;
	const emptyProject = {
		name: '',
		characteristic: '',
		pointsGoal: undefined,
		pointsCurrent: undefined
	};
	const projects = [];
	let i = 0;
	for (i; i < 5; ++i) {
		if (character.projects && character.projects.length > i) {
			projects.push(character.projects[i]);
		} else {
			projects.push(emptyProject);
		}
	}

	return (
		<div className='projects card'>
			<h2>Projects</h2>
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
						<div></div>
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
