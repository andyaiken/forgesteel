import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';

export const boren: Kit = {
	id: 'kit-boren',
	name: 'Boren',
	description: 'With this stormwight kit, you channel your primordial ferocity into the form of a bear, becoming large, durable, and imposing. Boren are tied to the craggy, rocky north, and this aspect is associated with the blizzard’s bitter cold.',
	type: 'Stormwight',
	armor: [],
	weapon: [ KitWeapon.Unarmed ],
	stamina: 9,
	speed: 0,
	stability: 2,
	meleeDamage: FactoryLogic.createKitDamageBonus(0, 0, 4),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 0,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-boren-signature',
				name: 'Bear Claws',
				description: 'Attacks with your sharp and deadly claws grab the weak.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might ],
							tier1: '2 + M damage; M < [weak], grabbed',
							tier2: '5 + M damage; M < [average], grabbed',
							tier3: '7 + M damage; M < [strong], grabbed'
						})
					)
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'kit-boren-feature-1',
			name: 'Aspect Benefits',
			description: 'Whenever you use forced movement to push a creature, you can pull that creature instead. Whenever you pull a creature adjacent to you and that creature has M < [average], you can use a free triggered action to make that creature grabbed by you.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-boren-feature-2a',
			name: 'Animal Form: Bear',
			description: 'While you are in your bear form, your size is 2 and you gain a +1 bonus to distance with melee weapon abilities.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-boren-feature-2b',
			name: 'Hybrid Form: Bear',
			description: 'While you are in your hybrid form, your size is 2 and you gain a +1 bonus to distance with melee weapon abilities. At 4th level, the first time you take hybrid form in an encounter, you gain 10 temporary Stamina.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-boren-feature-3',
			name: 'Primordial Storm: Blizzard',
			description: 'Your primordial damage type is cold.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-boren-feature-4',
			name: 'Growing Ferocity',
			description: `
* **Ferocity 2**: You can have up to two creatures grabbed at time. Additionally, whenever you make a strike against a creature you have grabbed, you gain 1 surge.
* **Ferocity 4**: The first time you grab a creature on a turn, you gain 1 surge.
* **Ferocity 6**: You gain an edge on the Grab and Knockback maneuvers.
* **Ferocity 8 (4th level)**: The first time you grab a creature on a turn, you gain 2 surges instead of 1.
* **Ferocity 10 (7th level)**: You have a double edge on the Grab and Knockback maneuvers.
* **Ferocity 12 (10th level)**: Whnever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you have a creature grabbed, any ability roll made against that creature gains a bonus to its potency equal to your Might score.`
		})
	]
};
