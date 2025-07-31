import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const shiningArmor: Kit = {
	id: 'kit-shining-armor',
	name: 'Shining Armor',
	description: 'The Shining Armor kit provides the most protection a kit can afford, providing you with the sword, shield, and armor necessary to play the prototypical knight.',
	type: '',
	armor: [ KitArmor.Heavy, KitArmor.Shield ],
	weapon: [ KitWeapon.Medium ],
	stamina: 12,
	speed: 0,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-shining-armor-signature',
				name: 'Protective Attack',
				description: 'The strength of your assault makes it impossible for your foe to ignore you.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage',
							tier2: '6 + M or A damage',
							tier3: '9 + M or A damage'
						})
					),
					FactoryLogic.createAbilitySectionText('The target is taunted (EoT).')
				]
			})
		})
	]
};
