import { Monster, MonsterGroup } from '../../../models/monster';
import { MonsterLogic } from '../../../logic/monster-logic';

import './token.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup
	size?: number;
}

export const Token = (props: Props) => {
	try {
		const size = props.size ?? 22;

		const name = MonsterLogic.getMonsterName(props.monster, props.monsterGroup);

		const initials = name
			.split(' ')
			.map(token => token[0])
			.join('')
			.toUpperCase();

		return (
			<div
				className={`token ${props.monster.role.type.toLowerCase()}`}
				style={{ width: `${size}px`, padding: `${size * 0.08}px` }}
				title={name}
			>
				<div
					className='inner-token'
					style={{ fontSize: `${size * 0.35}px`, letterSpacing: `-${size * 0.01}px` }}
					title={name}
				>
					{initials}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
