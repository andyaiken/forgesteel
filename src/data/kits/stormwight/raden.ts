import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Kit } from '@/models/kit';
import { KitWeapon } from '@/enums/kit-weapon';
import { RollModifierType } from '@/enums/roll-modifier-type';
import { RollType } from '@/enums/roll-type';

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
		FactoryLogic.feature.createMultiple({
			id: 'kit-raden-feature-1',
			name: 'Aspect Benefits',
			features: [
				FactoryLogic.feature.create({
					id: 'kit-raden-feature-1a',
					name: 'Aspect Benefits',
					description: 'You ignore difficult terrain.'
				}),
				FactoryLogic.feature.createRollModifier({
					id: 'kit-raden-feature-1b',
					name: 'Aspect Benefits',
					modifier: RollModifierType.Edge,
					skills: [ 'Hide', 'Sneak' ]
				})
			]
		}),
		FactoryLogic.feature.createToggle({
			id: 'kit-raden-feature-2a',
			name: 'Animal Form: Rat',
			condition: 'You are in your rat form',
			checked: false,
			featureChecked: FactoryLogic.feature.createMultiple({
				id: 'kit-raden-feature-2a-1',
				name: 'Animal Form: Rat',
				features: [
					FactoryLogic.feature.createSize({
						id: 'kit-raden-feature-2a-1a',
						name: 'Animal Form: Rat',
						sizeValue: 1,
						sizeMod: 'T'
					}),
					FactoryLogic.feature.createMovementMode({
						id: 'kit-raden-feature-2a-1b',
						name: 'Animal Form: Rat',
						mode: 'Climb'
					}),
					FactoryLogic.feature.create({
						id: 'kit-raden-feature-2a-1c',
						name: 'Animal Form: Rat',
						description: 'You can automatically climb at full speed while moving. You can use the Hide maneuver as a free maneuver, you can use your allies as cover when you hide, and you can stay hidden while you move through squares occupied by any creature. Additionally, you gain an edge on tests made to climb other creatures. You can’t use any abilities while in this form except for Aspect of the Wild.'
					})
				]
			})
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
		FactoryLogic.feature.createMultiple({
			id: 'kit-raden-feature-4',
			name: 'Growing Ferocity',
			description: 'As your ferocity grows, you gain benefits as noted on the Growing Ferocity table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.',
			features: [
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-raden-feature-4-2',
					resource: 'Ferocity',
					value: 2,
					feature: FactoryLogic.feature.create({
						id: 'kit-raden-feature-4-2a',
						name: 'Growing Ferocity (Ferocity 2)',
						description: 'Whenever you use the Disengage move action, the distance you can shift gains a bonus equal to your Agility score.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-raden-feature-4-4',
					resource: 'Ferocity',
					value: 4,
					feature: FactoryLogic.feature.create({
						id: 'kit-raden-feature-4-4a',
						name: 'Growing Ferocity (Ferocity 4)',
						description: 'The first time you shift on a turn, you gain 1 surge.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-raden-feature-4-6',
					resource: 'Ferocity',
					value: 6,
					feature: FactoryLogic.feature.createMultiple({
						id: 'kit-raden-feature-4-6a',
						name: 'Growing Ferocity (Ferocity 6)',
						features: [
							FactoryLogic.feature.createRollModifier({
								id: 'kit-raden-feature-4-6a-tests',
								name: 'Growing Ferocity (Ferocity 6)',
								modifier: RollModifierType.Edge,
								characteristics: [ Characteristic.Agility ]
							}),
							FactoryLogic.feature.createRollModifier({
								id: 'kit-raden-feature-4-6a-maneuvers-escape',
								name: 'Growing Ferocity (Ferocity 6)',
								modifier: RollModifierType.Edge,
								rollType: RollType.EscapeGrab
							}),
							FactoryLogic.feature.createRollModifier({
								id: 'kit-raden-feature-4-6a-maneuvers-knockback',
								name: 'Growing Ferocity (Ferocity 6)',
								modifier: RollModifierType.Edge,
								rollType: RollType.Knockback
							})
						]
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-raden-feature-4-8',
					resource: 'Ferocity',
					value: 8,
					level: 4,
					feature: FactoryLogic.feature.create({
						id: 'kit-raden-feature-4-8a',
						name: 'Growing Ferocity (Ferocity 8)',
						description: 'The first time you shift on a turn, you gain 2 surges instead of 1.'
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-raden-feature-4-10',
					resource: 'Ferocity',
					value: 10,
					level: 7,
					feature: FactoryLogic.feature.createMultiple({
						id: 'kit-raden-feature-4-10a',
						name: 'Growing Ferocity (Ferocity 10)',
						features: [
							FactoryLogic.feature.createRollModifier({
								id: 'kit-raden-feature-4-10a-tests',
								name: 'Growing Ferocity (Ferocity 10)',
								modifier: RollModifierType.DoubleEdge,
								characteristics: [ Characteristic.Agility ]
							}),
							FactoryLogic.feature.createRollModifier({
								id: 'kit-raden-feature-4-10a-maneuvers-escape',
								name: 'Growing Ferocity (Ferocity 10)',
								modifier: RollModifierType.DoubleEdge,
								rollType: RollType.EscapeGrab
							}),
							FactoryLogic.feature.createRollModifier({
								id: 'kit-raden-feature-4-10a-maneuvers-knockback',
								name: 'Growing Ferocity (Ferocity 10)',
								modifier: RollModifierType.DoubleEdge,
								rollType: RollType.Knockback
							})
						]
					})
				}),
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'kit-raden-feature-4-12',
					resource: 'Ferocity',
					value: 12,
					level: 10,
					feature: FactoryLogic.feature.create({
						id: 'kit-raden-feature-4-12a',
						name: 'Growing Ferocity (Ferocity 12)',
						description: 'Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, the potency of any effects targeting you is reduced by 2 for you.'
					})
				})
			]
		})
	]
};
