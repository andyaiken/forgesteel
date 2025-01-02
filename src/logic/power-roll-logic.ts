import type { PowerRoll, Test } from '../models/power-roll';
import { Characteristic } from '../enums/characteristic';
import { PowerRollType } from '../enums/power-roll-type';

export class PowerRollLogic {
	static createPowerRoll = (data: Pick<PowerRoll, 'tier1' | 'tier2' | 'tier3'> & Partial<Pick<PowerRoll, 'characteristic' | 'bonus'>>): PowerRoll => {
		return {
			type: PowerRollType.PowerRoll,
			characteristic: data.characteristic ?? [],
			bonus: data.bonus ?? 0,
			tier1: data.tier1,
			tier2: data.tier2,
			tier3: data.tier3
		};
	};

	static createTest = (data: { characteristic: Characteristic } & Pick<PowerRoll, 'tier1' | 'tier2' | 'tier3'>): Test => {
		return {
			type: PowerRollType.Test,
			bonus: 0,
			characteristic: [ data.characteristic ],
			tier1: data.tier1,
			tier2: data.tier2,
			tier3: data.tier3
		};
	};
}