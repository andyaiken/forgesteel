import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitWeapon } from '../../enums/kit-weapon';

export const whirlwind: Kit = {
	id: 'kit-whirlwind',
	name: 'Whirlwind',
	description: 'The Whirlwind kit makes effective use of whips, granting you mobility, damage, and reach. If you want to be a fast-moving warrior who lashes foes with a chain or whip, then this is the kit for you.',
	type: '',
	armor: [],
	weapon: [ KitWeapon.Whip ],
	stamina: 0,
	speed: 3,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	rangedDamage: null,
	meleeDistance: 1,
	rangedDistance: 0,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-whirlwind-signature',
				name: 'Extension Of My Arm',
				description: 'When you draw your whip back after an attack, your enemy is drawn ever closer.',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee(3) ],
				target: '1 creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '4 + M or A damage; vertical pull 1',
							tier2: '7 + M or A damage; vertical pull 2',
							tier3: '10 + M or A damage; vertical pull 3'
						})
					)
				]
			})
		})
	]
};
