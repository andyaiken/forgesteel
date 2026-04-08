import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { HeroClass } from '@/models/class';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

const scion: HeroClass = {
	id: 'class-scion',
	name: 'Scion',
	description: `
*By Steel Echoes*

You were deemed worthy of a secret Art known only to a chosen few, allowing you to weave steel and magic into a single, fluid dance. Passed down through an unbroken chain of master and disciple, this ancient discipline was entrusted to you, its esoteric techniques guiding you toward the cultivation of Balance: a harmonious alignment of movement, feeling, and intent.

As a Scion, you are the the quiet before the storm. You move like the wind, and strike as lightning. Your flexibility is unmatched - each blow empowered to suit the moment, whether to debilitate foes, or bring their end closer still. The battlefield is a canvas upon which you paint your masterpiece, and your Art is your brush.`,
	type: 'standard',
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
					id: 'scion-O9HoOpa7euJhtYOU',
					name: 'Stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'scion-JOGoalJHZrxV29hI',
					name: 'Recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'scion-AQVZO67b5ARr837x',
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
							trigger: 'The first time in a combat round that you or an ally within 10 squares of you uses an ability with a Magic tag',
							value: '1',
							tag: 'Magic 1'
						}
					]
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'scion-DPrp53cyrPmKlK8Q',
					name: 'Kit',
					description: 'You can use and the gain the benefits of a kit.'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'scion-k9atwGnHLUisOS3g',
					selected: [ AbilityKeyword.Magic ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'scion-szzG0j9VXTie1vzU',
					selected: [ 'Strategy' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'scion-wWXEEpo7fYtbd7H5',
					listOptions: [ SkillList.Exploration ],
					count: 2
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'scion-WX9IShLh3LTdbYEZ',
						name: 'Enweave',
						description: 'You weave magic into your weapon, preparing to unleash it with your next strike.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSpecial('') ],
						target: 'Self',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText(`
Choose one of the following effects, which applies to one target of the next damaging melee weapon ability you use:

* **Flame Strike**: Damage becomes fire. The target takes fire damage equal to triple your Reason score.
* **Lightning Strike**: Damage becomes lightning. Each enemy in range 2 of the target is dealt lightning damage equal to your Reason score.
* **Gale Strike**: Damage becomes sonic. You can either push the target, or yourself away from the target, a distance equal to double your Reason score.
* **Freeze Strike**: Damage becomes cold. The target takes cold damage equal to your Reason score. The target is slowed (save ends).
* **Crimson Strike**: Damage becomes corruption. The target is bleeding (save ends).

Effects other than the changing of the damage type are applied after the ability is resolved. If you use this ability more than once before it applies to an ability, you can choose one of the damage types to apply to the affected ability, but apply all of the effects.

You cannot use Enweave more than twice before applying its effect to an ability.`),
							FactoryLogic.createAbilitySectionSpend({
								value: 2,
								effect: 'This ability becomes a free maneuver instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'scion-kqUeQx0h23EhxxUc',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'scion-iRn3qBxVIwTtBoRi',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'scion-nl3lpEXmEYpYBZVW',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'scion-rEyShVuQmHFhyvRt',
					lists: [ PerkList.Exploration, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'scion-OVUKkhTfFMlLKdd6',
					name: 'Cascading Enweave',
					description: 'When using Enweave, you may spend 2 balance to make the chosen effect apply to an additional target within range 5 of the target of your next melee weapon ability. You may choose to use this spend effect more than once - if you do, each additional target needs to be within range 5 of the previous affected target.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'scion-nHkXlESMAT6WMexB',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'scion-psE8QwJkMo5FGahf',
			name: 'Aether Lash',
			description: 'With a flick of your blade, you etch a line of invisible force, preparing to strike.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionText('Before choosing the target of this ability and resolving the power roll, choose a creature or object within range 5, then either vertical pull 4 the chosen creature or object, or vertical pull yourself 4 the chosen from the creature or object\'s space. When a creature is pulled into the air this way and it can\'t fly, you may choose to make it stay aloft until the end of your turn.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '3 + A damage',
						tier2: '5 + A damage',
						tier3: '8 + A damage'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-Kyx8UrFs78d0nDWB',
			name: 'Blade Barrier',
			description: 'A sphere of shimmering force unfurls around you as you harry your foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
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
			id: 'scion-K4iussi8iLx5dRET',
			name: 'Crescent Arc',
			description: 'A precise arc cuts through your foes with the grace of moonlight.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 3, within: 1 }) ],
			target: 'Each enemy in the area',
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
				FactoryLogic.createAbilitySectionText('The wall area is only used for targeting. Each increase to the wall\'s length is doubled.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-sa5It8BiU7UVMo3C',
			name: 'Essence Lance',
			description: 'You hurl a lance of force that pierces not flesh, but the core of their being.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '5 + R psychic damage, R < [weak], disoriented (save ends)',
						tier2: '8 + R psychic damage, R < [average], disoriented (save ends)',
						tier3: '11 + R psychic damage, R < [strong], disoriented (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('A disoriented creature has line of effect only within 2 squares.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-SeeQb3AuYSt7LJ2u',
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
			id: 'scion-rage',
			name: 'Your Rage Betrays You',
			description: 'A well-placed strike turns their attention wholly to you.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '3 + A damage, I < [weak], taunted (save ends)',
						tier2: '6 + A damage, I < [average], taunted (save ends)',
						tier3: '9 + A damage, I < [strong], taunted (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-cut',
			name: 'Cut to the Core',
			description: 'You cut through your foe\'s defenses, leaving them vulnerable.',
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
						tier2: '5 + A damage',
						tier3: '8 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The target\'s characteristic scores are treated as lower by 1 for the sake of resisting potencies until the end of their next turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-nEF5J2Lof7zx5C0S',
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
				FactoryLogic.createAbilitySectionText('If the target is suffering from an effect that is ended by a saving throw, this ability deals an additional 10 damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-KvsM9dDuVqzUpIfn',
			name: 'Full Moon Arc',
			description: 'Your blade traces a perfect circle in red.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
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
			id: 'scion-9LLTrUY85AVyIcHI',
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
				FactoryLogic.createAbilitySectionText('Create a 1 burst area of mist which provides concealment to yourself and allies that lasts until the end of your next turn. You and allies inside the mist can hide even while observed.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-WnkiVZGxk1aSzG4m',
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
			id: 'scion-XZxWE6QBTKjvPCYM',
			name: 'Lightning Flash',
			description: 'You become lightning, flashing from one place to another, leaving ruin in your wake.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '4 lightning damage',
						tier2: '8 lightning damage',
						tier3: '12 lightning damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You teleport to a square on the opposite side of the area before making the power roll.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-D2YGEm6Ic7QrUCwR',
			name: 'Glacial Bloom',
			description: 'Fractals of ice bloom outward and shatter across your foes.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '5 cold damage, A < [weak], slowed (save ends)',
						tier2: '8 cold damage, A < [average], slowed (save ends)',
						tier3: '11 cold damage, A < [strong], restrained (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-cHb7KRKmqjtzEDNA',
			name: 'Crashing Wave',
			description: 'Leaping skyward, you crash down with the weight of the ocean.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
			target: 'Each enemy in the area',
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
			id: 'scion-eGFSaMDQOv3qpxBX',
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
						tier1: '4 + A psychic damage; I < [weak], dazed (save ends)',
						tier2: '8 + A psychic damage; I < [average], dazed (save ends)',
						tier3: '12 + A psychic damage; I < [strong], dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While dazed this way, the target\'s characteristic scores are treated as lower by 1 for the sake of resisting potencies.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-8uSVdpHtYzQ49cU2',
			name: 'Cross Slash',
			description: 'You cleave the air in multiple directions, unleashing blades of pure force.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
			distance: [ FactoryLogic.distance.createSpecial('Four 5 x 1 lines within 1') ],
			target: 'Each enemy in the area',
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
			id: 'scion-mejqYrJQuCnj6X12',
			name: 'Godspeed',
			description: 'You surge with arcane power, moving with impossible speed.',
			type: FactoryLogic.type.createManeuver({ free: true }),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('For the rest of the combat encounter, you have an additional maneuver per turn and gain a +5 bonus to speed.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-VNtILg0JEcSZMXIw',
			name: 'Reaper\'s Edge',
			description: 'There is power in death.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
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
				FactoryLogic.createAbilitySectionText('If this ability reduces a non-minion creature to 0 Stamina, gain 5 balance.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'scion-EpYMy07L6kpxn0tk',
			name: 'Spectral Blades',
			description: 'You summon spectral blades, suspended in poise, released with but a thought.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Place a d6 die set to 6 to track this effect. Once on your turn, you may reduce the die by any amount up to its current value. Then, distribute that many spectral blades among enemies within range 5 as you choose. Each blade deals 4 + your Reason score in damage. You cannot assign more than one blade per enemy. In addition, whenever an enemy in range 5 is affected by a potency effect, you may reduce the die by 1 to increase the potency of the ability by 1.')
			]
		})
	],
	subclasses: [
		{
			id: 'scion-vGtuuw0cYpAkkPUN',
			name: 'Blinkblade',
			description: 'A master of teleportation magic, the Blinkblades weave in and out of reach with uncanny speed - difficult to catch, and harder still to escape.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'scion-R6zmbAYzj5QQnf5r',
							selected: [ 'Gymnastics' ]
						}),
						FactoryLogic.feature.createMultiple({
							id: 'scion-d7U62IAB3V2YaasD',
							name: 'Phasewalk',
							features: [
								FactoryLogic.feature.create({
									id: 'scion-d7U62IAB3V2YaasDa',
									name: 'Phase Step',
									description: 'Whenever you disengage, you may teleport instead of shifting.'
								}),
								FactoryLogic.feature.createBonus({
									id: 'scion-d7U62IAB3V2YaasDb',
									field: FeatureField.Disengage,
									value: 1
								})
							]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'scion-UZK6xyl5g71nt7t8',
								name: 'Blink',
								description: '... And you miss it.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You teleport up to 7 squares.'),
									FactoryLogic.createAbilitySectionSpend({
										value: 5,
										effect: 'If used immediately after performing an ability that targets only one enemy, you may repeat that ability at your target destination without needing to spend the base cost as long as it costs 5 balance or fewer.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'scion-GN04C4n7iSFme7EB',
								name: 'Flicker Step',
								description: 'You instinctively teleport to avoid danger.',
								type: FactoryLogic.type.createTrigger('You take damage'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You take half the damage, you can then teleport up to 4 squares after the triggering effect resolves.'),
									FactoryLogic.createAbilitySectionSpend({
										repeatable: true,
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
							id: 'scion-3cCLubzSJqOAXhTt',
							name: 'Afterimage',
							description: 'Whenever you teleport by any means, you leave a distracting afterimage in your previous location until the start of your next turn. Power rolls targeting enemies adjacent to one or more afterimages gain an edge. The afterimage does not occupy space and cannot be targeted or destroyed. At the start of any turn when an afterimage fades, you can choose to teleport to its location.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'scion-O1IBnmfpWK2A0Pzm',
							name: '2nd Level Blinkblade Ability',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'scion-iUFlQNI03qMYfk3o',
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
												FactoryLogic.createAbilitySectionText('Choose a target within range 5, teleport to an unoccupied space adjacent to it. Repeat this effect up to 3 more times. The same target cannot be chosen more than once. Then, apply the power roll result to all chosen targets.')
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'scion-LFPajs7vWR1FdtDa',
											name: 'Horizon Step',
											description: 'None can escape your reach.',
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
			abilities: [],
			selected: false
		},
		{
			id: 'scion-nCi6Ufmfz74H70Pr',
			name: 'Runewright',
			description: 'The Runewright wields the ancient craft of runebranding to sear volatile runes onto living beings and shape the battlefield through groundlaid writs.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'scion-5hK9y3rFtS2uW5d0',
							selected: [ 'Mechanics' ]
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'scion-PG0F4c5cIccZlDl4',
								name: 'Runebrand',
								description: 'You brand a volatile rune on your target, priming it for detonation.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createMelee() ],
								target: 'One creature or object',
								cost: 1,
								sections: [
									FactoryLogic.createAbilitySectionText('When using this ability, choose one of the Enweave effects that can only affect a single target, ignoring the component that changes the damage type of your next weapon ability. You brand your target with a rune imbued by the effect you chose, priming it for detonation. At the end of your turn, the rune is primed. When a rune is primed, the next time the branded target is damaged, the rune detonates, applying its effect to the target and each enemy within range 2 of it. If the branded effect has a push effect, it is relative to the branded target\'s location and doesn\'t affect the branded target.'),
									FactoryLogic.createAbilitySectionSpend({
										value: 2,
										effect: 'The rune is immediately primed, allowing you to detonate it this turn.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'scion-MnzMxsJZtPA8FrFs',
								name: 'Ensnaring Rune',
								description: 'Your foe steps on one of your many traps.',
								type: FactoryLogic.type.createTrigger('The target moves'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One enemy',
								sections: [
									FactoryLogic.createAbilitySectionText('The target takes damage equal to triple your Reason score.'),
									FactoryLogic.createAbilitySectionSpend({
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
							id: 'scion-KXLNgaULFP7C3Kkx',
							name: 'Liminal Runes',
							description: 'An enemy carrying an undetonated runebrand receives a bane on their power rolls. An ally carrying an undetonated runebrand gains an edge on their power rolls.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'scion-r7jDReOjykBnFpp2',
							name: '2nd-Level Art Ability',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'scion-HnQmrJFiyb8LEN1l',
											name: 'Writ of Power',
											description: 'You brand an arcane writ onto the ground, scorching foes, or soothing allies.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
											target: 'Special',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionText(`
The area remains until the end of the encounter or you are dying. Choose one of the following effects to apply to the area:

* **Writ of Flame**: Each enemy who enters the area for the first time in a combat round or starts their turn there takes damage equal to triple your Reason score.
* **Writ of Sanctuary**: Each ally, or youreslf, who enters the area for the first time in a combat round or starts their turn there may either spend a recovery, or end one effect that is ended by a saving throw or ends at the end of their turn.`)
											]
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'scion-amPXemJUIcHPs4Zx',
											name: 'Writ of Binding',
											description: 'Arcane chains erupt from the ground, coiling around your foe.',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.createRanged(5) ],
											target: 'One creature',
											cost: 5,
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '6 damage; M < [weak], restrained (save ends)',
														tier2: '10 damage; M < [average], restrained (save ends)',
														tier3: '14 damage; M < [strong], restrained (save ends)'
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
			abilities: [],
			selected: false
		},
		{
			id: 'scion-HK8oez2ay5ZQNhfp',
			name: 'Soulforged',
			description: 'The Soulforged binds a fragment of their soul into a chosen weapon, forging a sentient extension of their will - a Soulblade. Through this bond, they shape and empower their blade, adapting its form and function to meet the shifting demands of battle.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'scion-YMhhEe1upKHfymOH',
							selected: [ 'Empathize' ]
						}),
						FactoryLogic.feature.create({
							id: 'scion-1jXjv5q9Tmlax2TD',
							name: 'Soulbound',
							description: `
Your Soulblade is more than a weapon - it's an extension of your soul. Its appearance reflects the innermost truth of who you are. You are never truly separated from it; if it's not in your hands, you can summon it instantly as a free maneuver.

Your Soulforged abilities can only be used with your Soulblade. To bond with a new weapon, you must perform a ritual lasting several hours to transfer your bound soul fragment from another weapon to it. You may bond with as many weapons as a kit grants.

By default, your Soulblade is sentient and capable of communicating with you, though you may choose to forgo this aspect of it.`
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'scion-uajSniPPGVxpq9jX',
								name: 'Soulshape',
								description: 'By reshaping the bound fragment of your soul, you persuade your Soulblade to take on a new form.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText(`
Choose a modified form for your Soulblade, each granting a distinct effect until the start of your next turn:

* **Expansive**: Melee weapon abilities have their area increased by 1. If the area is a line, increase the size of the larger dimension by 2 instead.
* **Powerful**: Melee weapon abilities with rolled damage have their damage increased by your Reason score. If the ability force moves a target, the forced movement distance gains a bonus equal to your Reason score.
* **Resonant**: Melee weapon abilities have their potency increased by 1.
* **Reaching**: Melee weapon abilities have their distance increased by double your Reason.`),
									FactoryLogic.createAbilitySectionSpend({
										value: 2,
										effect: 'Any numeric benefit of the chosen form is doubled in value.'
									})
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'scion-QfuRewVhDSo3Fcnh',
								name: 'Blade\'s Will',
								description: 'As if moving by its own accord, your Soulblade parries and ripostes.',
								type: FactoryLogic.type.createTrigger('A creature deals damage to the target.'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
								distance: [ FactoryLogic.distance.createRanged(5) ],
								target: 'Self or one ally',
								sections: [
									FactoryLogic.createAbilitySectionText('You can shift a number of squares equal to your Reason score. If the target is you, or if you end this shift adjacent to the target, the target takes half the damage.'),
									FactoryLogic.createAbilitySectionSpend({
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
							id: 'scion-bzETrObsFfukTsKF',
							name: 'Soul Instinct',
							features: [
								FactoryLogic.feature.create({
									id: 'scion-bzETrObsFfukTsKFa',
									name: 'Soul Instinct',
									description: 'Once per turn, you can make a melee free strike whenever a creature moves from a square adjacent to you to another square adjacent to you.'
								}),
								FactoryLogic.feature.createBonus({
									id: 'scion-bzETrObsFfukTsKFb',
									field: FeatureField.Stability,
									value: 1
								})
							]
						}),
						FactoryLogic.feature.createChoice({
							id: 'scion-zMh3T36dRkETvXP5',
							name: '2nd-Level Soulforged Ability',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'scion-cvF4m32z5QKl8fuv',
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
											id: 'scion-QKw9odWNUqve0maB',
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
			abilities: [],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};

export const steelEchoes: Sourcebook = {
	id: 'steel-echoes',
	name: 'Steel Echoes',
	description: 'A selection of content from [Steel Echoes](https://ds-echoes.pages.dev).',
	type: SourcebookType.ThirdParty,
	adventures: [],
	ancestries: [],
	careers: [],
	complications: [],
	cultures: [],
	classes: [
		scion
	],
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
