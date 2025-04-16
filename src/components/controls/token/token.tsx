import { Monster, MonsterGroup } from '../../../models/monster';
import { Hero } from '../../../models/hero';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterRoleType } from '../../../enums/monster-role-type';

import './token.scss';

interface Props {
	name: string;
	role: MonsterRoleType;
	type?: string;
	isDefeated?: boolean;
	size?: number;
	onClick?: () => void;
}

export const Token = (props: Props) => {
	try {
		const size = props.size ?? 22;

		const initials = props.name
			.split(' ')
			.map(token => token[0])
			.join('')
			.toUpperCase();

		let className = `token ${props.role.toLowerCase()}`;
		if (props.onClick) {
			className += ' clickable';
		}

		let innerClassName = 'inner-token';
		if (props.type) {
			innerClassName += ` ${props.type}`;
		}
		if (props.isDefeated) {
			innerClassName += ' defeated';
		}

		return (
			<div
				className={className}
				style={{ width: `${size}px`, padding: `${size * 0.08}px` }}
				title={props.name}
				onClick={props.onClick}
			>
				<div
					className={innerClassName}
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
	onClick?: () => void;
}

export const MonsterToken = (props: MonsterTokenProps) => {
	return (
		<Token
			name={MonsterLogic.getMonsterName(props.monster, props.monsterGroup)}
			role={props.monster.role.type}
			type='monster'
			isDefeated={props.monster.state.defeated}
			size={props.size}
			onClick={props.onClick}
		/>
	);
};

interface HeroTokenProps {
	hero: Hero;
	size?: number;
	onClick?: () => void;
}

export const HeroToken = (props: HeroTokenProps) => {
	return (
		<Token
			name={props.hero.name || 'Hero'}
			role={MonsterRoleType.NoRole}
			type='hero'
			isDefeated={props.hero.state.defeated}
			size={props.size}
			onClick={props.onClick}
		/>
	);
};
