import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { SkillList } from '../../../enums/skill-list';
import { duelist } from './duelist';
import { skald } from './skald';
import { virtuoso } from './virtuoso';

export const troubadour: HeroClass = {
	id: 'class-troubadour',
	name: 'Troubadour',
	description: `
The whole world's a stage and everyone on it, an actor. No one knows this better than the troubadour. You find energy in the drama of everyday life and know how to draw spectacle forth from even the most mundane of situations. You accent highs and deepen lows in service to whomever would witness your performance.

And beyond the mundane, there are insurmountable dangers that cause many a hero to cower. But the troubadour must chase that drama. The troubadour takes the world stage not to die, but to find out if they are truly alive.`,
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
				FactoryLogic.feature.createHeroicResource({
					id: 'troubadour-resource',
					name: 'Drama',
					gains: [
						{
							trigger: 'Start of your turn',
							value: '1d3'
						},
						{
							trigger: 'Three or more heroes use an ability on the same turn for the first time',
							value: '2'
						},
						{
							trigger: 'A hero becomes winded for the first time (only once per encounter and not once per hero)',
							value: '2'
						},
						{
							trigger: 'A creature within your line of effect rolls a natural 19 or 20',
							value: '3'
						},
						{
							trigger: 'A hero, including you, dies',
							value: '10'
						}
					],
					details: 'You still gain drama during combat if you are dead as long as your body is intact. During the encounter in which you died, if you have 30 drama, you can come back to life with 1 Stamina and 0 drama (no action required). You can’t gain drama in future encounters while you remain dead.'
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
						sections: [
							FactoryLogic.createAbilitySectionText('While this routine is active, each target who starts their turn in the aura gains a +2 bonus to speed until the end of their turn.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('While this routine is active, choose a number of targets equal to your Presence score at the end of your turn. Each chosen target can spend a Recovery.')
						]
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
									type: FactoryLogic.type.createMain(),
									keywords: [],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									sections: [
										FactoryLogic.createAbilitySectionText('Whenever you take the first turn in a combat encounter, you can introduce yourself and your allies to your opponents. Each creature on your side can shift up to their speed and gains the benefit of the Defend action until the end of the round. However, any enemies who were surprised are no longer surprised.')
									]
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
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'Two creatures or objects',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '2 damage',
						tier2: '5 damage',
						tier3: '7 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can shift up to 3 squares.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Spend',
					value: 2,
					repeatable: true,
					effect: 'You can target one additional creature or object within distance for every 2 drama you spend.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-2',
			name: 'Cutting Sarcasm',
			description: 'There you are, radiating your usual charisma.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '2 + P psychic damage; P < [weak], bleeding (save ends)',
						tier2: '5 + P psychic damage; P < [average], bleeding (save ends)',
						tier3: '7 + P psychic damage; P < [strong], bleeding (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-3',
			name: 'Instigator',
			description: 'I didn’t do it! What?',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '3 + P damage',
						tier2: '6 + P damage',
						tier3: '9 + P damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The target is taunted by you or a willing ally adjacent to you until the end of the target’s next turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-4',
			name: 'Witty Banter',
			description: 'A lyrical (and physical) jab insults an enemy and inspires an ally.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '4 + P psychic damage',
						tier2: '5 + P psychic damage',
						tier3: '7 + P psychic damage'
					})
				),
				FactoryLogic.createAbilitySectionText('One ally within 10 squares can end one effect on them that is ended by a saving throw or that ends at the end of their turn.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Spend',
					value: 1,
					effect: 'The chosen ally can also spend a Recovery.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-5',
			name: 'Harsh Critic',
			description: 'Just one bad review will ruin their day.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(10)
			],
			target: '1 creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Presence ],
					tier1: '7 + P sonic damage',
					tier2: '10 + P sonic damage',
					tier3: '13 + P sonic damage'
				})),
				FactoryLogic.createAbilitySectionText('The first time the target uses an ability before the start of your next turn, any tier-related effects of that ability other than damage are suppressed, negating those effects for all targets. Ability effects that always happen regardless of the power roll work as usual.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-6',
			name: 'Hypnotic Overtones',
			description: 'You produce an entrancing note that twists the senses in a spectacular fashion.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Presence ],
					tier1: 'Slide 1; I < [weak], dazed (save ends)',
					tier2: 'Slide 1; I < [average], dazed (save ends)',
					tier3: 'Slide 2; I < [strong], dazed (save ends)'
				})),
				FactoryLogic.createAbilitySectionField({
					name: 'Spend',
					value: 2,
					repeatable: true,
					effect: 'The size of the burst is increased by 1 for every 2 drama you spend.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-7',
			name: 'Quick Rewrite',
			description: 'You write something unforeseen into the scene that hinders your enemy.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Presence ],
					tier1: '4 damage; P < [weak], slowed (save ends)',
					tier2: '5 damage; P < [average], slowed (save ends)',
					tier3: '6 damage; P < [strong], restrained (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('The area becomes difficult terrain for enemies.')
			]
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
			sections: [
				FactoryLogic.createAbilitySectionText('You shift up to your speed. You make one power roll that targets each enemy who becomes adjacent to you during the shift.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility, Characteristic.Presence ],
						tier1: 'Taunted (EoT); A < [weak], prone',
						tier2: 'Taunted (EoT); A < [average], prone',
						tier3: 'Taunted (EoT); A < [strong], prone and can’t stand (EoT)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-9',
			name: 'Dramatic Reversal',
			description: 'Give the audience a surprise.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Self and each ally in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Presence ],
					tier1: 'The target can shift 1 square and make a free strike.',
					tier2: 'The target can shift up to 2 squares and make a free strike with an edge.',
					tier3: 'The target can shift up to 3 squares and make a free strike with an edge, then can spend a Recovery.'
				}))
			]
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
			sections: [
				FactoryLogic.createAbilitySectionText('You turn invisible and create a magical illusion of your corpse falling in your space. While you are invisible, you gain a +3 bonus to speed and you ignore difficult terrain. The illusion melts into the ground and your invisibility ends at the end of your next turn, or earlier if the illusion is interacted with, if you take damage, or if you use an action or a maneuver.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-11',
			name: 'Flip the Script',
			description: 'You try a different take on events, justifying the new locations everyone ended up in.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Self and each ally in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('Each target can immediately teleport up to 5 squares. Any teleported target who was slowed is no longer slowed.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-12',
			name: 'Method Acting',
			description: 'They’re so hurt by your performance, you sort of start to believe it yourself.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '6 + A damage; P < [weak], weakened (save ends)',
					tier2: '10 + A damage; P < [average], weakened (save ends)',
					tier3: '14 + A damage; P < [strong], weakened (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('You can become bleeding (save ends) to deal an additional 5 corruption damage to the target.')
			]
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
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Presence ],
					tier1: 'Slide 3; P < [weak], this slide ignores the target’s stability.',
					tier2: 'Slide 5; P < [average], this slide ignores the target’s stability.',
					tier3: 'Slide 7; P < [strong], this slide ignores the target’s stability.'
				})),
				FactoryLogic.createAbilitySectionText('Instead of sliding a target, you can swap their location with another target as long as each can fit into the other’s space. You can’t slide targets into other creatures or objects using this ability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-14',
			name: 'Infernal Gavotte',
			description: 'A spicy performance lights a fire under your allies’ feet.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Presence ],
					tier1: '5 fire damage; A < [weak], weakened (save ends)',
					tier2: '7 fire damage; A < [average], weakened (save ends)',
					tier3: '10 fire damage; A < [strong], weakened (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('Each ally in the area can shift up to 2 squares.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'troubadour-ability-15',
			name: 'Virtuoso\'s Solo',
			description: 'Your performance travels and doesn’t stop moving until your audience is completely rocked.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(10)
			],
			target: '1 creature or object',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Presence ],
					tier1: '5 + P damage',
					tier2: '8 + P damage; push 3',
					tier3: '11 + P damage; push 5'
				})),
				FactoryLogic.createAbilitySectionText('You can choose to have this ability deal sonic damage. Additionally, you can use this ability on the same target for the next 2 rounds without spending drama.')
			]
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
			sections: [
				FactoryLogic.createAbilitySectionText(`
Until the end of the encounter, both you and the target can target each other with abilities even if you are beyond distance, with the distance of this ability replacing those abilities’ distances. Abilities that grapple or force move a target are ignored if the target isn’t within the distance of the ability.

Additionally, on each of your turns, you can use a free maneuver to communicate a motivating or dispiriting message to the target, either giving them two surges or a bane on the next attack they use before the start of your next turn.`)
			]
		})
	],
	subclasses: [
		duelist,
		skald,
		virtuoso
	],
	level: 1,
	characteristics: []
};
