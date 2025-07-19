import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { Kit } from '../../../models/kit';
import { KitWeapon } from '../../../enums/kit-weapon';

export const boren: Kit = {
	id: 'kit-boren',
	name: 'Boren',
	description: 'With this stormwight kit, you channel your primordial rage into the form of a bear, becoming large, durable, and imposing. Boren are tied to the craggy, rocky north, and this aspect is associated with the blizzard’s bitter cold.',
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
				description: 'Attacks with your sharp and deadly claws send your foes staggering back.',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature or object',
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
			description: 'Whenever you use forced movement to push a creature, you can pull that creature instead. Whenever you pull a creature adjacent to you and that creature has M < [average], you can use a free triggered action to grab that creature.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-boren-feature-2a',
			name: 'Animal Form: Bear',
			description: 'When you are in your bear form, your size becomes 2, and you gain a +2 bonus to speed and a +1 bonus to distance with melee weapon abilities.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-boren-feature-2b',
			name: 'Hybrid Form: Bear',
			description: `
When you are in your hybrid form, your size becomes 2, and you gain a +2 bonus to speed and a +1 bonus to distance with melee weapon abilities.

Once you reach 4th level, the first time you take hybrid form in an encounter you gain 10 Temporary Stamina.`
		}),
		FactoryLogic.feature.create({
			id: 'kit-boren-feature-3',
			name: 'Primordial Storm: Blizzard',
			description: 'Your primordial damage type is cold.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-boren-feature-4',
			name: 'Growing Rage',
			description: `
* **Rage 2**: You can grab up to 2 creatures and gain a surge whenever you attack a creature you have grabbed.
* **Rage 4**: Gain one surge the first time on a turn that you grab a creature.
* **Rage 6**: You have an edge on power rolls for the Knockback and Grab maneuvers, and creatures have a bane on power rolls made to escape being grabbed by you.`
		})
	]
};
