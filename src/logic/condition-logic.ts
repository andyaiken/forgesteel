import { ConditionEndType, ConditionType } from '../enums/condition-type';
import { Condition } from '../models/condition';
import { ConditionData } from '../data/condition-data';

export class ConditionLogic {
	static getDescription = (condition: ConditionType) => {
		switch (condition) {
			case ConditionType.Custom:
				return 'A custom condition.';
			case ConditionType.Quick:
				return 'A quick condition.';
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
		let type = condition.type.toString();
		if (condition.type === ConditionType.Quick) {
			type = condition.text;
		}

		switch (condition.ends) {
			case ConditionEndType.EndOfTurn:
				return `${type} (EoT)`;
			case ConditionEndType.SaveEnds:
				return `${type} (${condition.ends})`;
			case ConditionEndType.UntilRemoved:
				return `${type}`;
		}
	};
}
