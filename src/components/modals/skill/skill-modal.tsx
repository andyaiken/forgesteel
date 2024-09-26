import { Skill } from '../../../models/skill';
import { SkillPanel } from '../../panels/skill-panel/skill-panel';

import './skill-modal.scss';

interface Props {
	skill: Skill;
}

export const SkillModal = (props: Props) => {
	try {
		return (
			<div className='skill-modal'>
				<SkillPanel skill={props.skill} />
			</div>
		);
	} catch {
		return null;
	}
};
