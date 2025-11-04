import { FeatureAbility, FeatureText } from '@/models/feature';
import { DamageModifier } from '@/models/damage-modifier';
import { Element } from '@/models/element';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Size } from '@/models/size';
import { TerrainCategory } from '@/enums/terrain-category';
import { TerrainRoleType } from '@/enums/terrain-role-type';

export interface TerrainRole {
	type: MonsterRoleType;
	terrainType: TerrainRoleType;
};

export interface TerrainSection {
	id: string;
	content: (FeatureText | FeatureAbility)[];
};

export interface Terrain extends Element {
	level: number;
	category: TerrainCategory;
	role: TerrainRole;
	encounterValue: number;
	area: string;
	stamina: {
		base: number;
		perSquare: number;
	};
	size: Size | string;
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
