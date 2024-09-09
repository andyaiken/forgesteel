import { Ability, AbilityType, PowerRoll } from '../models/ability';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';

export class AbilityLogic {
	static createAbilityType = (data: { usage: AbilityUsage, free?: boolean, trigger?: string, time?: string }) => {
		return {
			usage: data.usage,
			free: data.free || false,
			trigger: data.trigger || '',
			time: data.time || ''
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

	static createAbility = (data: { id: string, name: string, description: string, type: AbilityType, keywords?: AbilityKeyword[], distance?: string, target?: string, cost?: number, powerRoll?: PowerRoll, effect?: string, spend?: { value: number, effect: string }[] }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: data.type,
			keywords: data.keywords || [],
			distance: data.distance || '',
			target: data.target || '',
			cost: data.cost || 0,
			powerRoll: data.powerRoll || null,
			effect: data.effect || '',
			spend: data.spend || []
		} as Ability;
	};
}
