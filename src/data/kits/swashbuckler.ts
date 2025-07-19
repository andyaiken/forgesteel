import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const swashbuckler: Kit = {
	id: 'kit-swashbuckler',
	name: 'Swashbuckler',
	description: 'If you want to be mobile and deal a lot of damage with melee attacks, then you should reach for the Swashbuckler kit. This is a great kit for heroes who want to be master duelists.',
	type: '',
	armor: [ KitArmor.Light ],
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
				id: 'kit-swashbuckler-signature',
				name: 'Fancy Footwork',
				description: 'All combat is a dance - and you’ll be the one leading.',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '3 + M or A damage',
							tier2: '5 + M or A damage; push 1',
							tier3: '8 + M or A damage; push 2'
						})
					),
					FactoryLogic.createAbilitySectionText('You can shift into any square your target leaves after you force move them with this ability.')
				]
			})
		})
	]
};
