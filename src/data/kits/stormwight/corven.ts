import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { Kit } from '../../../models/kit';
import { KitWeapon } from '../../../enums/kit-weapon';

export const corven: Kit = {
	id: 'kit-corven',
	name: 'Corven',
	description: 'With this stormwight kit, you channel your primordial rage into the form of a crow. Corven are tied to the mountain passes and the hot winds that flow through them. This aspect is associated with the katabatic wind.',
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
				id: 'kit-corven-signature',
				name: 'Wing Buffet',
				description: 'Foes who try to close around you do so at their peril.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
				target: 'Each enemy in the area',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Agility ],
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '6 damage'
						})
					),
					FactoryLogic.createAbilitySectionText('You can shift up to 2 squares before or after making the power roll.')
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'kit-corven-feature-1',
			name: 'Aspect Benefits',
			description: 'You gain an edge on tests made to hide and sneak. Additionally, whenever you are falling, you can use a free triggered action to use your Aspect of the Wild ability.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-corven-feature-2a',
			name: 'Animal Form: Crow',
			description: 'When you are in your crow form, your size becomes 1T and your speed gains the Fly keyword. You can use the Hide maneuver as a free maneuver, and you can use your allies as cover when you hide.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-corven-feature-2b',
			name: 'Hybrid Form: Crow',
			description: `
When you are in your hybrid form, your size becomes your choice of 1S or 1M.

Once you reach 4th level, your speed gains the Fly keyword.`
		}),
		FactoryLogic.feature.create({
			id: 'kit-corven-feature-3',
			name: 'Primordial Storm: Katabatic Wind',
			description: 'Your primordial damage type is fire.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-corven-feature-4',
			name: 'Growing Rage',
			description: `
* **Rage 2**: When you take the Disengage move action, you can add your Agility score to the distance you can shift.
* **Rage 4**: Gain one surge the first time on a turn that you shift.
* **Rage 6**: You have an edge on Agility tests and the power roll for the Escape Grab and Knockback maneuvers.`
		})
	]
};
