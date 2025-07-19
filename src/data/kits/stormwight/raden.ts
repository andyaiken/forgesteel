import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { Kit } from '../../../models/kit';
import { KitWeapon } from '../../../enums/kit-weapon';

export const raden: Kit = {
	id: 'kit-raden',
	name: 'Raden',
	description: 'With this stormwight kit, you channel your primordial rage into the form of a rat. Raden are associated with the true nature of the rat, before cities became their habitat. Rats are avatars of the balance between green and rot, and this aspect is associated with the rat flood.',
	type: 'Stormwight',
	armor: [],
	weapon: [ KitWeapon.Unarmed ],
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
				id: 'kit-raden-signature',
				name: 'Driving Pounce',
				description: 'Your enemies try in vain to fall back from your pouncing attack.',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '2 creatures or objects',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Agility ],
							tier1: '2 + A damage',
							tier2: '5 + A damage; push 1',
							tier3: '7 + A damage; push 2'
						})
					),
					FactoryLogic.createAbilitySectionText('You can shift up to the same number of squares that you pushed the target.')
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'kit-raden-feature-1',
			name: 'Aspect Benefits',
			description: 'You gain an edge on tests made to hide and sneak. Additionally, you ignore difficult terrain.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-raden-feature-2a',
			name: 'Animal Form: Rat',
			description: 'When you are in your rat form, your size becomes 1T and your speed gains the Climb keyword. You can use the Hide maneuver as a free maneuver, and you can use your allies as cover when hiding. You can stay hidden while you move through any square occupied by a creature and gain an edge on tests made to climb other creatures.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-raden-feature-2b',
			name: 'Hybrid Form: Rat',
			description: `
When you are in your hybrid form, your size becomes your choice of 1S or 1M.

Once you reach 4th level, your speed gains the Climb keyword in hybrid form.`
		}),
		FactoryLogic.feature.create({
			id: 'kit-raden-feature-3',
			name: 'Primordial Storm: Rat Flood',
			description: 'Your primordial damage type is corruption.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-raden-feature-4',
			name: 'Growing Rage',
			description: `
* **Rage 2**: When you take the Disengage move action, you can add your Agility score to the distance you can shift.
* **Rage 4**: Gain one surge the first time on a turn that you shift.
* **Rage 6**: You have an edge on Agility tests, the Escape Grab maneuver, and the Knockback maneuver.`
		})
	]
};
