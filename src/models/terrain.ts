import { FeatureAbility, FeatureText } from './feature';
import { DamageModifier } from './damage-modifier';
import { Element } from './element';
import { MonsterRoleType } from '../enums/monster-role-type';
import { TerrainCategory } from '../enums/terrain-category';
import { TerrainRoleType } from '../enums/terrain-role-type';

export interface TerrainRole {
	type: MonsterRoleType;
	terrainType: TerrainRoleType;
};

export interface TerrainSection {
	id: string;
	content: (FeatureText | FeatureAbility)[];
};

export interface Terrain extends Element {
	category: TerrainCategory;
	level: number;
	role: TerrainRole;
	encounterValue: number;
	area: string;
	stamina: {
		base: number;
		perSquare: number;
	};
	size: string;
	direction: string | null;
	link: string | null;
	damageMods: DamageModifier[];
	sections: TerrainSection[];
	upgrades: {
		id: string;
		label: string;
		cost: number;
		text: string;
		sections: TerrainSection[];
	}[];
	state: {
		squares: number;
		staminaDamage: number;
	};
}
