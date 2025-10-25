import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { HeroClass } from '@/models/class';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
import { exorcist } from '@/data/classes/censor/exorcist';
import { oracle } from '@/data/classes/censor/oracle';
import { paragon } from '@/data/classes/censor/paragon';

export const censor: HeroClass = {
	id: 'class-censor',
	name: 'Censor',
	description: `
Demons and deathless fear you. Criminals run from the sight of your shadow. Agents of chaos, blasphemers, and heretics tremble at the sound of your voice. You carry the power of the gods, armed with wrath and sent out into the world first to seek, then censor those whose actions—or even existence—are anathema to your church.

As a censor, you’re at your best against the strongest foes. Your judgment terrifies heretics, stops enemies in their tracks, and even hurls them across the battlefield.`,
	type: 'standard',
	subclassName: 'Order',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Might, Characteristic.Presence ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'censor-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'censor-recoveries',
					field: FeatureField.Recoveries,
					value: 12
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'censor-resource',
					name: 'Wrath',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '2'
						},
						{
							tag: 'take-damage',
							trigger: 'The first time each round that a creature judged by you deals damage to you',
							value: '1'
						},
						{
							tag: 'deal-damage',
							trigger: 'The first time each round that you deal damage to a creature judged by you',
							value: '1'
						}
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'censor-1-1',
					listOptions: [ SkillList.Interpersonal, SkillList.Lore ],
					count: 2
				}),
				FactoryLogic.feature.createDomainChoice({
					id: 'censor-1-2',
					characteristic: Characteristic.Presence
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'censor-1-4',
						name: 'Judgment',
						description: 'You utter a prayer that outlines your foe in holy energy.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText(`The target is judged by you until the end of the encounter, you use this ability again, you willingly end this effect (no action required), or another censor judges the target.

Whenever a creature judged by you uses a main action and is within your line of effect, you can use a free triggered action to deal holy damage equal to twice your Presence score to them.

When a creature judged by you is reduced to 0 Stamina, you can use a free triggered action to use this ability against a new target.

Additionally, you can spend 1 wrath to take one of the following free triggered actions:

* When an adjacent creature judged by you starts to shift, you make a melee free strike against them and their speed becomes 0 until the end of the current turn, preventing them from shifting.
* When a creature judged by you within 10 squares makes a power roll, you cause them to take a bane on the roll.
* When a creature judged by you within 10 squares uses an ability with a potency that targets only one creature, the potency is reduced by 1 for that creature.
* If you damage a creature judged by you with a melee ability, the creature is taunted by you until the end of their next turn.

You can choose only one free triggered action option at a time, even if multiple options are triggered by the same effect.`),
							FactoryLogic.createAbilitySectionPackage('censor-judgment')
						]
					})
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'censor-1-5'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'censor-1-6',
						name: 'My Life for Yours',
						description: 'You channel some of your vitality into more resilience for you or an ally.',
						type: FactoryLogic.type.createTrigger('The target starts their turn or takes damage.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('You spend a Recovery and the target regains Stamina equal to your Recovery value.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You can end one effect on the target that is ended by a saving throw or that ends at the end of their turn, or a prone target can stand up.'
							})
						]
					})
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'censor-1-7',
					name: '1st-Level Domain Feature',
					level: 1
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'censor-1-8',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'censor-1-9',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'censor-1-10',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'censor-2-1',
					lists: [ PerkList.Interpersonal, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'censor-3-1',
					name: 'Look On My Work and Despair',
					description: 'Your judgment has grown in divine power, instilling fear in those you condemn. Whenever you use your Judgment ability, you can spend 1 wrath, and if the target has P < [average], they are frightened of you (save ends). Additionally, whenever a creature judged by you is reduced to 0 Stamina and you use Judgment as a free triggered action, if the new target has P < [strong], they are frightened of you (save ends). If the target is already frightened of you, they instead take holy damage equal to twice your Presence score.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'censor-3-2',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'censor-4-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'censor-4-1b',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createPerk({
					id: 'censor-4-2',
					lists: [ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'censor-4-3',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Lore, SkillList.Intrigue ]
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'censor-4-4',
					name: 'Wrath Beyond Wrath',
					tag: 'deal-damage 2',
					trigger: 'The first time each round that you deal damage to a creature judged by you',
					value: '2',
					replacesTags: [ 'deal-damage' ]
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'censor-4-5',
					name: '4th-Level Domain Feature',
					level: 4
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'censor-5-1',
					cost: 9
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.create({
					id: 'censor-6-1',
					name: 'Implement of Wrath',
					description: `Each time you finish a respite, you can choose one hero’s weapon, including your own, to channel supernatural power as an implement of your god’s wrath. The weapon becomes magic and gains the following benefits until your next respite:

* Strikes with the weapon deal extra holy damage equal to the wielder’s highest characteristic score.
* Any creature struck by the weapon who has holy weakness and has P < [strong] is frightened and weakened (save ends).
* Any minion targeted by a strike using the weapon dies. That minion’s Stamina maximum is removed from the minion Stamina pool before any damage is applied to the rest of the squad.
* The weapon’s wielder can’t be made frightened.`
				}),
				FactoryLogic.feature.createPerk({
					id: 'censor-6-2',
					lists: [ PerkList.Interpersonal, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'censor-7-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'censor-7-1b',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'censor-7-1c',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'censor-7-1d',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'censor-7-1e',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'censor-7-2',
					name: '7th-Level Domain Feature',
					level: 7
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'censor-7-3',
					name: 'Focused Wrath',
					tag: 'start 2',
					trigger: 'Start of your turn',
					value: '3',
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'censor-7-4',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Lore, SkillList.Intrigue ]
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'censor-8-1',
					lists: [ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'censor-8-2',
					cost: 11
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'censor-9-1',
					name: 'Improved Implement of Wrath',
					description: `The weapon you target with your Implement of Wrath feature gains the following additional benefits:

* The weapon’s wielder and each ally adjacent to them gain a +2 bonus to saving throws.
* At the end of each of the weapon wielder’s turns, each ally adjacent to the wielder makes a saving throw against each effect on them that is ended by a saving throw.
* The weapon’s wielder has corruption immunity 10.`
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'censor-10-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'censor-10-1b',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createPerk({
					id: 'censor-10-2',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'censor-10-3',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Lore, SkillList.Intrigue ]
				}),
				FactoryLogic.feature.create({
					id: 'censor-10-4',
					name: 'Templar',
					description: `You are the ultimate representation of your god’s justice in the timescape. Whenever you use your Judgment ability, you can use a free triggered action to use a conduit domain effect associated with your chosen domain, or a domain you access with virtue. If the effect calls for the use of your Intuition score, you use your Presence score instead. If the effect uses your conduit level, use your censor level instead.

Additionally, whenever you take a respite, you can open a portal to rest in the presence of your deity and bring along any allies. When you do, you can ask your deity three questions, which the Director must answer honestly if your deity knows the answers (though they might answer cryptically or incompletely). When you finish your respite, you and your allies can appear at any location in the timescape where someone worships your deity.

While you rest in their presence, your god might also give you priority targets to enact justice upon. You and your allies each have a double edge on power rolls made against such targets. If you attempt to open a portal to your deity again before you have defeated your priority targets, you suffer your god’s wrath, as determined by the Director.	 
  
  				`
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'censor-10-5',
					name: 'Virtue',
					type: 'epic',
					gains: [
						{
							tag: '',
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					],
					description: `
You can spend 3 virtue to access one of your deity’s domains that you usually don’t have access to. When you do, you can use that domain’s features until you finish another respite.

Virtue remains until you spend it.`
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'censor-10-6',
					name: 'Wrath of the Gods',
					tag: 'start 3',
					trigger: 'Start of your turn',
					value: '4',
					replacesTags: [ 'start', 'start 2' ]
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'censor-ability-1',
			name: 'Back, Blasphemer!',
			description: 'You channel power through your weapon to repel foes.',
			type: FactoryLogic.type.createMain(),
			cost: 'signature',
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 1 }) ],
			target: 'Each enemy in the area',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '2 holy damage; push 1',
						tier2: '4 holy damage; push 2',
						tier3: '6 holy damage; push 3'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-2',
			name: 'Every Step ... Death!',
			description: 'You show your foe a glimpse of their fate after death.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '5 + P psychic damage',
						tier2: '7 + P psychic damage',
						tier3: '10 + P psychic damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Each time the target willingly moves before the end of your next turn, they take 1 psychic damage for each square they move.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-3',
			name: 'Halt, Miscreant!',
			description: 'You infuse your weapon with holy magic that makes it difficult for your foe to get away.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '2 + M holy damage; P < [weak], slowed (save ends)',
						tier2: '5 + M holy damage; P < [average], slowed (save ends)',
						tier3: '7 + M holy damage; P < [strong], slowed (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-4',
			name: 'Your Allies Cannot Save You!',
			description: 'Your magic strike turns your foe’s guilt into a burst of holy power',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M holy damage',
						tier2: '5 + M holy damage',
						tier3: '8 + M holy damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Each enemy adjacent to the target is pushed away from the target up to a number of squares equal to your Presence score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-5',
			name: 'Behold, a Shield of Faith!',
			description: 'A mighty blow turns your foe’s vitality into a holy light that envelops you and an ally, discouraging enemies who might attack you.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M holy damage',
						tier2: '6 + M holy damage',
						tier3: '9 + M holy damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Until the start of your next turn, enemies have a bane on ability rolls made against you and each ally adjacent to you.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-6',
			name: 'Driving Assault',
			description: 'As you force your enemy back with your weapon, you use your faith to stay close.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M damage; push 1',
						tier2: '6 + M damage; push 3',
						tier3: '9 + M damage; push 5'
					})
				),
				FactoryLogic.createAbilitySectionText('You can shift up to your speed in a straight line toward the target after pushing them.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-7',
			name: 'The Gods Punish and Defend',
			description: 'You channel holy energy to smite a foe and heal an ally.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '5 + M holy damage',
						tier2: '8 + M holy damage',
						tier3: '11 + M holy damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can spend a Recovery to allow yourself or one ally within 10 squares to regain Stamina equal to your recovery value.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-8',
			name: 'Repent!',
			description: 'You conjure memories of their sins to harry your foes.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '5 + P holy damage; I < [weak], dazed (save ends)',
						tier2: '8 + P holy damage; I < [average], dazed (save ends)',
						tier3: '11 + P holy damage; I < [strong], dazed (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-9',
			name: 'Arrest',
			description: '“I got you, you son of a bitch.”',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '6 + M holy damage; grabbed',
						tier2: '9 + M holy damage; grabbed',
						tier3: '13 + M holy damage; grabbed'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target makes a strike against a creature while grabbed this way, you can spend 3 wrath to deal holy damage to them equal to your Presence score, then change the target of the strike to another target within the strike’s distance.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-10',
			name: 'Behold the Face of Justice!',
			description: 'You attack a foe and your enemies behold a vision of the true nature of your resolve.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M holy damage; if the target has P < [weak], each enemy within 2 squares of them is frightened of you (save ends)',
						tier2: '5 + M holy damage; if the target has P < [average], each enemy within 2 squares of them is frightened of you (save ends)',
						tier3: '8 + M holy damage; if the target has P < [strong], each enemy within 2 squares of them is frightened of you (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('Each enemy frightened by this ability is pushed 2 squares away from the target and takes psychic damage equal to your Presence score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-11',
			name: 'Censored',
			description: 'Judged and sentenced.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '2 + M holy damage',
						tier2: '3 + M holy damage',
						tier3: '5 + M holy damage'
					})
				),
				FactoryLogic.createAbilitySectionText('When a target who is not a leader or solo creature is made winded by this ability, they are reduced to 0 Stamina.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-12',
			name: 'Purifying Fire',
			description: 'The gods judge, fire cleanses.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '5 + M holy damage; M < [weak], the target has fire weakness 3 (save ends)',
						tier2: '9 + M holy damage; M < [average], the target has fire weakness 5 (save ends)',
						tier3: '12 + M holy damage; M < [strong], the target has fire weakness 7 (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While the target has fire weakness from this ability, you can choose to have your abilities deal fire damage to the target instead of holy damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-13',
			name: 'Edict of Disruptive Isolation',
			description: 'The evil within your foes detonates with holy fire that burns only the guilty.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each target takes holy damage equal to your Presence score at the end of each of your turns. A target takes an extra 2d6 holy damage if they are judged by you or if they are adjacent to any enemy.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-14',
			name: 'Edict of Perfect Order',
			description: 'Within the area of your divine presence, your enemies will regret using their fell abilities.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, whenever a target uses an ability that costs Malice, they take holy damage equal to three times your Presence score. A target judged by you takes an extra 2d6 holy damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-15',
			name: 'Edict of Purifying Pacifism',
			description: 'You shed a righteous energy that punishes enemies who would harm you or your allies.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, whenever a target makes a strike, they take holy damage equal to twice your Presence score. A target judged by you takes an extra 2d6 holy damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-16',
			name: 'Edict of Stillness',
			description: 'The holy aura you project makes it painful for evil-doers to leave your reach.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, whenever a target moves or is force moved out of the area, they take holy damage equal to twice your Presence score. A target judged by you who moves willingly takes an extra 2d6 holy damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-17',
			name: 'Gods Grant Thee Strength',
			description: 'You channel divine force for movement that cannot be stopped.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('The target ends any condition or effect on them that is ended by a saving throw or that ends at the end of their turn, or a prone target can stand up. The target then gains 2 surges, can shift up to their speed while ignoring difficult terrain, and can use a strike signature ability as a free triggered action.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-18',
			name: 'Orison of Victory',
			description: 'You channel your god’s will to overcome hardship and inflict pain.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area ],
			distance: [
				FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
			],
			target: 'Self and each ally in the area',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'Each target gains 1 surge.',
						tier2: 'Each target gains 2 surges.',
						tier3: 'Each target gains 3 surges.'
					})
				),
				FactoryLogic.createAbilitySectionText('A target can end one effect on them that is ended by a saving throw or that ends at the end of their turn, or a prone target can stand up.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-19',
			name: 'Righteous Judgment',
			description: 'You amplify the power of your judgment.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee()
			],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '10 + M damage',
						tier2: '14 + M damage',
						tier3: '20 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, whenever any ally deals damage to a target judged by you, that ally gains 1 surge.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-20',
			name: 'Shield of the Righteous',
			description: 'You strike a foe and create a fleet of divine shields that protect your allies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee()
			],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '10 + M damage; you and each ally adjacent to you gain 10 temporary Stamina',
						tier2: '14 + M damage; you and each ally adjacent to you gain 15 temporary Stamina',
						tier3: '20 + M damage; you and each ally adjacent to you gain 20 temporary Stamina'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-21',
			name: 'Excommunication',
			description: 'You curse your foe to become a bane to their allies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee()
			],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '9 + M damage; I < [weak], weakened (save ends)',
						tier2: '13 + M damage; I < [average], weakened (save ends)',
						tier3: '18 + M damage; I < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('At the end of each of your turns, a target weakened this way deals holy damage equal to twice your Presence score to each enemy within 2 squares of them. Additionally, a target weakened this way can’t be targeted by their allies’ abilities.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-22',
			name: 'Hand of the Gods',
			description: 'You use your foe as a tool against your enemies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createRanged(10)
			],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '10 + M damage',
						tier2: '15 + M damage',
						tier3: '21 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, while the target is judged by you, you can choose to make them the source of any of your abilities. Additionally, the target counts as an ally for the purpose of flanking.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-23',
			name: 'Pillar of Holy Fire',
			description: 'Your enemy’s guilt fuels a holy flame that burns your foes.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee()
			],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '9 + M damage; I < [weak], dazed (save ends)',
						tier2: '13 + M damage; I < [average], dazed (save ends)',
						tier3: '18 + M damage; I < [strong], dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('At the end of each of your turns, a target dazed this way deals holy damage equal to twice your Presence score to each enemy within 2 squares of them.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'censor-ability-24',
			name: 'Your Allies Turn on You!',
			description: 'You turn your enemies’ ire to the target.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createRanged(10)
			],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '5 + P damage; I < [weak], slowed (save ends)',
						tier2: '9 + P damage; I < [average], slowed (save ends)',
						tier3: '12 + P damage; I < [strong], slowed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While the target is slowed this way, each of their allies who starts their turn within 5 squares of them must use a free maneuver to make a free strike against the target. Additionally, while the target is slowed this way, each of their allies within 5 squares of them who can make a triggered free strike against a different creature must make the free strike against the target instead.')
			]
		})
	],
	subclasses: [
		exorcist,
		oracle,
		paragon
	],
	level: 1,
	characteristics: []
};
