import { DrawSteelSymbolText } from '@/components/panels/classic-sheet/components/ds-symbol-text-component';
import { LabeledBooleanField } from '@/components/panels/classic-sheet/components/labeled-field';
import { ProjectSheet } from '@/models/classic-sheets/hero-sheet';

import './project-info-component.scss';

interface Props {
	project: ProjectSheet;
}

export const ProjectInfoComponent = (props: Props) => {
	const project = props.project;
	return (
		<div className='project-info'>
			<div className='details'>
				<div className='items'>
					<div className='requirement'>
						<label>Item Prerequisite:</label>
						<span>{project.prerequisites}</span>
					</div>
					<div className='obtained'>
						<LabeledBooleanField value={project.havePrerequisites} label='' />
						<div className='details'></div>
					</div>
				</div>
				<div className='source'>
					<div className='requirement'>
						<label>Project Source:</label>
						<span>{project.source}</span>
					</div>
					<div className='obtained'>
						<LabeledBooleanField value={project.haveSource} label='' />
						<div className='details'></div>
					</div>
				</div>
				<div>
					<label>Project Roll Characteristic:</label>
					<span><DrawSteelSymbolText content={project.characteristic} lookFor='characteristics' /></span>
				</div>
				<div>
					<label>Project Goal:</label>
					<span>{project.pointsGoal}</span>
				</div>
			</div>
		</div>
	);
};
