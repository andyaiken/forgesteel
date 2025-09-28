export interface AbilitySheet {
	id: string;
	name: string;
	cost: number;
	isSignature: boolean;
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
}
