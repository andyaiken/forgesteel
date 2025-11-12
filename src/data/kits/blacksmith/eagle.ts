import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';

export const eagle: Kit = {
	id: 'kit-eagle',
	name: 'Eagle',
	description: 'The Eagle kit makes you a sharp-eyed dead-shot. You fire upon your opponents from incredible distances, hitting your mark every single time.',
	type: '',
	armor: [],
	weapon: [ KitWeapon.Bow ],
	stamina: 0,
	speed: 2,
	stability: 0,
	meleeDamage: null,
	rangedDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	meleeDistance: 0,
	rangedDistance: 10,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-eagle-signature',
				name: 'Downtown Delivery',
				description: 'You fire a an unbelievably long range shot.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage',
							tier2: '6 + M or A damage',
							tier3: '9 + M or A damage'
						})
					)
				]
			})
		})
	]
};
