import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { StatBlockIcon } from '@/enums/stat-block-icon';

export const wyvern: MonsterGroup = {
	id: 'monster-group-wyvern',
	name: 'Wyvern',
	description: `
The sight of a wyvern perched high atop a rotting tree or lit upon the jagged peak of a shadowy mountain marks the boundary between the known lands and forest primeval. There are raw, ancient sorceries in the wilderness that imbue those lands with power and hate older than roads and carts. 

Though they superficially resemble dragons, wyverns are not dragons or dragon-kin. Distant relatives of the terror lizards of Ix, wyverns sport tough, leathery skin with hues running from brown to red to black depending on their native terrain. They are solitary creatures who track their prey by following the smell of fear they create.`,
	picture: null,
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
			description: 'Wyverns are unable to speak. However, a clever hero carrying a feast of fresh meat might be able to reason with one.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wyvern-malice-1',
			name: 'Simmering Anger',
			cost: 3,
			icon: StatBlockIcon.Melee,
			sections: [
				'One wyvern in the encounter can make a free strike against each enemy adjacent to them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'wyvern-malice-2',
			name: 'Boiling Fury',
			cost: 5,
			icon: StatBlockIcon.Trait,
			sections: [
				'Until the end of the round, each wyvern in the encounter has a double edge on strikes and they can use their signature action instead of a free strike whenever they would make an opportunity attack.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'wyvern-malice-3',
			name: 'Overflowing Rage',
			cost: 7,
			icon: StatBlockIcon.SpecialArea,
			sections: [
				'Each wyvern’s anger ﬁlls the encounter map with a thick miasma of hated. Each enemy in the encounter makes an **Intuition test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: 'The target is taunted by the nearest creature or object (save ends). While the target is taunted this way, power rolls against them have a double edge.',
					tier2: 'The target is taunded by the nearest creature or object (save ends).',
					tier3: 'No effect.'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wyvern-1',
			name: 'Wyvern Lurker',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Ambusher),
			keywords: [ 'Beast', 'Wyvern' ],
			encounterValue: 24,
			speed: FactoryLogic.createSpeed(9, 'fly'),
			stamina: 120,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(2, 3, -1, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-1-feature-1',
						name: 'Agonizing Stinger',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage',
								tier2: '14 damage; M < 2 bleeding (save ends)',
								tier3: '17 damage; M < 3 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'One target hidden from the lurker takes an extra 6 acid damage.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-1-feature-2',
						name: 'Acidic Anguish',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 acid damage; M < 1 weakened (save ends)',
								tier2: '16 acid damage; M < 2 weakened (save ends)',
								tier3: '20 acid damage; M < 3 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText(
								'A target weakened this way takes 1d4 acid damage at the start of each of their turns.'
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-1-feature-3',
						name: 'Swooping Torment',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText(
								'The lurker flies up to their speed, then can attempt to hide. Each enemy the lurker moves adjacent to during this movement can choose to take 3 sonic damage or fall prone.'
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-1-feature-4',
						name: 'Retaliatory Dive',
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to the lurker with a ranged ability.'),
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText(
								'The lurker flies adjacent to the target and can make a free strike against them.'
							)
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wyvern-1-feature-5',
					name: 'Ruthless Rage',
					description: 'While within 10 squares of another wyvren, the lurker deals an additional 3 damage with strikes.'
				}),
				FactoryLogic.feature.create({
					id: 'wyvern-1-feature-6',
					name: 'Tenacious Hunter',
					description: 'Any creature affected by a condition imposed by a wyvern can’t be hidden from the lurker.'
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Beast', 'Wyvern' ],
			encounterValue: 24,
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 140,
			stability: 3,
			size: FactoryLogic.createSize(3),
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(3, 2, -1, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-2-feature-1',
						name: 'Sedating Stinger',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage',
								tier2: '14 damage; M < 2 slowed (save ends)',
								tier3: '17 damage; M < 3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If a target slowed this way is already slowed, they are instead restrained (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-2-feature-2',
						name: 'Tail Sweep',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 3, value2: 6, within: 1 }) ],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 damage; A < 1 3 acid damage',
								tier2: '11 damage; A < 2 3 acid damage',
								tier3: '14 damage; A < 3 3 acid damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'The predator uses this ability a second time, either recreating the same line or creating a new one.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-2-feature-3',
						name: 'Grasping Jaws',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage; A < 1 grabbed',
								tier2: '14 damage; A < 2 grabbed',
								tier3: '17 damage; A < 3 grabbed and the target takes a bane on the Escape Grab maneuver'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wyvern-2-feature-4',
						name: 'Deterring Sting',
						cost: 1,
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to the prdator with a melee ability.'),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The predator uses Sedating Stinger against the target, then shifts up to 3 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wyvern-2-feature-5',
					name: 'Stubborn Rage',
					description: 'While winded or within 10 squares of another wyvern, the predator can’t be made dazed or frightened.'
				}),
				FactoryLogic.feature.create({
					id: 'wyvern-2-feature-6',
					name: 'Tenacious Hunter',
					description: 'Any creature affected by a condition imposed by a wyvern can’t be hidden from the predator.'
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
