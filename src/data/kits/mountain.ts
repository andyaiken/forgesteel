import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const mountain: Kit = {
	id: 'kit-mountain',
	name: 'Mountain',
	description: 'The Mountain kit does exactly what it says on the tin. You don heavy armor and a heavy weapon to stand strong against your foes, quickly demolishing them when it’s your turn to attack.',
	type: '',
	armor: [ KitArmor.Heavy ],
	weapon: [ KitWeapon.Heavy ],
	stamina: 9,
	speed: 0,
	stability: 2,
	meleeDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-mountain-signature',
				name: 'Pain For Pain',
				description: 'An enemy who tagged you will pay for that.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 damage + M or A damage',
							tier2: '5 damage + M or A damage',
							tier3: '9 damage + M or A damage'
						})
					),
					FactoryLogic.createAbilitySectionText('If the target dealt damage to you since the end of your last turn, this strike deals additional damage equal to your Might or Agility score (your choice).')
				]
			})
		})
	]
};
