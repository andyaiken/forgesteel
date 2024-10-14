import { KitType, KitWeapon } from '../../enums/kit';
import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { KitLogic } from '../../logic/kit-logic';
import { SkillList } from '../../enums/skill-list';

export const fury: HeroClass = {
	id: 'class-fury',
	name: 'Fury',
	description: 'You do not temper the heat of battle within you, you unleash it! Like a raptor, a panther, a wolf, your experience in the wild taught you the secret of channeling unfettered anger into martial prowess. Primordial chaos is your ally. Leave it to others to use finesse to clean up the pieces you leave behind.',
	heroicResource: 'Rage',
	subclassName: 'Primordial Aspect',
	subclassCount: 1,
	primaryCharacteristics: [ Characteristic.Might, Characteristic.Agility ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.createBonusFeature({
					id: 'fury-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 10
				}),
				FeatureLogic.createBonusFeature({
					id: 'fury-recoveries',
					field: FeatureField.Recoveries,
					value: 12
				}),
				FeatureLogic.createSkillFeature({
					id: 'fury-1-1',
					skill: 'Nature'
				}),
				FeatureLogic.createSkillChoiceFeature({
					id: 'fury-1-2',
					listOptions: [ SkillList.Exploration, SkillList.Intrigue ],
					count: 2
				}),
				FeatureLogic.createFeature({
					id: 'fury-1-3',
					name: 'Rage',
					description: 'At the start of each of your turns during combat, you gain 1d3 rage.'
				}),
				FeatureLogic.createFeature({
					id: 'fury-1-4',
					name: 'Mighty Leaps',
					description: 'You always succeed on Might tests made to jump. You can still roll to see if you get a reward result.'
				}),
				FeatureLogic.createClassAbilityChoiceFeature({
					id: 'fury-1-5',
					cost: 0
				}),
				FeatureLogic.createClassAbilityChoiceFeature({
					id: 'fury-1-6',
					cost: 3
				}),
				FeatureLogic.createClassAbilityChoiceFeature({
					id: 'fury-1-7',
					cost: 5
				})
			]
		}
	],
	abilities: [
		AbilityLogic.createAbility({
			id: 'fury-ability-1',
			name: 'Brutal Slam',
			description: 'The heavy impact of your weapon attacks drives your foes ever backward.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage; push 1',
				tier2: '8 damage; push 2',
				tier3: '12 damage; push 4'
			})
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-2',
			name: 'Hit And Run',
			description: 'Keeping in constant motion helps you slip out of reach after a brutal assault.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage',
				tier2: '8 damage',
				tier3: '12 damage; slowed (EoT)'
			}),
			effect: 'You can shift 1 square after the attack is resolved.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-3',
			name: 'Humiliating Strike',
			description: 'You hit with a strength that’s worth the risk of raising your opponent’s ire.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage',
				tier2: '8 damage',
				tier3: '12 damage'
			}),
			effect: 'You can choose to do an extra 1d6 damage to the target. If you do, the target gains an edge on their next attack against you.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-4',
			name: 'Impaling Strike',
			description: 'Fighting up close lets you keep your foe exactly where you want them.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
			target: '1 creature of your size or smaller',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage; slowed (EoT)',
				tier2: '8 damage; grabbed',
				tier3: '12 damage; grabbed'
			}),
			effect: 'If the target is grabbed, they take a bane on attempts to escape the grab. If you move while you have the target grabbed, they take 1 damage for each square you move.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-5',
			name: 'Death Before Beauty',
			description: 'Your enemies will get out of your way—whether they want to or not.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
			target: '',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage; slide 2',
				tier2: '5 damage; slide 3',
				tier3: '8 damage; slide 5'
			}),
			effect: 'When you force move the target, you can move into squares they leave. The target takes the damage from any free strikes you provoke with this movement.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-6',
			name: 'Stab Me So I Can Pull Myself Closer To You',
			description: 'When you barrel through your foes, they feel your wrath.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistanceSelf() ],
			target: 'Self',
			cost: 3,
			preEffect: 'Move up to your speed in a straight line toward a creature or object. You don’t treat enemy creatures as difficult terrain for this move. If the target is a creature, you can end your movement in the target’s square, moving them to an adjacent open square. Make a power roll against the target and every enemy you moved through.',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '5 damage',
				tier2: '6 damage',
				tier3: '9 damage'
			}),
			effect: 'The target takes an extra 1d6 damage for every free strike you triggered from your move.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-7',
			name: 'Whirlwind Strike',
			description: 'As your foes close in around you, why bother taking them on one by one?',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'All enemies',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage',
				tier2: '4 damage; push 1',
				tier3: '7 damage; push 3'
			})
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-8',
			name: 'Your Entrails Are Your Extrails!',
			description: 'Unless they get some help, your foe is finished.',
			cost: 3,
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '6 damage; slowed (EoT)',
				tier2: '9 damage; slowed (EoT)',
				tier3: '14 damage; slowed (EoE)'
			}),
			effect: 'While slowed in this way, the target takes an extra 3 damage at the start of each of your turns.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-9',
			name: 'Blood For Blood!',
			description: 'A mighty strike leaves your foe reeling.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
			target: '1 creature or object',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '7 damage; weakened and bleeding (EoT)',
				tier2: '11 damage; weakened and bleeding (EoT)',
				tier3: '17 damage; weakened and bleeding (EoE)'
			}),
			effect: 'You can choose to deal 1d6 damage to yourself to deal an extra 2d6 damage to the target.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-10',
			name: 'Brute Precision',
			description: 'You can always trust to your anger to get the job done.',
			type: AbilityLogic.createTypeManeuver(true),
			keywords: [],
			distance: [ AbilityLogic.createDistanceSelf() ],
			target: 'Self',
			cost: 5,
			effect: 'The next attack you make this turn automatically achieves a tier 3 result and deals an extra 1d6 damage.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-11',
			name: 'Dying Blow',
			description: 'You focus your rage into a single devastating strike.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
			target: '1 creature',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '9 damage',
				tier2: '13 damage',
				tier3: '21 damage'
			}),
			spend: [
				{
					effect: 'If you are winded, you can add 1d6 damage for each rage spent. If you are dying, you can add 1d10 damage for each rage spent. In either case, you then lose 1d6 Stamina.'
				}
			]
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-12',
			name: 'Primordial Shockwave',
			description: 'The destructive power of nature cannot be contained.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
			target: 'All enemies',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '4 damage; push 2',
				tier2: '5 damage; push 4',
				tier3: '8 damage; push 6'
			}),
			effect: 'Targets are pushed one at a time, starting with the target closest to you.'
		})
	],
	kits: [],
	subclasses: [
		{
			id: 'fury-sub-1',
			name: 'Berserker',
			description: 'You channel your rage into expressions of physical might, acting as a living version of the forces that reshape the world.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createSkillFeature({
							id: 'fury-sub-1-1-1',
							skill: 'Lift'
						}),
						FeatureLogic.createFeature({
							id: 'fury-sub-1-1-2',
							name: 'Primordial Strength',
							description: `
When you damage an object with a weapon attack, it takes an additional 5 damage. Additionally, whenever you push another creature, you can make it a vertical push.
* Rage 2: You gain an edge on Might tests and resistance rolls.
* Rage 2: You gain a bonus to weapon damage equal to your Might score if you are at least 2 squares from where you started your turn when you attack.
* Rage 4: You gain a bonus to weapon damage equal to twice your Might score, instead of once your Might score, if you are at least two squares from where you started your turn when you attack.
* Rage 6: You have a double edge on Might tests and resistance rolls.`
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'fury-sub-1-1-3',
								name: 'Relentless Toss',
								description: 'The Primordial Chaos allows you to redirect kinetic energy for a monstrous smash!',
								type: AbilityLogic.createTypeTrigger('The target is force moved.'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
								distance: [
									AbilityLogic.createDistanceSelf(),
									AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 })
								],
								target: 'Self or 1 creature',
								effect: 'You can select a new target of the same size or smaller within distance to be force moved instead. Additionally, you can increase the forced move distance by a number of squares equal to your Might score. You can use your Primordial Strength benefit to make this forced movement vertical.',
								spend: [
									{
										value: 1,
										effect: 'You can increase the forced move distance by a number of squares equal to twice your Might score instead.'
									}
								]
							})
						})
					],
					optionalFeatures: []
				}
			],
			kits: [],
			selected: false
		},
		{
			id: 'fury-sub-2',
			name: 'Reaver',
			description: 'You channel your rage into instinct and cunning, challenging the false order of civilization.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createSkillFeature({
							id: 'fury-sub-3-1-1',
							skill: 'Hide'
						}),
						FeatureLogic.createFeature({
							id: 'fury-sub-2-1-2',
							name: 'Primordial Cunning',
							description: `
You are never surprised. Additionally, whenever you would push a target with forced movement, you can slide them instead.
* Rage 2: You gain an edge on Agility tests and resistance rolls.
* Rage 2: Once per turn, when you slide a target or when you move adjacent to a target during a shift, you can deal weapon damage to the target equal to your Agility score.
* Rage 4: Once per turn, when you slide a target or when you move adjacent to a target during a shift, you can deal weapon damage to the target equal to twice your Agility score, instead of once your Agility score.
* Rage 6: You have a double edge on Agility tests and resistance rolls.`
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'fury-sub-2-1-3',
								name: 'Uncanny Dodge',
								description: 'When a damaging effect surrounds you, you stay two steps ahead.',
								type: AbilityLogic.createTypeTrigger('You are targeted by a damaging area of effect.'),
								keywords: [ AbilityKeyword.Melee ],
								distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
								target: 'Self',
								effect: 'You shift up to 2 squares. If that moves you out of the area of effect, you ignore the attack. Otherwise, you take half damage.',
								spend: [
									{
										value: 1,
										effect: 'You move a willing adjacent ally affected by the attack with you, applying the same outcome to them.'
									}
								]
							})
						})
					],
					optionalFeatures: []
				}
			],
			kits: [],
			selected: false
		},
		{
			id: 'fury-sub-3',
			name: 'Stormwight',
			description: 'You channel your rage into the form of animals and primordial storms.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createSkillFeature({
							id: 'fury-sub-3-1-1',
							skill: 'Track'
						}),
						FeatureLogic.createFeature({
							id: 'fury-sub-3-1-2',
							name: 'Relentless Hunter',
							description: 'You gain an edge on tests that use the Track skill.'
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'fury-sub-3-1-3',
								name: 'Regeneration',
								description: 'Your transformative abilities bring you back into the fight.',
								type: AbilityLogic.createTypeTrigger('You lose Stamina and are not dying.'),
								keywords: [ AbilityKeyword.Melee ],
								distance: [ AbilityLogic.createDistanceSelf() ],
								target: 'Self',
								effect: 'After damage is resolved, if your rage is high enough, you can enter your animal or hybrid form as a free triggered action. If you can’t gain the temporary Stamina from that form because you have already done so this encounter, you gain temporary Stamina equal to your Might.',
								spend: [
									{
										value: 1,
										effect: 'If you are not dying, you can spend a Recovery.'
									}
								]
							})
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'fury-sub-3-1-4',
								name: 'Animal Form',
								description: 'You take on the form of the animal who channels your rage.',
								type: AbilityLogic.createTypeManeuver(),
								keywords: [],
								distance: [ AbilityLogic.createDistanceSelf() ],
								target: 'Self',
								effect: 'You can shapeshift into the animal defined by your stormwight kit or back into your true form. While in animal form, you can’t use signature abilities or heroic abilities unless they have the Animal keyword. Additionally, you can both speak normally and speak to animals who share your form. If negotiation with an animal comes into play, you treat your Renown as 2 higher than usual while in your animal form.',
								spend: [
									{
										value: 1,
										effect: 'As a free maneuver on your turn, you can shapeshift a second time, either into another animal form or back into your true form.'
									}
								]
							})
						})
					],
					optionalFeatures: []
				}
			],
			kits: [
				{
					id: 'kit-boren',
					name: 'Boren',
					description: 'With this stormwight kit, you channel your primordial rage into the form of a bear, becoming large, durable, and imposing. Boren are tied to the craggy, rocky north, and this aspect is associated with the blizzard’s bitter cold.',
					type: KitType.Stormwight,
					armor: [],
					weapon: [ KitWeapon.Unarmed ],
					implement: [],
					stamina: 9,
					speed: 0,
					stability: 2,
					meleeDamage: KitLogic.createDamageBonus(0, 0, 4),
					rangedDamage: null,
					magicalDamage: null,
					distance: 0,
					reach: 0,
					area: 0,
					mobility: false,
					features: [
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'kit-boren-signature',
								name: 'Bear Claws',
								description: 'Attacks with your sharp and deadly claws send your foes staggering back.',
								type: AbilityLogic.createTypeAction(),
								keywords: [ AbilityKeyword.Animal, AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
								distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
								target: '2 creatures or objects',
								powerRoll: AbilityLogic.createPowerRoll({
									characteristic: [ Characteristic.Might ],
									tier1: '2 damage; push 1',
									tier2: '3 damage; push 2',
									tier3: '8 damage; push 3'
								})
							})
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-1',
							name: 'Aspect Benefits',
							description: `
Whenever you use forced movement to push a creature, you can pull that creature instead. Whenever an attack pulls a creature adjacent to you, you can attempt to grab that creature as a free triggered action.
* Rage 2: You gain an edge on Might tests, resistance rolls, and power rolls made to grab.
* Rage 2: While in bear form, your attacks deal extra damage equal to your Might score, and any target you have grabbed at the start of your turn takes damage equal to your Might score.
* Rage 4: While in bear form, you can use all your abilities, your attacks deal extra damage equal to twice your Might score, instead of once your Might score, and any target you have grabbed at the start of your turn takes damage equal to twice your Might score, instead of once your Might score.
* Rage 6: You have a double edge on Might tests, resistance rolls, and power rolls made with the Grab ability.`
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-2',
							name: 'Animal Form: Bear',
							description: 'When you are in your bear form, your speed increases by 2, your size becomes 2, and you have a +1 reach bonus with melee attacks. You gain 10 temporary Stamina the first time you shapeshift into bear form during an encounter.'
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-3',
							name: 'Primordial Storm: Blizzard',
							description: 'Your primordial damage type is cold.'
						})
					]
				},
				{
					id: 'kit-corven',
					name: 'Corven',
					description: 'With this stormwight kit, you channel your primordial rage into the form of a crow. Corven are tied to the mountain passes and the hot winds that flow through them. This aspect is associated with the katabatic wind.',
					type: KitType.Stormwight,
					armor: [],
					weapon: [ KitWeapon.Unarmed ],
					implement: [],
					stamina: 3,
					speed: 3,
					stability: 2,
					meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
					rangedDamage: null,
					magicalDamage: null,
					distance: 0,
					reach: 0,
					area: 0,
					mobility: true,
					features: [
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'kit-corven-signature',
								name: 'Wing Buffet',
								description: 'Foes who try to close around you do so at their peril.',
								type: AbilityLogic.createTypeAction(),
								keywords: [ AbilityKeyword.Animal, AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
								distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
								target: '3 creatures or objects',
								powerRoll: AbilityLogic.createPowerRoll({
									characteristic: [ Characteristic.Might ],
									tier1: '4 damage',
									tier2: '5 damage',
									tier3: '7 damage'
								}),
								effect: 'Resolve each attack individually using one power roll. You can shift 1 square after resolving damage for each target, then choose your next target from your new location.'
							})
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-1',
							name: 'Aspect Benefits',
							description: `
You gain an edge on tests made to hide and sneak. Whenever you are falling, you can use your Animal Form ability as a free triggered action.
* Rage 2: You can shift 1 square as a free maneuver once per turn.
* Rage 2: While in crow form, your attacks deal extra damage equal to your Agility score.
* Rage 2: Once per turn while in crow form, when you move away from an enemy, that enemy takes damage equal to your Agility score.
* Rage 4: While in crow or hybrid crow form, you can use all your abilities, and your attacks deal extra damage equal to twice your Agility score, instead of once your Agility score.
* Rage 4: Once per turn while in crow or hybrid crow form, when you move away from an enemy, that enemy takes damage equal to twice your Agility score, instead of once your Agility score.
* Rage 6: You can shift up to 2 squares as a free maneuver once per turn.`
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-2',
							name: 'Animal Form: Crow',
							description: `
When you are in your crow form, your movement gains the Fly keyword, and your size becomes 1T. You can use the Hide maneuver as a free maneuver, and you can use your allies as cover when you hide.
Whenever your rage is 4 or higher, you can shapeshift to become a hybrid bipedal crow of your true form’s size. You gain 10 temporary Stamina the first time you shapeshift into hybrid crow form during an encounter.`
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-3',
							name: 'Primordial Storm: Katabatic Wind',
							description: 'Your primordial damage type is fire.'
						})
					]
				},
				{
					id: 'kit-raden',
					name: 'Raden',
					description: 'With this stormwight kit, you channel your primordial rage into the form of a rat. Raden are associated with the true nature of the rat, before cities became their habitat. Rats are avatars of the balance between green and rot, and this aspect is associated with the rat flood.',
					type: KitType.Stormwight,
					armor: [],
					weapon: [ KitWeapon.Unarmed ],
					implement: [],
					stamina: 3,
					speed: 3,
					stability: 0,
					meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
					rangedDamage: null,
					magicalDamage: null,
					distance: 0,
					reach: 0,
					area: 0,
					mobility: true,
					features: [
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'kit-raden-signature',
								name: 'Driving Pounce',
								description: 'Your enemies try in vain to fall back from your pouncing attack.',
								type: AbilityLogic.createTypeAction(),
								keywords: [ AbilityKeyword.Animal, AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
								distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
								target: '2 creatures or objects',
								powerRoll: AbilityLogic.createPowerRoll({
									characteristic: [ Characteristic.Might ],
									tier1: '4 damage',
									tier2: '5 damage; push 1',
									tier3: '6 damage; push 2'
								}),
								effect: 'Resolve each attack one at a time. After each attack, you can shift the same number of squares that you pushed the target. You select your second target from the square where you end your shift, which can be the first target again.'
							})
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-1',
							name: 'Aspect Benefits',
							description: `
You gain an edge on tests made to hide and sneak. Additionally, you ignore difficult terrain, and you gain an edge on tests made to climb other creatures. If you are hidden, you automatically achieve a tier 3 result on attempts to climb and remain hidden.
* Rage 2: You have Weapon immunity 2.
* Rage 2: While in rat form, your attacks deal extra damage equal to your Agility score.
* Rage 2: While in rat form, if you attack a creature you are climbing, that creature is bleeding (EoT).
* Rage 4: While in rat or hybrid rat form, you can use all your abilities, and your attacks deal extra damage equal to twice your Agility score, instead of once your Agility score.
* Rage 6: You have Weapon immunity 2. Any damage you ignore because of this immunity is dealt to each enemy adjacent to you when you are attacked.`
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-2',
							name: 'Animal Form: Rat',
							description: `
When you are in your rat form, your movement gains the Climb keyword, and your size becomes 1T. You can use the Hide maneuver as a free maneuver, and you can use your allies as cover when hiding. You can stay hidden while moving through squares occupied by a creature.
Whenever your rage is 4 or higher, you can shapeshift to become a hybrid bipedal rat of your true form’s size. You gain 10 temporary Stamina the first time you shapeshift into hybrid rat form during an encounter.`
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-3',
							name: 'Primordial Storm: Rat Flood',
							description: 'Your primordial damage type is corruption.'
						})
					]
				},
				{
					id: 'kit-vuken',
					name: 'Vuken',
					description: 'With this stormwight kit, you channel your primordial rage into the form of a wolf. Vuken are tied to forests and open steppes, and this aspect is associated with the thunderstorm.',
					type: KitType.Stormwight,
					armor: [],
					weapon: [ KitWeapon.Unarmed ],
					implement: [],
					stamina: 9,
					speed: 2,
					stability: 0,
					meleeDamage: KitLogic.createDamageBonus(2, 2, 2),
					rangedDamage: null,
					magicalDamage: null,
					distance: 0,
					reach: 0,
					area: 0,
					mobility: true,
					features: [
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'kit-vuken-signature',
								name: 'Probing Attack',
								description: 'A savage assault forces your foes back.',
								type: AbilityLogic.createTypeAction(),
								keywords: [ AbilityKeyword.Animal, AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
								distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
								target: '1 creature or object',
								powerRoll: AbilityLogic.createPowerRoll({
									characteristic: [ Characteristic.Might ],
									tier1: '5 damage',
									tier2: '9 damage; push 1',
									tier3: '12 damage; push 2; prone if the target is your size or smaller'
								}),
								effect: 'You can shift up to 2 squares as long as you end the shift adjacent to the target.'
							})
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-1',
							name: 'Aspect Benefits',
							description: `
You and an ally gain the benefits of flanking whenever you are both adjacent to a target. If you and at least two other allies are all adjacent to a target, each of you has a double edge for flanking.
* Rage 2: You gain an edge on Agility tests and resistance rolls.
* Rage 2: While in wolf form, your attacks deal extra damage equal to your Agility score.
* Rage 2: When you attack a target while in wolf form, the next ally to damage that target before the start of your next turn deals extra damage equal to your Agility score.
* Rage 4: While in wolf or hybrid wolf form, you can use all your abilities, and your attacks deal extra damage equal to twice your Agility score, instead of once your Agility score.
* Rage 4: When you attack a target while in wolf or hybrid wolf form, the next ally to damage that target before the start of your next turn deals extra damage equal to twice your Agility score, instead of once your Agility score.
* Rage 6: You have a double edge on Agility tests and resistance rolls.`
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-2',
							name: 'Animal Form: Wolf',
							description: `
When you are in your wolf form, your speed increases by 2, you ignore difficult terrain, and your size becomes 1M.
Whenever your rage is 4 or higher, you can shapeshift to become a hybrid bipedal wolf of your true form’s size. You gain 10 temporary Stamina the first time you shapeshift into hybrid wolf form during an encounter.`
						}),
						FeatureLogic.createFeature({
							id: 'kit-boren-feature-3',
							name: 'Primordial Storm: Lightning Storm',
							description: 'Your primordial damage type is lightning.'
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
