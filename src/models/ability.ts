import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityUsage } from '@/enums/ability-usage';
import { Element } from '@/models/element';
import { PowerRoll } from '@/models/power-roll';

export interface AbilityType {
	usage: AbilityUsage;
	free: boolean;
	trigger: string;
	time: string;
	qualifiers: string[];
	freeStrike: boolean;
	order?: number;
}

export interface AbilityDistance {
	type: AbilityDistanceType;
	value: number;
	value2: number;
	within: number;
	special: string;
	qualifier: string;
}

export interface AbilitySectionText {
	type: 'text';
	text: string;
}

export interface AbilitySectionField {
	type: 'field';
	name: string;
	value: number;
	repeatable: boolean;
	effect: string;
}

export interface AbilitySectionRoll {
	type: 'roll'
	roll: PowerRoll;
}

export interface AbilitySectionPackage {
	type: 'package';
	tag: string;
}

export interface Ability extends Element {
	type: AbilityType;
	keywords: string[];
	distance: AbilityDistance[];
	target: string;
	cost: number | 'signature';
	repeatable: boolean;
	minLevel: number;
	sections: (AbilitySectionText | AbilitySectionField | AbilitySectionRoll | AbilitySectionPackage)[];
}
