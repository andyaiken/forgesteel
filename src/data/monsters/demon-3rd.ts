import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const demon3rd: MonsterGroup = {
	id: 'monster-group-demon-3rd',
	name: 'Demon — 3rd Echelon',
	description: 'Demons of categories 7 to 9 continue to mutate in new and unpredictable ways, or are sometimes corrupted and spawned from other powerful creatures to become part of the demonic hierarchy. Additionally, in a plane of chaos, the soulraker demon is notable for fashioning a facsimile of order within themself. These demonic wasps make up a single, chaotic hive mind. They serve a demonic hivequeen, who relies on cannibalizing her children to ingest any souls they’ve consumed.',
	picture: null,
	information: [
		{
			id: 'demon-3rd-info-1',
			name: 'Demons — 3rd Echelon',
			description: `
• **Soulraker scouts** are the vile progeny of a soulraker hivequeen—demonic wasps who emerge from her distended abdomen with an earsplitting buzz.

• **Soulraker soldiers** are demonic wasps armored in dense chitin who favor driving foes before them.

• **Soulraker stingers** are wasps covered in poisonous barbed stingers that they launch like quills, their wings atrophied and unusable.

• **Blight phages** were once angelic creatures. Corrupted by demonic forces, each is now a cruel, distended mockery of a cherubic form, covered in pestilent boils that seep ruinous blight.

• **Chimerons** (kai-MEHR-ons) are a horrifying amalgam of multiple demonic forms melded into a unique monstrosity, driven by an unslakable hunger for souls.

• **Styrichs** (STEE-rix) feature lanky bodies covered with manes of long, razor-sharp hair, which they whip around the battlefield to shred their enemies.

• **Soulraker handmaidens** are abyssal parasites implanted in victims by a soulraker hivequeen. Handmaidens gestate inside a host until they’re ready to emerge from the body, then consume souls until they’re strong enough to transform into a new hivequeen.

• **Soulraker praetorians** are the elite guards of a hivequeen, dripping foul-smelling ichor and using their barbed stingers to lay waste to foes.

• A **soulraker hivequeen** is a demonic wasp whose abdomen houses their own soulraker wasp hive, and whose stinging ovipositor implants victims with handmaiden parasites.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'demon-3rd-malice-1',
			name: 'Prior Malice Features',
			cost: 3,
			repeatable: true,
			sections: [
				'The demon activates a Malice feature available to demons of level 6 or lower.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-3rd-malice-2',
			name: 'Seeping Blight',
			cost: 5,
			sections: [
				'One demon acting this turn expels blight—digested soul juice—onto the ground around them in a 3 burst that lingers until the start of their next turn. Any enemy who enters the area or starts their turn there takes 6 corruption damage, and has a double bane on power rolls until the start of their next turn.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'demon-3rd-1',
			name: 'Soulraker Scout',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 12,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 4, 1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-1-feature-1',
						name: 'Soul Stinger',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '3 poison damage',
								tier2: '5 poison damage; the scout can shift 1 square',
								tier3: '7 poison damage: the scout shifts up to 3 square'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-1-feature-2',
					name: 'Abyssal Buzzing',
					description: 'Any enemy who starts their turn with two or more soulraker minions adjacent to them takes 3 sonic damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-2',
			name: 'Soulraker Soldier',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 13,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(4, 2, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-2-feature-1',
						name: 'Chitin Bash',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 damage; push 2',
								tier2: '7 damage; push 2',
								tier3: '8 damage; push 4'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-2-feature-2',
					name: 'Abyssal Buzzing',
					description: 'Any enemy who starts their turn with two or more soulraker minions adjacent to them takes 3 sonic damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-3',
			name: 'Soulraker Stinger',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, -1, 4, 4, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-3-feature-1',
						name: 'Barb Launch',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 poison damage',
								tier2: '7 poison damage',
								tier3: '8 poison damage'
							})),
							FactoryLogic.createAbilitySectionText('All soulraker demons have concealment from the target until the start of the stinger’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-3-feature-2',
					name: 'Abyssal Buzzing',
					description: 'Any enemy who starts their turn with two or more soulraker minions adjacent to them takes 3 sonic damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-4',
			name: 'Blight Phage',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 4, 3, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-4-feature-1',
						name: 'Blight Pus',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 corruption damage',
								tier2: '10 corruption damage',
								tier3: '11 corruption damage'
							})),
							FactoryLogic.createAbilitySectionText('A puddle of blight—digested soul juice—covers the ground in the target’s square, which is affected as if by **Seeping Blight** (see the Level 7+ **Demon Malice** feature).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-4-feature-2',
						name: 'Blight Rain',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** The blight phage must create the cube beneath themself.'),
							FactoryLogic.createAbilitySectionText('The blight phage spins and sheds corruptive blight to fill the area, which is treated as if affected by **Seeping Blight**.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The blight phage chooses three 2 cube areas within 10 squares of the phage. Each area is covered with blight and treated as if affected by **Seeping Blight**.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-4-feature-3',
					name: 'Lethe',
					description: 'While the blight phage is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-4-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the blight phage can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-5',
			name: 'Chimeron',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 11,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 90,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(4, 0, 2, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-5-feature-1',
						name: 'Flux Gnash',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '9 cold, fire, or sonic damage',
								tier2: '11 cold, fire, or sonic damage',
								tier3: '13 cold, fire, or sonic damage; M<4 bleeding, dazed, or slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Special:** After making the power roll, the chimeron decides what damage type the ability deals and which condition it imposes.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-5-feature-2',
						name: 'Pain Absorption',
						type: FactoryLogic.type.createTrigger('The chimeron is targeted by a damage-dealing strike.'),
						cost: 1,
						keywords: [ ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The chimeron halves the damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-5-feature-3',
					name: 'Lethe',
					description: 'While the chimeron is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-5-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the chimeron can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-5-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-6',
			name: 'Styrich',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 45,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 4, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-6-feature-1',
						name: 'Hair Whip',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(4) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 damage; pull 1',
								tier2: '10 damage; pull 2, grabbed',
								tier3: '12 damage; pull 3, grabbed'
							})),
							FactoryLogic.createAbilitySectionText('Any target restrained by the styrich’s Tangled Nest ability can be pulled the distance determined by the power roll.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-6-feature-2',
						name: 'Tangled Nest',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'A<2 slowed (save ends)',
								tier2: 'Slowed (EoT) or A<3 3 damage and restrained (EoT)',
								tier3: 'Restrained (EoT) or A<4 3 damage and restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-6-feature-3',
					name: 'Lethe',
					description: 'While the styrich is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-6-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the styrich can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-6-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-7',
			name: 'Soulraker Praetorian',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 45,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 4, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-7-feature-1',
						name: 'Barbed Stinger',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 poison damage; push 2',
								tier2: '10 poison damage; push 2',
								tier3: '11 poison damage; push 4; A<4 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('The praetorian can shift into each square the target leaves.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-7-feature-2',
						name: 'Stinging Departure',
						type: FactoryLogic.type.createTrigger('A creature ends the praetorian’s grab.'),
						cost: 2,
						keywords: [ ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The praetorian makes a free strike against the target, breaks off part of their stinger in the target, and shifts up to half their speed. The target is bleeding until they remove the stinger fragment as a free maneuver, taking 6 damage in the process.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-7-feature-3',
					name: 'Lethe',
					description: 'While the praetorian is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-7-feature-4',
					name: 'Praetorian Buzzing',
					description: 'Any creature who starts their turn with two or more praetorians adjacent to them takes 6 sonic damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-7-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-8',
			name: 'Soulraker Handmaiden',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(0),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 0, 2, 2, 4),
			features: [
				FactoryLogic.feature.create({
					id: 'demon-3rd-8-feature-1',
					name: 'Implanted Parasite',
					description: `
A host creature implanted by a soulraker hivequeen’s **Stinging Ovipositor** has no physical or mental signs of the handmaiden gestating inside the host’s body.

After 1d3 + 1 weeks of gestation, the handmaiden fully forms inside the host. The handmaiden always moves with and occupies the same space as the host and can’t be separated from them. While totally within the creature, the handmaiden doesn’t have line of effect to the host or targets outside the host and vice versa.

As a maneuver, the handmaiden can emerge from the host as a horrifying tower of flesh and bone that remains attached to the host’s insides. While emerged, the handmaiden can use a move action to make the host move up to their speed and has access to the host’s signature abilities, using the host’s modifiers for any power rolls. The handmaiden has the same Stability as the host. If the handmaiden or host is force moved, the other moves with them. While emerged, the handmaiden can be targeted independently of the host. The handmaiden can retreat totally within the host’s body as a maneuver. If the handmaiden dies, their remains separate from the host.

The Find a Cure downtime project in *Draw Steel: Heroes* can be used to find a cure that removes a handmaiden from a host. The cure kills the handmaiden when consumed.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-8-feature-2',
						name: 'Emergent Horrors',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '8 corruption damage',
								tier2: '11 corruption damage',
								tier3: '13 corruption damage; M<4 frightened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the handmaiden was totally within their host’s body at the start of this turn, the ability deals an extra 8 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-8-feature-3',
					name: 'Lethe',
					description: 'While the handmaiden is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-8-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3rd-9',
			name: 'Soulraker Hivequeen',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Demon', 'Soulraker' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(5),
			speed: FactoryLogic.createSpeed(6),
			stamina: 240,
			stability: 2,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(5, -1, 3, 3, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-1',
						name: 'Stinging Ovipositor',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(1), FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '14 poison damage; M<3 bleeding (save ends)',
								tier2: '19 poison damage; M<4 bleeding (save ends)',
								tier3: '23 poison damage; M<5 the target is implanted'
							})),
							FactoryLogic.createAbilitySectionText('An implanted target has a **soulraker handmaiden** parasite gestating in them (see the handmaiden’s **Implanted Parasite** trait).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-2',
						name: 'Forced Gestation',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each implanted handmaiden parasite in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The hivequeen lets loose a subsonic call to each target, forcing them to immediately emerge from their host’s body as a mature **soulraker handmaiden** and make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-3',
						name: 'For the Queen!',
						cost: 2,
						type: FactoryLogic.type.createTrigger('The hivequeen is targeted by a strike for the second time on an attacker’s turn, whether by the attacker or another creature acting on the attacker’s turn.'),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Two soulraker minions appear within distance.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'A **soulraker praetorian** also appears within distance.'
							})

						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-9-feature-4',
					name: 'Cannibal Queen',
					description: 'At the end of their turn, the hivequeen can consume an adjacent soulraker demon to end one effect on them that can be ended by a saving throw (no action required).'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3rd-9-feature-5',
					name: 'Hive Soulsight',
					description: 'Any creature within 2 squares of a soulraker demon within 100 miles of the hivequeen can’t be hidden from the hivequeen. The hivequeen has line of effect to such creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3rd-9-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-7',
						name: 'Kicking the Nest',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each soulraker minion in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can move their speed and make a free strike. If no minions are present, four soulraker minions are summoned into unoccupied spaces within distance before the hivequeen uses this villain action.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-8',
						name: 'Buzz Off!',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: 'Push 3; I<3 dazed (save ends)',
								tier2: 'Push 3; I<4 dazed (save ends)',
								tier3: '11 sonic damage; push 3; I<5 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The hivequeen shifts up to her speed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3rd-9-feature-9',
						name: 'Bomber Wasp Warfare',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSpecial('Four 2 cubes within 10') ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 poison damage; M<3 bleeding (save ends)',
								tier2: '11 poison damage; M<4 bleeding (save ends)',
								tier3: '14 poison damage; M<5 bleeding (save ends)'
							}))
						]
					})
				})
			]
		})
	],
	addOns: []
};
