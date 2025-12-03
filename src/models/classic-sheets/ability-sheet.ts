export interface AbilitySheet {
	id: string;
	name: string;
	cost: number;
	isSignature: boolean;
	isNotTrueAbility: boolean;
	abilityType?: string;
	actionType?: string;
	description?: string;
	keywords?: string;
	distance?: string;
	target?: string;
	trigger?: string;
	qualifiers?: string[];
	effect?: string;

	hasPowerRoll: boolean;
	rollPower?: string;
	rollT1Effect?: string;
	rollT2Effect?: string;
	rollT3Effect?: string;
	rollBonuses?: {
		name: string,
		type: 'melee' | 'ranged',
		tier1: string,
		tier2: string,
		tier3: string
	}[];
}
