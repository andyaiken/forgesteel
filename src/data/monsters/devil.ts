import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { StatBlockIcon } from '../../enums/stat-block-icon';

export const devil: MonsterGroup = {
	id: 'monster-group-devil',
	name: 'Devil',
	description: 'In the lower plane of Hell, devils of the Seven Cities vie unceasingly for power and control—a conflict fought foremostly through cunning and schemes. Devils are distinguished from other humanoids by skin in shades of azure and crimson, as well as their hellmarks: horns, tails, hooves, wings, and other infernal features.',
	picture: null,
	information: [
		{
			id: 'devil-info-1',
			name: 'Precarious Pyramids',
			description: 'The Seven Cities of Hell stand atop strict hierarchy and bureaucracy. Primordial chains of command place each devil in service to a more powerful devil, with the seven archdevil rulers of Hell at the top. While devils are lawful, they’re always looking for another way up the ladder. They twist every rule to their benefit to gain power and usurp those they answer to, eager to uncover loopholes in the eternal struggle for significance and supremacy.'
		},
		{
			id: 'devil-info-2',
			name: 'Silver Tongues',
			description: 'Winsome devils can acquire significant influence by bargaining for the souls of mortals on behalf of the archdevil they ultimately serve. Virtuosos with words, devils are skilled at striking deals and forging contracts. They exploit the weaknesses of mortals, whether greed, revenge, vanity, or simple desperation. In the heat of battle, a devil’s supernatural charisma can influence a mortal to do their bidding, often without realizing until it’s too late.'
		},
		{
			id: 'devil-info-3',
			name: 'Negotiating With Devils',
			description: `
Devils are eager to negotiate and strike deals, but often require more compelling arguments and concrete evidence from the other party. You can pick from the following motivations and pitfalls to quickly create a devil from one of the Seven Cities for a negotiation (see Chapter 11 in Draw Steel: Heroes):

- Motivation: Greed, Power, Legacy
- Pitfall: Benevolence, Freedom, Protection

During a negotiation, an NPC devil has their impression and patience increased by 1 (to a maximum of 5). Their interest goes up to 10 instead of 5.

When an NPC devil is ready to make an offer, divide their interest by 2 to get their final response. A devil typically never settles a negotiation unless they’re promised something desirable in return.`
		},
		{
			id: 'devil-info-4',
			name: 'True Names',
			description: 'All devils have two names: one by which they’re commonly known, and another secret true name. Each devil zealously safeguards the latter, as their true name can be spoken aloud to aid in summoning them—or in stripping them of their power.'
		},
		{
			id: 'devil-info-5',
			name: 'Hell’s Defectors',
			description: 'Not every devil in the Seven Cities wants to ruthlessly ascend the hierarchy. Some desire advancement, but they remain dissatisfied at the bottom. As luck would have it, these fiends can free themselves from Hell’s bureaucracy, for when a mortal overestimates their fortitude and dies while enacting an infernal summoning, it can leave an enterprising devil stranded in the mundane world.'
		},
		{
			id: 'devil-info-6',
			name: 'Devil Languages',
			description: 'Most devils speak Anjal and Caelian, among other languages. The more powerful a devil, the more languages they learn in order to more easily make ironclad contracts with a wide variety of people and cultures. Outside of rare circumstances, devils are always willing to negotiate, ever desiring to twist a situation in their favor.'
		},
		{
			id: 'devil-info-7',
			name: 'Devil Temptations',
			description: `
Although some devils enjoy comfort and opulence for their own sake, they primarily use treasure as bargaining chips in fiendish compacts: bait on the devils’ infernal barbs. Even more sinister than a prize won in a devil’s hard bargain is a gift freely given by a devil. The advantages of such a gift are conditional, lasting only until the devil revokes it at some inconvenient time.

The following are samples of the wonders that a devil can offer—to only the most discriminating customers, of course. A devil might only have two or three of these items available for trade, but others (such as an archdevil’s wing) can be won by force. See Draw Steel: Heroes for more information about how these items can be used by heroes.

- Components: An archdevil’s wing, archdevil’s blood, soul chalk, a wide selection of true names
- Project Sources: Notes in Anjali for the Devil’s Bargain armor enhancement or a Hellcharger Helm, notes in Hyrallic for a Mediator’s Charm
- Titles: Diabolist, Maestro
- Treasures: G’Allios Visiting Card, Thief of Joy
- Wealth: Each hero can earn 1 wealth in exchange for a small favor`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'devil-malice-1',
			name: 'Bureucratic Tape',
			cost: 3,
			icon: StatBlockIcon.Self,
			sections: [
				'One devil acting this turn uses a signature ability against an adjacent creature. On a tier 3 outcome, the target of the ability has a double bane on strikes (save ends).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'devil-malice-2',
			name: 'Underhanded Tactics',
			cost: 5,
			icon: StatBlockIcon.Trait,
			sections: [
				'One or two devils can teleport to a space adjacent to one or more creatures who aren’t hidden and make a free strike. For each 2 additional Malice spent on this feature, one additional devil can teleport.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'devil-malice-3',
			name: 'Read the Small Print',
			cost: 7,
			icon: StatBlockIcon.SpecialArea,
			sections: [
				'Each enemy in the encounter is subject to a bad deal proposed by the devils. An enemy must choose between having damage weakness 5 or taking a bane on power rolls. The bad deal lasts until the end of the encounter.'
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
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+2 damage bonus to strikes',
			characteristics: FactoryLogic.createCharacteristics(3, 0, 1, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-1-feature-1',
						name: 'Quill Pushing',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage; push 1',
								tier2: '6 damage; push 2',
								tier3: '7 damage; push 3'
							})),
							FactoryLogic.createAbilitySectionText('Any target adjacent to two or more clerks is taunted until the end of their next turn')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-1-feature-2',
					name: 'True Name',
					description: 'If a creature within 10 squares speaks the clerk’s true name, the clerk loses their fire immunity and any nondamaging effects of their signature ability until the end of the encounter.'
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
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: FactoryLogic.createCharacteristics(0, 1, 3, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-2-feature-1',
						name: 'Importunity',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 fire damage',
								tier2: '5 fire damage; R < 2 target takes a bane on their next strike',
								tier3: '6 fire damage; R < 3 target takes a bane on their next strike'
							})),
							FactoryLogic.createAbilitySectionText('One non-minion devil within 5 squares of the notary gains an edge on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-2-feature-2',
					name: 'True Name',
					description: 'If a creature within 10 squares speaks the notary’s true name, the notary loses their fire immunity and any nondamaging effects of their signature ability until the end of the encounter.'
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
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 9,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+3 bonus to speed',
			characteristics: FactoryLogic.createCharacteristics(0, 3, 1, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-3-feature-1',
						name: 'Litigation',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 corruption damage',
								tier2: '5 corruption damage; slowed (EoT)',
								tier3: '6 corruption damage; slowed (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('The scrivener can shift 1 square')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-3-feature-2',
					name: 'True Name',
					description: 'If a creature within 10 squares speaks the scrivener’s true name, the scrivener loses their fire immunity and any nondamaging effects of their signature ability until the end of the encounter.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-4',
			name: 'Devil Adjudicator',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 140,
			stability: 1,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 2, 1, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-4-feature-1',
						name: 'Infernal Injunction',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 fire damage; I < 1 frightened (save ends)',
								tier2: '15 fire damage; I < 2 frightened (save ends)',
								tier3: '18 fire damage; I < 3 frightened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The adjudicator can slide a target frightened by this ability up to 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-4-feature-2',
						name: 'Adjudicator’s Interdiction',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes a **Presence test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: 'The target is slowed, takes a bane on power rolls, and can’t regain Stamina (save ends).',
								tier2: 'The target is slowed and takes a bane on power rolls (save ends).',
								tier3: 'Slowed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-4-feature-3',
						name: 'Quid Pro Quo',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally or frightened creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The adjudicator and the target teleport to switch places.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-4-feature-4',
						name: 'Devilish Charm',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the adjudicator with a strike.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes a **Presence test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: 'The adjudicator chooses a new target for the strike.',
								tier2: 'The adjudicator halves the triggering damage.',
								tier3: 'The target takes a bane on the strike.'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-4-feature-5',
					name: 'Vexatious Litigation',
					description: 'Any creature within 10 squares of the adjudicator who has <code>P < 3</code> takes a −2 penalty to saving throws.'
				}),
				FactoryLogic.feature.create({
					id: 'devil-4-feature-6',
					name: 'True Name',
					description: 'If a creature within 10 squares speaks the adjudicator’s true name, the adjudicator loses their damage immunities, any nondamaging effects of their signature ability, and their Devilish Charm ability until the end of the encounter.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-4-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-5',
			name: 'Devil Jurist',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Artillery),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 120,
			stability: 0,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 1, 1, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-5-feature-1',
						name: 'Fire and Brimstone',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 fire damage',
								tier2: '15 fire damage; A < 2 burning (save ends)',
								tier3: '18 fire damage; A < 3 burning (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								repeatable: true,
								effect: 'The jurist can target one additional creature or object for each Malice spent.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-5-feature-2',
						name: 'Dismissal with Prejudice',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 damage; slide 1',
								tier2: '10 damage; slide 3',
								tier3: '12 damage; slide 5'
							})),
							FactoryLogic.createAbilitySectionText('If the target has <code>M < 2</code>, the forced distance movement gains a +3 bonus.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-5-feature-3',
						name: 'Ashes to Ashes',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target is burning (see Fire and Brimstone), they take 6 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-5-feature-4',
						name: 'Devilish Charm',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the jurist with a strike.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes a **Presence test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: 'The jurist chooses a new target for the strike',
								tier2: 'The jurist halves the triggering damage',
								tier3: 'The target takes a bane on the strike'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-5-feature-5',
					name: 'Hellfire',
					description: 'Fire damage dealt by the jurist ignores damage immunity.'
				}),
				FactoryLogic.feature.create({
					id: 'devil-5-feature-6',
					name: 'True Name',
					description: 'If a creature within 10 squares speaks the jurist’s true name, the jurist loses their fire immunity, any nondamaging effects of their signature ability, and their Devilish Charm ability until the end of the encounter.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-5-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-6',
			name: 'Devil Legate',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Defender),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 160,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(3, 1, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-6-feature-1',
						name: 'Infernal Pike',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage',
								tier2: '14 damage; A < 2 slowed (save ends)',
								tier3: '17 damage; A < 3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the targets are adjacent to each other, this ability deals an extra 3 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-6-feature-2',
						name: 'Writ of Execution',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 damage; M < 1 prone',
								tier2: '11 damage; M < 2 prone and can’t stand (save ends)',
								tier3: '14 damage; M < 3 prone and can’t stand (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If this ability is used as part of the Charge main action, the legate ignores difficult terrain during the charge. Each creature and object whose space the legate moves through takes the damage from this ability, but not its additional effects.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-6-feature-3',
						name: 'Law and Order',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is taunted by the legate (save ends). The legate can have only one creature taunted at a time.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-6-feature-4',
						name: 'Devilish Charm',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the legate with a strike.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes a **Presence test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: 'The legate chooses a new target for the strike',
								tier2: 'The legate halves the triggering damage',
								tier3: 'The target takes a bane on the strike'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-6-feature-5',
					name: 'Hellish Bailiff',
					description: 'The legate has damage immunity 3 while in one of the Seven Cities of Hell or within 10 squares of a non-minion devil who is of a higher level than them.'
				}),
				FactoryLogic.feature.create({
					id: 'devil-6-feature-6',
					name: 'True Name',
					description: 'If a creature within 10 squares speaks the legate’s true name, the legate loses their damage immunities, any nondamaging effects of their signature ability, and their Devilish Charm ability until the end of the encounter.'
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 160,
			stability: 0,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(1, 3, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-7-feature-1',
						name: 'Edge of the Law',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 damage',
								tier2: '15 damage',
								tier3: '18 damage; R < 3 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The magistrate shifts up to 3 squares before or after using this ability, or between each strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-7-feature-2',
						name: 'Verdict',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '11 damage',
								tier2: '17 damage',
								tier3: '21 damage'
							})),
							FactoryLogic.createAbilitySectionText('This ability has a double edge if the magistrate was hidden from the target, and deals an extra 5 damage if the target is dazed.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The magistrate turns invisible until the start of their next turn, and can attempt to hide as a free maneuver before the end of the current turn.')
						]
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
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes a **Presence test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: 'The magistrate chooses a new target for the strike',
								tier2: 'The magistrate halves the triggering damage',
								tier3: 'The target takes a bane on the strike'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-7-feature-5',
					name: 'Leading',
					description: 'Whenever the magistrate moves away from an enemy who is adjacent to one of the magistrate’s allies, they can shift instead.'
				}),
				FactoryLogic.feature.create({
					id: 'devil-7-feature-6',
					name: 'True Name',
					description: 'If a creature within 10 squares speaks the magistrate’s true name, the magistrate loses their damage immunities, any nondamaging effects of their signature ability, and their Devilish Charm ability until the end of the encounter.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-7-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'devil-8',
			name: 'Devil High Judge',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Devil', 'Infernal' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 181,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(1, 3, 2, 1, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-1',
						name: 'Infernal Decree',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'Three creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '10 damage; R < 2 the target can’t hide (save ends)',
								tier2: '15 damage; R < 3 the target can’t hide (save ends)',
								tier3: '19 damage; R < 4 the target can’t hide (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'While a target is unable to hide this way, any strike against them made by a devil gains an edge.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-2',
						name: 'Compel the Jury',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'Two creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'I < 2 the target is charmed (save ends)',
								tier2: 'I < 3 the target is charmed (save ends)',
								tier3: 'I < 4 the target is charmed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('While charmed this way, a creature treats the high judge as an ally, and the high judge can spend 1 Malice on their turn to make that creature move up to 3 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-3',
						name: 'Devilish Suggestion',
						cost: 2,
						type: FactoryLogic.type.createTrigger('A creature targets the high judge with a strike.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes a **Presence test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: 'The target is charmed (save ends)',
								tier2: 'The high judge chooses a new target for the strike',
								tier3: 'The target takes a bane on the strike'
							})),
							FactoryLogic.createAbilitySectionText('While charmed this way, a creature treats the high judge as an ally, and the high judge can spend 1 Malice on their turn to make that creature move up to 3 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'devil-8-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the high judge can take 10 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way'
				}),
				FactoryLogic.feature.create({
					id: 'devil-8-feature-5',
					name: 'True Name',
					description: 'If a creature within 10 squares speaks the high judge’s true name, the high judge loses their damage immunities, any nondamaging effects of their signature ability, and their Devilish Suggestion triggered action until the end of the encounter.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'devil-8-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 8 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-7',
						name: 'Welcome, Friends',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a **Presence test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Presence,
								tier1: '15 psychic damage; the target is charmed (save ends)',
								tier2: '12 psychic damage; the target is charmed (save ends)',
								tier3: '7 psychic damage'
							})),
							FactoryLogic.createAbilitySectionText('While charmed this way, a creature treats the high judge as an ally, and the high judge can spend 1 Malice on their turn to make that creature move up to 3 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-8',
						name: 'Heed My Decree',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 })
						],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed. The high judge can make each creature charmed by All Rise, Compel the Jury, or Devilish Suggestion move up to half that creature’s speed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'devil-8-feature-9',
						name: 'Deceptive Strategem',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target is an ally or a creature charmed by All Rise, Compel the Jury, or Devilish Suggestion, the high judge and the target teleport to swap places. Each ally within 12 squares of the high judge can then make a free strike against a target of the high judge’s choice. Each creature charmed by All Rise, Compel the Jury, or Devilish Suggestion makes a free strike against a target of the high judge’s choice.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
