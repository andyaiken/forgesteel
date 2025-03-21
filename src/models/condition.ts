import { ConditionEndType, ConditionType } from '../enums/condition-type';

export interface Condition {
	id: string;
	type: ConditionType;
	text: string;
	ends: ConditionEndType;
}
