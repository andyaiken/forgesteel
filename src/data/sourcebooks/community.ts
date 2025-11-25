import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityUsage } from '@/enums/ability-usage';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { CultureType } from '@/enums/culture-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { FeatureType } from '@/enums/feature-type';
import { HeroClass } from '@/models/class';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

const aranox: Ancestry = {
	id: 'aranox',
	name: 'Aranox',
	description: `
*By Marc Aranha*

The Aranox are direct decendents of Minotaurs. After the rebellion against the Beast Lords of Kham, most Minotaurs scattered, driven by a bestial urge to hunt and settle on labyrinthine terrain. Wandering alone or in small tribes, the Minotaurs were slowly consumed by the beast within, until little remained but a constant hunger and rage, turning them into the monstrous creatures many know today.

However, some Minotaur resisted this hunger, seeking to find balance with their inner beast in order to retain their sense of self and their human origins. Bonded by purpose and community, these Minotaur formed larger clans, far from the eyes of civilization, and became the Aranox.

The Aranox ability to stave off the beast for so long is attributed to their Life Oath. While Minotaurs possess a fierce loyalty to those they bond with, the Aranox discovered a means to tap into that bond, pledging themselves to another with ritual and Shamanic ceremony. The beast in each was stifled by sharing it with another. Together, two souls became a shield and a salvation.

Aranox generally look upon Minotaurs with sadness, often referring to them as 'those who are lost'. Aranox shun their forebears and some even hunt solitary Minotaur, considering death a mercy. This belief may be explained by rumors suggesting that when an Aranox loses their bonded partner, the loss of the Life Oath begins an irreversible descent into madness and rage.

It is whispered that, with the Life Oath broken, it is not a matter of 'if' but 'when' the beast takes hold again, for each Aranox can only ever have one Life Oath. Thus, an afflicted Aranox will go into self-exile to spare the larger community. It is a fate no Aranox will speak of, that each will one day become Minotaur once again. In the end, the beast within is always there. Waiting.`,
	features: [
		FactoryLogic.feature.createSize({
			id: 'aranox-1',
			name: 'Beast Within',
			description: 'Your Minotaur forebears were consumed by the beast, giving them their monstrous size. Your tenuous control has made you smaller by comparison, but the beast within is still there, waiting.',
			sizeValue: 1,
			sizeMod: 'L'
		}),
		FactoryLogic.feature.createChoice({
			id: 'aranox-2',
			name: 'Aranox Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'aranox-2a',
						name: 'Always Angry',
						description: 'The beast rages within you, and its anger makes you incredibly strong. You gain an edge on tests made to lift and haul heavy objects. In addition, whenever you force move a creature or object, the forced movement distance gains a +1 bonus.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aranox-2b',
						name: 'Goring Horns',
						description: 'Your horns aren\'t just imposing, they\'re also sharp. Once per round when you make a melee strike, you can deal extra damage with the strike equal to your highest characteristic score.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSpeed({
						id: 'aranox-2c',
						name: 'Leaping Strides',
						description: 'Your powerful legs make you faster.',
						speed: 6
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'aranox-2d',
						name: 'Stubborn Resolve',
						description: 'You\'ll move when you want to, and not a moment sooner.',
						field: FeatureField.Stability,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aranox-2e',
						name: 'That Tickles',
						description: 'You are able to shrug off the puny blows of your enemies. Your Might score is treated as 1 higher for the purpose of resisting potencies, and you gain an edge on Might tests when called for to resist environmental effects or a creature\'s traits or abilities.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'aranox-2f',
							name: 'Unleash',
							description: 'With a ferocious roar, you strike out with fist and hoof.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'Each enemy in the area',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Presence ],
										tier1: '2 damage',
										tier2: '5 damage; push 1',
										tier3: '7 damage; push 2'
									})
								)
							]
						})
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: FactoryLogic.createCulture('Aranox', 'Secluded, communal, labor.', CultureType.Ancestral, EnvironmentData.secluded, OrganizationData.communal, UpbringingData.labor, 'Khamish')
};

