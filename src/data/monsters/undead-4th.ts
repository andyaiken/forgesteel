import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const undead4th: MonsterGroup = {
	id: 'monster-group-undead-4th',
	name: 'Undead — 4th Echelon',
	description: 'The deadliest of undead creatures can be placed into one of two categories: terrible machines that know only destruction, and powerful tyrants who aren’t content with conquering just death.',
	picture: null,
	information: [
		{
			id: 'undead-4th-info-1',
			name: 'Bonecage',
			description: 'The weakness of many undead minions means that necromancers at war often find themselves shy of corpses when their forces lose more numbers than they slay. The bonecage offers a horrific solution to this problem. This hulking creature made from giants’ bones is structured like a massive cage that they can cram dead and near-dead corpses into. Trawling the scenes of great battles, the bonecage fills themself with the fallen, stealing them away for ill purposes. Of course, when no mass casualty site presents itself, the bonecage is more than capable of making corpses of their own.'
		},
		{
			id: 'undead-4th-info-2',
			name: 'Lithgekh',
			description: 'Every mage who lives long enough eventually contends with the fact that their knowledge will one day leave the world. For those who can’t stomach this idea, seeking the immortality of the lich often becomes an irresistible temptation. But many of those who try and fail to achieve lichdom become lithgekh—a word in the First Language meaning “lich corpse.” Having failed to create a proper soul vessel, a lithgekh suffers an eternal hunger for magic to sustain themself. Liches will sometimes trick or tempt mortal mages into pursuing lichdom, only to sabotage them and create a lithgekh under the lich’s control. These servants are prized by liches for their ability to disrupt enemy magic and empower their own.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'undead-4th-malice-1',
			name: 'Ravenous Horde',
			cost: 2,
			sections: [
				'At the end of this round, each hero not already adjacent to one or more undead is beset by two **rotting zombies** who burst up from the ground to appear in adjacent unoccupied spaces. Each zombie is winded. This feature can’t be used two rounds in a row.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-4th-malice-2',
			name: 'Paranormal Fling',
			cost: 3,
			sections: [
				'Up to three unattended objects on the encounter map rise to float 1 square off the ground. Each object is then pulled 5 squares toward the nearest enemy within 3 squares of the object.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-4th-malice-3',
			name: 'The Grasping, The Hungry',
			cost: 5,
			sections: [
				'Ravenous and rotting undead arms burst forth from 9 connected squares of a vertical or horizontal surface. Any creature who ends their turn adjacent to an affected square makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '5 damage; restrained (save ends)',
					tier2: '5 damage; restrained (EoT)',
					tier3: '5 damage'
				}),
				'While restrained this way, a creature takes 1d6 damage at the start of each of their turns.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-4th-malice-4',
			name: 'Dread March',
			cost: 7,
			sections: [
				'Up to four undead in the encounter move up to their speed and can make a free strike. The number of undead affected increases by 1 for each additional Malice spent on this feature. If an undead is reduced to 0 Stamina during this dread march, they don’t die until the march is resolved.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-4th-malice-5',
			name: 'Blood Hunger',
			cost: 5,
			sections: [
				'One undead acting this turn uses a signature ability against a creature who is bleeding. As a free triggered action, each undead within 5 squares of the first undead moves up to their speed and can make a free strike against the same target.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-4th-malice-6',
			name: 'Necrotic Rupture',
			cost: 5,
			sections: [
				'Until the end of the round, whenever an undead is reduced to 0 Stamina, they deal 8 corruption damage to each enemy within 3 squares of them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-4th-malice-7',
			name: 'Death Tax',
			cost: 7,
			sections: [
				'The undead attempts to rend the vitality of their foes. Each enemy within 5 squares of the undead makes a **Might test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Might,
					tier1: '10 corruption damage; the target loses 2 Recoveries',
					tier2: '8 corruption damage; the target loses 1 Recovery',
					tier3: '5 corruption damage'
				}),
				'A target who has fewer Recoveries than they would lose is also weakened (save ends).',
				'**Special**: This ability can’t be used by a minion.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'undead-4th-1',
			name: 'Giant Shambler Zombie',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(4),
			stamina: 17,
			stability: 5,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(5, -3, -3, 1, -2),
			withCaptain: '+4 damage bonus to strikes',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-4th-1-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 10 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-4th-1-feature-2',
						name: 'Rotten Kick',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '5 damage; push 2',
									tier2: '8 damage; push 4',
									tier3: '10 damage; push 6'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-4th-1-feature-3',
					name: 'Meat Shield',
					description: 'Each ally adjacent to the shambler has damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-4th-2',
			name: 'Skeleton Knight',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 17,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 5, -2, 4, -2),
			withCaptain: 'Gain an edge on strikes',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-4th-2-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 10 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-4th-2-feature-2',
						name: 'Four Swords Swing',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '4 damage',
									tier2: '7 damage',
									tier3: '9 damage; the target can’t shift (EoT)'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-4th-2-feature-3',
					name: 'Bitter Bones',
					description: 'If the knight is reduced to 0 Stamina, their bones collapse to fill their space with an impassable barrier. Any enemy who comes adjacent to the barrier for the first time in a round or starts their turn there takes 5 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-4th-2-feature-4',
					name: 'More Swings',
					description: 'Whenever the knight makes a free strike, they can make two free strikes instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-4th-3',
			name: 'Wraith Skulker',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Undead' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'fly, hover'),
			stamina: 15,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(-2, 3, 1, 1, 5),
			withCaptain: '+3 bonus to speed',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-4th-3-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 10 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-4th-3-feature-2',
						name: 'Draining Rake',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '4 cold damage; the wraith can shift 1 square',
									tier2: '7 cold damage; the wraith shifts up to 2 squares',
									tier3: '9 cold damage; P<5 slowed (save ends); the wraith shifts up to 3 squares'
								})
							),
							FactoryLogic.createAbilitySectionText('The wraith turns invisible until the start of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-4th-3-feature-3',
					name: 'Corruptive Phasing',
					description: 'The wraith can move through creatures and objects at their usual speed, but can’t end their turn inside a creature or object. The first time in a round that the wraith moves through a creature, that creature takes 5 corruption damage. The wraith doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-4th-4',
			name: 'Bonecage',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 55,
			stability: 5,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(5, -2, -2, 3, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-4th-4-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 10 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-4th-4-feature-2',
						name: 'Ribcage Chomp',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '9 damage; M<4 grabbed',
									tier2: '12 damage; M<5 grabbed',
									tier3: '14 damage; grabbed'
								})
							),
							FactoryLogic.createAbilitySectionText('The bonecage can have up to four size 1 targets grabbed at once. Any creature grabbed by the bonecage takes a bane on the Escape Grab maneuver, and the bonecage has damage immunity 5 against that creature’s abilities. When the bonecage is force moved, any creature or object they have grabbed moves with them.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'While grabbed this way, a target can’t teleport or be teleported.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-4th-4-feature-3',
						name: 'Labyrinth of Bone',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSpecial('Four 10 × 1 lines within 3') ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('The bonecage can put up to two 90-degree bends in each of the lines. Each target makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Agility,
									tier1: '9 damage',
									tier2: '7 damage',
									tier3: '4 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain for enemies. The effect ends at the end of the encounter or when the bonecage uses this ability again.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-4th-5',
			name: 'Lithgekh',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly, hover'),
			stamina: 55,
			stability: 1,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 5, 3, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-4th-5-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 10 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-4th-5-feature-2',
						name: 'Heartstopper',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '9 corruption damage; I<3 frightened (save ends)',
									tier2: '12 corruption damage; I<4 frightened (save ends)',
									tier3: '14 corruption damage; I<5 frightened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A creature frightened this way takes a bane on any ability that targets undead.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-4th-5-feature-3',
						name: 'Mystic Battery',
						type: FactoryLogic.type.createTrigger('A creature within distance uses a magic ability.', { free: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'The triggering creature',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('Any damage dealt by or Stamina regained from the ability is halved. The lithgekh regains Stamina equal to the remaining damage dealt or Stamina gained.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-4th-5-feature-4',
					name: 'Devour Magic',
					description: 'Each ally within 10 squares of the lithgekh gains an edge on magic abilities.'
				})
			]
		})
	],
	addOns: []
};
