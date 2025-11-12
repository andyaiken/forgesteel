import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';

export const barnacle: Kit = {
	id: 'kit-barnacle',
	name: 'Barnacle',
	description: 'You are like a barnacle: You have a tough exterior and are damn near impossible to get rid of. You are tough, sticky, and are a real pain in the enemy’s collective rear end.',
	type: '',
	armor: [ KitArmor.Heavy, KitArmor.Shield ],
	weapon: [ KitWeapon.Medium ],
	stamina: 12,
	speed: 0,
	stability: 2,
	meleeDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-barnacle-signature',
				name: 'Guillotine Choke',
				description: '“Where do you think you’re going?”',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage; M < [weak], grabbed',
							tier2: '5 + M or A damage; M < [average], grabbed',
							tier3: '7 + M or A damage; M < [strong], grabbed'
						})
					)
				]
			})
		})
	]
};