const solar: Ancestry = {
	id: 'solar',
	name: 'Solar',
	description: `
*By Jenny [REDACTED]*

Across the upper planes, angelic beings with hearts of light and souls of fire ward off evil within the known universe, smiting those who would attempt to snuff out its light. With fiery hair and skin in hues of yellow, red, blue, or gray, constellations of nebulous space dance beneath their skin.

Solar are the embodiment of justice and divine intervention. Said to be born of dying stars, created by Archimedes, god of marvels, to act as divine arbiters between worlds.

Those who've met a solar could tell you they hail from an alien world, governed by divine morals and a code they call the "Oblivion Singularity". They travel across planes, answering prayers from the lost and the damned, falling from the skies to enact their justice.

Solars have a strong moral code, but a simple one. Treat one with kindness, and you'll receive the same. Few who've ever treated one with cruelty and malice have ever lived to tell the tale.`,
	features: [
		FactoryLogic.feature.createDamageModifier({
			id: 'solar-1',
			name: 'Supernova',
			description: '',
			modifiers: [
				FactoryLogic.damageModifier.createPerLevel({
					damageType: DamageType.Fire,
					modifierType: DamageModifierType.Immunity,
					value: 1
				}),
				FactoryLogic.damageModifier.createPerLevel({
					damageType: DamageType.Holy,
					modifierType: DamageModifierType.Immunity,
					value: 1
				})
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'solar-2',
			name: 'Solar Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-1',
						name: 'Dawnbreaker',
						description: 'The rising sun grants you strength. Whenever you finish a respite, you gain temporary Stamina equal to half your recovery value that lasts until you finish a respite.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-2',
						name: 'Divine Arbiter',
						description: 'Your burning radiance empowers your attacks. Whenever you use an ability that deals untyped damage, that ability can deal fire damage or holy damage instead.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'solar-2-3',
							name: 'Heat Death',
							description: 'A shining star, born anew.',
							type: FactoryLogic.type.createTrigger('The first time in an encounter a creature deals damage to you that leaves you dying', { free: true }),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'Each enemy in the area',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Presence ],
										tier1: '2 fire or holy damage; push 1',
										tier2: '5 fire or holy damage; push 2',
										tier3: '7 fire or holy damage; push 3'
									})
								),
								FactoryLogic.createAbilitySectionText('If you reduce a creature to 0 Stamina with this ability, you can spend a Recovery.')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'solar-2-4',
						name: 'Starscape Navigator',
						features: [
							FactoryLogic.feature.createSkillChoice({
								id: 'solar-2-4a',
								selected: [ 'Navigate' ]
							}),
							FactoryLogic.feature.create({
								id: 'solar-2-4b',
								name: 'Starscape Navigator',
								description: 'You gain an edge on tests to navigate at night. You always know which way is north and what time of day it is.'
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-5',
						name: 'Solar Flare',
						description: 'Your burning starlight escapes in violent bursts. The first time on a turn an enemy damages you with a free strike, you can deal fire or holy damage to them equal to your highest characteristic as a free triggered action.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-6',
						name: 'Sunlight Saint',
						description: 'Your divine visage is basked upon by believers. You gain an edge on tests made to interact with priests, acolytes, and other particularly religious individuals.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSize({
						id: 'solar-2-7',
						name: 'Supergiant',
						description: 'You were born from a supergiant star, reflected in your immense stature.',
						sizeValue: 1,
						sizeMod: 'L'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'solar-2-8',
						name: 'You Cannot Escape My Grasp',
						description: 'You radiate solar energy that draws your enemies closer to your event horizon. Any enemy that starts its turn within 1 square of you can\'t shift.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'solar-2-9',
						name: 'Flight',
						features: [
							FactoryLogic.feature.create({
								id: 'solar-2-9a',
								name: 'Flight',
								description: 'You possess wings made of fire and light powerful enough to take you airborne. While using your wings to fly, you can stay aloft for a number of rounds equal to your Might score (minimum 1 round) before you fall. While using your wings to fly at 3rd level or lower, you have damage weakness 5.'
							}),
							FactoryLogic.feature.createMovementMode({
								id: 'solar-2-9b',
								mode: 'Fly'
							})
						]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'solar-2-10',
							name: 'Shooting Star',
							description: 'Like a piece of heaven falling to earth, you descend.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'Each enemy in the area',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Presence ],
										tier1: '2 fire or holy damage',
										tier2: '5 fire or holy damage',
										tier3: '7 fire or holy damage; prone'
									})
								),
								FactoryLogic.createAbilitySectionText('You can use this ability when you land after a fall on your turn. You reduce the effective height of the fall by twice your highest characteristic. You don\'t land prone from the fall, and the damage of this ability increases by 1 for each square you fell.')
							]
						})
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: FactoryLogic.createCulture('Solar', 'Urban, bureaucratic, noble.', CultureType.Ancestral, EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.noble, 'Axiomatic')
};

