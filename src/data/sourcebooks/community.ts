import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { CultureType } from '@/enums/culture-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
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
		[ Characteristic.Agility, Characteristic.Reason ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'O9HoOpa7euJhtYOU',
					name: 'Stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'JOGoalJHZrxV29hI',
					name: 'Recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'AQVZO67b5ARr837x',
					name: 'Balance',
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
					]
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'DPrp53cyrPmKlK8Q',
					name: 'Kit',
					description: 'You can use and the gain the benefits of a kit.'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'k9atwGnHLUisOS3g',
					selected: [ AbilityKeyword.Magic ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'szzG0j9VXTie1vzU',
					selected: [ 'Strategy' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'wWXEEpo7fYtbd7H5',
					listOptions: [ SkillList.Exploration ],
					count: 2
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'WX9IShLh3LTdbYEZ',
						name: 'Enweave',
						description: 'You weave magic into your weapon, preparing to unleash it with your next strike.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSpecial('') ],
						target: 'Self',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText(`
Choose one of the following effects, which applies to one target of the next damaging melee weapon ability you use:

* **Flame Strike**: Damage becomes fire. The target takes fire damage equal to triple your Reason score.
* **Gale Strike**: Damage becomes lightning. You can either push the target, or yourself away from the target, a distance equal to double your Reason score.
* **Freeze Strike**: Damage becomes cold. The target takes cold damage equal to your Reason score. The target is slowed (save ends).
* **Crimson Strike**: Damage becomes corruption. The target is bleeding (save ends).
* **Umbral Strike**: Damage becomes psychic. The target has damage weakness equal to your Reason score (save ends).
* **Explosive Strike**: Damage becomes sonic. Each enemy in range 2 of the target is dealt sonic damage equal to your Reason score.

Effects other than the changing of the damage type are applied after the ability is resolved. If you use this ability more than once before it applies to an ability, you can choose one of the damage types to apply to the affected ability, but apply all of the effects.

You cannot use *Enweave* more than twice before applying its effect to an ability.`),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'This ability becomes a free maneuver instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'kqUeQx0h23EhxxUc',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'iRn3qBxVIwTtBoRi',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'nl3lpEXmEYpYBZVW',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'rEyShVuQmHFhyvRt',
					lists: [ PerkList.Exploration, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'OVUKkhTfFMlLKdd6',
					name: 'Cascading Enweave',
					description: 'When using Enweave, you may spend 1 balance to make the chosen effect apply to an additional target within range 5 of the target of your next melee weapon ability. You may choose to use this spend effect more than once, each time costing 1 more balance than the previous time. Each additional target needs to be within range 5 of the previous affected target.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'nHkXlESMAT6WMexB',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'psE8QwJkMo5FGahf',
			name: 'Aether Lash',
			description: 'With a flick of your blade, you etch a line of invisible force, preparing to strike.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '2 + A damage',
						tier2: '5 + A damage',
						tier3: '8 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Before choosing the target of this ability and resolving the power roll, choose a creature or object within range 5. Either vertical pull 4 the target, or vertical pull 4 yourself as if you were the target. When a creature is pulled into the air this way, they do not fall down until the end of your turn, and lose all stability while in the air.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'Kyx8UrFs78d0nDWB',
			name: 'Blade Barrier',
			description: 'A sphere of shimmering force unfurls around you as you harry your foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each creature within area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '2 damage, push 1',
						tier2: '3 damage, push 1',
						tier3: '5 damage, push 1'
					})
				),
				FactoryLogic.createAbilitySectionText('This ability ignores stability. Gain damage immunity equal to your Reason until the end of your next turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'K4iussi8iLx5dRET',
			name: 'Crescent Arc',
			description: 'A precise arc cuts through your foes with the grace of moonlight.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 3, within: 1 }) ],
			target: 'Each enemy within area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '2 damage',
						tier2: '5 damage',
						tier3: '7 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The wall area is only used for targeting, and does not create an actual wall. Each increase to the wall\'s length is doubled.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'sa5It8BiU7UVMo3C',
			name: 'Essence Lance',
			description: 'You hurl a lance of force that pierces not flesh, but the core of their being.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '6 + R damage',
						tier2: '8 + R damage',
						tier3: '11 + R damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The target’s characteristic scores are treated as lower by 1 for the sake of resisting potencies (save ends).')
			]
		}),
		FactoryLogic.createAbility({
			id: 'SeeQb3AuYSt7LJ2u',
			name: 'Still Edge',
			description: 'You cut into your foe, leaving potential energy in their form - threatening to snap into explosive motion.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '3 + A damage',
						tier2: '6 + A damage',
						tier3: '9 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target willingly moves before the end of their next turn, they take damage equal to twice your Reason score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'nEF5J2Lof7zx5C0S',
			name: 'Sever the Moment',
			description: 'You read the flaw in their stance and cut deep.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '6 + A damage',
						tier2: '9 + A damage',
						tier3: '13 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target has any condition, this ability deals an additional 10 damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'KvsM9dDuVqzUpIfn',
			name: 'Full Moon Arc',
			description: 'Your blade traces a perfect circle in red.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy within area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '6 damage',
						tier2: '9 damage',
						tier3: '13 damage'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: '9LLTrUY85AVyIcHI',
			name: 'Veil Piercer',
			description: 'You lance through a veil of mist, fading from sight.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '8 + R damage',
						tier2: '12 + R damage',
						tier3: '16 + R damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Create a 1 burst area of mist which provides concealment to allies that lasts until the end of your next turn. Allies inside the mist can hide even while observed.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'WnkiVZGxk1aSzG4m',
			name: 'Sanguine Thread',
			description: 'Your blade draws a line through flesh, and a thread of life follows - woven back into your form.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '4 + A damage',
						tier2: '7 + A damage',
						tier3: '11 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You gain temporary Stamina equal to half the damage dealt by this ability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'XZxWE6QBTKjvPCYM',
			name: 'Lightning Strike',
			description: 'You become lightning, flashing from one place to another, leaving ruin in your wake.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
			target: 'Each enemy within area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '6 lightning damage',
						tier2: '10 lightning damage',
						tier3: '14 lightning damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You teleport to a square on the opposite side of the area before making the power roll.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'D2YGEm6Ic7QrUCwR',
			name: 'Glacial Bloom',
			description: 'Like a flower in bloom, ice explodes onto your foes.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy within area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '5 cold damage, A < weak, slowed (save ends)',
						tier2: '8 cold damage, A < average, slowed (save ends)',
						tier3: '11 cold damage, A < strong, restrained (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'cHb7KRKmqjtzEDNA',
			name: 'Crashing Wave',
			description: 'Leaping skyward, you crash down with the weight of the ocean.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
			target: 'Each enemy within area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '6 damage; push 2',
						tier2: '9 damage; push 4',
						tier3: '13 damage; push 6'
					})
				),
				FactoryLogic.createAbilitySectionText('You can jump up to 2 squares before resolving the power roll. The targets are force moved one at a time, starting with the targets nearest to you, and can be pushed into other targets in the area.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'eGFSaMDQOv3qpxBX',
			name: 'Spirit Rend',
			description: 'You carve through your foe’s spirit, leaving their mind reeling.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '6 + A psychic damage; I < weak, dazed (save ends)',
						tier2: '10 + A psychic damage; I < average, dazed (save ends)',
						tier3: '14 + A psychic damage; I < strong, dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While dazed this way, the target\'s characteristic scores are treated as lower by 1 for the sake of resisting potencies.')
			]
		}),
		FactoryLogic.createAbility({
			id: '8uSVdpHtYzQ49cU2',
			name: 'Cross Slash',
			description: 'You cleave the air in all directions, blades of force radiating from your stance.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
			distance: [ FactoryLogic.distance.createSpecial('Four 5 x 1 lines within 1') ],
			target: 'Each enemy within area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '6 damage',
						tier2: '10 damage',
						tier3: '14 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Overlapping lines are treated as a single area.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'mejqYrJQuCnj6X12',
			name: 'Godspeed',
			description: 'You surge with arcane power, moving with impossible speed.',
			type: FactoryLogic.type.createManeuver({ free: true }),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('For the rest of the combat encounter you have an additional maneuver per turn, and gain a +5 bonus to speed.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'VNtILg0JEcSZMXIw',
			name: 'Reaper\'s Edge',
			description: 'There is power in death.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '12 + A damage',
						tier2: '18 + A damage',
						tier3: '24 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If this ability reduces a creature to 0 Stamina, gain 5 balance.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'EpYMy07L6kpxn0tk',
			name: 'Spectral Blades',
			description: 'You summon spectral blades, suspended in poise, released with but a thought.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Place a d6 die set to 6 to track this effect. Once a turn you may reduce the die by any amount up to its current value. Then, distribute that many spectral blades among enemies within range 5 as you choose. Each blade deals 4 + your Reason score in damage. You cannot assign more than one blade per enemy. In addition, whenever an enemy in range 5 is affected by a potency effect, you may reduce the die by 1 to increase the potency of the ability by 1.')
			]
		})
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
						FactoryLogic.feature.createSkillChoice({
							id: 'R6zmbAYzj5QQnf5r',
							selected: [ 'Gymnastics' ]
						}),
						FactoryLogic.feature.createMultiple({
							id: 'd7U62IAB3V2YaasD',
							name: 'Phase Step',
							features: [
								FactoryLogic.feature.create({
									id: 'd7U62IAB3V2YaasDa',
									name: 'Phase Step',
									description: 'Whenever you disengage, you may teleport instead of shifting.'
								}),
								FactoryLogic.feature.createBonus({
									id: 'd7U62IAB3V2YaasDb',
									field: FeatureField.Disengage,
									value: 1
								})
							]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'UZK6xyl5g71nt7t8',
								name: 'Blink',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You teleport up to 7 squares.'),
									FactoryLogic.createAbilitySectionField({
										name: 'Spend',
										value: 5,
										effect: 'If used immediately after performing an ability that targets only one enemy, you may repeat that ability at your target destination without needing to spend the base cost as long as it costs 5 balance or fewer.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'GN04C4n7iSFme7EB',
								name: 'Flicker Step',
								description: 'You instinctively teleport to avoid danger.',
								type: FactoryLogic.type.createTrigger('You take damage'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You take half the damage, you can then teleport up to 4 squares after the triggering effect resolves.'),
									FactoryLogic.createAbilitySectionField({
										name: 'Spend',
										value: 1,
										effect: 'You teleport an additional 2 squares for each balance spent.'
									})
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: '3cCLubzSJqOAXhTt',
							name: 'Afterimage',
							description: 'Whenever you teleport by any means, you leave a distracting afterimage in your previous location until the start of your next turn. Power rolls targeting enemies adjacent to one or more afterimages gain an edge. The afterimage does not occupy space and cannot be targeted or destroyed. At the start of any turn when an afterimage fades, you can choose to teleport to its location.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'O1IBnmfpWK2A0Pzm',
							name: '2nd Level Blinkblade Ability',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'iUFlQNI03qMYfk3o',
											name: 'Phase Assault',
											description: 'You blink between foes, each reappearance marked by a precise, cutting strike.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createSpecial('') ],
											target: 'Special',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Agility,
														tier1: '3 damage',
														tier2: '6 damage',
														tier3: '9 damage'
													})
												),
												FactoryLogic.createAbilitySectionText('Choose a target within range 5, teleport to an unoccupied space adjacent to it, then apply the power roll result to it. Repeat this effect up to 3 more times. The same target cannot be chosen more than once.')
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'LFPajs7vWR1FdtDa',
											name: 'Horizon Step',
											description: 'None can escape your grasp.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One creature',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Agility,
														tier1: '14 + A damage',
														tier2: '18 + A damage',
														tier3: '23 + A damage'
													})
												),
												FactoryLogic.createAbilitySectionText('You may teleport to up to 15 squares before this strike.')
											]
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
			id: 'nCi6Ufmfz74H70Pr',
			name: 'Runewright',
			description: 'The Runewright wields the ancient craft of runebranding to sear volatile runes onto living beings and shape the battlefield through groundlaid writs. ',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: '5hK9y3rFtS2uW5d0',
							selected: [ 'Mechanics' ]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'PG0F4c5cIccZlDl4',
								name: 'Runebrand',
								description: 'You imprint a runic sigil on your target, priming it for detonation.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createMelee() ],
								target: 'One creature or object',
								cost: 1,
								sections: [
									FactoryLogic.createAbilitySectionText('When using this ability, choose one of the Enweave effects, ignoring the component that changes the damage type of your next strike. You brand your target with a rune imbued by the effect you chose, priming it for detonation. At the end of your turn, the rune is primed. When a rune is primed, the next time the branded target is damaged, the rune detonates, applying its effect to every enemy within range 2 of it. If the branded effect already has an area, it is increased by 2 instead. If the branded effect has a push effect, it is relative to the branded target’s location.'),
									FactoryLogic.createAbilitySectionField({
										name: 'Spend',
										value: 2,
										effect: 'The rune is immediately primed, allowing you to detonate it this turn.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'MnzMxsJZtPA8FrFs',
								name: 'Ensnaring Rune',
								description: 'Your foe steps on one of your many traps.',
								type: FactoryLogic.type.createTrigger('The target moves'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One enemy',
								sections: [
									FactoryLogic.createAbilitySectionText('The target takes damage equal to triple your Reason score.'),
									FactoryLogic.createAbilitySectionField({
										name: 'Spend',
										value: 1,
										effect: 'If the target has I < [average], they are slowed (EoT).'
									})
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'KXLNgaULFP7C3Kkx',
							name: 'Liminal Runes',
							description: 'An enemy carrying an undetonated runebrand receives a bane on their power rolls. An ally carrying an undetonated runebrand gains an edge on their power rolls.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'r7jDReOjykBnFpp2',
							name: '2nd-Level Art Ability',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'HnQmrJFiyb8LEN1l',
											name: 'Writ of Power',
											description: 'You brand an arcane writ onto the ground, scorching foes, or soothing allies.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
											target: 'Each enemy within area',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText(`
The area remains until the end of the encounter or you are dying. Choose one of the following effects to apply to the area:

* Writ of Flame: Each enemy who enters the area for the first time in a combat round or starts their turn there takes damage equal to triple your Reason score.
* Writ of Sanctuary: Each ally, or youreslf, who enters the area for the first time in a combat round or starts their turn there may either spend a recovery, or end one effect that is ended by a saving throw or ends at the end of their turn.`)
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'amPXemJUIcHPs4Zx',
											name: 'Writ of Binding',
											description: 'Arcane chains erupt from the ground, coling around your foe.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.createRanged(5) ],
											target: 'One creature',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '6 damage; M < weak, restrained (save ends)',
														tier2: '10 damage; M < average, restrained (save ends)',
														tier3: '14 damage; M < strong, restrained (save ends)'
													})
												),
												FactoryLogic.createAbilitySectionText('While restrained this way, the target cannot teleport by any means.')
											]
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
			id: 'HK8oez2ay5ZQNhfp',
			name: 'Soulforged',
			description: 'The Soulforged binds a fragment of their soul into a chosen weapon, forging a sentient extension of their will - a Soulblade. Through this bond, they shape and empower their blade, adapting its form and function to meet the shifting demands of battle. ',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'YMhhEe1upKHfymOH',
							selected: [ 'Empathize' ]
						}),
						FactoryLogic.feature.create({
							id: '1jXjv5q9Tmlax2TD',
							name: 'Soulbound',
							description: `
Your Soulblade is more than a weapon - it's an extension of your soul. Its appearance reflects the innermost truth of who you are. You are never truly separated from it; if it's not in your hands, you can summon it instantly as a free maneuver.

Your Soulforged abilities can only be used with your Soulblade. To bond with a new weapon, you must perform a ritual lasting several hours to transfer your bound soul fragment from another weapon to it. You may bond with as many weapons as a kit grants.

By default, your Soulblade is sentient and capable of communicating with you, though you may choose to forgo this aspect of it.`
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'uajSniPPGVxpq9jX',
								name: 'Soulshape',
								description: 'By reshaping the bound fragment of your soul, you persuade your Soulblade to take on a new form.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								cost: 0,
								sections: [
									FactoryLogic.createAbilitySectionText(`
Choose a modified form for your Soulblade, each granting a distinct effect until the start of your next turn:

* Expansive: Melee weapon abilities have their area increased by 1. If the area is a line, increase the size of the larger dimension by 2 instead.
* Powerful: Melee weapon abilities with rolled damage have their damage increased by your Reason score. If the ability force moves a target, the forced movement distance gains a bonus equal to your Reason score.
* Resonant: Melee weapon abilities have their potency increased by 1.
* Reaching: Melee weapon abilities have their distance increased by double your Reason.`),
									FactoryLogic.createAbilitySectionField({
										name: 'Spend',
										value: 2,
										effect: 'Any numeric benefit of the chosen form is doubled in value.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'QfuRewVhDSo3Fcnh',
								name: 'Blade\'s Will',
								description: 'As if moving by its own accord, your Soulblade parries and ripostes.',
								type: FactoryLogic.type.createTrigger('A creature deals damage to the target.'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
								distance: [ FactoryLogic.distance.createRanged(5) ],
								target: 'Self or one ally',
								sections: [
									FactoryLogic.createAbilitySectionText('You can shift a number of squares equal to your Reason score. If the target is you, or if you end this shift adjacent to the target, the target takes half the damage.'),
									FactoryLogic.createAbilitySectionField({
										name: 'Spend',
										value: 2,
										effect: 'Make a melee free strike against the creature that damaged the target.'
									})
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createMultiple({
							id: 'bzETrObsFfukTsKF',
							name: 'Soul Instinct',
							features: [
								FactoryLogic.feature.create({
									id: 'bzETrObsFfukTsKFa',
									name: 'Soul Instinct',
									description: 'Once per turn, you can make a melee free strike whenever a creature moves from a square adjacent to you to another square adjacent to you.'
								}),
								FactoryLogic.feature.createBonus({
									id: 'bzETrObsFfukTsKFb',
									field: FeatureField.Stability,
									value: 1
								})
							]
						}),
						FactoryLogic.feature.createChoice({
							id: 'zMh3T36dRkETvXP5',
							name: '2nd-Level Soulforged Ability',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'cvF4m32z5QKl8fuv',
											name: 'Soul Form',
											description: 'Your Soulblade takes its true form, flaring with power.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Magic ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText('Until the end of the encounter, whenever you gain the benefit of a Soulshape form, you may choose an additional form to benefit from. You can use the spend effect for no cost on both form benefits. You may use the Soulshape maneuver.')
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'QKw9odWNUqve0maB',
											name: 'Soul Spiral',
											description: 'Your Soulblade unfurls in a violent spiral, crashing through foes.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
											target: 'Each enemy within area',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Agility,
														tier1: '5 damage',
														tier2: '8 damage; push 1',
														tier3: '11 damage; push 3'
													})
												)
											]
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
