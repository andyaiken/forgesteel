import type { Characteristic } from '../enums/characteristic';
import type { PowerRoll } from '../models/power-roll';

export class PowerRollLogic {
	static createPowerRoll = (data: { characteristic?: Characteristic | Characteristic[] } & Pick<PowerRoll, 'tier1' | 'tier2' | 'tier3'> & Partial<Pick<PowerRoll, 'bonus'>>): PowerRoll => {
		return {
			characteristic: data.characteristic
				? Array.isArray(data.characteristic) ? data.characteristic : [ data.characteristic ]
				: [],
			bonus: data.bonus ?? 0,
			tier1: data.tier1,
			tier2: data.tier2,
			tier3: data.tier3
		};
	};
}