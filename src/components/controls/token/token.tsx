import { Monster, MonsterGroup } from '../../../models/monster';
import { CSSProperties } from 'react';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterRoleType } from '../../../enums/monster-role-type';
import { Terrain } from '../../../models/terrain';
import { TerrainLogic } from '../../../logic/terrain-logic';

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
			.substring(0, 3)
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
				style={{ width: `${size}px`, height: `${size}px`, padding: `${size * 0.08}px` }}
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

interface HeroInfoProps {
	hero: Hero;
	style?: CSSProperties;
}

export const HeroInfo = (props: HeroInfoProps) => {
	return (
		<div className='combatant-button-content' style={props.style}>
			<HeroToken hero={props.hero} />
			<div className='combatant-button-details'>
				<div className='combatant-name'>{props.hero.name}</div>
				<div className='combatant-info'>{HeroLogic.getHeroDescription(props.hero)}</div>
			</div>
		</div>
	);
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

interface MonsterInfoProps {
	monster: Monster;
	style?: CSSProperties;
}

export const MonsterInfo = (props: MonsterInfoProps) => {
	return (
		<div className='combatant-button-content' style={props.style}>
			<MonsterToken monster={props.monster} />
			<div className='combatant-button-details'>
				<div className='combatant-name'>{props.monster.name}</div>
				<div className='combatant-info'>{MonsterLogic.getMonsterDescription(props.monster)}</div>
			</div>
		</div>
	);
};

interface TerrainInfoProps {
	terrain: Terrain;
	style?: CSSProperties;
}

export const TerrainInfo = (props: TerrainInfoProps) => {
	return (
		<div className='combatant-button-content' style={props.style}>
			<div className='combatant-button-details'>
				<div className='combatant-name'>{props.terrain.name}</div>
				<div className='combatant-info'>{TerrainLogic.getTerrainDescription(props.terrain)}</div>
			</div>
		</div>
	);
};
