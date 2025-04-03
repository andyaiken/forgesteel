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

export const wyvern: MonsterGroup = {
	id: 'monster-group-wyvern',
	name: 'Wyvern',
	description: `
Few dragons can match the fury of a wyvern. Their aggression is driven by hunting and territorial instinct. Many adventurers meet their end in the wyvern’s maw—some because the wyvern saw them as competitors, and others because the wyvern was simply hungry.

Wyvern scales match the colors of the mud, rock, and rust that dominate the mountains and badlands where they prefer to reside. Unlike typical dragons, wyverns don’t have front legs—instead, they walk like bats, propelled by their rear legs and balancing on the joints of their wings.`,
	information: [
		{
			id: 'wyvern-info-1',
			name: 'Mountain Hunters',
			description: 'While on the hunt, wyverns perch on stone outcroppings and natural spires overlooking their territory. They first attack with their stinger, injecting prey with corrosive acid. If a wyvern’s victim attempts to hide, the wyvern’s hooked claws and fearsome teeth can tear open any crag or crevice in pursuit.'
		},
		{
			id: 'wyvern-info-2',
			name: 'Acidic Aggressors',
			description: 'Without front limbs to grasp their prey, wyverns prefer to keep their distance and strike with their long, stinger-tipped tails. A single sting is usually enough to kill common game outright, and even larger foes are left wracked by pain. Wyverns have no interest in drawn-out struggle, and they relentlessly sting their foes at every opportunity.'
		},
		{
			id: 'wyvern-info-3',
			name: 'Protective Parents',
			description: 'A wyvern’s infamous temper is easily provoked, particularly if their eggs or hatchlings are threatened. Many monster slayers for hire won’t accept contracts to track and hunt wyverns during hatching season. Yet this season is when heroes are needed most, as mated pairs aggressively hunt anything or anyone to feed their young.'
		},
		{
			id: 'wyvern-info-4',
			name: 'Communicating with Wyverns',
			description: 'Wyverns are unable to speak. However, a clever hero carrying a feast of fresh meat might still be able to reason with one.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wyvern-malice-1',
			name: 'Simmering Anger',
			cost: 3,
			sections: [
				'One wyvern in the encounter can make a free strike against each enemy adjacent to them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'wyvern-malice-2',
			name: 'Bully',
			cost: 5,
			sections: [
				'Until the end of the round, each wyvern in the encounter has a double edge on strikes and they can use their signature action instead of a free strike whenever they would make an opportunity attack.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'wyvern-malice-3',
			name: 'Rampage',
			cost: 7,
			sections: [
				'Each wyvern’s anger ﬁlls the area with a thick miasma of hated. Each enemy makes an **Intuition test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: 'Taunted by the nearest creature or object (save ends); power rolls made against the target have a double edge while they are taunted',
					tier2: 'Taunted by the nearest creature or object (save ends)',
					tier3: 'no effect'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wyvern-1',
			name: 'Wyvern Lurker',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Ambusher),
			keywords: [ 'Beast', 'Wyvern' ],
			encounterValue: 24,
			speed: FactoryLogic.createSpeed(9, 'fly'),
			stamina: 120,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, 3, -1, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-1-feature-1',
						name: 'Agonizing Stinger',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '14 damage; M<2 bleeding (save ends)',
							tier3: '17 damage; M<3 bleeding (save ends)'
						}),
						spend: [
							{ value: 1, effect: 'The lurker deals an additional 6 acid damage to one target if they were hidden from them.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-1-feature-2',
						name: 'Acidic Anguish',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 acid damage; M<1 weakened (save ends)',
							tier2: '16 acid damage; M<2 weakened (save ends)',
							tier3: '20 acid damage; M<3 weakened (save ends)'
						}),
						effect: 'A target weakened from this ability takes 1d4 acid damage at the start of each of their turns until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-1-feature-3',
						name: 'Swooping Torment',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The lurker flies up to their speed and hides. Each enemy that comes within 1 square of the lurker during this movement can choose to take 3 sonic damage or fall prone.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-1-feature-4',
						name: 'Retaliatory Dive',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the lurker with a ranged ability.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Triggering creature',
						effect: 'The lurker flies into a square adjacent to the target and makes a free strike against them.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wyvern-1-feature-5',
					name: 'Ruthless Rage',
					description: 'The lurker deals an additional 3 damage on strikes while within 10 squares of another wyvern.'
				}),
				FactoryLogic.feature.create({
					id: 'wyvern-1-feature-6',
					name: 'Tenacious Hunter',
					description: 'Any creature suﬀering a condition inﬂicted by a wyvern can’t be hidden from the lurker.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wyvern-1-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wyvern-2',
			name: 'Wyvern Predator',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Beast', 'Wyvern' ],
			encounterValue: 24,
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 140,
			stability: 3,
			size: FactoryLogic.createSize(3),
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 2, -1, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-2-feature-1',
						name: 'Sedating Stinger',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '14 damage; M<2 slowed (save ends)',
							tier3: '17 damage; M<3 slowed (save ends)'
						}),
						effect: 'The target is restrained (save ends) if they are already slowed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-2-feature-2',
						name: 'Tail Sweep',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 3, value2: 6, within: 1 }) ],
						target: 'All enemies and objects in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 damage; A<1 3 acid damage',
							tier2: '11 damage; A<2 3 acid damage',
							tier3: '14 damage; A<3 3 acid damage'
						}),
						spend: [
							{ value: 5, effect: 'The predator uses this ability a second time. They can target a new line or the same one.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-2-feature-3',
						name: 'Grasping Jaws',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage; A<1 grabbed',
							tier2: '14 damage; A<2 grabbed',
							tier3: '17 damage; A<3 grabbed (bane to escape)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-2-feature-4',
						name: 'Deterring Sting',
						cost: 1,
						type: FactoryLogic.type.createTrigger('A creature deals damage to the lurker with a melee ability.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Triggering creature',
						effect: 'The predator uses their Sedating Stinger ability against the target and then shifts 3.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wyvern-2-feature-5',
					name: 'Stubborn Rage',
					description: 'The predator is immune to being dazed or frightened while winded or while within 10 squares of another wyvern.'
				}),
				FactoryLogic.feature.create({
					id: 'wyvern-2-feature-6',
					name: 'Tenacious Hunter',
					description: 'Any creature suﬀering a condition inﬂicted by a wyvern can’t be hidden from the lurker.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wyvern-2-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		})
	],
	addOns: []
};
