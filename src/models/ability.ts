import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityUsage } from '../enums/ability-usage';
import { Element } from './element';
import { PowerRoll } from './power-roll';

export interface AbilityType {
	usage: AbilityUsage;
	free: boolean;
	trigger: string;
	time: string;
	qualifiers: string[];
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

export interface Ability extends Element {
	type: AbilityType;
	keywords: string[];
	distance: AbilityDistance[];
	target: string;
	cost: number | 'signature';
	repeatable: boolean;
	minLevel: number;
	sections: (AbilitySectionText | AbilitySectionField | AbilitySectionRoll)[];

	/**
	 * @deprecated This field has been subsumed into the sections field.
	 */
	preEffect: string;

	/**
	 * @deprecated This field has been subsumed into the sections field.
	 */
	powerRoll: PowerRoll | null,

	/**
	 * @deprecated This field has been subsumed into the sections field.
	 */
	test: PowerRoll | null,

	/**
	 * @deprecated This field has been subsumed into the sections field.
	 */
	effect: string;

	/**
	 * @deprecated This field has been subsumed into the sections field.
	 */
	strained: string;

	/**
	 * @deprecated This field has been subsumed into the sections field.
	 */
	alternateEffects: string[];

	/**
	 * @deprecated This field has been subsumed into the sections field.
	 */
	spend: { name: string, value: number, repeatable: boolean, effect: string }[];

	/**
	 * @deprecated This field has been subsumed into the sections field.
	 */
	persistence: { value: number, effect: string }[];
}
