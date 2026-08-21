import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { CultureType } from '@/enums/culture-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { FeatureType } from '@/enums/feature-type';
import { HeroClass } from '@/models/class';
import { ItemType } from '@/enums/item-type';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { LanguageType } from '@/enums/language-type';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { PerkList } from '@/enums/perk-list';
import { ResourceGainFrequency } from '@/enums/resource-gain-frequency';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';
import { StatBlockIcon } from '@/enums/stat-block-icon';
import { TerrainCategory } from '@/enums/terrain-category';
import { TerrainRoleType } from '@/enums/terrain-role-type';
import { censor } from '@/data/classes/censor/censor';
import { elementalist } from '@/data/classes/elementalist/elementalist';
import { nullClass } from '@/data/classes/null/null';
import { shadow } from '@/data/classes/shadow/shadow';
import { tactician } from '@/data/classes/tactician/tactician';
import { talent } from '@/data/classes/talent/talent';

const thaumaturge: HeroClass = {
	id: 'class-thaumaturge',
	name: 'Thaumaturge',
	description: `
Where the Elementalist channels a substance - fire, earth, void - the Thaumaturge is defined by how and why they channel: the learned, academic magic of Vara's institutions, organised not by what it's made of but by what it's for. A Thaumaturge is a graduate of the Magisterium or the Cavendish Institute, a Sanctioner of the Dashin Hagwan, a fire-scholar of the Collegium - a person who has studied magic as a discipline and can bend it to a purpose.

Their power is broad, precise, and a little dangerous, because the surest way to cast more than you've prepared is to reach through the thinning Veil and pull - and the Veil does not always give you only what you asked for.`,
	type: 'standard',
	subclassName: 'School',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Reason ]
	],
	primaryCharacteristics: [ Characteristic.Reason ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'thaumaturge-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'thaumaturge-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'thaumaturge-resource',
					name: 'Essence',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '2',
							frequency: ResourceGainFrequency.OncePerRound,
							used: false
						},
						{
							tag: 'damage-condition',
							trigger: 'One of your magic abilities damages an enemy or imposes a condition on one',
							value: '1',
							frequency: ResourceGainFrequency.OncePerRound,
							used: false
						},
						{
							tag: 'tier3',
							trigger: 'You score a tier-3 result with an ability with the Magic keyword',
							value: '1',
							frequency: ResourceGainFrequency.AtWill,
							used: false
						}
					],
					details: `
**Overchannel.** When the prepared reserve isn't enough, a Thaumaturge reaches through the Veil for more. When you use an ability that costs Essence, you may pay part of the cost with Essence you don't have - drawing the difference straight through the Veil. Resolve the ability as though you'd paid in full. Your Essence becomes negative (to a deficit no greater than your Reason score), and before you resolve the ability you're paying for, roll on the Overchannel table.

While your Essence is negative you can't Overchannel; you climb back to positive through your normal gains.

| d10 | Effect                                                                                                                                                                                        |
|:====|:==============================================================================================================================================================================================|
| 1   | Flux. Roll again; if you get another 1, there is no effect.                                                                                                                                   |
| 2   | Burnout. Your Essence drops to -2 x your Reason.                                                                                                                                              |
| 3   | Backlash. You take damage equal to twice your Reason times your Essence debt; it can't be reduced.                                                                                            |
| 4   | Spillover. Each creature within a number of squares equal to your Essence debt (allies included) takes damage equal to twice your Reason (cold, fire, lightning, or sonic; your choice).      |
| 5   | Feedback. You are dazed until the end of your next turn.                                                                                                                                      |
| 6   | Interference. You are weakened (save ends).                                                                                                                                                   |
| 7   | Influx. A 1 cube within 5 squares becomes magic-thick difficult terrain until the end of the round; the first creature to enter it takes damage equal to your Reason times your Essence debt. |
| 8   | Flicker. You teleport to a random unoccupied square within 5.                                                                                                                                 |
| 9   | Surge. One creature the ability affected takes extra damage equal to twice your Reason; if it imposed a condition, that condition's potency was 1 higher.                                     |
| 10  | The Veil opens. Your Essence becomes 0 and you gain 1 surge, but the Director gains Malice equal to your Essence debt.                                                                        |
`,
					canBeNegative: true
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'thaumaturge-skill-magic',
					selected: [ 'Magic' ],
					count: 1
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'thaumaturge-skill-lore-crafting',
					listOptions: [ SkillList.Lore, SkillList.Crafting ],
					count: 3
				}),
				FactoryLogic.feature.createChoice({
					id: 'thaumaturge-arcane-mantle',
					name: 'Arcane Mantle',
					description: 'A self-woven enchantment. Choose one; you can change your selection during a respite.',
					selectAt: 'respite',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-mantle-scholar',
								name: 'Mantle of the Scholar',
								description: 'You can wear light armour and wield a light weapon without a kit. While you wield a light weapon you gain +1 damage with weapon abilities.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-mantle-reach',
								name: 'Mantle of Reach',
								description: 'The distance of your magic abilities increases by 2.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-mantle-quick',
								name: 'Mantle of the Quick',
								description: 'You gain +1 Speed and +1 Disengage.'
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'thaumaturge-ward',
					name: 'Thaumaturge Ward',
					description: 'An invisible defensive working. Choose one; you can change your selection during a respite.',
					selectAt: 'respite',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-ward-mirror',
								name: 'Mirror Ward',
								description: 'The first time each round you take damage from a creature, that creature takes damage equal to your Reason.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createBonus({
								id: 'thaumaturge-ward-glyph',
								name: 'Glyph Ward',
								description: 'You gain a +1 bonus to saving throws.',
								field: FeatureField.Save,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-ward-blink',
								name: 'Blink Ward',
								description: 'The first time each round you take damage, you can teleport up to a number of squares equal to your Reason.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'thaumaturge-ward-veil',
								name: 'Veil Ward',
								description: 'The first time each round you take damage, you gain 1 surge.'
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'thaumaturge-veilsight',
					name: 'Veilsight',
					description: `You see what others can't: magic auras, the residue of recent casting, and the thin places where the Veil frays.

When you encounter a magic item or phenomenon, you can read its aura: if you make a Reason (Magic) test you learn its keywords.

Once per round, when a creature within 10 squares uses an ability with the Magic keyword, you can use a triggered action to read the threads of magic: you gain an edge on your next power roll against that creature.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'thaumaturge-divination',
						name: 'Divination',
						description: 'There is no shadow you haven\'t already looked behind.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('You reveal each hidden or concealed creature.'),
							FactoryLogic.createAbilitySectionSpend({
								value: 1,
								effect: 'You learn one immunity or weakness of each creature you sense.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'thaumaturge-arcane-bolt',
						name: 'Arcane Bolt',
						description: 'A bolt of raw, shaped magic.',
						type: FactoryLogic.type.createMain({ freeStrike: true }),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: '2 + R damage',
								tier2: '5 + R damage',
								tier3: '7 + R damage'
							})),
							FactoryLogic.createAbilitySectionText('Choose an energy type (acid, cold, fire, lightning, poison, or sonic); the ability deals that type. Usable as a ranged free strike.'),
							FactoryLogic.createAbilitySectionPackage('arcane-bolt')
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-1-ability-3',
					cost: 3,
					count: 1
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-1-ability-5',
					cost: 5,
					count: 1
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'thaumaturge-versatile-caster',
					name: 'Versatile Caster',
					description: 'Once per encounter, as a main action, you can swap out one known heroic ability for another.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'thaumaturge-2-perk',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-3-ability-7',
					cost: 7,
					count: 1
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'thaumaturge-font-of-essence-1',
					name: 'Font of Essence',
					tag: 'damage-condition',
					trigger: 'One of your magic abilities damages an enemy or imposes a condition on one',
					value: '2',
					frequency: ResourceGainFrequency.OncePerRound,
					replacesTags: [ 'damage-condition' ]
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'thaumaturge-font-of-essence-2',
					name: 'Font of Essence',
					tag: 'tier3',
					trigger: 'You score a tier-3 result with an ability with the Magic keyword',
					value: '2',
					frequency: ResourceGainFrequency.AtWill,
					replacesTags: [ 'tier3' ]
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'thaumaturge-4-reason',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'thaumaturge-4-characteristic',
					name: 'Characteristic Increase',
					description: '+1 to any one characteristic other than Reason.',
					options: [
						{ feature: FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-4-might', characteristic: Characteristic.Might, value: 1 }), value: 1 },
						{ feature: FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-4-agility', characteristic: Characteristic.Agility, value: 1 }), value: 1 },
						{ feature: FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-4-intuition', characteristic: Characteristic.Intuition, value: 1 }), value: 1 },
						{ feature: FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-4-presence', characteristic: Characteristic.Presence, value: 1 }), value: 1 }
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'thaumaturge-4-skill',
					count: 1
				}),
				FactoryLogic.feature.createPerk({
					id: 'thaumaturge-4-perk',
					count: 1
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-5-ability-9',
					cost: 9,
					count: 1
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.create({
					id: 'thaumaturge-greater-overchannel',
					name: 'Greater Overchannel',
					description: 'Your reach through the Veil deepens: your Overchannel deficit can now run as deep as your Reason score + 2, and once per encounter you may Overchannel without rolling on the Overchannel table - a single, perfectly controlled draw.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'thaumaturge-6-perk',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'thaumaturge-improved-essence',
					name: 'Improved Essence',
					tag: 'start',
					trigger: 'Start of your turn',
					value: '3',
					frequency: ResourceGainFrequency.OncePerRound,
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-might', characteristic: Characteristic.Might, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-agility', characteristic: Characteristic.Agility, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-reason', characteristic: Characteristic.Reason, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-intuition', characteristic: Characteristic.Intuition, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-7-presence', characteristic: Characteristic.Presence, value: 1 }),
				FactoryLogic.feature.createSkillChoice({
					id: 'thaumaturge-7-skill',
					count: 1
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'thaumaturge-8-perk',
					count: 1
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'thaumaturge-8-ability-11',
					cost: 11,
					count: 1
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'thaumaturge-unfettered-casting',
					name: 'Unfettered Casting',
					description: 'Once per encounter, you can use an ability of 9 Essence or less without paying its cost. The working simply comes, drawn through a Veil that, this deep into your study, barely resists you anymore.'
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.create({
					id: 'thaumaturge-master-of-the-veil',
					name: 'Master of the Veil',
					description: 'When you Overchannel, your Essence deficit has no limit - you have mastered the draw that destroys lesser casters.'
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'thaumaturge-epic-resource',
					name: 'Aegis',
					type: 'epic',
					gains: [
						{
							tag: 'respite',
							trigger: 'You finish a respite',
							value: 'the XP you earned',
							frequency: ResourceGainFrequency.AtWill,
							used: false
						}
					],
					details: 'You can spend Aegis as though it were Essence, and you can spend Aegis to use any heroic ability as a free maneuver if you pay that spell\'s whole cost in Aegis.'
				}),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-might', characteristic: Characteristic.Might, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-agility', characteristic: Characteristic.Agility, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-reason', characteristic: Characteristic.Reason, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-intuition', characteristic: Characteristic.Intuition, value: 1 }),
				FactoryLogic.feature.createCharacteristicBonus({ id: 'thaumaturge-10-presence', characteristic: Characteristic.Presence, value: 1 }),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'thaumaturge-surging-essence',
					name: 'Surging Essence',
					tag: 'start',
					trigger: 'Start of your turn',
					value: '4',
					frequency: ResourceGainFrequency.OncePerRound,
					replacesTags: [ 'start' ]
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'thaum-arcane-barrage',
			name: 'Arcane Barrage',
			description: 'An initiate’s first area working: pick a flavour, fill a space.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each creature in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '3 + R damage',
					tier2: '5 + R damage',
					tier3: '8 + R damage'
				})),
				FactoryLogic.createAbilitySectionText('This ability can deal your choice of cold, fire, lightning, or sonic damage.'),
				FactoryLogic.createAbilitySectionSpend({
					value: 1,
					effect: 'Enlarge the cube by 1.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-force-dart',
			name: 'Force Dart',
			description: 'A small, exact unkindness, repeated as often as you please.',
			type: FactoryLogic.type.createMain({ freeStrike: true }),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One enemy',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '3 + R damage',
					tier2: '6 + R damage',
					tier3: '8 + R damage; slide 1'
				})),
				FactoryLogic.createAbilitySectionText('This ability deals double damage to objects. Spend 1+: You deal additional damage equal to your Reason for each point you spend.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-shatterforce',
			name: 'Shatterforce',
			description: 'Force, with the manners filed off.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '7 + R damage',
					tier2: '11 + R damage; push 2',
					tier3: '15 + R damage; push 3 and prone'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-levinbolt',
			name: 'Levinbolt',
			description: 'Straight there. Electricity has never once taken the scenic route.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1 }) ],
			target: 'Each creature in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '6 + R lightning damage',
					tier2: '9 + R lightning damage',
					tier3: '12 + R lightning damage'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-arc',
			name: 'Arc',
			description: 'It does not stop at one, and rarely stops where you would like it to.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '6 + R lightning damage',
					tier2: '10 + R lightning damage; repeat this ability, targeting a different creature within 1 of the target',
					tier3: '14 + R lightning damage; repeat this ability, targeting a different creature within 3 of the target'
				})),
				FactoryLogic.createAbilitySectionText('This ability keeps jumping between targets until a tier 1 result is reached. It can’t jump back to a target it has already hit.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-dissolution',
			name: 'Dissolution',
			description: 'What this unmakes does not return.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '10 + R corruption damage',
					tier2: '14 + R corruption damage',
					tier3: '18 + R corruption damage'
				})),
				FactoryLogic.createAbilitySectionText('A creature killed by this spell is destroyed and cannot be restored to life by anything short of an artifact.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-devastation',
			name: 'Devastation',
			description: 'The point where a working stops being a tool and becomes weather.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
			target: 'Each creature in the area',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '10 + R damage',
					tier2: '15 + R damage; prone',
					tier3: '20 + R damage; prone; slowed (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-collapsing-sphere',
			name: 'Collapsing Sphere',
			description: 'A pocket of space folds shut, and disagrees with anything still inside it.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each creature in the area',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '5 + R damage; M<w restrained (save ends)',
					tier2: '8 + R damage; M<v restrained (save ends)',
					tier3: '11 + R damage; M<s restrained (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('Until the start of your next turn the area is difficult terrain, and a restrained creature takes R damage at the start of its turn as the sphere tightens.'),
				FactoryLogic.createAbilitySectionSpend({
					value: 1,
					effect: 'The sphere also pulls each creature in the area 2 squares toward its centre.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-starfall',
			name: 'Starfall',
			description: 'You call down the ceiling of the world, in pieces, by appointment.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createSpecial('Three 3 bursts, each within 10') ],
			target: 'Each creature in the area',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '12 fire damage',
					tier2: '16 fire damage; prone',
					tier3: '20 fire damage; prone'
				})),
				FactoryLogic.createAbilitySectionText('A creature in more than one burst is affected only once. Each burst\'s area burns until the start of your next turn: a creature that enters the area or starts its turn there takes R fire damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'thaum-unmake',
			name: 'Unmake',
			description: 'The working with no lesser version: there is what it touches, and then what used to be there.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('The target makes a Might test:'),
				FactoryLogic.createAbilitySectionText('11 or lower: A leader, elite, or solo takes 20 damage and is dazed (save ends). Any other creature is destroyed and removed from the encounter  12-16: 15 damage; dazed (EoT)  17+: 10 damage')
			]
		})
	],
	subclasses: [
		{
			id: 'thaumaturge-school-cavendish',
			name: 'The Cavendish Institute',
			description: 'The Augur fights a battle they\'ve already watched. The Cavendish Institute, in Serne, trains them to read the threads of what-will-be. An Augur knows where the blade falls and whose nerve breaks, and spends that knowledge like coin.',
			classID: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'cavendish-arcane-bolt',
							name: 'Inevitable Bolt',
							description: 'Your Arcane Bolt ignores cover and concealment, and can target a creature you can\'t see whose location you know.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'cavendish-skill', selected: [ 'Read Person' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'cavendish-auguries',
							name: 'Auguries',
							description: 'You have a pool of Auguries equal to your Reason, which refreshes at the start of each encounter. As a free triggered action, you can spend one Augury to add an edge or a bane to a power roll made by a creature within 10.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'cavendish-signature',
								name: 'Hex of Misfortune',
								description: 'Misfortune is only foresight pointed the wrong way.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One creature',
								sections: [
									FactoryLogic.createAbilitySectionText('The target takes a bane on its next power roll.'),
									FactoryLogic.createAbilitySectionSpend({
										value: 1,
										effect: 'The target takes a bane on all power rolls (save ends).'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'cavendish-forewarning',
								name: 'Forewarning',
								description: 'You saw the blow a heartbeat early - and told them where not to be standing.',
								type: FactoryLogic.type.createTrigger('An ally within 10 squares is targeted by a strike'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One ally',
								sections: [
									FactoryLogic.createAbilitySectionText('Before the strike\'s power roll is made, the target shifts 1 square. If this shift carries them out of the strike\'s distance or area, the strike fails.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'cavendish-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'cavendish-precognition',
						name: 'Precognition',
						description: 'Once each round, when an enemy makes a strike against you or an ally within 10, you can spend an Augury to reduce the result of the power roll by one tier.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'cavendish-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'cavendish-read-the-auguries',
						name: 'Read the Auguries',
						description: 'When you Overchannel, you can spend an Augury to roll on the Overchannel Table twice and choose which result applies.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'cavendish-i-have-seen-how-this-ends',
						name: 'I Have Seen How This Ends',
						description: 'Once per encounter, before a power roll is made (by you, an ally, or the Director), you can declare that the roll is made with either a double edge or a double bane (your choice).'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'cavendish-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'cavendish-jinx',
					name: 'Jinx',
					description: 'Every Augur learns the small unmakings first: a stumble, a slipped grip, a sword a finger\'s width wide.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One enemy',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes a bane on its next power roll.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 2,
							effect: 'The target also can\'t achieve a tier 3 result on that roll.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-lend-foresight',
					name: 'Lend Foresight',
					description: 'You see the whole exchange a breath before it happens.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target has an edge on all power rolls and can\'t be surprised. The first time they would roll a tier 1 outcome during this time, they reroll and use the new result.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-foreseen-demise',
					name: 'Foreseen Demise',
					description: 'You have read the last page. Now you simply wait for the book to reach it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('You mark the target (save ends). While it is marked, you and your allies deal extra damage equal to your Reason against it, and at the start of the target\'s turn you learn what action it intends to take that turn.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-premonition',
					name: 'Premonition',
					description: 'You hand them a page from a book that is yet to be written.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
					target: 'Each ally in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, each affected ally gains an edge on their next power roll, and the first time each is targeted by a strike they may shift 1 as a free triggered action.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'Grant each ally 1 Augury, which lasts until the end of the encounter.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-rewrite-the-moment',
					name: 'Rewrite the Moment',
					description: 'Your mind, full of quantum certainty, sees multiple futures and insists upon the path that history takes.',
					type: FactoryLogic.type.createTrigger('An enemy within 10 squares makes a power roll'),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('The triggering creature rerolls the power roll; you choose which result to use.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-sever-the-thread',
					name: 'Sever the Thread',
					description: 'Snip. The thread that would have been its next clever move - gone.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('You cut the target loose from what comes next. In the next round it takes its turn last, after all other creatures, and it can\'t take triggered actions until then (save ends).')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-foretold-end',
					name: 'Foretold End',
					description: 'You do not threaten; you explain, kindly, what is already true.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The target takes 11 + three times your Reason damage, which can\'t be reduced, and is weakened (save ends). If the target is marked by your Foreseen Demise, the prophecy closes: this damage also can\'t be reduced by temporary Stamina, and if it leaves the target winded or lower, the target is dying.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-stolen-moment',
					name: 'Stolen Moment',
					description: 'You spend a friend\'s next turn early, while it is still worth spending.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The target immediately takes a full turn (move + main action), then can\'t act on their own next turn.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-foregone-conclusion',
					name: 'Foregone Conclusion',
					description: 'You do not predict the round. You file it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionText('Choose allies or enemies. Until the end of your next turn, the first power roll each chosen creature makes gains a double edge (if you chose allies) or a double bane (if you chose enemies). A creature can be affected by only one Foregone Conclusion at a time.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'cavendish-the-last-page',
					name: 'The Last Page',
					description: 'You read it its ending, gently, and then simply wait.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '8 + R damage; I<w the target cannot achieve a tier 3 result on a power roll (save ends)',
							tier2: '12 + R damage; I<v the target cannot achieve a tier 3 result on a power roll (save ends)',
							tier3: '16 + R damage; I<s the target can only achieve a tier 1 result on a power roll (save ends)'
						})),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'If the target is marked by your Foreseen Demise, it can\'t roll to end this effect on its first attempt.'
						})
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-collegium',
			name: 'The Collegium',
			description: 'Where another school finesses, the Sunderer unmakes: lines of flame, bursts of force, the spell that ends the argument. They were born to Overchannel, and the Veil knows it.',
			classID: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'collegium-arcane-bolt',
							name: 'Destructive Bolt',
							description: 'Your Arcane Bolt bypasses damage immunity, and does double damage to objects.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'collegium-skill', selected: [ 'Alchemy' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'collegium-ruinous-channeling',
							name: 'Ruinous Channeling',
							description: 'Your magic abilities that affect an area deal additional damage equal to your Reason. When you Overchannel an area ability, that bonus damage doubles.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'collegium-signature',
								name: 'Scorch Line',
								description: 'One stroke of the pen, and everything along it becomes a footnote.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 1 }) ],
								target: 'Each creature in the area',
								sections: [
									FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
										characteristic: Characteristic.Reason,
										tier1: '4 + R fire damage',
										tier2: '6 + R fire damage',
										tier3: '9 + R fire damage'
									})),
									FactoryLogic.createAbilitySectionSpend({
										value: 1,
										effect: 'The line becomes 8x1.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'collegium-backlash',
								name: 'Backlash',
								description: 'Touch the fire and the fire answers.',
								type: FactoryLogic.type.createTrigger('An enemy hits you with a strike'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
								distance: [ FactoryLogic.distance.createMelee(1) ],
								target: 'The attacker',
								sections: [
									FactoryLogic.createAbilitySectionText('The triggering enemy takes fire or force damage equal to twice your Reason.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'collegium-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'collegium-chain-reaction',
						name: 'Chain Reaction',
						description: 'When you reduce one or more enemies to 0 Stamina with a magic ability, each enemy within 2 of one of them takes fire damage equal to twice your Reason, and you regain 2 Essence.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'collegium-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'collegium-unburnt',
						name: 'Unburnt',
						description: 'You can choose to exclude yourself and your allies from the area of effect of any ability you use that has the Area and Magic keywords.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'collegium-annihilation',
						name: 'Annihilation',
						description: 'Once per encounter, when you use an area magic ability, you can have it deal maximum damage to every enemy in the area instead of rolling, and enlarge the area by 2.'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'collegium-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'collegium-scorch-line',
					name: 'Scorch Line',
					description: 'One stroke of the pen, and everything along it becomes a footnote.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 1 }) ],
					target: 'Each creature in the area',
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '4 + R fire damage',
							tier2: '6 + R fire damage',
							tier3: '9 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'The line becomes 8x1.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-flame-cone',
					name: 'Flame Cone',
					description: 'The cheapest argument the Collegium knows.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3 }) ],
					target: 'Each creature in the area',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '3 + R fire damage',
							tier2: '5 + R fire damage',
							tier3: '7 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionText('The cube burns, until the end of the round (difficult terrain).')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-force-lance',
					name: 'Force Lance',
					description: 'Just blunt force, delivered at distance. Not everything has to be complicated.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '4 + R damage',
							tier2: '7 + R damage; push 2',
							tier3: '10 + R damage; push 2 and the target is knocked prone'
						}))
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-concussive-burst',
					name: 'Concussive Burst',
					description: 'Less a spell than a shove the entire room agrees to feel.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'Each creature in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '5 + R damage; push 1',
							tier2: '8 + R damage; push 2',
							tier3: '11 + R damage; push 2 and prone'
						}))
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-cinderburn',
					name: 'Cinderburn',
					description: 'A small sun, briefly, and the coals it leaves to make the point.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '6 + R fire damage',
							tier2: '9 + R fire damage',
							tier3: '12 + R fire damage;'
						})),
						FactoryLogic.createAbilitySectionText('The area becomes a burning field until the end of your next turn: it is difficult terrain, and a creature that enters or starts its turn there takes R fire damage.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 3,
							effect: 'The burning field lasts until the end of the encounter instead.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-fulmination',
					name: 'Fulmination',
					description: 'The air picks a side, and it is not theirs.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
					target: 'Each creature in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '7 + R lightning damage',
							tier2: '10 + R lightning damage',
							tier3: '13 + R lightning damage'
						})),
						FactoryLogic.createAbilitySectionText('The area becomes difficult, crackling terrain until the end of the round.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-firestorm',
					name: 'Firestorm',
					description: 'The argument, sustained.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '6 + R fire damage',
							tier2: '9 + R fire damage',
							tier3: '12 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionText('The area becomes a firestorm until the end of your next turn: difficult terrain, and any creature takes fire damage equal to your Reason when it enters the area or starts its turn there.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-annihilating-beam',
					name: 'Annihilating Beam',
					description: 'One line, drawn through everything that was in the way.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 12, value2: 1 }) ],
					target: 'Each creature in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '9 + R fire damage',
							tier2: '13 + R fire damage',
							tier3: '17 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionText('The beam ignores cover and destroys mundane objects, barriers, and difficult terrain in its path.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-cataclysmic-working',
					name: 'Cataclysmic Working',
					description: 'Wild magic explodes from you.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
					target: 'The area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The area becomes a field of wild magic. Any creature who enters or starts their turn in the area must roll on the Overchannel table.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-cataclysm',
					name: 'Cataclysm',
					description: 'The argument the Institute warns you never to make twice.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 6 }) ],
					target: 'Each creature in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '10 + R fire damage',
							tier2: '15 + R fire damage',
							tier3: '20 + R fire damage'
						})),
						FactoryLogic.createAbilitySectionText('Each target is bleeding (save ends).')
					]
				}),
				FactoryLogic.createAbility({
					id: 'collegium-ruin',
					name: 'RUIN',
					description: 'The last thing the Collegium teaches, and the only lesson no one forgets.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '10 + R fire damage; prone',
							tier2: '16 + R fire damage; prone',
							tier3: '22 + R fire damage; prone'
						})),
						FactoryLogic.createAbilitySectionText('If you Overchannelled this turn, for each point of Essence you are in debt increase the burst size by 1 and add R damage. This damage can\'t be reduced by temporary Stamina.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 3,
							effect: 'The area becomes burning difficult terrain until the end of the encounter. Any creature entering or starting their turn in the area suffers 5 x R fire damage.'
						})
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-dashin-hagwan',
			name: 'The Dashin Hagwan',
			description: 'The Sanctioner doesn\'t out-burn the enemy mage; they make the enemy mage irrelevant. Schooled in Bashra\'s halls of shields, they raise wards, turn workings aside, and keep the soldier next to them alive.',
			classID: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'dashin-arcane-bolt',
							name: 'Warding Bolt',
							description: 'When your Arcane Bolt damages a creature, you or an ally within 5 gains temporary Stamina equal to your Reason.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'dashin-skill', selected: [ 'Alertness' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'dashin-sheltering-ward',
							name: 'Sheltering Ward',
							description: 'As a maneuver, choose yourself or an ally within 10. Until the start of your next turn, the target reduces all damage it takes by an amount equal to your Reason and gains a +2 bonus to saving throws. Spend 1 Essence to extend this to every ally within 3 of the target.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'dashin-signature',
								name: 'Shieldwall',
								description: 'Bashra\'s oldest promise: no one who stands in this line stands alone.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One ally',
								sections: [
									FactoryLogic.createAbilitySectionText('The target gains temporary Stamina equal to twice your Reason.')
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'dashin-interpose',
								name: 'Interpose',
								description: 'A ward flung sideways, faster than thought.',
								type: FactoryLogic.type.createTrigger('An ally within 10 squares takes damage'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One ally',
								sections: [
									FactoryLogic.createAbilitySectionText('Reduce that damage by twice your Reason.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'dashin-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'dashin-dispelling-hand',
						name: 'Dispelling Hand',
						description: 'When a creature within 10 uses a magic ability, you can use a triggered action and spend 3 Essence to reduce that ability\'s potency by 1 and its damage by twice your Reason. If the ability would create a lasting effect, aura, or summon, it instead lasts only until the end of the round.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'dashin-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'dashin-warded-overchanneling',
						name: 'Warded Overchanneling',
						description: 'When you would take damage as a result of Overchanneling, you take no damage.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'dashin-unbreached-ground',
						name: 'Unbreached Ground',
						description: 'As a main action, spend 7 Essence to raise a sanctum in a 5 burst around you until the end of the encounter or until you leave it. Allies inside reduce magic damage by your Reason and can\'t be subjected to conditions by magic abilities; enemies inside take a bane on magic abilities and have their magic potencies reduced by 1.'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'dashin-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'dashin-ward',
					name: 'Ward',
					description: 'The air in front of you refuses to accept the strike.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createSelf(), FactoryLogic.distance.createRanged(10) ],
					target: 'Self or one ally',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('The target gains temporary Stamina equal to three times your Reason. Spend 3+: For every 3 points you spend, you can target an additional ally.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-reflect',
					name: 'Reflect',
					description: 'The first lesson of Bashra: a working turned aside is a working turned around.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the first time a creature hits you with a magic ability, you halve the damage you take and the creature takes damage equal to twice your Reason of the same type.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-unmaking',
					name: 'Unmaking',
					description: 'Whatever they called up, you send politely back where it came from.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature or magical effect',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('End one magic effect or aura on the target or in the area, and deal 2 × Reason damage to any summoned or conjured creature there.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-unweave',
					name: 'Unweave',
					description: 'You find the loose end of their working and pull - gently, at the worst possible moment.',
					type: FactoryLogic.type.createTrigger('The target uses a magic ability'),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Reduce the damage of the target’s ability by your Reason, and its potency by 2.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-aegis-of-the-line',
					name: 'Aegis of the Line',
					description: 'One ward, stretched thin across the whole line, somehow holding.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'Self and each ally',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the first time any target would take damage, that damage is reduced by an amount equal to twice your Reason.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-retributive-aegis',
					name: 'Retributive Aegis',
					description: 'Bashra\'s line does not merely hold. It answers.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3, within: 10 }) ],
					target: 'Each ally in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, each affected ally reduces all damage it takes by R, and any creature that hits a target with a strike takes force damage equal to 2 × R.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 3,
							effect: 'The first time each target would be reduced to winded, it is instead left at 1 above winded.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-last-bastion',
					name: 'Last Bastion',
					description: 'Not today. The ward decides that on their behalf.',
					type: FactoryLogic.type.createTrigger('An ally within 10 would be reduced to 0 Stamina'),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The ally instead drops to 1 Stamina and gains temporary Stamina equal to 3 × your Reason.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-greater-ward',
					name: 'Greater Ward',
					description: 'For one held breath, the war agrees to leave you out of it.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(5) ],
					target: 'Self and each ally',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target gains damage immunity equal to your Reason and can\'t be subjected to conditions by magic abilities.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-sever-the-weave',
					name: 'Sever the Weave',
					description: 'One clean cut, drawn across everything holding the moment together.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '8 + R damage',
							tier2: '12 + R damage; dazed (EoT)',
							tier3: '16 + R damage; dazed (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('Any aura or ongoing magical effect within the area is ended. Any summoned creature within the area is unsummoned.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'dashin-inviolate',
					name: 'Inviolate',
					description: '“No”.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
					target: 'Each ally in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the end of your next turn, the target can\'t be reduced below 1 Stamina, and can\'t be subjected to conditions or forced movement by magic or psionic abilities.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 3,
							effect: 'Each target can also end one condition currently affecting them.'
						})
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-ginnhall',
			name: 'The Ginnhall',
			description: 'Valhaven\'s Ginnhall teaches the charm and the lie as a single craft, and graduates the Gardeners into the shadows. The Beguiler turns enemies into doubts and the field into a hall of mirrors: minds bent one way, eyes sent another.',
			classID: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'ginnhall-arcane-bolt',
							name: 'Maddening Bolt',
							description: 'Your Arcane Bolt can deal psychic damage instead of its usual type; when it does, on a tier 2+ the target can\'t make opportunity attacks until the end of its next turn, and on a tier 3 it is dazed (save ends).',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'ginnhall-skill', selected: [ 'Lie' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'ginnhall-mirror',
							name: 'Mirror',
							description: 'As a maneuver, spend 1 Essence and choose an enemy within 10. It is charmed until the end of your next turn - while charmed, it can\'t include you or your allies as targets of its abilities. The charm ends early if the target takes damage.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'ginnhall-signature',
								name: 'Honeyed Word',
								description: 'Not a command - a suggestion, offered sweetly enough that they decide to keep it.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One creature',
								sections: [
									FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
										characteristic: Characteristic.Reason,
										tier1: '2 psychic damage; R<w charmed (EoT)',
										tier2: '3 psychic damage; R<v charmed (EoT)',
										tier3: '5 psychic damage; R<s charmed (EoT)'
									})),
									FactoryLogic.createAbilitySectionText('While the target is charmed, it cannot include you as a target of its abilities.')
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'ginnhall-phantom-step',
								name: 'Phantom Step',
								description: 'You were never quite where the blade went.',
								type: FactoryLogic.type.createTrigger('An enemy targets you with a strike'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('An illusory double takes your place: the attacker takes a bane on the strike, and you shift 1 square.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'ginnhall-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'ginnhall-domination',
						name: 'Domination',
						description: 'As a main action, spend 5 Essence and choose a charmed or frightened enemy within 10. It is dominated (EoT): you direct one action it takes on its next turn - a strike, a move, or a signature ability. You cannot direct it to spend Malice.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'ginnhall-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'ginnhall-cloud-the-mind',
						name: 'Cloud the Mind',
						description: 'When you Overchannel, you gain concealment until the start of your next turn.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'ginnhall-hall-of-mirrors',
						name: 'Hall of Mirrors',
						description: 'As a main action, spend 7 Essence to fill a 5 burst with phantasms until the start of your next turn. Enemies inside treat all creatures (including allies) as concealed and can\'t tell illusions from the real, taking a bane on all strikes; your allies ignore the effect.'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'ginnhall-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'ginnhall-beguiling-whisper',
					name: 'Beguiling Whisper',
					description: 'A certain word, briefly. The doubt comes later.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('The target is charmed until the end of your next turn - while charmed, it can\'t include you or your allies as targets of its abilities. The charm ends early if the target takes damage.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-blur',
					name: 'Blur',
					description: 'The edges of you stop agreeing on where you are.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createSelf(), FactoryLogic.distance.createRanged(10) ],
					target: 'Self or one ally',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target gains concealment, and the first time each round a creature strikes the target, that creature takes a bane on the power roll.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'When an attacker makes a strike against the target, the attacker takes psychic damage equal to R.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-wave-of-fear',
					name: 'Wave of Fear',
					description: 'Something they had kept carefully folded away, unfolded all at once.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'Each enemy in the area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'P < [weak] frightened (EoT)',
								tier2: 'P < [average] frightened (save ends)',
								tier3: 'P < [strong] frightened (save ends), and the target must move away from you on its next turn'
							})
						)
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-fracture',
					name: 'Fracture',
					description: 'One hairline crack, run all the way down the middle of a mind.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '4 + R psychic damage; I < [weak] dazed (EoT)',
							tier2: '6 + R psychic damage; I < [average] dazed (save ends)',
							tier3: '9 + R psychic damage; I < [strong] dazed (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('While dazed in this way, the target treats one creature of your choice as its enemy.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'The target cannot make opportunity attacks while dazed.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-pandemonium',
					name: 'Pandemonium',
					description: 'The Ginnhall’s unkindest trick: not a lie about them, but a lie about everyone they trust.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'I < [weak] dazed (EoT)',
								tier2: 'I < [average] dazed (EoT)',
								tier3: 'I < [strong] dazed (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('On a tier 2 or 3 result, the target perceives its allies as enemies - on its turn, you can have it use its action to make a strike against the nearest creature of your choice.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-seize-the-mind',
					name: 'Seize the Mind',
					description: 'You don\'t persuade. You move in and rearrange the furniture.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'I < [weak] dazed (save ends)',
								tier2: 'I < [average] dominated (EoT)',
								tier3: 'I < [strong] dominated (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('While the target is dominated, you spend its actions as your own. You cannot direct it to spend Malice. This ability cannot target leaders, elites, or solos.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-the-puppet-court',
					name: 'The Puppet Court',
					description: 'You bow and the court bows back, because you are holding all their strings now.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'Up to three creatures',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: 'R<w charmed (save ends)',
							tier2: 'R<v dominated (EoT)',
							tier3: 'R<s dominated (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('You direct each dominated target\'s action and move on its turn. You cannot direct a target to spend Malice. While charmed, a target can\'t include you or your allies as targets of its abilities. Spend 3+: The ability targets an additional creature for each additional 3 essence spent.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-hall-of-nightmares',
					name: 'Hall of Nightmares',
					description: 'Norrstup\'s cruellest classroom: a room that shows each person the thing they brought in with them.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'The area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('You raise a persistent illusion until the end of the encounter. While an enemy is in the area it is frightened (P<v, save ends) and perceives its allies as enemies. An enemy that enters or starts its turn in the area is subjected to this effect anew.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'The first time each enemy fails a save here, it also takes psychic damage equal to 2 × R.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-the-whole-world-lies',
					name: 'The Whole World Lies',
					description: 'The Ginnhall’s masterwork: not one lie, but every eye in the room told a different one.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Each enemy in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: 'P<w the target is either charmed or frightened (its choice) (save ends)',
							tier2: 'P<v the target is either charmed or frightened (its choice) (save ends)',
							tier3: 'P<s the target is either charmed or frightened (its choice) (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('If charmed, a target can\'t include you or your allies as targets. A leader, elite, or solo gains a +2 bonus to saving throws to end this effect.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'A creature that saves is then dazed until the end of its next turn.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'ginnhall-usurp',
					name: 'Usurp',
					description: 'You do not borrow the hand; you move into the house.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: 'R<[weak] dominated (EoT)',
							tier2: 'R<[average] dominated (save ends)',
							tier3: 'R<[strong] dominated (save ends), and immediately on taking control you compel the target to use a signature ability against a creature of your choice.'
						})),
						FactoryLogic.createAbilitySectionText('While the target is dominated, you spend its actions as your own. You cannot direct it to spend Malice. A leader, elite, or solo gains a +2 bonus to saving throws to end this effect.')
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-hetaeria-occulta',
			name: 'The Hetaeria Occulta',
			description: 'The thing the orthodox fear most. A Gatecaller opens ways and calls things through - and in a world whose apocalypse is precisely things coming through the Veil, that is not a comfortable gift. They conjure walls and blades out of empty air, and step across distance as if it were a courtesy.',
			classID: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'hetaeria-arcane-bolt',
							name: 'Conjured Bolt',
							description: 'Your Arcane Bolt opens gateways; on a tier 3, you can teleport the target up to 5 squares.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'hetaeria-skill', selected: [ 'Timescape' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'hetaeria-open-the-gate',
							name: 'Open the Gate',
							description: 'As a maneuver, conjure a gate in an unoccupied square within 10 (it persists until the end of the encounter). You can have multiple gates active. Step Through: as a maneuver, teleport yourself or an ally within 10 squares of you to a square adjacent to a gate, or teleport an enemy adjacent to a gate up to 3 squares.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'hetaeria-signature',
								name: 'Bound Blade',
								description: 'You reach into the empty air, and find a hilt already waiting.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createMelee(1) ],
								target: 'One creature or object',
								sections: [
									FactoryLogic.createAbilitySectionText('You conjure a weapon and teleport up to 3 squares, then make a power roll.'),
									FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
										characteristic: Characteristic.Reason,
										tier1: '2 + R damage',
										tier2: '4 + R damage',
										tier3: '6 + R damage'
									})),
									FactoryLogic.createAbilitySectionSpend({
										value: 1,
										effect: 'Your next weapon strike this turn deals an extra 2 x Reason damage and can be made at Ranged 5.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'hetaeria-sidestep',
								name: 'Sidestep',
								description: 'The square you were standing in was only ever a suggestion.',
								type: FactoryLogic.type.createTrigger('You or an ally within 5 squares takes damage'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(5) ],
								target: 'You or one ally',
								sections: [
									FactoryLogic.createAbilitySectionText('Teleport the target up to a number of squares equal to your Reason.')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'hetaeria-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'hetaeria-open-the-way',
						name: 'Open the Way',
						description: 'As a maneuver, spend 3 Essence to teleport yourself and each ally within 5 up to a number of squares equal to twice your Reason. As a triggered action, you can spend 1 Essence to teleport an ally up to your Reason when they would take damage.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'hetaeria-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'hetaeria-waygate',
						name: 'Waygate',
						description: 'When you Overchannel, you can immediately teleport up to your speed and make a free strike.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'hetaeria-breach',
						name: 'Breach',
						description: 'As a main action, spend 7 Essence to tear a gate and banish a non-leader, non-solo enemy within 10 (save ends - while banished it is removed from the encounter, returning dazed in the space it left).'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'hetaeria-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'hetaeria-displace',
					name: 'Displace',
					description: 'You ensure that this place no longer concerns your foe.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One enemy',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('The target makes a Might test:'),
						FactoryLogic.createAbilitySectionText('11 or lower: The target is teleported up to twice your Reason  12-16: The target is teleported up to your Reason  17+: No effect')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-glimmerstep',
					name: 'Glimmerstep',
					description: 'You were there. Precisely where you are now is left as an exercise for the reader.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(5) ],
					target: 'One creature',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('You swap places with the target.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'You can also teleport one adjacent creature; it must end adjacent to you.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-conjured-barrier',
					name: 'Conjured Barrier',
					description: 'A wall that was not there, and a breath ago did not need to be.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 10 }) ],
					target: 'The area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Conjure a wall up to 5 squares long that blocks movement until the end of your next turn.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 2,
							effect: 'The wall also blocks line of effect.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-veilrend',
					name: 'Veilrend',
					description: 'You tear a little, and the world does not sit flat again for some time.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
					target: 'The area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '6 + R damage',
							tier2: '10 + R damage',
							tier3: '14 + R damage'
						})),
						FactoryLogic.createAbilitySectionText('The area becomes difficult terrain until the end of the encounter,')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-forced-translocation',
					name: 'Forced Translocation',
					description: 'You gather them up like chess pieces and set them down somewhere worse.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Each enemy makes a Might test:'),
						FactoryLogic.createAbilitySectionText('11 or lower: The target is teleported up to twice your Reason, and takes R force damage  12-16: The target is teleported up to your Reason  17+: No effect')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-phase',
					name: 'Phase',
					description: 'Walls become, briefly, a matter of opinion - and you disagree with them.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(3) ],
					target: 'Self and each ally',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target can move through creatures and objects and ignore difficult terrain.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-the-drawing-gyre',
					name: 'The Drawing Gyre',
					description: 'A small hunger opens in the air, and everything begins to lean toward it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each creature in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The spell creates an area of storm which lasts until the end of your next turn; each creature who enters or starts their turn in the area must make a Might test:'),
						FactoryLogic.createAbilitySectionText('11 or lower: 12 damage; pull 4 toward the centre of the area  12-16: 7 damage; pull 2 toward the centre of the area  17+: 4 damage'),
						FactoryLogic.createAbilitySectionField({
							name: 'Special',
							effect: 'As a manoeuvre on your next turn, you can spend 3 essence to maintain the gyre for an additional round.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-the-yawning-gate',
					name: 'The Yawning Gate',
					description: 'You open the very thing they are all afraid of.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'M<w slide 3 toward the rift\'s centre',
								tier2: 'M<v banished (EoT)',
								tier3: 'M<s banished (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('A banished creature is removed from the encounter, returning dazed in the space it left when the effect ends. The rift remains until the end of the encounter: its area is difficult terrain, and an enemy that enters it takes force damage equal to twice your Reason.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-the-long-fall',
					name: 'The Long Fall',
					description: 'You open up the bottom of the world, and are very precise about who stands over it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5, within: 10 }) ],
					target: 'Each enemy in the area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'M<w banished (EoT)',
								tier2: 'M<v banished (save ends)',
								tier3: 'M<s banished (save ends), and each time the target fails the saving throw it takes damage equal to twice your Reason as it falls'
							})
						),
						FactoryLogic.createAbilitySectionText('A banished creature is removed from the encounter and returns prone in the space it left when the effect ends. A leader, elite, or solo gains a +2 bonus to saving throws to end this effect.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'hetaeria-fold-space',
					name: 'Fold Space',
					description: 'A Gatecaller\'s final victory over geography.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'Special',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionText('You may swap the positions of any number of pairs of creatures within the area, then place a number of gates equal to your Reason in unoccupied squares in the area.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 5,
							effect: 'Each enemy you moved this way takes force damage equal to 2 × R on arrival.'
						})
					]
				})
			],
			selected: false
		},
		{
			id: 'thaumaturge-school-magisterium',
			name: 'The Magisterium',
			description: 'Icewell\'s Magisterium refines aether and reshapes the world. The Shaper alters what is: hardening a friend\'s skin, withering a foe\'s strength, turning ground to tar - and, at need, remaking their own body into something the moment requires.',
			classID: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'magisterium-arcane-bolt',
							name: 'Warping Bolt',
							description: 'On a tier 3 result for your Arcane Bolt, the target is weakened (save ends) as its substance frays.',
							tag: 'arcane-bolt'
						}),
						FactoryLogic.feature.createSkillChoice({ id: 'magisterium-skill', selected: [ 'Architecture' ], count: 1 }),
						FactoryLogic.feature.create({
							id: 'magisterium-alteration',
							name: 'Alteration',
							description: 'As a maneuver, spend 1 Essence and choose a creature within 10: an ally gains temporary Stamina equal to your Reason and an edge on power rolls until the end of your next turn; an enemy is slowed (EoT).'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'magisterium-hex-of-frailty',
								name: 'Hex of Frailty',
								description: 'Strength is a habit. You teach theirs to doubt itself.',
								type: FactoryLogic.type.createMain(),
								cost: 'signature',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One Creature',
								sections: [
									FactoryLogic.createAbilitySectionText('The target is slowed (EoT).'),
									FactoryLogic.createAbilitySectionSpend({
										value: 1,
										effect: 'The target is weakened (save ends).'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'magisterium-warp',
								name: 'Warp',
								description: 'The limb that struck you forgets, briefly, how a limb is meant to bend.',
								type: FactoryLogic.type.createTrigger('An enemy within 10 hits you or an ally'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One creature',
								sections: [
									FactoryLogic.createAbilitySectionText('The triggering enemy is slowed (save ends).')
								]
							})
						})
					]
				},
				{ level: 2, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'magisterium-2-ability-3', cost: 3, fromSubclass: true, count: 1 }) ] },
				{ level: 5, features: [
					FactoryLogic.feature.create({
						id: 'magisterium-apex-form',
						name: 'Apex Form',
						description: 'As a maneuver, spend 5 Essence to transmute your body until the end of the encounter: you gain temporary Stamina equal to 3 x your Reason, +2 Speed, and a melee free strike that deals 2 + Reason damage. You can still cast while transformed; the Magisterium has no patience for the false divide between scholar and beast.'
					})
				] },
				{ level: 6, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'magisterium-6-ability-7', cost: 7, fromSubclass: true, count: 1 }) ] },
				{ level: 7, features: [
					FactoryLogic.feature.create({
						id: 'magisterium-molten-form',
						name: 'Molten Form',
						description: 'Whenever you Overchannel, your body reshapes around the surge. Until the start of your next turn, choose one of the following - or two, if your Essence deficit is 3 or greater: your melee abilities gain reach 1; you gain a climb speed and a burrow speed and ignore difficult terrain; you gain resistance equal to your Reason to one damage type of your choice; the next ability you use this turn deals extra damage equal to your Essence deficit.'
					})
				] },
				{ level: 8, features: [
					FactoryLogic.feature.create({
						id: 'magisterium-second-clay',
						name: 'Second Clay',
						description: 'Once per encounter, as a maneuver, choose a creature within 10: an ally ends every condition on it and gains temporary Stamina equal to twice your Reason; an enemy is weakened and slowed (EoT; if winded, save ends).'
					})
				] },
				{ level: 9, features: [ FactoryLogic.feature.createClassAbilityChoice({ id: 'magisterium-9-ability-9', cost: 9, fromSubclass: true, count: 1 }) ] }
			],
			abilities: [
				FactoryLogic.createAbility({
					id: 'magisterium-encumber',
					name: 'Encumber',
					description: 'Lead in the marrow. The arm remembers it is heavy.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One or two creatures',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'A < [weak] slowed (EoT)',
								tier2: 'A < [average] slowed (save ends)',
								tier3: 'A < [strong] slowed and weakened (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'The target can\'t shift or stand from prone while slowed this way.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-alter-flesh',
					name: 'Alter Flesh',
					description: 'The Shaper\'s smallest kindness: a body improved without being asked to become a monster.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Choose one, until the start of your next turn: •	The target gains +2 Speed and ignores difficult terrain. •	The target gains temporary Stamina equal to your Reason and immunity equal to your Reason to one damage type of your choice.'),
						FactoryLogic.createAbilitySectionSpend({
							value: 1,
							effect: 'Grant both benefits.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-twist-the-form',
					name: 'Twist the Form',
					description: 'The Magisterium frowns on it, which has never once stopped a Shaper. A frog, usually.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'A < [weak] slowed (save ends)',
								tier2: 'A < [average] transformed (EoT)',
								tier3: 'A < [strong] transformed (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('A transformed target becomes a harmless critter: it loses all abilities and can only move. This ability cannot target leaders, elites, or solos.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-reshape-the-field',
					name: 'Reshape the Field',
					description: 'The ground was only ever a first draft. You revise it.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
					target: 'The area',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the end of the encounter, you can use a maneuver to do any of the following: •	Target a 5x1 line within 10 and either raise or lower it by one square •	Target a 5x1 line within 10 and make it difficult terrain •	Target a square within 10 and make it grasping ground: a creature that enters or starts its turn there is restrained (EoT) if it has A < [weak] .')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-the-unseen-hand',
					name: 'The Unseen Hand',
					description: 'A hand the size of the room, and only you know quite where it is.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: 'M<w restrained (save ends)',
							tier2: 'M<v suspended (save ends)',
							tier3: 'M<s suspended (save ends), slide 5'
						})),
						FactoryLogic.createAbilitySectionText('While the target is suspended it is restrained, and you can slide them 5 squares each turn as a Move Action.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-quickening',
					name: 'Quickening',
					description: 'You press a fistful of borrowed seconds into a friend\'s hand.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target gains +3 Speed, can take an additional move action, and has an edge on their next power roll.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-apotheosis',
					name: 'Apotheosis',
					description: 'The Magisterium\'s heresy, spoken plainly: there is no fixed shape, only the one you have not changed yet.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
					target: 'Each ally in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('The target gains temporary Stamina equal to twice your Reason. Until the end of your next turn, the target gains +1 Speed, +1 Stability, and an edge on power rolls.'),
						FactoryLogic.createAbilitySectionField({
							name: 'Special',
							effect: 'On each of your turns, you can spend 3 essence as a maneuver to sustain this effect until the end of your following turn.'
						})
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-petrify',
					name: 'Petrify',
					description: 'The Magisterium calls it barbaric; the statue has never once filed a complaint.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'M<w restrained (EoT)',
								tier2: 'M<v suspended (save ends)',
								tier3: 'M<s suspended (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('While restrained by this ability, a target that fails three saving throws can\'t take actions and is treated as an object. A leader, elite, or solo gains a +2 bonus to saving throws to end this effect.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-unmake-the-flesh',
					name: 'Unmake the Flesh',
					description: 'The Magisterium\'s forbidden verb, conjugated fully: to have been.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: '10 + R corruption damage; weakened (save ends)',
							tier2: '15 + R corruption damage; weakened and slowed (save ends)',
							tier3: '20 + R corruption damage; weakened and slowed (save ends)'
						})),
						FactoryLogic.createAbilitySectionText('Damage from this ability ignores temporary Stamina.')
					]
				}),
				FactoryLogic.createAbility({
					id: 'magisterium-world-shaper',
					name: 'World-Shaper',
					description: 'You stop shaping things in the world, and start shaping the world at things.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
					target: 'The area',
					cost: 11,
					sections: [
						FactoryLogic.createAbilitySectionText('The area is reshaped until the end of the encounter. Each enemy that enters the area or starts its turn there makes a Might test:'),
						FactoryLogic.createAbilitySectionText('11 or lower: restrained (EoT)  12-16: slowed (save ends)  17+: unaffected'),
						FactoryLogic.createAbilitySectionSpend({
							value: 2,
							effect: 'Each enemy that enters or starts its turn in the area takes damage equal to your Reason.'
						})
					]
				})
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};

const beastfolk: MonsterGroup = {
	id: 'monster-group-aos-beastfolk',
	name: 'Beastfolk',
	description: '',
	picture: null,
	information: [],
	malice: [],
	monsters: [
		FactoryLogic.createMonster({
			id: 'beastfolk-houndfolk-scout',
			name: 'Houndfolk Scout',
			description: 'A houndfolk retainer who runs down what their mentor marks, and brings it to the ground.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Harrier),
			keywords: [ 'Beastfolk', 'Humanoid' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 21,
			stability: 0,
			freeStrikeDamage: 3, freeStrikeType: DamageType.Damage,
			retainer: {
				level4: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'beastfolk-hound-4', name: 'Bring It Down!', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '5 damage; the scout shifts 2', tier2: '8 damage; prone', tier3: '11 damage; prone, and the mentor can shift up to their speed' })) ] }) }),
				level7: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'beastfolk-hound-7', name: 'Circling Hunt', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Until the end of the scout\'s turn, the scout ignores enemy opportunity attacks. The scout moves up to their speed, and if they end adjacent to an enemy adjacent to their mentor, that enemy takes a bane on their next strike.') ] }) }),
				level10: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'beastfolk-hound-10', name: 'Alpha\'s Opening', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '8 damage', tier2: '12 damage; the mentor can make a free strike against the target', tier3: '16 damage; the mentor can make a free strike against the target with an edge' })) ] }) })
			},
			characteristics: FactoryLogic.createCharacteristics(1, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.create({ id: 'hound-packwise', name: 'Packwise', description: 'When the scout ends a move adjacent to their mentor, the scout can shift 1.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'hound-hamstring-bite', name: 'Hamstring Bite', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '3 damage', tier2: '5 damage', tier3: '7 damage' })), FactoryLogic.createAbilitySectionText('If the target is adjacent to the scout\'s mentor, the target can\'t make opportunity attacks until the end of the scout\'s turn, and the scout can shift 1.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'beastfolk-monkeyfolk-canopy-guide',
			name: 'Monkeyfolk Canopy Guide',
			description: 'A monkeyfolk retainer who keeps to the high ground and pulls their mentor out of trouble by the scruff.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Support),
			keywords: [ 'Beastfolk', 'Humanoid' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 21,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Damage,
			retainer: {
				level4: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'beastfolk-monkey-4', name: 'Branch to Branch', type: FactoryLogic.type.createTrigger('The mentor is targeted by a melee strike'), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'The guide\'s mentor', sections: [ FactoryLogic.createAbilitySectionText('The mentor shifts 3 before the strike resolves. If this moves them out of distance, the strike misses.') ] }) }),
				level7: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'beastfolk-monkey-7', name: 'Distracting Feint', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(2) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The target takes a bane on their next strike, and the guide or one ally adjacent to the target shifts 2.') ] }) }),
				level10: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'beastfolk-monkey-10', name: 'Scatter the Flock', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createSpecial('3 burst') ], target: 'Each ally in the area', sections: [ FactoryLogic.createAbilitySectionText('Each target shifts up to their speed. Until the start of the guide\'s next turn, each affected target gains an edge on Disengage tests.') ] }) })
			},
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 2, 1),
			features: [
				FactoryLogic.feature.create({ id: 'monkey-nimble-escape', name: 'Nimble Escape', description: 'When a creature misses the Canopy Guide with a strike, the guide shifts 1.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'monkey-tail-snag', name: 'Tail-Snag', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(2) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '3 damage', tier2: '5 damage', tier3: '7 damage' })), FactoryLogic.createAbilitySectionText('One ally adjacent to the target can shift 1. If the Canopy Guide targets their mentor, the ability deals no damage. Instead, the mentor shifts 3.') ] }) })
			]
		})
	],
	addOns: []
};

const celestial: MonsterGroup = {
	id: 'monster-group-aos-celestial',
	name: 'Celestial',
	description: 'When the Veil thins beneath a lavender sky, what steps through from the Divine Sea does not come to kill; it comes only to correct. They are radiant, beautiful, and patient, and the worst of them are most dangerous not in the moment they strike but in the moment you find yourself agreeing with them.',
	picture: null,
	information: [],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'celestial-malice-antiphon',
			name: 'Antiphon',
			cost: 3,
			sections: [
				'The choir answers itself. Each celestial acting this turn may, after its action, force one enemy within 5 to make a Presence test; on a failure the enemy takes holy damage equal to the highest-level celestial\'s level and can\'t gain surges until the end of its next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'celestial-malice-one-voice',
			name: 'One Voice',
			cost: 5,
			sections: [
				'Until the end of the round, each celestial on the encounter map gains an edge on power rolls while adjacent to another celestial, and each enemy that ends its turn adjacent to two or more celestials is in concord (save ends).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'celestial-malice-pronounce-sentence',
			name: 'Pronounce Sentence',
			cost: 7,
			sections: [
				'Choose one enemy. Each celestial that has line of effect may immediately use a signature ability against that enemy. An enemy reduced to 0 Stamina by this judgement doesn\'t die but falls unconscious (save ends).'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'celestial-verger',
			name: 'Celestial Verger',
			description: 'A humanoid figure bathed in cold radiance.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 2,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 6,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Holy,
			withCaptain: '+1 damage bonus to strikes',
			characteristics: FactoryLogic.createCharacteristics(2, 0, -1, 1, 1),
			features: [
				FactoryLogic.feature.create({ id: 'verger-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'verger-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 2 damage.' }),
				FactoryLogic.feature.create({ id: 'verger-antiphonal', name: 'Antiphonal', description: 'A verger\'s abilities gain an edge while it is within 3 squares of another celestial.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'verger-stilling-touch', name: 'Stilling Touch', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy per antiphon', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '2 holy damage', tier2: '3 holy damage', tier3: '4 holy damage; the target can\'t shift until the end of its next turn' })), FactoryLogic.createAbilitySectionText('If two or more vergers target the same enemy: the target is in concord (EoT).') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'verger-be-still', name: 'Be Still', type: FactoryLogic.type.createTrigger('The verger is reduced to 0 Stamina'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The verger comes apart into light, and that light does not disperse. One celestial within 3 squares regains 2 Stamina.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-chorister',
			name: 'Celestial Chorister',
			description: 'A drifting mote of voice and pale light; a hundred of them sound like a cathedral with no walls.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 2,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Holy,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: FactoryLogic.createCharacteristics(-1, 1, 1, 2, 2),
			features: [
				FactoryLogic.feature.create({ id: 'chorister-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'chorister-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'chorister-chorus', name: 'Chorus', description: 'A chorister\'s abilities gain an edge while it is within 3 of another celestial.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'chorister-radiant-note', name: 'Radiant Note', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(8) ], target: 'One enemy per chorister', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '2 holy damage', tier2: '3 holy damage', tier3: '4 holy damage; the target can\'t gain an edge until the end of its next turn' })), FactoryLogic.createAbilitySectionText('If two or more choristers target the same enemy: the target is also frightened (EoT).') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'chorister-be-still', name: 'Be Still', type: FactoryLogic.type.createTrigger('The chorister is reduced to 0 Stamina'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The chorister comes apart into light. One celestial within 3 squares regains 2 Stamina.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-mendicant',
			name: 'Celestial Mendicant',
			description: 'A robed, kneeling figure of soft radiance, palms upturned, that asks - gently, relentlessly - that you kneel beside it.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Psychic,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 1, 2, 2),
			features: [
				FactoryLogic.feature.create({ id: 'mendicant-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'mendicant-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'mendicant-wearying-grace', name: 'Wearying Grace', description: 'When an adjacent enemy fails a saving throw, the mendicant regains 3 Stamina.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mendicant-burden-of-grace', name: 'Burden of Grace', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '5 psychic damage; P<0 weakened (EoT)', tier2: '7 psychic damage; P<1 weakened (save ends)', tier3: '9 psychic damage; P<2 in supplication (save ends)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mendicant-kneel', name: 'Kneel', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The target falls to its knees: it is prone and can\'t stand (EoT). The mendicant gains 3 temporary Stamina. Special: The target must be winded or weakened.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mendicant-weight-of-devotion', name: 'Weight of Devotion', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('2 burst within 5') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '5 psychic damage; P<1 weakened (save ends)', tier2: '7 psychic damage; P<2 in supplication (save ends)', tier3: '9 psychic damage; P<3 in supplication (save ends)' })), FactoryLogic.createAbilitySectionText('The mendicant regains 2 Stamina for each enemy brought to its knees by this ability.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-throne',
			name: 'Celestial Throne',
			description: 'A great seat of burning brass and folded wings, occupied by no one - the chair itself is the angel, and where it sets down, the ground becomes a court.',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 11,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(4),
			stamina: 75,
			stability: 4,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Holy,
			characteristics: FactoryLogic.createCharacteristics(3, 0, 0, 1, 2),
			features: [
				FactoryLogic.feature.create({ id: 'throne-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'throne-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'throne-hold-court', name: 'Hold Court', description: 'While the throne hasn\'t moved since the start of its last turn, each enemy within 2 can\'t willingly end its move farther from the throne than it began.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'throne-scales-and-sword', name: 'Scales and Sword', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(2) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '5 holy damage; taunted (EoT)', tier2: '9 holy damage; taunted (save ends)', tier3: '12 holy damage; taunted (save ends) and P<2 in concord (save ends)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'throne-interpose', name: 'Interpose', type: FactoryLogic.type.createTrigger('The target is targeted by a strike'), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(2) ], target: 'One ally', cost: 1, sections: [ FactoryLogic.createAbilitySectionText('The throne becomes the new target of the strike, provided it is valid. It then reduces the damage by 5.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'throne-summon-the-dock', name: 'Summon the Dock', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Until the throne moves, each enemy that starts its turn within 2 is P<1 in supplication (save ends).') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-cantor',
			name: 'Celestial Cantor',
			description: 'A tall, slender thing of woven light that does not fight so much as conduct - every gesture tuning the host around it into something more certain.',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 11,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Holy,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 2, 1, 2),
			features: [
				FactoryLogic.feature.create({ id: 'cantor-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'cantor-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'cantor-perfect-pitch', name: 'Perfect Pitch', description: 'When the cantor is reduced to 0 Stamina, before it is removed, one celestial within 5 may immediately make a signature ability as a free triggered action.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'cantor-tuning-note', name: 'Tuning Note', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '5 holy damage', tier2: '9 holy damage', tier3: '12 holy damage' })), FactoryLogic.createAbilitySectionText('If the cantor targets a celestial ally instead, the ability deals no damage; that ally instead gains 5 temporary Stamina and an edge on its next power roll.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'cantor-harmonize', name: 'Harmonize', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One or two allies', sections: [ FactoryLogic.createAbilitySectionText('Each target may immediately shift 2. Until the start of the cantor\'s next turn, each target\'s strikes deal 2 additional holy damage.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'cantor-dissonance', name: 'Dissonance is a Sin', type: FactoryLogic.type.createTrigger('The target ends an effect on itself with a saving throw'), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One enemy', cost: 1, sections: [ FactoryLogic.createAbilitySectionText('The target takes 5 psychic damage.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'cantor-swell', name: 'Swell the Chorus', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Each ally in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionText('The target gains 5 temporary Stamina and may immediately shift 2. Until the start of the cantor\'s next turn, when the target imposes In Concord or In Supplication, that effect\'s potency increases by 1.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-dominion',
			name: 'Celestial Dominion',
			description: 'A column of ordered light ringed by slowly turning rings of script, imposing geometry on everything it surveys. Where it looks, the world lines up.',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 13,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 70,
			stability: 1,
			freeStrikeDamage: 6, freeStrikeType: DamageType.Holy,
			characteristics: FactoryLogic.createCharacteristics(1, 1, 2, 2, 1),
			features: [
				FactoryLogic.feature.create({ id: 'dominion-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'dominion-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'dominion-right-order', name: 'Right Order', description: 'Difficult terrain within 5 of the dominion isn\'t difficult terrain for celestials, and is difficult terrain for everyone else even when it otherwise wouldn\'t be.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'dominion-decree', name: 'Decree', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(8) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '6 holy damage; slide 1', tier2: '10 holy damage; slide 3', tier3: '13 holy damage; slide 3 and P<2 in concord (save ends)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'dominion-all-things', name: 'All Things in their Place', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('3 cube within 10') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '5 holy damage; pull 2 toward the cube\'s centre', tier2: '8 holy damage; pull 3 toward the centre', tier3: '11 holy damage; pull 3 toward the centre, and each target that ends adjacent to another target is restrained (save ends)' })), FactoryLogic.createAbilitySectionText('The area becomes a 3 cube of ordered light until the end of the encounter; enemies treat it as difficult terrain, celestials gain an edge on power rolls while inside it.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-virtue',
			name: 'Celestial Virtue',
			description: 'A blade of white fire trailing a comet\'s wing, too fast and too bright to look at directly - the host\'s swift hand, sent to make an example.',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8, 'fly'),
			stamina: 80,
			stability: 0,
			freeStrikeDamage: 6, freeStrikeType: DamageType.Holy,
			characteristics: FactoryLogic.createCharacteristics(1, 3, 0, 1, 2),
			features: [
				FactoryLogic.feature.create({ id: 'virtue-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'virtue-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'virtue-wings', name: 'On Wings of Judgement', description: 'The virtue can fly, ignores difficult terrain, and doesn\'t provoke opportunity attacks when it flies.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'virtue-searing-light', name: 'Searing Light', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '6 holy damage; the virtue shifts 2', tier2: '11 holy damage; the virtue shifts 3', tier3: '14 holy damage; the virtue shifts 3, and the target can\'t make opportunity attacks (EoT)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'virtue-annunciation', name: 'Annunciation', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The virtue marks the target for judgement until the end of its next turn. While marked, the target is frightened, and the next strike any celestial makes against it gains an edge.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'virtue-flense', name: 'Flense the Unworthy', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '9 holy damage', tier2: '14 holy damage; P<2 bleeding (save ends)', tier3: '18 holy damage; P<3 bleeding (save ends), and if the target is marked, it is also in supplication (save ends)' })) ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-power',
			name: 'Celestial Power',
			description: 'An armoured giant of cooling brass and four mailed wings, wielding a sword as long as a man is tall. The militant face of mercy.',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 110,
			stability: 3,
			freeStrikeDamage: 8, freeStrikeType: DamageType.Holy,
			characteristics: FactoryLogic.createCharacteristics(3, 1, 0, 1, 1),
			features: [
				FactoryLogic.feature.create({ id: 'power-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'power-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'power-unanswerable', name: 'Unanswerable', description: 'When a creature scores a tier 3 result against the power with a strike, the power loses 1d6 Stamina and the result becomes a tier 2 result instead.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'power-sentencing-sword', name: 'Sentencing Sword', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(2) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '8 holy damage; push 1', tier2: '14 holy damage; push 2', tier3: '17 holy damage; push 3 and M<3 prone' })), FactoryLogic.createAbilitySectionText('If the target is prone or in supplication, this ability deals 4 additional damage.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'power-weight-of-heaven', name: 'The Weight of Heaven', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('2 burst') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '8 holy damage; P<2 in supplication (save ends)', tier2: '12 holy damage; P<3 in supplication (save ends)', tier3: '6 holy damage; P<4 in supplication (save ends)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'power-descent', name: 'Descent', type: FactoryLogic.type.createMove(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The power flies up to its speed in a straight line and lands; each enemy adjacent to its landing square takes 4 holy damage and is knocked prone.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-seraph',
			name: 'Celestial Seraph',
			description: 'Six wings, a wheel of eyes, and a voice like a sentence already passed. The radiant judge; a Seraph anchors a serious incursion.',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 56,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 200,
			stability: 2,
			freeStrikeDamage: 9, freeStrikeType: DamageType.Holy,
			characteristics: FactoryLogic.createCharacteristics(2, 1, 2, 3, 3),
			features: [
				FactoryLogic.feature.create({ id: 'seraph-serene', name: 'Serene', description: 'A celestial can\'t be frightened; additionally the seraph is immune to being dazed, taunted, or charmed.' }),
				FactoryLogic.feature.create({ id: 'seraph-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'seraph-many-eyes', name: 'Many Eyes', description: 'The seraph can\'t be hidden from, and ignores concealment. The first time each round an enemy within 10 attempts to hide or break line of effect, that enemy is frightened (EoT).' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'seraph-pronouncement', name: 'Pronouncement', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '9 holy damage; I<2 in concord (save ends)', tier2: '15 holy damage; I<3 in concord (save ends)', tier3: '18 holy damage; I<4 in concord (save ends) and in supplication (save ends)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'seraph-kneel', name: 'Kneel before the Divine', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '11 psychic damage; in supplication (save ends)', tier2: '6 psychic damage; prone', tier3: 'no effect' })), FactoryLogic.createAbilitySectionText('Each target makes a Presence test.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'seraph-verdict', name: 'The Verdict is Love', type: FactoryLogic.type.createTrigger('The target would take damage from one of the seraph\'s allies'), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One enemy', cost: 1, sections: [ FactoryLogic.createAbilitySectionText('The target takes no damage, and instead its next action must be spent moving toward, and then defending, the seraph.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'seraph-final-judgement', name: 'Final Judgement', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Each enemy in the area', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '11 holy damage; I<3 in concord (save ends)', tier2: '16 holy damage; I<4 in supplication (save ends)', tier3: '21 holy damage; I<5 in supplication (save ends)' })), FactoryLogic.createAbilitySectionText('Any enemy reduced to 0 Stamina by this ability falls unconscious (save ends) rather than dying.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-principality',
			name: 'Celestial Principality',
			description: 'It does not appear. It is realised - stepping out of the conviction of a crowd as though it had always been the thing they believed.',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 110,
			stability: 0,
			freeStrikeDamage: 8, freeStrikeType: DamageType.Holy,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 2, 2, 3),
			features: [
				FactoryLogic.feature.create({ id: 'principality-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'principality-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'principality-belief', name: 'Made of Belief', description: 'While any enemy within 10 is in concord, the principality has concealment and can\'t be made the target of an opportunity attack. The first time each round it becomes hidden, it may teleport 5.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'principality-revelation', name: 'Revelation Strike', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '9 holy damage', tier2: '15 holy damage; if the target is in concord or frightened, +4 holy damage', tier3: '19 holy damage; if the target is in concord or frightened, the principality may teleport, swapping places with it' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'principality-spreads', name: 'Spreads Like Weather', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: 'P<2 in concord (save ends)', tier2: 'P<3 in concord (save ends)', tier3: 'P<4 in concord (save ends)' })), FactoryLogic.createAbilitySectionText('The target\'s allies that can see it take a bane on their next saving throw against concord.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'principality-no-you-agree', name: 'No, You Agree', type: FactoryLogic.type.createTrigger('The principality is targeted by a strike'), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One enemy', cost: 1, sections: [ FactoryLogic.createAbilitySectionText('The attacker must make a saving throw. On a failure, it chooses a new target for the strike, and is in concord (save ends).') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-concordant',
			name: 'Celestial Concordant',
			description: 'A towering figure of white robes and golden machinery, ringed by a silent choir, that offers the world the one thing it has always wanted: an end to argument.',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader, MonsterRoleType.Controller),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 72,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 240,
			stability: 2,
			freeStrikeDamage: 9, freeStrikeType: DamageType.Holy,
			characteristics: FactoryLogic.createCharacteristics(2, 1, 3, 3, 4),
			features: [
				FactoryLogic.feature.create({ id: 'concordant-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'concordant-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'concordant-choir-eternal', name: 'Choir Eternal', description: 'While the concordant is on the encounter map, celestial allies can\'t be in supplication or forced to make a saving throw against the concordant\'s own effects, and they gain an edge on saving throws.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'concordant-the-offer', name: 'The Offer', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '9 holy damage; P<2 in concord (save ends)', tier2: '14 holy damage; P<3 in concord (save ends)', tier3: '18 holy damage; P<4 in concord (save ends); if the target was already in concord, it is instead subjected to Supplication (save ends)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'concordant-world-without-discord', name: 'A World Without Discord', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', cost: 3, sections: [ FactoryLogic.createAbilitySectionText('Until the end of the concordant\'s next turn, each enemy in concord within 10 takes a bane on power rolls and saving throws, and each celestial within 10 gains 5 temporary Stamina.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'concordant-silence-dissenter', name: 'Silence the Dissenter', type: FactoryLogic.type.createTrigger('The target ends an effect with a saving throw, or damages the concordant'), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One enemy', cost: 2, sections: [ FactoryLogic.createAbilitySectionText('The target takes 9 psychic damage and, P<3, is in concord (save ends).') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'concordant-va1', name: 'Call to Worship', type: FactoryLogic.type.createVillainAction(1), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('Each enemy within 10') ], target: 'Each enemy within 10', sections: [ FactoryLogic.createAbilitySectionText('Each enemy within 10 makes a Presence test. On a failure, the enemy is frightened (save ends); an enemy already frightened is instead in concord (save ends).') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'concordant-va2', name: 'The Sentence of the Sea', type: FactoryLogic.type.createVillainAction(2), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('One enemy in concord or frightened') ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('Choose one enemy in concord or frightened. Each celestial within 10 with line of effect makes a signature ability against it as a free triggered action. If it is reduced to 0 Stamina, it falls unconscious rather than dying.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'concordant-va3', name: 'Perfected Stillness', type: FactoryLogic.type.createVillainAction(3), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Until the start of the concordant\'s next turn, no creature on the encounter map may shift, and forced movement distances are halved. Celestials are unaffected.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'celestial-perfected-silence',
			name: 'Celestial Perfected Silence',
			description: 'Not a figure. A region of the world made right - a sphere of motionless, luminous, soundless order, at the centre of which something vast is being still.',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo, MonsterRoleType.Controller),
			keywords: [ 'Celestial', 'Horror' ],
			encounterValue: 120,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 400,
			stability: 5,
			freeStrikeDamage: 11, freeStrikeType: DamageType.Holy,
			characteristics: FactoryLogic.createCharacteristics(3, 1, 3, 4, 5),
			features: [
				FactoryLogic.feature.create({ id: 'silence-serene', name: 'Serene', description: 'A celestial can\'t be frightened.' }),
				FactoryLogic.feature.create({ id: 'silence-affront', name: 'An Affront to Order', description: 'The first time each round this celestial is targeted by an ability that imposes a condition, or is subjected to forced movement, it takes 5 damage.' }),
				FactoryLogic.feature.create({ id: 'silence-solo-resolve', name: 'Solo Resolve', description: 'The Perfected Silence ignores the dazed, taunted, grabbed, and restrained conditions and takes only half damage from the Affront to Order trait it would otherwise suffer. At the start of each of its turns, it may end one effect on itself that a saving throw could end.' }),
				FactoryLogic.feature.create({ id: 'silence-aura', name: 'Aura of Stillness (3)', description: 'Each enemy that enters the aura for the first time in a round or starts its turn there takes 5 holy damage and, P<3, is slowed (EoT). An enemy reduced to 0 Speed inside the aura is in supplication (save ends).' }),
				FactoryLogic.feature.create({ id: 'silence-two-turns', name: 'Two Turns', description: 'The Perfected Silence takes two turns each round, at two different points in the initiative order. It can\'t take them consecutively.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'silence-hand-of-peace', name: 'Hand of Peace', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(2) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 5, tier1: '11 holy damage; P<3 in concord (save ends)', tier2: '16 holy damage; P<4 in concord (save ends) and slide 3', tier3: '21 holy damage; P<5 in supplication (save ends) and slide 3' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'silence-let-it-end', name: 'Let it End', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '9 holy damage; P<3 in concord (save ends)', tier2: '14 holy damage; P<4 in concord and weakened (save ends)', tier3: '19 holy damage; P<5 in supplication (save ends)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'silence-sea-closes', name: 'The Sea Closes Over', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('3 burst') ], target: 'Each enemy in the area', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '13 holy damage; P<4 in concord (save ends)', tier2: '18 holy damage; P<5 in supplication (save ends)', tier3: '23 holy damage; P<6 in supplication (save ends)' })), FactoryLogic.createAbilitySectionText('Any enemy reduced to 0 Stamina by this ability falls unconscious (save ends) rather than dying.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'silence-va1', name: 'The Quiet Spreads', type: FactoryLogic.type.createVillainAction(1), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The aura\'s size increases by 1 (to a maximum of 6) until the end of the encounter. Each enemy currently in the aura makes a Presence test or is in concord (save ends).') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'silence-va2', name: 'Be Still', type: FactoryLogic.type.createVillainAction(2), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Until the start of its next turn, no enemy on the encounter map may take more than one action, maneuver, or move on its turn, and forced movement against the Perfected Silence fails. Choose one enemy in concord: it is in supplication (save ends) with a double bane on the save.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'silence-va3', name: 'Annexation', type: FactoryLogic.type.createVillainAction(3), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('Each enemy in supplication within the aura') ], target: 'Each enemy in supplication within the aura', sections: [ FactoryLogic.createAbilitySectionText('Each enemy in supplication within the aura must make a Presence test. On a failure, it is removed from the encounter and returns at the start of the next round, dazed and weakened (save ends). On a success, it is no longer in supplication, and is immune to that condition until the end of its next turn.') ] }) })
			]
		})
	],
	addOns: []
};

const deva: MonsterGroup = {
	id: 'monster-group-aos-deva',
	name: 'Deva',
	description: 'Devas are not incursions. They were born here - ember-kin with eyes like coals, storm-kin whose hair stirs in still air, stone-kin veined like weathered rock, and the tide-, wild-, grave-, and rift-kin beside them. What they carry is not passage from the Elemental Chaos but an ancestry, worn in the body - and in an age that drowns a child for stopping a falling cup, being unable to go unnoticed is a whole life, decided at birth by strangers.',
	picture: null,
	information: [],
	malice: [
		FactoryLogic.feature.createMalice({ id: 'deva-malice-elemental-convergence', name: 'Elemental Convergence', cost: 3, icon: StatBlockIcon.Self, sections: [ 'The devas let their elemental natures flare in concert. Each deva acting this turn deals an additional 1d6 damage on their signature attack.' ] }),
		FactoryLogic.feature.createMalice({ id: 'deva-malice-unstable-flare', name: 'Unstable Flare', cost: 5, icon: StatBlockIcon.AuraBurst, sections: [ 'Raw planar force bursts from every deva on the encounter map. Each enemy adjacent to one or more devas takes damage equal to the highest-level deva\'s level. The damage type is chosen by the Director from fire, lightning, cold, poison, corruption, or psychic. Until the end of the next turn, each square adjacent to a deva is difficult terrain for enemies.' ] }),
		FactoryLogic.feature.createMalice({ id: 'deva-malice-planar-cascade', name: 'Planar Cascade', cost: 7, icon: StatBlockIcon.Self, sections: [ 'Each deva on the encounter map can immediately shift 1 square and use their signature action.' ] })
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'deva-ember-kin-reaver',
			name: 'Ember-Kin Reaver',
			description: 'Not a fire elemental - a person who has been visible every day of their life in a world that would have preferred otherwise, and has stopped apologising for it.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Deva', 'Ember-Kin' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Fire,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 2, 1, 0),
			features: [
				FactoryLogic.feature.create({ id: 'reaver-immunity', name: 'Immunity', description: 'The reaver has fire immunity 2.' }),
				FactoryLogic.feature.create({ id: 'reaver-burning-momentum', name: 'Burning Momentum', description: 'The first time the reaver reduces a creature to 0 Stamina on its turn, its next strike before the end of its next turn deals 3 additional fire damage.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'reaver-cinder-spear', name: 'Cinder Spear', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '5 fire damage', tier2: '8 fire damage', tier3: '10 fire damage' })), FactoryLogic.createAbilitySectionText('One enemy adjacent to the target takes 2 fire damage.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'reaver-flash-kill', name: 'Flash-Kill', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('2 burst within 10') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '5 fire damage; A<0 fire weakness 3 (EoT)', tier2: '8 fire damage; A<1 fire weakness 3 (EoT)', tier3: '10 fire damage; A<2 fire weakness 3 (EoT)' })), FactoryLogic.createAbilitySectionText('If the reaver moved at least 3 squares straight toward the target before using this ability, it deals 4 additional damage.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'reaver-ignition', name: 'Ignition', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Until the end of the reaver\'s turn, its strikes deal 2 additional fire damage.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'reaver-scorching-rebuke', name: 'Scorching Rebuke', type: FactoryLogic.type.createTrigger('A creature attempts to grab the reaver'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'The triggering creature', sections: [ FactoryLogic.createAbilitySectionText('The triggering creature takes 3 fire damage.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'deva-storm-kin-tempest-runner',
			name: 'Storm-Kin Tempest Runner',
			description: 'Storm-kin whose hair stirs in still air; fast as weather and twice as hard to hold.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Deva', 'Storm-Kin' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Lightning,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 1, 1, 1),
			features: [
				FactoryLogic.feature.create({ id: 'runner-immunity', name: 'Immunity', description: 'The tempest runner has lightning immunity 2.' }),
				FactoryLogic.feature.create({ id: 'runner-ride-the-gale', name: 'Ride the Gale', description: 'When the tempest runner disengages, it can move 1 additional square.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'runner-thunder-knives', name: 'Thunder Knives', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '5 lightning damage; shift 1', tier2: '8 lightning damage; shift 2', tier3: '10 lightning damage; shift 3' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'runner-downsquall', name: 'Downsquall Pass', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('4x1 line within 1') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '6 lightning damage; push 1', tier2: '10 lightning damage; push 2', tier3: '12 lightning damage; push 3' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'runner-skate', name: 'Skate the Storm', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The tempest runner disengages, then moves up to its speed.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'runner-reflexes', name: 'Lightning Reflexes', type: FactoryLogic.type.createTrigger('An enemy moves adjacent to the tempest runner'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The tempest runner shifts 1 square.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'deva-tide-kin-undertow-duelist',
			name: 'Tide-Kin Undertow Duelist',
			description: 'Tide-kin who move like the pull beneath a wave - always taking something with them when they go.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Deva', 'Tide-Kin' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'swim'),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Cold,
			characteristics: FactoryLogic.createCharacteristics(1, 2, 0, 1, 1),
			features: [
				FactoryLogic.feature.create({ id: 'duelist-immunity', name: 'Immunity', description: 'The undertow duelist has cold immunity 2.' }),
				FactoryLogic.feature.create({ id: 'duelist-undertow', name: 'Undertow', description: 'Whenever the undertow duelist shifts, it can slide one adjacent creature 1 square.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'duelist-frostcurrent', name: 'Frostcurrent Blade', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '5 cold damage; slide 1', tier2: '8 cold damage; slide 2', tier3: '10 cold damage; slide 3' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'duelist-drown-the-line', name: 'Drown the Line', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('3 cube within 5') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '6 cold damage; slide 1', tier2: '10 cold damage; slide 2', tier3: '12 cold damage; slide 3, the target can\'t shift (EoT)' })), FactoryLogic.createAbilitySectionText('If the undertow duelist moved at least 3 squares straight toward the target before using this ability, it deals 4 additional damage.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'duelist-riptide', name: 'Riptide Step', type: FactoryLogic.type.createMove(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The undertow duelist shifts 3.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'duelist-flow', name: 'Flow Like Water', type: FactoryLogic.type.createTrigger('The undertow duelist is subjected to an effect that can be ended by a saving throw'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('That effect becomes EoT instead.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'deva-wild-kin-canopy-shaper',
			name: 'Wild-Kin Canopy Shaper',
			description: 'Wild-kin who tend the green the way others tend a hearth - and set it against you like a wall.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Deva', 'Wild-Kin' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Poison,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 1, 2, 2),
			features: [
				FactoryLogic.feature.create({ id: 'shaper-immunity', name: 'Immunity', description: 'The canopy shaper has acid immunity 2 and poison immunity 2.' }),
				FactoryLogic.feature.create({ id: 'shaper-resurgence', name: 'Wild Resurgence', description: 'If the canopy shaper is winded at the start of its turn, it regains 2 Stamina.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'shaper-thorncast', name: 'Thorncast', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '5 poison damage', tier2: '8 poison damage', tier3: '10 poison damage' })), FactoryLogic.createAbilitySectionText('If the canopy shaper targets an ally, the ability deals no damage. Instead, that ally gains 5 temporary Stamina.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'shaper-briar-maze', name: 'Briar Maze', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('3 cube within 5') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '5 poison damage; the area is difficult terrain until the end of the canopy shaper\'s next turn', tier2: '8 poison damage; the area is difficult terrain until the end of the encounter', tier3: '10 poison damage; the area is difficult terrain until the end of the encounter, and each target is slowed (EoT)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'shaper-hedgewalk', name: 'Hedgewalk', type: FactoryLogic.type.createMove(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('If the canopy shaper is adjacent to a square of vegetation, it teleports to an unoccupied square adjacent to another square of vegetation within 5.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'shaper-verdant', name: 'Verdant Vitality', type: FactoryLogic.type.createTrigger('The target spends a Recovery'), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One ally', sections: [ FactoryLogic.createAbilitySectionText('One ally within 5 of the shaper regains 5 Stamina.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'deva-grave-kin-corpsetender',
			name: 'Grave-Kin Corpsetender',
			description: 'Grave-kin carry the stillness of decay in a world whose Arbiters hunt necromancers - they need do nothing to look exactly like the crime.',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Deva', 'Grave-Kin' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Corruption,
			characteristics: FactoryLogic.createCharacteristics(1, 0, 1, 3, 0),
			features: [
				FactoryLogic.feature.create({ id: 'corpsetender-immunity', name: 'Immunity', description: 'The corpsetender has corruption immunity 3.' }),
				FactoryLogic.feature.create({ id: 'corpsetender-entropy', name: 'Entropy', description: 'When the corpsetender reduces an enemy to 0 Stamina, one enemy adjacent to that creature takes 4 corruption damage.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'corpsetender-withering', name: 'Withering Touch', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '5 corruption damage; bleeding (EoT)', tier2: '9 corruption damage; bleeding (save ends)', tier3: '12 corruption damage; bleeding (save ends) and weakened (EoT)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'corpsetender-displeasure', name: 'Death\'s Displeasure', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('2 burst within 5') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '6 corruption damage; bane on the next power roll', tier2: '11 corruption damage; bane on all power rolls (EoT)', tier3: '14 corruption damage; bane on all power rolls (save ends)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'corpsetender-grave-step', name: 'Grave Step', type: FactoryLogic.type.createMove(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('If the corpsetender is adjacent to a dead creature of size 1M or larger, it teleports to an unoccupied square adjacent to another dead creature within 5.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'corpsetender-feast', name: 'Feast on the Fallen', type: FactoryLogic.type.createTrigger('A creature adjacent to the tender drops to 0 Stamina'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The corpsetender regains 5 Stamina.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'deva-stone-kin-fault-warden',
			name: 'Stone-Kin Fault Warden',
			description: 'Stone-kin veined like weathered rock, who plant themselves between the family and the world and simply do not move.',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Deva', 'Stone-Kin' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(4, 'burrow'),
			stamina: 60,
			stability: 3,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(3, 0, 0, 1, 1),
			features: [
				FactoryLogic.feature.create({ id: 'warden-stone-endurance', name: 'Stone Endurance', description: 'The first time each round the fault warden takes damage, it reduces that damage by 3.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'warden-quarry-hammer', name: 'Quarry Hammer', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '5 damage; push 1', tier2: '9 damage; push 2', tier3: '12 damage; push 3 and prone' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'warden-burying-rush', name: 'Burying Rush', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 2, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '6 damage; the target is grabbed', tier2: '11 damage; the target is grabbed', tier3: '14 damage; the target is grabbed and restrained (EoT)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'warden-stand-fast', name: 'Stand Fast', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self and each ally adjacent to the fault warden', sections: [ FactoryLogic.createAbilitySectionText('Each target gains +1 Stability until the start of the fault warden\'s next turn.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'warden-immovable', name: 'Immovable', type: FactoryLogic.type.createTrigger('The fault warden is subjected to forced movement'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The fault warden ignores that forced movement.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'deva-rift-kin-manifold-knife',
			name: 'Rift-Kin Manifold Knife',
			description: 'Rift-kin seem faintly misfiled in the world itself - here one breath, a step to the side of here the next.',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Deva', 'Rift-Kin' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 70,
			stability: 0,
			freeStrikeDamage: 6, freeStrikeType: DamageType.Psychic,
			characteristics: FactoryLogic.createCharacteristics(1, 3, 1, 1, 0),
			features: [
				FactoryLogic.feature.create({ id: 'knife-immunity', name: 'Immunity', description: 'The manifold knife has psychic immunity 4.' }),
				FactoryLogic.feature.create({ id: 'knife-geometry', name: 'Impossible Geometry', description: 'Once per round, when targeted by an attack, the manifold knife can teleport 1 square before the attack resolves.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'knife-fracture', name: 'Fracture Stab', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '6 psychic damage', tier2: '10 psychic damage; teleport the target to a square adjacent to the manifold knife', tier3: '13 psychic damage; teleport the target to a square adjacent to the manifold knife, and the target is dazed (EoT)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'knife-collapse', name: 'Manifold Collapse', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('3 cube within 5') ], target: 'Each enemy in the area', cost: 3, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '7 psychic damage; slide 2', tier2: '12 psychic damage; slide 3', tier3: '16 psychic damage; slide 4 and dazed (EoT)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'knife-dark-step', name: 'Dark Step', type: FactoryLogic.type.createMove(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('If the manifold knife is adjacent to a square in darkness, it teleports to an unoccupied square adjacent to another square in darkness within 5.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'knife-uncertain', name: 'Uncertain Form', type: FactoryLogic.type.createTrigger('An enemy targets the manifold knife with a strike'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The triggering strike takes a bane.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'deva-storm-kin-courier',
			name: 'Storm-Kin Courier',
			description: 'A storm-kin retainer who runs the wind ahead of their mentor and calls the weather down behind them.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Deva', 'Storm-Kin' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 21,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Lightning,
			retainer: {
				level4: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'deva-storm-courier-4', name: 'Sudden Squall', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('3 cube within 10') ], target: 'Each enemy in the area', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '3 lightning damage; push 1', tier2: '5 lightning damage; push 2', tier3: '8 lightning damage; push 3' })) ] }) }),
				level7: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'deva-storm-courier-7', name: 'Eye on the Horizon', type: FactoryLogic.type.createTrigger('The mentor is targeted by a ranged strike'), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'The courier\'s mentor', sections: [ FactoryLogic.createAbilitySectionText('The mentor shifts 3 before the strike resolves. If this moves them out of distance, the strike misses.') ] }) }),
				level10: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'deva-storm-courier-10', name: 'Stormbreak', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createSpecial('5 cube within 10') ], target: 'Each enemy in the area', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '8 lightning damage', tier2: '12 lightning damage; slide 2', tier3: '16 lightning damage; slide 3 and the target is dazed (save ends)' })) ] }) })
			},
			characteristics: FactoryLogic.createCharacteristics(0, 1, 2, 1, 2),
			features: [
				FactoryLogic.feature.create({ id: 'courier-immunity', name: 'Immunity', description: 'The courier has lightning immunity 1.' }),
				FactoryLogic.feature.create({ id: 'courier-ride-the-gale', name: 'Ride the Gale', description: 'When the courier disengages, they can move 1 additional square.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'courier-lightning-lash', name: 'Lightning Lash', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '3 lightning damage', tier2: '5 lightning damage; push 1', tier3: '7 lightning damage; push 2' })), FactoryLogic.createAbilitySectionText('If the courier targets their mentor, the mentor ignores the damage and can shift 2.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'deva-ember-kin-cindercaster',
			name: 'Ember-Kin Cindercaster',
			description: 'An ember-kin retainer who lays down fire from the back rank so their mentor can walk through the gap.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Deva', 'Ember-Kin' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 21,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Fire,
			retainer: {
				level4: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'deva-ember-cindercaster-4', name: 'Flashflame', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('2 burst within 10') ], target: 'Each enemy in the area', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '5 fire damage', tier2: '8 fire damage', tier3: '11 fire damage' })), FactoryLogic.createAbilitySectionText('Each target that takes damage has fire weakness 3 until the end of the cindercaster\'s next turn.') ] }) }),
				level7: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'deva-ember-cindercaster-7', name: 'Stoke the Blaze', type: FactoryLogic.type.createTrigger('The mentor reduces an enemy to 0 Stamina'), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'The cindercaster\'s mentor', sections: [ FactoryLogic.createAbilitySectionText('The mentor gains 5 temporary Stamina and their next strike before the end of their next turn deals 3 additional fire damage.') ] }) }),
				level10: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'deva-ember-cindercaster-10', name: 'Wildfire Arc', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One creature or object', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '8 fire damage', tier2: '12 fire damage', tier3: '16 fire damage' })), FactoryLogic.createAbilitySectionText('The retainer can target a second creature within 5 squares of and line of effect of the original target. The second target takes half the damage.') ] }) })
			},
			characteristics: FactoryLogic.createCharacteristics(0, 1, 2, 1, 1),
			features: [
				FactoryLogic.feature.create({ id: 'cinder-immunity', name: 'Immunity', description: 'The cindercaster has fire immunity 1.' }),
				FactoryLogic.feature.create({ id: 'cinder-burning-temper', name: 'Burning Temper', description: 'When a creature attempts to grab the cindercaster or hits them with a melee free strike, that creature takes 1 fire damage.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'cinder-cinderbolt', name: 'Cinderbolt', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '3 fire damage', tier2: '5 fire damage', tier3: '7 fire damage' })), FactoryLogic.createAbilitySectionText('If the target is adjacent to another enemy, one enemy adjacent to the target takes 1 fire damage.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'deva-wild-kin-verdant-attendant',
			name: 'Wild-Kin Verdant Attendant',
			description: 'A wild-kin retainer who keeps their mentor standing when by rights they shouldn\'t be.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Deva', 'Wild-Kin' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 21,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Poison,
			retainer: {
				level4: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'deva-wild-verdant-4', name: 'Briar Shelter', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'Self and each ally', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: 'Each target gains 4 temporary Stamina', tier2: 'Each target gains 4 temporary Stamina', tier3: 'Each target gains 4 temporary Stamina' })), FactoryLogic.createAbilitySectionText('Each target gains 4 temporary Stamina. Until the end of the verdant attendant\'s next turn, enemies treat squares adjacent to any affected target as difficult terrain.') ] }) }),
				level7: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'deva-wild-verdant-7', name: 'Regrow', type: FactoryLogic.type.createTrigger('The target becomes winded'), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One ally', sections: [ FactoryLogic.createAbilitySectionText('The target can spend a Recovery and shifts 2.') ] }) }),
				level10: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'deva-wild-verdant-10', name: 'Grasping Vines', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('3 cube within 10') ], target: 'Each enemy in the area', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '6 poison damage; the area is difficult terrain for enemies', tier2: '9 poison damage; the area is difficult terrain for enemies', tier3: '13 poison damage; the area is difficult terrain for enemies, and each target is restrained (save ends)' })) ] }) })
			},
			characteristics: FactoryLogic.createCharacteristics(0, 1, 1, 2, 2),
			features: [
				FactoryLogic.feature.create({ id: 'verdant-living-canopy', name: 'Living Canopy', description: 'Whenever the verdant attendant\'s mentor gains temporary Stamina, the mentor can shift 1.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'verdant-sap-lash', name: 'Sap Lash', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '3 poison damage', tier2: '5 poison damage', tier3: '7 poison damage' })), FactoryLogic.createAbilitySectionText('If the verdant attendant targets an ally, the ability deals no damage. Instead, the ally gains 3 temporary Stamina.') ] }) })
			]
		})
	],
	addOns: []
};

const ironbound: MonsterGroup = {
	id: 'monster-group-aos-ironbound',
	name: 'Ironbound',
	description: 'Ask an ironbound what they were made for and you will get a silence. It is the question every one of them carries and almost none can answer. Look at what these things do together - Lockstep Advance, Interlocking Plates, Interception Protocol - and you see the horror of the section: they do not fight as individuals, because they were not built to be individuals. Deploy them as a faceless unit only when facelessness is the entire point, and let the party\'s ironbound be the one who says so.',
	picture: null,
	information: [],
	malice: [
		FactoryLogic.feature.createMalice({ id: 'ironbound-malice-lockstep', name: 'Lockstep Advance', cost: 3, icon: StatBlockIcon.Self, sections: [ 'Each ironbound acting this turn gains an edge on strikes until the start of their next turn. In addition, each ironbound can ignore 1 square of difficult terrain during this turn.' ] }),
		FactoryLogic.feature.createMalice({ id: 'ironbound-malice-interlocking', name: 'Interlocking Plates', cost: 5, icon: StatBlockIcon.Self, sections: [ 'Choose one ironbound on the encounter map. Until the end of their next turn, strikes against that ironbound and each ironbound adjacent to them take a bane.' ] }),
		FactoryLogic.feature.createMalice({ id: 'ironbound-malice-interception', name: 'Interception Protocol', cost: 5, icon: StatBlockIcon.Self, sections: [ 'Until the end of the next turn, the first time each ironbound is targeted by a strike while adjacent to an ironbound ally, the strike takes a bane.' ] }),
		FactoryLogic.feature.createMalice({ id: 'ironbound-malice-overdrive-cascade', name: 'Overdrive Cascade', cost: 7, icon: StatBlockIcon.Self, sections: [ 'Each ironbound on the encounter map can either take a signature action or move up to their speed. An ironbound that chooses to make a signature action loses 1d6 Stamina after the strike resolves.' ] })
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'ironbound-sentinel',
			name: 'Ironbound Sentinel',
			description: 'A rank of these advancing in step is not a monster - it is what an ironbound hero would have been if nobody had ever thought to ask them a question.',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Ironbound' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 160,
			stability: 4,
			freeStrikeDamage: 6, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(3, 0, 0, 1, 1),
			features: [
				FactoryLogic.feature.create({ id: 'sentinel-immunity', name: 'Immunity & Weakness', description: 'The sentinel has poison immunity 5, and lightning weakness 5.' }),
				FactoryLogic.feature.create({ id: 'sentinel-iron-body', name: 'Iron Body', description: 'The sentinel can\'t suffocate, and doesn\'t need to eat or drink to stay alive.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'sentinel-pike', name: 'Pike', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(2) ], target: 'Two creatures or objects', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '6 damage', tier2: '11 damage; taunted (EoT)', tier3: '14 damage; taunted (save ends)' })), FactoryLogic.createAbilitySectionText('If the targets are adjacent to each other, this ability deals 3 additional damage to each target.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'sentinel-overdrive-slam', name: 'Overdrive Slam', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createSpecial('1 burst') ], target: 'Each enemy in the area', cost: 2, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '8 damage; push 1', tier2: '14 damage; push 2', tier3: '17 damage; push 3 and prone' })), FactoryLogic.createAbilitySectionText('After using this ability, the sentinel is dazed until the end of its next turn.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'sentinel-fortress-mode', name: 'Fortress Mode', type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Until the sentinel moves, strikes made against allies adjacent to the sentinel take a bane.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'sentinel-interpose', name: 'Interpose Plating', type: FactoryLogic.type.createTrigger('An adjacent ally is targeted by a strike'), keywords: [ AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One ally', cost: 1, sections: [ FactoryLogic.createAbilitySectionText('The sentinel swaps places with the ally and becomes the new target of the strike, provided the sentinel is a valid target.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'ironbound-siegebreaker',
			name: 'Ironbound Siegebreaker',
			description: 'Built to break a wall and keep walking; the horror is only a horror if a player is in the room to feel it.',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Ironbound' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 180,
			stability: 4,
			freeStrikeDamage: 8, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(3, 0, 0, 1, 0),
			features: [
				FactoryLogic.feature.create({ id: 'siege-immunity', name: 'Immunity & Weakness', description: 'The siegebreaker has poison immunity 6, and lightning weakness 5.' }),
				FactoryLogic.feature.create({ id: 'siege-iron-body', name: 'Iron Body', description: 'The siegebreaker can\'t suffocate, and doesn\'t need to eat or drink to stay alive.' }),
				FactoryLogic.feature.create({ id: 'siege-frame', name: 'Siege Frame', description: 'The siegebreaker deals double damage to objects and structures.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'siege-ramming-maul', name: 'Ramming Maul', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(2) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '8 damage; push 1', tier2: '14 damage; push 2', tier3: '17 damage; push 3 and prone' })), FactoryLogic.createAbilitySectionText('If the siegebreaker moved at least 3 squares straight toward the target before using this ability, it deals 4 additional damage.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'siege-break-the-line', name: 'Break the Line', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createSpecial('6x1 line within 1') ], target: 'Each enemy and object in the area', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '9 damage; push 1', tier2: '16 damage; push 2', tier3: '21 damage; push 3 and prone' })), FactoryLogic.createAbilitySectionText('The siegebreaker can move up to its speed in a straight line before using this ability. This movement ignores opportunity attacks.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'siege-overdrive-impact', name: 'Overdrive Impact', type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Until the end of the siegebreaker\'s turn, its strikes deal 4 additional damage. At the end of its turn, it loses 1d6 Stamina and becomes dazed (EoT).') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'siege-trample', name: 'Trample Forward', type: FactoryLogic.type.createTrigger('A creature is pushed or knocked prone by the siegebreaker'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The siegebreaker shifts up to 2 squares toward that creature.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'siege-ablative', name: 'Ablative Plating', type: FactoryLogic.type.createTrigger('A creature scores a tier 3 result against the siegebreaker with a strike'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', cost: 1, sections: [ FactoryLogic.createAbilitySectionText('The siegebreaker loses 1d6 Stamina, and the result becomes a tier 2 result.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'ironbound-squire',
			name: 'Ironbound Squire',
			description: 'A junior ironbound assigned to a mentor - loyal, literal, and learning what it was never asked whether it wanted to be.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Ironbound' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 21,
			stability: 1,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Damage,
			retainer: {
				level4: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'ironbound-squire-4', name: 'Interpose Plating', type: FactoryLogic.type.createTrigger('The squire\'s mentor is targeted by a strike while adjacent to the squire', { qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'The squire\'s mentor', sections: [ FactoryLogic.createAbilitySectionText('The squire swaps places with the mentor and becomes the new target of the strike, provided the squire is a valid target.') ] }) }),
				level7: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'ironbound-squire-7', name: 'Fortress Mode', type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Until the squire moves, strikes made against allies adjacent to the squire take a bane.') ] }) }),
				level10: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'ironbound-squire-10', name: 'Overdrive Slam', type: FactoryLogic.type.createMain({ qualifiers: [ 'Encounter' ] }), keywords: [ AbilityKeyword.Area, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createSpecial('1 burst') ], target: 'Each enemy in the area', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '8 damage; push 1', tier2: '12 damage; push 2', tier3: '16 damage; push 3 and prone' })), FactoryLogic.createAbilitySectionText('After using this ability, the squire is dazed until the end of their next turn.') ] }) })
			},
			characteristics: FactoryLogic.createCharacteristics(2, 0, 0, 1, 0),
			features: [
				FactoryLogic.feature.create({ id: 'squire-immunity', name: 'Immunity & Weakness', description: 'The squire has poison immunity 1, and lightning weakness 5.' }),
				FactoryLogic.feature.create({ id: 'squire-iron-body', name: 'Iron Body', description: 'The squire can\'t suffocate, and they don\'t need to eat or drink to stay alive.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'squire-anchor-bash', name: 'Anchor Bash', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature or object', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '3 damage', tier2: '5 damage; push 1', tier3: '7 damage; push 2' })), FactoryLogic.createAbilitySectionText('If the squire is adjacent to their mentor, this ability gains an edge.') ] }) })
			]
		})
	],
	addOns: []
};

const orian: MonsterGroup = {
	id: 'monster-group-aos-orian',
	name: 'Orian',
	description: 'The heroes will never fight the orians, any more than they fight the humans. They will fight a family - one particular hunt-family in its own particular water, which has concluded that they are prey that hasn\'t been dealt with yet. Something went into the water, and somebody came to take it back out: a wreck is not lost property, it is a windfall in someone\'s water, claimed the moment it strikes the surface. The water\'s law is older than mercy - but it is a law, and that is the difference between this family and a monster: you can talk to it.',
	picture: null,
	information: [],
	malice: [
		FactoryLogic.feature.createMalice({ id: 'orian-malice-undertow', name: 'Undertow', cost: 3, icon: StatBlockIcon.Self, sections: [ 'The water remembers whose it is. Until the end of the round, each enemy that starts or ends a move in water, or on a wet or listing surface, must succeed on a Might test or be pulled 2 squares in a direction of the Director\'s choosing.' ] }),
		FactoryLogic.feature.createMalice({ id: 'orian-malice-cast-the-nets', name: 'Cast the Nets', cost: 5, icon: StatBlockIcon.SpecialArea, sections: [ 'Weighted nets fly from the water. Choose a 3 cube; each enemy in the area must succeed on an Agility test or be restrained (save ends). Until the end of the round, orian strikes against a restrained creature gain an edge.' ] }),
		FactoryLogic.feature.createMalice({ id: 'orian-malice-sea-takes-it-back', name: 'The Sea Takes It Back', cost: 7, icon: StatBlockIcon.AuraBurst, sections: [ 'A swell breaks across the encounter map. Each enemy in water or within 2 squares of it slides 3 squares toward the deepest water, and each unsecured object slides with them. An enemy that ends this movement submerged can\'t breathe until the end of its next turn.' ] })
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'orian-tide-hunter',
			name: 'Orian Tide-Hunter',
			description: 'Young hunters of the claim, fast and half-seen, who make a wreck\'s rigging and rails into a reef.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Orian' ],
			encounterValue: 2,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Damage,
			withCaptain: '+2 to Speed',
			characteristics: FactoryLogic.createCharacteristics(1, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.create({ id: 'tidehunter-depths-born', name: 'Depths-Born', description: 'Water is home: full Speed while swimming, clear sight in murk and darkness, and deep, cold, or turbulent water never slows the tide-hunter.' }),
				FactoryLogic.feature.create({ id: 'tidehunter-hunts', name: 'Hunts in Company', description: 'The tide-hunter gains an edge on strikes while another orian is within 2 squares of its target.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'tidehunter-barbed-line', name: 'Barbed Line', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(1), FactoryLogic.distance.createRanged(5) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '2 damage', tier2: '3 damage; pull 1', tier3: '4 damage; pull 2' })), FactoryLogic.createAbilitySectionText('If the target is pulled into water, the tide-hunter can shift up to 2 squares.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'orian-harpooner',
			name: 'Orian Harpooner',
			description: 'They surface only from the shoulders, take their aim without hurry, and the line does the rest.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Orian' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(2, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.create({ id: 'harpooner-depths-born', name: 'Depths-Born', description: 'Water is home: full Speed while swimming, clear sight in murk and darkness, and deep, cold, or turbulent water never slows the harpooner.' }),
				FactoryLogic.feature.create({ id: 'harpooner-current-sense', name: 'Current-Sense', description: 'While in water, the harpooner knows the location of every creature in the same body of water within 10 squares, and concealment offers no benefit against it there.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'harpooner-harpoon', name: 'Harpoon and Reel', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createRanged(8) ], target: 'One creature', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '3 damage', tier2: '4 damage; pull 2', tier3: '5 damage; pull 3; M<1 grabbed' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'harpooner-brace', name: 'Brace the Line', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Pull a grabbed creature up to 3 squares.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'orian-current-caller',
			name: 'Orian Current-Caller',
			description: 'The family\'s water-speaker. No writ ever reached her; no pyre ever will.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Orian' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 2, 1, 2),
			features: [
				FactoryLogic.feature.create({ id: 'caller-depths-born', name: 'Depths-Born', description: 'Water is home: full Speed while swimming, clear sight in murk and darkness, and deep, cold, or turbulent water never slows the current-caller.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'caller-water-turns', name: 'The Water Turns', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One or two creatures', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '3 damage', tier2: '4 damage; A<1 slowed (save ends)', tier3: '5 damage; A<2 slowed (save ends) and pulled 3' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'caller-water-turns-malice', name: 'The Water Turns (Malice)', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature', cost: 3, sections: [ FactoryLogic.createAbilitySectionText('The target must succeed on a Might test or take 4 damage and be dazed (save ends) as seawater finds its throat.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'orian-shelf-breaker',
			name: 'Orian Shelf-Breaker',
			description: 'Pure-lineage and pressure-built - more shark than kin, the families say, and say it with pride.',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Orian' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 57,
			stability: 2,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(3, 1, 0, 0, 1),
			features: [
				FactoryLogic.feature.create({ id: 'shelfbreaker-depths-born', name: 'Depths-Born', description: 'Water is home: full Speed while swimming, clear sight in murk and darkness, and deep, cold, or turbulent water never slows the shelf-breaker.' }),
				FactoryLogic.feature.create({ id: 'shelfbreaker-drowning-grip', name: 'Drowning Grip', description: 'A creature grabbed by the shelf-breaker can\'t breathe, and takes 3 damage at the start of each of its turns until the grab ends. The shelf-breaker can drag a grabbed creature at full Speed while swimming.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'shelfbreaker-breaching-slam', name: 'Breaching Slam', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One or two creatures', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '5 damage', tier2: '8 damage; push 2', tier3: '9 damage; push 3; M<2 prone' })), FactoryLogic.createAbilitySectionText('If the shelf-breaker came out of the water this turn, this ability gains an edge.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'shelfbreaker-take-hold', name: 'Take Hold', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', sections: [ FactoryLogic.createAbilitySectionText('The target is M<2 grabbed.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'orian-hunt-mother',
			name: 'Orian Hunt-Mother',
			description: 'The water\'s law, standing up out of it. She has drowned better-armed visitors than you, and buried kin for less.',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Orian' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'swim'),
			stamina: 155,
			stability: 1,
			freeStrikeDamage: 4, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(2, 3, 1, 2, 2),
			features: [
				FactoryLogic.feature.create({ id: 'huntmother-depths-born', name: 'Depths-Born', description: 'Water is home: full Speed while swimming, clear sight in murk and darkness, and deep, cold, or turbulent water never slows the hunt-mother.' }),
				FactoryLogic.feature.create({ id: 'huntmother-current-sense', name: 'Current-Sense', description: 'While in water, the hunt-mother knows the location of every creature in the same body of water within 10 squares, and concealment offers no benefit against it there.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'huntmother-mothers-spear', name: 'Mother\'s Spear', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createMelee(2), FactoryLogic.distance.createRanged(8) ], target: 'Two creatures', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '5 damage', tier2: '8 damage; pull 1', tier3: '9 damage; pull 2; one ally within 5 of the target can make a free strike against it' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'huntmother-family-answers', name: 'The Family Answers', type: FactoryLogic.type.createTrigger('An enemy damages the hunt-mother'), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One ally', sections: [ FactoryLogic.createAbilitySectionText('The target can make a free strike against the triggering creature.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'huntmother-va1', name: 'Blood in the Water', type: FactoryLogic.type.createVillainAction(1), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Each orian in the encounter shifts up to its Speed. Until the end of the round, orians gain an edge on strikes against winded creatures.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'huntmother-va2', name: 'The Water Remembers', type: FactoryLogic.type.createVillainAction(2), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Each orian in the encounter shifts up to its Speed toward water. Until the end of the encounter, orians in water, or adjacent to the hunt-mother, have damage immunity 2.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'huntmother-va3', name: 'Nothing Leaves the Water', type: FactoryLogic.type.createVillainAction(3), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('Up to four targets') ], target: 'Up to four creatures', sections: [ FactoryLogic.createAbilitySectionText('The hunt-mother shifts up to 10 squares, swimming freely. During or after this movement, she uses Mother\'s Spear against up to four targets; each target she damages is also pulled 3 squares toward the nearest water.') ] }) })
			]
		})
	],
	addOns: []
};

const mount: MonsterGroup = {
	id: 'monster-group-aos-mounts',
	name: 'Mount',
	description: 'The steeds of Vara\'s far corners - the running-bird of Dejim, the silent owlfalcon of Svelland, the darting dragonfly above the Jhazren canopy, and the half-wild monitor of the Dry Sea. Each carries a rider of size 1M or smaller, and each brings its own trick to a chase or a charge.',
	picture: null,
	information: [],
	malice: [],
	monsters: [
		FactoryLogic.createMonster({
			id: 'mount-mantilla',
			name: 'Mantilla',
			description: 'The great flightless running-bird of Dejim - long-legged, sharp-beaked, and faster than any horse over broken ground.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Beast' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(9),
			stamina: 30,
			stability: 1,
			freeStrikeDamage: 4, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(2, 2, -3, 1, 0),
			features: [
				FactoryLogic.feature.create({ id: 'mantilla-mount', name: 'Mount (1M)', description: 'A creature of size 1M or smaller can ride the mantilla.' }),
				FactoryLogic.feature.create({ id: 'mantilla-sure-footed', name: 'Sure-Footed', description: 'The mantilla ignores difficult terrain made of rubble, scree, stairs, or rough ground, and doesn\'t take damage from falls of 3 squares or less.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mantilla-raking-stride', name: 'Raking Stride', type: FactoryLogic.type.createMove(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The mantilla moves up to its speed. If it moves at least 4 squares in a straight line and ends adjacent to an enemy, that enemy takes 4 damage and is knocked prone (M<1).') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'mount-owlfalcon',
			name: 'Owlfalcon',
			description: 'Svelland\'s silent hunter, broad enough at the wing to carry an Einherjar rider. It makes no sound in flight at all - the first you know of it is the shadow.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Beast' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(10, 'fly'),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(1, 3, -2, 2, 0),
			features: [
				FactoryLogic.feature.create({ id: 'owlfalcon-mount', name: 'Mount (1M)', description: 'A creature of size 1M or smaller can ride the owlfalcon.' }),
				FactoryLogic.feature.create({ id: 'owlfalcon-silent-wings', name: 'Silent Wings', description: 'The owlfalcon can\'t be detected by hearing alone, and gains an edge on tests to avoid notice while flying. Enemies take a bane on opportunity attacks against it.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'owlfalcon-stoop', name: 'Stoop', type: FactoryLogic.type.createMove(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The owlfalcon flies up to its speed. If it descends at least 3 squares and ends adjacent to an enemy, the rider\'s next strike this turn against that enemy gains an edge and deals 3 additional damage.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'mount-giant-dragonfly',
			name: 'Giant Dragonfly',
			description: 'Iridescent, two feet of wingspan to a side, and impossible to corner - the favoured mount above the canopies of Jhazren.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Beast' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(10, 'fly, hover'),
			stamina: 24,
			stability: 0,
			freeStrikeDamage: 4, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(0, 3, -3, 1, 0),
			features: [
				FactoryLogic.feature.create({ id: 'dragonfly-mount', name: 'Mount (1M)', description: 'A creature of size 1M or smaller can ride the dragonfly.' }),
				FactoryLogic.feature.create({ id: 'dragonfly-untouchable', name: 'Untouchable', description: 'The dragonfly ignores difficult terrain while flying and never provokes opportunity attacks. When an enemy misses it or its rider with a strike, the dragonfly can shift 1.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'dragonfly-darting-flight', name: 'Darting Flight', type: FactoryLogic.type.createMove(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The dragonfly shifts up to half its speed, then the rider may take a main action, then the dragonfly shifts up to half its speed again.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'mount-giant-lizard',
			name: 'Giant Lizard',
			description: 'The partly-tamed monitor of the Dry Sea, ridden by the Bhawarans - patient in heat that kills, but never quite domesticated. It tolerates a rider. It does not obey one.',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Beast' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 32,
			stability: 2,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Damage,
			characteristics: FactoryLogic.createCharacteristics(2, 1, -4, 0, 0),
			features: [
				FactoryLogic.feature.create({ id: 'lizard-mount', name: 'Mount (1M)', description: 'A creature of size 1M or smaller can ride the lizard.' }),
				FactoryLogic.feature.create({ id: 'lizard-desert-hardy', name: 'Desert-Hardy', description: 'The lizard has fire immunity 3, ignores difficult terrain made of sand or rock, and can go without food or water for weeks.' }),
				FactoryLogic.feature.create({ id: 'lizard-half-wild', name: 'Half-Wild', description: 'The first time each encounter the lizard is reduced to winded, or its rider is reduced to winded, the rider must succeed on a Presence or Might test or the lizard acts on its own next turn.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'lizard-seizing-bite', name: 'Seizing Bite', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The lizard bites: 5 damage, and M<1 the target is grabbed. While the lizard has a creature grabbed this way, its rider gains an edge on strikes against that creature.') ] }) })
			]
		})
	],
	addOns: []
};

const siabhra: MonsterGroup = {
	id: 'monster-group-aos-siabhra',
	name: 'Síabhra',
	description: 'The síabhra have no homeland, no cities, and no songs that are their own. They are called changelings and hollowfolk by people who do not mean it kindly, and they are held responsible by the entire world for the worst atrocity in living memory - on the strength of a lie the Synarchy never even had to tell, because the síabhra wear the fey\'s heritage, and for everybody that was enough. In combat they wear their enemies\' faces, and it can be difficult to keep track of an opponent that looks like an ally.',
	picture: null,
	information: [],
	malice: [
		FactoryLogic.feature.createMalice({ id: 'siabhra-malice-borrowed-cadence', name: 'Borrowed Cadence', cost: 3, icon: StatBlockIcon.Self, sections: [ 'The síabhra perfectly mimic the movements of their enemies. Each síabhra acting this turn gains an edge on all strikes until the start of their next turn.' ] }),
		FactoryLogic.feature.createMalice({ id: 'siabhra-malice-sow-doubt', name: 'Sow Doubt', cost: 5, icon: StatBlockIcon.Self, sections: [ 'The síabhra quickly switch appearance, making it difficult to determine who is who. Choose one ally; each enemy takes a bane on strikes targeting that ally until the end of their next turn.' ] }),
		FactoryLogic.feature.createMalice({ id: 'siabhra-malice-vitality-drain', name: 'Vitality Drain', cost: 7, icon: StatBlockIcon.Self, sections: [ 'Each síabhra on the encounter map uses Siphon Vitality immediately.' ] })
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'siabhra-reflector',
			name: 'Síabhra Reflector',
			description: 'One of many identical faces in a crowd of changelings - and any of them might be wearing yours.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Fey', 'Humanoid', 'Síabhra' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2, freeStrikeType: DamageType.Psychic,
			withCaptain: '+1 damage bonus to strikes',
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 2, 0),
			features: [
				FactoryLogic.feature.create({ id: 'reflector-flickering', name: 'Flickering Visages', description: 'If the reflector is adjacent to a síabhra ally, attacks against it take a bane.' }),
				FactoryLogic.feature.create({ id: 'reflector-lightweight', name: 'Lightweight', description: 'The reflector is considered to be size 1S for the purposes of forced movement.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'reflector-confusing', name: 'Confusing Reflection', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy per minion', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '2 psychic damage', tier2: '3 psychic damage; R<1 dazed (EoT)', tier3: '5 psychic damage; R<2 dazed (EoT)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'reflector-echo', name: 'Echo', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The reflector copies the target\'s physical appearance and size (to a minimum of 1S and a maximum of 1L). Until the start of its next turn, the target takes a bane on any strike targeting the reflector.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'siabhra-infiltrator',
			name: 'Síabhra Infiltrator',
			description: 'It has been in the room for some time. It has been agreeing with you.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: [ 'Fey', 'Humanoid', 'Síabhra' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Psychic,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 2, 0),
			features: [
				FactoryLogic.feature.create({ id: 'infiltrator-flickering', name: 'Flickering Visages', description: 'If the infiltrator is adjacent to a síabhra ally, attacks against it take a bane.' }),
				FactoryLogic.feature.create({ id: 'infiltrator-lightweight', name: 'Lightweight', description: 'The infiltrator is considered to be size 1S for the purposes of forced movement.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'infiltrator-psychic-mirror', name: 'Psychic Mirror', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One enemy', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: '4 psychic damage; R<0 frightened (save ends)', tier2: '7 psychic damage; R<1 frightened (save ends)', tier3: '10 psychic damage; R<2 frightened (save ends)' })), FactoryLogic.createAbilitySectionText('The infiltrator deals an additional 2 psychic damage for each surge the target has; the target then loses those surges.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'infiltrator-echo', name: 'Echo', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The infiltrator copies the target\'s physical appearance and size (to a minimum of 1S and a maximum of 1L). Until the start of its next turn, the target takes a bane on any strike targeting the infiltrator.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'infiltrator-siphon', name: 'Siphon Vitality', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The target loses one Recovery (or 10 Stamina if they have no Recoveries remaining) and the infiltrator regains 10 Stamina.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'infiltrator-reflected-pain', name: 'Reflected Pain', type: FactoryLogic.type.createTrigger('A creature deals damage to the infiltrator'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('The infiltrator creates an unstable psychic link between itself and the attacker. The infiltrator and the attacker both take half damage from this attack.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'siabhra-masklord',
			name: 'Síabhra Masklord',
			description: 'The one whose face you will never find, because it has never worn its own.',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader, MonsterRoleType.Hexer),
			keywords: [ 'Fey', 'Humanoid', 'Síabhra' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 120,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Psychic,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 3, 0),
			features: [
				FactoryLogic.feature.create({ id: 'masklord-flickering', name: 'Flickering Visages', description: 'If the masklord is adjacent to a síabhra ally, attacks against it take a bane.' }),
				FactoryLogic.feature.create({ id: 'masklord-lightweight', name: 'Lightweight', description: 'The masklord is considered to be size 1S for the purposes of forced movement.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'masklord-dissolve', name: 'Dissolve Identity', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Each enemy in the area', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '4 psychic damage; R<1 the target cannot treat allies as allies (save ends)', tier2: '7 psychic damage; R<2 the target cannot treat allies as allies (save ends)', tier3: '10 psychic damage; R<3 the target cannot treat allies as allies (save ends)' })) ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'masklord-echo', name: 'Echo', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The masklord copies the target\'s physical appearance and size (to a minimum of 1S and a maximum of 1L). Until the start of its next turn, the target takes a bane on any strike targeting the masklord.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'masklord-siphon', name: 'Siphon Vitality', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The target loses one Recovery (or 10 Stamina if they have no Recoveries remaining) and the masklord regains 10 Stamina.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'masklord-no-over-there', name: 'No, Over There', type: FactoryLogic.type.createTrigger('A creature targets the masklord'), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', cost: 1, sections: [ FactoryLogic.createAbilitySectionText('The masklord selects a creature within 1 square; the attack targets that creature rather than the masklord.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'masklord-va1', name: 'Borrowed Command', type: FactoryLogic.type.createVillainAction(1), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('One enemy') ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The masklord mimics the voice of a hero to shout a false order; one enemy must use a triggered action to shift up to 2 squares, then make a signature attack against a target of the masklord\'s choice.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'masklord-va2', name: 'Identity Transference', type: FactoryLogic.type.createVillainAction(2), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('Each síabhra on the encounter map can teleport and swap places with another síabhra.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'masklord-va3', name: 'Identity Crisis', type: FactoryLogic.type.createVillainAction(3), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('5 burst around each síabhra') ], target: 'Each enemy within 5 of a síabhra', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 3, tier1: '10 psychic damage; dazed (save ends)', tier2: '6 psychic damage; dazed (EoT)', tier3: 'no effect' })), FactoryLogic.createAbilitySectionText('Each enemy within 5 squares of a síabhra makes a Reason test.') ] }) })
			]
		}),
		FactoryLogic.createMonster({
			id: 'siabhra-changeling',
			name: 'Síabhra Changeling',
			description: 'A retainer who has chosen a face and a person to stand beside - and will wear either as the moment demands.',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Hexer),
			keywords: [ 'Fey', 'Humanoid', 'Síabhra' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 5, freeStrikeType: DamageType.Psychic,
			retainer: {
				level4: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'siabhra-changeling-4', name: 'Pattern Redirection', type: FactoryLogic.type.createTrigger('A creature imposes a condition on the changeling or its mentor'), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'The triggering creature', sections: [ FactoryLogic.createAbilitySectionText('The condition is applied to the triggering creature rather than to the changeling or its mentor.') ] }) }),
				level7: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'siabhra-changeling-7', name: 'Go Get \'Em, Tiger', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: 'The target must use the Charge action against one creature of the changeling\'s choice', tier2: 'The target must use the Charge action against one creature of the changeling\'s choice', tier3: 'The target must use the Charge action against one creature of the changeling\'s choice' })) ] }) }),
				level10: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'siabhra-changeling-10', name: 'Shatter the Mirror', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Each enemy in the area', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '8 psychic damage', tier2: '12 psychic damage', tier3: '16 psychic damage' })), FactoryLogic.createAbilitySectionText('The changeling can end one condition currently affecting them and impose the same condition on each enemy in the area.') ] }) })
			},
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 2, 0),
			features: [
				FactoryLogic.feature.create({ id: 'changeling-flickering', name: 'Flickering Visages', description: 'If the changeling is adjacent to a síabhra ally, attacks against it take a bane.' }),
				FactoryLogic.feature.create({ id: 'changeling-lightweight', name: 'Lightweight', description: 'The changeling is considered to be size 1S for the purposes of forced movement.' }),
				FactoryLogic.feature.create({ id: 'changeling-social-parasite', name: 'Social Parasite', description: 'The changeling is proficient in the Disguise and Read Person skills.' }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'changeling-mental-fugue', name: 'Mental Fugue', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One enemy', cost: 'signature', sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ], tier1: '4 psychic damage; R<0 taunted (save ends)', tier2: '5 psychic damage; R<1 taunted (save ends)', tier3: '7 psychic damage; R<2 taunted (save ends)' })), FactoryLogic.createAbilitySectionText('If the target attacks the changeling while taunted, the changeling can nominate another creature within range of the attack; the changeling and this creature swap locations, and both take half damage from the attack.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'changeling-echo', name: 'Echo', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The changeling copies the target\'s physical appearance and size (to a minimum of 1S and a maximum of 1L). Until the start of its next turn, the target takes a bane on any strike targeting the changeling.') ] }) }),
				FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'changeling-siphon', name: 'Siphon Vitality', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One enemy', sections: [ FactoryLogic.createAbilitySectionText('The target loses 10 Stamina and either the changeling or its mentor regains 10 Stamina.') ] }) })
			]
		})
	],
	addOns: []
};

export const ageOfSecrets: Sourcebook = {
	id: 'community-age-of-secrets',
	name: 'Age of Secrets',
	description: 'Dickensian / Cold War / Conspiracy',
	type: SourcebookType.Community,
	adventures: [],
	ancestries: [],
	careers: [
		{
			id: 'career-age-of-secrets-archaeologist',
			name: 'Archaeologist',
			description: 'You explored the ruins of lost civilizations, seeking knowledge, treasure, or both.',
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'career-age-of-secrets-archaeologist-feature-1',
					selected: [ 'History' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'career-age-of-secrets-archaeologist-feature-2',
					listOptions: [ SkillList.Exploration, SkillList.Lore ],
					count: 2
				}),
				FactoryLogic.feature.createLanguageChoice({
					id: 'career-age-of-secrets-archaeologist-feature-3',
					count: 2
				}),
				FactoryLogic.feature.createPerk({
					id: 'career-age-of-secrets-archaeologist-feature-4',
					lists: [ PerkList.Lore ]
				})
			],
			incitingIncidents: {
				options: [
					{ id: 'career-age-of-secrets-archaeologist-ii-1', name: 'The Wrong Door', description: 'You opened a sealed chamber that should have remained closed. Something escaped - and it’s still out there.' },
					{ id: 'career-age-of-secrets-archaeologist-ii-2', name: 'Buried Truth', description: 'You uncovered evidence that powerful people wanted hidden. They made sure you wouldn’t publish it.' },
					{ id: 'career-age-of-secrets-archaeologist-ii-3', name: 'Cursed Find', description: 'An artifact you recovered brought ruin to you or someone you loved.' },
					{ id: 'career-age-of-secrets-archaeologist-ii-4', name: 'Lost Expedition', description: 'You were the only survivor of a doomed dig. No one believes your account of what happened.' },
					{ id: 'career-age-of-secrets-archaeologist-ii-5', name: 'Stolen Discovery', description: 'Your greatest find was taken from you and credited to someone else.' },
					{ id: 'career-age-of-secrets-archaeologist-ii-6', name: 'Ancient Calling', description: 'Something in the ruins spoke to you - and you’ve been chasing that voice ever since.' }
				],
				selected: null
			}
		},
		{
			id: 'career-age-of-secrets-crew',
			name: 'Crew',
			description: 'You served aboard a skyship, working as part of a crew that lived and died by coordination and skill.',
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'career-age-of-secrets-crew-feature-1',
					selected: [ 'Mechanics' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'career-age-of-secrets-crew-feature-2',
					listOptions: [ SkillList.Exploration, SkillList.Interpersonal ],
					count: 2
				}),
				FactoryLogic.feature.createLanguageChoice({
					id: 'career-age-of-secrets-crew-feature-3',
					count: 2
				}),
				FactoryLogic.feature.createPerk({
					id: 'career-age-of-secrets-crew-feature-4',
					lists: [ PerkList.Exploration ]
				})
			],
			incitingIncidents: {
				options: [
					{ id: 'career-age-of-secrets-crew-ii-1', name: 'Crash Landing', description: 'Your ship went down. You survived - but not everyone did.' },
					{ id: 'career-age-of-secrets-crew-ii-2', name: 'Mutiny', description: 'Your crew turned on itself, and you had to choose a side.' },
					{ id: 'career-age-of-secrets-crew-ii-3', name: 'Lost in the Storm', description: 'You encountered something unnatural in the skies.' },
					{ id: 'career-age-of-secrets-crew-ii-4', name: 'Sabotage', description: 'Someone brought your ship down - and you intend to find out who.' },
					{ id: 'career-age-of-secrets-crew-ii-5', name: 'Abandoned', description: 'You were left behind during a mission gone wrong.' },
					{ id: 'career-age-of-secrets-crew-ii-6', name: 'Forbidden Cargo', description: 'You transported something you shouldn’t have. Now others are hunting it.' }
				],
				selected: null
			}
		},
		{
			id: 'career-age-of-secrets-diplomat',
			name: 'Diplomat',
			description: 'You represented a faction, nation, or cause, navigating delicate negotiations and dangerous politics.',
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'career-age-of-secrets-diplomat-feature-1',
					listOptions: [ SkillList.Interpersonal, SkillList.Intrigue ],
					count: 2
				}),
				FactoryLogic.feature.createLanguageChoice({
					id: 'career-age-of-secrets-diplomat-feature-2',
					count: 2
				}),
				FactoryLogic.feature.createBonus({
					id: 'career-age-of-secrets-diplomat-feature-3',
					field: FeatureField.Renown,
					value: 1
				}),
				FactoryLogic.feature.createPerk({
					id: 'career-age-of-secrets-diplomat-feature-4',
					lists: [ PerkList.Interpersonal ]
				})
			],
			incitingIncidents: {
				options: [
					{ id: 'career-age-of-secrets-diplomat-ii-1', name: 'Broken Treaty', description: 'A deal you brokered collapsed, leading to bloodshed.' },
					{ id: 'career-age-of-secrets-diplomat-ii-2', name: 'Assassination Attempt', description: 'Someone tried to kill you during negotiations - and nearly succeeded.' },
					{ id: 'career-age-of-secrets-diplomat-ii-3', name: 'Betrayal', description: 'Your own faction undermined you.' },
					{ id: 'career-age-of-secrets-diplomat-ii-4', name: 'Impossible Peace', description: 'You failed to stop a war that still haunts you.' },
					{ id: 'career-age-of-secrets-diplomat-ii-5', name: 'Secret Clause', description: 'You made a deal with hidden consequences.' },
					{ id: 'career-age-of-secrets-diplomat-ii-6', name: 'Exile', description: 'You were cast out after a diplomatic disaster.' }
				],
				selected: null
			}
		},
		{
			id: 'career-age-of-secrets-journalist',
			name: 'Journalist',
			description: 'You documented events, uncovered secrets, and told stories others wanted buried.',
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'career-age-of-secrets-journalist-feature-1',
					selected: [ 'Interrogate' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'career-age-of-secrets-journalist-feature-2',
					listOptions: [ SkillList.Interpersonal, SkillList.Intrigue ],
					count: 2
				}),
				FactoryLogic.feature.createLanguageChoice({
					id: 'career-age-of-secrets-journalist-feature-3',
					count: 1
				}),
				FactoryLogic.feature.createBonus({
					id: 'career-age-of-secrets-journalist-feature-4',
					field: FeatureField.Renown,
					value: 1
				}),
				FactoryLogic.feature.createPerk({
					id: 'career-age-of-secrets-journalist-feature-5',
					lists: [ PerkList.Intrigue ]
				})
			],
			incitingIncidents: {
				options: [
					{ id: 'career-age-of-secrets-journalist-ii-1', name: 'Silenced Story', description: 'Your investigation was shut down - and those responsible came after you.' },
					{ id: 'career-age-of-secrets-journalist-ii-2', name: 'Witness to Horror', description: 'You recorded something no one else survived. You can’t forget it.' },
					{ id: 'career-age-of-secrets-journalist-ii-3', name: 'Public Enemy', description: 'Your work exposed powerful figures. Now you’re the target.' },
					{ id: 'career-age-of-secrets-journalist-ii-4', name: 'Fabricated Truth', description: 'You were forced to publish a lie - and it cost lives.' },
					{ id: 'career-age-of-secrets-journalist-ii-5', name: 'Disappearing Sources', description: 'Your contacts began vanishing one by one.' },
					{ id: 'career-age-of-secrets-journalist-ii-6', name: 'The Big One', description: 'You found the story that changes everything. Now you have to survive long enough to tell it.' }
				],
				selected: null
			}
		},
		{
			id: 'career-age-of-secrets-salvager',
			name: 'Salvager',
			description: 'You made a living recovering valuables from ruins, battlefields, and disasters.',
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'career-age-of-secrets-salvager-feature-1',
					selected: [ 'Endurance' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'career-age-of-secrets-salvager-feature-2',
					listOptions: [ SkillList.Exploration ],
					count: 2
				}),
				FactoryLogic.feature.createBonus({
					id: 'career-age-of-secrets-salvager-feature-3',
					field: FeatureField.ProjectPoints,
					value: 240
				}),
				FactoryLogic.feature.createPerk({
					id: 'career-age-of-secrets-salvager-feature-4',
					lists: [ PerkList.Exploration ]
				})
			],
			incitingIncidents: {
				options: [
					{ id: 'career-age-of-secrets-salvager-ii-1', name: 'Too Late', description: 'You arrived at a site after someone else - and found only bodies.' },
					{ id: 'career-age-of-secrets-salvager-ii-2', name: 'Unstable Ground', description: 'A collapse or explosion nearly killed you.' },
					{ id: 'career-age-of-secrets-salvager-ii-3', name: 'Claim Jumped', description: 'A rival stole your haul - and your reputation.' },
					{ id: 'career-age-of-secrets-salvager-ii-4', name: 'Living Ruin', description: 'Something in the wreckage fought back.' },
					{ id: 'career-age-of-secrets-salvager-ii-5', name: 'Moral Line', description: 'You took something you shouldn’t have.' },
					{ id: 'career-age-of-secrets-salvager-ii-6', name: 'Last Job', description: 'A salvage operation went so wrong you walked away from the life - for now.' }
				],
				selected: null
			}
		}
	],
	classes: [
		thaumaturge
	],
	complications: [
		{
			id: 'comp-creature-of-masks',
			name: 'Creature of Masks',
			description: `
Regardless of your apparent ancestry, you are a síabhra underneath – one who has adopted so many identities over the years that they have lost contact with their original form.

**Note**: You can’t take this complication if you’re a síabhra.

**Note**: This complication can be chaotic. Be sure you know what you’re doing before you choose it.`,
			features: [
				FactoryLogic.feature.create({
					id: 'comp-creature-of-masks-bd',
					name: 'Creature of Masks',
					description: 'If you take psychic damage, during your next respite you must change your ancestry. You should select your new ancestry, and its purchased traits, at random.'
				})
			]
		},
		{
			id: 'comp-elemental-resonance',
			name: 'Elemental Resonance',
			description: 'One elemental force answers you a little too eagerly.',
			features: [
				FactoryLogic.feature.create({
					id: 'comp-elemental-resonance-b',
					name: 'Elemental Resonance Benefit',
					description: 'Choose fire, lightning, cold, poison, corruption, or psychic damage. You gain immunity to that damage type equal to your echelon.'
				}),
				FactoryLogic.feature.create({
					id: 'comp-elemental-resonance-d',
					name: 'Elemental Resonance Drawback',
					description: 'When you take damage of that type, your presence becomes obvious and unstable; you take a bane on tests to hide, lie low, or avoid notice.'
				})
			]
		},
		{
			id: 'comp-instinctive-aggression',
			name: 'Instinctive Aggression',
			description: 'Something in you answers danger before your mind does.',
			features: [
				FactoryLogic.feature.create({
					id: 'comp-instinctive-aggression-b',
					name: 'Instinctive Aggression Benefit',
					description: 'You gain an edge on Brag and Intimidate tests.'
				}),
				FactoryLogic.feature.create({
					id: 'comp-instinctive-aggression-d',
					name: 'Instinctive Aggression Drawback',
					description: 'When a creature openly challenges your claim, authority, or place in a scene, you take a double bane on tests to withdraw, surrender, or accept humiliation until the end of the scene.'
				})
			]
		},
		{
			id: 'comp-scent-memory',
			name: 'Scent-Memory',
			description: 'You remember people and places by scent, vibration, or some other almost-animal cue.',
			features: [
				FactoryLogic.feature.create({
					id: 'comp-scent-memory-b',
					name: 'Scent-Memory Benefit',
					description: 'You gain an edge on tests to identify whether you’ve encountered a creature, object, or place before.'
				}),
				FactoryLogic.feature.create({
					id: 'comp-scent-memory-d',
					name: 'Scent-Memory Drawback',
					description: 'Strong smells (like blood, rot, smoke, or fear) can overwhelm you; in a scene dominated by one of those sensations, you take a bane on tests requiring concentration or delicate social reading.'
				})
			]
		},
		{
			id: 'comp-volatile-core',
			name: 'Volatile Core',
			description: 'Power builds in you and escapes when pressed.',
			features: [
				FactoryLogic.feature.create({
					id: 'comp-volatile-core-b',
					name: 'Volatile Core Benefit',
					description: 'Choose fire, lightning, cold, poison, corruption, or psychic damage. The first time each encounter you roll a tier 3 result on a strike, one creature adjacent to the target takes damage of that type equal to your echelon.'
				}),
				FactoryLogic.feature.create({
					id: 'comp-volatile-core-d',
					name: 'Volatile Core Drawback',
					description: 'The first time each encounter you become winded, each adjacent ally or object takes damage of that type equal to your echelon.'
				})
			]
		}
	],
	cultures: [
		FactoryLogic.createCulture('Serne', 'Urban / Bureaucratic / Martial.', CultureType.Regional, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.martial, 'Serne'),
		FactoryLogic.createCulture('Eravian Imperium', 'Urban / Bureaucratic / Noble.', CultureType.Regional, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.noble, 'Eravian'),
		FactoryLogic.createCulture('Sirovya', 'Rural / Bureaucratic / Martial.', CultureType.Regional, EnvironmentData.rural, OrganizationData.bureaucratic, UpbringingData.martial, 'Sirovy'),
		FactoryLogic.createCulture('Svelland', 'Wilderness / Communal / Martial.', CultureType.Regional, EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.martial, 'Svellese'),
		FactoryLogic.createCulture('Telos', 'Urban / Bureaucratic / Creative.', CultureType.Regional, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.creative, 'Telosi'),
		FactoryLogic.createCulture('Valedier', 'Urban / Bureaucratic / Noble.', CultureType.Regional, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.noble, 'Valedien'),
		FactoryLogic.createCulture('Miris', 'Urban / Communal / Academic.', CultureType.Regional, EnvironmentData.urban, OrganizationData.communal, UpbringingData.academic, 'Valedien'),
		FactoryLogic.createCulture('Dwarfholds', 'Secluded / Bureaucratic / Labor.', CultureType.Regional, EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.labor, 'Khezdath'),
		FactoryLogic.createCulture('Ithyr', 'Secluded / Bureaucratic / Noble.', CultureType.Regional, EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.noble, 'Eladrith'),
		FactoryLogic.createCulture('Icewell', 'Urban / Bureaucratic / (any upbringing).', CultureType.Regional, EnvironmentData.urban, OrganizationData.bureaucratic, undefined, 'Serne'),
		FactoryLogic.createCulture('Dejim', 'Rural / Communal / Martial.', CultureType.Regional, EnvironmentData.rural, OrganizationData.communal, UpbringingData.martial, 'Dejiman'),
		FactoryLogic.createCulture('Jhazren', 'Wilderness / Communal / Creative.', CultureType.Regional, EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.creative, 'Jhazrendish'),
		FactoryLogic.createCulture('Ryvos', 'Nomadic / Bureaucratic / Martial.', CultureType.Regional, EnvironmentData.nomadic, OrganizationData.bureaucratic, UpbringingData.martial, 'Ryvian'),
		FactoryLogic.createCulture('Kalai', 'Rural / Bureaucratic / Martial.', CultureType.Regional, EnvironmentData.rural, OrganizationData.bureaucratic, UpbringingData.martial, 'Kalish'),
		FactoryLogic.createCulture('Gauthek', 'Urban / Bureaucratic / Martial.', CultureType.Regional, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.martial, 'Gaureth'),
		FactoryLogic.createCulture('Rookery', 'Urban / Anarchic / Illegal.', CultureType.Regional, EnvironmentData.urban, OrganizationData.communal, UpbringingData.lawless, 'Serne'),
		FactoryLogic.createCulture('Mistrunner', 'Wilderness / Anarchic / Labor.', CultureType.Regional, EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.labor, 'Lirian'),
		FactoryLogic.createCulture('Water Folk', 'Nomadic / Communal / Labor.', CultureType.Regional, EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.labor, 'Serne'),
		FactoryLogic.createCulture('Bhawaran', 'Nomadic / Communal / Martial.', CultureType.Regional, EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.martial, 'Bhawaran'),
		FactoryLogic.createCulture('Kaza', 'Nomadic / Communal / Martial.', CultureType.Regional, EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.martial, 'Azhari'),
		FactoryLogic.createCulture('Lowai Pora', 'Secluded / Communal / Labor.', CultureType.Regional, EnvironmentData.secluded, OrganizationData.communal, UpbringingData.labor, 'Lowai'),
		FactoryLogic.createCulture('Stormwrack', 'Urban / Anarchic / (any upbringing).', CultureType.Regional, EnvironmentData.urban, OrganizationData.communal, undefined, 'Serne'),
		FactoryLogic.createCulture('Wolkenritter', 'Urban / Anarchic / Martial.', CultureType.Regional, EnvironmentData.urban, OrganizationData.communal, UpbringingData.martial)
	],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [
		FactoryLogic.createItem({
			id: 'item-aos-cinderwake-dust',
			name: 'Cinderwake Dust',
			description: 'A packet of metallic powder warm to the touch.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A jar of lava.',
				source: 'Texts or lore in Elemental',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'As a maneuver, scatter the dust in a 3 cube within 10. Each enemy in the area takes 1 fire damage, and the area is lightly obscured by ash until the end of your next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-horn-of-the-chase',
			name: 'Horn of the Chase',
			description: 'A small polished horn banded in leather.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'The horn of a devil that was killed by a beast',
				source: 'Texts or lore in Fae',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'As a maneuver, sound the horn. Choose up to three allies within 10 squares. Each target can shift 2 toward the same enemy, objective, or exit.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-prowlers-resin',
			name: 'Prowler\'s Resin',
			description: 'A clay pot of dark resin mixed with ash and crushed leaves.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'The corpse of a lightbender',
				source: 'Texts or lore in Fae',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'As a maneuver, smear the resin across your armor, clothing, or skin. Until the end of the encounter, you gain an edge on Hide tests, and the first time you become hidden this encounter, you can shift 2.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-siege-blessed-rivets',
			name: 'Siege-Blessed Rivets',
			description: 'A packet of rune-marked rivets, seals, and metal patches.',
			type: ItemType.Consumable1st,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A piece of metal armor stolen during a battle',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Might, Characteristic.Reason ],
				goal: 45
			}),
			effect: 'Apply these during a respite to one piece of armor, a shield, or a worn item. Until your next respite, the next forced movement that would move you is negated.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-repair-spider',
			name: 'Repair Spider',
			description: 'A tiny clockwork construct folded into a brass capsule.',
			type: ItemType.Consumable1st,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A fragment of brass from an animated statue',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason ],
				goal: 45
			}),
			effect: 'As a maneuver, release the spider onto an ironbound or an object within 1 square. If the target has Stamina, it regains Stamina equal to your recovery value; otherwise, one broken mundane feature of it is repaired.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-stormglass-vial',
			name: 'Stormglass Vial',
			description: 'A sealed glass tube containing a captive spark.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'The breath of a lightning elemental',
				source: 'Texts or lore in Elemental',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'As a maneuver, break the vial. Until the end of your turn, your movement ignores difficult terrain, and your next strike this turn deals an additional 1d6 fire, lightning, or cold damage.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-trackers-mantle',
			name: 'Tracker\'s Mantle',
			description: 'A cured mantle stitched with scent-masking herbs and tiny bone tags.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Neck ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'The clothes of a hunter who has never lost the trail of their prey',
				source: 'Texts or lore in Fae',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: 'You gain an edge on Hide, Sneak, and Track tests made in wilderness environments.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-lodestone-mantle',
			name: 'Lodestone Mantle',
			description: 'A cloak stitched with eldritch symbols, its clasp made of a thumb-sized stone that vibrates near strong elemental forces.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Neck ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A magnet from a different manifold',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'Choose one damage type: fire, lightning, or cold. When you deal damage with a strike that deals untyped damage, you can change the damage to the chosen type.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-smoke-round',
			name: 'Smoke Round',
			description: 'A squat shell with a soft ceramic tip.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A packet of smoke powder; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'You can use this ammunition when making a strike with a firearm. Instead of its normal effect, the shot creates a 1 cube of smoke in the target\'s space or an adjacent unoccupied space. The area is heavily obscured until the end of your next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-transformation-potion',
			name: 'Transformation Potion',
			description: 'A shimmering blue potion with flecks of purple.',
			type: ItemType.Consumable1st,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'Skin from a siabhra',
				source: 'Texts or lore in Fae',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: 'After drinking this potion, you take on the physical form of the next humanoid you touch. Your clothing doesn\'t change, but your size can change to match them (to a minimum of 1S and a maximum of 1L). This is a purely cosmetic change; you don\'t gain any abilities that they have due to their physiology. You retain this appearance until one hour after drinking the potion.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-trophy-cord-of-the-first-hunt',
			name: 'Trophy-Cord of the First Hunt',
			description: 'A braided cord strung with teeth, claws, feathers, and old beads.',
			type: ItemType.Consumable1st,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'The pelt of an extinct animal',
				source: 'Texts or lore in Fae',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'When you score a tier 3 result on a melee strike, you gain temporary Stamina equal to your echelon.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-aetherflare',
			name: 'Aetherflare',
			description: 'A humming cobalt round that leaves motes of blue light in the air.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A shard of fulgurite; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'You can use this ammunition when making a strike with a firearm. The strike deals +1 lightning damage. Until the end of your next turn, the target can\'t gain concealment and can\'t hide. On a tier 3 result, the target also has a bane on their next strike.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-dragonbreath-round',
			name: 'Dragonbreath Round',
			description: 'A paper-wrapped cartridge dusted with red alchemical powder.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A flask of alchemical fire; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'You can use this ammunition when making a strike with a firearm. The strike deals +2 fire damage. If the strike gets a tier 3 result, the target also takes 2 fire damage at the end of their next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-entangling-shot',
			name: 'Entangling Shot',
			description: 'A cartridge packed with wirevine lament.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A spool of wirevine; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'You can use this ammunition when making a strike with a firearm. The strike deals -2 damage, but on a tier 2 result the target can\'t shift until the end of their next turn, and on a tier 3 result the target is restrained until the end of their next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-frost-round',
			name: 'Frost Round',
			description: 'A pale blue cartridge cold enough to mist in the hand.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A shard of frost crystal; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'You can use this ammunition when making a strike with a firearm. The strike deals cold damage instead of its normal damage type. On a tier 2 or 3 result, the target is slowed until the end of their next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-flash-round',
			name: 'Flash Round',
			description: 'A thin silver cartridge with a mirrored cap.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A packet of phosphor powder; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'You can use this ammunition when making a strike with a firearm. The strike deals -2 damage, but on a tier 2 or 3 result the target has a bane on their next strike. On a tier 3 result, the target is also dazed until the end of their next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-salt-shell',
			name: 'Salt Shell',
			description: 'A chalky shell stamped with a white sigil.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A packet of consecrated rock salt; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'You can use this ammunition when making a strike with a firearm. The strike deals damage as normal, but if it reduces a creature to 0 Stamina, that creature falls unconscious instead of dying. Against undead or demon targets, the strike deals +2 holy damage.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-malite-round',
			name: 'Malite Round',
			description: 'A heavy cartridge with a visibly unstable malite crystal seated in the casing.',
			type: ItemType.Consumable2nd,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A shard of malite; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 90
			}),
			effect: 'You can use this ammunition when making a strike with a firearm. The strike deals +4 fire damage. Each enemy adjacent to the target takes 2 fire damage.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-smoke-grenade',
			name: 'Smoke Grenade',
			description: 'A matte-black grenade hisses for half a heartbeat before vomiting thick gray smoke.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A grenade shell, soot from a signal tower, and alchemical smoke salts',
				source: 'Quartermaster manuals in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason ],
				goal: 45
			}),
			effect: 'As a main action, throw the grenade into an unoccupied square within 6. At the start of your next turn, it creates a 3 cube of smoke that lasts until the end of that turn. Creatures inside the smoke have concealment, and creatures outside the cube take a bane on strikes targeting into it.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-aether-grenade',
			name: 'Aether Grenade',
			description: 'A small ceramic sphere that contains tightly-packed shrapnel surrounding a volatile aether charge.',
			type: ItemType.Consumable2nd,
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A pouch of iron shot; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 90
			}),
			effect: `
You can use the following ability when you throw the aether grenade.
 
Power Roll + Might or Agility; Area, Weapon; Main action; 3 cube within 5; each creature and object in the area:
 
* 11 or lower: 6 fire damage; push 1
* 12-16: 9 fire damage; push 2
* 17+: 12 fire damage; push 3
 
Objects, vehicles, and structures take double damage from this effect.`
		}),
		FactoryLogic.createItem({
			id: 'item-aos-breaching-charge',
			name: 'Breaching Charge',
			description: 'A flat magnetized packet of malite paste and brass timing strips adheres with a hard metallic thunk.',
			type: ItemType.Consumable2nd,
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'Refined malite, a brass pressure shell, and a siege fuse',
				source: 'Demolition notes in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 90
			}),
			effect: `
As a main action, place the charge on an adjacent object of at least size 1L. At the start of your next turn, it detonates.
 
Power Roll + Reason; Area, Weapon; 3 cube; each enemy and object in the area:
 
* 11 or lower: 4 damage; M<0 push 2 away from the center of the burst and prone
* 12-16: 6 damage; M<1 push 2 away from the center of the burst and prone
* 17+: 8 damage; M<2 push 2 away from the center of the burst and prone
 
Objects, vehicles, and structures take double damage from this effect. The area becomes difficult terrain until the end of your next turn.`
		}),
		FactoryLogic.createItem({
			id: 'item-aos-flash-grenade',
			name: 'Flash Grenade',
			description: 'A small ceramic sphere packed with mirrored foil and a volatile aether charge.',
			type: ItemType.Consumable2nd,
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A pouch of magnesium powder; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 90
			}),
			effect: `
You can use the following ability when you throw the flash grenade.
 
Power Roll + Might or Agility; Area, Weapon; Main action; 3 cube within 5; each enemy and object in the area:
 
* 11 or lower: each target takes a bane on their next strike
* 12-16: each target takes a bane on their next strike
* 17+: each target takes a bane on their next strike; dazed (EoT)`
		}),
		FactoryLogic.createItem({
			id: 'item-aos-gas-grenade',
			name: 'Gas Grenade',
			description: 'A brass canister vents a crawling yellow cloud that gets into eyes, throats, and lungs.',
			type: ItemType.Consumable2nd,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A grenade shell, choking salts, and preserved bile sacs',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 90
			}),
			effect: `
As a main action, throw the grenade into an unoccupied square within 6. It creates a 2 cube of thin gas until the end of your next turn. The area is lightly obscured.
 
When the cloud appears, and whenever a creature who needs to breathe starts their turn in it, that creature makes an Agility test:
 
* 11 or lower: 5 poison damage; weakened (save ends)
* 12-16: 3 poison damage; weakened (EoT)
* 17+: no effect`
		}),
		FactoryLogic.createItem({
			id: 'item-aos-incendiary-grenade',
			name: 'Incendiary Grenade',
			description: 'A brutal anti-personnel grenade that bursts into flame when thrown.',
			type: ItemType.Consumable2nd,
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A skin of oil; a vial of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 90
			}),
			effect: `
You can use the following ability when you throw the incendiary grenade.
 
Power Roll + Might or Agility; Area, Weapon; Main action; 3 cube within 5; each enemy and object in the area:
 
* 11 or lower: 4 fire damage
* 12-16: 6 fire damage
* 17+: 8 fire damage
 
The area becomes burning terrain until the end of your next turn. Creatures that start their turn in the area suffer 2 fire damage.`
		}),
		FactoryLogic.createItem({
			id: 'item-aos-orcsteel-shield',
			name: 'Orcsteel Shield',
			description: 'A shield forged from dionium, colossally heavy and all but impossible to dent or melt.',
			type: ItemType.LeveledArmor,
			keywords: [ KitArmor.Shield, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A sheet of orcsteel; a master smith\'s forge',
				source: 'Metallurgy texts in Kalai',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: '1st Level: +3 Stamina; the shield can\'t be damaged, melted, or destroyed by anything short of an artifact. 5th Level: Stamina bonus becomes +6; +1 Stability. 9th Level: Stamina bonus becomes +9; Stability bonus becomes +2.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-shield-1', field: FeatureField.Stamina, value: 3 })
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-shield-5a', field: FeatureField.Stamina, value: 6 }),
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-shield-5b', field: FeatureField.Stability, value: 1 })
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-shield-9a', field: FeatureField.Stamina, value: 9 }),
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-shield-9b', field: FeatureField.Stability, value: 2 })
					]
				}
			]
		}),
		FactoryLogic.createItem({
			id: 'item-aos-orcsteel-armor',
			name: 'Orcsteel Armor',
			description: 'Heavy plate cast from dionium: nearly indestructible, and impossible to move quietly in.',
			type: ItemType.LeveledArmor,
			keywords: [ KitArmor.Heavy, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A suit\'s worth of orcsteel plate; a master smith\'s forge',
				source: 'Metallurgy texts in Kalai',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: '1st Level: +6 Stamina; the armour can\'t be damaged, melted, or destroyed by anything short of an artifact; you have a bane on tests to move silently, hide, or otherwise avoid notice. 5th Level: Stamina bonus becomes +12; +1 Stability. 9th Level: Stamina bonus becomes +21; Stability bonus becomes +2.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-armor-1', field: FeatureField.Stamina, value: 6 })
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-armor-5a', field: FeatureField.Stamina, value: 12 }),
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-armor-5b', field: FeatureField.Stability, value: 1 })
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-armor-9a', field: FeatureField.Stamina, value: 21 }),
						FactoryLogic.feature.createBonus({ id: 'item-aos-orcsteel-armor-9b', field: FeatureField.Stability, value: 2 })
					]
				}
			]
		}),
		FactoryLogic.createItem({
			id: 'item-aos-orcsteel-weapon',
			name: 'Orcsteel Weapon',
			description: 'A weapon cast from dionium falls like an anvil and never chips, dulls, or breaks - least forgiving of all when swung to crush.',
			type: ItemType.LeveledWeapon,
			keywords: [ KitWeapon.Medium, KitWeapon.Heavy, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A billet of orcsteel; a master smith\'s forge',
				source: 'Metallurgy texts in Kalai',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: '1st Level: +1 damage; the weapon can\'t be damaged, dulled, or destroyed except by an artifact; it is too heavy to be a light weapon; on a tier 3 strike, push the target 1. 5th Level: +2 damage; the push becomes 2, and a target pushed is knocked prone if it has M < [average]. 9th Level: +3 damage; the push becomes 3, prone if M < [strong]; your strikes deal double damage to objects and unattended structures.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createAbilityDamage({ id: 'item-aos-orcsteel-weapon-1', name: '', keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ], value: 1 })
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.createAbilityDamage({ id: 'item-aos-orcsteel-weapon-5', name: '', keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ], value: 2 })
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.createAbilityDamage({ id: 'item-aos-orcsteel-weapon-9', name: '', keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ], value: 3 })
					]
				}
			]
		}),
		FactoryLogic.createItem({
			id: 'item-aos-aether-cell',
			name: 'Aether Cell',
			description: 'A palm-sized glass-and-brass capsule full of refined aether, warm to the touch and faintly luminous in darkness.',
			type: ItemType.Consumable1st,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A sealed glass capsule, refined aether, and brass contact fittings',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'An aether cell has 4 charges. As a maneuver, you can install an aether cell into a Bright or bionic within your reach that is designed to accept one. Each device requires its own installed cell; one cell cannot power two devices at once. While installed, the device can spend the cell\'s charges to power its abilities. When the cell\'s last charge is spent, it becomes inert until recharged. If an aether cell is broken (which requires taking 10 damage), the aether escapes and causes an aether surge (roll on the aether surge table).'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-aetherlight-lamp',
			name: 'Aetherlight Lamp',
			description: 'A brass lamp with frosted crystal panels hums with pale blue radiance.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Hands, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A hooded lantern, powdered sunstone',
				source: 'Weavewright schematics in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: 'While holding the lamp, you can use a maneuver to hood or unhood it. When unhooded, it sheds bright light in a 5 aura; creatures and objects in the aura can\'t benefit from concealment granted only by darkness. You gain an edge on Search tests that rely on sight while the lamp is lit.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-armor-arcane',
			name: 'Armor Arcane',
			description: 'A smooth metal torc projects a faint geometric shimmer around its wearer.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Neck, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A polished torc, a fragment of protective sigilwork',
				source: 'Defensive formulae in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: 'While wearing this torc and not wearing medium or heavy armor, you gain +3 Stamina.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-brightsuit',
			name: 'Brightsuit',
			description: 'This tailored coat and waistcoat somehow never wrinkle, stain, or smell of smoke.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Neck, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'Fine formalwear, a vial of alchemical detergent',
				source: 'Tailor-guild manuals in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Presence ],
				goal: 150
			}),
			effect: 'While wearing the suit, you gain an edge on tests to endure cold, smoke, soot, grime, and similar urban hardship. Additionally, the first Presence test you make after each respite gains an edge, provided you have spent at least 1 minute cleaning and dressing in the suit.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-cipherwheel-ring',
			name: 'Cipherwheel Ring',
			description: 'A brass signet ring whose tiny inner wheels realign themselves whenever you hold coded text.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ring ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A signet ring and a page of ciphered military correspondence',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: 'You gain an edge on Reason tests to decode, encode, authenticate, or detect tampering in messages, maps, manifests, and orders. If you spend 1 minute examining a written document, you can tell whether it has been altered, forged, or copied from another source.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-deckhand-s-balance-charm',
			name: 'Deckhand\'s Balance Charm',
			description: 'A thin chain with a tiny lead weight constantly twitches to counter your motion.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Neck, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A sailor\'s lucky charm and ballast taken from a wreck',
				source: 'Quartermaster lore in Khezdath',
				characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
				goal: 150
			}),
			effect: 'Forced movement against you is reduced by 1 square. Additionally, when you would be knocked prone by a slick deck, violent roll, sudden lurch, or similar environmental movement, you can stay standing.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-false-seal-stylus',
			name: 'False-Seal Stylus',
			description: 'A thin silver pen with a retractable heated nib and a tiny chamber of shimmering blue ink.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Hands, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A silver stylus, wax from three official seals, and a drop of aether',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Presence ],
				goal: 150
			}),
			effect: 'If you spend 1 minute using the stylus on papers, tags, manifests, or permits, you can create a convincing official-looking version of them. The first test made to pass off or inspect these papers gains a double edge for you and a bane for the opposing creature.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-instant-polyglot',
			name: 'Instant Polyglot',
			description: 'This tiny earring grows warm whenever anyone nearby speaks.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A silver earring, a page torn from a multilingual dictionary',
				source: 'Diplomatic glossaries in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Presence ],
				goal: 150
			}),
			effect: 'While wearing the earring, you can understand any spoken language within 3 squares. If you study a nonmagical text for 1 minute, you understand its broad meaning. In negotiations, language barriers never impose a bane on your tests.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-mage-glasses',
			name: 'Mage-Glasses',
			description: 'Thin spectacles with faintly glowing rims reveal the hum of nearby magic.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A pair of spectacles and residue from a dispelled ward',
				source: 'Lecture notes in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: 'As a maneuver, you scan a 5 aura until the end of your next turn. Powered devices, wards, ongoing supernatural effects, and creatures sustained by magic or psionics in the area can\'t be hidden from you. The first Search or Reason test you make involving something detected this way gains a double edge.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-message-bright',
			name: 'Message Bright',
			description: 'A thumb-sized recording cylinder clicks softly when it stores a voice.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A hollow brass cylinder, wax from a funeral candle',
				source: 'Telegraph office notes in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Presence ],
				goal: 150
			}),
			effect: 'As a maneuver, record up to ten spoken words into the Bright. As a maneuver, any creature holding it can replay the message in your voice.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-whisperbutton',
			name: 'Whisperbutton',
			description: 'A matte-black brass collar stud made to resemble an unremarkable shirt button.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Neck, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A brass button, velvet thread, and ash from a burned confession',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Intuition, Characteristic.Presence ],
				goal: 150
			}),
			effect: 'While wearing the button, you can speak in a whisper and be clearly heard by one creature within 5 squares, and no other creature farther than 1 square away can hear you. You gain an edge on tests to pass secret instructions unnoticed during a social or combat scene.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-aetherstim',
			name: 'Aetherstim',
			description: 'A heavy glass-and-steel injector hisses softly when primed.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Arms, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A large syringe, distilled vitae salts',
				source: 'Hospital notes in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'As a maneuver, you inject yourself or an adjacent willing creature. The target can immediately spend a Recovery; if they do, they regain 5 additional Stamina. If the target has no Recoveries remaining, they instead regain 8 Stamina.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-communicator',
			name: 'Communicator',
			description: 'A discreet earpiece of brass and crystal carries whispers across impossible distances.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A matched pair of silver earpieces, a length of copper thread',
				source: 'Military signals manuals in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Presence ],
				goal: 300
			}),
			effect: 'Crafted as a linked set. Wearers can whisper to one another anywhere on the same world. Additionally, once per round when a linked ally within 10 squares uses an ability after hearing you, that ally can shift 1 before or after the ability resolves.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-crowd-control',
			name: 'Crowd Control',
			description: 'A steel bracer vents thunder with a violent backward kick.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Arms, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A bracer reinforced with resonant copper plates',
				source: 'Riot-control field reports in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Presence ],
				goal: 300
			}),
			effect: 'You can use the following ability; once you have used it, you cannot use it again until you have gained a Victory. Crowd Control Power Roll + Reason or Presence; Keywords: Area, magic; Main action; Range: 2 burst; Target: Each enemy in the area; Tier 1: 3 sonic damage; push 2; Tier 2: 5 sonic damage; push 3; Tier 3: 7 sonic damage; push 4; Effect: If a target ends this forced movement adjacent to a wall, vehicle, or similarly solid obstacle, they fall prone.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-falseface-collar',
			name: 'Falseface Collar',
			description: 'A stiff military collar lined with crystalline filaments that hum against the throat.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Neck ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A dress collar, a stage actor\'s mask, and a lock of hair freely given',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
				goal: 300
			}),
			effect: 'As a maneuver, alter your voice, posture, and facial details until the end of the encounter or for 1 hour outside combat. Creatures who don\'t know you personally take a bane on tests to identify you. Your first Presence test to impersonate someone during the effect gains a double edge.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-float-harness',
			name: 'Float Harness',
			description: 'This leather rig is fitted with humming brass vanes and a tiny venting engine.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Waist, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A climbing harness, an intact skyship stabilizer fin',
				source: 'Aeronaut notebooks in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'You reduce the effective height of any fall by 10 squares. Additionally, as a free triggered action when you would fall or be force-moved over an edge, you can fly 4 squares and then land standing.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-ghostlight-beacon',
			name: 'Ghostlight Beacon',
			description: 'A palm-sized beacon projects a thin, cold blue lantern-flame.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A signal lantern, a pinch of grave ash',
				source: 'Veilwatch reports in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'As a maneuver, place or throw the beacon into an unoccupied square within 6 squares. It creates a 2 aura of ghostlight until the end of the encounter. Creatures in the aura can\'t hide, and creatures from beyond the Veil take 2 lightning damage the first time each round they enter the aura or start their turn there.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-lifeline-winch',
			name: 'Lifeline Winch',
			description: 'A compact belt-mounted winch fires a hooked line with a violent metallic snap.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Waist, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A mooring hook, a spring reel, and braided phase-silk',
				source: 'Rescue service manuals in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'As a free triggered action when you or an ally within 6 squares would fall, be pushed over an edge, or be swept away by water or wind, you fire the winch. Move that creature up to 4 squares to the nearest safe space adjacent to a solid surface, railing, ladder, or anchored object. If there is no such space, the creature instead ends hanging securely from the line and doesn\'t continue falling. Once used, you cannot use it again until you have gained a Victory.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-rebreather',
			name: 'Rebreather',
			description: 'This folding brass mask opens like a steel flower and fills with softly humming blue vapor.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A diving mask, preserved fish gills, and pearl dust',
				source: 'Naval dive notes in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'As a maneuver, you activate the rebreather for 1 hour. While active, you can breathe underwater or in any otherwise unbreathable environment, and you ignore harmful gas, smoke, and inhaled poison.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-signal-scrambler',
			name: 'Signal Scrambler',
			description: 'This pocket-sized crystal buzzer emits faint static that makes other devices mutter nonsense.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A crystal tuning fork, copper mesh, and a shattered telegraph insulator',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'As a maneuver, create a 3 aura centered on yourself until the end of your next turn. Supernatural communication, remote listening, and paired-device transmission can\'t pass into or out of the aura, and enemies in the aura can\'t gain an edge from spoken instructions or coordinated signals. Once used, you cannot use it again until you have gained a Victory.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-skyhook-harness',
			name: 'Skyhook Harness',
			description: 'This leather chest rig ends in a magnetized blue hook designed for boarding actions and emergency retrieval.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Waist, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A boarding harness, a grapnel, and a sliver of skyship fin',
				source: 'Marine boarding notes in Khezdath',
				characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason ],
				goal: 300
			}),
			effect: 'As a maneuver, fire the hook at a railing, mast, ladder, rigging point, or metal structure within 8 squares. You can then either pull yourself up to 4 squares in a straight line without provoking opportunity attacks, or pull a willing adjacent ally 3 squares toward you.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-smokeshroud-projector',
			name: 'Smokeshroud Projector',
			description: 'A wrist-mounted canister spits out a dense silver-gray curtain that smells faintly of ozone.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Arms, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A pressurized brass canister and soot from a burnt signal tower',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'As a maneuver, you create a 2 cube within 5 filled with smoke until the start of your next turn. Creatures inside the cube have concealment. You and each ally who starts their turn in the cube can shift 1. Once used, you cannot use it again until you have gained a Victory.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-veilstorm-gauge',
			name: 'Veilstorm Gauge',
			description: 'A disk of trembling needles and crystal fins chatters whenever reality wears thin.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A barometer, a shard of stormglass',
				source: 'Breach research in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'You can\'t be surprised by supernatural weather, planar ruptures, or echo-plane manifestations within 10 squares. Additionally, when a magic area effect or environmental hazard appears within 10 squares, you and each ally within 3 squares can shift 2.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-wiretap-beetle',
			name: 'Wiretap Beetle',
			description: 'This tiny mechanical beetle unfolds from a brass capsule and skitters where it is sent.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A brass scarab, hair-thin silver wire, and a preserved beetle shell',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'As a maneuver, place the beetle adjacent or send it to an unoccupied square within 10 you can see. Until the end of the encounter or for 10 minutes outside combat, you can hear as if in the beetle\'s space, gaining an edge on Eavesdrop and Search tests based on sound. The beetle can climb walls and ceilings.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-beacon-buoy',
			name: 'Beacon Buoy',
			description: 'A heavy anchor-shaped beacon drops with a splash or clang, then projects a humming field that steadies space itself.',
			type: ItemType.Trinket3rd,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A small anchor, an aether coil, and a fragment from a displaced device',
				source: 'Experimental engine notes in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 450
			}),
			effect: 'As a maneuver, place or throw the beacon into an unoccupied square within 6. It creates a 3 aura until the end of the encounter. Teleportation, phasing, displacement, and similar supernatural relocation can\'t begin or end inside the aura unless the creature succeeds on a hard test set by the Director. Hidden creatures in the aura can\'t benefit from concealment granted by distortion or mirage effects.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-breach-ward-locket',
			name: 'Breach Ward Locket',
			description: 'This silver locket contains a miniature ward-circle etched on rotating plates.',
			type: ItemType.Trinket3rd,
			keywords: [ AbilityKeyword.Neck, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A silver locket, dust from a broken wardstone, a sliver of veilglass',
				source: 'Anti-incursion protocols in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 450
			}),
			effect: 'Once per respite, as a maneuver, create a 3 wall within 5 squares that lasts until the end of the encounter. Creatures from beyond the Veil treat the wall as difficult terrain, and the first time each round one of them enters a wall square it takes 5 lightning damage.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-counterspy-lenses',
			name: 'Counterspy Lenses',
			description: 'These smoke-tinted spectacles reveal the outlines of people trying very hard not to be seen.',
			type: ItemType.Trinket3rd,
			keywords: [ AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'Darkened lenses, a spyglass from a scuttled ship, and soot from a watchfire',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 450
			}),
			effect: 'Hidden creatures within 10 squares can\'t be hidden from you if they moved since the end of their last turn. Illusions, disguises, and supernatural concealment take a bane on tests or effects made to fool you. Additionally, once per encounter, as a maneuver, choose one creature or square you can see within 10 squares; all allies gain an edge on strikes and Search tests involving that target until the end of your next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-echo-stepper-boots',
			name: 'Echo-Stepper Boots',
			description: 'These lacquered boots leave a delayed afterimage with every hurried step.',
			type: ItemType.Trinket3rd,
			keywords: [ AbilityKeyword.Feet, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'Riding boots, a spool of phase-silk, dust from a displaced footprint',
				source: 'Experimental transit notes in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 450
			}),
			effect: 'As a free triggered action when you are targeted by a strike, you teleport 3 squares. If the strike no longer has distance or line of effect, it misses; otherwise, you halve the damage from the strike. Once used, you cannot use it again until you have gained a Victory.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-ghost-pass-badge',
			name: 'Ghost-Pass Badge',
			description: 'A polished officer\'s badge that reflects uniforms you aren\'t actually wearing.',
			type: ItemType.Trinket3rd,
			keywords: [ AbilityKeyword.Neck, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'An officer\'s insignia, a paper pass signed under duress, and powdered mirror glass',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
				goal: 450
			}),
			effect: 'While wearing the badge, guards, sentries, and rank-and-file soldiers who can see you take a bane on tests to challenge your presence unless you give them a strong reason to do so. Additionally, when a creature would stop your movement with a maneuver or triggered action, you can spend Stamina equal to 1d6 plus your level to ignore that effect and continue moving.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-interceptor-prism',
			name: 'Interceptor Prism',
			description: 'A triangular crystal in a brass frame catches whispers, signals, and hostile intentions in flickers of light.',
			type: ItemType.Trinket3rd,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A flawless prism, copper wire from a telegraph coil, and a drop of aether from a cracked cell',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 450
			}),
			effect: 'As a free triggered action when an enemy within 10 squares gives an order, uses a support ability, or creates an effect that lets another creature move, shift, or make a strike, you can interfere: reduce that movement by 2, or impose a bane on the granted strike or test. Once used, you cannot use it again until you have gained a Victory.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-phantom-dispatch-tube',
			name: 'Phantom Dispatch Tube',
			description: 'A black courier tube lined in blue sigils vanishes its contents with a hush.',
			type: ItemType.Trinket3rd,
			keywords: [ AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A courier tube, a stamp from a dead empire, and soot from a telegraph office',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
				goal: 450
			}),
			effect: 'Once per respite, as a maneuver, place a Tiny object or written message into the tube and name a creature you know on the same world. If that creature is alive and not warded against transport or communication, the contents appear in their possession or adjacent to them. If delivery fails, the contents return to the tube at the end of your next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-stormglass-sextant',
			name: 'Stormglass Sextant',
			description: 'This dark brass sextant\'s needle points not to north, but to the nearest danger in sky or sea.',
			type: ItemType.Trinket3rd,
			keywords: [ AbilityKeyword.Hands, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A masterwork sextant, a shard of stormglass, and chart ink mixed with sea salt',
				source: 'Navigator archives in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 450
			}),
			effect: 'You can\'t be surprised by severe weather, supernatural storms, portals, or other major environmental hazards within 10 squares. Additionally, when an area effect, portal, or environmental hazard appears within 10 squares, you and each ally within 5 squares can shift 2.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-fine-motor-hand',
			name: 'Fine-Motor Hand',
			description: 'This articulated hand hums softly while its fingertips align themselves to the task.',
			type: ItemType.Trinket1st,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Hands, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic hand, silver wire, and clockmaker\'s tools',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason ],
				goal: 150
			}),
			effect: 'Passive; does not spend charges. You gain an edge on tests to pick pockets, palm objects, perform delicate work, or use tools such as lockpicks, jeweller\'s tools, or surgical equipment. Once per round, drawing or stowing a 1T object with this hand requires no action.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-inspector-s-eye',
			name: 'Inspector\'s Eye',
			description: 'Tiny brass shutters flick open and closed across this eye\'s surface as it focuses.',
			type: ItemType.Trinket1st,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic eye, a jeweler\'s loupe, and a page from an inspector\'s casebook',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: 'Passive; does not spend charges. You gain an edge on Search tests based on sight, and on tests to spot hidden details, read lips, or notice tampering.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-nightglass-eye',
			name: 'Nightglass Eye',
			description: 'A polished glass eye with a faint blue iris that widens in darkness.',
			type: ItemType.Trinket1st,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic eye, soot-polished lens glass, and a sliver of night crystal',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 150
			}),
			effect: 'Passive; does not spend charges. While the eye has an installed cell, darkness can\'t impose a bane on your Search tests within 5 squares, and creatures and objects within 5 squares can\'t benefit from concealment granted only by dim light or darkness against you.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-smuggler-s-sleeve-compartment',
			name: 'Smuggler\'s Sleeve Compartment',
			description: 'A prosthetic forearm opens along a hidden seam to reveal a velvet-lined cavity.',
			type: ItemType.Trinket1st,
			keywords: [ AbilityKeyword.Arms, 'Bionic' as AbilityKeyword, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic arm, a concealed spring latch, and a customs seal taken from seized contraband',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Presence ],
				goal: 150
			}),
			effect: 'Passive; does not spend charges. The compartment holds one Tiny item or document bundle. Tests to find it take a double bane unless the searcher already suspects the prosthetic. The first test each scene to smuggle, plant, or conceal such an item gains an edge.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-climber-s-armature',
			name: 'Climber\'s Armature',
			description: 'A reinforced arm with retractable grips and locking joints built for walls, ladders, and wrecks.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Arms, 'Bionic' as AbilityKeyword, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic arm, climbing claws, and a spool of braided wire',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason ],
				goal: 300
			}),
			effect: 'Passive; does not spend charges. You can automatically climb at full speed on stone, wood, rigging, brick, and similar rough surfaces, and you gain an edge on tests to climb, hold on, or keep your footing while hanging or swinging.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-courier-legs',
			name: 'Courier Legs',
			description: 'A matched pair of spring-loaded legs with whispering pistons at the calves.',
			type: ItemType.Trinket2nd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Feet, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A pair of prosthetic legs, tension springs, and a messenger\'s route map',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason ],
				goal: 300
			}),
			effect: 'Passive; does not spend charges. Your speed increases by 1. Additionally, once on each of your turns after you move at least 3 squares, you can shift 1.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-ghoststep-legs',
			name: 'Ghoststep Legs',
			description: 'These matte-black prosthetic legs absorb impact so completely they seem to erase the sound of motion.',
			type: ItemType.Trinket2nd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Feet, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A pair of prosthetic legs, velvet shock padding, and dust from a stage floor',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'You gain an edge on tests to move quietly, follow a target, or avoid notice while moving (passive; does not spend charges). Additionally, after you move at least 3 squares, you can spend 1 charge to gain concealment until the start of your next turn; once used, you can\'t use this again until you gain a Victory.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-grapnel-arm',
			name: 'Grapnel Arm',
			description: 'A reinforced prosthetic forearm conceals a spring-fired hook and cable.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Arms, 'Bionic' as AbilityKeyword, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic arm, a grapnel launcher, and braided cable',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason ],
				goal: 300
			}),
			effect: 'As a maneuver, spend 1 charge to fire the grapnel at an anchor within 8 squares. You can pull yourself up to 4 squares in a straight line without provoking opportunity attacks, or pull a willing adjacent ally up to 3 squares toward you.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-heavy-lift-arms',
			name: 'Heavy-Lift Arms',
			description: 'These thick-framed prosthetic arms lock into place before heavy exertion with a solid metallic clack.',
			type: ItemType.Trinket2nd,
			keywords: [ AbilityKeyword.Arms, 'Bionic' as AbilityKeyword, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A pair of prosthetic arms, reinforced steel braces, and forge slag from a lifting engine',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Might, Characteristic.Reason ],
				goal: 300
			}),
			effect: 'Passive; does not spend charges. You gain an edge on Might tests to lift, carry, shove, break, force open, or hold something shut, and on the Grab and Knockback maneuvers. As a drawback, delicate Agility tests that rely on both hands take a bane unless you spend 1 minute calibrating the arms beforehand.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-lockbreaker-hand',
			name: 'Lockbreaker Hand',
			description: 'A blackened steel hand with retractable picks, tension wires, and a pressure-sensitive thumb.',
			type: ItemType.Trinket2nd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Hands, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic hand, thieves\' tools, and a lockplate from a police evidence room',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'You gain a double edge on tests to pick locks, disarm traps, sabotage mechanisms, or open secured containers quietly (passive; does not spend charges). Additionally, you can spend 1 charge to open or jam an adjacent mundane lock or latch as a maneuver without a test; once used, you can\'t use this again until you gain a Victory.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-shock-palm',
			name: 'Shock Palm',
			description: 'A copper-lined prosthetic hand stores a brutal aether discharge behind the knuckles.',
			type: ItemType.Trinket2nd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Hands, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic hand, an induction coil, and a spent constabulary shock-cell',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason ],
				goal: 300
			}),
			effect: 'Once per turn when you hit a creature with a melee free strike or unarmed attack using this hand, spend 1 charge: that creature takes +2 lightning damage and can\'t make opportunity attacks until the start of its next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-stability-leg',
			name: 'Stability Leg',
			description: 'A weighted prosthetic leg with a gyroscopic knee and locking ankle.',
			type: ItemType.Trinket2nd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Feet, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic leg, a gyroscopic bearing, and ballast lead',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'Passive; does not spend charges. You can\'t be knocked prone or force-moved against your will while you have at least one foot planted, and you gain an edge on tests to resist being moved or to keep your balance on unstable ground.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-telltale-eye',
			name: 'Telltale Eye',
			description: 'A smoky glass eye that flashes pale whenever it catches falsehood, disguise, or distortion.',
			type: ItemType.Trinket2nd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic eye, smoked crystal, and a fragment of mirrored disguise glass',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 300
			}),
			effect: 'Illusions, disguises, and mundane concealment take a bane on tests or effects made to fool you. Hidden creatures within 5 squares who moved since the end of their last turn can\'t be hidden from you.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-marksman-s-eye',
			name: 'Marksman\'s Eye',
			description: 'This military ocular implant projects a faint range grid only the wearer can see.',
			type: ItemType.Trinket3rd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic eye, a rangefinder lens, and a spent officer\'s sighting crystal',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 450
			}),
			effect: 'You gain an edge on ranged weapon strikes against creatures with cover (passive; does not spend charges). Additionally, once per round, you can spend 1 charge to ignore cover from one obstacle between you and the target of a ranged strike.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-pursuit-legs',
			name: 'Pursuit Legs',
			description: 'A harder, louder, more brutal pair of military prosthetics built for charges, leaps, and rooftop chases.',
			type: ItemType.Trinket3rd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Feet, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A pair of prosthetic legs, assault springs, and a patrol route ledger',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Intuition ],
				goal: 450
			}),
			effect: 'Your speed increases by 1 (passive; does not spend charges). Additionally, once per round when you charge, chase, or move at least 5 squares on your turn, you can spend 1 charge to ignore difficult terrain for that movement and then make either a Grab or Knockback maneuver as a free triggered action.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-reflex-anchor-leg',
			name: 'Reflex Anchor Leg',
			description: 'A military-surplus civilian leg favored by explorers, couriers, and anyone who hates falling off things.',
			type: ItemType.Trinket3rd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Feet, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A prosthetic leg, anchor hooks, and a stripped trigger spring',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition ],
				goal: 450
			}),
			effect: 'As a triggered action when you would fall, be pushed over an edge, or slide unwillingly, you can spend 1 charge to stop your movement in the nearest legal space and remain standing.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-black-office-cipher-eye',
			name: 'Black Office Cipher-Eye',
			description: 'A clandestine-state prosthetic eye set with a rotating black lens and whisper-thin brass shutters.',
			type: ItemType.Trinket3rd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A masterwork prosthetic eye, a decoded intelligence file, and a lens ground from spyglass crystal',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
				goal: 450
			}),
			effect: '1st Level: You gain a +1 damage bonus on ranged weapon strikes and magic or psionic abilities that deal rolled damage to a single target you can see. You also gain an edge on tests to detect lies, read coded communication, or identify surveillance. 5th Level: The damage bonus increases to +2. Additionally, as a maneuver, you can spend 1 charge to choose one creature within 10 squares. Until the end of your next turn, that creature can\'t be hidden from you, and the first ally to strike that creature gains an edge. 9th Level: The damage bonus increases to +3. Additionally, once per turn when you obtain a tier 3 outcome against a creature you can see, you can spend 1 charge to choose up to two allies within 10 squares. Each chosen ally can shift 2 and gains an edge on their next strike against that creature before the end of your next turn.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-pathfinder-s-ocular-engine',
			name: 'Pathfinder\'s Ocular Engine',
			description: 'A black-brass prosthetic eye whose iris forms shifting concentric rings as danger nears.',
			type: ItemType.Trinket3rd,
			keywords: [ 'Bionic' as AbilityKeyword, AbilityKeyword.Head, AbilityKeyword.Magic ],
			crafting: FactoryLogic.createProject({
				prerequisites: 'A masterwork prosthetic eye, a surveyor\'s lens, and maps of three ruined sites',
				source: 'Texts or lore in Khezdath',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 450
			}),
			effect: '1st Level: You gain an edge on Search tests and tests to detect traps, hidden doors, weak structures, or concealed movement. Once per round, when you succeed on such a test, you can spend 1 charge to let one ally within 5 squares gain an edge on their next test or strike involving the same target or hazard. 5th Level: You can\'t be surprised by traps, hidden attackers, or sudden environmental hazards within 5 squares of you while conscious. Additionally, as a maneuver, you can spend 1 charge to choose one creature, object, or square within 10 squares. Until the end of your next turn, you and your allies ignore cover from one obstacle involving that target. 9th Level: Hidden creatures within 10 squares who moved since the end of their last turn can\'t be hidden from you. Additionally, when an ally within 10 squares makes a Search test or a strike against a target you can see, they gain a double edge.'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-estander',
			name: 'Estander',
			description: 'A watery, pale-grey paste that warms the skin as it soaks in.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'a measure of Vochan polecat musk',
				source: 'smugglers\' formularies in Azhari',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'As a maneuver, rub the paste into your skin. Until the end of the encounter, you have an edge on melee strikes and you can\'t be frightened. When this effect ends, you are weakened and slowed (save ends), and you can\'t spend Recoveries until you complete a respite. (Black-market price: 180 marks per dose.)'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-madak',
			name: 'Madak',
			description: 'Vivid blue petals, eaten or steeped in cold water.',
			type: ItemType.Consumable1st,
			keywords: [],
			effect: 'Over a few minutes you fall into a shared dreaming; this counts as a respite. While you dream, you can speak mind-to-mind with - and share a single dream with - every other creature within 10 squares who has also taken madak. When you wake, you have a bane on Reason, Intuition, and Presence tests until you complete a respite. (Black-market price: 60 marks per dose. Harvested on the mountainsides of Kohana rather than crafted; obtaining a fresh supply is a Project to acquire (Source: trade contacts speaking Hanish; Goal 45) rather than to make.) This narcotic is acquired rather than crafted (see the black-market price / Project to acquire).'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-nishtar',
			name: 'Nishtar',
			description: 'Black shreds of syrup-cured bark; their smoke is sweet and numbing.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'bark stripped from a living nishtar tree',
				source: 'apothecary texts in Jhazrendish',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'As a maneuver, burn a shred. Each creature within 3 squares that breathes the smoke gains 5 temporary Stamina and is slowed (save ends) as the sedative dulls them. A creature can choose not to inhale. (Black-market price: 100 marks per dose.)'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-salt-honey',
			name: 'Salt Honey',
			description: 'A thick, salt-sweet syrup pressed from Orian sponges.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'a living sponge cultivated in the Orian shallows',
				source: 'pearl-divers\' lore in Orian',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'As a maneuver, swallow a dose. Until the end of the encounter, while you are winded your melee strikes deal additional damage equal to your echelon. When this effect ends, you are weakened (save ends). (Black-market price: 80 marks per dose.)'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-dyrwydd',
			name: 'Dyrwydd',
			description: 'A single golden drop, applied to the open eye.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'viable golden berries from a dyrwydd plant (each plant yields only a handful)',
				source: 'elven horticultural lore in Eladrith',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'As a maneuver, apply a drop to each eye. Until the end of the encounter, you have an edge on Agility tests and on tests to notice or perceive your surroundings. When this effect ends, you are slowed (save ends); the first time you are slowed this way, you are also dazed (save ends) as your senses reel. (Black-market price: 300 marks (30 sovereigns) per dose.)'
		}),
		FactoryLogic.createItem({
			id: 'item-aos-agusis',
			name: 'Agusis',
			description: 'Arrow-shaped leaves with a sharp citrus tang - hard to hide in food, but not impossible.',
			type: ItemType.Consumable1st,
			keywords: [],
			crafting: FactoryLogic.createProject({
				prerequisites: 'fresh agusis leaf (export banned from Telos)',
				source: 'alchemical texts in Telosi',
				characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
				goal: 45
			}),
			effect: 'A creature that swallows a dose (often slipped into food or drink) takes a bane on power rolls made with magic abilities and can\'t gain a benefit from its own magic abilities that would grant it an edge (save ends). (Black-market price: 200 marks per dose. Prized - and quietly bought - by the very Arbiters who outlaw it.)'
		})
	],
	kits: [
		{
			id: 'aos-kit-blademaster',
			name: 'Blademaster of the Guild',
			description: 'The blade as an art, not a trade. A member of the Blademaster\'s Guild carries one elegant sword and a lifetime of drill: the lunge, the parry-riposte, the balestra, footwork like a dance. No armour to hide behind, no mysticism; only the precision of distance, timing, and a faster, sharper point than yours.',
			type: '',
			armor: [],
			weapon: [ KitWeapon.Medium ],
			stamina: 6,
			speed: 2,
			stability: 0,
			disengage: 1,
			meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
			rangedDamage: null,
			meleeDistance: 0,
			rangedDistance: 0,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kit-blademaster-signature',
						name: 'Balestra, Lunge, Recover',
						description: 'Distance, tempo, and a faster point than yours - the whole art in three steps.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility ],
								tier1: '3 + M or A damage',
								tier2: '6 + M or A damage',
								tier3: '9 + M or A damage; you can shift 1 square'
							})),
							FactoryLogic.createAbilitySectionText('The first time the target makes a strike against you, you can make a free strike against it.')
						]
					})
				})
			]
		},
		{
			id: 'aos-kit-outrider',
			name: 'Outrider',
			description: 'An Einherjar on a war moose, a Sipahi on a war rhino, a Courser on a displacing coirig. A kit built to be ridden with. It assumes a mount beneath you, and makes the two of you one weapon - the long reach of a couched lance, the crushing arithmetic of a charge.',
			type: '',
			armor: [ KitArmor.Medium ],
			weapon: [ KitWeapon.Polearm ],
			stamina: 6,
			speed: 0,
			stability: 1,
			disengage: 0,
			meleeDamage: FactoryLogic.createKitDamageBonus(2, 2, 2),
			rangedDamage: null,
			meleeDistance: 1,
			rangedDistance: 0,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kit-outrider-signature',
						name: 'Lancer\'s Charge',
						description: 'Momentum, delivered onto a single point.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility ],
								tier1: '3 + M or A damage; push 1',
								tier2: '6 + M or A damage; push 2',
								tier3: '9 + M or A damage; push 4, the target is knocked prone'
							})),
							FactoryLogic.createAbilitySectionText('Move at least 4 squares in a straight line towards the target. Special: You must be riding a mount to use this ability.')
						]
					})
				})
			]
		}
	],
	monsterGroups: [
		beastfolk,
		celestial,
		deva,
		ironbound,
		orian,
		siabhra,
		mount
	],
	montages: [],
	negotiations: [],
	perks: [
		{
			id: 'perk-awoken',
			name: 'Awoken',
			description: 'The rethite woke a mind that runs a half-second ahead of itself - the gift of the Wasteland-runners, who survive the worst ground on Vara because they flinch before the danger lands, not after. You can\'t be surprised, and gain an edge on tests to notice, avoid, or escape traps, hazards, or ambushes.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Supernatural
		},
		{
			id: 'perk-keeper-of-the-undying-flame',
			name: 'Keeper of the Undying Flame',
			description: 'You are a Flamebearer, and carry a portion of Solan\'s flame. You can kindle a sacred light that never gutters in wind or water, and you see clearly by its glow in any darkness. You gain a +2 bonus to saving throws to end the Frightened condition.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Supernatural
		},
		{
			id: 'perk-magefinders-eye',
			name: 'Magefinder’s Eye',
			description: 'You are an Arbiter, and are trained to find the gifted by the traces they leave. By studying a place for a minute, make an Intuition test: on a 12+ you learn whether a magic or psionic ability was used there within the past hour; on a 17+ you glean something of its nature.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Supernatural
		},
		{
			id: 'perk-mercy',
			name: 'Mercy',
			description: `
You are a member of the Hospitallers, and are trained in the field medicine of Tonaris. You gain the following benefits:

* You can stabilise an adjacent dying creature (main action; no test required)
* You can remove the bleeding condition from an adjacent creature (main action, no test required)
* You gain an edge on tests to treat wounds, disease, and poison.`,
			type: FeatureType.Text,
			data: null,
			list: PerkList.Lore
		},
		{
			id: 'perk-writ-of-the-greencoats',
			name: 'Writ of the Greatcoats',
			description: 'You hold a Greencoat Marshal\'s warrant. Throughout Kaemius and Aetius, lawmen and common folk recognise your authority to question, detain, search, and requisition lodging, transport, or aid in the Concordat\'s name, and you gain an edge on tests to invoke it. You recognise on sight any person whose warrant, notice, or case-file you have studied.',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Intrigue
		}
	],
	projects: [],
	subclasses: [
		{
			id: 'aos-sub-aether-elementalist',
			name: 'Aether',
			description: 'Aether is the stuff of the Veil itself - all seven elements churned together into raw, unrefined arcane force, the substance empires kill a city for. Channel it and you can throw any element at all; channel it carelessly and it spills, because nothing about raw aether wants to stay in the lines you draw. The aetherist is the most versatile elementalist alive, and the most dangerous to stand beside.',
			classID: elementalist.id,
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.create({ id: 'aether-aetheric-channelling', name: 'Aetheric Channelling', description: 'Your magic is bound to no single element. When you use a magic ability that deals damage, you can choose its damage type from acid, cold, corruption, fire, lightning, poison, or sonic, and the ability counts as having that element\'s keyword. Your Hurl Element can deal any of these.' }),
						FactoryLogic.feature.create({ id: 'aether-overspill', name: 'Overspill', description: 'When you use an Essence ability that deals damage, you can let the raw aether overspill. If you do, the ability deals additional damage equal to your Reason - but a 1 burst of wild aether erupts, centred on one of the ability\'s targets. Each creature in that burst, allies and you included, takes damage equal to your Reason, and the ground there becomes unstable (difficult terrain) until the end of the round. You choose whether to overspill each time you cast.' }),
						FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'aether-backlash', name: 'Backlash', description: 'Raw aether floods out of you.', type: FactoryLogic.type.createTrigger('A creature within range damages you with a strike'), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One creature', sections: [ FactoryLogic.createAbilitySectionText('The triggering creature takes damage equal to your Reason of a type you choose.') ] }) }),
						FactoryLogic.feature.create({ id: 'aether-hurl-element', name: 'Hurl Element (Aether)', description: 'Your Hurl Element shimmers through every colour at once; you choose its damage type each time you use it (as Aetheric Channelling), and once per round you may Overspill it like any Essence ability even though it costs none.' })
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({ id: 'aether-disciple-of-aether', name: 'Disciple of Aether', description: 'Raw aether is every element, so no single resistance turns it. Your magic abilities ignore enemies\' resistances to specific damage types (they do not ignore immunities). Additionally, when you Overspill, you can split the spill: the burst can deal two different element types, divided as you like among the creatures caught.' })
					]
				},
				{
					level: 3,
					features: [
						FactoryLogic.feature.create({ id: 'aether-volatile-persistence', name: 'Volatile Persistence', description: 'When you maintain a persistent aether ability, the leak works for you: at the start of each of your turns, one enemy within your Mantle of Essence aura takes damage equal to your Reason of a type you choose.' }),
						FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'aether-aetheric-detonation', name: 'Aetheric Detonation', description: 'Raw aether wants out, and you stop pretending you can hold it.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createSpecial('4 burst') ], target: 'Each creature in the area', cost: 7, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Reason, tier1: '12 + R damage', tier2: '15 + R damage', tier3: '18 + R damage' })), FactoryLogic.createAbilitySectionText('On a tier 3 result, each target is subject to Overspill.') ] }) })
					]
				},
				{
					level: 4,
					features: [
						FactoryLogic.feature.create({ id: 'aether-mantle-of-aether', name: 'Mantle of Aether', description: 'While you have 3 or more essence and are not dying, you exude an aura of magic whose distance is equal to your Reason score. You can activate and deactivate the aura at will (no action required). At the end of each of your turns, each enemy in the area takes damage equal to your Reason of a type you choose, and the area counts as difficult terrain for your enemies.' })
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({ id: 'aether-channelled-spill', name: 'Channelled Spill', description: 'You\'ve learned to throw the spill clear of your own feet. When you Overspill, you can exclude yourself from the burst. Additionally, the unstable ground the spill creates now slows the first enemy that enters it (save ends).' })
					]
				},
				{
					level: 7,
					features: [
						FactoryLogic.feature.create({ id: 'aether-aetheric-resonance', name: 'Aetheric Resonance', description: 'The first time each round your Overspill deals damage to one or more enemies, you regain 1 Essence.' })
					]
				},
				{
					level: 8,
					features: [
						FactoryLogic.feature.create({ id: 'aether-riftcaller', name: 'Riftcaller', description: 'Your overspill is no longer an accident you tolerate but a weapon you aim. When you Overspill, the burst increases to a 2 cube, and you can shape it to exclude up to a number of allies equal to your Reason. Once per encounter, you can tear the Veil outright: each enemy in a 3 burst within 10 takes damage equal to four times your Reason of a type you choose and is knocked prone as raw aether floods the ground.' })
					]
				},
				{
					level: 10,
					features: [
						FactoryLogic.feature.create({ id: 'aether-master-of-aether', name: 'Master of Aether', description: 'You become a conduit of the Veil itself. Your Overspill no longer harms you or your allies, and when you cast a magic ability, you may have it deal all of its damage as two element types at once, applying whichever is worse for each target. Your Essential Being now grants 4 Essence at the start of each turn.' })
					]
				}
			],
			abilities: [],
			selected: false
		},
		{
			id: 'aos-sub-hexbreaker-tactician',
			name: 'Hexbreaker',
			description: 'A Hexbreaker is the martial answer to a world where magic is coming back and nobody asked it to. Where the Sanctioners of Ryvos meet sorcery with sorcery, the Hexbreaker meets it with drill, steel, and a cold, sapper\'s understanding of exactly how a working is built - and therefore how it comes apart. A Hexbreaker casts nothing. That is the entire point.',
			classID: tactician.id,
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({ id: 'hexbreaker-skill', selected: [ 'Magic' ], count: 1 }),
						FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'hexbreaker-brace', name: 'Brace!', description: 'A command, drilled until it\'s spinal: when the air goes wrong, set your feet and weather it.', type: FactoryLogic.type.createTrigger('The target is targeted by a magic ability'), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createSelf(), FactoryLogic.distance.createRanged(10) ], target: 'Self or one ally', sections: [ FactoryLogic.createAbilitySectionText('The target halves the damage they take from the ability and gains a +2 bonus to any saving throw the ability forces on them. Spend 1: The target also can\'t be subjected to any condition or forced movement by that ability.') ] }) }),
						FactoryLogic.feature.create({ id: 'hexbreaker-break-the-hex', name: 'Break the Hex', description: 'You read a spell the way a sapper reads a wall. When you mark a creature it suffers the normal Mark (your allies gain an edge and deal extra damage against it) and the potency of its magic abilities is reduced by 1.' })
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({ id: 'hexbreaker-disruptor', name: 'Disruptor', description: 'The first time each combat round that a creature marked by you uses an ability with the Magic or Psionic keywords, you gain 1 focus.' }),
						FactoryLogic.feature.createChoice({ id: 'hexbreaker-2-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'hexbreaker-disrupting-strike', name: 'Disrupting Strike', description: 'Hit the hand as the word is forming.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1), FactoryLogic.distance.createRanged(5) ], target: 'One creature', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Might, tier1: '2 + M or A damage', tier2: '5 + M or A damage', tier3: '7 + M or A damage; prone' })), FactoryLogic.createAbilitySectionText('If the target has used an ability with the Magic or Psionic keywords since the end of your last turn, this strike deals additional damage equal to your Reason, and the target takes a bane on its next magic ability\'s power roll.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'hexbreaker-hold-fast', name: 'Hold Fast', description: 'Bitter agusis on the tongue, feet set: the squad becomes weather the spell has to get through.', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Area ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Self and each ally in the area', cost: 5, sections: [ FactoryLogic.createAbilitySectionText('The target gains immunity 5 against damage from abilities with the Magic or Psionic keywords (EoT).') ] }) }), value: 1 } ] })
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({ id: 'hexbreaker-hardened-ranks', name: 'Hardened Ranks', description: 'Each ally within 5 squares of you reduces the damage they take from magic abilities by an amount equal to your Reason score, and gains a +2 bonus on saving throws made to end effects from magic abilities.' }),
						FactoryLogic.feature.create({ id: 'hexbreaker-cut-the-cant', name: 'Cut the Cant', description: 'When a creature marked by you uses a magic ability, you can use a free triggered action to let one ally within 10 squares of it make a free strike against it. If that strike deals damage, the marked creature takes a bane on the triggering ability\'s power roll.' })
					]
				},
				{
					level: 6,
					features: [
						FactoryLogic.feature.createChoice({ id: 'hexbreaker-6-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'hexbreaker-shatter-the-working', name: 'Shatter the Working', description: 'A working is just a wall built fast. Walls come down.', type: FactoryLogic.type.createTrigger('A creature within 10 creates or sustains a magic aura, zone, effect, or summon'), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One magic effect', cost: 9, sections: [ FactoryLogic.createAbilitySectionText('That aura, zone, effect, or summon ends. If it was a summon, the summoned creature is destroyed.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'hexbreaker-iron-cadre', name: 'Iron Cadre', description: 'Drill it until the body refuses the spell on its own.', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Area ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Self and each ally in the area', cost: 9, sections: [ FactoryLogic.createAbilitySectionText('The target can\'t be force moved or subjected to conditions from abilities with the Magic or Psionics keywords (EoT).') ] }) }), value: 1 } ] })
					]
				},
				{
					level: 8,
					features: [
						FactoryLogic.feature.create({ id: 'hexbreaker-edict-of-silence', name: 'Edict of Silence', description: 'As a maneuver, spend 5 focus and choose one creature marked by you within 10 squares. That creature is silenced (save ends): while silenced, it can\'t use magic abilities, and any magic effect, aura, or summon it was sustaining ends and can\'t be resumed.' })
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.createChoice({ id: 'hexbreaker-9-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'hexbreaker-killing-word', name: 'Killing Word', description: 'Mark the caster. Tell the squad which throat the fire came out of.', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature', cost: 11, sections: [ FactoryLogic.createAbilitySectionText('You mark the target until the end of the encounter. Strikes against the marked target ignore its damage resistances. When an ally damages the marked target with a strike, that ally can spend 1 point of their own heroic resource to double that strike\'s damage.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'hexbreaker-total-suppression', name: 'Total Suppression', description: 'The whole doctrine in one breath: silence, across a room.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area ], distance: [ FactoryLogic.distance.createSpecial('5 burst within 10') ], target: 'Each enemy in the area', cost: 11, sections: [ FactoryLogic.createAbilitySectionText('The target is silenced (save ends): while silenced, it can\'t use magic abilities, and any magic effect, aura, or summon it was sustaining ends and can\'t be resumed.') ] }) }), value: 1 } ] })
					]
				}
			],
			abilities: [],
			selected: false
		},
		{
			id: 'aos-sub-kaza-null',
			name: 'Kaza',
			description: 'A kaza is a wandering weaponmaster sworn to nithadas, an ancient code that is equal parts martial art and honour, fought out with a pair of long curved knives. Some kaza are merely peerless duellists. The ones who walk the Null\'s road are something stranger: their devotion to the code has become a discipline of the mind as much as the body. They read a fight before it happens, turn an enemy\'s own force back through the edge that delivered it, and meet violence with a stillness that is its own kind of violence.',
			classID: nullClass.id,
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({ id: 'kaza-skill', listOptions: [ SkillList.Interpersonal ], count: 1 }),
						FactoryLogic.feature.create({ id: 'kaza-blade-of-nithadas', name: 'Blade of Nithadas', description: 'Where other nulls need no weapon, the kaza\'s discipline runs through a pair of blades without breaking. You can wield two light weapons - the long curved knives of the kaza - and you make your null strikes, signature abilities, and tradition abilities with them. While you wield two light weapons: you gain a +1 bonus to rolled damage with melee abilities; and the first time each round a creature makes a melee strike against you, it takes a bane on that power roll. A kaza may set the blades aside and fight empty-handed like any other null, losing only the damage bonus and the parry. You also gain a +1 bonus to saving throws.' }),
						FactoryLogic.feature.create({ id: 'kaza-single-combat', name: 'Single Combat', description: 'This tradition adds an effect to the menu you can give your Null Field (once on each of your turns, as a free maneuver, by spending 1 discipline): Choose one enemy in your Null Field. Until the start of your next turn, that enemy takes a bane on strikes that don\'t include you as a target, and you have an edge on strikes against it.' }),
						FactoryLogic.feature.create({ id: 'kaza-the-composed-blade', name: 'The Composed Blade', description: 'The higher your discipline, the slower the duel runs for you. These benefits last until the end of your turn, even if you later spend below the threshold. Discipline 2: Your melee strikes deal +1 rolled damage against any enemy that has damaged you since the end of your last turn. Discipline 4: When an enemy in your Null Field misses you with a strike, you can shift 1. Discipline 6: The first time on each of your turns that you damage an enemy with a melee strike, you can slide that enemy 1. Discipline 7 (level 5+): You have an edge on melee strikes against any enemy that has made a strike against you since the end of your last turn. Discipline 10 (level 7+): When you use Inertial Shield to reduce damage from a melee strike, you can make a melee free strike against the attacker. Discipline 12 (level 9+): Your melee strikes ignore the target\'s stability when they force move it, and you can\'t be made to grant an edge by being flanked.' })
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({ id: 'kaza-the-turned-blade', name: 'The Turned Blade', description: 'When you use Inertial Shield against a melee strike, the attacker takes psychic damage equal to your Intuition score - the force you shed runs back up the blade into the hand that sent it. At 5th level and higher, you can also slide the attacker 1.' }),
						FactoryLogic.feature.createChoice({ id: 'kaza-2-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'kaza-perfect-cut', name: 'Perfect Cut', description: 'Strike not where the enemy stands, but where the enemy has already resolved to be.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Agility, tier1: '5 + A or I psychic damage', tier2: '8 + A or I psychic damage; slowed (EoT)', tier3: '11 + A or I psychic damage; dazed (EoT)' })) ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'kaza-two-rivers', name: 'Two Rivers', description: 'Two blades, two rivers: let them part for two throats, or join for one.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One or two creatures', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Agility, tier1: '3 + A or I damage', tier2: '5 + A or I damage', tier3: '7 + A or I damage; the target cannot make opportunity attacks (EoT)' })) ] }) }), value: 1 } ] })
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({ id: 'kaza-read-the-duel', name: 'Read the Duel', description: 'You see the cut before it is thrown. Once each round, when an enemy in your Null Field makes a strike against you, you can use a triggered action to shift 1 and gain an edge on the next strike you make against that enemy before the end of your next turn.' })
					]
				},
				{
					level: 6,
					features: [
						FactoryLogic.feature.createChoice({ id: 'kaza-6-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'kaza-the-blade-returned', name: 'The Blade Returned', description: 'Be the open door. Whatever enters by violence departs by the same threshold, and pays the toll.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Psionic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', cost: 9, sections: [ FactoryLogic.createAbilitySectionText('Until the start of your next turn, whenever an enemy in your Null Field makes a strike against you, you can make a melee free strike against that enemy before the strike resolves. If that free strike reduces the enemy to 0 Stamina, their strike is lost.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'kaza-circle-of-nithadas', name: 'Circle of Nithadas', description: 'When the many forget the courtesy of single combat, the kaza answers the many at once - and courteously.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createSpecial('1 burst') ], target: 'Each enemy in the area', cost: 9, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Agility, tier1: '5 + A or I damage; slide 1', tier2: '8 + A or I damage; slide 2', tier3: '11 + A or I damage; slide 3; the targets takes a bane on its next strike' })) ] }) }), value: 1 } ] })
					]
				},
				{
					level: 8,
					features: [
						FactoryLogic.feature.create({ id: 'kaza-nithadas-made-manifest', name: 'Nithadas Made Manifest', description: 'The devotion becomes literal: a faint blade-light trails every cut, and the edge lands on the mind as on the body. Your melee strikes deal an extra 1d6 psychic damage, and whenever you reduce an enemy to 0 Stamina with a melee strike, you regain 2 discipline.' })
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.createChoice({ id: 'kaza-9-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'kaza-one-exchange', name: 'One Exchange', description: 'A true duel is one question, one answer, one breath. The rest is only butchery, and beneath the Code.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 11, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Agility, tier1: '11 + A or I damage; weakened (EoT)', tier2: '16 + A or I damage; weakened (EoT); the target cannot make saving throws (EoT)', tier3: '22 + A or I damage; weakened (EoT); the target cannot make saving throws (EoT)' })) ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'kaza-empty-the-blades', name: 'Empty the Blades', description: 'Keep nothing from the last form. A blade held in reserve is a lie the duellist tells himself.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Psionic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', cost: 11, sections: [ FactoryLogic.createAbilitySectionText('Make five melee free strikes against the same or different enemies. Each deals 10 additional damage. You can shift 3 before each strike.') ] }) }), value: 1 } ] })
					]
				}
			],
			abilities: [],
			selected: false
		},
		{
			id: 'aos-sub-mnemopath',
			name: 'Mnemopath',
			description: 'Mnemopathy abilities reach into memory: the memories of the living, the memories held by places, and above all the memories of the dying, which are loudest at the moment they are abandoned. Most psionic power announces itself; yours arrives as something the target believes they already knew. A mnemopath takes what is left behind and gives back only what they choose - and neither transaction leaves a mark anyone can point to.',
			classID: talent.id,
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mnemopath-final-light', name: 'Final Light', description: 'You begin to understand how they came apart.', type: FactoryLogic.type.createTrigger('A creature within 5 dies'), keywords: [ 'Mnemopathy' as AbilityKeyword, AbilityKeyword.Psionic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', sections: [ FactoryLogic.createAbilitySectionText('You gain 1 clarity, and the next power roll you make against a creature that shares a keyword with the triggering creature gains an edge.') ] }) }),
						FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mnemopath-quiet-sending', name: 'Quiet Sending', description: 'They didn\'t hear you - they remembered it.', type: FactoryLogic.type.createManeuver(), keywords: [ 'Mnemopathy' as AbilityKeyword, AbilityKeyword.Psionic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(5) ], target: 'One creature', sections: [ FactoryLogic.createAbilitySectionText('You place a short memory - a phrase, an image, an urge of ten words or fewer - in the target\'s mind, which they recall as their own thought from a moment ago. Nothing identifies you as the source. The next power roll the target makes before the start of your next turn that doesn\'t include you as a target takes a bane, as they act on a thought that was never theirs. Spend 1: Instead of the bane, you slide the target 1 square - they go where the memory tells them.') ] }) })
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({ id: 'mnemopath-ease-the-telling', name: 'Ease the Telling', description: 'Once per negotiation, when an argument you make would decrease an NPC\'s interest, you can instead take the argument out of their memory: their interest doesn\'t change, and that argument can be made again later in the negotiation as though for the first time. Additionally, you gain an edge on tests made to retract, deny, or explain away something you have already said.' }),
						FactoryLogic.feature.createChoice({ id: 'mnemopath-2-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mnemopath-the-worst-day', name: 'The Worst Day', description: 'You open the drawer they keep their fear in.', type: FactoryLogic.type.createMain(), keywords: [ 'Mnemopathy' as AbilityKeyword, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Reason, tier1: '6 + R psychic damage; I<w frightened (save ends)', tier2: '10 + R psychic damage; I<v frightened (save ends)', tier3: '14 + R psychic damage; I<s frightened (save ends)' })), FactoryLogic.createAbilitySectionText('Strained: The potency of this ability increases by 1, and you take psychic damage equal to R that can\'t be reduced in any way.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mnemopath-forget-the-wound', name: 'Forget the Wound', description: 'You cannot mend it, but perhaps you can make them forget it is happening.', type: FactoryLogic.type.createManeuver(), keywords: [ 'Mnemopathy' as AbilityKeyword, AbilityKeyword.Psionic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'Self or one ally', cost: 5, sections: [ FactoryLogic.createAbilitySectionText('The target can end one effect on them that is ended by a saving throw or that ends at the end of their turn - they no longer remember acquiring it - and gains temporary Stamina equal to twice your Reason score. Strained: The target is dazed until the end of their next turn, but the temporary Stamina equals three times your Reason score.') ] }) }), value: 1 } ] })
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({ id: 'mnemopath-final-testimony', name: 'Final Testimony', description: 'Whenever you obtain a success on a test using a skill from the Intrigue or Lore skill group while examining the body of a creature that died within the past day, you take its final memory. You learn the last thing it clearly perceived, the person, place, or thing foremost in its mind, and what it believed was about to happen. The dead cannot lie to you. They can only have been wrong.' }),
						FactoryLogic.feature.create({ id: 'mnemopath-no-tell', name: 'No Tell', description: 'Your psionic abilities carry no visible manifestation - no glow, no gesture, no sound. A creature of your level or lower affected by your abilities doesn\'t learn that you are the source; a creature of higher level can identify you with a hard Intuition test. Using a psionic ability doesn\'t cause a creature to observe you for the purposes of hiding - you can work from behind the barrel without giving anyone a reason to look at it. You also gain an edge on tests made to avoid suspicion or to account for your presence.' })
					]
				},
				{
					level: 6,
					features: [
						FactoryLogic.feature.createChoice({ id: 'mnemopath-6-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mnemopath-relive-it', name: 'Relive It', description: 'For one breath, they are somewhere that already happened, and it is happening again.', type: FactoryLogic.type.createMain(), keywords: [ 'Mnemopathy' as AbilityKeyword, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature', cost: 9, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Reason, tier1: '8 + R psychic damage; I<w dazed (EoT)', tier2: '12 + R psychic damage; I<v dazed (save ends)', tier3: '16 + R psychic damage; I<s, the target is removed from the encounter map and returned to the nearest unoccupied space at the start of their next turn, dazed (save ends)' })), FactoryLogic.createAbilitySectionText('Strained: You go back with them: teleport up to your Reason score in squares, then take corruption damage equal to R that can\'t be reduced in any way.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mnemopath-chorus-of-last-words', name: 'A Chorus of Last Words', description: 'Every place remembers its dead.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, 'Mnemopathy' as AbilityKeyword, AbilityKeyword.Psionic ], distance: [ FactoryLogic.distance.createSpecial('3 burst') ], target: 'Each enemy in the area', cost: 9, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Reason, tier1: '5 + R psychic damage', tier2: '8 + R psychic damage; I<v frightened (save ends)', tier3: '11 + R psychic damage; I<s frightened (save ends)' })), FactoryLogic.createAbilitySectionText('Strained: Until the end of your next turn, you can\'t benefit from edges on power rolls, but the first enemy to enter the area or start their turn there takes psychic damage equal to your Reason score.') ] }) }), value: 1 } ] })
					]
				},
				{
					level: 8,
					features: [
						FactoryLogic.feature.create({ id: 'mnemopath-what-the-dead-keep', name: 'What the Dead Keep', description: 'During a respite, choose one creature whose final memory you have taken with Final Testimony. You gain one thing they knew: one language they spoke, or one skill they had. You keep every memory taken this way - the list grows as the campaign does - and the dead do not miss them.' }),
						FactoryLogic.feature.create({ id: 'mnemopath-the-lending', name: 'The Lending', description: 'During a respite, you can give copies of what you carry. Choose a number of allies up to your Reason score: each gains one language or skill you have taken with What the Dead Keep, and keeps it until your next respite. While you have 5 or more Victories, you can also grant one ally an edge on the first test they make during the next montage test - they remember having done this before.' })
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.createChoice({ id: 'mnemopath-9-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mnemopath-the-whole-of-a-life', name: 'The Whole of a Life', description: 'You give them everything you are carrying, all at once.', type: FactoryLogic.type.createMain(), keywords: [ 'Mnemopathy' as AbilityKeyword, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One creature', cost: 11, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Reason, tier1: '9 + R psychic damage; I<w weakened (save ends)', tier2: '13 + R psychic damage; I<v weakened and slowed (save ends)', tier3: '18 + R psychic damage; I<s, the target is removed from the encounter map until the end of your next turn, then returns prone and dazed (save ends)' })), FactoryLogic.createAbilitySectionText('Strained: Each enemy within 2 squares of you takes psychic damage equal to your Reason score, and you take the same amount, which can\'t be reduced in any way.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'mnemopath-everyone-remembers', name: 'Everyone Remembers', description: 'Every soul on this field is handed one thing they had forgotten.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, 'Mnemopathy' as AbilityKeyword, AbilityKeyword.Psionic ], distance: [ FactoryLogic.distance.createSpecial('4 burst') ], target: 'Each enemy in the area', cost: 11, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Reason, tier1: '6 + R psychic damage; I<w dazed (save ends)', tier2: '9 + R psychic damage; I<v dazed (save ends)', tier3: '12 + R psychic damage; I<s dazed and slowed (save ends)' })), FactoryLogic.createAbilitySectionText('Each ally in the area can end one effect on them that is ended by a saving throw or that ends at the end of their turn, and each unconscious ally in the area who is not dying wakes. Strained: You are dazed (save ends).') ] }) }), value: 1 } ] })
					]
				}
			],
			abilities: [],
			selected: false
		},
		{
			id: 'aos-sub-watchful-host',
			name: 'Watchful Host',
			description: 'Every other college looks outward - Black Ash steps away, Caustic poisons, the Harlequin wears a face. The Watchful Host looks in. They are the Veilwatchers and Deathguards who stand at the Breach and the thin places, and their art is not escape but refusal: nothing crosses past them, nothing slips away, nothing leaves the line. But the long vigil cuts both ways - watch the Breach long enough and the Breach watches back, and a little of what lies beyond soaks into the watcher.',
			classID: shadow.id,
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({ id: 'watchful-skill', selected: [ 'Monsters' ], count: 1 }),
						FactoryLogic.feature.create({ id: 'watchful-breach-watches-back', name: 'The Breach Watches Back', description: 'You can perceive creatures and objects that are invisible, ethereal, phased, or only partly across the Veil within your line of effect, and you sense when anything crosses the Veil within 10 squares of you. Once on each of your turns, you can step through a thin place - teleport up to 3 squares, passing through creatures and solid obstacles to do it. Your strikes deal additional corruption damage equal to your Agility to undead, horrors, and creatures from beyond the Veil.' }),
						FactoryLogic.feature.create({ id: 'watchful-sentinel', name: 'Sentinel', description: 'Enemies adjacent to you can\'t teleport. The first time each round an enemy willingly leaves a square adjacent to you - or any enemy within 3 of you teleports - you can make a free strike against it without spending a triggered action.' }),
						FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'watchful-hold-the-threshold', name: 'Hold the Threshold', description: 'The way is closed.', type: FactoryLogic.type.createTrigger('A creature within 3 of you moves, is force moved, or teleports'), keywords: [ AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(3) ], target: 'One creature', sections: [ FactoryLogic.createAbilitySectionText('That creature\'s movement immediately ends and it takes damage equal to twice your Agility. Spend 1 Insight: the creature is restrained until the end of its next turn. Spend 1 Insight: the creature can\'t teleport until the end of its next turn.') ] }) })
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createChoice({ id: 'watchful-2-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'watchful-pinning-strike', name: 'Pinning Strike', description: 'You are not going anywhere. The Breach is watching, and so am I.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Agility, tier1: '3 + A damage; slowed (save ends)', tier2: '6 + A damage; slowed (save ends) and restrained (EoT)', tier3: '9 + A damage; slowed (save ends) and restrained (save ends)' })) ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'watchful-warding-step', name: 'Warding Step', description: 'Step to the one who needs you and take the blow meant for them.', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createRanged(10) ], target: 'One ally', cost: 5, sections: [ FactoryLogic.createAbilitySectionText('Teleport to a square adjacent to the target. Until the end of your next turn, the first strike that targets that ally targets you instead.') ] }) }), value: 1 } ] })
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({ id: 'watchful-wardens-ground', name: 'Warden\'s Ground', description: 'While you are conscious you project a 3 aura. Enemies can\'t teleport within it or into it, they treat it as difficult terrain, and the first time each round an enemy moves while inside it, that enemy takes corruption damage equal to your Agility. Your step through a thin place distance increases to 5, and you can bring one adjacent ally with you.' })
					]
				},
				{
					level: 6,
					features: [
						FactoryLogic.feature.createChoice({ id: 'watchful-6-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'watchful-cast-out', name: 'Cast Out', description: 'Send it back where it leaked in from.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 9, sections: [ FactoryLogic.createAbilitySectionText('The target is teleported up to your Agility and is dazed (save ends). If the target is a summoned creature or a creature from beyond the Veil, it is instead removed from the encounter (save ends).') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'watchful-net-draws-tight', name: 'The Net Draws Tight', description: 'Close the holes. Now nothing crosses without you knowing.', type: FactoryLogic.type.createManeuver(), keywords: [ AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSelf() ], target: 'Self', cost: 9, sections: [ FactoryLogic.createAbilitySectionText('Until the end of the encounter, you project a 3 aura. Enemies can\'t teleport within or into it and treat it as difficult terrain, and you sense every creature inside it, even the hidden and the unseen.') ] }) }), value: 1 } ] })
					]
				},
				{
					level: 8,
					features: [
						FactoryLogic.feature.create({ id: 'watchful-the-last-vigil', name: 'The Last Vigil', description: 'Once per encounter, as a main action, you anchor reality in a 5 burst until the end of the encounter. No creature can teleport into or out of the area, and no enemy can leave it: an enemy that tries to move out is stopped at the edge and takes corruption damage equal to three times your Agility. While any enemy from beyond the Veil stands in the area, you know its weaknesses as though you had studied it for hours.' })
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.createChoice({ id: 'watchful-9-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'watchful-cast-beyond', name: 'Cast Beyond', description: 'The tithe runs both ways tonight.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature', cost: 11, sections: [ FactoryLogic.createAbilitySectionText('The target must not be a leader, elite, or solo creature. The target makes a saving throw or is banished through the Breach (removed from the encounter; it returns dazed in its space at the end of the encounter).') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'watchful-unblinking-hour', name: 'The Unblinking Hour', description: 'For one turning of the watch, nothing leaves the line.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('10 burst') ], target: 'Each enemy in the area', cost: 11, sections: [ FactoryLogic.createAbilitySectionText('Until the end of your next turn, the target cannot hide, teleport, move, or shift.') ] }) }), value: 1 } ] })
					]
				}
			],
			abilities: [],
			selected: false
		},
		{
			id: 'aos-sub-winnower',
			name: 'Winnower',
			description: 'The wheat is kept; the chaff is given to the fire. A Winnower\'s judgment is never for one soul alone: it leaps from the fallen to the standing, gathers heat as it goes, and does not stop until the field is sorted. Other orders hunt what hides; the Winnower\'s concern is what remains when nothing can.',
			classID: censor.id,
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({ id: 'winnower-skill', selected: [ 'Society' ], count: 1 }),
						FactoryLogic.feature.create({ id: 'winnower-the-fire-spreads', name: 'The Fire Spreads', description: 'When your judgment moves to a new target because a creature judged by you was reduced to 0 Stamina, the new target immediately takes holy damage equal to twice your Presence score, and you gain 1 wrath.' })
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({ id: 'winnower-chaff-burns', name: 'Chaff Burns', description: 'When a creature judged by you is reduced to 0 Stamina, each enemy adjacent to them takes holy damage equal to your Presence score.' }),
						FactoryLogic.feature.create({ id: 'winnower-an-eye-for-the-field', name: 'An Eye for the Field', description: 'You were trained to look at a crowd and see a crop. When you begin a negotiation, you automatically discover one of the NPC\'s motivations or pitfalls, your choice. Additionally, you gain an edge on tests made to single one creature out of a group: following a quarry through a mob, picking a face from a lineup, or spotting which member of a delegation is doing the real talking.' }),
						FactoryLogic.feature.createChoice({ id: 'winnower-2-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'winnower-winnow', name: 'Winnow', description: 'The flail rises, and the field learns of what it is made.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('3 burst centered on a creature judged by you within 10') ], target: 'Each enemy in the area', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Presence, tier1: '3 holy damage; push 1 away from the judged creature', tier2: '5 holy damage; push 2 away from the judged creature', tier3: '8 holy damage; push 3 away from the judged creature; P<s frightened (save ends)' })), FactoryLogic.createAbilitySectionText('The judged creature at the center is not a target, but takes holy damage equal to your Presence score for each enemy pushed.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'winnower-first-fruits', name: 'First Fruits', description: 'The first sheaf is always given to the fire.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature judged by you', cost: 5, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Might, tier1: '5 + M holy damage', tier2: '8 + M holy damage', tier3: '11 + M holy damage' })), FactoryLogic.createAbilitySectionText('You gain 1 wrath for each enemy adjacent to the target, to a maximum of your Presence score.') ] }) }), value: 1 } ] })
					]
				},
				{
					level: 5,
					features: [
						FactoryLogic.feature.create({ id: 'winnower-twofold-harvest', name: 'Twofold Harvest', description: 'You can have two creatures judged by you at the same time. When you use your Judgment ability while two creatures are already judged by you, the earlier judgment ends. When your judgment moves because a judged creature was reduced to 0 Stamina, it can move to up to two new targets - The Fire Spreads applies to each.' })
					]
				},
				{
					level: 6,
					features: [
						FactoryLogic.feature.createChoice({ id: 'winnower-6-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'winnower-separate-wheat', name: 'Separate Wheat from Chaff', description: 'You do not strike the field. You sort it.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Each enemy in the area', cost: 9, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Presence, tier1: '5 holy damage; slide 2', tier2: '8 holy damage; slide 3', tier3: '11 holy damage; slide 5; P<s frightened (save ends)' })), FactoryLogic.createAbilitySectionText('Each willing ally in the area can shift up to 2 squares.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'winnower-threshing-floor', name: 'The Threshing Floor', description: 'Step onto the boards, and be weighed.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('4 cube within 10') ], target: 'Special', cost: 9, sections: [ FactoryLogic.createAbilitySectionText('The area becomes a threshing floor until the end of the encounter. An enemy that starts their turn in the area adjacent to a creature judged by you takes holy damage equal to twice your Presence score. A creature judged by you takes holy damage equal to your Presence score for each square they willingly leave the area.') ] }) }), value: 1 } ] })
					]
				},
				{
					level: 8,
					features: [
						FactoryLogic.feature.create({ id: 'winnower-the-field-is-sorted', name: 'The Field Is Sorted', description: 'You treat your Renown as 2 higher than usual when dealing with a congregation, a crowd, or any group that answers to a single authority. If you successfully complete a negotiation with such a group\'s leader, you can use your Judgment ability as a free triggered action against any member of that group before an encounter begins. Additionally, when a creature judged by you is reduced to 0 Stamina, you or one ally within 10 squares of them gains temporary Stamina equal to twice your Presence score.' })
					]
				},
				{
					level: 9,
					features: [
						FactoryLogic.feature.createChoice({ id: 'winnower-9-ability', name: 'Ability', options: [ { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'winnower-harvest', name: 'Harvest', description: 'For one hour at the end of the season, everything in the field is judged at once. This is that hour.', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ], distance: [ FactoryLogic.distance.createSpecial('5 burst') ], target: 'Each enemy in the area', cost: 11, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Presence, tier1: '6 holy damage', tier2: '9 holy damage; P<v frightened (save ends)', tier3: '12 holy damage; P<s frightened (save ends)' })), FactoryLogic.createAbilitySectionText('Each target is judged by you until the end of the encounter, ignoring your usual limit on the number of judged creatures. While more than two creatures are judged this way, The Fire Spreads doesn\'t grant wrath.') ] }) }), value: 1 }, { feature: FactoryLogic.feature.createAbility({ ability: FactoryLogic.createAbility({ id: 'winnower-let-the-scythe-swing', name: 'Let the Scythe Swing', description: 'What could the harvest hope for, if not this?', type: FactoryLogic.type.createMain(), keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ], distance: [ FactoryLogic.distance.createMelee(1) ], target: 'One creature judged by you', cost: 11, sections: [ FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ characteristic: Characteristic.Might, tier1: '7 + M holy damage', tier2: '11 + M holy damage', tier3: '16 + M holy damage' })), FactoryLogic.createAbilitySectionText('If this ability reduces the target to 0 Stamina and your judgment moves to a new target within your melee distance, you can repeat this ability against the new target without spending wrath. You can repeat it a number of times equal to your Presence score.') ] }) }), value: 1 } ] })
					]
				}
			],
			abilities: [],
			selected: false
		}
	],
	tacticalMaps: [],
	terrain: [
		{
			id: 'terrain-aos-aether-cask',
			name: 'Aether Cask',
			description: 'A heavy glass-and-brass barrel full of refined aether. An aether cask has 80 charges.',
			category: TerrainCategory.SupernaturalObject,
			level: 5,
			role: FactoryLogic.createTerrainRole(MonsterRoleType.Support, TerrainRoleType.Hazard),
			encounterValue: 7,
			area: '',
			typicalSpace: '',
			direction: '',
			link: '',
			stamina: {
				base: 50,
				perSquare: 0
			},
			size: FactoryLogic.createSize(1, 'M'),
			damageMods: [],
			sections: [
				{
					id: 'aether-cask-details',
					content: [
						FactoryLogic.feature.create({
							id: 'aether-cask-deactivate',
							name: 'Deactivate',
							description: 'The cask is deactivated if all its charges are used up.'
						}),
						FactoryLogic.feature.create({
							id: 'aether-cask-recharge',
							name: 'Recharge',
							description: 'Any creature adjacent to the cask can replenish an aether cell by transferring charges from the cask to the cell; transferring one charge requires a maneuver.'
						}),
						FactoryLogic.feature.create({
							id: 'aether-cask-install',
							name: 'Install',
							description: 'You can install a cask into a machine or vehicle designed to accept one; this takes one minute. While installed, the machine can spend the cask\'s charges to power its abilities. When the last charge is spent, it becomes inert until recharged.'
						}),
						FactoryLogic.feature.create({
							id: 'aether-cask-crack-the-glass',
							name: 'Crack the Glass',
							description: 'If an aether cask is reduced to 0 Stamina, the aether escapes and causes an aether surge: roll three times on the aether surge table. Unless a result says otherwise, each effect is centered on the broken cask and affects a 5 burst.'
						})
					]
				}
			],
			upgrades: [],
			state: {
				squares: 1,
				staminaDamage: 0
			}
		}
	],
	titles: [
		{
			id: 'aos-title-almoner',
			name: 'Almoner',
			description: 'A Mercies title. A Hospitaller who has held a comrade back from death against the odds.',
			echelon: 1,
			prerequisites: 'You save a life that should have been lost - holding a comrade back from death against the odds.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-almoner-1',
					name: 'Triage',
					description: 'Once per encounter, as a maneuver, an ally within 5 can spend a Recovery; if they have none left, they instead gain temporary Stamina equal to twice your level.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-almoner-2',
					name: 'Unyielding',
					description: 'While you are adjacent to a dying ally, strikes against you take a bane, and enemies adjacent to you can\'t target that ally with strikes or abilities.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-almoner-3',
					name: 'Field Surgeon',
					description: 'Whenever an ally within 5 spends a Recovery - including via the Heal main action - they regain additional Stamina equal to your level.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-commander',
			name: 'Commander',
			description: 'A 2nd-echelon Greencoats title, for those raised to command the Marshals.',
			echelon: 2,
			prerequisites: 'You lead Marshals to break a major criminal operation, or are raised to command by your superiors.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-commander-1',
					name: 'Serjeant',
					description: 'A seasoned constable (retainer) serves at your side in the field, warrant and truncheon ready.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-commander-2',
					name: 'Rally the Watch',
					description: 'Allies within a 3 aura who can see and hear you gain a +1 bonus to saving throws while you are not dying.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-commander-3',
					name: 'Concordat Authority',
					description: 'Your writ no longer stops at borders. You may lawfully command and requisition even outside Kaemius and Aetius, you gain a follower - an adjutant who runs your caseload - and your Renown increases by 1.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-constable',
			name: 'Constable',
			description: 'A Greencoats title. A sworn Marshal of the Concordat, warrant in hand.',
			echelon: 1,
			prerequisites: 'You bring a wanted criminal to justice, or close your first case as a sworn Greencoat.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-constable-1',
					name: 'Beat',
					description: 'Once per respite you can call up a pair of local watch to assist with a non-combat task - a cordon, a search, an extra set of hands.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-constable-2',
					name: 'Hunter of the Dead',
					description: 'You gain an edge on tests to track, identify, or expose a Veilbreaker or the undead.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-constable-3',
					name: 'The Long Arm',
					description: 'Once per encounter, as a maneuver, a creature within 10 that can hear you halts - it is slowed until the end of its next turn. Leaders and solos are unaffected unless winded.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-faithkeeper',
			name: 'Faithkeeper',
			description: 'A Flamebearers title. One who has confronted and broken a heresy in Solan\'s name.',
			echelon: 1,
			prerequisites: 'You confront and break a heresy - a cult, a false prophet, or a worshipper of gods outside the Eightfold.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-faithkeeper-1',
					name: 'Solan\'s Brand',
					description: 'Once per encounter, your strike or prayer flares with sacred fire: one creature takes holy or fire damage equal to your level, doubled against horrors, the undead, and creatures from beyond the Veil.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-faithkeeper-2',
					name: 'Pyre-Warded',
					description: 'You and allies within a 2 aura gain a +2 bonus to saving throws made to end the frightened condition.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-faithkeeper-3',
					name: 'Consecrate the Ground',
					description: 'As a maneuver, bless a 3 cube until the end of the encounter; allies within it gain a +1 bonus to saving throws.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-faithkeeper-ascendant',
			name: 'Faithkeeper Ascendant',
			description: 'A 2nd-echelon Flamebearers title, for those who cast down a great heresy or a thing from beyond the Veil.',
			echelon: 2,
			prerequisites: 'You destroy a great heresy, or cast down a thing from beyond the Veil in Solan\'s name.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-faithkeeper-ascendant-1',
					name: 'Zealot',
					description: 'A devoted Flamebearer (retainer) fights at your side, fervour undimmed.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-faithkeeper-ascendant-2',
					name: 'Voice of Orthodoxy',
					description: 'You speak with the authority of the Ascendancy: you gain a follower - an acolyte or scribe - your Renown increases by 1, and the faithful obey your lawful commands.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-faithkeeper-ascendant-3',
					name: 'Radiance of the Undying Fire',
					description: 'As a maneuver, wreathe yourself in sacred flame until the start of your next turn; enemies that start their turn within a 2 aura take holy or fire damage equal to your level, doubled for the unholy. You can use this maneuver again to sustain it.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-high-inquisitor',
			name: 'High Inquisitor',
			description: 'A 2nd-echelon Arbiters title, for those who break a magical conspiracy.',
			echelon: 2,
			prerequisites: 'You break a magical conspiracy, or consign a notorious caster to the Crucible.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-high-inquisitor-1',
					name: 'The Order\'s Reach',
					description: 'A junior Arbiter (follower) serves you, running down leads and watching for forbidden magic across the Alliance.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-high-inquisitor-2',
					name: 'Aura of Silence',
					description: 'Enemies take a bane on Magic and Psionic abilities that target you or that include you in their area - a faint, lawful echo of the Hexbreaker\'s art. Your Renown increases by 1.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-high-inquisitor-3',
					name: 'Inquisitor\'s Judgement',
					description: 'Once per encounter, when a creature within 10 uses a Magic or Psionic ability, you can use a triggered action to halve its damage or reduce its potency by 1.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-inquisitor',
			name: 'Inquisitor',
			description: 'An Arbiters title. One who has exposed and brought in an unsanctioned caster.',
			echelon: 1,
			prerequisites: 'You expose and bring in an unsanctioned caster - best of all, a Veilbreaker.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-inquisitor-1',
					name: 'Pronounce Heresy',
					description: 'Once per encounter, as a maneuver, name a creature you can see a heretic: you gain an edge on attacks and tests against it, and it takes a bane on Magic and Psionic abilities used against you, until the encounter ends.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-inquisitor-2',
					name: 'Warded Mind',
					description: 'You gain resistance equal to your level to damage from Magic and Psionic abilities.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-inquisitor-3',
					name: 'Authority of the Crucible',
					description: 'You may lawfully detain and bind any caster throughout the Northern Alliance, and you carry Crucible manacles that suppress a bound prisoner\'s magic.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-knight-of-the-hidden-city',
			name: 'Knight of the Hidden City',
			description: 'A Seade Knights title. One who has upheld the honour of Ithyr in a duel, a charge, or a quest.',
			echelon: 1,
			prerequisites: 'You uphold the honour of Ithyr in a duel, a charge, or a quest set you by the masked elves.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-knight-of-the-hidden-city-1',
					name: 'Step Between',
					description: 'Once per round, as part of your move, you teleport up to 2 squares - the displacing grace the Coursers ride to war.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-knight-of-the-hidden-city-2',
					name: 'Unhurried Blade',
					description: 'Once per encounter, when an enemy misses you with a strike, you make a free strike against it.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-knight-of-the-hidden-city-3',
					name: 'The Mask\'s Silence',
					description: 'You move without sound and leave no trace; you gain an edge on tests to hide and to move unseen.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-preceptor',
			name: 'Preceptor',
			description: 'A 2nd-echelon Mercies title, for those who shepherd a chapterhouse through catastrophe.',
			echelon: 2,
			prerequisites: 'You shepherd a chapterhouse, or a column of wounded, through a siege, a disaster, or a rout.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-preceptor-1',
					name: 'Lay Brother',
					description: 'A devoted lay-medic serves as your follower, running your chapterhouse\'s relief work and tending the wounded between battles.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-preceptor-2',
					name: 'Preceptor\'s Word',
					description: 'Once per encounter, as a free triggered action when an ally within 10 becomes winded, they can immediately spend a Recovery.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-preceptor-3',
					name: 'Endurance of Tonaris',
					description: 'Allies within a 3 aura reduce any ongoing damage they take - bleeding, burning, poison, and the like - by half your level, rounded up.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-rider-of-the-mjoll',
			name: 'Rider of the Mjoll',
			description: 'An Einherjar title. The Svellander regiment\'s riders, bonded to war-mount and matched in the charge.',
			echelon: 1,
			prerequisites: 'You turn a battle with a mounted charge, or ride down a foe that should have escaped.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-rider-of-the-mjoll-1',
					name: 'Thunder of Hooves',
					description: 'When you and your mount move at least 4 squares straight toward an enemy before you strike it, that strike deals 3 additional damage and you can push the target 1.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-rider-of-the-mjoll-2',
					name: 'Seat of Iron',
					description: 'You can\'t be knocked from your mount or made prone while mounted, and once per encounter, when your mount would drop to 0 Stamina, it stays up with 1 instead.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-rider-of-the-mjoll-3',
					name: 'Windrider',
					description: 'While mounted on an owlfalcon you can hover, and you gain an edge on tests to evade or escape by air.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-seeker-of-the-keening-lament',
			name: 'Seeker of the Keening Lament',
			description: 'A 2nd-echelon Seade Knights title, for those who recover a fragment of the lost song.',
			echelon: 2,
			prerequisites: 'You recover a fragment of the lost song, or perform a deed the exiled elves judge worthy of their grief.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-seeker-of-the-keening-lament-1',
					name: 'The Lament',
					description: 'Once per encounter, as a maneuver, you loose a note of the Keening Lament: each enemy within a 3 aura is frightened until the end of its next turn, while each ally there gains temporary Stamina equal to your level.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-seeker-of-the-keening-lament-2',
					name: 'Ithyri Grace',
					description: 'Your Step Between - or other teleport - distance increases by 2, and you can carry one adjacent ally with you when you teleport.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-seeker-of-the-keening-lament-3',
					name: 'Sanctuary of the Hidden City',
					description: 'Ithyr, which shelters no one, will shelter you: you gain refuge among the elves and a follower - an Ithyri attendant who shares their uncanny senses.'
				})
			],
			selectedFeatureID: ''
		},
		{
			id: 'aos-title-storm-of-valhaven',
			name: 'Storm of Valhaven',
			description: 'A 2nd-echelon Einherjar title, earned by leading a cavalry action that decides the day.',
			echelon: 2,
			prerequisites: 'You lead a cavalry action that decides the day.',
			features: [
				FactoryLogic.feature.create({
					id: 'aos-title-storm-of-valhaven-1',
					name: 'Shieldrider',
					description: 'A single Einherjar rider (retainer) charges where you charge, moose or owlfalcon matched to your own.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-storm-of-valhaven-2',
					name: 'Coordinated Charge',
					description: 'When you charge, allies within a 5 aura who also move toward an enemy this turn gain an edge on their first strike.'
				}),
				FactoryLogic.feature.create({
					id: 'aos-title-storm-of-valhaven-3',
					name: 'Dread Rider',
					description: 'The first enemy you strike each encounter after moving at least 4 squares is frightened until the end of its next turn.'
				})
			],
			selectedFeatureID: ''
		}
	],
	skills: [],
	languages: [
		{
			name: 'Eladrith',
			description: 'Spoken in Ithyr; spoken by most elves. Script: Eladric.',
			type: LanguageType.Regional,
			related: [ 'Old Eladrith' ]
		},
		{
			name: 'Old Eladrith',
			description: 'Ancient language of the elves. Script: Eladric.',
			type: LanguageType.Regional,
			related: [ 'Eladrith' ]
		},
		{
			name: 'Eravian',
			description: 'Spoken in Eravia. Script: Lirian.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Khezdath',
			description: 'Spoken in the Dwarfholds and by most dwarves; the language of engineering. Script: Khezic.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Lirian',
			description: 'Language of the old Lirian Empire; now the language of academia. Script: Lirian.',
			type: LanguageType.Dead,
			related: [ 'Telosi' ]
		},
		{
			name: 'Serne',
			description: 'Native language of Serne; trade language throughout Kaemius and common in Aetius. Script: Lirian.',
			type: LanguageType.Common,
			related: []
		},
		{
			name: 'Sirovy',
			description: 'Spoken in Sirovya. Script: Lirian.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Svellese',
			description: 'Spoken in Svelland. Script: Lirian.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Telosi',
			description: 'Spoken in Telos. Script: Lirian.',
			type: LanguageType.Regional,
			related: [ 'Lirian' ]
		},
		{
			name: 'Valedien',
			description: 'Spoken in Valedier. Script: Lirian.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Bhawaran',
			description: 'Spoken in Bhawara. Script: Bushaic.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Dejiman',
			description: 'Spoken by Dejim natives in Dejim. Script: Bushaic.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Jhazrendish',
			description: 'Spoken in Jhazren. Script: Bushaic.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Mei\'chan',
			description: 'Spoken in Mei\'chi. (No written script).',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Ranai',
			description: 'Spoken by Rana natives in Dejim. Script: Bushaic.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Ryvian',
			description: 'Spoken in Ryvos. Script: Bushaic.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Surayan',
			description: 'Spoken by Suray natives in Dejim. Script: Bushaic.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Azhari',
			description: 'Trade language throughout Aetius; spoken by most devils. Script: Bushaic.',
			type: LanguageType.Common,
			related: [ 'Classical Azhari' ]
		},
		{
			name: 'Classical Azhari',
			description: 'Language of the empire of Azharad. Script: Bushaic.',
			type: LanguageType.Dead,
			related: [ 'Azhari' ]
		},
		{
			name: 'Vraxalian',
			description: 'Language of the empire of Vraxalia; today it is spoken by some dragon knights. Script: Vraxalic.',
			type: LanguageType.Dead,
			related: []
		},
		{
			name: 'Gaureth',
			description: 'Spoken in the Gauthek Empire; spoken by most goblinoids. Script: Kaman.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Kalish',
			description: 'Spoken in Kalai; spoken by most orcs. Script: Kaman.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Sathrassian',
			description: 'Spoken in Sathras; spoken by reptilians. Script: Kaman.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Giant',
			description: 'Spoken by giants and hakaans in the Frostfell. (No written script).',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Orian',
			description: 'Spoken in Oria; spoken by most orians. Script: Eladric.',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Hana',
			description: 'Gnomish; spoken in Maerius. (No written script).',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Lowai',
			description: 'Spoken in Lowai Pora; spoken by most polders. (No written script).',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Divine',
			description: 'Spoken in the Divine Sea. (No written script).',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Elemental',
			description: 'Spoken in the Elemental Chaos. (No written script).',
			type: LanguageType.Regional,
			related: []
		},
		{
			name: 'Fae',
			description: 'Spoken in the Bright Marches. (No written script).',
			type: LanguageType.Regional,
			related: []
		}
	]
};
