import { ClocktowerTeam } from '@/enums/clocktower-team';

export interface ClocktowerSpecial {
	name: string;
	type: string;
}

export interface ClocktowerJinx {
	id: string;
	reason: string;
}

export interface ClocktowerRole {
	id: string;
	name: string;
	edition?: string;
	image?: string | string[];
	team: ClocktowerTeam;
	flavor?: string;
	ability: string;
	firstNight?: number;
	firstNightReminder?: string;
	otherNight?: number;
	otherNightReminder?: string;
	reminders?: string[];
	remindersGlobal?: string[];
	setup?: boolean;
	special?: ClocktowerSpecial[];
	jinxes?: ClocktowerJinx[];
}

export interface ClocktowerRoleDetails {
	description: string;
}

export interface ClocktowerScriptInfo {
	id: '_meta';
	name: string;
	author?: string;
	logo?: string;
	hideTitle?: false;
	background?: string;
	almanac?: string;
	bootlegger?: string[];
	firstNight?: string[];
	otherNight?: string[];
}

export type ClocktowerScript = (ClocktowerScriptInfo | ClocktowerRole)[];
