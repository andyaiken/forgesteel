import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const raider: Kit = {
	id: 'kit-raider',
	name: 'Raider',
	description: 'The Raider kit keeps you protected while granting you full mobility, providing a boost to speed and distance that lets you run around the battlefield like a Viking warrior.',
	type: '',
	armor: [ KitArmor.Light, KitArmor.Shield ],
	weapon: [ KitWeapon.Light ],
	stamina: 6,
	speed: 1,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	rangedDamage: FactoryLogic.createKitDamageBonus(1, 1, 1),
	meleeDistance: 0,
	rangedDistance: 5,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-raider-signature',
				name: 'Shock and Awe',
				description: 'You execute a brutal strike that leaves your foe reeling.',
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
							tier1: '2 + M or A damage',
							tier2: '5 + M or A damage',
							tier3: '7 + M or A damage'
						})
					),
					FactoryLogic.createAbilitySectionText('The target takes a bane on their next power roll made before the end of their next turn')
				]
			})
		})
	]
};
