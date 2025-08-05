import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { Kit } from '../../../models/kit';
import { KitWeapon } from '../../../enums/kit-weapon';

export const vuken: Kit = {
	id: 'kit-vuken',
	name: 'Vuken',
	description: 'With this stormwight kit, you channel your primordial ferocity into the form of a wolf, becoming a fleet-footed hunter. Vuken are tied to forests and open steppes, and this aspect is associated with the thunderstorm.',
	type: 'Stormwight',
	armor: [],
	weapon: [ KitWeapon.Unarmed ],
	stamina: 9,
	speed: 2,
	stability: 0,
	meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
	rangedDamage: null,
	meleeDistance: 0,
	rangedDistance: 0,
	disengage: 1,
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'kit-vuken-signature',
				name: 'Unbalancing Attack',
				description: 'A wild assault forces your foe onto their back.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might ],
							tier1: '4 + M damage; A < [weak], prone',
							tier2: '7 + M damage; A < [average], prone',
							tier3: '9 + M damage; A < [strong], prone'
						})
					)
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-1',
			name: 'Aspect Benefits',
			description: 'Whenever you use the Knockback maneuver, you can then use the Aid Attack maneuver as a free triggered action.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-2a',
			name: 'Animal Form: Wolf',
			description: 'While you are in your wolf form, your size is 1L, you have a +2 bonus to speed, and you ignore difficult terrain.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-2b',
			name: 'Hybrid Form: Wolf',
			description: 'While you are in your hybrid form, your size is 1L, you have a +2 bonus to speed, and you ignore difficult terrain. At 4th level, the first time you take hybrid form in an encounter, you gain 10 temporary Stamina.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-3',
			name: 'Primordial Storm: Lightning Storm',
			description: 'Your primordial damage type is lightning.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-4',
			name: 'Growing Ferocity',
			description: `
* **Ferocity 2**: Whenever you use the Knockback maneuver, you can target one additional creature.
* **Ferocity 4**: The first time on a turn that you push a creature or knock a creature prone, you gain 1 surge.
* **Ferocity 6**: You gain an edge on Agility tests and the Knockback maneuver.
* **Ferocity 8 (4th level)**: The first time on a turn that you push a creature or knock a creature prone, you gain 2 surges.
* **Ferocity 10 (7th level)**: You have a double edge on Agility tests and the Knockback maneuver.
* **Ferocity 12 (10th level)**: Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you make a power roll that imposes forced movement on a target, the forced movement distance gains a bonus equal to your Agility score.`
		})
	]
};
