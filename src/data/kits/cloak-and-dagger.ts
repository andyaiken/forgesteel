import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const cloakAndDagger: Kit = {
	id: 'kit-cloak-and-dagger',
	name: 'Cloak and Dagger',
	description: 'Providing throwable light weapons and light armor easily concealed by a cloak to confuse your enemies, the Cloak and Dagger kit makes you more mobile while increasing the effectiveness of your short-range strikes.',
	type: '',
	armor: [ KitArmor.Light ],
	weapon: [ KitWeapon.Light ],
	stamina: 3,
	speed: 2,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	rangedDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	meleeDistance: 0,
	rangedDistance: 5,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-cloak-and-dagger-signature',
				name: 'Fade',
				description: 'A stab, and a few quick, careful steps back.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [
					FactoryLogic.distance.createMelee(),
					FactoryLogic.distance.createRanged(5)
				],
				target: '1 creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage; you shift 1 square',
							tier2: '5 + M or A damage; you shift up to 2 squares',
							tier3: '7 + M or A damage; you shift up to 3 squares'
						})
					)
				]
			})
		})
	]
};
