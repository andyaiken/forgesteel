import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';

export interface MonsterRole {
	type: MonsterRoleType;
	organization: MonsterOrganizationType;
};
