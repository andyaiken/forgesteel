import type { Characteristic } from '../enums/characteristic';
import type { PowerRollType } from '../enums/power-roll-type';

interface _PowerRoll {
	characteristic: Characteristic[];
	bonus: number;
	tier1: string;
	tier2: string;
	tier3: string;
}

export interface Test extends _PowerRoll {
	type: PowerRollType.Test
}

export type PowerRoll = (_PowerRoll & { type: PowerRollType.PowerRoll}) | Test;
