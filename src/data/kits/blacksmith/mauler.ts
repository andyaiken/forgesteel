import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';

export const mauler: Kit = {
	id: 'kit-mauler',
	name: 'Mauler',
	description: 'Heroes using the Mauler Kit charge headfirst into battle, undaunted by the dangers ahead. Wielding nothing but a medium weapon and your audacity, you are as fearsome as you are fearless.',
	type: '',
	armor: [],
	weapon: [ KitWeapon.Medium ],
	stamina: 3,
	speed: 3,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-mauler-signature',
				name: 'Untold Aggression',
				description: 'You throw yourself at an enemy and try to put the fear of the Gods into them.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage',
							tier2: '5 + M or A damage; push 1',
							tier3: '9 + M or A damage; push 2'
						})
					)
				]
			})
		})
	]
};
