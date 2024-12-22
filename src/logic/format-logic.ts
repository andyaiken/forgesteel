import { Ability, AbilityDistance, AbilityType } from '../models/ability';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityUsage } from '../enums/ability-usage';
import { DamageModifier } from '../models/damage-modifier';
import { Hero } from '../models/hero';
import { HeroLogic } from './hero-logic';
import { MonsterRole } from '../models/monster';
import { Size } from '../models/size';

export class FormatLogic {
	static getAbilityType = (type: AbilityType) => {
		if (type.usage === AbilityUsage.Other) {
			return type.time;
		}

		return `${type.free ? 'Free ' : ''}${type.usage}`;
	};

	static getAbilityDistance = (distance: AbilityDistance, hero?: Hero, ability?: Ability) => {
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

	static getSize = (size: Size) => {
		if (size.value > 1) {
			return size.value.toString();
		}

		return `1${size.mod}`;
	};

	static getRole = (role: MonsterRole) => {
		if (role.isMinion) {
			return `${role.type} Minion`;
		}

		return role.type;
	};

	static getDamageModifier = (mod: DamageModifier) => {
		let str = `${mod.damageType} ${mod.type} ${mod.value}`;
		if (mod.valuePerLevel > 0) {
			str += `, ${mod.valuePerLevel >= 0 ? '+' : ''}${mod.valuePerLevel} per level after 1st`;
		}
		return str;
	};
}
