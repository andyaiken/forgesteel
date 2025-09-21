import { AbilityType } from '../models/ability';
import { AbilityUsage } from '../enums/ability-usage';

export class FactoryAbilityTypeLogic {
	createMain = (options?: { free?: boolean, qualifiers?: string[], freeStrike?: boolean }): AbilityType => {
		return {
			usage: AbilityUsage.MainAction,
			free: options?.free ?? false,
			trigger: '',
			time: '',
			qualifiers: options?.qualifiers || [],
			freeStrike: options?.freeStrike ?? false
		};
	};

	createManeuver = (options?: { free?: boolean, qualifiers?: string[], freeStrike?: boolean }): AbilityType => {
		return {
			usage: AbilityUsage.Maneuver,
			free: options?.free ?? false,
			trigger: '',
			time: '',
			qualifiers: options?.qualifiers || [],
			freeStrike: options?.freeStrike ?? false
		};
	};

	createMove = (options?: { free?: boolean, qualifiers?: string[], freeStrike?: boolean }): AbilityType => {
		return {
			usage: AbilityUsage.Move,
			free: options?.free ?? false,
			trigger: '',
			time: '',
			qualifiers: options?.qualifiers || [],
			freeStrike: options?.freeStrike ?? false
		};
	};

	createTrigger = (trigger: string, options?: { free?: boolean, qualifiers?: string[], freeStrike?: boolean }): AbilityType => {
		return {
			usage: AbilityUsage.Trigger,
			free: options?.free ?? false,
			trigger: trigger,
			time: '',
			qualifiers: options?.qualifiers || [],
			freeStrike: options?.freeStrike ?? false
		};
	};

	createTime = (time: string): AbilityType => {
		return {
			usage: AbilityUsage.Other,
			free: false,
			trigger: '',
			time: time,
			qualifiers: [],
			freeStrike: false
		};
	};

	createVillainAction = (order?: number): AbilityType => {
		return {
			usage: AbilityUsage.VillainAction,
			free: false,
			trigger: '',
			time: '',
			qualifiers: [],
			order: order,
			freeStrike: false
		};
	};

	createNoAction = (): AbilityType => {
		return {
			usage: AbilityUsage.NoAction,
			free: false,
			trigger: '',
			time: '',
			qualifiers: [],
			freeStrike: false
		};
	};

	createFreeStrike = (): AbilityType => {
		return {
			usage: AbilityUsage.FreeStrike,
			free: false,
			trigger: '',
			time: '',
			qualifiers: [],
			freeStrike: false
		};
	};
}
