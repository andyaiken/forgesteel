import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { auteur } from './auteur';
import { duelist } from './duelist';
import { virtuoso } from './virtuoso';

export const troubadour: HeroClass = {
	id: '9y3Jx3koKZipiPh1',
	name: 'Troubadour',
	description: `The whole world’s a stage, and everyone on it, an actor. No one knows this better than the troubadour. You find energy in the drama of everyday life and know how to draw spectacle forth from even the most mundane of situations. You accent highs and deepen lows in service to whoever might witness your performance.

As a troubadour, you chase drama. The insurmountable dangers of the world might cause many a hero to cower. But you take to that world stage not intending to die, but to find out if you are truly alive.

“History is a tale. Each of us is just a story we tell ourselves. Change the story, and you change the world.”
Jackson Bootblack`,
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
					id: '3G7nEekJVbHgJJNl',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'drlPj8moDZL1c8D1',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'UH5m1URtvSjZqfQb',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Read Person' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'GjD2ZwdbvEIZOKQV',
					listOptions: [ SkillList.Interpersonal ],
					count: 2
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'WpHiobCwPhxC5q2g',
					listOptions: [ SkillList.Intrigue, SkillList.Lore ]
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'tS1DEkc8ZWqFRIxE',
					name: 'Drama',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '1d3'
						},
						{
							tag: '',
							trigger: 'The first time three or more heroes use an ability on the same turn',
							value: '2'
						},
						{
							tag: '',
							trigger: 'The first time any hero is made winded during the encounter',
							value: '2'
						},
						{
							tag: '',
							trigger: 'Whenever a creature within your line of effect rolls a natural 19 or 20',
							value: '3'
						},
						{
							tag: '',
							trigger: 'When you or another hero dies',
							value: '10'
						}
					],
					details: 'When you are dead, you continue to gain drama during combat as long as your body is intact. If you have 30 drama during the encounter in which you died, you can come back to life with 1 Stamina and 0 drama (no action required). If you are still dead after the encounter in which you died, you can’t gain drama during future encounters.'
				}),
				FactoryLogic.feature.createKitChoice({
					id: '3rwc3gnUTZ6Ta7a0'
				}),
				FactoryLogic.feature.create({
					id: 'q9DC0wXzaL4f1EeU',
					name: 'Scene Partner',
					description: `Whenever you obtain a success on a test to interact with an NPC using a skill from the interpersonal group, you can form a bond with that NPC. When you enter into a negotiation with a bonded NPC, their patience increases by 1 (to a maximum of 5). Additionally, the first time during a negotiation that you personally make an argument that would increase a bonded NPC’s interest by 1, you instead increase their interest by 2 (to a maximum of 5).

You can have a number of bonds active equal to your level. When you form a bond with a new NPC that would exceed the limit, you must choose which of your active bonds to lose.`
				}),
				FactoryLogic.feature.create({
					id: 'MTcRnLoVfzQkQw7T',
					name: 'Routines',
					description: 'You enter every battle with a set of performance abilities at the ready. Performances are magical presentations (such as songs, dances, poems, or gymnastic feats) that your allies can participate in. These abilities have the Performance keyword. At the start of each combat round, as long as you are not dazed, dead, or surprised, you can either choose a new performance or maintain your current performance (no action required). Your performance lasts until you are unable to maintain it or until the end of the encounter.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'DY5KgVsjM9G2b1eP',
						name: 'Choreography',
						description: 'Taps, kicks, steps. It’s all “choreography.”',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('While this performance is active, each target who starts their turn in the area gains a +2 bonus to speed until the end of their turn. ')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'uqp9td9gJ5c4tKKQ',
						name: 'Revitalizing Limerick',
						description: 'There once was a man from Capital …',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('At the end of each of your turns while this performance is active, you can choose up to a number of targets equal to your Presence score. Each chosen target can spend a Recovery.')
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'JEPrmTnFwNbi7kWO',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'cCfz5o1dUmzOYVPL',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'smLIhr6BGJPZscJG',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'TzNcWWXAnI5bvPk9',
					name: 'Appeal to the Muses',
					description: `You can give a rousing speech, invoke your inspirations, or lift your fellows’ spirits, appealing to the muses to heighten a battle’s drama. However, irony is eager to hand your fortune to the villain to achieve the same end.

Before you roll to gain drama at the start of your turn, you can make your appeal (no action required). If you do, your roll gains the following
additional effects:
* If the roll is a 1, you gain 1 additional drama. The Director gains 1d3 Malice.
* If the roll is a 2, you gain 1 Heroic Resource, which you can keep or give to an ally within the distance of your active performance. The Director gains 1 Malice.
* If the roll is a 3, you gain 2 of a Heroic Resource, which you can distribute among yourself and any allies within the distance of your active performance.`
				}),
				FactoryLogic.feature.createChoice({
					id: 'WagqmAOErEbwOMUA',
					name: 'Invocation',
					description: 'You have a specific manner that helps define your presence on the battlefield. Choose one of the following features.',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'Ojd2syAahwIuMZ7E',
									name: 'Allow Me to Introduce Tonight’s Players',
									description: '',
									type: FactoryLogic.type.createMain(),
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									sections: [
										FactoryLogic.createAbilitySectionText('Whenever you take the first turn in a combat encounter, you can use a main action to introduce yourself and your allies to your opponents. Each ally can shift up to their speed, and ability rolls made against them have a double bane until the end of the combat round. Additionally, any surprised enemy is no longer surprised.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: '3TpougOk43FTEYlT',
								name: 'Formal Introductions',
								description: `As a respite activity, you can scribe a notice of your arrival (such as a calling card or a formal letter) addressed to an enemy. You can deliver the notice to the target personally if you are in the same general area, send it by courier, or leave it in a covert location for the target to find. You can have only one notice active at a time.

The Director determines when the target receives your notice. When the target receives the notice, they become alarmed and take desperate measures to stop you. The Director gains 1 additional Malice per combat round during encounters involving the target. The heroes start each such encounter with 2 additional hero tokens. These hero tokens disappear at the end of the encounter.`
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'vAsAdX1lzAwxKC0z',
								name: 'My Reputation Precedes Me',
								description: `You can invoke your reputation at the start of a social interaction with one or more NPCs who haven’t met you before, automatically creating a bond with one of those NPCs from that group as if using your Scene Partner feature. This bond counts against the limit on active bonds from your Scene Partner feature. While the bond is active, all heroes present treat their Renown as 2 higher than usual for the purpose of entering into a negotiation with the bonded NPC.

The Director can award the heroes 1 hero token to make you infamous among the group of creatures instead, and preventing you from forming this bond. Until you take action to improve your reputation, all heroes present take a bane on tests made to interact with creatures in the group using skills from the interpersonal skill group. You can still use your Scene Partner feature to find allies within the group.`
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createPerk({
					id: 'tknnoxNMdhRdiF1e',
					lists: [ PerkList.Interpersonal, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'yoKyUfQEMwhyC4Ze',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'bEgiUgVeMGaONxTn',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'N00Uu7tYlbZh5mLR',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'eMWbssNB1OSeIFmj',
					name: 'Melodrama',
					options: [
						{
							feature: FactoryLogic.feature.createHeroicResourceGain({
								id: 'bPZ0jgAHVi08ZX2X',
								name: 'Melodrama #1',
								tag: '',
								trigger: 'Whenever a creature rolls a natural 2 on a power roll.',
								value: '2'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createHeroicResourceGain({
								id: 'Jlp0a0yANrSIoeXp',
								name: 'Melodrama #2',
								tag: '',
								trigger: 'The first time the Director deals damage to a hero using a Villain action or an ability that costs Malice.',
								value: '2'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createHeroicResourceGain({
								id: '05FGfz1LetwQOlGm',
								name: 'Melodrama #3',
								tag: '',
								trigger: 'The first time a hero unwillingly falls 5 or more squares.',
								value: '2'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createHeroicResourceGain({
								id: 'bnEzQSbTNyay2M51',
								name: 'Melodrama #4',
								tag: '',
								trigger: 'The first time a hero deals damage with 3 surges.',
								value: '2'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createHeroicResourceGain({
								id: 'lbGOgNoNt9SsiBDB',
								name: 'Melodrama #5',
								tag: '',
								trigger: 'Whenever a hero spends their last Recovery.',
								value: '2'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'AOgAXA0Z2YZWf0Be',
								name: 'Melodrama Alternative',
								description: 'You can forgo choosing a new event to choose one event you already have (including an event gained with this feature). Whenever the chosen event grants you drama, you gain 1 additional drama.'
							}),
							value: 1
						}
					],
					count: 2
				}),
				FactoryLogic.feature.createPerk({
					id: 'c8wilO6exppZ8lk0'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'pBD0Fhn5vO1A26aB',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				}),
				FactoryLogic.feature.create({
					id: 'faVh7riGGaN0uOHR',
					name: 'Zeitgeist',
					description: `You always have your ear to the ground, your finger on the pulse. When you start or finish a respite, choose one of the following effects.
### Foreshadowing

You can ask the Director for two clues regarding an upcoming encounter or negotiation. One of the clues can be false.

### Hear Ye, Hear Ye!

By bragging, intimidating, leading, or lying, you attempt to spread one piece of information into the local area. Make a Presence test:

| Roll    | Effect                                                                                                                                                                                                                                        |
|:--------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ≤ 11    | Your information reaches no one.                                                                                                                                                                                                              |
| 12 - 16 | Your information reaches the nearest populated area of town size or larger. You and each ally present when you make the test gain an edge on Presence tests in that area until one of you spends a Recovery.                                  |
| ≥ 17    | Your information reaches the nearest populated area of town size or larger, plus the next closest such population. You and allies present for your test gain an edge on Presence tests made in those areas until you start your next respite. |

### Latest Goss

You can ask the Director for three rumors regarding the area you’re in or an area you plan on entering before your next respite. One of the rumors can be false.`
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'ExlOitsyzbnBbNA2',
					cost: 9
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'ywf7fUdThUpCdF6J',
					lists: [ PerkList.Interpersonal, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'KFi7rVE3i9lrpXic',
						name: 'Spotlight',
						description: 'The audience is watching, so you’d better give them a show.',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('While this performance is active, each target who starts their turn in the area gains 1 of their Heroic Resource. This Heroic Resource disappears at the end of the target’s turn if they don’t spend it.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'grnE5hFyVyLylxC2',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'LNpO0wUO8Eevov6c',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'JszVRV1fs7lyz7yF',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'u8XAyI9vpwIPsJXi',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'cuvMsaNuv1KvGvUF',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.create({
					id: 'HRzXpQyzYdOU4f3r',
					name: 'Equal Billing',
					description: `You can use your Scene Partner feature to form a bond with one willing hero instead of an NPC you interact with using a test. If you bond with another hero, you lose your existing bond with a hero.

Additionally, you and creatures you are bonded with gain a +1 bonus to saving throws. Whenever you or a bonded creature succeeds on a saving throw, you and each creature you are bonded with gains temporary Stamina equal to your level.`
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'JRIAGwr5xwIXZdG5',
					name: 'A Muse’s Muse',
					tag: 'start 2',
					trigger: 'Start of your turn',
					value: '1d3 + 1',
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'A7CsaTimMURrXg0M',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'rm84D6UDOw6SNSVm'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'wAOl8UZ3VTUdA67Z',
					cost: 11
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'b4oYpDkEydG3CTOD',
					name: 'Roar of the Crowd',
					description: `You are empowered by your audience, near and far. You can’t be made frightened, and if you are prone, you can stand up as a free maneuver.

Additionally, whenever you spend a Recovery, you can forgo regaining Stamina to invoke the roar of an invisible applauding audience. You and each ally within 3 squares of you gains temporary Stamina equal to 10 + the number of active bonds from your Scene Partner feature + either your Victories or the number of players in your game (whichever is higher).`
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createHeroicResource({
					id: 'GYcwgp374s2e3GiY',
					name: 'Applause',
					gains: [
						{
							tag: '',
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					]
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'nkOnWwzyFh2QZOnV',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'KyTOfWVz1Htc6DAr',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.create({
					id: 'SvXvD5JZWWIMcMGv',
					name: 'Dramaturgy',
					description: 'You gain 1 additional drama or other Heroic Resource whenever you use your Appeal to the Muses feature. Additionally, your performances no longer have a distance, but can affect any target on the encounter map within your line of effect.'
				}),
				FactoryLogic.feature.create({
					id: 'kN2tUhuHAbfRxOM3',
					name: 'Greatest of All Time',
					description: 'Whenever you obtain a success on a test, each NPC within your line of effect has their Impression score decreased by 4 during a negotiation (to a minimum of 1), and each ally within 3 squares of you gains an edge on their next test. These effects last until you start your next respite.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'MJlch8xy0BmtjEAz',
					lists: [ PerkList.Interpersonal, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'gIVmDrETVg4F0eTC',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'gEzZJ1hBo5YTQZVL',
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
					effect: 'You can target one additional creature or object for every 2 drama spent.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'aiH7V95hu1z7bvnJ',
			name: 'Cutting Sarcasm',
			description: 'There you are, radiating your usual charisma.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '2 + P psychic damage; p < [weak] , bleeding (save ends)',
						tier2: '5 + P psychic damage; p < [average] , bleeding (save ends)',
						tier3: '7 + P psychic damage; p < [strong] , bleeding (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'Dq8W50f8RkS1gCZR',
			name: 'Instigator',
			description: 'I didn’t do it! What?',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
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
			id: 'oklqgAHvGNBYvZ6Y',
			name: 'Witty Banter',
			description: 'A lyrical (and physical) jab insults an enemy and inspires an ally.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
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
				FactoryLogic.createAbilitySectionText('One ally within 10 squares of you can end one effect on them that is ended by a saving throw or that ends at the end of their turn.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Spend',
					value: 1,
					effect: 'The chosen ally can spend a Recovery.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'wuGWNezovUaXNrhz',
			name: 'Harsh Critic',
			description: 'Just one bad review will ruin their day.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(10)
			],
			target: 'One creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '7 + P sonic damage',
						tier2: '10 + P sonic damage',
						tier3: '13 + P sonic damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The first time the target uses an ability before the start of your next turn, any effects from the ability’s tier outcomes other than damage are negated for all targets. Ability effects that always happen regardless of the power roll work as usual. ')
			]
		}),
		FactoryLogic.createAbility({
			id: '48Ek5173XbbcaIuv',
			name: 'Hypnotic Overtones',
			description: 'You produce an entrancing note that twists the senses in a spectacular fashion.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'Slide 1; i < [weak], dazed (save ends)',
						tier2: 'Slide 1; i < [average], dazed (save ends)',
						tier3: 'Slide 2; i < [strong], dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Spend',
					value: 2,
					repeatable: true,
					effect: 'The size of the burst increases by 1 for every 2 drama spent.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'D27ycyqsuILS0KXt',
			name: 'Quick Rewrite',
			description: 'You write something unexpected into the scene that hinders your enemy.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '4 damage; p < [weak], slowed (save ends)',
						tier2: '5 damage; p < [average], slowed (save ends)',
						tier3: '6 damage; p < [strong], restrained (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('The area is difficult terrain for enemies.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'amyFFfmA2oAoiO8P',
			name: 'Upstage',
			description: 'As you bob and weave through the crowd, you can’t help but leave the audience wanting more.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('You shift up to your speed. You make one power roll that targets each enemy you move adjacent to during this shift.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility, Characteristic.Presence ],
						tier1: 'Taunted (EoT); a < [weak], prone',
						tier2: 'Taunted (EoT); a < [average], prone',
						tier3: 'Taunted (EoT); a < [strong], prone and can’t stand (EoT)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'MKhak5HyGbRZdhWy',
			name: 'Dramatic Reversal',
			description: 'Give the audience a surprise.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Self and each ally in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'The target can shift 1 square and make a free strike.',
						tier2: 'The target can shift up to 2 squares and make a free strike that gains an edge.',
						tier3: 'The target can shift up to 3 squares and make a free strike that gains an edge, then can spend a Recovery.'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'y4twMNJioffMnTAp',
			name: 'Fake Your Death',
			description: 'O happy dagger, this is thy sheath!',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText(' You turn invisible and create a magical illusion of your corpse falling in your space. While you are invisible, you gain a +3 bonus to speed and you ignore difficult terrain. The illusion and your invisibility last until the end of your next turn, or until the illusion is interacted with, you take damage, or you use a main action or a maneuver.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'wkTaIiJ4JOVGjFkE',
			name: 'Flip the Script',
			description: 'You try a different take on events, justifying the new locations everyone ended up in.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Self and each ally in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('Each target can teleport up to 5 squares. Any teleported target who was slowed is no longer slowed.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'lHLPt6cUuyXcCdb0',
			name: 'Method Acting',
			description: 'They’re so hurt by your performance, you start to believe it yourself. ',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '6 + A damage; p < [weak], weakened (save ends)',
						tier2: '10 + A damage; p < [weak], weakened (save ends)',
						tier3: '14 + A damage; p < [weak], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You can become bleeding (save ends) to deal an extra 5 corruption damage to the target.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'BlO52My4D7X4wdVh',
			name: 'Extensive Rewrites',
			description: 'No, this isn’t right. That foe was over there!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'Slide 3; p < [weak], this slide ignores the target’s stability',
						tier2: 'Slide 5; p < [average], this slide ignores the target’s stability',
						tier3: 'Slide 7; p < [strong], this slide ignores the target’s stability'
					})
				),
				FactoryLogic.createAbilitySectionText('Instead of sliding a target, you can swap their location with another target as long as each can fit into the other’s space. You can’t slide targets into other creatures or objects using this ability.')
			]
		}),
		FactoryLogic.createAbility({
			id: '7vm0VdMiqgrZtpcu',
			name: 'Infernal Gavotte',
			description: 'A spicy performance lights a fire under your allies’ feet',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '5 fire damage; a < [weak], weakened (save ends)',
						tier2: '7 fire damage; a < [average], weakened (save ends)',
						tier3: '10 fire damage; a < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('Each ally in the area can shift up to 2 squares.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fyx732V0Vlq49a1N',
			name: 'Action Hero',
			description: 'You wield your weapon at blistering speed, leaving everyone around you fighting for their lives.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Each enemy in the area',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '10 damage',
						tier2: '14 damage',
						tier3: '20 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Unless you score a critical hit, this ability can’t reduce a non-minion target below 1 Stamina.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'HeBr76EpA6RIMDSX',
			name: 'Continuity Error',
			description: 'Your subject is written into two places at once.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One enemy or object',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('The target is split into two separate entities, one of which remains in the target’s space while the other appears in an unoccupied space of your choice within distance. If the target is a creature, this creates a new creature under the Director’s control. Each entity has half the original target’s Stamina, is weakened, and takes 1d6 corruption damage at the start of each of their turns. If either entity is reduced to 0 Stamina, the other entity persists as the original entity and this effect ends. The effect also ends if both entities occupy the same space, causing them to automatically merge and combine their current Stamina.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'Q5GrFFZc8YjRIJjL',
			name: 'Love Song',
			description: 'You play a small ditty that plants you inside your target’s heart.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('The target gains 20 temporary Stamina. Until the end of the encounter, whenever the target takes damage while you’re within distance, you can choose to take the damage instead of the target.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'ZrTkbAu3EcZ0C6Di',
			name: 'Patter Song',
			description: 'Dazzle them with your fancy patter and they forget where they were.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'One ally within distance can take their turn immediately after yours.',
						tier2: 'Two allies within distance can take their turns immediately after yours in any order.',
						tier3: 'Three allies within distance can take their turns immediately after yours in any order. One of those allies can have already taken a turn this combat round.'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'SRHmnFY5rDCiCRuR',
			name: 'Dramatic Reveal',
			description: 'A little stage trickery, and where once stood a foe, now stands a friend!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, whenever you reduce a creature to 0 Stamina using an ability, you can use a free triggered action to teleport an ally within distance of that ability into the creature’s space in a plume of rose petals. You or the teleported ally can then make a melee free strike.')
			]
		}),
		FactoryLogic.createAbility({
			id: '0rmeKAGMyn9Q6YMf',
			name: 'Power Ballad',
			description: 'A song for the brokenhearted wraps itself around the target and blossoms into a ward of thorns.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, whenever the target takes damage while winded, they can use a free triggered action to deal half the damage they took to the source of the damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: '2XIhjJCLHQuNte5I',
			name: 'Saved in the Edit',
			description: 'You shout a word of power that allows you to rewrite reality to your whims.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText(`Until the end of the encounter, whenever you deal rolled damage to a creature or object, or enable a creature to spend a Recovery, you can use a free triggered action to give that creature or object one of the following effects until the start of your next turn. If this ability is triggered by multiple targets taking damage or multiple creatures spending Recoveries simultaneously, each target receives the same effect:
* The target has damage weakness equal to your Presence score against any magic, psionic, or weapon ability.
* The target has damage immunity equal to your Presence score.
* The target has a bonus to stability and a penalty to speed equal to your Presence score.
* The target has a bonus to speed and a penalty to stability equal to your Presence score.`)
			]
		}),
		FactoryLogic.createAbility({
			id: 'zrzbOjJnBZb8eWUQ',
			name: 'The Show Must Go On',
			description: 'You shine a bright light on the players on the stage and compel them to finish the performance.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '6 damage; p < [weak], the target can’t willingly leave the area (EoT)',
						tier2: '8 damage; p < [average], the target can’t willingly leave the area (save ends)',
						tier3: '12 damage; the target can’t willingly leave the area (EoT); if p < [strong], they can’t willingly leave the area (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('Each ally within distance can’t obtain lower than a tier 2 outcome on the next test they make before the start of your next turn.')
			]
		})
	],
	subclasses: [
		auteur,
		duelist,
		virtuoso
	],
	level: 1,
	characteristics: []
};
