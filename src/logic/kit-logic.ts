import { KitDamageBonus } from '../models/kit';

export class KitLogic {
	static createDamageBonus = (tier1: number, tier2: number, tier3: number) => {
		return {
			tier1: tier1,
			tier2: tier2,
			tier3: tier3
		} as KitDamageBonus;
	};
}
