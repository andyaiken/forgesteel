import { Ability, AbilityDistance, AbilityType, PowerRoll } from '../models/ability';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { Hero } from '../models/hero';
import { HeroLogic } from './hero-logic';
import { PowerRollType } from '../enums/power-roll-type';

export class AbilityLogic {
	static createTypeAction = (free = false) => {
		return {
			usage: AbilityUsage.Action,
			free: free,
			trigger: '',
			time: ''
		} as AbilityType;
	};

	static createTypeManeuver = (free = false) => {
		return {
			usage: AbilityUsage.Maneuver,
			free: free,
			trigger: '',
			time: ''
		} as AbilityType;
	};

	static createTypeTrigger = (trigger: string, free = false) => {
		return {
			usage: AbilityUsage.Trigger,
			free: free,
			trigger: trigger,
			time: ''
		} as AbilityType;
	};

	static createTypeTime = (time: string) => {
		return {
			usage: AbilityUsage.Other,
			free: false,
			trigger: '',
			time: time
		} as AbilityType;
	};

	static createDistance = (data: { type: AbilityDistanceType, value: number, value2?: number, within?: number }) => {
		return {
			type: data.type,
			value: data.value,
			value2: data.value2 || 0,
			within: data.within || 0,
			special: ''
		} as AbilityDistance;
	};

	static createDistanceSelf = () => {
		return {
			type: AbilityDistanceType.Self,
			value: 0,
			value2: 0,
			within: 0,
			special: ''
		} as AbilityDistance;
	};

	static createDistanceSpecial = (special: string) => {
		return {
			type: AbilityDistanceType.Special,
			value: 0,
			value2: 0,
			within: 0,
			special: special
		} as AbilityDistance;
	};

	static createPowerRoll = (data: { type?: PowerRollType, characteristic: Characteristic[], tier1: string, tier2: string, tier3: string }) => {
		return {
			type: data.type || PowerRollType.PowerRoll,
			characteristic: data.characteristic,
			tier1: data.tier1,
			tier2: data.tier2,
			tier3: data.tier3
		} as PowerRoll;
	};

	static createAbility = (data: { id: string, name: string, description: string, type: AbilityType, keywords?: AbilityKeyword[], distance: AbilityDistance[], target: string, cost?: number, preEffect?: string, powerRoll?: PowerRoll, effect?: string, alternateEffects?: string[], spend?: { value?: number, effect: string }[], persistence?: { value?: number, effect: string }[] }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: data.type,
			keywords: data.keywords || [],
			distance: data.distance || [],
			target: data.target || '',
			cost: data.cost || 0,
			preEffect: data.preEffect || '',
			powerRoll: data.powerRoll || null,
			effect: data.effect || '',
			alternateEffects: data.alternateEffects || [],
			spend: data.spend || [],
			persistence: data.persistence || []
		} as Ability;
	};

	static getType = (type: AbilityType) => {
		if (type.usage === AbilityUsage.Other) {
			return type.time;
		}

		return `${type.free ? 'Free ' : ''}${type.usage}`;
	};

	static getDistance = (distance: AbilityDistance, hero?: Hero, ability?: Ability) => {
		if (distance.type === AbilityDistanceType.Self) {
			return 'Self';
		}

		if (distance.type === AbilityDistanceType.Special) {
			return distance.special || 'Special';
		}

		const bonus = (hero && ability) ? HeroLogic.getDistanceBonus(hero, ability, distance) : 0;

		let result = `${distance.type} ${distance.value + bonus}`;
		if (distance.type === AbilityDistanceType.Line) {
			result += `x${distance.value2 + bonus}`;
		}
		if (distance.within > 0) {
			result += ` within ${distance.within}`;
		}

		return result;
	};

	static panelWidth = (ability: Ability) => {
		const descLength = Math.round(ability.description.split(' ').length / 10);
		const preEffectLength = Math.round(ability.preEffect.split(' ').length / 10);
		const powerRollLength = ability.powerRoll ? 6 : 0;
		const effectLength = Math.round(ability.effect.split(' ').length / 10);
		const alternateLength = Collections.sum(ability.alternateEffects, e => Math.round(e.split(' ').length / 10));
		const spendLength = Collections.sum(ability.spend, e => Math.round(e.effect.split(' ').length / 10));
		const persistLength = Collections.sum(ability.persistence, e => Math.round(e.effect.split(' ').length / 10));

		const length = descLength + preEffectLength + powerRollLength + effectLength + alternateLength + spendLength + persistLength;
		return Math.max(1, Math.round(length / 20));
	};
}
