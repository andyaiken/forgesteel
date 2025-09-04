import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { Kit } from '../../models/kit';
import { KitArmor } from '../../enums/kit-armor';
import { KitWeapon } from '../../enums/kit-weapon';

export const ranger: Kit = {
	id: 'kit-ranger',
	name: 'Ranger',
	description: 'The Ranger kit outfits you with light armor and weapons for every challenge, letting you easily switch between melee and ranged combat. This kit provides a good balance of bonuses to defense and offense to create a hero who is a jack-of-all-trades.',
	type: '',
	armor: [ KitArmor.Medium ],
	weapon: [ KitWeapon.Medium, KitWeapon.Bow ],
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
				id: 'kit-ranger-signature',
				name: 'Hamstring Shot',
				description: 'A well-placed shot leaves your enemy struggling to move.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createRanged(5) ],
				target: 'One creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility ],
							tier1: '2 + M or A damage; A < [weak] slowed (save ends)',
							tier2: '4 + M or A damage; A < [average] slowed (save ends)',
							tier3: '6 + M or A damage; A < [strong] slowed (save ends)'
						})
					)
				]
			})
		})
	]
};
