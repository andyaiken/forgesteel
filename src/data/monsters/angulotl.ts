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

export const angulotl: MonsterGroup = {
	id: 'monster-group-angulotl',
	name: 'Angulotl',
	description: `
*If you see one, try surrendering! Because you’re already surrounded.*
*-PINNA, HEDGE MAGE*

Found in freshwater swamps, rivers, and rainforests, angulotls (anggwaLAHtulls) are diminutive, brightly colored amphibious humanoids. Rather than defending their settlements and breeding grounds against hostile creatures, these poisonous frog folk prefer to establish their homes in places that are nigh-impossible for other humanoids to find, such as underwater caves and other enclosed spaces only accessible by water. They are happy to hide and watch a gaggle of noisy adventurers stumble past the entrance to an angulotl clutch without realizing it. Though angulotls prefer to avoid combat, when they’re threatened or pressed, they turn deadly.`,
	information: [
		{
			id: 'angulotl-info-1',
			name: 'Deadly Toxins',
			description: 'Angulotls are poisonous creatures, which suits their preference to avoid aggression—they don’t need to be! The contact toxin secreted by their skin gives them an edge in close combat; they also distill this toxin into more potent forms for coating blades and tipping darts.'
		},
		{
			id: 'angulotl-info-2',
			name: 'Indicator Species',
			description: 'Angulotl physiology is delicately balanced, and it doesn’t take much to upset it. While toxins don’t kill them, they are still affected by pollutants in their waters. Ongoing contamination of their environment can corrupt angulotls, making them aggressive, confused, and angry. Most pollution-corrupted angulotls eventually attack any creature who crosses their path—even other angulotls! Runoff from magical experimentation seems to affect them the most … and sometimes gives them strange abilities.'
		},
		{
			id: 'angulotl-info-3',
			name: 'Moisture Dependent',
			description: 'Angulotls breathe through their skin, but they need to stay damp or they suffocate. They often avoid travel in very dry areas, and they prefer not to stray far from a source of freshwater … unless it’s raining.'
		},
		{
			id: 'angulotl-info-4',
			name: 'Clawfish',
			description: 'Known as q’ukutxal (kooOOKootshaal) to angulotls, the clawfish resembles a moray eel with eight reptilian legs. These small beasts can slither through grass and clamber up trees nearly as well as they glide through river currents. Angulotls train them not only to pull rafts, but to cleverly fight by choking or electrocuting foes.'
		},
		{
			id: 'angulotl-info-5',
			name: 'Angulotl Languages',
			description: 'Most angulotls speak Filliaric.'
		},
		{
			id: 'angulotl-info-6',
			name: 'Wet',
			description: 'Angulotls make use of a unique condition called wet. While wet, angulotls don’t provoke opportunity attacks by moving. Meanwhile, wet non-angulotls that end their turn with 0 speed remaining slip and fall prone. Several angulotl abilities inflict wet, but a creature can also become wet by entering a body of water.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'angulotl-malice-1',
			name: 'Leapfrog',
			cost: 3,
			sections: [
				'Until the end of the round, when an angulotl moves through an ally’s space, that ally can jump 3 squares as a free triggered action.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'angulotl-malice-2',
			name: 'Resonating Croak',
			cost: 5,
			sections: [
				'Each angulotl puﬀs out their throat and starts loudly droning. All non-angulotls adjacent to an angulotl must make an **Intuition test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: '5 sonic damage; slowed (EoT)',
					tier2: '4 sonic damage',
					tier3: 'No effect'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'angulotl-malice-3',
			name: 'Rainfall',
			cost: 7,
			sections: [
				'An angulotl calls clouds to cover the battlemap and rain until the end of the round. All creatures and objects that are exposed to the sky are wet for the rest of the encounter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'angulotl-1',
			name: 'Clawfish',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Angulotl', 'Animal' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'swim, climb'),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -3, -2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-1-feature-1',
						name: 'Hookclaw',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage; grabbed'
						}),
						effect: 'A grabbed target takes 2 lightning damage at the start of each of their turns.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-1-feature-2',
					name: 'Shocking',
					description: 'The clawfish deals 2 lightning damage to each wet enemy within 2 at the start of each of the clawfish\'s turns.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-1-feature-3',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-2',
			name: 'Angulotl Cleaver',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'swim, climb'),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-2-feature-1',
						name: 'Hop & Chop',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'The cleaver jumps 4 squares before or after attacking.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-2-feature-2',
					name: 'Toxiferous',
					description: 'When an adjacent enemy grabs or uses a melee ability against the cleaver, they take 2 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-3',
			name: 'Angulotl Dart',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'swim, climb'),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Ranged distance +4',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-3-feature-1',
						name: 'Poison Dart',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 poison damage',
							tier3: '5 poison damage'
						}),
						effect: 'This ability has an edge on targets that don\'t have full Stamina.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-3-feature-2',
					name: 'Toxiferous',
					description: 'When an adjacent enemy grabs or uses a melee ability against the dart, they take 2 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-4',
			name: 'Angulotl Pollywog',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'swim, climb'),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -2, -2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-4-feature-1',
						name: 'Nip',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 poison damage; shift 1',
							tier3: '3 poison damage; shift 3'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-4-feature-2',
					name: 'Quick Snack',
					description: 'An angulotl that can reach the pollywog can eat them as a maneuver, regaining 4 Stamina and becoming wet (EoT) (see Wet).'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-4-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-5',
			name: 'Angulotl Needler',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Artillery),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'swim, climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-5-feature-1',
						name: 'Blowgun',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 poison damage',
							tier2: '6 poison damage',
							tier3: '7 poison damage'
						}),
						spend: [
							{ value: 2, effect: 'M<2 weakened (save ends). The target takes 2 poison damage at the start of each of their turns while they are weakened by this ability.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-5-feature-2',
						name: 'Camoufroge',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self (while hiding)',
						effect: 'The needler isn’t revealed after using their next action.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-5-feature-3',
					name: 'Toxiferous',
					description: 'When an adjacent enemy grabs or uses a melee ability against the needler, they take 3 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-6',
			name: 'Angulotl Slink',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Ambusher),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(7, 'swim, climb'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-6-feature-1',
						name: 'Blowgun',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(6) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage; pull 2',
							tier2: '6 damage; pull 4',
							tier3: '7 damage; pull 6'
						}),
						effect: 'The target is wet (save ends) (see Wet). Allies targeted by this ability take no damage and are pulled 6, ignoring stability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-6-feature-2',
						name: 'Hop To It',
						cost: 1,
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The slink jumps 3 squares. If the slink lands in cover or concealment, they can immediately hide.',
						spend: [
							{ value: 3, effect: 'The artifex can place a new trap in the encounter and instantly trigger it.' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-6-feature-3',
					name: 'Toxiferous',
					description: 'When an adjacent enemy grabs or uses a melee ability against the slink, they take 3 poison damage.'
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-6-feature-4',
					name: 'Adhesive',
					description: 'The slink excretes residue into their square at the end of each of their turns. A non-angulotl creature or object that enters or leaves the square must use a maneuver to withstand the adhesive or be restrained (EoT).'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-6-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-7',
			name: 'Angulotl Wave',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Controller),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'swim, climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-7-feature-1',
						name: 'Refulgent Beams',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 holy damage',
							tier2: '4 holy damage; R<1 illuminated (save ends)',
							tier3: '5 holy damage; R<2 illuminated (save ends)'
						}),
						effect: 'Illuminated creatures and objects can’t Hide or turn invisible, and strikes made against them have an edge until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-7-feature-2',
						name: 'Noxious Bubble',
						cost: 3,
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10, qualifier: 'unoccupied space' }) ],
						target: 'Special',
						preEffect: 'A bubble of toxic gas fills the area that lasts until the end of the encounter. If a creature or object touches the bubble, it bursts and each enemy within 3 makes a **Might test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Might,
							tier1: '5 poison damage; wet and weakened (save ends)',
							tier2: '4 poison damage; wet (EoT)',
							tier3: 'Wet (EoT)(see Wet)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-7-feature-3',
					name: 'Toxiferous',
					description: 'When an adjacent enemy grabs or uses a melee ability against the wave, they take 2 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-7-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-10',
			name: 'Angulotl Daybringer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'swim, climb'),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-1',
						name: 'Acid Grasp',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 acid damage; A<1 dazed (save ends)',
							tier2: '10 acid damage; A<2 dazed (save ends)',
							tier3: '13 acid damage; A<3 dazed (save ends)'
						}),
						effect: 'The next time the target strikes the daybringer, they immediately take 4 acid damage.',
						spend: [
							{ value: 1, effect: 'The daybringer jumps 3 squares before or after using this ability.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-2',
						name: 'Sun Lamp',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The daybringer expands their throat to resemble the sun until the start of their next turn. Each non-minion angulotl who starts their turn within 10 of the daybringer gains 5 temporary Stamina and has their Speed increased by 3 until the end of their turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-3',
						name: 'Tongue Slap',
						type: FactoryLogic.type.createTrigger('The target targets the daybringer or an ally with a strike that isn\'t a critical hit.'),
						distance: [ FactoryLogic.distance.createMelee(5) ],
						target: 'One creature',
						effect: 'The daybringer reduces the power roll result by 1 tier.',
						spend: [
							{ value: 2, effect: 'Pull 4.' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-8-feature-4',
					name: 'Moisturizing End Effect',
					description: 'The daybringer either takes 5 damage or removes the wet effect from an adjacent creature and ends one save ends effect affecting them at the end of their turn.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-5',
						name: 'New Dawn',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						effect: 'Ten **angulotl pollywogs** escape the daybringer\'s back and waddle into unoccupied squares within distance.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-6',
						name: 'Plague of Frogs',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 8 })
						],
						target: 'Self and all allies in the burst',
						effect: 'Each target jumps 4 and makes a free strike.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-7',
						name: 'It Is Day',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSpecial('') ],
						target: 'All enemies in the burst',
						effect: 'The encounter map dries up and becomes illuminated. Each wet enemy has the wet condition end and takes 6 acid damage. All angulotls have a double edge on their next attack.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-8-feature-8',
					name: 'Toxiferous',
					description: 'When an adjacent enemy grabs or uses a melee ability against the daybringer, they take 3 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-8-feature-9',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-9',
			name: 'Angulotl Hopper',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Harrier),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 13,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'swim, climb'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-9-feature-1',
						name: 'Leapfrog',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}),
						effect: 'Before or after attacking, the hopper jumps two squares, or four squares if they jump over their mentor\'s space.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-9-feature-2',
					name: 'Toxiferous',
					description: 'When an adjacent enemy grabs or uses a melee ability against the hopper, they take 3 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-9-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-9-retainer-4',
						name: 'Leaping Attack',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '5 damage; M (weak) prone',
							tier2: '9 damage; M (average) prone',
							tier3: '12 damage; M (strong) prone'
						}),
						effect: 'The hopper can jump in a straight line up to their speed before the attack without provoking opportunity attacks. If they jump at least 2 squares this way, they gain a surge.'
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-9-retainer-7',
						name: 'Three-Poison Dart',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '5 damage; M (weak) weakened (save ends)',
							tier2: '9 damage; M (average) slowed and weakened (save ends)',
							tier3: '12 damage; M (strong) dazed, slowed, and weakened (save ends)'
						})
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-9-retainer-10',
						name: 'Trip of the Tongue',
						type: FactoryLogic.type.createTrigger('A creature moves to a square within range.', { qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature',
						effect: 'The target is M (medium) prone. If they are knocked prone, their movement ends and until they stand up the next attack on them gains 2 surges.'
					})
				})
			}
		})
	],
	addOns: []
};
