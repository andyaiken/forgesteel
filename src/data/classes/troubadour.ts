import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { HeroClass } from '../../models/class';
import { SkillList } from '../../enums/skill-list';

export const troubadour: HeroClass = {
	id: 'class-troubadour',
	name: 'Troubadour',
	description: `
The whole world's a stage and everyone on it, an actor. No one knows this better than the troubadour. You find energy in the drama of everyday life and know how to draw spectacle forth from even the most mundane of situations. You accent highs and deepen lows in service to whomever would witness your performance.

And beyond the mundane, there are insurmountable dangers that cause many a hero to cower. But the troubadour must chase that drama. The troubadour takes the world stage not to die, but to find out if they are truly alive.`,
	heroicResource: 'Drama',
	subclassName: 'Class Act',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Agility, Characteristic.Presence ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'troubadour-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'troubadour-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'troubadour-1-1',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Read Person' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'troubadour-1-2',
					listOptions: [ SkillList.Interpersonal ],
					count: 2
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'troubadour-1-3',
					listOptions: [ SkillList.Intrigue, SkillList.Lore ]
				}),
				FactoryLogic.feature.create({
					id: 'troubadour-1-4',
					name: 'Drama',
					description: `
At the start of each of your turns during combat, you gain 1d3 drama.

Additionally, you gain drama when certain events occur during battle:

* **2 Drama**: Three or more heroes use an ability on the same turn for the first time.
* **2 Drama**: A hero becomes winded for the first time (only once per encounter and not once per hero).
* **3 Drama**: A creature within your line of effect rolls a natural 19 or 20.
* **10 Drama**: A hero, including you, dies.

You still gain drama during combat if you are dead as long as your body is intact. During the encounter in which you died, if you have 30 drama, you can come back to life with 1 Stamina and 0 drama (no action required). You can’t gain drama in future encounters while you remain dead.`
				}),
				FactoryLogic.feature.create({
					id: 'troubadour-1-5',
					name: 'Scene Partner',
					description: 'Whenever you use a skill from the interpersonal group on a test while interacting with an NPC (a bystander, a rival, and so forth) and you don’t fail the test, you can form a bond with that NPC. If you then enter into a negotiation with this NPC, their patience increases by 1, and any compelling arguments you personally make to the NPC that would increase their interest by 1 instead increase their interest by 2. You can have a number of such bonds active equal to your level, losing a bond of your choice whenever you make a new bond beyond your limit.'
				}),
				FactoryLogic.feature.create({
					id: 'troubadour-1-6',
					name: 'Curtain Call',
					description: 'You enter every performance with a set of routines at the ready. Routines are auras and other wide-reaching effects that have the Routine keyword, and which center around you while you move through the fray. At the start of each round of combat, as long as you are not dazed, dead, or surprised, you can either set a new routine to be active or maintain your current routine (no action required). Your routine ends if you are unable to maintain it, or at the end of the encounter.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-1-7',
						name: 'Choreography',
						description: 'Taps, kicks, steps. Now it’s all “choreography.”',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						effect: 'While this routine is active, each target who starts their turn in the aura gains a +2 bonus to speed until the end of their turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-1-8',
						name: 'Revitalizing Limerick',
						description: 'There once was a man from Capital…',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						effect: 'While this routine is active, choose a number of targets equal to your Presence score at the end of your turn. Each chosen target can spend a Recovery.'
					})
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'troubadour-1-9'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'troubadour-1-10',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'troubadour-1-11',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'troubadour-1-12',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'troubadour-2-1',
					name: 'Appeal to the Muses',
					description: `
You can give a rousing speech, invoke your inspirations, or lift your fellows’ spirits to heighten the drama of your present circumstances. However, irony is eager to hand your fortune to the villain and achieve the same ends.

Whenever you roll to gain 1d3 drama at the start of your turn, you can make your appeal to gain the following additional effects:

* If the roll is a 1, you gain 1 additional drama. The Director also gains 1d3 Malice.
* If the roll is a 2, you gain 1 Heroic Resource, which you can keep for yourself or give to an ally within the distance of your active routine. The Director also gains 1 Malice.
* If the roll is a 3, you gain 2 Heroic Resources, which you can distribute among yourself and any allies within the distance of your active routine.`
				}),
				FactoryLogic.feature.createChoice({
					id: 'troubadour-2-2',
					name: 'Invocation',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'troubadour-2-2a',
									name: 'Allow Me To Introduce Tonight\'s Players',
									description: '',
									type: FactoryLogic.type.createAction(),
									keywords: [],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									effect: 'Whenever you take the first turn in a combat encounter, you can introduce yourself and your allies to your opponents. Each creature on your side can shift up to their speed and gains the benefit of the Defend action until the end of the round. However, any enemies who were surprised are no longer surprised.'
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'troubadour-2-2b',
								name: 'Formal Introductions',
								description: `
As a respite activity, you can scribe a notice of your arrival, such as a calling card or a formal letter, addressed to an enemy and have it delivered. You can deliver the notice to the target personally if you are in the same general area, send it by courier, or leave it in a covert location for the target to find. You can have only one notice active at a time.

The Director determines when the target receives your notice. Once the target receives the notice, they become alarmed and take desperate measures to stop you. The Director gains 1 additional Malice per round during future encounters involving the target. The heroes start each such encounter with 2 additional hero tokens. These hero tokens disappear at the end of the encounter.`
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'troubadour-2-2c',
								name: 'My Reputation Precedes Me',
								description: `
You can invoke your reputation at the start of a social interaction with a group of creatures who haven’t met you before, automatically creating a bond with a representative NPC as if using your Scene Partner feature. While the bond is active, all present heroes are treated as having Renown 2 higher than usual for the purpose of negotiations and influencing tests with the group.

The Director can choose to award the heroes with 1 Hero Token to stop you from forming this bond, making you infamous with the community instead. Until actions are taken to improve your reputations, all present heroes take a bane on tests using skills from the interpersonal skill group with the group of creatures. You can still use your Scene Partner feature to find allies within the community.`
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createPerk({
					id: 'troubadour-2-3'
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'troubadour-3-1',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'troubadour-ability-1',
			name: 'Artful Flourish',
			description: 'And they said practicing fencing was a waste!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'Two creatures or objects',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '2 damage',
				tier2: '5 damage',
				tier3: '7 damage'
			}),
			effect: 'You can shift up to 3 squares.',
			spend: [
				{
					value: 2,
					repeatable: true,
					effect: 'You can target one additional creature or object within distance for every 2 drama you spend.'
				}
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-2',
			name: 'Cutting Sarcasm',
			description: 'There you are, radiating your usual charisma.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: '2 + P psychic damage; P < [weak], bleeding (save ends)',
				tier2: '5 + P psychic damage; P < [average], bleeding (save ends)',
				tier3: '7 + P psychic damage; P < [strong], bleeding (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-3',
			name: 'Instigator',
			description: 'I didn’t do it! What?',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: '3 + P damage',
				tier2: '6 + P damage',
				tier3: '9 + P damage'
			}),
			effect: 'The target is taunted by you or a willing ally adjacent to you until the end of the target’s next turn.'
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-4',
			name: 'Witty Banter',
			description: 'A lyrical (and physical) jab insults an enemy and inspires an ally.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: '4 + P psychic damage',
				tier2: '5 + P psychic damage',
				tier3: '7 + P psychic damage'
			}),
			effect: 'One ally within 10 squares can end one effect on them that is ended by a saving throw or that ends at the end of their turn.',
			spend: [
				{
					value: 1,
					effect: 'The chosen ally can also spend a Recovery.'
				}
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-5',
			name: 'Harsh Critic',
			description: 'Just one bad review will ruin their day.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(10)
			],
			target: '1 creature or object',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: '7 + P sonic damage',
				tier2: '10 + P sonic damage',
				tier3: '13 + P sonic damage'
			}),
			effect: 'The first time the target uses an ability before the start of your next turn, any tier-related effects of that ability other than damage are suppressed, negating those effects for all targets. Ability effects that always happen regardless of the power roll work as usual.'
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-6',
			name: 'Hypnotic Overtones',
			description: 'You produce an entrancing note that twists the senses in a spectacular fashion.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			preEffect: '',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: 'Slide 1; I < [weak], dazed (save ends)',
				tier2: 'Slide 1; I < [average], dazed (save ends)',
				tier3: 'Slide 2; I < [strong], dazed (save ends)'
			}),
			spend: [
				{
					value: 2,
					repeatable: true,
					effect: 'The size of the burst is increased by 1 for every 2 drama you spend.'
				}
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-7',
			name: 'Quick Rewrite',
			description: 'You write something unforeseen into the scene that hinders your enemy.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: '4 damage; P < [weak], slowed (save ends)',
				tier2: '5 damage; P < [average], slowed (save ends)',
				tier3: '6 damage; P < [strong], restrained (save ends)'
			}),
			effect: 'The area becomes difficult terrain for enemies.'
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-8',
			name: 'Upstage',
			description: 'As you bob and weave through the crowd, you can’t help but leave the audience wanting more.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 3,
			preEffect: 'You shift up to your speed. You make one power roll that targets each enemy who becomes adjacent to you during the shift.',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility, Characteristic.Presence ],
				tier1: 'Taunted (EoT); A < [weak], prone',
				tier2: 'Taunted (EoT); A < [average], prone',
				tier3: 'Taunted (EoT); A < [strong], prone and can’t stand (EoT)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-9',
			name: 'Dramatic Reversal',
			description: 'Give the audience a surprise.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Self and each ally in the area',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: 'The target can shift 1 square and make a free strike.',
				tier2: 'The target can shift up to 2 squares and make a free strike with an edge.',
				tier3: 'The target can shift up to 3 squares and make a free strike with an edge, then can spend a Recovery.'
			})
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-10',
			name: 'Fake your Death',
			description: 'O happy dagger, this is thy sheath!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			effect: 'You turn invisible and create a magical illusion of your corpse falling in your space. While you are invisible, you gain a +3 bonus to speed and you ignore difficult terrain. The illusion melts into the ground and your invisibility ends at the end of your next turn, or earlier if the illusion is interacted with, if you take damage, or if you use an action or a maneuver.'
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-11',
			name: 'Flip the Script',
			description: 'You try a different take on events, justifying the new locations everyone ended up in.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Self and each ally in the area',
			cost: 5,
			effect: 'Each target can immediately teleport up to 5 squares. Any teleported target who was slowed is no longer slowed.'
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-12',
			name: 'Method Acting',
			description: 'They’re so hurt by your performance, you sort of start to believe it yourself.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '6 + A damage; P < [weak], weakened (save ends)',
				tier2: '10 + A damage; P < [average], weakened (save ends)',
				tier3: '14 + A damage; P < [strong], weakened (save ends)'
			}),
			effect: 'You can become bleeding (save ends) to deal an additional 5 corruption damage to the target.'
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-13',
			name: 'Extensive Rewrites',
			description: 'No, this isn’t right. That foe was over there!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: 'Slide 3; P < [weak], this slide ignores the target’s stability.',
				tier2: 'Slide 5; P < [average], this slide ignores the target’s stability.',
				tier3: 'Slide 7; P < [strong], this slide ignores the target’s stability.'
			}),
			effect: 'Instead of sliding a target, you can swap their location with another target as long as each can fit into the other’s space. You can’t slide targets into other creatures or objects using this ability.'
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-14',
			name: 'Infernal Gavotte',
			description: 'A spicy performance lights a fire under your allies’ feet.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: '5 fire damage; A < [weak], weakened (save ends)',
				tier2: '7 fire damage; A < [average], weakened (save ends)',
				tier3: '10 fire damage; A < [strong], weakened (save ends)'
			}),
			effect: 'Each ally in the area can shift up to 2 squares.'
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-15',
			name: 'Virtuoso\'s Solo',
			description: 'Your performance travels and doesn’t stop moving until your audience is completely rocked.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(10)
			],
			target: '1 creature or object',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Presence ],
				tier1: '5 + P damage',
				tier2: '8 + P damage; push 3',
				tier3: '11 + P damage; push 5'
			}),
			effect: 'You can choose to have this ability deal sonic damage. Additionally, you can use this ability on the same target for the next 2 rounds without spending drama.'
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-16',
			name: 'We Meet At Last; Let\'s Finish This',
			description: 'Totus mundus agit histrionem.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
			cost: 7,
			effect: `
Until the end of the encounter, both you and the target can target each other with abilities even if you are beyond distance, with the distance of this ability replacing those abilities’ distances. Abilities that grapple or force move a target are ignored if the target isn’t within the distance of the ability.

Additionally, on each of your turns, you can use a free maneuver to communicate a motivating or dispiriting message to the target, either giving them two surges or a bane on the next attack they use before the start of your next turn.`
		})
	],
	subclasses: [
		{
			id: 'troubadour-sub-1',
			name: 'Duelist',
			description: 'Drama embraces your every movement done in tandem with another. You perform dances of death, putting trust in your opponent to return your passion in kind.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'troubadour-sub-1-1-0',
							listOptions: [ SkillList.Exploration ],
							selected: [ 'Gymnastics' ]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-1-1-1',
								name: 'Acrobatics',
								description: 'Folks love a good tumble.',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
								target: 'Self and each ally in the area',
								effect: 'While this routine is active, any target who starts their turn in the aura can automatically obtain a tier 3 result on one test made to jump, tumble, or climb as part of their movement before the end of their turn.'
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-1-1-2',
								name: 'Star Power',
								description: 'You’re the one they came to see!',
								type: FactoryLogic.type.createManeuver(),
								keywords: [],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You gain a +2 bonus to speed until the end of your turn. Additionally, the next power roll you make this turn can’t have a result lower than tier 2.',
								spend: [
									{
										value: 2,
										effect: 'You gain a +4 bonus to speed instead.'
									}
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-1-1-3',
								name: 'Riposte',
								description: '“I’d have brought treats had I known I’d be fighting a dog.”',
								type: FactoryLogic.type.createTrigger('The target takes damage from a melee strike.'),
								keywords: [],
								distance: [ FactoryLogic.distance.createMelee() ],
								target: 'Self or one ally',
								effect: 'The target makes a free strike against the triggering striker.'
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createChoice({
							id: 'troubadour-sub-1-2-1',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'troubadour-sub-1-2-1a',
											name: 'Classic Chandelier Stunt',
											description: 'Audiences love this bit.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'Self and 1 willing ally',
											cost: 5,
											effect: 'Each target shifts up to 5 squares, and can shift vertically. Both targets must end this movement adjacent to each other and on solid ground. Each target can then make a melee free strike that deals additional damage equal to twice their highest characteristic score.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'troubadour-sub-1-2-1b',
											name: 'En Garde!',
											description: 'Wait it’s … Guard! Turn! Perry! Dodge! Spin! Thrust! Hah!',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: '1 creature',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '6 + A damage; the target can shift up to 3 squares and make a free strike against you',
												tier2: '9 + A damage; the target can shift up to 2 squares and make a free strike against you',
												tier3: '13 + A damage; the target can shift 1 square'
											}),
											effect: 'If the target shifts or makes a free strike against you as a result of this ability, you can shift up to 3 squares and make a melee free strike against the target.'
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
					features: [
						FactoryLogic.feature.create({
							id: 'troubadour-sub-1-3-1',
							name: 'Foil',
							description: 'Choose one creature within line of effect at the start of an encounter. You have a double edge on power rolls made against or in competition with that creature. The chosen creature also has a double edge on power rolls made against or in competition with you. If the creature dies, you can choose a new foil at the start of the next round.'
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'troubadour-sub-2',
			name: 'Skald',
			description: 'You seek drama from story and recount, using your magic to manipulate the sequence of events unfolding before you.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'troubadour-sub-2-1-0',
							listOptions: [ SkillList.Interpersonal ],
							selected: [ 'Brag' ]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-2-1-1',
								name: 'Blocking',
								description: 'No, no, no, you lose the audience that way. Try it like this …',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 2 }) ],
								target: 'Special',
								effect: 'At the end of each of your turns while this routine is active, you can choose a number of creatures equal to your Presence score in the aura, causing those creatures to be teleported to unoccupied squares in the aura. A target can’t be teleported in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect.'
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-2-1-2',
								name: 'Dramatic Monologue',
								description: 'It doesn’t need to make sense. Just say it with emotionality.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Special',
								effect: `
Choose one of the following effects:

* You orate a rousing tale of victory. One ally within distance gains an edge on the next power roll they make before the start of your next turn.
* You weave a tale of high stakes heroics. One ally within distance gains a surge.
* You insult a foe where they’re most vulnerable. That foe takes a bane on the next power roll they make before the end of their next turn.`,
								spend: [
									{
										value: 1,
										effect: 'You can choose two targets for any of these effects.'
									}
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-2-1-3',
								name: 'Turnabout is Fair Play',
								description: 'All’s fair in love and whatever.',
								type: FactoryLogic.type.createTrigger('The target makes an ability power roll with at least one edge or bane.'),
								keywords: [],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: '1 creature',
								effect: 'One of the edges becomes a bane or vice versa.',
								spend: [
									{
										value: 3,
										effect: 'One of the edges becomes a double bane, or one of the attack’s banes becomes a double edge.'
									}
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createChoice({
							id: 'troubadour-sub-2-2-1',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'troubadour-sub-2-2-1a',
											name: 'Guest Star',
											description: 'We offered them a percentage of the gross. So they’re working for free!',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: 'Special',
											cost: 5,
											effect: 'Either a bystander within distance is uplifted by your magic, or a mysterious new hero appears in an unoccupied space to help out during the encounter. This guest star is controlled by you, has their own turn, shares your characteristics. Their stamina is maximum is half yours. They have no abilities other than your melee and ranged free strikes. When the target is reduced to 0 Stamina or at the end of the encounter, they retreat or revert to a bystander. An individual bystander can’t be uplifted in this way more than once in an encounter.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'troubadour-sub-2-2-1b',
											name: 'Twist at the End',
											description: 'You didn’t see that coming, did you?!',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: '1 dead enemy',
											cost: 5,
											effect: 'As long as the target is not a leader or a solo creature, they come back to life with half their Stamina and become an ally under the Director’s control. The players can discuss with the Director when the target takes their turn each round. The target turns to dust and blows away at the end of the encounter.'
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
					features: [
						FactoryLogic.feature.create({
							id: 'troubadour-sub-2-3-1',
							name: 'Recast a Supporting Part',
							description: 'If you aren’t surprised at the beginning of an encounter, you can choose one enemy within line of effect who isn’t a leader or a solo creature. The director swaps that creature out with a squad of minions whose encounter value doesn’t exceed the chosen creature’s encounter value. The Director can determine that this feature can’t be used against certain special enemies.'
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'troubadour-sub-3',
			name: 'Virtuoso',
			description: 'You find drama in music and song, weaving magic between the vibrations of your sound and filling the audience with your pathos.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'troubadour-sub-3-1-0',
							listOptions: [ SkillList.Interpersonal ],
							selected: [ 'Music' ]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-3-1-1',
								name: 'Power Chord',
								description: 'Your instrument rings true and your music blows everyone away.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
								target: 'Each enemy in the area',
								powerRoll: FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Presence ],
									tier1: 'Push 1',
									tier2: 'Push 2',
									tier3: 'Push 3'
								})
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-3-1-2',
								name: 'Thunder Mother',
								description: 'All for thunder motherrr! 🎵 Run and hide for coverrr! 🎵',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Routine, AbilityKeyword.Strike ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: '1 creature',
								preEffect: 'At the end of each round while this routine is active, make a power roll that ignores cover. You can’t target the same creature twice with this effect.',
								powerRoll: FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Presence ],
									tier1: 'Lightning damage equal to your level',
									tier2: 'Lightning damage equal to 5 + your level',
									tier3: 'Lightning damage equal to 10 + your level'
								})
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-3-1-3',
								name: 'Ballad of the Beast',
								description: 'Teeth are bare! 🎵 Eyes black! 🎵 No escaping the beast! 🎵',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
								target: 'Self and each ally in the area',
								effect: 'While this routine is active, each target who starts their turn in the aura gains a surge.'
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-3-1-4',
								name: 'Harmonize',
								description: 'Give the chorus a little punch.',
								type: FactoryLogic.type.createTrigger('The target uses a non-area ability that targets one enemy.'),
								keywords: [],
								distance: [ FactoryLogic.distance.createRanged(5) ],
								target: '1 ally',
								cost: 3,
								effect: 'The target chooses an additional target for the triggering ability within distance of that ability. They use the original power roll for all additional targets. Any damage dealt to an additional target is sonic damage.',
								spend: [
									{
										value: 2,
										effect: 'The target chooses two additional targets instead of one.'
									}
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createChoice({
							id: 'troubadour-sub-3-2-1',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'troubadour-sub-3-2-1a',
											name: 'Encore',
											description: 'Again! Again!',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike ],
											distance: [ FactoryLogic.distance.createSpecial('Special') ],
											target: 'Special',
											cost: 5,
											effect: 'You recreate and enact a strike you have observed this round. The strike can’t be one that uses Malice. When you make the strike, you use your Presence score for any power rolls, and any damage you deal is sonic damage.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'troubadour-sub-3-2-1b',
											name: 'Tough Crowd',
											description: 'Your fans don’t seem to like the opening act …',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
											target: 'Special',
											cost: 5,
											preEffect: 'The affected area becomes haunted by a swirling horde of phantoms until the end of the encounter. Any ally can enter any square of the area without spending movement. At the end of each of your turns, you can make a power roll against each enemy in the area.',
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: '5 corruption damage; M < [weak], pull 1 toward the center of the area',
												tier2: '9 corruption damage; M < [average], pull 2 toward the center of the area',
												tier3: '12 corruption damage; M < [strong], pull 3 toward the center of the area'
											})
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
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-3-3-1',
								name: 'Fire Up the Night',
								description: 'Maybe you and I 🎵 We can still bring the light! 🎵',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
								target: 'Self and each ally in the area',
								effect: 'While this routine is active, each target who starts their turn in the aura doesn’t take a bane on attacks against a creature with concealment. They can also search for hidden creatures as a free maneuver once during their turn.'
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'troubadour-sub-3-3-2',
								name: 'Neverending Hero',
								description: 'And toniiight we can truly say 🎵 They will alllways find a way! 🎵',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
								target: 'Self and each ally in the area',
								effect: 'While this routine is active, each target who starts their turn dying while in the aura gains an edge on power rolls and ignores the effects of bleeding until the end of their turn.'
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
