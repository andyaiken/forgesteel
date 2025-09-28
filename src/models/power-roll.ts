import type { Characteristic } from '../enums/characteristic';

export interface PowerRoll {
	characteristic: Characteristic[];
	bonus: number;
	tier1: string;
	tier2: string;
	tier3: string;
	crit: string;
}
