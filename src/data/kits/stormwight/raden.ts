import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';

export const raden: Kit = {
	id: 'kit-raden',
	name: 'Raden',
	description: 'With this stormwight kit, you channel your primordial ferocity into the form of a rat, becoming mobile and elusive. Raden are associated with the wild nature of the rat, before cities became their habitat. This aspect is associated with the rat flood—a surge of corrupted water that draws forth hordes of rats.',
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
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature or objects',
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
			description: 'While you are in your rat form, your size is 1T and you can automatically climb at full speed while moving. You can use the Hide maneuver as a free maneuver, you can use your allies as cover when you hide, and you can stay hidden while you move through squares occupied by any creature. Additionally, you gain an edge on tests made to climb other creatures. You can’t use any abilities while in this form except for Aspect of the Wild.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-raden-feature-2b',
			name: 'Hybrid Form: Rat',
			description: 'While you are in your hybrid form, your size is your choice of 1S or 1M. At 4th level, you can automatically climb at full speed while moving.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-raden-feature-3',
			name: 'Primordial Storm: Rat Flood',
			description: 'Your primordial damage type is corruption.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-raden-feature-4',
			name: 'Growing Ferocity',
			description: `
* **Ferocity 2**: Whenever you use the Disengage move action, the distance you can shift gains a bonus equal to your Agility score.
* **Ferocity 4**: The first time you shift on a turn, you gain 1 surge.
* **Ferocity 6**: You gain an edge on Agility tests, the Escape Grab maneuver, and the Knockback maneuver.
* **Ferocity 8 (4th level)**: The first time you shift on a turn, you gain 2 surges instead of 1.
* **Ferocity 10 (7th level)**: You have a double edge on Agility tests, the Escape Grab maneuver, and the Knockback maneuver.
* **Ferocity 12 (10th level)**: Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, the potency of any effects targeting you is reduced by 2 for you.`
		})
	]
};
