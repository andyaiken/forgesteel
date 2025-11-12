import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';

export const sunWukong: Kit = {
	id: 'kit-sun-wukong',
	name: 'Sun Wukong',
	description: 'Heroes using the Sun Wukong kit are highly mobile thanks to their lack of armour. They strike with long poles from just out of reach, harrying enemies with far-off attacks.',
	type: '',
	armor: [],
	weapon: [ KitWeapon.Polearm ],
	stamina: 0,
	speed: 3,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 1,
	rangedDistance: 0,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-sun-wukong-signature',
				name: 'My Stick, Your Face',
				description: '“Allow me to introduce your face to my stick.”',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee(2) ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage',
							tier2: '5 + M or A damage',
							tier3: '9 + M or A damage'
						})
					),
					FactoryLogic.createAbilitySectionText('You gain a surge.')
				]
			})
		})
	]
};
