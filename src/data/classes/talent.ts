import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { HeroClass } from '../../models/class';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const talent: HeroClass = {
	id: 'class-talent',
	name: 'Talent',
	description: `
The talent is a master of psionics - a source of incredible power created through sheer force of will. A talent can move and change matter, time, gravity, the laws of physics, or another creature’s mind. In rare occurrences, people are born with the potential to harness psionic power, but only those who experience an awakening, an event that activates a talent’s abilities, can actually tap into the mind’s full strength.

A talent is limited only by the strength of their mind. Powerful psionic heroes can have multiple active powers at once and change reality at will. But with this limitless potential comes a gamble. Every manifestation has a chance of harming the talent, and those who use too many too quickly die from the exertion.`,
	heroicResource: 'Clarity',
	subclassName: 'Tradition',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Reason, Characteristic.Presence ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'talent-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'talent-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createSkill({
					id: 'talent-skill-a',
					skill: 'Psionics'
				}),
				FactoryLogic.feature.createSkill({
					id: 'talent-skill-b',
					skill: 'Read Person'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'talent-skill-c',
					listOptions: [ SkillList.Interpersonal, SkillList.Lore ],
					count: 2
				}),
				FactoryLogic.feature.create({
					id: 'talent-1-1',
					name: 'Clarity and Strain',
					description: `
At the start of each of your turns during combat, you gain 1d3 clarity. You gain 1 clarity the first time each round that a creature is force moved.

You can spend clarity you do not have, pushing that Heroic Resource into negative numbers, to a maximum negative value equal to 1 + your Reason score. At the end of each of your turns, you take 1 damage for each negative point of clarity.

Whenever you have clarity below 0, you are strained. Some psionic abilities have additional effects if you are already strained or become strained when you use them. Strained effects can still impact you even after you are no longer strained.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-1-2',
						name: 'Mind Spike',
						description: 'A telepathic bolt instantly zaps a creature’s brain.',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'can be used as a ranged free strike' ] }),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telepathy ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Reason ],
							tier1: '2 + R psychic damage',
							tier2: '4 + R psychic damage',
							tier3: '6 + R psychic damage'
						}),
						strained: 'The strike deals an extra 2 psychic damage to the target and to you. The damage you take can’t be reduced in any way.'
					})
				}),
				FactoryLogic.feature.createLanguage({
					id: 'talent-1-3',
					language: 'Mindspeech'
				}),
				FactoryLogic.feature.create({
					id: 'talent-1-4',
					name: 'Telepathic Speech',
					description: 'you can telepathically communicate with any creatures within the distance of your Mind Spike ability if they share a language with you and you know of each other. The receiver of your telepathic communications can choose to respond telepathically.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'talent-1-5',
					name: 'Psionic Augmentation',
					description: 'Through psionic meditation, you create pathways in your mind that enhance your statistics. Choose one of the following augmentations. You can change your augmentation along with your ward by undergoing a psionic meditation as a respite activity.',
					options: [
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'talent-1-5a',
								name: 'Battle Augmentation',
								description: 'You can wear light armor and wield light weapons effectively, even though you don’t have a kit. You can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this augmentation.',
								features: [
									FactoryLogic.feature.create({
										id: 'talent-1-5aa',
										name: 'Battle Augmentation',
										description: 'While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes.'
									}),
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5ab',
										field: FeatureField.Stamina,
										valuePerEchelon: 3
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDistance({
								id: 'talent-1-5b',
								name: 'Distance Augmentation',
								keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
								modifier: 2
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'talent-1-5c',
								name: 'Density Augmentation',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5ca',
										field: FeatureField.Stamina,
										valuePerEchelon: 6
									}),
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5cb',
										field: FeatureField.Stability,
										value: 1
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDamage({
								id: 'talent-1-5d',
								name: 'Force Augmentation',
								keywords: [ AbilityKeyword.Psionic ],
								modifier: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'talent-1-5e',
								name: 'Speed Augmentation',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5ea',
										field: FeatureField.Speed,
										value: 1
									}),
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5eb',
										field: FeatureField.Disengage,
										value: 1
									})
								]
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'talent-1-6',
					name: 'Talent Ward',
					description: 'Through psionic meditation, you create a ward that protects you. Choose one of the following wards. You can change your ward along with your psionic augmentation by undergoing a psionic meditation as a respite activity.',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'talent-1-6a',
								name: 'Entropy Ward',
								description: 'You ward slows time for your enemies. Whenever a creature deals damage to you, their speed is reduced by an amount equal to your Reason score and they can’t use triggered actions, all until the end of their next turn.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-1-6b',
									name: 'Repulsive Ward',
									description: 'You surround yourself with an invisible ward of telekinetic energy.',
									type: FactoryLogic.type.createTrigger('An adjacent creature deals damage to you.', { free: true }),
									keywords: [],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									effect: 'You can push your attacker up to a number of squares equal to your Reason score.'
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'talent-1-6c',
								name: 'Steel Ward',
								description: 'Your ward reacts to danger, protecting your body from future harm. Whenever you take damage, the damage resolves and you then gain damage immunity equal to your Reason score until the end of your next turn.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'talent-1-6d',
								name: 'Vanishing Ward',
								description: 'Your ward allows you to slip away from danger. Whenever you take damage, you become invisible until the end of your next turn.'
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-1-7',
					cost: 'signature',
					count: 2
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-1-8',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-1-9',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'talent-2-1',
					lists: [ PerkList.Interpersonal, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'talent-3-1',
					name: 'Scan',
					description: 'You can extend your psionic senses out beyond their normal range. You can search for hidden creatures as a free maneuver once on each of your turns. Additionally, once you establish line of effect to a thinking creature within the distance of your Mind Spike ability, you always have line of effect to that creature until they leave move outside that distance.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-3-2',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'talent-ability-1',
			name: 'Entropic Bolt',
			description: 'You advance an enemy’s age for a moment.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 + P corruption damage; P < [weak], slowed (save ends)',
				tier2: '3 + P corruption damage; P < [average], slowed (save ends)',
				tier3: '5 + P corruption damage; P < [strong], slowed (save ends)'
			}),
			effect: 'The target takes 1 extra corruption damage for each additional time they are targeted by this ability in the encounter.',
			strained: 'You gain 1 clarity on a tier 2 or tier 3 result.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-2',
			name: 'Incinerate',
			description: 'The air erupts into a column of smokeless flame.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Fire, AbilityKeyword.Ranged, AbilityKeyword.Pyrokinesis ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 fire damage',
				tier2: '4 fire damage',
				tier3: '6 fire damage'
			}),
			effect: 'A column of fire lingers in the area until the start of your next turn. Each enemy who enters the area for the first time in a round or starts their turn there takes 2 fire damage.',
			strained: 'The size of the cube increases by 2, but the fire disappears at the end of your turn.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-3',
			name: 'Hoarfrost',
			description: 'A row of the terrain freezes over ahead of you, turning hard and slick.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Cryokinesis, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 + R cold damage; M < [weak], slowed (EoT)',
				tier2: '4 + R cold damage; M < [average], slowed (EoT)',
				tier3: '6 + R cold damage; M < [strong], slowed (EoT)'
			}),
			strained: 'A target slowed by this ability is restrained instead, and you are slowed until the end of your next turn.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-4',
			name: 'Kinetic Grip',
			description: 'You lift and hurl your foe away from you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Telekinesis ],
			distance: [ FactoryLogic.distance.createMelee(3) ],
			target: 'One size 1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: 'Push 3',
				tier2: 'Push 5',
				tier3: 'Push 7; prone'
			}),
			effect: 'You can slide the target up to 2 squares before making the power roll.',
			strained: 'You can’t use this ability’s effect, but you can vertical push the target.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-5',
			name: 'Kinetic Pulse',
			description: 'The force of your mind hurls enemies backward.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 psychic damage',
				tier2: '5 psychic damage; push 1',
				tier3: '7 psychic damage; push 2'
			}),
			strained: 'The size of the burst increases by 2, and you are bleeding until the start of your next turn.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-6',
			name: 'Materialize',
			description: 'You picture an object in your mind and give it form in the world, directly above your opponent’s head.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Resopathy, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '3 + R damage',
				tier2: '5 + R damage',
				tier3: '8 + R damage'
			}),
			effect: 'A size 1M object drops onto the target and then rolls into an adjacent, unoccupied space of your choice. The object is made of wood, stone, or metal (your choice).',
			strained: 'The object is explodes on impact, dealing damage equal to your Reason score to each creature adjacent to the target. You also take damage equal to your Reason score, which can’t be reduced in any way.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-7',
			name: 'Optic Blast',
			description: 'Your eyes emit rays of powerful enervating force.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Metamorphosis, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 + R damage; M < [weak], prone',
				tier2: '4 + R damage; M < [average], prone',
				tier3: '6 + R damage; M < [strong], prone'
			}),
			effect: 'When targeting an object with a solid reflective surface or a creature carrying or wearing such an object (a mirror, an unpainted metal shield, shiny metal plate armor, and so forth), you can choose an additional target within 3 squares of the first target.',
			strained: 'You gain a surge, which you can use immediately, and take damage equal to your Reason score, which can’t be reduced in any way.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-8',
			name: 'Spirit Sword',
			description: 'You form a blade of mind energy and stab your target, invigorating yourself.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Animapathy, AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee(2) ],
			target: 'One creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '3 + P damage',
				tier2: '6 + P damage',
				tier3: '9 + P damage'
			}),
			effect: 'You gain a surge.',
			strained: 'The attack deals an extra 3 damage to the target and to you. The damage you take can’t be reduced in any way.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-9',
			name: 'Awe',
			description: 'You project psionic energy out to a creature and take on a new visage in their mind.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One ally or enemy',
			cost: 3,
			preEffect: 'Any ally targeted by this ability gains temporary Stamina equal to twice your Presence score, and can end one effect on them that is ended by a saving throw or that ends at the end of their turn. If you target an enemy, you make a power roll.',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '3 + P psychic damage; I < [weak], frightened (save ends)',
				tier2: '6 + P psychic damage; I < [average], frightened (save ends)',
				tier3: '9 + P psychic damage; I < [strong], frightened (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-10',
			name: 'Nothing Exceeds My Grasp',
			description: 'Be careful not to choke on your aspirations.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '3 + R damage; M < [weak], slowed (save ends)',
				tier2: '5 + R damage; M < [average], slowed (save ends)',
				tier3: '8 + R damage; M < [strong], restrained (save ends)'
			}),
			effect: 'You can vertical pull the target up to 2 squares. You can pull a target restrained by this ability, ignoring their stability.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-11',
			name: 'Precognition',
			description: 'You give a target a glimpse into the future so that they’re ready for what comes next.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Melee, AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.createMelee(2) ],
			target: 'Self or one ally',
			cost: 3,
			effect: 'Ability power rolls against the target have a bane until the start of your next turn. Whenever the target takes damage while under this effect, they can use a triggered action to make a free strike against the source of the damage.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-12',
			name: 'Smolder',
			description: 'Smoke flows from your enemy like tears as their skin begins to blacken and flake.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Pyrokinesis, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
			cost: 3,
			preEffect: 'The target takes damage before this ability imposes any weakness effect. The damage type and the weakness for this ability must be chosen from one of the following: acid, corruption, or fire.',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '3 + R damage; R < [weak], the target has weakness 5 (save ends)',
				tier2: '6 + R damage; R < [average], the target has weakness 5 (save ends)',
				tier3: '9 + R damage; R < [strong], the target has weakness equal to 5 + your Reason score (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-13',
			name: 'Flashback',
			description: 'The target is thrown several seconds back through time, and gets to do it all again.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			effect: 'The target immediately uses an ability they’ve previously used this round without spending any heroic resources.',
			strained: 'You take 1d6 damage and are slowed (save ends).'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-14',
			name: 'Inertia Soak',
			description: 'Your psionic energy surrounds the target and pushes everything else away from them.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telekinesis ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			effect: 'The target ignores difficult terrain and takes no damage from forced movement until the start of your next turn. Whenever the target moves into a square while under this effect, they can push one adjacent creature up to 2 squares. If pushing an ally, the target can ignore that ally’s stability.',
			strained: 'You are weakened and your stability decreases by 5 (save ends). If your stability becomes a negative value, it adds to the distance you are force moved.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-15',
			name: 'Iron',
			description: 'The target’s skin turns to hard, dark metal, impenetrable and dense.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Metamorphosis, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			effect: 'The target’s stability increases by 5 and they gain 10 temporary stamina and two surges.',
			strained: 'You can’t use maneuvers (save ends).'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-16',
			name: 'Perfect Clarity',
			description: 'You clear the mind of nothing but the goal.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			effect: 'Until the start of your next turn, the target gains a +3 bonus to speed, and they have a double edge on the next power roll they make. If the target gets a tier 3 result on that roll, you gain 1 clarity.',
			strained: 'You take 1d6 damage, and you can’t use triggered actions (save ends).'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-17',
			name: 'Fling Through Time',
			description: 'You hurl the target through the annals of time, forcing them to witness every moment of their existence all at once.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: '3 + P corruption damage; P < [weak], weakened (save ends)',
				tier2: '5 + P corruption damage; the target is flung through time; P < [average], weakened (save ends)',
				tier3: '8 + P corruption damage; the target is flung through time; P < [strong], weakened (save ends)'
			}),
			effect: 'A target who is flung through time is removed from the encounter until the end of their next turn, reappearing in their original space or the nearest available space.',
			strained: 'You take 2d6 damage and grow visibly older (the equivalent of 10 years for a human). On a tier 3 result, you gain 2 clarity.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-18',
			name: 'Force Orb',
			description: 'Three spheres of solid psionic energy float around you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			preEffect: `
You create three size 1T orbs that orbit your body. Each orb you provides you with cumulative damage immunity 1. Whenever you take damage, you lose 1 orb.

Once on each of your turns, you can use a free maneuver to fire an orb at a creature or object within 5 squares as a ranged strike, losing the orb after the strike.`,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: '2 damage',
				tier2: '3 damage',
				tier3: '5 damage'
			}),
			strained: 'You create five orbs. You are weakened while you have any orbs active.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-19',
			name: 'Reflector Field',
			description: 'A protective field reverses the momentum of incoming attacks.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
			target: 'Special',
			cost: 7,
			effect: 'The aura lasts until the start of your next turn. Whenever an enemy targets an ally in the aura with a ranged ability, the ability is negated on the ally and reflected back at the enemy. The ability deals half the damage to the enemy that it would have dealt to the ally, and loses any additional effects.',
			strained: 'The size of the aura increases by 1. Each ability your aura reflects causes you to take 2d6 damage and makes you forget a memory, as determined in consultation with the Director.'
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-20',
			name: 'Soul Burn',
			description: 'You blast their soul out of their body, leaving it to helplessly float back to a weakened husk.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Animapathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: '6 + P damage; P < [weak], dazed (save ends)',
				tier2: '10 + P damage; P < [average], dazed (save ends)',
				tier3: '14 + P damage; P < [strong], dazed (save ends)'
			}),
			effect: 'The target takes a bane on Presence tests until the end of the encounter.',
			strained: 'The potency of this ability increases by 1. You take 2d6 damage, and gain 3 surges.'
		})
	],
	subclasses: [
		{
			id: 'talent-sub-1',
			name: 'Chronopathy',
			description: 'Abilities that allow you to view future and past events, and to manipulate time to aid allies and hinder foes.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'talent-sub-1-1-1',
								name: 'Accelerate',
								description: 'To your ally, it seems as though the world has slowed down.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Psionic ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Self or one creature',
								effect: 'The target immediately shifts up to a number of squares equal to your Reason score.',
								spend: [
									{
										value: 2,
										effect: 'The target can also use a maneuver.'
									}
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'talent-sub-1-1-2',
								name: 'Again',
								description: 'You step back a split second to see if things play out a little differently.',
								type: FactoryLogic.type.createTrigger('The target makes an ability power roll.'),
								keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Self or one creature',
								effect: 'You can use this ability after seeing the power roll for the triggering roll. You force the target to reroll the power roll and use the new result.'
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'talent-sub-1-2-1',
							name: 'Ease the Hours',
							description: 'You can increase the number of rounds in a montage test by 1 if the test would end before the heroes hit the success limit.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'talent-sub-1-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'talent-sub-1-2-2a',
											name: 'Applied Chronometrics',
											description: 'Time slows down around you. Your heartbeat is the only gauge of the extra moments you’ve gained.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: 'Special',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: 'Target two creatures, one of which can be you',
												tier2: 'Target three creatures, one of which can be you',
												tier3: 'Target four creatures, one of which can be you'
											}),
											effect: 'Until the start of your next turn, each target gains a +5 bonus to speed, can’t be dazed, and they can use an additional maneuver on their turn. If a target is dazed, the condition ends for them.',
											strained: 'Your speed is halved until the end of the encounter.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'talent-sub-1-2-2b',
											name: 'Slow',
											description: 'Perhaps they wonder why everyone else is moving so quickly?',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: 'Three creatures or objects',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: 'The target’s speed is halved (save ends), or if P < [weak], the target is slowed (save ends).',
												tier2: 'The target is slowed (save ends), or if P < [average], the target’s speed is 0 (save ends).',
												tier3: 'The target is slowed (save ends), or if P < [strong], the target’s speed is 0 (save ends).'
											}),
											effect: 'A target can’t use triggered actions while their speed is reduced by this ability.',
											strained: 'The potency of this ability increases by 1 and you take 1d6 damage. At the start of each round while any target is affected by this ability, you take 1d6 damage. You can immediately end the effects on all affected targets (no action required).'
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false
		},
		{
			id: 'talent-sub-2',
			name: 'Telekinesis',
			description: 'Abilities that allow you to physically manipulate creatures and objects.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'talent-sub-2-1-1',
								name: 'Minor Telekinesis',
								description: 'Wisps of psychic energy ripple visibly from your brain as you force the target to move using only your mind.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Self, or a size 1 creature or object',
								effect: 'You slide the target up to a number of squares equal to your Reason score.',
								spend: [
									{
										value: 2,
										repeatable: true,
										effect: 'The size of the creature or object you can target increases by 1 for every 2 clarity you spend.'
									},
									{
										value: 3,
										effect: 'You can vertical slide the target.'
									}
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'talent-sub-2-1-2',
								name: 'Repel',
								description: 'They aren’t going anywhere, but you might!',
								type: FactoryLogic.type.createTrigger('The target takes damage or is force moved.'),
								keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Self or one ally',
								effect: 'The triggering damage is halved or distance of the triggering forced movement is reduced by a number of squares equal to your Reason score. If the target was damaged and force moved, you choose the effect. If the triggering forced movement is reduced to 0 squares, the target pushes the source of the forced movement a number of squares equal to your Reason score.'
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'talent-sub-2-2-1',
								name: 'Ease their Fall',
								description: '',
								type: FactoryLogic.type.createTrigger('You land after a fall, or any falling creature lands within 2 squares of you.', { free: true }),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You can reduce the falling damage by an amount equal to 2 + your Reason score.'
							})
						}),
						FactoryLogic.feature.createChoice({
							id: 'talent-sub-2-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'talent-sub-2-2-2a',
											name: 'Gravitic Burst',
											description: 'Everyone get away from me!',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Telekinesis ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
											target: 'Each enemy in the area',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason ],
												tier1: '3 damage; vertical push 2',
												tier2: '6 damage; vertical push 4',
												tier3: '9 damage; vertical push 6'
											}),
											strained: 'The size of the burst increases by 1 and you are weakened until the end of your turn.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'talent-sub-2-2-2b',
											name: 'Levity and Gravity',
											description: 'You raise the target into the air, then smother them against the ground.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: 'One creature or object',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason ],
												tier1: '6 + R damage; M < [weak], prone',
												tier2: '10 + R damage; M < [average], prone',
												tier3: '14 + R damage; M < [strong], prone and can’t stand (save ends)'
											}),
											effect: 'A target made prone by this ability is lifted 2 squares into the air before falling immediately to the ground, taking damage as usual.',
											strained: 'You take half the damage the target takes, including any damage from falling.'
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false
		},
		{
			id: 'talent-sub-3',
			name: 'Telepathy',
			description: 'Abilities that allow you to communicate with, read, and influence the minds of other creatures.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'talent-sub-3-1-1',
								name: 'Feedback Loop',
								description: 'Creating a brief psychic link between a foe and their target gives that foe a taste of their own medicine.',
								type: FactoryLogic.type.createTrigger('The target deals damage to an ally.'),
								keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: '1 creature',
								effect: 'The target takes psychic damage equal to half the triggering damage.'
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'talent-sub-3-1-2',
								name: 'Remote Assistance',
								description: 'An ally gains the benefit of your intellect.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: '1 creature or object',
								effect: 'The next ability power roll an ally makes against the target before the start of your next turn gains an edge.',
								spend: [
									{
										value: 1,
										effect: 'You target one additional creature or object.'
									}
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'talent-sub-3-2-1',
							name: 'Ease the Mind',
							description: 'You gain an edge on tests to stop combat and start a negotiation. Any NPC who has a hostile or suspicious starting attitude in a negotiation has an additional 1 patience.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'talent-sub-3-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'talent-sub-3-2-2a',
											name: 'Overwhelm',
											description: 'You overload their senses, turning all their subconscious thoughts into conscious ones.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telepathy ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: '1 creature',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason ],
												tier1: '6 + R psychic damage; I < [weak], slowed (save ends)',
												tier2: '10 + R psychic damage; I < [average], weakened (save ends)',
												tier3: '14 + R psychic damage; I < [strong], dazed (save ends)'
											}),
											strained: 'You start crying. You can’t take triggered actions or take free strikes until the end of the target’s next turn.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'talent-sub-3-2-2b',
											name: 'Synaptic Override',
											description: 'You gain control over an enemy’s nervous system. How pleasant for them.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telepathy ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: '1 enemy',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason ],
												tier1: 'The target makes a free strike against one enemy of your choice.',
												tier2: 'The target shifts up to their speed and uses their signature ability against any enemies of your choice.',
												tier3: 'The target moves up to their speed and uses their signature ability against any enemies of your choice.'
											}),
											effect: 'You control the target’s movement. The target can’t be moved in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect. However, you can',
											strained: 'You take 1d6 damage and are weakened until the end of your turn.'
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};
