import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';

export const condor: Kit = {
	id: 'kit-condor',
	name: 'Condor',
	description: 'The Condor kit grants you the sturdiness of a front liner with the safety of mid-range fighting. With a ranged weapon and heavy armour, you fight like a gun turret!',
	type: '',
	armor: [ KitArmor.Heavy ],
	weapon: [ KitWeapon.Bow ],
	stamina: 12,
	speed: 0,
	stability: 1,
	meleeDamage: null,
	rangedDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	meleeDistance: 0,
	rangedDistance: 5,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-condor-signature',
				name: 'Ballista Bolt',
				description: 'You fire a heavy projectile, knocking your enemy back.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createRanged(5) ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage; push 1',
							tier2: '5 + M or A damage; push 2',
							tier3: '7 + M or A damage; push 3'
						})
					)
				]
			})
		})
	]
};
