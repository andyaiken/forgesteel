import { Ability } from '@/models/ability';
import { AbilityUsage } from '@/enums/ability-usage';

export class AbilityUpdateLogic {
	static updateAbility = (ability: Ability) => {
		if (ability.type.usage.toString() === 'Action') {
			ability.type.usage = AbilityUsage.MainAction;
		}

		if (ability.type.freeStrike === undefined) {
			ability.type.freeStrike = false;
		}

		if (ability.sections === undefined) {
			ability.sections = [];
		}
	};
}
