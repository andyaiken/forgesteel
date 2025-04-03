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

export const devil: MonsterGroup = {
	id: 'monster-group-devil',
	name: 'Devil',
	description: 'In the lower plane of Hell, devils of the Seven Cities vie unceasingly against each other for power and control—a conflict fought foremostly through cunning and schemes. Devils are distinguished from other humanoids by skin in shades of azure and crimson and their hellmarks: horns, tails, hooves, wings, and other such infernal features.',
	information: [
		{
			id: 'devil-info-1',
			name: 'Precarious Pyramids',
			description: 'The Seven Cities are built on a strict hierarchy and bureaucracy. Draconian chains of command place each devil in service to a higher authority—typically a more powerful devil. While devils are lawful, they’re always looking for another way up the ladder. They twist every rule to their benefit to gain power and usurp those they answer to, eager to uncover loopholes in the eternal struggle for significance and supremacy.'
		},
		{
			id: 'devil-info-2',
			name: 'Silver Tongues',
			description: 'These winsome devils can acquire great influence by bargaining for the souls of mortals on behalf of their archdevil. Virtuosos with words, devils are skilled at striking deals and forging contracts. They exploit the weaknesses of mortals—greed, revenge, vanity—or just simple desperation. In the heat of battle, a devil’s supernatural charisma can influence a mortal to do their bidding, often without realizing until it’s too late.'
		},
		{
			id: 'devil-info-3',
			name: 'Negotiating With Devils',
			description: `
Devils are eager to negotiate and strike deals, but often require more compelling arguments and concrete evidence from the other party.

During a negotiation, an NPC devil has their impression and patience increased by 1. Their interest goes up to 10 instead of 5. When a devil is ready to make an offer, divide their interest by 2 to get their final response.

A devil typically never accepts an offer where they don’t get something in return. They are often motivated by greed, power, or legacy, while their pitfalls often involve benevolence, freedom, or protection.`
		},
		{
			id: 'devil-info-4',
			name: 'True Names',
			description: 'All devils have two names: one they’re commonly known by, and another secret true name. Every devil zealously safeguards the latter, as their true name can be spoken aloud to aid in summoning them or to strip them of their power.'
		},
		{
			id: 'devil-info-5',
			name: 'Hell\'s Defectors',
			description: `
Not every devil in the Seven Cities wants to ruthlessly ascend the hierarchy. Some others do desire advancement, but they remain dissatisfied at the bottom. As luck would have it, these fiends can free themselves from Hell’s bureaucracy—for when a mortal overestimates their fortitude and dies while enacting an infernal summoning, it can leave an enterprising devil stranded in the Mundane World.

Some of these defectors cling to old habits, acquiring power in mortal spheres of business, law, or politics. Others, inspired by mortals, join adventuring parties or set out to explore the world.`
		},
		{
			id: 'devil-info-6',
			name: 'Devil Languages',
			description: 'Most devils speak Anjal and Caelian, among other languages. The more powerful a devil, the more languages they tend to learn—to better make ironclad contracts with a wide variety of people and cultures. Outside of rare circumstances, devils are always willing to negotiate, ever desiring to twist a situation in their favor.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'devil-malice-1',
			name: 'Bureucratic Tape',
			cost: 3,
			sections: [
				'A devil acting on this turn uses a signature action against an adjacent creature. If they roll a tier-3 result, the target has a double bane on strikes (save ends).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'devil-malice-2',
			name: 'Underhanded Tactics',
			cost: 5,
			sections: [
				'Each devil in the encounter can teleport to a space adjacent ot another non-hidden creature in the encounter and make a free strike.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'devil-malice-3',
			name: 'Read the Small Print',
			cost: 7,
			sections: [
				'Each enemy in the encounter is subject to a bad deal proposed by the devils. An enemy must choose between damage weakness 5 or having a bane on power rolls. The bad deal lasts until the end of the encounter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'devil-1',
			name: 'Devil Clerk',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +2',
			characteristics: MonsterLogic.createCharacteristics(3, 0, 1, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-1-feature-1',
						name: 'Quill Pushing',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage; push 1',
							tier2: '6 damage; push 2',
							tier3: '7 damage; push 3'
						}),
						effect: 'A target adjacent ot 2 or more clerks is taunted (EoT).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-1-feature-2',
					name: 'True Name',
					description: 'If a creature within 10 squares of the clerk speaks the clerk\'s true name aloud, the clerk loses their fire immunity and the additional effects on their signature action.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-2',
			name: 'Devil Notary',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Ranged distance +5',
			characteristics: MonsterLogic.createCharacteristics(0, 1, 3, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-2-feature-1',
						name: 'Importunity',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 fire damage',
							tier2: '5 fire damage; R<2 target has a bane on their next strike',
							tier3: '6 fire damage; R<3 target has a bane on their next strike'
						}),
						effect: 'A non-minion devil within 5 has an edge on their next strike.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-2-feature-2',
					name: 'True Name',
					description: 'If a creature within 10 squares of the notary speaks the notary\'s true name aloud, the notary loses their fire immunity and the additional effects on their signature action.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-3',
			name: 'Devil Scrivener',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 9,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Speed +3',
			characteristics: MonsterLogic.createCharacteristics(0, 3, 1, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-3-feature-1',
						name: 'Litigation',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 corruption damage',
							tier2: '5 corruption damage; slowed (EoT)',
							tier3: '6 corruption damage; slowed (EoT)'
						}),
						effect: 'Shift 1.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-3-feature-2',
					name: 'True Name',
					description: 'If a creature within 10 squares of the scrivener speaks the scrivener\'s true name aloud, the scrivener loses their fire immunity and the additional effects on their signature action.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-4',
			name: 'Devil Jurist',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Artillery),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 120,
			stability: 0,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 1, 1, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-4-feature-1',
						name: 'Fire and Brimstone',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 fire damage',
							tier2: '15 fire damage; A<2 burning (save ends)',
							tier3: '18 fire damage; A<3 burning (save ends)'
						}),
						effect: 'A burning creature or object takes 1d6 fire damage at the start of each of their turns until the condition ends.',
						spend: [
							{ value: 1, repeatable: true, effect: 'The jurist can target one additional creature or object for each malice spent.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-4-feature-2',
						name: 'Dismissal with Prejudice',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 damage; slide 1',
							tier2: '10 damage; slide 3',
							tier3: '12 damage; slide 5'
						}),
						effect: 'M<2 the target slides an additional 3 squares.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-4-feature-3',
						name: 'Ashes to Ashes',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'One burning creature',
						effect: 'The target takes 6 fire damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-4-feature-4',
						name: 'Devilish Charm',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the jurist with a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Triggering creature',
						preEffect: 'The target makes a **Presence test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Presence,
							tier1: 'The jurist chooses a new target for the strike',
							tier2: 'The jurist halves the incoming damage',
							tier3: 'The target is dazed (EoT)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-4-feature-5',
					name: 'Hellfire',
					description: 'Fire damage dealt by the jurist ignores immunity.'
				}),
				FactoryLogic.feature.create({
					id: 'devil-4-feature-6',
					name: 'True Name',
					description: 'If a creature within 10 squares of the jurist speaks the jurist\'s true name aloud, the jurist loses their fire immunity, the additional effects on their signature action, and their Devilish Charm ability.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-4-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-5',
			name: 'Devil Legate',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Defender),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 160,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 1, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-5-feature-1',
						name: 'Infernal Pike',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '14 damage; A<2 slowed (save ends)',
							tier3: '17 damage; A<3 slowed (save ends)'
						}),
						effect: 'If the targets are adjacent to each other, the ability deals an additional 3 damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-5-feature-2',
						name: 'Writ of Execution',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 damage; M<1 prone',
							tier2: '11 damage; M<2 prone and can\'t stand (save ends)',
							tier3: '14 damage; M<3 prone and can\'t stand  (save ends)'
						}),
						effect: 'If the legate charges while using this ability, they ignore difficult terrain and target each creature and object they move through with the power roll (but not its additional effects).'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-5-feature-3',
						name: 'Law and Order',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature',
						effect: 'The target is taunted by the legate (save ends). The legate can only have one creature taunted at a time.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-5-feature-4',
						name: 'Devilish Charm',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the legate with a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Triggering creature',
						preEffect: 'The target makes a **Presence test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Presence,
							tier1: 'The legate chooses a new target for the strike',
							tier2: 'The legate halves the incoming damage',
							tier3: 'The target is dazed (EoT)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-5-feature-5',
					name: 'Hellish Bailiff',
					description: 'The legate has damage immunity 3 while in one of the nine Hells or within 10 squares of a non-minion devil that is a higher level than them.'
				}),
				FactoryLogic.feature.create({
					id: 'devil-5-feature-6',
					name: 'True Name',
					description: 'If a creature within 10 squares of the legate speaks the legate\'s true name aloud, the legate loses their fire immunity, the additional effects on their signature action, and their Devilish Charm ability.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-5-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-6',
			name: 'Devil Adjudicator',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 140,
			stability: 1,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 2, 1, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-6-feature-1',
						name: 'Infernal Injunction',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 fire damage; I<1 frightened (save ends)',
							tier2: '15 fire damage; I<2 frightened (save ends)',
							tier3: '18 fire damage; I<3 frightened (save ends)'
						}),
						effect: 'The adjudicator can slide a target frightened by this ability 2 squares.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-6-feature-2',
						name: 'Adjudicator\'s Interdiction',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						preEffect: 'The target makes a **Presence test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Presence,
							tier1: 'Slowed, bane on power rolls, can\'t regain Stamina (save ends)',
							tier2: 'Slowed, bane on power rolls (save ends)',
							tier3: 'Slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-6-feature-3',
						name: 'Quid Pro Quo',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally or one frightened creature',
						effect: 'The adjudicator switches places with the target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-6-feature-4',
						name: 'Devilish Charm',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the adjudicator with a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Triggering creature',
						preEffect: 'The target makes a **Presence test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Presence,
							tier1: 'The adjudicator chooses a new target for the strike',
							tier2: 'The adjudicator halves the incoming damage',
							tier3: 'The target is dazed (EoT)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-6-feature-5',
					name: 'Vexatious Litigation',
					description: 'A creature has -2 on saving throws while within 10 of the adjudicator if their Presence score is lower than the adjudicator’s.'
				}),
				FactoryLogic.feature.create({
					id: 'devil-6-feature-6',
					name: 'True Name',
					description: 'If a creature within 10 squares of the adjudicator speaks the adjudicator\'s true name aloud, the adjudicator loses their fire immunity, the additional effects on their signature action, and their Devilish Charm ability.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-6-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-7',
			name: 'Devil Magistrate',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Harrier),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 160,
			stability: 0,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-7-feature-1',
						name: 'Edge of the Law',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 damage',
							tier2: '15 damage',
							tier3: '18 damage; R<3 dazed (save ends)'
						}),
						effect: 'The magistrate can shift up to 3 squares before or after using this ability, or between targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-7-feature-2',
						name: 'Verdict',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '11 damage',
							tier2: '17 damage',
							tier3: '21 damage'
						}),
						effect: 'This ability has a double edge if the magistrate was hidden before using this ability and deals an additional 5 damage if the target is dazed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-7-feature-3',
						name: 'Justice Turns Its Gaze',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The magistrate becomes hidden, even if they are being observed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-7-feature-4',
						name: 'Devilish Charm',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the magistrate with a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Triggering creature',
						preEffect: 'The target makes a **Presence test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Presence,
							tier1: 'The magistrate chooses a new target for the strike',
							tier2: 'The magistrate halves the incoming damage',
							tier3: 'The target is dazed (EoT)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-7-feature-5',
					name: 'Leading',
					description: 'If the magistrate moves away from an enemy who is adjacent to one of the magistrate’s allies, the movement is considered shifting.'
				}),
				FactoryLogic.feature.create({
					id: 'devil-7-feature-6',
					name: 'True Name',
					description: 'If a creature within 10 squares of the magistrate speaks the magistrate\'s true name aloud, the magistrate loses their fire immunity, the additional effects on their signature action, and their Devilish Charm ability.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-7-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-8',
			name: 'Archdevil',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 181,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 2, 1, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-1',
						name: 'Infernal Decree',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'Three creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '10 damage; R<2 the target can\'t hide (save ends)',
							tier2: '15 damage; R<3 the target can\'t hide (save ends)',
							tier3: '19 damage; R<4 the target can\'t hide(save ends)'
						}),
						spend: [
							{ value: 2, effect: 'Each devil has an edge to strike a target that can\'t hide.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-2',
						name: 'Compel the Jury',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'Two creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'I<2 charmed (save ends)',
							tier2: 'I<3 charmed (save ends)',
							tier3: 'I<4 charmed (save ends)'
						}),
						effect: 'Until the condition ends, a charmed creature considers the archdevil an ally, and the archdevil can spend 1 malice on their turn to force move a charmed creature up to 3 squares.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-3',
						name: 'Devilish Suggestion',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the archdevil with a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Triggering creature',
						preEffect: 'The target makes a **Presence test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Presence,
							tier1: 'Charmed (save ends) (see Compel the Jury)',
							tier2: 'The magistrate chooses a new target for the strike',
							tier3: 'The magistrate halves the incoming damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-8-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the archdevil can take 10 damage to end one save ends eﬀect aﬀecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'devil-8-feature-5',
					name: 'True Name',
					description: 'If a creature within 10 squares of the archdevil speaks the archdevil\'s true name aloud, the archdevil loses their fire immunity, the additional effects on their signature action, and their Devilish Suggestion ability.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-8-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 8 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-7',
						name: 'Welcome, Friends',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						preEffect: 'Each target makes a **Presence test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Presence,
							tier1: '15 psychic damage; charmed (save ends)',
							tier2: '12 psychic damage; charmed (save ends)',
							tier3: '7 psychic damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-8',
						name: 'Heed My Commands!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 })
						],
						target: 'Self and all allies in the burst',
						effect: 'Each target shifts up to their speed. The archdevil can force move each charmed creature up to half their speed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-9',
						name: 'Deceptive Strategem',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: '1 ally or charmed creature',
						effect: 'The archdevil swaps places with the target. Then, each ally and charmed creature within 12 of the archdevil make a free strike against a target of the archdevil’s choice.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-9',
			name: 'Devil Defector',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Hexer),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 23,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 3, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-9-feature-1',
						name: 'Corrupting Flame',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 fire or corruption damage',
							tier2: '10 fire or corruption damage',
							tier3: '13 fire or corruption damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-9-retainer-2',
						name: 'Tempting Offer',
						type: FactoryLogic.type.createTrigger('A sapient enemy is reduced to 0 Stamina.', { free: true, qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Triggering creature',
						effect: 'If the creature takes the defector’s offer, the creature is reduced to 1 Stamina instead of 0. If they do so, on their next turn the defector controls the creature’s move action, and the creature must use a Signature Action against a creature of the defector’s choice or immediately die. The Director must spend 3 Malice to have the creature turn down this offer.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-9-feature-3',
					name: 'True Name',
					description: 'If a creature within 10 squares of the defector speaks the defector’s true name aloud, the defector loses their immunities, the additional effects on their signature attack, and their Tempting Offer triggered action.'
				})
			],
			retainer: {
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-9-retainer-7',
						name: 'Flames of Revenge',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 corruption damage',
							tier2: '10 corruption damage',
							tier3: '14 corruption damage'
						}),
						effect: 'If the defector’s mentor is in the area, they burn with harmless flame until the end of the defector’s next turn. While this fire burns, the mentor has fire immunity 10 and any creature that hits the mentor takes 10 fire damage.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-9-retainer-10',
						name: 'Hell On Earch',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: '-',
						effect: 'The area burns with infernal fire until the end of the devil’s next turn. An enemy of the defector that ends their turn in the area takes 10 fire damage and is P (medium) frightened (save ends).'
					})
				})
			}
		})
	],
	addOns: []
};
