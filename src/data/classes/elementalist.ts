import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { SkillList } from '../../enums/skill-list';

export const elementalist: HeroClass = {
	id: 'class-elementalist',
	name: 'Elementalist',
	description: 'Air for movement. Earth for permanence. Fire for destruction. Water for change. Green for growth. Rot for death. Void for the unknown. Years of study and practice and poring over tomes brought you the revelations that allow you to manipulate these building blocks of reality. Now you use your mastery of the seven elements to destroy, create, and warp the world with magic.',
	heroicResource: 'Essence',
	subclassName: 'Elemental Specialization',
	subclassCount: 1,
	primaryCharacteristics: [ Characteristic.Reason, Characteristic.Intuition ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.feature.createBonusFeature({
					id: 'elementalist-stamina',
					field: FeatureField.Stamina,
					value: 15,
					valuePerLevel: 6
				}),
				FeatureLogic.feature.createBonusFeature({
					id: 'elementalist-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FeatureLogic.feature.createSkillFeature({
					id: 'elementalist-1-1',
					skill: 'Magic'
				}),
				FeatureLogic.feature.createSkillChoiceFeature({
					id: 'elementalist-1-2',
					listOptions: [ SkillList.Crafting, SkillList.Lore ],
					count: 3
				}),
				FeatureLogic.feature.createFeature({
					id: 'elementalist-1-3',
					name: 'Essence',
					description: 'At the start of each of your turns during combat, you gain 2 essence.'
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'elementalist-1-4',
						name: 'Hurl Element',
						description: 'You hurl a ball of elemental energy at a nearby foe.',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ AbilityLogic.distance.createRanged(5) ],
						target: '1 creature or object',
						powerRoll: AbilityLogic.createPowerRoll({
							characteristic: [ Characteristic.Reason ],
							tier1: '2 damage (type varies)',
							tier2: '6 damage (type varies)',
							tier3: '9 damage (type varies)'
						}),
						effect: 'When you make this attack, choose the damage type from one of the following options: acid, cold, corruption, fire, lightning, poison, or sonic.'
					})
				}),
				FeatureLogic.feature.createFeature({
					id: 'elementalist-1-5',
					name: 'Persistent Magic',
					description: 'Some of your heroic abilities have the Persistent keyword. Whenever you use a persistent ability, you decide whether you want to maintain it. If you maintain a persistent ability in combat, you reduce the amount of essence you earn at the start of your turn by an amount equal to the ability’s persistent value, which enables the ability’s persistent effect. All your active persistent abilities end when combat ends.'
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'elementalist-1-6',
						name: 'Practical Magic',
						description: 'Your mastery of elemental power lets you customize your magic.',
						type: AbilityLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ AbilityLogic.distance.createSelf() ],
						target: 'Self',
						effect: `
Choose one of the following effects:
• You use the Knockback maneuver, but you make a Reason test instead of a Might test. For this use of the maneuver, you can target a creature at a distance equal to the distance of your Hurl Element ability.
• You choose a creature within the distance of your Hurl Element ability and deal damage to that creature equal to your Reason score. The damage type can be acid, cold, corruption, fire, lightning, poison, or sonic.
• You teleport a number of squares equal to your Reason score.`
					})
				}),
				FeatureLogic.feature.createKitChoiceFeature({
					id: 'elementalist-1-6.5'
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'elementalist-1-7',
					cost: 0
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'elementalist-1-8',
					cost: 3
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'elementalist-1-9',
					cost: 5
				})
			]
		}
	],
	abilities: [
		AbilityLogic.createAbility({
			id: 'elementalist-ability-1',
			name: 'Debris',
			description: 'A sudden storm of detritus assaults your foes and leaves them struggling to move.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
			target: 'All enemies',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 damage',
				tier2: '3 damage',
				tier3: '4 damage'
			}),
			effect: 'The ground beneath the area becomes difficult terrain for your enemies.'
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-2',
			name: 'Fire Lance',
			description: 'A jet of fire erupts with elemental fury where it strikes.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(5) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 fire damage; push 2',
				tier2: '6 fire damage; push 3',
				tier3: '9 fire damage; push 5'
			})
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-3',
			name: 'Growing Pains',
			description: 'Whipping vines erupt from a foe’s body to grasp at another close by.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(5) ],
			target: '1 creature',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 damage',
				tier2: '6 damage',
				tier3: '9 damage'
			}),
			effect: 'A creature within 5 squares of the target is pulled 2 squares toward the target.'
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-4',
			name: 'Void Ray',
			description: 'A beam of energy corrupts and hinders whatever it touches.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
			distance: [ AbilityLogic.distance.createRanged(5) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 corruption damage',
				tier2: '6 corruption damage; slowed (EoT)',
				tier3: '9 corruption damage; slowed (EoT)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-5',
			name: 'Burn!',
			description: 'Fire engulfs a target of your choice and burns at your command.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Persistent, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(5) ],
			target: '1 creature or object',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '6 fire damage',
				tier2: '8 fire damage',
				tier3: '13 fire damage'
			}),
			persistence: [
				{
					value: 1,
					effect: 'If the target is within distance at the start of your turn, make a power roll for this ability again.'
				}
			]
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-6',
			name: 'Invigorating Growth',
			description: 'Mushrooms erupt from a foe, sapping their vitality to spread strengthening spores.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(5) ],
			target: '1 creature',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '6 poison damage',
				tier2: '9 poison damage',
				tier3: '14 poison damage'
			}),
			effect: 'The mushrooms can be removed by the target or by an adjacent creature as an action. While the mushrooms are on the target, each of your allies adjacent to the target gains an edge on attacks against them.'
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-7',
			name: 'Punch The Earth',
			description: 'You slam the ground, which buckles out from you in every direction.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Earth, AbilityKeyword.Magic ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'All enemies',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '4 damage',
				tier2: '5 damage',
				tier3: '8 damage; prone'
			}),
			effect: 'You must be touching the ground or floor to use this ability. The surface beneath the area becomes difficult terrain for your enemies.'
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-8',
			name: 'Stare Into The Abyss',
			description: 'You open a rift into the void to harry your enemies.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Persistent, AbilityKeyword.Ranged, AbilityKeyword.Void ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 5 }) ],
			target: 'All enemies',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '3 psychic damage',
				tier2: '4 psychic damage',
				tier3: '6 psychic damage'
			}),
			persistence: [
				{
					value: 1,
					effect: 'At the start of your turn, you can use this ability again as a maneuver without spending essence.'
				}
			]
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-9',
			name: 'Conflagration',
			description: 'A storm of fire descends upon your enemies.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Persistent, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 5 }) ],
			target: 'All enemies',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '5 fire damage',
				tier2: '7 fire damage',
				tier3: '10 fire damage'
			}),
			persistence: [
				{
					value: 2,
					effect: 'At the start of your turn, you can use this ability again as a maneuver without spending essence.'
				}
			]
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-10',
			name: 'Incorporealness',
			description: 'The material substance of a creature shreds away at your command.',
			type: AbilityLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Persistent, AbilityKeyword.Void ],
			distance: [
				AbilityLogic.distance.createSelf(),
				AbilityLogic.distance.createReach(1)
			],
			target: 'Self or 1 ally',
			cost: 5,
			effect: 'Until the start of your next turn, the target has damage immunity 5 and can move through 1 square of solid matter once per turn. If the target ends their turn inside solid matter, they are shunted out into the space where they entered it and this effect ends.',
			persistence: [
				{
					value: 1,
					effect: 'The effect lasts until the start of your next turn.'
				}
			]
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-11',
			name: 'Nourishing Rain',
			description: 'You call down a rain that burns your enemies and restores your allies.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Green, AbilityKeyword.Magic ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
			target: 'All enemies',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '3 acid damage',
				tier2: '5 acid damage',
				tier3: '7 acid damage'
			}),
			effect: 'You and each ally in the area suffering any effect that has a duration of EoT or is ended by a resistance roll has all such effects end.'
		}),
		AbilityLogic.createAbility({
			id: 'elementalist-ability-12',
			name: 'Open The Earth',
			description: 'The surface of the world around you opens up at your command.',
			type: AbilityLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Persistent, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(5) ],
			target: 'Special',
			cost: 5,
			preEffect: 'You open four holes with 1-square openings that are 6 squares deep, and which can be placed on any mundane surface within distance. You can place these holes next to each other to create fewer holes with wider openings. For each creature standing above a hole when it opens and small enough to fall in, make a power roll.',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: 'The target can shift up to 1 square from the edge of the hole to the nearest unoccupied space of their choice.',
				tier2: 'The target falls into the hole.',
				tier3: 'The target falls into the hole and can’t reduce the height of the fall.'
			}),
			persistence: [
				{
					value: 1,
					effect: 'At the start of your turn, you open another hole.'
				}
			]
		})
	],
	subclasses: [
		{
			id: 'elementalist-sub-1',
			name: 'Earth',
			description: 'Earth is the element of permanence. Earth abilities create and shape physical terrain in a permanent way, and bolster the strength and hardiness of allies.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createAbilityCostFeature({
							id: 'elementalist-sub-1-1-0',
							keywords: [ AbilityKeyword.Earth ],
							modifier: -1
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'elementalist-sub-1-1-1',
								name: 'Manipulate Earth',
								description: 'The earth rises, falls, or opens at your command.',
								type: AbilityLogic.type.createAction(),
								keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Melee ],
								distance: [ AbilityLogic.distance.createReach(1) ],
								target: 'Special',
								cost: 3,
								effect: 'You touch a square containing mundane dirt, stone, or metal and create a 5 wall of the same material, which rises up out of the ground and must include the square you touched.',
								alternateEffects: [
									'You touch a structure of mundane dirt, stone, or metal that takes up at least 2 squares. You can open a 1-square opening in the structure where you touched it.',
									'You touch a doorway or other opening in a mundane dirt, stone, or metal surface that is no larger than 1 square. The opening is sealed by the same material that makes up the surface.'
								],
								spend: [
									{
										value: 0,
										effect: 'You can use this ability without spending essence. If you do, you must spend 1 uninterrupted minute using the ability while within reach of the target before its effect occurs.'
									}
								]
							})
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'elementalist-sub-1-1-2',
								name: 'Earthen Force',
								description: 'You imbue an attack with the strength of stone.',
								type: AbilityLogic.type.createTrigger('The target makes a melee attack.'),
								keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ AbilityLogic.distance.createRanged(5) ],
								target: 'Self or 1 ally',
								effect: 'The attack deals extra damage equal to 3 times your Reason score.',
								spend: [
									{
										value: 1,
										effect: 'The attack deals extra damage equal to 4 times your Reason score instead, and pushes the target a number of squares equal to your Reason score.'
									}
								]
							})
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'elementalist-sub-2',
			name: 'Fire',
			description: 'Fire is the element of destruction. Fire abilities harm enemies and objects.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createAbilityCostFeature({
							id: 'elementalist-sub-2-1-0',
							keywords: [ AbilityKeyword.Fire ],
							modifier: -1
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'elementalist-sub-2-1-1',
								name: 'Melt',
								description: 'With the merest touch, you cause an object to turn into slag or ash.',
								type: AbilityLogic.type.createAction(),
								keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Melee ],
								distance: [ AbilityLogic.distance.createReach(1) ],
								target: '1 mundane object',
								cost: 3,
								effect: 'You heat the target and cause it to combust and melt. If the object is larger than 1 square, then only the square of the object that you touch is destroyed.',
								spend: [
									{
										value: 0,
										effect: 'You can use this ability without spending essence. If you do, you must spend 1 uninterrupted minute using the ability while touching the target before its effect occurs.'
									}
								]
							})
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'elementalist-sub-2-1-2',
								name: 'Explosive Assistance',
								description: 'You add a little magic to an ally’s aggression at just the right time.',
								type: AbilityLogic.type.createTrigger('The target force moves a creature or object.'),
								keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ AbilityLogic.distance.createRanged(5) ],
								target: 'Self or 1 ally',
								effect: 'The distance of the forced movement is increased by a number of squares equal to your Reason score.',
								spend: [
									{
										value: 1,
										effect: 'The distance of the forced movement is increased by a number of squares equal to twice your Reason score instead.'
									}
								]
							})
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'elementalist-sub-3',
			name: 'Green',
			description: 'Green is the element of creation and growth. Green abilities make and manipulate plants, fungi, and other forms of life to hamper foes and nourish your allies.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createAbilityCostFeature({
							id: 'elementalist-sub-3-1-0',
							keywords: [ AbilityKeyword.Green ],
							modifier: -1
						}),
						FeatureLogic.feature.createFeature({
							id: 'elementalist-sub-3-1-1',
							name: 'Speech Of The Wild',
							description: `
You can speak with and understand Animals, Plant Creatures, and Monstrosities, even if they don’t share a language with you. Your ability to communicate with such creatures doesn’t make them inherently more intelligent or less hostile toward you.
Additionally, when you touch a living plant object, you can communicate with it telepathically. You can use words to communicate with the plant, but it communicates with you only by transmitting feelings and sensations that can’t be overly specific.`
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'elementalist-sub-3-1-2',
								name: 'Mend The Soul',
								description: 'The power you channel grants the ability to get back in the fight.',
								type: AbilityLogic.type.createTrigger('The target starts their turn.'),
								keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ AbilityLogic.distance.createRanged(5) ],
								target: 'Self or 1 ally',
								effect: 'The target can spend a Recovery.'
							})
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'elementalist-sub-4',
			name: 'Void',
			description: 'Void is the element of the unknown. Void abilities warp space and reality, allowing you to teleport, create illusions, and make things incorporeal.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createAbilityCostFeature({
							id: 'elementalist-sub-4-1-0',
							keywords: [ AbilityKeyword.Void ],
							modifier: -1
						}),
						FeatureLogic.feature.createFeature({
							id: 'elementalist-sub-4-1-1',
							name: 'Void Sense',
							description: 'You instantly recognize illusions for what they are, you can see invisible creatures, and supernatural effects can’t conceal creatures and objects from you. You always know if an area or object you observe is magical or affected by magic, and the specifics of what that magic can do.'
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'elementalist-sub-4-1-2',
								name: 'Shared Void Sense',
								description: 'You share your special senses with others.',
								type: AbilityLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
								distance: [ AbilityLogic.distance.createRanged(5) ],
								target: '1 creature',
								cost: 2,
								effect: 'The target gains the benefit of your Void Sense feature until the end of your next turn, but doesn’t gain the use of Shared Void Sense.',
								spend: [
									{
										effect: 'For each additional point of essence you spend, you can target an additional creature.'
									}
								]
							})
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'elementalist-sub-4-1-3',
								name: 'Void Embrace',
								description: 'You call on the void to swallow and spit out an ally.',
								type: AbilityLogic.type.createTrigger('The target starts their turn or moves.'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
								distance: [
									AbilityLogic.distance.createSelf(),
									AbilityLogic.distance.createRanged(5)
								],
								target: 'Self or 1 ally',
								effect: 'At any point during the move, you teleport the target a number of squares equal to your Reason.',
								spend: [
									{
										value: 1,
										effect: 'You teleport the target a number of squares equal to twice your Reason score instead.'
									}
								]
							})
						})
					]
				}
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};
