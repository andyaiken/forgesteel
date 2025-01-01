import { Ability, AbilityDistance, AbilityType, PowerRoll } from '../models/ability';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { Hero } from '../models/hero';
import { HeroLogic } from './hero-logic';
import { PowerRollType } from '../enums/power-roll-type';

type RequiredAbilityProps = 'id' | 'name' | 'type' | 'distance' | 'target';
type OptionalAbilityProps = 'description' | 'keywords' | 'cost' | 'preEffect' | 'powerRoll' | 'effect' | 'alternateEffects';
interface InitAbility extends Pick<Ability, RequiredAbilityProps>, Partial<Pick<Ability, OptionalAbilityProps>> {
	spend?: { value?: number, effect: string }[];
	persistence?: { value?: number, effect: string }[];
}

export class AbilityLogic {
	static type = {
		createAction: (options?: { free?: boolean, qualifiers?: string[] }): AbilityType => {
			return {
				usage: AbilityUsage.Action,
				free: options?.free ?? false,
				trigger: '',
				time: '',
				qualifiers: options?.qualifiers
			};
		},
		createManeuver: (free = false): AbilityType => {
			return {
				usage: AbilityUsage.Maneuver,
				free: free,
				trigger: '',
				time: ''
			};
		},
		createMove: (free = false): AbilityType => {
			return {
				usage: AbilityUsage.Move,
				free: free,
				trigger: '',
				time: ''
			};
		},
		createTrigger: (trigger: string, free = false): AbilityType => {
			return {
				usage: AbilityUsage.Trigger,
				free: free,
				trigger: trigger,
				time: ''
			};
		},
		createTime: (time: string): AbilityType => {
			return {
				usage: AbilityUsage.Other,
				free: false,
				trigger: '',
				time: time
			};
		},
		createVillainAction: (): AbilityType => {
			return {
				usage: AbilityUsage.VillainAction,
				free: false,
				trigger: '',
				time: ''
			};
		},
		createNoAction: (): AbilityType => {
			return {
				usage: AbilityUsage.NoAction,
				free: false,
				trigger: '',
				time: ''
			};
		}
	};

	static distance = {
		create: (data: { type: AbilityDistanceType, value: number, value2?: number, within?: number }): AbilityDistance => {
			return {
				type: data.type,
				value: data.value,
				value2: data.value2 || 0,
				within: data.within || 0,
				special: ''
			};
		},
		createSelf: (): AbilityDistance => {
			return {
				type: AbilityDistanceType.Self,
				value: 0,
				value2: 0,
				within: 0,
				special: ''
			};
		},
		createMelee: (value: number): AbilityDistance => {
			return {
				type: AbilityDistanceType.Melee,
				value: value,
				value2: 0,
				within: 0,
				special: ''
			};
		},
		createRanged: (value: number): AbilityDistance => {
			return {
				type: AbilityDistanceType.Ranged,
				value: value,
				value2: 0,
				within: 0,
				special: ''
			};
		},
		createSpecial: (special: string): AbilityDistance => {
			return {
				type: AbilityDistanceType.Special,
				value: 0,
				value2: 0,
				within: 0,
				special: special
			};
		}
	};

	static createPowerRoll = (data: { type?: PowerRollType, characteristic?: Characteristic[], bonus?: number, tier1: string, tier2: string, tier3: string }) => {
		return {
			type: data.type || PowerRollType.PowerRoll,
			characteristic: data.characteristic || [],
			bonus: data.bonus || 0,
			tier1: data.tier1,
			tier2: data.tier2,
			tier3: data.tier3
		} as PowerRoll;
	};

	static createAbility = (data: InitAbility): Ability => {
		return {
			id: data.id,
			name: data.name,
			description: data.description || '',
			type: data.type,
			keywords: data.keywords || [],
			distance: data.distance || [],
			target: data.target || '',
			cost: data.cost || 0,
			preEffect: data.preEffect || '',
			powerRoll: data.powerRoll || null,
			effect: data.effect || '',
			alternateEffects: data.alternateEffects || [],
			spend: (data.spend ?? []).map(s => ({ ...s, value: s.value ?? 0 })),
			persistence: (data.persistence ?? []).map(p => ({ ...p, value: p.value ?? 0 }))
		};
	};

	static getDistance = (distance: AbilityDistance, hero?: Hero, ability?: Ability) => {
		if (distance.type === AbilityDistanceType.Self) {
			return 'Self';
		}

		if (distance.type === AbilityDistanceType.Special) {
			return distance.special || 'Special';
		}

		const bonus = (hero && ability) ? HeroLogic.getDistanceBonus(hero, ability, distance) : 0;

		let result = `${distance.type} ${distance.value + bonus}`;
		if (distance.type === AbilityDistanceType.Line) {
			result += `x${distance.value2 + bonus}`;
		}
		if (distance.within > 0) {
			result += ` within ${distance.within}`;
		}

		return result;
	};

	static panelWidth = (ability: Ability) => {
		const descLength = Math.round(ability.description.split(' ').length / 10);
		const preEffectLength = Math.round(ability.preEffect.split(' ').length / 10);
		const powerRollLength = ability.powerRoll ? 6 : 0;
		const effectLength = Math.round(ability.effect.split(' ').length / 10);
		const alternateLength = Collections.sum(ability.alternateEffects, e => Math.round(e.split(' ').length / 10));
		const spendLength = Collections.sum(ability.spend, e => Math.round(e.effect.split(' ').length / 10));
		const persistLength = Collections.sum(ability.persistence, e => Math.round(e.effect.split(' ').length / 10));

		const length = descLength + preEffectLength + powerRollLength + effectLength + alternateLength + spendLength + persistLength;
		return Math.max(1, Math.round(length / 20));
	};
}
