import { Monster, MonsterGroup } from '../../../models/monster';
import { Hero } from '../../../models/hero';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterRoleType } from '../../../enums/monster-role-type';

import './token.scss';

interface Props {
	name: string;
	role: MonsterRoleType;
	size?: number;
}

export const Token = (props: Props) => {
	try {
		const size = props.size ?? 22;

		const initials = props.name
			.split(' ')
			.map(token => token[0])
			.join('')
			.toUpperCase();

		return (
			<div
				className={`token ${props.role.toLowerCase()}`}
				style={{ width: `${size}px`, padding: `${size * 0.08}px` }}
				title={props.name}
			>
				<div
					className='inner-token'
					style={{ fontSize: `${size * 0.3}px`, letterSpacing: `-${size * 0.01}px` }}
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

interface MonsterTokenProps {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	size?: number;
}

export const MonsterToken = (props: MonsterTokenProps) => {
	const name = MonsterLogic.getMonsterName(props.monster, props.monsterGroup);
	const role = props.monster.role.type;
	return (
		<Token name={name} role={role} size={props.size}  />
	);
};

interface HeroTokenProps {
	hero: Hero;
	size?: number;
}

export const HeroToken = (props: HeroTokenProps) => {
	const name = props.hero.name || 'Hero';
	const role = MonsterRoleType.NoRole;
	return (
		<Token name={name} role={role} size={props.size}  />
	);
};
