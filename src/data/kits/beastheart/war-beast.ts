import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';

export const warBeast: Kit = {
	id: 'kit-war-beast',
	name: 'War Beast',
	description: 'You may not be the fastest to reach your objective, but you’re hard to dislodge when you arrive. Gleaming spikes and massive armor plates protect you and your companion while you hold the line of battle together. This kit is most often used by Guardians and Punishers who wish to outmuscle their foes and then trample them underfoot.',
	type: 'Beastheart',
	armor: [ KitArmor.Heavy, KitArmor.Shield ],
	weapon: [ KitWeapon.Heavy ],
	stamina: 9,
	speed: 0,
	stability: 3,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-war-beast-1',
				name: 'Trampling Charge',
				description: 'A mountain of muscle plunges down on a helpless foe.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionText('2 + M damage; M < medium, prone'),
					FactoryLogic.createAbilitySectionText('You can move up to three squares after the strike. During this move, a prone enemy’s space doesn’t count as difficult terrain, and the first time you enter each prone enemy’s space you deal damage equal to your Might score.'),
					FactoryLogic.createAbilitySectionField({
						name: 'Spend',
						value: 1,
						effect: 'If the target is M < [strong], they are prone.'
					})
				]
			})
		})
	]
};
