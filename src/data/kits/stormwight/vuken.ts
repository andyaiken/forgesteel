import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';
import { RollModifierType } from '@/enums/roll-modifier-type';
import { RollType } from '@/enums/roll-type';

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
				target: 'One creature or object',
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
			description: 'Whenever you use the Knockback maneuver, you can then use the Aid Attack maneuver as a free triggered action.'
		}),
		FactoryLogic.feature.createToggle({
			id: 'kit-vuken-feature-2a',
			name: 'Animal Form: Wolf',
			condition: 'You are in your wolf form',
			checked: false,
			featureChecked: FactoryLogic.feature.createMultiple({
				id: 'kit-vuken-feature-2a-1',
				name: 'Animal Form: Wolf',
				features: [
					FactoryLogic.feature.createSize({
						id: 'kit-vuken-feature-2a-1a',
						name: 'Animal Form: Wolf',
						sizeValue: 1,
						sizeMod: 'L'
					}),
					FactoryLogic.feature.createBonus({
						id: 'kit-vuken-feature-2a-1b',
						name: 'Animal Form: Wolf',
						field: FeatureField.Speed,
						value: 2
					}),
					FactoryLogic.feature.create({
						id: 'kit-vuken-feature-2a-1c',
						name: 'Animal Form: Wolf',
						description: 'You ignore difficult terrain.'
					})
				]
			})
		}),
		FactoryLogic.feature.createToggle({
			id: 'kit-vuken-feature-2b',
			name: 'Hybrid Form: Wolf',
			condition: 'You are in your hybrid form',
			checked: false,
			featureChecked: FactoryLogic.feature.createMultiple({
				id: 'kit-vuken-feature-2b-1',
				name: 'Hybrid Form: Wolf',
				features: [
					FactoryLogic.feature.createSize({
						id: 'kit-vuken-feature-2b-1a',
						name: 'Hybrid Form: Wolf',
						sizeValue: 1,
						sizeMod: 'L'
					}),
					FactoryLogic.feature.createBonus({
						id: 'kit-vuken-feature-2b-1b',
						name: 'Hybrid Form: Wolf',
						field: FeatureField.Speed,
						value: 2
					}),
					FactoryLogic.feature.create({
						id: 'kit-vuken-feature-2b-1c',
						name: 'Hybrid Form: Wolf',
						description: 'You ignore difficult terrain. At 4th level, the first time you take hybrid form in an encounter, you gain 10 temporary Stamina.'
					})
				]
			})
		}),
		FactoryLogic.feature.create({
			id: 'kit-vuken-feature-3',
			name: 'Primordial Storm: Lightning Storm',
			description: 'Your primordial damage type is lightning.'
		}),
		FactoryLogic.feature.createMultiple({
			id: 'kit-vuken-feature-4',
			name: 'Growing Ferocity',
			description: 'As your ferocity grows, you gain benefits as noted on the Growing Ferocity table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.',
			features: [
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-vuken-feature-4-2',
					resource: 'Ferocity',
					value: 2,
					feature: FactoryLogic.feature.create({
						id: 'kit-vuken-feature-4-2a',
						name: 'Growing Ferocity (Ferocity 2)',
						description: 'Whenever you use the Knockback maneuver, you can target one additional creature.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-vuken-feature-4-4',
					resource: 'Ferocity',
					value: 4,
					feature: FactoryLogic.feature.create({
						id: 'kit-vuken-feature-4-4a',
						name: 'Growing Ferocity (Ferocity 4)',
						description: 'The first time on a turn that you push a creature or knock a creature prone, you gain 1 surge.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-vuken-feature-4-6',
					resource: 'Ferocity',
					value: 6,
					feature: FactoryLogic.feature.createMultiple({
						id: 'kit-vuken-feature-4-6a',
						name: 'Growing Ferocity (Ferocity 6)',
						features: [
							FactoryLogic.feature.createRollModifier({
								id: 'kit-vuken-feature-4-6a-tests',
								name: 'Growing Ferocity (Ferocity 6)',
								modifier: RollModifierType.Edge,
								characteristics: [ Characteristic.Agility ]
							}),
							FactoryLogic.feature.createRollModifier({
								id: 'kit-vuken-feature-4-6a-maneuvers',
								name: 'Growing Ferocity (Ferocity 6)',
								modifier: RollModifierType.Edge,
								rollType: RollType.Knockback
							})
						]
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-vuken-feature-4-8',
					resource: 'Ferocity',
					value: 8,
					level: 4,
					feature: FactoryLogic.feature.create({
						id: 'kit-vuken-feature-4-8a',
						name: 'Growing Ferocity (Ferocity 8)',
						description: 'The first time on a turn that you push a creature or knock a creature prone, you gain 2 surges.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-vuken-feature-4-10',
					resource: 'Ferocity',
					value: 10,
					level: 7,
					feature: FactoryLogic.feature.createMultiple({
						id: 'kit-vuken-feature-4-10a',
						name: 'Growing Ferocity (Ferocity 10)',
						features: [
							FactoryLogic.feature.createRollModifier({
								id: 'kit-vuken-feature-4-10a-tests',
								name: 'Growing Ferocity (Ferocity 10)',
								modifier: RollModifierType.DoubleEdge,
								characteristics: [ Characteristic.Agility ]
							}),
							FactoryLogic.feature.createRollModifier({
								id: 'kit-vuken-feature-4-10a-maneuvers',
								name: 'Growing Ferocity (Ferocity 10)',
								modifier: RollModifierType.DoubleEdge,
								rollType: RollType.Knockback
							})
						]
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-vuken-feature-4-12',
					resource: 'Ferocity',
					value: 12,
					level: 10,
					feature: FactoryLogic.feature.create({
						id: 'kit-vuken-feature-4-12a',
						name: 'Growing Ferocity (Ferocity 12)',
						description: 'Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you make a power roll that imposes forced movement on a target, the forced movement distance gains a bonus equal to your Agility score.'
					})
				})
			]
		})
	]
};
