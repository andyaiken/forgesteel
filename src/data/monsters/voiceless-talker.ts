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

export const voicelessTalker: MonsterGroup = {
	id: 'monster-group-voiceless-talker',
	name: 'Voiceless Talker',
	description: 'Among the most powerful psions in the timescape, synlirii (singular: synliroi) are known as the “voiceless talkers” to the denizens of the World Below–and to surface dwellers unfortunate enough to encounter them. Descended from boneless aquatic cephalopods, they are alien in thought and motivation to the humanoid species they loathe. Synlirii consider the “barking ones” (their label for creatures who squeeze air through meat flaps to communicate) to be an abomination that must be corrected.',
	information: [
		{
			id: 'voiceless-talker-info-1',
			name: 'Uneasy Alliances',
			description: 'Though synlirii and overminds are hereditary enemies, their mutual obsession with the barking ones often leads to uneasy alliances. Both synlirii and overminds employ humanoids from the World Below as agents, trading lore and technology for information on their surface foes.'
		},
		{
			id: 'voiceless-talker-info-2',
			name: 'Olothec Hatred',
			description: 'The synlirii’s visceral antipathy toward the barking ones is surpassed only by their deep enmity toward (and fear of) olothec. Ancient myths say this is a harmless fable. But synlirii, who style themselves as the future masters of the timescape, rage against implications that their powers come from any source other than their own superior development.'
		},
		{
			id: 'voiceless-talker-info-3',
			name: 'Psionic Spies',
			description: 'Despite their mental powers, voiceless talkers consider information their greatest weapon. They use their psionic talents to manipulate memory and perception, obscure their forms, and pass undetected among other cultures.'
		},
		{
			id: 'voiceless-talker-info-4',
			name: 'Psi-Tech',
			description: 'Synlirii breed mollusks that secrete plastic-like substances, using them to fashion weapons and similar technology powered by psionic crystals. The voiceless talkers’ handheld psi-pistols and portable psi-rifles can be used only by their alien minds.'
		},
		{
			id: 'voiceless-talker-info-5',
			name: 'Creature Engineers',
			description: 'Synlirii are obsessed with manipulating the natural development of other organisms. They create hulking brains, mindkillers, and other servants using a psionic technique they call the Interlace. Many synlirii experiments don’t live long and aren’t intended to. But the World Below is littered with unnatural creatures who escaped the voiceless talkers’ body banks—most of them singular life forms that can’t reproduce and may never die.'
		},
		{
			id: 'voiceless-talker-info-6',
			name: 'Graywarpers',
			description: 'Graywarpers are voiceless talkers who were drained of most of their psionic abilities—and free will—as punishment for insolence or incompetence. They are viewed solely as expendable tools who enhance the power of other voiceless talkers.'
		},
		{
			id: 'voiceless-talker-info-7',
			name: 'Hulking Brain',
			description: 'The voiceless talkers have engineered pearlescent-skinned, humanoid-shaped aberrations with four massive arms and—in place of a head—a large pulsing brain. Called thylinça by voiceless talkers and hulking brains by everyone else, these creatures serve as bodyguards and psionic batteries for their synlirii creators.'
		},
		{
			id: 'voiceless-talker-info-8',
			name: 'Mindkiller',
			description: `
Floating clawed brains with a trailing spinal column and nerves, mindkillers serve as the voiceless talkers’ pets and lackeys. These amorphous parasites can force themselves into a humanoid’s body through the ear, eye, or nose, then devour the victim’s central nervous system while replacing it with their own tissue. When the process is complete, the mindkiller gains all the victim’s knowledge and memories and can puppet the body, becoming the perfect spy for the mindkiller’s synlirii overlords.

Mindkiller whelps are a lesser form of mindkiller that can be created in a fraction of the time. While they can’t inhabit bodies, their mere presence weakens their foes’ mental defenses against psionics`
		},
		{
			id: 'voiceless-talker-info-9',
			name: 'Voiceless Talker Languages',
			description: 'Most voiceless talkers communicate telepathically using Mindspeech and Variac.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'voiceless-talker-malice-1',
			name: 'Guise',
			cost: 3,
			sections: [
				'A non-minion voiceless talker projects a psionic image over their body, making them unable to be identiﬁed as an enemy until the end of their next turn.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'voiceless-talker-malice-2',
				name: 'Memory Thief',
				type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Non-minion' ] }),
				cost: 5,
				keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.createRanged(5) ],
				target: 'One creature',
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 3,
					tier1: '6 psychic damage; R<1 target cannot identify allies as allies (save ends)',
					tier2: '10 psychic damage; R<2 target identifies allies as enemies (save ends)',
					tier3: '13 psychic damage; R<3 target identifies allies as enemies (save ends)'
				})
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'voiceless-talker-malice-3',
			name: 'Evolutionary Circuit',
			cost: 7,
			sections: [
				'The voiceless talkers link their minds, creating a circuit that empowers them while at least two voiceless talkers remain. While this circuit is active, all psionic strikes deal an additional 5 damage. Additionally, when a voiceless talker takes damage, they may use a free triggered action to swap places with any minion on the map. The minion takes the damage instead.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'voiceless-talker-1',
			name: 'Voiceless Talker Graywarper',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 9,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '2 temporary Stamina',
			characteristics: MonsterLogic.createCharacteristics(-1, 0, 3, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-1-feature-1',
						name: 'Phase Chant',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 psychic damage',
							tier2: '5 psychic damage; slide 2',
							tier3: '7 psychic damage; slide 4'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-1-feature-5',
					name: 'Psionic Conductor',
					description: 'When a non-minion Voiceless Talker within 5 of the graywwarper uses an ability with the Psionic keyword, they can do so as if they were in the graywarper\'s space.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'voiceless-talker-2',
			name: 'Mindkiller Whelp',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(4, 'fly, hover'),
			stamina: 9,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +2',
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 1, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-2-feature-1',
						name: 'Eager Claws',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '5 damage; target has a bane on their next strike',
							tier3: '7 damage; target has a bane on their next strike'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-2-feature-2',
						name: 'Feast',
						type: FactoryLogic.type.createTrigger('The whelp kills a creature'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The whelp transforms into a **mindkiller**. They have Stamina equal to their squad\'s Stmina pool before transforming.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-1-feature-5',
					name: 'Psionic Conductor',
					description: 'When a non-minion Voiceless Talker within 5 of the whelp uses an ability with the Psionic keyword, they can do so as if they were in the whelp\'s space.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'voiceless-talker-3',
			name: 'Hulking Brain',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 180,
			stability: 4,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -2, -2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-3-feature-1',
						name: 'Four-Way Grasp',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Four creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 damage',
							tier2: '10 damage; A<2 grabbed',
							tier3: '11 damage; A<3 grabbed'
						}),
						spend: [
							{ value: 2, effect: 'The potency of this ability increases by 1.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-3-feature-2',
						name: 'Cerebral Suplex',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'All grabbed enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 damage; M<1 3 damage',
							tier2: '10 damage; M<2 3 damage',
							tier3: '13 damage; M<3 6 damage'
						}),
						effect: 'Each target is no longer grabbed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-3-feature-3',
						name: 'Lumber',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Shift 4. This movement ignores difficult terrain.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-3-feature-4',
						name: 'Brawny Buffer',
						cost: 1,
						type: FactoryLogic.type.createTrigger('An ally voiceless talker takes damage from an enemy.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Self',
						effect: 'The hulking brain shifts to a square adjacent to the ally and takes the damage instead.',
						spend: [
							{ value: 2, effect: 'The enemy that dealt damage is knocked prone.' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-3-feature-5',
					name: 'Biceps to Spare',
					description: 'The hulking brain can carry up to 4 size 1 grabbed creatures at no penalty to their movement.'
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-3-feature-6',
					name: 'Psionic Conductor',
					description: 'When a non-minion Voiceless Talker within 5 of the hulking brain uses an ability with the Psionic keyword, they can do so as if they were in the hulking brain\'s space.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'voiceless-talker-4',
			name: 'Mindkiller',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Hexer),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly, hover'),
			stamina: 140,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 2, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-4-feature-1',
						name: 'Killer Claws',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '11 damage',
							tier2: '17 damage; A<2 grabbed',
							tier3: '21 damage; A<3 grabbed'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-4-feature-2',
						name: 'Concealing Strike',
						cost: 2,
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Two creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 damage; R<1 the mindkiller is invisible to the target (save ends)',
							tier2: '15 damage; R<2 the mindkiller is invisible to the target (save ends)',
							tier3: '18 damage; R<3 the mindkiller is invisible to the target (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-4-feature-3',
						name: 'Mindwipe',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One grabbed creature',
						effect: 'R<2 The mindkiller drains one point from the target’s Reason, Intuition, or Presence score (Director’s choice) and adds it to their own score until the end of the encounter.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-4-feature-4',
						name: 'Meat Shield',
						type: FactoryLogic.type.createTrigger('The mindkiller takes damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'One grabbed creature',
						effect: 'The mindkiller halves the incoming damage. The target takes the other half of the damage.',
						spend: [
							{ value: 3, effect: 'The target takes the full damage in place of the mindkiller.' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-4-feature-5',
					name: 'Psionic Conductor',
					description: 'When a non-minion Voiceless Talker within 5 of the mindkiller uses an ability with the Psionic keyword, they can do so as if they were in the mindkiller\'s space.'
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-4-feature-6',
					name: 'Nimble',
					description: 'The mindkiller can move through other creatures and objects at normal speed.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'voiceless-talker-4-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'voiceless-talker-5',
			name: 'Voiceless Talker Artillerist',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Artillery),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'teleport, hover'),
			stamina: 140,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(0, 3, 1, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-5-feature-1',
						name: 'Psionic Rifle Burst',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '11 damage',
							tier2: '19 damage; spread 1',
							tier3: '22 damage; spread 2'
						}),
						effect: 'The blast hits nearby targets, dealing 3 damage to each enemy within a number of squares of the target equal to the result’s spread value.',
						spend: [
							{ value: 2, effect: ' The attack deals an additional 3 damage to each enemy within the spread distance' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-5-feature-2',
						name: 'Mind Jolt',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 10, within: 10 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 lightning damage',
							tier2: '10 lightning damage; I<2 slowed (save ends)',
							tier3: '13 lightning damage; I<3 slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-5-feature-3',
						name: 'In Our Sights',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						effect: 'The next power roll with the psionic keyword made against the target will automatically be a 17 until the start of the artillerist’s next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-5-feature-4',
						name: 'Tactical Reposition',
						cost: 1,
						type: FactoryLogic.type.createTrigger('The artillerist takes damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: ' The artillerist teleports 5 and doesn’t suffer any additional effects associated with the damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-5-feature-5',
					name: 'Psionic Conductor',
					description: 'When a non-minion Voiceless Talker within 5 of the artillerist uses an ability with the Psionic keyword, they can do so as if they were in the artillerist\'s space.'
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-5-feature-6',
					name: 'Locked On',
					description: 'The artillerist ignores invisibility, cover, and concealment. A creature can’t hide from the artillerist while the artillerist has line of eﬀect to them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'voiceless-talker-5-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'voiceless-talker-6',
			name: 'Voiceless Talker Invader',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Controller),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'teleport, hover'),
			stamina: 140,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 3, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-6-feature-1',
						name: 'Tentacle',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creature or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 damage',
							tier2: '15 damage; M<2 grabbed',
							tier3: '18 damage; M<3 grabbed'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-6-feature-2',
						name: 'Psionic Boom',
						cost: 3,
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 psychic damage, R<1 push 2',
							tier2: '10 psychic damage, R<2 push 3',
							tier3: '12 psychic damage, R<3 push 4 and prone'
						}),
						spend: [
							{ value: 2, effect: 'The area of the burst increases to 5.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-6-feature-3',
						name: 'Tentacle Toss',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One grabbed creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 damage; vertical slide 2',
							tier2: '10 damage; vertical slide 3',
							tier3: '12 damage; vertical slide 5'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-6-feature-4',
						name: 'Brain Drain',
						type: FactoryLogic.type.createTrigger('The target resists an ability\'s effect.'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature grabbed by the invader',
						effect: 'The potency of the effect increases by 2.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-6-feature-5',
					name: 'Psionic Amplifier',
					description: 'When a non-minion Voiceless Talker within 5 of the invader uses an ability with the Psionic keyword, they can do so with a double edge as if they were in the invader\'s space.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'voiceless-talker-6-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 6 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'voiceless-talker-7',
			name: 'Voiceless Talker Evolutionist',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'teleport, hover'),
			stamina: 180,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(0, 3, 4, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-7-feature-1',
						name: 'Psionic Intrusion',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 psychic damage; R<2 slowed (save ends)',
							tier2: '16 psychic damage; R<3 slowed (save ends)',
							tier3: '19 psychic damage; R<4 slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-7-feature-2',
						name: 'Carpe Quadratum',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The evolutionist teleports, swapping places with one creature within 5.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-7-feature-3',
						name: 'Adapability',
						type: FactoryLogic.type.createTrigger('The evolutionist takes typed damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The evolutionist gains immunity 5 to the triggering type of damage until the start of their next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-7-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the evolutionist can take 10 damage to end one save ends effect affecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'voiceless-talker-7-feature-5',
					name: 'Witness Evolutionary Superiority',
					description: 'The evolutionist has the ﬁrst listed trait of every minion in their squad.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'voiceless-talker-7-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 8 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-7-feature-8',
						name: 'Show Me Who You Are',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies',
						preEffect: 'Each target must make a **Intuition test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Intuition,
							tier1: 'Target uses a Signature action against the nearest enemy within distance.',
							tier2: 'Target makes a Free Strike against the nearest enemy within distance.',
							tier3: 'Frightened (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-7-feature-9',
						name: 'Release the Tralls',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Special',
						effect: 'The evolutionist teleports 3 minions of level 4 or lower into unoccupied squares within distance. All three minions can be from any monster type but must share the same name.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'voiceless-talker-7-feature-10',
						name: 'Brainstorm',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '7 lightning damage',
							tier2: '12 lightning damage',
							tier3: '15 lightning damage'
						}),
						effect: 'The evolutionist is surrounded by a psionic electrical storm until the end of the encounter. The area within 5 of them is considered difficult terrain for enemies. An enemy who enters an affected square for the first time on their turn or starts their turn in it takes 8 lightning damage.'
					})
				})
			]
		})
	],
	addOns: []
};