const scion: HeroClass = {
	id: 'scion',
	name: 'Scion',
	description: `
*By Ben Shabtai*

You were deemed worthy of a secret Art unknown to most, allowing you to weave steel and magic into a single, fluid dance. Passed down through an unbroken chain of master and disciple, this ancient discipline was entrusted to you, its esoteric techniques guiding you toward the cultivation of balance: a harmonious alignment of movement, feeling, and intent.

As a scion, you move with purpose - each strike empowered to suit the moment, whether to wound, disrupt, or disable, your flexibility is unmatched. At the height of your mastery, you are the eye of the storm: utterly calm, yet entirely devastating.`,
	subclassName: 'Art',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[
			Characteristic.Agility,
			Characteristic.Reason
		]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				{
					id: 'O9HoOpa7euJhtYOU',
					name: 'Stamina',
					description: '',
					type: FeatureType.Bonus,
					data: {
						field: FeatureField.Stamina,
						value: 21,
						valueFromController: null,
						valueCharacteristics: [],
						valueCharacteristicMultiplier: 1,
						valuePerLevel: 9,
						valuePerEchelon: 0
					}
				},
				{
					id: 'JOGoalJHZrxV29hI',
					name: 'Recoveries',
					description: '',
					type: FeatureType.Bonus,
					data: {
						field: FeatureField.Recoveries,
						value: 8,
						valueFromController: null,
						valueCharacteristics: [],
						valueCharacteristicMultiplier: 1,
						valuePerLevel: 0,
						valuePerEchelon: 0
					}
				},
				{
					id: 'AQVZO67b5ARr837x',
					name: 'Balance',
					description: '',
					type: FeatureType.HeroicResource,
					data: {
						type: 'heroic',
						gains: [
							{
								trigger: 'Start of your turn',
								value: '2',
								tag: 'Start 1'
							},
							{
								trigger: 'The first time in a combat round that you or an ally within 10 squares of you uses an ability with a Weapon tag',
								value: '1',
								tag: 'Weapon 1'
							},
							{
								tag: 'Magic 1',
								trigger: 'The first time in a combat round that you or an ally within 10 squares of you uses an ability with a Magic tag',
								value: '1'
							}
						],
						details: '',
						canBeNegative: false,
						value: 0
					}
				},
				{
					id: 'DPrp53cyrPmKlK8Q',
					name: 'Kit',
					description: 'You can use and the gain the benefits of a kit.',
					type: FeatureType.Kit,
					data: {
						types: [
							''
						],
						count: 1,
						selected: []
					}
				},
				{
					id: 'k9atwGnHLUisOS3g',
					name: 'Magic Skill',
					description: '',
					type: FeatureType.SkillChoice,
					data: {
						options: [],
						listOptions: [],
						count: 1,
						selected: [ 'Magic' ]
					}
				},
				{
					id: 'szzG0j9VXTie1vzU',
					name: 'Strategy Skill',
					description: '',
					type: FeatureType.SkillChoice,
					data: {
						options: [],
						listOptions: [],
						count: 1,
						selected: [ 'Strategy' ]
					}
				},
				{
					id: 'wWXEEpo7fYtbd7H5',
					name: 'Exploration Skills',
					description: '',
					type: FeatureType.SkillChoice,
					data: {
						options: [],
						listOptions: [
							SkillList.Exploration
						],
						count: 2,
						selected: []
					}
				},
				{
					id: 'ugwKwhH4ZUEz6SO5',
					name: 'Enweave',
					description: 'Your mastery of balance allows you to channel magic through your weapon. You gain the following ability.',
					type: FeatureType.Ability,
					data: {
						ability: {
							id: 'WX9IShLh3LTdbYEZ',
							name: 'Enweave',
							description: 'You weave magic into your weapon, preparing to unleash it with your next strike.',
							type: {
								usage: AbilityUsage.Maneuver,
								free: false,
								trigger: '',
								time: '',
								qualifiers: [],
								freeStrike: false
							},
							keywords: [
								'Magic',
								'Weapon'
							],
							distance: [
								{
									type: AbilityDistanceType.Special,
									value: 0,
									value2: 0,
									within: 0,
									special: '',
									qualifier: ''
								}
							],
							target: 'Self',
							cost: 1,
							repeatable: false,
							minLevel: 1,
							preEffect: '',
							powerRoll: null,
							test: null,
							effect: '',
							strained: '',
							alternateEffects: [],
							spend: [],
							persistence: [],
							sections: [
								{
									type: 'text',
									text: `
Choose one of the following effects, which applies to one target of the next damaging melee weapon ability you use:

* Flame Strike: Damage becomes fire. The target takes fire damage equal to triple your Reason score.
* Gale Strike: Damage becomes lightning. You can either push the target, or yourself away from the target, a distance equal to double your Reason score.
* Freeze Strike: Damage becomes cold. The target takes cold damage equal to your Reason score. The target is slowed (save ends).
* Crimson Strike: Damage becomes corruption. The target is bleeding (save ends).
* Umbral Strike: Damage becomes psychic. The target has damage weakness equal to your Reason score (save ends).
* Explosive Strike: Damage becomes sonic. Each enemy in range 2 of the target is dealt sonic damage equal to your Reason score.

Effects other than the changing of the damage type are applied after the ability is resolved. If you use this ability more than once before it applies to an ability, you can choose one of the damage types to apply to the affected ability, but apply all of the effects.

You cannot use Enweave more than twice before applying its effect to an ability.`
								},
								{
									type: 'field',
									name: 'Spend',
									value: 2,
									repeatable: false,
									effect: 'This ability becomes a free maneuver instead.'
								}
							]
						}
					}
				},
				{
					id: 'kqUeQx0h23EhxxUc',
					name: 'Signature Ability',
					description: 'Select one signature ability from the options below. Signature abilities can be used at will.',
					type: FeatureType.ClassAbility,
					data: {
						classID: undefined,
						cost: 'signature',
						allowAnySource: false,
						count: 1,
						minLevel: 1,
						selectedIDs: []
					}
				},
				{
					id: 'iRn3qBxVIwTtBoRi',
					name: '3-Balance Ability',
					description: 'Choose one heroic ability from the following options, each of which costs 3 balance to use.',
					type: FeatureType.ClassAbility,
					data: {
						classID: undefined,
						cost: 3,
						allowAnySource: false,
						count: 1,
						minLevel: 1,
						selectedIDs: []
					}
				},
				{
					id: 'nl3lpEXmEYpYBZVW',
					name: '5-Balance Ability',
					description: 'Choose one heroic ability from the following options, each of which costs 5 balance to use.',
					type: FeatureType.ClassAbility,
					data: {
						classID: undefined,
						cost: 5,
						allowAnySource: false,
						count: 1,
						minLevel: 1,
						selectedIDs: []
					}
				}
			]
		},
		{
			level: 2,
			features: [
				{
					id: 'rEyShVuQmHFhyvRt',
					name: 'Perk',
					description: 'You gain an exploration, lore, or supernatural perk of your choice.',
					type: FeatureType.Perk,
					data: {
						lists: [
							PerkList.Exploration,
							PerkList.Lore,
							PerkList.Supernatural
						],
						count: 1,
						selected: []
					}
				}
			]
		},
		{
			level: 3,
			features: [
				{
					id: 'OVUKkhTfFMlLKdd6',
					name: 'Cascading Enweave',
					description: 'When using Enweave, you may spend 1 balance to make the chosen effect apply to an additional target within range 5 of the target of your next melee weapon ability. You may choose to use this spend effect more than once, each time costing 1 more balance than the previous time. Each additional target needs to be within range 5 of the previous affected target.',
					type: FeatureType.Text,
					data: null
				},
				{
					id: 'nHkXlESMAT6WMexB',
					name: '7-Balance Ability',
					description: 'Choose one heroic ability from the following options, each of which costs 7 balance to use.',
					type: FeatureType.ClassAbility,
					data: {
						classID: undefined,
						cost: 7,
						allowAnySource: false,
						count: 1,
						minLevel: 1,
						selectedIDs: []
					}
				}
			]
		}
	],
	abilities: [
		{
			id: 'psE8QwJkMo5FGahf',
			name: 'Aether Lash',
			description: 'With a flick of your blade, you etch a line of invisible force, preparing to strike.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Magic',
				'Strike',
				'Weapon',
				'Melee'
			],
			distance: [
				{
					type: AbilityDistanceType.Melee,
					value: 1,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'One creature or object',
			cost: 'signature',
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '2 + A damage',
						tier2: '5 + A damage',
						tier3: '8 + A damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'Before choosing the target of this ability and resolving the power roll, choose a creature or object within range 5. Either vertical pull 4 the target, or vertical pull 4 yourself as if you were the target. When a creature is pulled into the air this way, they do not fall down until the end of your turn, and lose all stability while in the air.'
				}
			]
		},
		{
			id: 'Kyx8UrFs78d0nDWB',
			name: 'Blade Barrier',
			description: 'A sphere of shimmering force unfurls around you as you harry your foe.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Area',
				'Magic'
			],
			distance: [
				{
					type: AbilityDistanceType.Burst,
					value: 1,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'Each creature within area',
			cost: 'signature',
			repeatable: false,
			minLevel: 1,
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '2 damage, push 1',
						tier2: '3 damage, push 1',
						tier3: '5 damage, push 1',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'This ability ignores stability. Gain damage immunity equal to your Reason until the end of your next turn.'
				}
			],
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: []
		},
		{
			id: 'K4iussi8iLx5dRET',
			name: 'Crescent Arc',
			description: 'A precise arc cuts through your foes with the grace of moonlight.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Weapon',
				'Area',
				'Magic'
			],
			distance: [
				{
					type: AbilityDistanceType.Wall,
					value: 3,
					value2: 0,
					within: 1,
					special: '',
					qualifier: ''
				}
			],
			target: 'Each enemy within area',
			cost: 'signature',
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '2 damage',
						tier2: '5 damage',
						tier3: '7 damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'The wall area is only used for targeting, and does not create an actual wall. Each increase to the wall\'s length is doubled.'
				}
			]
		},
		{
			id: 'sa5It8BiU7UVMo3C',
			name: 'Essence Lance',
			description: 'You hurl a lance of force that pierces not flesh, but the core of their being.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Ranged',
				'Strike',
				'Magic'
			],
			distance: [
				{
					type: AbilityDistanceType.Ranged,
					value: 10,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'One creature or object',
			cost: 'signature',
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '6 + R damage',
						tier2: '8 + R damage',
						tier3: '11 + R damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'The target’s characteristic scores are treated as lower by 1 for the sake of resisting potencies (save ends).'
				}
			]
		},
		{
			id: 'SeeQb3AuYSt7LJ2u',
			name: 'Still Edge',
			description: 'You cut into your foe, leaving potential energy in their form - threatening to snap into explosive motion.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Weapon',
				'Magic',
				'Strike'
			],
			distance: [
				{
					type: AbilityDistanceType.Melee,
					value: 1,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'One creature',
			cost: 'signature',
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '3 + A damage',
						tier2: '6 + A damage',
						tier3: '9 + A damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'If the target willingly moves before the end of their next turn, they take damage equal to twice your Reason score.'
				}
			]
		},
		{
			id: 'nEF5J2Lof7zx5C0S',
			name: 'Sever the Moment',
			description: 'You read the flaw in their stance and cut deep.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Strike',
				'Weapon',
				'Magic'
			],
			distance: [
				{
					type: AbilityDistanceType.Melee,
					value: 1,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'One creature',
			cost: 3,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '6 + A damage',
						tier2: '9 + A damage',
						tier3: '13 + A damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'If the target has any condition, this ability deals an additional 10 damage.'
				}
			]
		},
		{
			id: 'KvsM9dDuVqzUpIfn',
			name: 'Full Moon Arc',
			description: 'Your blade traces a perfect circle in red.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Weapon'
			],
			distance: [
				{
					type: AbilityDistanceType.Burst,
					value: 1,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'Each enemy within area',
			cost: 3,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '6 damage',
						tier2: '9 damage',
						tier3: '13 damage',
						crit: ''
					}
				}
			]
		},
		{
			id: '9LLTrUY85AVyIcHI',
			name: 'Veil Piercer',
			description: 'You lance through a veil of mist, fading from sight.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Ranged',
				'Strike',
				'Magic'
			],
			distance: [
				{
					type: AbilityDistanceType.Ranged,
					value: 10,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'One creature',
			cost: 3,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '8 + R damage',
						tier2: '12 + R damage',
						tier3: '16 + R damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'Create a 1 burst area of mist which provides concealment to allies that lasts until the end of your next turn. Allies inside the mist can hide even while observed.'
				}
			]
		},
		{
			id: 'WnkiVZGxk1aSzG4m',
			name: 'Sanguine Thread',
			description: 'Your blade draws a line through flesh, and a thread of life follows - woven back into your form.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Strike',
				'Weapon',
				'Magic'
			],
			distance: [
				{
					type: AbilityDistanceType.Melee,
					value: 1,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'One creature or object',
			cost: 3,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '4 + A damage',
						tier2: '7 + A damage',
						tier3: '11 + A damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'You gain temporary Stamina equal to half the damage dealt by this ability.'
				}
			]
		},
		{
			id: 'XZxWE6QBTKjvPCYM',
			name: 'Lightning Strike',
			description: 'You become lightning, flashing from one place to another, leaving ruin in your wake.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Weapon',
				'Magic',
				'Area'
			],
			distance: [
				{
					type: AbilityDistanceType.Line,
					value: 1,
					value2: 10,
					within: 1,
					special: '',
					qualifier: ''
				}
			],
			target: 'Each enemy within area',
			cost: 5,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '6 lightning damage',
						tier2: '10 lightning damage',
						tier3: '14 lightning damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'You teleport to a square on the opposite side of the area before making the power roll.'
				}
			]
		},
		{
			id: 'D2YGEm6Ic7QrUCwR',
			name: 'Glacial Bloom',
			description: 'Like a flower in bloom, ice explodes onto your foes.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Magic',
				'Area',
				'Ranged'
			],
			distance: [
				{
					type: AbilityDistanceType.Cube,
					value: 3,
					value2: 0,
					within: 10,
					special: '',
					qualifier: ''
				}
			],
			target: 'Each enemy within area',
			cost: 5,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '5 cold damage, A < weak, slowed (save ends)',
						tier2: '8 cold damage, A < average, slowed (save ends)',
						tier3: '11 cold damage, A < strong, restrained (save ends)',
						crit: ''
					}
				}
			]
		},
		{
			id: 'cHb7KRKmqjtzEDNA',
			name: 'Crashing Wave',
			description: 'Leaping skyward, you crash down with the weight of the ocean.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Weapon',
				'Magic',
				'Area'
			],
			distance: [
				{
					type: AbilityDistanceType.Cube,
					value: 3,
					value2: 0,
					within: 1,
					special: '',
					qualifier: ''
				}
			],
			target: 'Each enemy within area',
			cost: 5,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '6 damage; push 2',
						tier2: '9 damage; push 4',
						tier3: '13 damage; push 6',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'You can jump up to 2 squares before resolving the power roll. The targets are force moved one at a time, starting with the targets nearest to you, and can be pushed into other targets in the area.'
				}
			]
		},
		{
			id: 'eGFSaMDQOv3qpxBX',
			name: 'Spirit Rend',
			description: 'You carve through your foe’s spirit, leaving their mind reeling.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Strike',
				'Weapon',
				'Magic'
			],
			distance: [
				{
					type: AbilityDistanceType.Melee,
					value: 1,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'One creature',
			cost: 5,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '6 + A psychic damage; I < weak, dazed (save ends)',
						tier2: '10 + A psychic damage; I < average, dazed (save ends)',
						tier3: '14 + A psychic damage; I < strong, dazed (save ends)',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'While dazed this way, the target\'s characteristic scores are treated as lower by 1 for the sake of resisting potencies.'
				}
			]
		},
		{
			id: '8uSVdpHtYzQ49cU2',
			name: 'Cross Slash',
			description: 'You cleave the air in all directions, blades of force radiating from your stance.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Magic',
				'Area'
			],
			distance: [
				{
					type: AbilityDistanceType.Special,
					value: 0,
					value2: 0,
					within: 0,
					special: 'Four 5 x 1 lines within 1',
					qualifier: ''
				}
			],
			target: 'Each enemy within area',
			cost: 7,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '6 damage',
						tier2: '10 damage',
						tier3: '14 damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'Overlapping lines are treated as a single area.'
				}
			]
		},
		{
			id: 'mejqYrJQuCnj6X12',
			name: 'Godspeed',
			description: 'You surge with arcane power, moving with impossible speed.',
			type: {
				usage: AbilityUsage.Maneuver,
				free: true,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Magic'
			],
			distance: [
				{
					type: AbilityDistanceType.Self,
					value: 0,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'Self',
			cost: 7,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'text',
					text: 'For the rest of the combat encounter you have an additional maneuver per turn, and gain a +5 bonus to speed.'
				}
			]
		},
		{
			id: 'VNtILg0JEcSZMXIw',
			name: 'Reaper\'s Edge',
			description: 'There is power in death.',
			type: {
				usage: AbilityUsage.MainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Melee',
				'Strike',
				'Magic',
				'Weapon'
			],
			distance: [
				{
					type: AbilityDistanceType.Melee,
					value: 1,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'One creature or object',
			cost: 7,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'roll',
					roll: {
						characteristic: [
							Characteristic.Agility
						],
						bonus: 0,
						tier1: '12 + A damage',
						tier2: '18 + A damage',
						tier3: '24 + A damage',
						crit: ''
					}
				},
				{
					type: 'text',
					text: 'If this ability reduces a creature to 0 Stamina, gain 5 balance.'
				}
			]
		},
		{
			id: 'EpYMy07L6kpxn0tk',
			name: 'Spectral Blades',
			description: 'You summon spectral blades, suspended in poise, released with but a thought.',
			type: {
				usage: AbilityUsage.Maneuver,
				free: false,
				trigger: '',
				time: '',
				qualifiers: [],
				freeStrike: false
			},
			keywords: [
				'Magic'
			],
			distance: [
				{
					type: AbilityDistanceType.Self,
					value: 0,
					value2: 0,
					within: 0,
					special: '',
					qualifier: ''
				}
			],
			target: 'Self',
			cost: 7,
			repeatable: false,
			minLevel: 1,
			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: [],
			sections: [
				{
					type: 'text',
					text: 'Place a d6 die set to 6 to track this effect. Once a turn you may reduce the die by any amount up to its current value. Then, distribute that many spectral blades among enemies within range 5 as you choose. Each blade deals 4 + your Reason score in damage. You cannot assign more than one blade per enemy. In addition, whenever an enemy in range 5 is affected by a potency effect, you may reduce the die by 1 to increase the potency of the ability by 1.'
				}
			]
		}
	],
	subclasses: [
		{
			id: 'vGtuuw0cYpAkkPUN',
			name: 'Blinkblade',
			description: 'A master of teleportation magic, the Blinkblades weave in and out of reach with uncanny speed - difficult to catch, and harder still to escape.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						{
							id: 'R6zmbAYzj5QQnf5r',
							name: 'Blinkblade Skill',
							description: '',
							type: FeatureType.SkillChoice,
							data: {
								options: [],
								listOptions: [],
								count: 1,
								selected: [ 'Gymnastics' ]
							}
						},
						{
							id: 'd7U62IAB3V2YaasD',
							name: 'Phase Step',
							description: 'Whenever you disengage, you may teleport instead of shifting.',
							type: FeatureType.Bonus,
							data: {
								field: FeatureField.Disengage,
								value: 1,
								valueFromController: null,
								valueCharacteristics: [],
								valueCharacteristicMultiplier: 1,
								valuePerLevel: 0,
								valuePerEchelon: 0
							}
						},
						{
							id: 'ItluiV0gSXKqjgz7',
							name: 'Blink',
							description: '',
							type: FeatureType.Ability,
							data: {
								ability: {
									id: 'UZK6xyl5g71nt7t8',
									name: 'Blink',
									description: '',
									type: {
										usage: AbilityUsage.Maneuver,
										free: false,
										trigger: '',
										time: '',
										qualifiers: [],
										freeStrike: false
									},
									keywords: [
										'Magic'
									],
									distance: [
										{
											type: AbilityDistanceType.Self,
											value: 0,
											value2: 0,
											within: 0,
											special: '',
											qualifier: ''
										}
									],
									target: 'Self',
									cost: 0,
									repeatable: false,
									minLevel: 1,
									preEffect: '',
									powerRoll: null,
									test: null,
									effect: '',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: [],
									sections: [
										{
											type: 'text',
											text: 'You teleport up to 7 squares.'
										},
										{
											type: 'field',
											name: 'Spend',
											value: 5,
											repeatable: false,
											effect: 'If used immediately after performing an ability that targets only one enemy, you may repeat that ability at your target destination without needing to spend the base cost as long as it costs 5 balance or fewer.'
										}
									]
								}
							}
						},
						{
							id: '9eIp7KGA2RYrPQWk',
							name: 'Flicker Step',
							description: '',
							type: FeatureType.Ability,
							data: {
								ability: {
									id: 'GN04C4n7iSFme7EB',
									name: 'Flicker Step',
									description: 'You instinctively teleport to avoid danger.',
									type: {
										usage: AbilityUsage.Trigger,
										free: false,
										trigger: 'You take damage',
										time: '',
										qualifiers: [],
										freeStrike: false
									},
									keywords: [
										'Magic'
									],
									distance: [
										{
											type: AbilityDistanceType.Self,
											value: 0,
											value2: 0,
											within: 0,
											special: '',
											qualifier: ''
										}
									],
									target: 'Self',
									cost: 0,
									repeatable: false,
									minLevel: 1,
									preEffect: '',
									powerRoll: null,
									test: null,
									effect: '',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: [],
									sections: [
										{
											type: 'text',
											text: 'You take half the damage, you can then teleport up to 4 squares after the triggering effect resolves.'
										},
										{
											type: 'field',
											name: 'Spend',
											value: 1,
											repeatable: true,
											effect: 'You teleport an additional 2 squares for each balance spent.'
										}
									]
								}
							}
						}
					]
				},
				{
					level: 2,
					features: [
						{
							id: '3cCLubzSJqOAXhTt',
							name: 'Afterimage',
							description: 'Whenever you teleport by any means, you leave a distracting afterimage in your previous location until the start of your next turn. Power rolls targeting enemies adjacent to one or more afterimages gain an edge. The afterimage does not occupy space and cannot be targeted or destroyed. At the start of any turn when an afterimage fades, you can choose to teleport to its location.',
							type: FeatureType.Text,
							data: null
						},
						{
							id: 'O1IBnmfpWK2A0Pzm',
							name: '2nd Level Blinkblade Ability',
							description: '',
							type: FeatureType.Choice,
							data: {
								options: [
									{
										feature: {
											id: 's57fCGoWcBvDEJFS',
											name: 'Phase Assault',
											description: '',
											type: FeatureType.Ability,
											data: {
												ability: {
													id: 'iUFlQNI03qMYfk3o',
													name: 'Phase Assault',
													description: 'You blink between foes, each reappearance marked by a precise, cutting strike.',
													type: {
														usage: AbilityUsage.MainAction,
														free: false,
														trigger: '',
														time: '',
														qualifiers: [],
														freeStrike: false
													},
													keywords: [
														'Magic',
														'Melee',
														'Strike',
														'Weapon'
													],
													distance: [
														{
															type: AbilityDistanceType.Special,
															value: 0,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'Special',
													cost: 5,
													repeatable: false,
													minLevel: 1,
													sections: [
														{
															type: 'roll',
															roll: {
																characteristic: [
																	Characteristic.Agility
																],
																bonus: 0,
																tier1: '3 damage',
																tier2: '6 damage',
																tier3: '9 damage',
																crit: ''
															}
														},
														{
															type: 'text',
															text: 'Choose a target within range 5, teleport to an unoccupied space adjacent to it, then apply the power roll result to it. Repeat this effect up to 3 more times. The same target cannot be chosen more than once.'
														}
													],
													preEffect: '',
													powerRoll: null,
													test: null,
													effect: '',
													strained: '',
													alternateEffects: [],
													spend: [],
													persistence: []
												}
											}
										},
										value: 1
									},
									{
										feature: {
											id: 'zZgsWEUpPQHv4vYv',
											name: 'Horizon Step',
											description: '',
											type: FeatureType.Ability,
											data: {
												ability: {
													id: 'LFPajs7vWR1FdtDa',
													name: 'Horizon Step',
													description: 'None can escape your grasp.',
													type: {
														usage: AbilityUsage.MainAction,
														free: false,
														trigger: '',
														time: '',
														qualifiers: [],
														freeStrike: false
													},
													keywords: [
														'Magic',
														'Melee',
														'Strike',
														'Weapon'
													],
													distance: [
														{
															type: AbilityDistanceType.Melee,
															value: 1,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'One creature',
													cost: 5,
													repeatable: false,
													minLevel: 1,
													sections: [
														{
															type: 'roll',
															roll: {
																characteristic: [
																	Characteristic.Agility
																],
																bonus: 0,
																tier1: '14 + A damage',
																tier2: '18 + A damage',
																tier3: '23 + A damage',
																crit: ''
															}
														},
														{
															type: 'text',
															text: 'You may teleport to up to 15 squares before this strike.'
														}
													],
													preEffect: '',
													powerRoll: null,
													test: null,
													effect: '',
													strained: '',
													alternateEffects: [],
													spend: [],
													persistence: []
												}
											}
										},
										value: 1
									}
								],
								count: 1,
								selected: []
							}
						}
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
			id: 'nCi6Ufmfz74H70Pr',
			name: 'Runewright',
			description: 'The Runewright wields the ancient craft of runebranding to sear volatile runes onto living beings and shape the battlefield through groundlaid writs. ',
			featuresByLevel: [
				{
					level: 1,
					features: [
						{
							id: '5hK9y3rFtS2uW5d0',
							name: 'Runewright Skill',
							description: '',
							type: FeatureType.SkillChoice,
							data: {
								options: [],
								listOptions: [],
								count: 1,
								selected: [ 'Mechanics' ]
							}
						},
						{
							id: '0oQww7Zrc46k3jqm',
							name: 'Runebrand',
							description: '',
							type: FeatureType.Ability,
							data: {
								ability: {
									id: 'PG0F4c5cIccZlDl4',
									name: 'Runebrand',
									description: 'You imprint a runic sigil on your target, priming it for detonation.',
									type: {
										usage: AbilityUsage.Maneuver,
										free: false,
										trigger: '',
										time: '',
										qualifiers: [],
										freeStrike: false
									},
									keywords: [
										'Magic'
									],
									distance: [
										{
											type: AbilityDistanceType.Melee,
											value: 1,
											value2: 0,
											within: 0,
											special: '',
											qualifier: ''
										}
									],
									target: 'One creature or object',
									cost: 1,
									repeatable: false,
									minLevel: 1,
									preEffect: '',
									powerRoll: null,
									test: null,
									effect: '',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: [],
									sections: [
										{
											type: 'text',
											text: 'When using this ability, choose one of the Enweave effects, ignoring the component that changes the damage type of your next strike. You brand your target with a rune imbued by the effect you chose, priming it for detonation. At the end of your turn, the rune is primed. When a rune is primed, the next time the branded target is damaged, the rune detonates, applying its effect to every enemy within range 2 of it. If the branded effect already has an area, it is increased by 2 instead. If the branded effect has a push effect, it is relative to the branded target’s location.'
										},
										{
											type: 'field',
											name: 'Spend',
											value: 2,
											repeatable: false,
											effect: 'The rune is immediately primed, allowing you to detonate it this turn. '
										}
									]
								}
							}
						},
						{
							id: 'fOqh81YqHhP9SSyC',
							name: 'Ensnaring Rune',
							description: '',
							type: FeatureType.Ability,
							data: {
								ability: {
									id: 'MnzMxsJZtPA8FrFs',
									name: 'Ensnaring Rune',
									description: 'Your foe steps on one of your many traps.',
									type: {
										usage: AbilityUsage.Trigger,
										free: false,
										trigger: 'The target moves',
										time: '',
										qualifiers: [],
										freeStrike: false
									},
									keywords: [
										'Magic'
									],
									distance: [
										{
											type: AbilityDistanceType.Ranged,
											value: 10,
											value2: 0,
											within: 0,
											special: '',
											qualifier: ''
										}
									],
									target: 'One enemy',
									cost: 0,
									repeatable: false,
									minLevel: 1,
									preEffect: '',
									powerRoll: null,
									test: null,
									effect: '',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: [],
									sections: [
										{
											type: 'text',
											text: 'The target takes damage equal to triple your Reason score.'
										},
										{
											type: 'field',
											name: 'Spend',
											value: 1,
											repeatable: false,
											effect: 'If the target has I < average, they are slowed (EoT).'
										}
									]
								}
							}
						}
					]
				},
				{
					level: 2,
					features: [
						{
							id: 'KXLNgaULFP7C3Kkx',
							name: 'Liminal Runes',
							description: 'An enemy carrying an undetonated runebrand receives a bane on their power rolls. An ally carrying an undetonated runebrand gains an edge on their power rolls.',
							type: FeatureType.Text,
							data: null
						},
						{
							id: 'r7jDReOjykBnFpp2',
							name: '2nd-Level Art Ability',
							description: '',
							type: FeatureType.Choice,
							data: {
								options: [
									{
										feature: {
											id: 'Nl2TsJd6HSAgrZBQ',
											name: 'Writ of Power',
											description: '',
											type: FeatureType.Ability,
											data: {
												ability: {
													id: 'HnQmrJFiyb8LEN1l',
													name: 'Writ of Power',
													description: 'You brand an arcane writ onto the ground, scorching foes, or soothing allies.',
													type: {
														usage: AbilityUsage.Maneuver,
														free: false,
														trigger: '',
														time: '',
														qualifiers: [],
														freeStrike: false
													},
													keywords: [
														'Magic',
														'Area'
													],
													distance: [
														{
															type: AbilityDistanceType.Burst,
															value: 2,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'Each enemy within area',
													cost: 5,
													repeatable: false,
													minLevel: 1,
													preEffect: '',
													powerRoll: null,
													test: null,
													effect: '',
													strained: '',
													alternateEffects: [],
													spend: [],
													persistence: [],
													sections: [
														{
															type: 'text',
															text: `
The area remains until the end of the encounter or you are dying. Choose one of the following effects to apply to the area:

* Writ of Flame: Each enemy who enters the area for the first time in a combat round or starts their turn there takes damage equal to triple your Reason score.
* Writ of Sanctuary: Each ally, or youreslf, who enters the area for the first time in a combat round or starts their turn there may either spend a recovery, or end one effect that is ended by a saving throw or ends at the end of their turn.`
														}
													]
												}
											}
										},
										value: 1
									},
									{
										feature: {
											id: '4g4MOopMSwFNcUr5',
											name: 'Writ of Binding',
											description: '',
											type: FeatureType.Ability,
											data: {
												ability: {
													id: 'amPXemJUIcHPs4Zx',
													name: 'Writ of Binding',
													description: 'Arcane chains erupt from the ground, coling around your foe.',
													type: {
														usage: AbilityUsage.MainAction,
														free: false,
														trigger: '',
														time: '',
														qualifiers: [],
														freeStrike: false
													},
													keywords: [
														'Magic',
														'Ranged'
													],
													distance: [
														{
															type: AbilityDistanceType.Ranged,
															value: 5,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'One creature',
													cost: 5,
													repeatable: false,
													minLevel: 1,
													preEffect: '',
													powerRoll: null,
													test: null,
													effect: '',
													strained: '',
													alternateEffects: [],
													spend: [],
													persistence: [],
													sections: [
														{
															type: 'roll',
															roll: {
																characteristic: [
																	Characteristic.Reason
																],
																bonus: 0,
																tier1: '6 damage; M < weak, restrained (save ends)',
																tier2: '10 damage; M < average, restrained (save ends)',
																tier3: '14 damage; M < strong, restrained (save ends)',
																crit: ''
															}
														},
														{
															type: 'text',
															text: 'While restrained this way, the target cannot teleport by any means.'
														}
													]
												}
											}
										},
										value: 1
									}
								],
								count: 1,
								selected: []
							}
						}
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
			id: 'HK8oez2ay5ZQNhfp',
			name: 'Soulforged',
			description: 'The Soulforged binds a fragment of their soul into a chosen weapon, forging a sentient extension of their will - a Soulblade. Through this bond, they shape and empower their blade, adapting its form and function to meet the shifting demands of battle. ',
			featuresByLevel: [
				{
					level: 1,
					features: [
						{
							id: 'YMhhEe1upKHfymOH',
							name: 'Soulforged Skill',
							description: '',
							type: FeatureType.SkillChoice,
							data: {
								options: [],
								listOptions: [],
								count: 1,
								selected: [ 'Empathize' ]
							}
						},
						{
							id: '1jXjv5q9Tmlax2TD',
							name: 'Soulbound',
							description: `
Your Soulblade is more than a weapon - it's an extension of your soul. Its appearance reflects the innermost truth of who you are. You are never truly separated from it; if it's not in your hands, you can summon it instantly as a free maneuver.

Your Soulforged abilities can only be used with your Soulblade. To bond with a new weapon, you must perform a ritual lasting several hours to transfer your bound soul fragment from another weapon to it. You may bond with as many weapons as a kit grants.

By default, your Soulblade is sentient and capable of communicating with you, though you may choose to forgo this aspect of it.`,
							type: FeatureType.Text,
							data: null
						},
						{
							id: 'NcxnwKBSyd3kjhNW',
							name: 'Soulshape',
							description: '',
							type: FeatureType.Ability,
							data: {
								ability: {
									id: 'uajSniPPGVxpq9jX',
									name: 'Soulshape',
									description: 'By reshaping the bound fragment of your soul, you persuade your Soulblade to take on a new form.',
									type: {
										usage: AbilityUsage.Maneuver,
										free: false,
										trigger: '',
										time: '',
										qualifiers: [],
										freeStrike: false
									},
									keywords: [
										'Magic'
									],
									distance: [
										{
											type: AbilityDistanceType.Self,
											value: 0,
											value2: 0,
											within: 0,
											special: '',
											qualifier: ''
										}
									],
									target: 'Self',
									cost: 0,
									repeatable: false,
									minLevel: 1,
									preEffect: '',
									powerRoll: null,
									test: null,
									effect: '',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: [],
									sections: [
										{
											type: 'text',
											text: `
Choose a modified form for your Soulblade, each granting a distinct effect until the start of your next turn:

* Expansive: Melee weapon abilities have their area increased by 1. If the area is a line, increase the size of the larger dimension by 2 instead.
* Powerful: Melee weapon abilities with rolled damage have their damage increased by your Reason score. If the ability force moves a target, the forced movement distance gains a bonus equal to your Reason score.
* Resonant: Melee weapon abilities have their potency increased by 1.
* Reaching: Melee weapon abilities have their distance increased by double your Reason.`
										},
										{
											type: 'field',
											name: 'Spend',
											value: 2,
											repeatable: false,
											effect: 'Any numeric benefit of the chosen form is doubled in value.'
										}
									]
								}
							}
						},
						{
							id: 'AMWKBtiwVe5Xbw63',
							name: 'Blade\'s Will',
							description: '',
							type: FeatureType.Ability,
							data: {
								ability: {
									id: 'QfuRewVhDSo3Fcnh',
									name: 'Blade\'s Will',
									description: 'As if moving by its own accord, your Soulblade parries and ripostes.',
									type: {
										usage: AbilityUsage.Trigger,
										free: false,
										trigger: 'A creature deals damage to the target.',
										time: '',
										qualifiers: [],
										freeStrike: false
									},
									keywords: [
										'Melee',
										'Magic',
										'Weapon'
									],
									distance: [
										{
											type: AbilityDistanceType.Ranged,
											value: 5,
											value2: 0,
											within: 0,
											special: '',
											qualifier: ''
										}
									],
									target: 'Self or one ally',
									cost: 0,
									repeatable: false,
									minLevel: 1,
									preEffect: '',
									powerRoll: null,
									test: null,
									effect: '',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: [],
									sections: [
										{
											type: 'text',
											text: 'You can shift a number of squares equal to your Reason score. If the target is you, or if you end this shift adjacent to the target, the target takes half the damage.'
										},
										{
											type: 'field',
											name: 'Spend',
											value: 2,
											repeatable: false,
											effect: 'Make a melee free strike against the creature that damaged the target.'
										}
									]
								}
							}
						}
					]
				},
				{
					level: 2,
					features: [
						{
							id: 'bzETrObsFfukTsKF',
							name: 'Soul Instinct',
							description: 'Once per turn, you can make a melee free strike whenever a creature moves from a square adjacent to you to another square adjacent to you. In addition, your stability is increased by 1.',
							type: FeatureType.Text,
							data: null
						},
						{
							id: 'zMh3T36dRkETvXP5',
							name: '2nd-Level Soulforged Ability',
							description: '',
							type: FeatureType.Choice,
							data: {
								options: [
									{
										feature: {
											id: 's9kdt7HC4gyw0SOQ',
											name: 'Soul Form',
											description: '',
											type: FeatureType.Ability,
											data: {
												ability: {
													id: 'cvF4m32z5QKl8fuv',
													name: 'Soul Form',
													description: 'Your Soulblade takes its true form, flaring with power.',
													type: {
														usage: AbilityUsage.Maneuver,
														free: false,
														trigger: '',
														time: '',
														qualifiers: [],
														freeStrike: false
													},
													keywords: [
														'Magic'
													],
													distance: [
														{
															type: AbilityDistanceType.Self,
															value: 0,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'Self',
													cost: 5,
													repeatable: false,
													minLevel: 1,
													preEffect: '',
													powerRoll: null,
													test: null,
													effect: '',
													strained: '',
													alternateEffects: [],
													spend: [],
													persistence: [],
													sections: [
														{
															type: 'text',
															text: 'Until the end of the encounter, whenever you gain the benefit of a Soulshape form, you may choose an additional form to benefit from. You can use the spend effect for no cost on both form benefits. You may use the Soulshape maneuver.'
														}
													]
												}
											}
										},
										value: 1
									},
									{
										feature: {
											id: 'EqBgynwXKZi5gPhh',
											name: 'Soul Spiral',
											description: '',
											type: FeatureType.Ability,
											data: {
												ability: {
													id: 'QKw9odWNUqve0maB',
													name: 'Soul Spiral',
													description: 'Your Soulblade unfurls in a violent spiral, crashing through foes.',
													type: {
														usage: AbilityUsage.MainAction,
														free: false,
														trigger: '',
														time: '',
														qualifiers: [],
														freeStrike: false
													},
													keywords: [
														'Magic',
														'Weapon',
														'Melee',
														'Area'
													],
													distance: [
														{
															type: AbilityDistanceType.Burst,
															value: 2,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'Each enemy within area',
													cost: 5,
													repeatable: false,
													minLevel: 1,
													preEffect: '',
													powerRoll: null,
													test: null,
													effect: '',
													strained: '',
													alternateEffects: [],
													spend: [],
													persistence: [],
													sections: [
														{
															type: 'roll',
															roll: {
																characteristic: [
																	Characteristic.Agility
																],
																bonus: 0,
																tier1: '5 damage',
																tier2: '8 damage; push 1',
																tier3: '11 damage; push 3',
																crit: ''
															}
														}
													]
												}
											}
										},
										value: 1
									}
								],
								count: 1,
								selected: []
							}
						}
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
	characteristics: [],
	type: 'standard'
};

export const communityPrerelease: Sourcebook = {
	id: 'community-prerelease',
	name: 'Community (pre-release)',
	description: 'Selected community creations (pre-release).',
	type: SourcebookType.Community,
	adventures: [],
	ancestries: [],
	careers: [],
	classes: [
		scion
	],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};

export const community: Sourcebook = {
	id: 'community',
	name: 'Community',
	description: 'Selected community creations.',
	type: SourcebookType.Community,
	adventures: [],
	ancestries: [
		aranox,
		solar
	],
	careers: [],
	classes: [],
	complications: [],
	cultures: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
