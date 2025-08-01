import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const swordAndBoard: Kit = {
	id: 'kit-sword-and-board',
	name: 'Sword and Board',
	description: 'The Sword and Board kit doesn\'t just give you a shield—it makes the shield part of your offensive arsenal. With a medium weapon in one hand and a block of steel or solid oak in the other, you protect yourself while you control the battlefield.',
	type: '',
	armor: [ KitArmor.Medium, KitArmor.Shield ],
	weapon: [ KitWeapon.Medium ],
	stamina: 9,
	speed: 0,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-sword-and-board-signature',
				name: 'Shield Bash',
				description: 'In your hands, a shield isn\'t just for protection.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage; push 1',
							tier2: '5 + M or A damage; push 2',
							tier3: '7 + M or A damage; push 3; M < [strong] prone'
						})
					)
				]
			})
		})
	]
};
