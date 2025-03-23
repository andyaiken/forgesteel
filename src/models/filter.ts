import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';
import { TerrainRoleType } from '../enums/terrain-role-type';

export interface MonsterFilter {
	name: string;
	keywords: string[];
	roles: MonsterRoleType[];
	organizations: MonsterOrganizationType[];
	size: number[];
	level: number[];
	ev: number[];
}

export interface TerrainFilter {
	name: string;
	roles: MonsterRoleType[];
	terrainRoles: TerrainRoleType[];
	level: number[];
	ev: number[];
}
