import { Ability, AbilityType, PowerRoll } from '../models/ability';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';

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

	static createPowerRoll = (data: { characteristic: Characteristic[], tier1: string, tier2: string, tier3: string }) => {
		return {
			characteristic: data.characteristic,
			tier1: data.tier1,
			tier2: data.tier2,
			tier3: data.tier3
		} as PowerRoll;
	};

	static createAbility = (data: { id: string, name: string, description: string, type: AbilityType, keywords?: AbilityKeyword[], distance?: string, target?: string, cost?: number, preEffect?: string, powerRoll?: PowerRoll, effect?: string, spend?: { value?: number, effect: string }[] }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: data.type,
			keywords: data.keywords || [],
			distance: data.distance || '',
			target: data.target || '',
			cost: data.cost || 0,
			preEffect: data.preEffect || '',
			powerRoll: data.powerRoll || null,
			effect: data.effect || '',
			spend: data.spend || []
		} as Ability;
	};
}
