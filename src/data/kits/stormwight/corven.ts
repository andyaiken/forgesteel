import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';

export const corven: Kit = {
	id: 'kit-corven',
	name: 'Corven',
	description: 'With this stormwight kit, you channel your primordial ferocity into the form of a crow, becoming stealthy and quick. Corven are tied to the mountain passes and the hot winds that flow through them. This aspect is associated with the warm and fast-rising anabatic wind.',
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
				description: 'Foes who try to close in around you do so at their peril.',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
				target: 'Each enemy in the area',
				cost: 'signature',
				sections: [
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Agility ],
							tier1: '1 damage',
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
			description: 'You gain an edge on tests made to hide and sneak. Additionally, whenever you fall, you can use a free triggered action to use your Aspect of the Wild ability.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-corven-feature-2a',
			name: 'Animal Form: Crow',
			description: 'While you are in your crow form, your size is 1T and you can fly. You can use the Hide maneuver as a free maneuver, and you can use your allies as cover when you hide. You can’t use any abilities while in this form except for Aspect of the Wild.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-corven-feature-2b',
			name: 'Hybrid Form: Crow',
			description: 'While you are in your hybrid form, your size is your choice of 1S or 1M. At 4th level, you can fly.'
		}),
		FactoryLogic.feature.create({
			id: 'kit-corven-feature-3',
			name: 'Primordial Storm: Anabatic Wind',
			description: 'Your primordial damage type is fire.'
		}),
		FactoryLogic.feature.createMultiple({
			id: 'kit-corven-feature-4',
			name: 'Growing Ferocity',
			description: 'As your ferocity grows, you gain benefits as noted on the Growing Ferocity table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.',
			features: [
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-corven-feature-4-2',
					resource: 'Ferocity',
					value: 2,
					feature: FactoryLogic.feature.create({
						id: 'kit-corven-feature-4-2a',
						name: 'Growing Ferocity (Ferocity 2)',
						description: 'Whenever you use the Disengage move action, the distance you can shift gains a bonus equal to your Agility score.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-corven-feature-4-4',
					resource: 'Ferocity',
					value: 4,
					feature: FactoryLogic.feature.create({
						id: 'kit-corven-feature-4-4a',
						name: 'Growing Ferocity (Ferocity 4)',
						description: 'The first time you shift on a turn, you gain 1 surge.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-corven-feature-4-6',
					resource: 'Ferocity',
					value: 6,
					feature: FactoryLogic.feature.create({
						id: 'kit-corven-feature-4-6a',
						name: 'Growing Ferocity (Ferocity 6)',
						description: 'You gain an edge on Agility tests, the Escape Grab maneuver, and the Knockback maneuver.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-corven-feature-4-8',
					resource: 'Ferocity',
					value: 8,
					level: 4,
					feature: FactoryLogic.feature.create({
						id: 'kit-corven-feature-4-8a',
						name: 'Growing Ferocity (Ferocity 8)',
						description: 'The first time you shift on a turn, you gain 2 surges instead of 1.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-corven-feature-4-10',
					resource: 'Ferocity',
					value: 10,
					level: 7,
					feature: FactoryLogic.feature.create({
						id: 'kit-corven-feature-4-10a',
						name: 'Growing Ferocity (Ferocity 10)',
						description: 'You have a double edge on Agility tests, the Escape Grab maneuver, and the Knockback maneuver.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-corven-feature-4-12',
					resource: 'Ferocity',
					value: 12,
					level: 10,
					feature: FactoryLogic.feature.create({
						id: 'kit-corven-feature-4-12a',
						name: 'Growing Ferocity (Ferocity 12)',
						description: 'Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, the potency of any effects targeting you is reduced by 2 for you.'
					})
				})
			]
		})
	]
};
