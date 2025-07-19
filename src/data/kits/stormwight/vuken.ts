import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { Kit } from '../../../models/kit';
import { KitWeapon } from '../../../enums/kit-weapon';

export const vuken: Kit = {
	id: 'kit-vuken',
	name: 'Vuken',
	description: 'With this stormwight kit, you channel your primordial rage into the form of a wolf. Vuken are tied to forests and open steppes, and this aspect is associated with the thunderstorm.',
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
				name: 'Probing Attack',
				description: 'A savage assault forces your foes back.',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: '1 creature or object',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might ],
							tier1: '2 + M damage; A < [weak], prone',
							tier2: '5 + M damage; A < [average], prone',
							tier3: '7 + M damage; A < [strong], prone'
						})
					)
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-1',
			name: 'Aspect Benefits',
			description: 'Whenever you take the Knockback maneuver you can also take the Aid Attack maneuver as a free triggered action.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-2a',
			name: 'Animal Form: Wolf',
			description: 'When you are in your wolf form, your size becomes 1L if it isn’t already, you gain a +2 bonus to speed, and you ignore difficult terrain.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-2b',
			name: 'Hybrid Form: Wolf',
			description: `
When you are in your hybrid form, your size becomes 1L if it isn’t already, you gain a +2 bonus to speed, and you ignore difficult terrain.

Once you reach 4th level, the first time you take hybrid form in an encounter you gain 10 Temporary Stamina.`
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-3',
			name: 'Primordial Storm: Lightning Storm',
			description: 'Your primordial damage type is lightning.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-4',
			name: 'Growing Rage',
			description: `
* **Rage 2**: You can target one additional creature when using the Knockback maneuver.
* **Rage 4**: Gain one surge the first time on a turn that you push a creature or knock another creature prone.
* **Rage 6**: You have an edge on Agility tests and the Knockback maneuver.`
		})
	]
};
