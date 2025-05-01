import { ConditionEndType, ConditionType } from '../enums/condition-type';
import { Condition } from '../models/condition';
import { ConditionData } from '../data/condition-data';

export class ConditionLogic {
	static getDescription = (condition: ConditionType) => {
		switch (condition) {
			case ConditionType.Custom:
				return 'A custom condition.';
			case ConditionType.Bleeding:
				return ConditionData.bleeding;
			case ConditionType.Dazed:
				return ConditionData.dazed;
			case ConditionType.Frightened:
				return ConditionData.frightened;
			case ConditionType.Grabbed:
				return ConditionData.grabbed;
			case ConditionType.Prone:
				return ConditionData.prone;
			case ConditionType.Restrained:
				return ConditionData.restrained;
			case ConditionType.Slowed:
				return ConditionData.slowed;
			case ConditionType.Taunted:
				return ConditionData.taunted;
			case ConditionType.Weakened:
				return ConditionData.weakened;
		}
	};

	static getFullDescription = (condition: Condition) => {
		let end = condition.ends.toLowerCase();

		if (condition.ends === ConditionEndType.EndOfTurn) {
			end = 'EoT';
		}

		return `${condition.type} (${end})`;
	};
}
