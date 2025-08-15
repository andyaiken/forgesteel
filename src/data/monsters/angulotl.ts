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
	description: `Found in freshwater swamps, rivers, and rainforests, angulotls (angwa-LAH-tuls) are diminutive, brightly colored amphibious humanoids. Rather than defending their settlements and breeding grounds against hostile creatures, these poisonous frog folk prefer to establish their homes in places that are nigh-impossible for other humanoids to find, such as underwater caves and other enclosed spaces accessible only by water. Angulotls are happy to hide and watch a gaggle of noisy adventurers stumble past the entrance to their clutch without realizing it. But though they prefer to avoid combat, whenever they’re threatened or pressed, angulotls can turn deadly.
	
*They like humans! Adults tend to freak them out a little. I don’t think they realize tall humans are the same species as tiny humans!* 
Pinna, Hedge Witch, Gravesford`,
	picture: null,
	information: [
		{
			id: 'angulotl-info-1',
			name: 'Deadly Toxins',
			description: 'Angulotls are poisonous creatures, which suits their preference to avoid aggression—because they don’t need it! The contact toxin secreted by their skin gives them an edge in close combat, and they also distill this toxin into more potent forms for coating blades and tipping darts.'
		},
		{
			id: 'angulotl-info-2',
			name: 'Indicator Species',
			description: 'Angulotl physiology is delicately balanced, and it doesn’t take much to upset that balance. While toxins don’t kill them, they are still affected by pollutants in their waters. Ongoing contamination of their environment can corrupt angulotls, making them aggressive, confused, and angry. Most pollution-corrupted angulotls eventually attack any creature who crosses their path—even other angulotls! Runoff from magical experimentation seems to affect them the most—and sometimes grants them strange abilities.'
		},
		{
			id: 'angulotl-info-3',
			name: 'Moisture Dependent',
			description: 'Angulotls breathe through their skin, so they need to stay damp or they suffocate. They often avoid travel in dry areas, and they prefer not to stray far from sources of freshwater unless it’s raining'
		},
		{
			id: 'angulotl-info-4',
			name: 'Clawfish',
			description: 'Known as q’ukutxal (koo-OOK-oot-shaal) to angulotls, the clawfish resembles a moray eel with eight reptilian legs. These small animals can slither through grass and clamber up trees nearly as well as they glide through river currents. Angulotls train them not only to pull rafts, but to cleverly fight by grabbing and electrocuting foes.'
		},
		{
			id: 'angulotl-info-5',
			name: 'Angulotl Languages',
			description: 'Most angulotls speak Filliaric.'
		},
		{
			id: 'angulotl-info-6',
			name: 'Wet',
			description: 'Angulotls make use of a unique effect called “wet.” While wet, an angulotl doesn’t provoke opportunity attacks by moving. At the same time, any non-angulotl who is wet and ends their turn with none of their movement remaining slips and falls prone. Several angulotl abilities can impose this effect, but a creature in an encounter featuring angulotls can also become wet by entering water, as the Director determines.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'angulotl-malice-1',
			name: 'Leapfrog',
			cost: 3,
			sections: [
				'Until the end of the round, when an angulotl moves through an inactive angulotl’s space, the inactive angulotl can use a free triggered action to jump 3 squares.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'angulotl-malice-2',
			name: 'Resonating Croak',
			cost: 5,
			sections: [
				'Each angulotl in the encounter puffs out their throat and starts loudly droning Any non-angulotl adjacent to an angulotl makes an **Intuition test**.',
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
				'An angulotl calls clouds to cover the encounter map and unleash rain until the end of the round. Any creature or object that is exposed to the sky is wet until the end of the encounter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'angulotl-1',
			name: 'Angulotl Cleaver',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'swim, climb'),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+1 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-1-feature-1',
						name: 'Hop and Chop',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '2 damage',
									tier2: '4 damage',
									tier3: '5 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** The cleaver jumps up to 4 squares before or after making this strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-1-feature-2',
					name: 'Toxiferous',
					description: 'Whenever an adjacent enemy grabs the cleaver or uses a melee ability against them, that enemy takes 1 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-2',
			name: 'Angulotl Pollywog',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'swim, climb'),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -2, -2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-2-feature-1',
						name: 'Nip',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '1 damage',
									tier2: '2 poison damage; the pollywog can shift 1 square',
									tier3: '3 poison damage; the pollywog can shift up to 3 squares'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-2-feature-2',
					name: 'Quick Snack',
					description: 'Any angulotl who can target the pollywog with a melee free strike can eat them as a maneuver. The angulotl regains 4 Stamina and is wet until the end of their next turn.'
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
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'swim, climb'),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+4 bonus to ranged distance',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-3-feature-1',
						name: 'Poison Dart',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '2 damage',
									tier2: '4 poison damage',
									tier3: '5 poison damage'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** The dart gains an edge on this ability against any target who has less than full Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-3-feature-2',
					name: 'Toxiferous',
					description: 'Whenever an adjacent enemy grabs the dart or uses a melee ability against them, that enemy takes 1 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-4',
			name: 'Clawfish',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Angulotl', 'Animal' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'swim, climb'),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -3, -2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-4-feature-1',
						name: 'Hookclaw',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '2 damage',
									tier2: '4 damage',
									tier3: '5 damage; grabbed'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** Any target grabbed this way takes 2 lightning damage at the start of each of their turns.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-4-feature-2',
					name: 'Shocking',
					description: 'At the start of each of their turns, the clawfish deals 2 lightning damage to each wet enemy within 2 squares.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-4-feature-3',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-5',
			name: 'Angulotl Needler',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 poison damage',
								tier2: '6 poison damage',
								tier3: '7 poison damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice:',
								value: 2,
								effect: 'A target who has <code>M < 2</code> is weakened (save ends). A target weakened this way takes 2 poison damage at the start of each of their turns.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-5-feature-2',
					name: 'Toxiferous',
					description: 'Whenever an adjacent enemy grabs the needler or uses a melee ability against them, that enemy takes 2 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-5-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-6',
			name: 'Angulotl Slink',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'swim, climb'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-6-feature-1',
						name: 'Tonguelash',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(6) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '4 damage; pull 2',
									tier2: '6 damage; pull 4',
									tier3: '7 damage; pull 6'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** The target is wet (save ends). Any ally targeted by this ability ignores the damage, is wet until the end of the encounter, and is pulled up to 6 squares, ignoring stability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-6-feature-2',
						name: 'Hop To It',
						cost: 2,
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The slink jumps up to 3 squares. If they have cover or concealment when they land, they can attempt to hide.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-6-feature-3',
					name: 'Toxiferous',
					description: 'Whenever an adjacent enemy grabs the slink or uses a melee ability against them, that enemy takes 2 poison damage.'
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-6-feature-4',
					name: 'Adhesive',
					description: 'The slink excretes a sticky residue into their square at the end of each of their turns. Any non-angulotl who enters or leaves the square is stuck, and must use a maneuver to break free or be restrained until the end of their turn. Objects are likewise affected, and a creature must use a maneuver to remove an object from the square.'
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '3 holy damage',
									tier2: '4 holy damage; R < 1 illuminated (save ends)',
									tier3: '5 holy damage; R < 2 illuminated (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** An illuminated creature or object can’t hide or become invisible, and any strike made against an illuminated target gains an edge.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-7-feature-2',
						name: 'Noxious Bubble',
						cost: 2,
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 10, qualifier: 'unoccupied space' }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** A bubble of toxic gas fills the area, ready to pop. If any creature or object touches the bubble or if the bubble takes damage, it bursts. Each angulotl adjacent to the bubble is wet until the end of the encounter, and each enemy adjacent to the bubble makes a **Might test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Might,
									tier1: '3 poison damage; the target is wet and weakened (save ends)',
									tier2: '2 poison damage; the target is wet (save ends)',
									tier3: '1 poison damage; the target is wet (EoT)'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-7-feature-3',
					name: 'Toxiferous',
					description: 'Whenever an adjacent enemy grabs the wave or uses a melee ability against them, that enemy takes 2 poison damage.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'angulotl-7-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'angulotl-8',
			name: 'Angulotl Daybringer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Angulotl', 'Humanoid' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb, swim'),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-1',
						name: 'Acid Grasp',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '7 acid damage; A < 1 dazed (save ends)',
									tier2: '10 acid damage; A < 2 dazed (save ends)',
									tier3: '13 acid damage; A < 3 dazed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** The next time the target makes a strike against the daybringer, the target takes 4 acid damage after the strike is resolved.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The daybringer jumps up to 3 squares before or after using this ability.'
							})
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
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The daybringer expands their throat to make it resemble the sun until the start of their next turn. During that time, each angulotl who starts their turn within 10 squares of the daybringer regains 5 Stamina and gains a +3 bonus to speed until the end of their turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-3',
						name: 'Tongue Slap',
						type: FactoryLogic.type.createTrigger('The target makes a strike against the daybringer or an ally that isn’t a critical hit.'),
						distance: [ FactoryLogic.distance.createMelee(5) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The outcome of the strike’s power roll is reduced by one tier'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The target is pulled up to 4 squares after the strike resolves.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-8-feature-4',
					name: 'Moisturizing End Effect',
					description: 'At the end of each of the daybringer’s turns, they can either take 5 damage or end the wet effect on an adjacent creature in order to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-5',
						name: 'New Dawn',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Four **angulotl pollywogs** erupt from the daybringer’s back and waddle into unoccupied spaces within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-6',
						name: 'Plague of Frogs',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 8 })
						],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target can jump up to 4 squares. Each non-minion target can make a free strike at the end of the jump.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-8-feature-7',
						name: 'It Is Day',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [],
						distance: [ FactoryLogic.distance.createSpecial('') ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The encounter map dries up and each enemy and object on it is illuminated until the end of the encounter. An illuminated creature or object can’t hide or become invisible, and any strike made against an illuminated target gains an edge. Additionally, each enemy in the encounter who is wet has that effect end and takes 6 acid damage. Each angulotl in the encounter has a double edge on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'angulotl-8-feature-8',
					name: 'Toxiferous',
					description: 'Whenever an adjacent enemy grabs the daybringer or uses a melee ability against them, that enemy takes 3 poison damage.'
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '3 damage',
									tier2: '5 damage',
									tier3: '7 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('Before or after attacking, the hopper jumps two squares, or four squares if they jump over their mentor\'s space.')
						]
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '5 damage; M (weak) prone',
									tier2: '9 damage; M (average) prone',
									tier3: '12 damage; M (strong) prone'
								})
							),
							FactoryLogic.createAbilitySectionText('The hopper can jump in a straight line up to their speed before the attack without provoking opportunity attacks. If they jump at least 2 squares this way, they gain a surge.')
						]
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'angulotl-9-retainer-7',
						name: 'Three-Poison Dart',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '5 damage; M (weak) weakened (save ends)',
									tier2: '9 damage; M (average) slowed and weakened (save ends)',
									tier3: '12 damage; M (strong) dazed, slowed, and weakened (save ends)'
								})
							)
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The target is M (medium) prone. If they are knocked prone, their movement ends and until they stand up the next attack on them gains 2 surges.')
						]
					})
				})
			}
		})
	],
	addOns: []
};
