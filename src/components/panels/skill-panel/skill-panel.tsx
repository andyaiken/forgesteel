import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Skill } from '../../../models/skill';

import './skill-panel.scss';

interface Props {
	skill: Skill;
}

export const SkillPanel = (props: Props) => {
	try {
		return (
			<div className='skill-panel'>
				<HeaderText level={1}>{props.skill.name}</HeaderText>
				<Field label='Skill List' value={props.skill.list} />
				<div className='ds-text description-text'>{props.skill.description}</div>
			</div>
		);
	} catch {
		return null;
	}
};
