import { AbilityDistance } from '../models/ability';
import { AbilityDistanceType } from '../enums/abiity-distance-type';

export class FactoryDistanceLogic {
	create = (data: { type: AbilityDistanceType, value: number, value2?: number, within?: number, qualifier?: string, special?: string }): AbilityDistance => {
		return {
			type: data.type,
			value: data.value,
			value2: data.value2 || 0,
			within: data.within || 0,
			special: data.special || '',
			qualifier: data.qualifier ?? ''
		};
	};

	createSelf = (qualifier=''): AbilityDistance => {
		return {
			type: AbilityDistanceType.Self,
			value: 0,
			value2: 0,
			within: 0,
			special: '',
			qualifier: qualifier
		};
	};

	createMelee = (value = 1): AbilityDistance => {
		return {
			type: AbilityDistanceType.Melee,
			value: value,
			value2: 0,
			within: 0,
			special: '',
			qualifier: ''
		};
	};

	createRanged = (value: number): AbilityDistance => {
		return {
			type: AbilityDistanceType.Ranged,
			value: value,
			value2: 0,
			within: 0,
			special: '',
			qualifier: ''
		};
	};

	createSummoner = (): AbilityDistance => {
		return {
			type: AbilityDistanceType.Summoner,
			value: 0,
			value2: 0,
			within: 0,
			special: '',
			qualifier: ''
		};
	};

	createSpecial = (special: string): AbilityDistance => {
		return {
			type: AbilityDistanceType.Special,
			value: 0,
			value2: 0,
			within: 0,
			special: special,
			qualifier: ''
		};
	};
}
