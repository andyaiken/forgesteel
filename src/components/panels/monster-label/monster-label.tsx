import { Monster } from '../../../models/monster';
import { MonsterLogic } from '../../../logic/monster-logic';

import './monster-label.scss';

interface Props {
	monster: Monster;
}

export const MonsterLabel = (props: Props) => {
	const type = props.monster.role.type.toLowerCase().replace(' ', '');
	return (
		<div className={`monster-label ${type}`}>
			{MonsterLogic.getMonsterDescription(props.monster)}
		</div>
	);
};
