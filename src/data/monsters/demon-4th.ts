import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const demon4th: MonsterGroup = {
	id: 'monster-group-demon-4th',
	name: 'Demons — 4th Echelon',
	description: 'The more souls a demon consumes, the more they evolve. The more they evolve, the more refined their tastes become, until eventually demons of category 10 can be satisfied only by consuming souls that exemplify particular qualities. Many demons of this category have their tastes honored by their titles, such as Gorgino, the Sensuous Feast; Tyx, the Obliviated Spiral; and Lorikta, the Discarded Dream.',
	picture: null,
	information: [
		{
			id: 'demon-4th-info-1',
			name: 'Demons — 4th Echelon',
			description: `
• **Optacus** (OHP-tih-cus) demons are abyssal eyes atop a spindly flesh stalk supported by innumerable legs. Able to affix to any surface, they shoot deadly beams of fire at distant foes.

• **Tyburakis** (tee-berr-AH-kees) appear as a horrifying cross between a thresher shark and a terror lizard, their tails lined with tiny shark maws that allow them to bite multiple foes at once.

• **Unguloids** (UHN-jyl-oids) have a centaur-like form, with a body and head resembling a demonic rhinoceros. They are known for their devastating charge.

• **Izyaks** (ee-zi-YAHKS) have a mercurial form that ripples with psionic energy, making these demons appear different to all those who observe them. Their true form is a brain supported on four bone legs.

• **Vicisitators** (vih-SIS-ih-tay-tors) are dangerous and horrifically unstable, the flesh and bone of their bodies trapped in a state of perpetual agonizing flux. Their very touch results in excruciating pain as it warps flesh, bone, and soul.

• **Aurumvas** (FIK-ten) (or-UM-vahs) the demon king stands alone among named demons for craving not only wealth, but highly avaricious souls. A towering figure with a stack of crowns atop his ophidian head, he is a vision of opulence, excess, and absolute debasement. He lords over other powerful demons by virtue of the wealth held in his vast vaults in the Abyssal Wasteland, acquired through the slaughter of countless creatures. But even as he gazes upon his riches and supernatural treasures, Aurumvas wants for more. He draws lesser demons and wicked mortals to his service with the promise of minor treasures, knowing full well that one needs to spend wealth to make it. If left unchecked, Aurumvas’s servile armies and glittering hoards might one day encompass the entire timescape.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'demon-4th-malice-1',
			name: 'Prior Malice Features',
			cost: 3,
			repeatable: true,
			sections: [
				'The demon activates a Malice feature available to demons of level 9 or lower.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-4th-malice-2',
			name: 'Soul Flense',
			cost: 7,
			sections: [
				'One demon acting this turn unleashes their pent-up agony and pain on every non-demon in a 5 burst. Each target makes a **Presence test**.',
				FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Presence,
									tier1: '10 corruption damage; the target is soul flensed',
									tier2: 'The target is soul flensed',
									tier3: 'No effect'
								}),
				'The demon removes all conditions and effects on themself that can be ended by a saving throw, and transfers all those effects to each creature soul flensed this way.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'demon-4th-1',
			name: 'Optacus',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 14,
			stability: 0,
			freeStrikeDamage: 5,
			withCaptain: '+4 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(1, 3, 1, 5, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-1-feature-1',
						name: 'Optical Flare',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '5 fire damage',
								tier2: '8 fire damage',
								tier3: '10 fire damage; this damage ignores immunity'
							})),
							FactoryLogic.createAbilitySectionText('This ability ignores concealment. A winded target takes an extra 5 damage.')
						]
					})
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-1-feature-2',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-2',
			name: 'Tyburaki',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8, 'swim'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: '+4 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 5, 0, 3, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-2-feature-1',
						name: 'Tail Bite',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '4 damage',
								tier2: '7 damage',
								tier3: '9 damage'
							})),
							FactoryLogic.createAbilitySectionText('The tyburaki can make a free strike against each enemy adjacent to the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-2-feature-2',
					name: 'Breacher',
					description: 'While swimming, the tyburaki can jump 5 squares as part of their movement.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-2-feature-3',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the tyburaki can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-3',
			name: 'Unguloid',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 17,
			stability: 3,
			freeStrikeDamage: 5,
			withCaptain: 'Have a double edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(5, 5, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-3-feature-1',
						name: 'Gore Horn',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '5 damage; push 2',
								tier2: '8 damage; push 4',
								tier3: '10 damage; push 6'
							})),
							FactoryLogic.createAbilitySectionText('If this ability is used as part of a charge for which the unguloid moves 2 squares or more, it deals an extra 10 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-3-feature-2',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the unguloid can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-4',
			name: 'Izyak',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6, 'teleport'),
			stamina: 55,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 5, 2, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-4-feature-1',
						name: 'Nostalgic Wanderlust',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '9 psychic damage; R<3 restrained (save ends)',
								tier2: '12 psychic damage; R<4 restrained (save ends)',
								tier3: '14 psychic damage; R<5 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The izyak can slide any target restrained this way up to 3 squares.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'The izyak can vertical slide any target restrained this way up to 6 squares instead. A target left in midair doesn’t fall until the restrained condition ends.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-4-feature-2',
						name: 'Ruinous Temptation',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '4 psychic damage; I<3 dazed (save ends)',
								tier2: '7 psychic damage; I<4 dazed (save ends)',
								tier3: '9 psychic damage; I<5 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Any target dazed this way must use a move action to move their speed toward the izyak on their next turn.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The area increases to a 6 cube.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-4-feature-3',
					name: 'Lethe',
					description: 'While the izyak is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-4-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 5 squares of the izyak can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-5',
			name: 'Vicisitator',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(9),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(4, 5, -1, -2, -3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-5-feature-1',
						name: 'Warp Touch',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1), FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '9 damage',
								tier2: '12 damage',
								tier3: '14 damage; I<5 the target is slowed and weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Special:** The effects of being slowed and weakened this way can’t be ignored.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-5-feature-2',
						name: 'Soul Flay',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 6, value2: 3, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '4 psychic damage; P<3 bleeding (save ends)',
								tier2: '7 psychic damage; P<4 bleeding (save ends)',
								tier3: '9 psychic damage; P<5 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Any creature who is bleeding from this ability loses 2d6 Stamina instead of 1d6.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-5-feature-3',
					name: 'Lethe',
					description: 'While the vicisitator is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-5-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the vicisitator can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-5-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4th-6',
			name: 'Aurumvas',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(8, 'fly'),
			stamina: 260,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(5, 2, 5, 3, 5),
			features: [
				FactoryLogic.feature.create({
					id: 'demon-4th-6-feature-1',
					name: 'Absorb Soul',
					description: 'Whenever any demon is reduced to 0 Stamina within 10 squares of Aurumvas, the Director gains 1 Malice. Aurumvas loses this trait while he is dazed.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-2',
						name: 'Greedy Hands',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 corruption damage; R<4 weakened (save ends)',
								tier2: '20 corruption damage; R<5 weakened (save ends)',
								tier3: '24 corruption damage; R<6 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'Aurumvas regains Stamina equal to the damage dealt.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-3',
						name: 'Covetous Bolts',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Two creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 psychic damage; P<4 dazed (save ends)',
								tier2: '20 psychic damage; P<5 dazed (save ends)',
								tier3: '24 psychic damage; P<6 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'While dazed this way, a target can’t gain Heroic Resources.'
							}),
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-4',
						name: 'Greed Is Good',
						cost: 2,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Aurumvas chooses a supernatural treasure or an item made of gold and teleports to an unoccupied space adjacent to that object, then ends one effect on him that can be ended by a saving throw.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-6-feature-5',
					name: 'More … More …',
					description: 'While Aurumvas is winded, he has a double edge on strikes.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-4th-6-feature-6',
					name: 'Soulsight',
					description: 'Any creature within 5 squares of Aurumvas can’t be hidden from him.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4th-6-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-8',
						name: 'Time Is Money',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 20 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Aurumvas warps time with his abyssal avarice. Each target can teleport up to their speed and make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-9',
						name: 'Hostile Acquisition',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Aurumvas chooses up to three treasures within distance that he has line of effect to and that aren’t artifacts. Until the end of the encounter, ethereal golden snakes swirl around the target treasures. While an affected treasure is worn or held by a hero, each time that hero gains any amount of their Heroic Resource, the Director gains 1 Malice.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4th-6-feature-10',
						name: 'No Matter the Cost',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSpecial('Four 3 cubes within 10') ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Aurumvas summons treasures from his vaults into the area, then causes them to explode.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '10 fire damage; push 1',
								tier2: '15 fire damage; push 2',
								tier3: '19 fire damage; push 3'
							})),
						]
					})
				})
			]
		})
	],
	addOns: []
};
