import { AbilityType } from '../models/ability';
import { AbilityUsage } from '../enums/ability-usage';

export class FactoryAbilityTypeLogic {
	createMain = (options?: { free?: boolean, qualifiers?: string[] }): AbilityType => {
		return {
			usage: AbilityUsage.MainAction,
			free: options?.free ?? false,
			trigger: '',
			time: '',
			qualifiers: options?.qualifiers || []
		};
	};

	createManeuver = (options?: { free?: boolean, qualifiers?: string[] }): AbilityType => {
		return {
			usage: AbilityUsage.Maneuver,
			free: options?.free ?? false,
			trigger: '',
			time: '',
			qualifiers: options?.qualifiers || []
		};
	};

	createMove = (options?: { free?: boolean, qualifiers?: string[] }): AbilityType => {
		return {
			usage: AbilityUsage.Move,
			free: options?.free ?? false,
			trigger: '',
			time: '',
			qualifiers: options?.qualifiers || []
		};
	};

	createTrigger = (trigger: string, options?: { free?: boolean, qualifiers?: string[] }): AbilityType => {
		return {
			usage: AbilityUsage.Trigger,
			free: options?.free ?? false,
			trigger: trigger,
			time: '',
			qualifiers: options?.qualifiers || []
		};
	};

	createTime = (time: string): AbilityType => {
		return {
			usage: AbilityUsage.Other,
			free: false,
			trigger: '',
			time: time,
			qualifiers: []
		};
	};

	createVillainAction = (): AbilityType => {
		return {
			usage: AbilityUsage.VillainAction,
			free: false,
			trigger: '',
			time: '',
			qualifiers: []
		};
	};

	createNoAction = (): AbilityType => {
		return {
			usage: AbilityUsage.NoAction,
			free: false,
			trigger: '',
			time: '',
			qualifiers: []
		};
	};

	createFreeStrike = (): AbilityType => {
		return {
			usage: AbilityUsage.FreeStrike,
			free: false,
			trigger: '',
			time: '',
			qualifiers: []
		};
	};
}
