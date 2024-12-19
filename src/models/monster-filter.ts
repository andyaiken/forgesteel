import { MonsterRoleType } from '../enums/monster-role-type';

export interface MonsterFilter {
	name: string;
	roles: MonsterRoleType[];
	isMinion: 'any' | 'yes' | 'no';
	level: number[];
	ev: number[];
}
