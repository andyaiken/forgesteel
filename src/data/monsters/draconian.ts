import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const draconian: MonsterGroup = {
	id: 'monster-group-draconian',
	name: 'Draconian',
	description: `
Draconians—wyrmwights as some call them, also known as dragon knights in Orden—are a people created through an obscure ritual known as Dracogenesis. Most draconians have an elemental affinity connected to their draconic scales, which they can change given enough time and training.

Six individual draconians are presented in this section—not an adventuring party, but six warriors whose reputations precede them. All are likely to be found serving in various military forces as high-ranking commanders.`,
	picture: null,
	information: [
		{
			id: 'draconian-info-1',
			name: 'Aeolyxria the Uncanny',
			description: 'From the moment she hatched, Aeolyxria (ay-oh-LIX-ree-ah) has enjoyed a fascination with the occult. She wanders the land, gathering strange tomes and artifacts to study. When she takes a job, it’s because she has a new doohickey she wants to test out. Aeolyxria possesses a sharp, tactical mind that lets her treat any battlefield as if it offered homefield advantage. If she could just get a handle on all her equipment, she’d be unstoppable!'
		},
		{
			id: 'draconian-info-2',
			name: 'Locratix the Morningstar',
			description: 'A traveler from a faraway land and the sole progeny of her Dracogenesis clutch, Locratix (low-CRA-tics) focuses on survival over all other things. The very concept of the dragon knights is anathema to her, as there is no reason a wyrmwight should hand over the power that keeps them alive. Locratix travels widely while taking on mercenary jobs, but she is always just one better deal away from skewering her present employer on the end of her lance.'
		},
		{
			id: 'draconian-info-3',
			name: 'Lydixavus the Deadeye',
			description: 'Nothing escapes Lydixavus (lee-DIX-uh-vas) or their unrivaled precision. After decades of careful training, they have honed their breath weapon into a swift and far-traveling bullet of ice. Lydixavus is motivated by revenge. Each scar, each dent in their scales tells a story, and Lydixavus aims to return those gifts tenfold to those who bestowed them.'
		},
		{
			id: 'draconian-info-4',
			name: 'Myxovidan the Sintaker',
			description: 'Myxovidan (mix-OH-vih-din) was raised by a secluded order of monks who claimed his obsidian-black scales and nausea-inducing breath were an evil that must be purged. They subjected him to an austere lifestyle, full of intense training, meditation, and denial of worldly pleasures. But Myxovidan’s hunger would be satisfied, one way or another. When Myxovidan departed the order, he left behind a collection of emaciated monk corpses who looked as though they’d had the life sucked out of them.'
		},
		{
			id: 'draconian-info-5',
			name: 'Phrrygalax the Subduer',
			description: 'Phrrygalax (fuh-RIJ-ih-lax) was once a dragon knight in the service of Good King Omund. Though he took the oath to defend others against tyranny, he was always keenly aware he was created for violence. When the betrayal of the dragon knight Mandrake fractured the Dragon Phalanx that was the order of the dragon knights, Phrrygalax gleefully renounced his oath to follow what he believes to be his true, brutal purpose. Many who served with him believed he was merely waiting for a convenient excuse to do so.'
		},
		{
			id: 'draconian-info-6',
			name: 'Dorzinuuth the Base',
			description: 'To those who know the Dragon Phalanx of old, no name inspires more awe and fear than that of Dorzinuuth (dor-ZIN-yew-uth). A mastermind on the battlefield and the foundation of the dragon knights’ fraternity, Dorzinuuth was known for mounting daring campaigns and always returning with the same number of soldiers—and often alongside new recruits. In the wake of the death of Good King Omund, many were shocked to see Dorzinuuth debase himself with banditry and petty mercenary jobs. Others hold on to the hope that he makes unknown moves in darkness, waiting for the day when he can again uphold his oath in the light.'
		},
		{
			id: 'draconian-info-7',
			name: 'Draconian Languages',
			description: 'Most draconians speak Caelian in addition to the languages of their employers and creators. Lydixavus, Phrrygalax, and Dorzinuuth all speak Caelian and Vastariax. Aeolyxria speaks Caelian and the First Language. Locratix speaks Caelian and Oaxuatl. Myxovidan speaks Caelian and Axiomatic.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'draconian-malice-1',
			name: 'Guarding Gale',
			cost: 3,
			sections: [
				'A draconian acting this turn flaps their wings and creates a mighty gale. Each creature adjacent to the draconian is pushed up to 4 squares, and if they have M<2, they are knocked prone.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'draconian-malice-2',
				name: 'Breath Weapon',
				type: FactoryLogic.type.createMain(),
				cost: 5,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 2, within: 1 }) ],
				target: 'Each enemy in the area',
				sections: [
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						bonus: 3,
						tier1: '6 damage',
						tier2: '10 damage',
						tier3: '13 damage'
					})),
					FactoryLogic.createAbilitySectionText('The damage dealt by this ability matches a damage type the draconian has immunity to.')
				]
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'draconian-malice-3',
				name: 'Scaleshatter Burst',
				type: FactoryLogic.type.createMain({ free: true }),
				cost: 7,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
				target: 'Each enemy in the area',
				sections: [
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						bonus: 3,
						tier1: '7 damage',
						tier2: '13 damage',
						tier3: '16 damage'
					})),
					FactoryLogic.createAbilitySectionText('The draconian’s scales shatter from battle damage. The draconian has damage weakness 5 but can take two turns per round until the end of the encounter.')
				]
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'draconian-1',
			name: 'Aeolyxria the Uncanny',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 140,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(-1, 2, 2, 3, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-1-feature-1',
						name: 'Spittlesplash',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two enemies',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 poison damage; M<1 slowed (save ends)',
								tier2: '15 poison damage; M<2 slowed (save ends)',
								tier3: '18 poison damage; M<3 slowed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-1-feature-2',
						name: 'Experimental Treasure',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: 'The target regains 10 Stamina',
								tier2: '12 corruption damage; A<2 weakened (save ends)',
								tier3: '12 lightning damage; A<2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The first time in an encounter that Aeolyxria makes a power roll for this ability, she can subsequently use the outcome of that roll instead of rolling whenever she uses this ability until the end of the encounter.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								repeatable: true,
								effect: 'The ability targets one additional target for each 2 Malice spent.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-1-feature-3',
						name: 'Elevate!',
						cost: 2,
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The ground in the area rises 5 squares, creating a pillar of dirt. Any creature in the area moves with the ground to its new elevation.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'Aeolyxria creates an additional pillar for each Malice spent.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-1-feature-4',
						name: 'Blood for Blood',
						type: FactoryLogic.type.createTrigger('An ally is made bleeding by the target.'),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 poison damage; A<2 bleeding (save ends)',
								tier2: '12 poison damage; A<3 bleeding (save ends)',
								tier3: '15 poison damage; bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-1-feature-5',
					name: 'That\'s Our Opening!',
					description: 'The Director gains 1 Malice whenever Aeolyxria imposes a condition on an enemy.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-1-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'draconian-2',
			name: 'Lokratix the Morningstar',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8, 'fly'),
			stamina: 160,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 1, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-2-feature-1',
						name: 'Skewer',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 damage',
								tier2: '15 damage; M<1 slowed (save ends)',
								tier3: '18 damage; M<2 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Locratix deals 6 damage to each creature or object in a 2 × 1 line behind the target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-2-feature-2',
						name: 'Acidic Stun',
						type: FactoryLogic.type.createMain(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 3, value2: 1, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 acid damage; M<1 dazed (save ends)',
								tier2: '12 acid damage; M<2 dazed (save ends)',
								tier3: '15 acid damage; M<3 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('While dazed this way, a target takes an extra 6 damage from Locratix’s abilities.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-2-feature-3',
						name: 'Takeoff',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Locratix flies up to her speed. Any creature adjacent to the space on the ground she took off from who has A<2 is knocked prone.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-2-feature-4',
						name: 'Stay Back!',
						type: FactoryLogic.type.createTrigger('A creature within distance moves or is forced moved.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 acid damage; A<1 the target’s speed is 0 (EoT)',
								tier2: '12 acid damage; A<2 the target’s speed is 0 (EoT)',
								tier3: '15 acid damage; A<3 the target’s speed is 0 (EoT)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-2-feature-5',
					name: 'Flighty',
					description: 'When Locratix deals rolled damage to an enemy, that enemy can’t use Locratix as the trigger for any of their triggered actions until the start of Locratix’s next turn.'
				}),
				FactoryLogic.feature.create({
					id: 'draconian-2-feature-6',
					name: 'Absorbing Scales',
					description: 'When Locratix takes damage of any type for which she has damage immunity, she has damage immunity 6 against the next strike made against her.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-2-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'draconian-3',
			name: 'Lydixavus the Deadeye',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Artillery),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 140,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 3, 3, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-3-feature-1',
						name: 'Breathsnipe',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 cold damage',
								tier2: '15 cold damage; the target takes a bane on their next strike',
								tier3: '19 cold damage; the target takes a double bane on their next strike'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-3-feature-2',
						name: 'Ice Lob',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 10 }) ],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 cold damage; M<1 dazed (save ends)',
								tier2: '12 cold damage; M<2 dazed (save ends)',
								tier3: '15 cold damage; M<3 dazed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-3-feature-3',
						name: 'Parting Gift',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Lydixavus flies up to their speed, leaving a size 1S ice mine in the space they took off from. The ice mine explodes when an enemy enters its space, using the power roll for the Ice Lob ability, and targeting the triggering creature and each creature and object adjacent to the ice mine.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-3-feature-4',
						name: 'Wasn\'t Aiming For You',
						type: FactoryLogic.type.createTrigger('Lydixavus obtains a tier 1 outcome on their signature ability.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Lydixavus uses their signature ability again, targeting a creature within 5 squares of the original target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-3-feature-5',
					name: 'Scorekeeping Scales',
					description: 'Lydixavus knows the location of every creature who has ever dealt damage to them. If any of those creatures are within 20 squares of Lydixavus, Lydixavus always has line of effect to them as long as a size 1 opening exists between Lydixavus and the target.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-3-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'draconian-4',
			name: 'Myxovidan the Sintaker',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 140,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 2, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-4-feature-1',
						name: 'Breaking Palm',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two enemies',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 damage; M<1 weakened (save ends)',
								tier2: '15 damage; M<2 weakened (save ends)',
								tier3: '18 corruption damage; M<3 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'Myxovidan regains Stamina equal to half the damage dealt.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-4-feature-2',
						name: 'Expunging Exhalation',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 courruption damage; M<1 the target has corruption weakness 3 (save ends)',
								tier2: '12 courruption damage; M<2 the target has corruption weakness 3 (save ends)',
								tier3: '15 courruption damage; the target has corruption weakness 3 (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-4-feature-3',
						name: 'Step and Swap',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('Myxovidan and the target shift to swap places.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-4-feature-4',
						name: 'Anyone Can Do That',
						cost: 2,
						type: FactoryLogic.type.createTrigger('An adjacent creature damages Myxovidan with a melee ability.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Myxovidan recreates the ability to use it against the triggering creature. If the ability has a power roll, Myxovidan uses his highest characteristic score for the roll. If Myxovidan gets a higher tier outcome than the triggering creature, the Director gains 2 Malice.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-4-feature-5',
					name: 'Stench of Death',
					description: 'Whenever an enemy regains Stamina while within 5 squares of Myxovidan, they regain 3 less Stamina.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-4-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'draconian-5',
			name: 'Phrrygalax the Subduer',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 180,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 0, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-5-feature-1',
						name: 'Baneful Blade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creature or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 damage',
								tier2: '16 damage; M<1 bleeding (save ends)',
								tier3: '19 damage; M<2 3 damage, bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-5-feature-2',
						name: 'Spinning Spit',
						cost: 2,
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 fire damage',
								tier2: '13 fire damage',
								tier3: '16 fire damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-5-feature-3',
						name: 'Heavy Landing',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Phrrygalax flies up to his speed and lands in an unoccupied space on the ground. Each creature adjacent to where he lands who has A<2 is knocked prone.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-5-feature-4',
						name: 'Armor of the Ancients',
						cost: 2,
						type: FactoryLogic.type.createTrigger('Phrrygalax takes acid, cold, corruption, fire, lightning, or poison damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Phrrygalax takes no damage and instead regains the same amount of Stamina. He then swaps his current damage immunity with the triggering damage type.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-5-feature-5',
						name: 'Still Your Tongue!',
						type: FactoryLogic.type.createTrigger('Phrrygalax hears a creature within 5 squares reciting the oath of Good King Omund’s Dragon Phalanx.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Phrrygalax shifts up to his speed and uses Baneful Blade against the triggering creature. That ability deals an extra 7 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-5-feature-6',
					name: 'Oathbreaker\'s Vengeance',
					description: 'Whenever Phrrygalax fails a saving throw, he deals an additional 7 damage on his next strike.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-5-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'draconian-6',
			name: 'Dorzinuuth the Base',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 180,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 1, 1, 2, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-1',
						name: 'Punishing Flail',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 damage; M<2 prone',
								tier2: '16 damage; M<3 prone',
								tier3: '19 damage; M<4 prone'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'If the target has M<4, they are also bleeding (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-2',
						name: 'I\'ll Cut A Path',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Before the power roll is made, Dorzinuuth shifts to an unoccupied space adjacent to the end of the line.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 damage',
								tier2: '12 damage; M<3 prone',
								tier3: '15 damage; M<4 prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-3',
						name: 'Watch Your Six!',
						type: FactoryLogic.type.createTrigger('An ally within distance takes damage while Dorzinuuth isn’t flying.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('Dorzinuuth shields the triggering ally with his wings, halving the damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-6-feature-4',
					name: 'End Effect',
					description: 'At the end of each of his turns, Dorzinuuth can take 10 damage to end one effect on him that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'draconian-6-feature-5',
					name: 'Sheltering Wings',
					description: 'While Dorzinuuth isn’t flying, strikes made against him take a bane.'
				}),
				FactoryLogic.feature.create({
					id: 'draconian-6-feature-6',
					name: 'Remember Your Oath',
					description: 'If Dorzinuuth hears a creature recite the Dragon Phalanx oath, he takes a bane on strikes made against that character until the end of the encounter.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-6-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-8',
						name: 'Roaring Gambit',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Dorzinuuth lets loose a powerful roar. Each target makes a **Reason test.**'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Reason,
								tier1: 'Frightened (save ends)',
								tier2: 'Frightened (EoT)',
								tier3: 'No effect'
							})),
							FactoryLogic.createAbilitySectionText('Each ally in the area gains an edge on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-9',
						name: 'Wings of Second Wind',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts or flies up to their speed and regains 10 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-10',
						name: 'Snap, Crackle, Pop',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All allies in the burst',
						sections: [
							FactoryLogic.createAbilitySectionText('Dorzinuuth covers the targets in an electrifying mesh. Whenever a target takes damage from a melee ability, the attacker takes 6 lightning damage.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'draconian-7',
			name: 'The Nameless',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Defender),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 30,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 66,
			stability: 4,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 1, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-7-feature-1',
						name: 'Baneful Blade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '6 damage',
								tier2: '11 damage',
								tier3: '14 damage; push 2'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-7-retainer-2',
						name: 'I\'m Not a Steed, You\'re Equipment',
						type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The Nameless\'s mentor',
						sections: [
							FactoryLogic.createAbilitySectionText('The Nameless’s mentor enters the Nameless’s space and rides on their back. The Nameless or the mentor can move the mentor to an adjacent space as a free maneuver. While in the Nameless’s space, the mentor moves with them and can’t use their move action, and ability rolls against the mentor take a bane.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-7-feature-3',
					name: 'Wing Block',
					description: 'Ranged attacks against the Nameless take a bane.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-7-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			],
			retainer: {
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-7-retainer-7',
						name: 'Looming Wings',
						type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '5 corruption damage; I (weak) weakened (save ends)',
								tier2: '9 corruption damage; I (average) weakened (save ends)',
								tier3: '12 corruption damage; I (strong) weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the Nameless’s mentor is in the area, ability rolls against the mentor have a double bane until the start of their next turn.')
						]
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-7-retainer-10',
						name: 'Spew Death',
						type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '11 corruption damage',
								tier2: '16 corruption damage',
								tier3: '21 corruption damage'
							})),
							FactoryLogic.createAbilitySectionText('Any living minions reduced to 0 Stamina by this ability regain all their Stamina and become corporeal undead under the Nameless’s control until the end of the Nameless’s next turn, after which they are destroyed.')
						]
					})
				})
			}
		})
	],
	addOns: []
};
