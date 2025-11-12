import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';

export const juggernaut: Kit = {
	id: 'kit-juggernaut',
	name: 'Juggernaut',
	description: 'The Juggernaut kit allows you to act as a one person riot. With a heavy weapon, you carve a canyon through your foes.',
	type: '',
	armor: [ KitArmor.Heavy ],
	weapon: [ KitWeapon.Heavy ],
	stamina: 9,
	speed: 1,
	stability: 1,
	meleeDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-juggernaut-signature',
				name: 'Cleave',
				description: 'You spin around, attacking your surrounding foes.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
				target: 'All enemies in the area',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						})
					)
				]
			})
		})
	]
};
