import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';

export const predator: Kit = {
	id: 'kit-predator',
	name: 'Predator',
	description: 'The Predator kit lets you move fast and strike hard. It’s commonly used by Prowlers, but it’s also useful for Sparks who want to stay out of their enemies’ way and for Guardians and Punishers who want to overwhelm their enemies with speed and power.',
	type: 'Beastheart',
	armor: [ KitArmor.Light ],
	weapon: [ KitWeapon.Light ],
	stamina: 6,
	speed: 2,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	rangedDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-predator-1',
				name: 'Assassin\'s Leap',
				description: 'You spring forward, leaving a wounded foe in your wake.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionText('Before using this ability, you can jump in a straight line up to a number of squares equal to your Intuition score. During this jump, you can pass through enemies’ spaces without them counting as difficult terrain. You deal extra damage equal to the number of squares you jumped.'),
					FactoryLogic.createAbilitySectionText('2 + M damage'),
					FactoryLogic.createAbilitySectionField({
						name: 'Spend',
						value: 1,
						effect: 'Your jump doesn’t provoke opportunity attacks.'
					})
				]
			})
		})
	]
};
