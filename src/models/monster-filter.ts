import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';

export interface MonsterFilter {
	name: string;
	roles: MonsterRoleType[];
	organizations: MonsterOrganizationType[];
	size: number;
	level: number[];
	ev: number[];
}
