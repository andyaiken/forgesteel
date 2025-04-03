import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const draconian: MonsterGroup = {
	id: 'monster-group-draconian',
	name: 'Draconian',
	description: `
Draconians—or wyrmwights as some call them—are a people created through a obscure ritual known as Dracogenesis. Most draconians have an elemental affinity connected to their scales, which they can change given enough time and training.

The draconians presented in this section aren’t a band, but five individual draconian warriors whose reputations precede them. You likely won’t find them all working together, but instead serving in other forces as high-ranking commanders.`,
	information: [
		{
			id: 'draconian-info-1',
			name: 'Aeolyxria the Uncanny',
			description: 'From the moment she hatched, Aeolyxria has enjoyed a fascination for the occult. She wanders the land gathering strange tomes and artifacts so she can study them in action. When she takes a job, it’s because she has a new doohickey she wants to test out. Aeolyxria possesses a sharp, tactical mind that can turn any battlefield into her homefield advantage. If she could just get a handle on all of her equipment, she’d be unstoppable!'
		},
		{
			id: 'draconian-info-2',
			name: 'Locratix the Morningstar',
			description: 'A traveler from a faraway land and the sole progeny of her Dracogenesis clutch, Locratix puts survival over all things. The very concept of the Dragon Knights is anathema to her; there is no reason a wyrmwight should hand over the power that keeps them alive. Locratix wanders the land taking up mercenary jobs, but she is always one better deal away from skewering her employer on the end of her lance.'
		},
		{
			id: 'draconian-info-3',
			name: 'Lydixavus the Deadeye',
			description: 'Nothing escapes Lydixavus or their unrivaled precision. After decades of careful training, they have honed their breath weapon into a swift and far-traveling bullet of ice. Lydixavus is motivated by revenge. Each scar, each dent in their scales has a story, and Lydixavus plans to return the favor tenfold to the perpetrator of each one.'
		},
		{
			id: 'draconian-info-4',
			name: 'Myxovidan the Sintaker',
			description: 'Myxovidan was raised by a secluded order of monks who claimed his obsidian-black scales and nausea-inducing breath were an evil that must be purged. They subjected him to an austere lifestyle, full of intense training, meditation, and denial of worldly pleasures. But Myxovidan’s hunger would be satisfied, one way or another. When Myxovidan departed the order, he left behind little more than a group of emaciated monk corpses who looked like they had the life sucked right out of them.'
		},
		{
			id: 'draconian-info-5',
			name: 'Phrrygalax the Subduer',
			description: 'Phrrygalax was once a Dragon Knight in the service of Good King Omund. Though he took the oath, he was always keenly aware he was created for violence. When Mandrake’s betrayal fractured the order, Phryygalax gleefully renounced his oath to follow what he believes to be his true, brutal purpose. Many who served with him believed he was merely waiting for a convenient excuse to do so.'
		},
		{
			id: 'draconian-info-6',
			name: 'Dorzinuuth the Base',
			description: 'To those who know the Dragon Phalanx of old, no name inspires more awe and fear than that of Dorzinuuth. A mastermind on the battlefield and the foundation of the Dragon Knights’ fraternity, Dorzinuuth was known for mounting daring campaigns and always returning with the same number of soldiers (if not more). In the wake of the death of Good King Omund, many were shocked to see him debase himself with banditry and petty mercenary jobs. Others hold on to the hope that he makes moves in darkness, waiting for the day when he can once again uphold his oath in the light.'
		},
		{
			id: 'draconian-info-7',
			name: 'Draconian Languages',
			description: 'Most draconians speak Caelian and the language of their employers and creators. '
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'draconian-malice-1',
			name: 'Guarding Gale',
			cost: 3,
			sections: [
				'A draconian acting this turn ﬂaps their wings and creates a powerful gale. Each creature adjacent to the draconian is pushed 4 and M<2 knocked prone.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'draconian-malice-2',
				name: 'Breath Weapon',
				type: FactoryLogic.type.createAction(),
				cost: 5,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 2, within: 1 }) ],
				target: 'All enemies in the line',
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 3,
					tier1: '6 damage',
					tier2: '10 damage',
					tier3: '13 damage'
				}),
				effect: 'The damage type changes to match a damage type that the draconian has immunity to.'
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'draconian-malice-3',
				name: 'Scaleshatter Burst',
				type: FactoryLogic.type.createAction({ free: true }),
				cost: 7,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
				target: 'All enemies in the burst',
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 3,
					tier1: '7 damage',
					tier2: '13 damage',
					tier3: '16 damage'
				}),
				effect: 'The draconian\'s scales shatter from battle damage. The draconian has damage weakness 5, but the draconian can now take two turns per round.'
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'draconian-1',
			name: 'Aeolyxria the Uncanny',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Controller),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 140,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(-1, 2, 4, 3, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-1-feature-1',
						name: 'Spittlesplash',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 poison damage; M<1 slowed (save ends)',
							tier2: '15 poison damage; M<2 slowed (save ends)',
							tier3: '18 poison damage; M<3 slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-1-feature-2',
						name: 'Experimental Treasure',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: 'The target regains 10 Stamina',
							tier2: '12 corruption damage; A<2 weakened (save ends)',
							tier3: '12 lightning damage; A<2 bleeding (save ends)'
						}),
						effect: 'The first time in an encounter that Lydixavus rolls a result with this ability, she can choose that result instead of rolling whenever she uses this ability for the rest of the encounter.',
						spend: [
							{ value: 2, repeatable: true, effect: 'Aeolyxria targets an additional creature or object for every 2 malice spent.' }
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
						effect: 'The ground is elevated by 5 squares, creating a pillar of dirt. Each creature in the affected area is lifted along with it.',
						spend: [
							{ value: 1, repeatable: true, effect: 'Aeolyxria create an additional pillar for each malice spent.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-1-feature-4',
						name: 'Blood for Blood',
						type: FactoryLogic.type.createTrigger('The target inflicts bleeding condition on an ally.'),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 poison damage; A<2 bleeding (save ends)',
							tier2: '12 poison damage; A<3 bleeding (save ends)',
							tier3: '15 poison damage; bleeding (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-1-feature-5',
					name: 'That\'s Our Opening!',
					description: 'The Director gains 1 malice whenever Aeolyxria inflicts a condition on an enemy.'
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Harrier),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 damage',
							tier2: '15 damage; M<1 slowed (save ends)',
							tier3: '18 damage; M<2 slowed (save ends)'
						}),
						effect: 'Lokratix deals 6 damage to each creature or object in a line up to two squares behind the target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-2-feature-2',
						name: 'Acidic Stun',
						type: FactoryLogic.type.createAction(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 3, value2: 1, within: 1 }) ],
						target: 'All enemies in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 acid damage; M<1 dazed (save ends)',
							tier2: '12 acid damage; M<2 dazed (save ends)',
							tier3: '15 acid damage; M<3 dazed (save ends)'
						}),
						effect: 'Lokratix deals an additional 6 damage on abilities targeting enemies dazed by this ability.'
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
						effect: 'Lokratix lifts off from the ground and flies up to her speed. All creatures adjacent to the square she took off from are A<2 knocked prone.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-2-feature-4',
						name: 'Stay Back!',
						type: FactoryLogic.type.createTrigger('Target enters a square within distance.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 acid damage; A<1 speed is 0 (EoT)',
							tier2: '12 acid damage; A<2 speed is 0 (EoT)',
							tier3: '15 acid damage; A<3 speed is 0 (EoT)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-2-feature-5',
					name: 'Flighty',
					description: 'When Lokratix deals damage to an enemy, the enemy can’t use her as the trigger for any of their triggered actions until the start of her next turn.'
				}),
				FactoryLogic.feature.create({
					id: 'draconian-2-feature-6',
					name: 'Absorbing Scales',
					description: 'When Lokratix takes damage of a type she has an immunity for, she has damage immunity 6 against the next strike made against her.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-2-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'draconian-3',
			name: 'Lydixavus the Deadeye',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Artillery),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One enemy',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 cold damage',
							tier2: '15 cold damage; the target has a bane on their next strike.',
							tier3: '19 cold damage; the target has a double bane on their next strike'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-3-feature-2',
						name: 'Ice Lob',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 10 }) ],
						target: 'All enemies and objects in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 cold damage; M<1 dazed (save ends)',
							tier2: '13 cold damage; M<2 dazed (save ends)',
							tier3: '16 cold damage; M<3 dazed (save ends)'
						})
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
						effect: 'Lydixavus flies up to their speed, leaving a size 1S ice mine in the square they took off from. The ice mine explodes when an enemy enters a square containing it. Lydixavus rolls power for an exploding ice mine as if they used their Ice Lob ability, targeting the triggering creature and each creature and object within 1 of the ice mine.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-3-feature-4',
						name: 'Wasn\'t Aiming For You',
						type: FactoryLogic.type.createTrigger('Lydixavus gets a Tier 1 result on their signature attack.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Lydixavus uses an additional signature action targeting a creature within 5 of the original target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-3-feature-5',
					name: 'Scorekeeping Scales',
					description: 'Lydixavus knows the location of every creature who has ever dealt damage to them and has line of effect to each of these creatures while they’re within 20 of Lydixavus.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-3-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'draconian-4',
			name: 'Myxovidan the Sintaker',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Hexer),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 46,
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 damage; M<1 weakened (save ends)',
							tier2: '15 damage; M<2 weakened (save ends)',
							tier3: '18 corruption damage; M<3 weakened (save ends)'
						}),
						spend: [
							{ value: 2, effect: 'Myxovidan regains Stamina equal to half the damage dealt.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-4-feature-2',
						name: 'Expunging Exhalation',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 courruption damage; M<1 condemned (save ends)',
							tier2: '12 courruption damage; M<2 condemned (save ends)',
							tier3: '15 courruption damage; M<3 condemned (save ends)'
						}),
						effect: 'A condemned creature has corruption weakness 3 until the condition ends.'
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
						effect: 'Myxovidan and the target shift and swap places.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-4-feature-4',
						name: 'Anyone Can Do That',
						cost: 2,
						type: FactoryLogic.type.createTrigger('An adjacent creature damages Myxovidan.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Myxovidan perfectly recreates the damaging move. If the move requires a Power Roll, Myxovidan rolls power using his stats. If Myxovidan gets a higher tier on this roll than the triggering creature, the Director gains 2 Malice.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-4-feature-5',
					name: 'Stench of Death',
					description: 'Whenever an enemy regains Stamina while within 5 of Myxovidan they regain 3 less Stamina.'
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Draconian', 'Dragon', 'Humanoid' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 180,
			stability: 5,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 0, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-5-feature-1',
						name: 'Baneful Blade',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creature or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 damage',
							tier2: '16 damage; M<1 bleeding (save ends)',
							tier3: '19 damage; M<2 3 damage, bleeding (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-5-feature-2',
						name: 'Spinning Spit',
						cost: 2,
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 fire damage',
							tier2: '13 fire damage',
							tier3: '16 fire damage'
						})
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
						effect: 'Phrrygalax flies up to his speed and lands in an unoccupied space on the ground. Each creature adjacent to where he lands is A<2 knocked prone.'
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
						effect: 'Phrrygalax absorbs the damage instead, recovering Stamina equal to the damage dealt. Phrrygalax swaps his current immunity with the triggering damage type.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-5-feature-5',
						name: 'STILL YOUR TONGUE!',
						type: FactoryLogic.type.createTrigger('Phrrygalax hears a creature within 5 reciting the oath of Good King Omund\'s Dragon Phalanx.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Phrrygalax shifts up to his speed and uses Baneful Blade against the enemy, dealing an additional 7 damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-5-feature-6',
					name: 'Oathbreaker\'s Vengeance',
					description: 'When Phrrygalax fails a saving throw, he deals an additional 7 damage on his next strike.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'draconian-5-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 }) ]
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
			stability: 6,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 1, 1, 2, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-1',
						name: 'Punishing Flail',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 damage; M<2 prone',
							tier2: '16 damage; M<3 prone',
							tier3: '19 damage; M<4 prone'
						}),
						spend: [
							{ value: 2, effect: 'M<4 bleeding (save ends).' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-2',
						name: 'I\'ll Cut A Path',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
						target: 'All enemies in the line',
						preEffect: 'Dorzinuuth shifts up to an unoccupied space adjacent to the end of the line and then rolls power.',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '7 damage',
							tier2: '12 damage; M<3 prone',
							tier3: '15 damage; M<4 prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-3',
						name: 'Step and Swap',
						type: FactoryLogic.type.createTrigger('An ally within distance takes damage while Dorzinuuth isn\'t flying.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One ally',
						effect: 'Dorzinuuth shields his ally with his wings, halving the damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-6-feature-4',
					name: 'End Effect',
					description: 'At the end of his turn, Dorzinuuth can take 10 damage to end one save ends effect affecting him. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'draconian-6-feature-5',
					name: 'Sheltering Wings',
					description: 'Strikes made against Dorzinuuth have a bane while he isn’t flying.'
				}),
				FactoryLogic.feature.create({
					id: 'draconian-6-feature-6',
					name: 'Remember Your Oath',
					description: 'After Dorzinuuth hears a character recite the Dragon Phalanx oath, he has a bane on all strikes made against that character.'
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
						target: 'All enemies in the burst',
						preEffect: 'Dorzinuuth lets loose a powerful roar. Each target must make a **Reason test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Reason,
							tier1: 'frightened (save ends)',
							tier2: 'frightened (EoT)',
							tier3: 'no effect'
						}),
						effect: 'Each ally within distance has an edge on their next attack.'
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
						target: 'Self and all allies in the burst',
						effect: 'Each target shifts or flies up to their speed and regains 10 Stamina.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-6-feature-10',
						name: 'Snap, Crackle, Pop',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All allies in the burst',
						effect: 'Dorzinuuth covers all allies in an electrifying mesh. Whenever a target takes damage from a melee strike or ability, the attacker takes 6 lightning damage.'
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
			stamina: 90,
			stability: 4,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 1, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-7-feature-1',
						name: 'Malice Mace',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 damage',
							tier2: '11 damage',
							tier3: '14 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-7-retainer-2',
						name: 'I\'m Not a Steed, You\'re Equipment',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The Nameless\'s mentor',
						effect: 'The Nameless’s mentor enters their square and rides on their back. The Nameless or the mentor can move the mentor to an adjacent square as a free maneuver. While in the Nameless’s square, the mentor moves with them, can’t take their own move action, and gains 1 shield.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'draconian-7-feature-3',
					name: 'Wing Block',
					description: 'Ranged attacks against the Nameless suffer a bane.'
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
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '5 corruption damage; I (weak) weakened (save ends)',
							tier2: '9 corruption damage; I (average) weakened (save ends)',
							tier3: '12 corruption damage; I (strong) weakened (save ends)'
						}),
						effect: 'If the Nameless\'s menter is in the area, they gain 2 shields until the start of their next turn.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'draconian-7-retainer-10',
						name: 'Spew Death',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '11 corruption damage',
							tier2: '16 corruption damage',
							tier3: '21 corruption damage'
						}),
						effect: 'The Nameless must be winded to use this ability. Any living minions reduced to 0 Stamina by this ability regain all their Stamina and become corporeal undead under the Nameless’s control until the end of the Nameless’s next turn, after which time they are destroyed.'
					})
				})
			}
		})
	],
	addOns: []
};
