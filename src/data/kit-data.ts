import { KitArmor, KitWeapon } from '../enums/kit';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from '../logic/ability-logic';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';
import { Kit } from '../models/kit';

export class KitData {
	static cloakAndDagger: Kit = {
		id: 'kit-cloak-and-dagger',
		name: 'Cloak and Dagger',
		description: 'Providing throwable light weapons and light armor easily concealed by a cloak to confuse your enemies, the Cloak and Dagger kit makes you more mobile while providing a boost to your effectiveness at range and to your damage. This kit is good for a hero who wants to be able to move all over the battlefield while keeping their options open for using short-range attacks.',
		armor: [ KitArmor.Light ],
		weapon: [ KitWeapon.Light ],
		implement: [],
		stamina: 3,
		speed: 2,
		stability: 0,
		meleeDamage: {
			tier1: 1,
			tier2: 1,
			tier3: 1
		},
		rangedDamage: {
			tier1: 1,
			tier2: 1,
			tier3: 1
		},
		magicalDamage: {
			tier1: 0,
			tier2: 0,
			tier3: 0
		},
		distance: 5,
		reach: 0,
		area: 0,
		mobility: true,
		signatureAbility: AbilityLogic.createAbility({
			id: 'kit-cloak-and-dagger-signature',
			name: 'Fade',
			description: 'A stab, and a few quick, careful steps back.',
			type: AbilityLogic.createAbilityType({ usage: AbilityUsage.Action }),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: 'Reach 1 or Range 10',
			target: '1 creature',
			cost: 0,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might, Characteristic.Agility ],
				tier1: '4 damage; you shift 1 square',
				tier2: '9 damage; you shift 2 squares',
				tier3: '13 damage; you shift 3 squares'
			})
		}),
		ward: null
	};

	static getKits = () => {
		return [
			this.cloakAndDagger
		];
	};
}
