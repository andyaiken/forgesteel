import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const demon2nd: MonsterGroup = {
	id: 'monster-group-demon-2nd',
	name: 'Demon — 2nd Echelon',
	description: 'As demons consume more souls, and their mercurial forms shift into more powerful ones, they also begin to develop more distinct personalities, desires, and intelligence based on the souls consumed. It’s now that demons begin to develop a particular taste for types of souls which, should they survive long enough, will eventually define them.',
	information: [
		{
			id: 'demon-2nd-info-1',
			name: 'Higher Categories of Demons',
			description: `
The following demons have been identified across 
categories 4-6:

• **Grulqin’s** consist of a bulbous head two powerful arms and circular bone saw blade that runs down the middle of its head.

• **Orliq** are made of shifting bone plates surrounding a swirling core of corruptive energy.

• The **wobalas** prefers to kill from afar while protected by allies, firing physic arrows from bows made from their very flesh and sinew.

• **Bale Eyes**, sometimes called a Flesh Moon, are colossal floating orbs of roiling, dripping flesh. A weeping seam opens to reveal a demonic eye whose gaze melts flesh from bone.

• **Fangling** bodies are overgrown with teeth, fangs, and tusks from a thousand different creatures. Deadly to take on in close quarters, they’ve been known to get caught on one another.

• **Gunge** demons are horrifically distended with maws that could swallow a horse whole. It vomits up bilious slime that traps and dissolves any unlucky enough to get caught in it.

• **Niktin** are cunning hunters that disguise themselves as mundane objects that leave an oily foul smelling red residue wherever they are left. Their natural form is a humanoid made of red oil.

• **Tourmenauk’s** resemble a hulking ape with a dozen or more extra mouths distributed around their body. Though their brute force is formidable enough, this demon also inflicts raw psychic pain by screaming from their mouths in different voices—often using the agonized voices of souls the tormenauk has devoured.

• The **Lumbering Egress** is a walking mass of warped flesh around a giant whirling portal to the demonic realms. Lesser demons pour out at alarming rates making these creatures devastating siege engines.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'demon-2nd-malice-1',
			name: 'Prior Malice Features',
			cost: 1,
			repeatable: true,
			sections: [
				'The demon activates a malice feature available to demons level 3 or lower.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-2nd-malice-2',
			name: 'Abyssal Jaunt',
			cost: 3,
			sections: [
				'A demon acting on this turn folds space around them, temporarily slipping in and out of the abyss.  Until the start of the demon’s next turn, the demon ignores diﬃcult terrain, can move freely through solid matter, and doesn’t provoke opportunity attacks by moving. If the demon ends their turn inside solid matter, they are forced out into the space they originally entered.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'demon-2nd-1',
			name: 'Demon Grulqin',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 9,
			stability: 1,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +2',
			characteristics: MonsterLogic.createCharacteristics(3, 2, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-1-feature-1',
						name: 'Spinning Bone Blade',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}),
						effect: 'The grulqin has an edge on this ability if they moved at least 3 squares in a line during their turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-1-feature-2',
					name: 'Soulsight',
					description: 'Each creature within 2 of the grulqin can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-2',
			name: 'Demon Orliq',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-2-feature-1',
						name: 'Soul Prism',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 corruption damage; slide 2',
							tier2: '4 corruption damage; vertical slide 2',
							tier3: '6 corruption damage; vertical slide 4'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-2-feature-2',
					name: 'Imposing Energy',
					description: 'An enemy who starts their turn with two or more orliqs adjacent to them is slowed (EoT).'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-2-feature-3',
					name: 'Soulsight',
					description: 'Each creature within 2 of the orliq can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-3',
			name: 'Demon Wobalas',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +2',
			characteristics: MonsterLogic.createCharacteristics(1, 3, 1, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-3-feature-1',
						name: 'Despair Bolt',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 psychic damage',
							tier2: '5 psychic damage',
							tier3: '7 psychic damage'
						}),
						effect: 'The target has a bane on their next attack. If the target is winded, they have a double bane on their next attack instead.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-3-feature-2',
					name: 'Soulsight',
					description: 'Each creature within 2 of the pitling can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-4',
			name: 'Demon Bale Eye',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 30,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 3, 3, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-4-feature-1',
						name: 'Wilting Visions',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 psychic damage',
							tier2: '8 psychic damage',
							tier3: '9 psychic damage'
						}),
						effect: 'The target has corruption weakness 5 (EoT).',
						spend: [
							{ value: 2, effect: 'The target has I<2 corruption weakness 5 (save ends).' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-4-feature-2',
						name: 'Demonwarp Tears',
						type: FactoryLogic.type.createAction(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 5, qualifier: 'beneath Bale Eye' }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 psychic damage, A<1 warped (save ends)',
							tier2: '5 psychic damage, A<2 warped (save ends)',
							tier3: '6 psychic damage, A<3 warped (save ends)'
						}),
						effect: 'A warped creature has all of their characteristic scores reversed. A score of +1 becomes -1, -2 becomes +2, etc.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-4-feature-3',
					name: 'Lethe',
					description: 'While winded, the bale eye has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-4-feature-4',
					name: 'Focused Soulsight',
					description: 'Each creature within 5 of the bale eye can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-5',
			name: 'Demon Fangling',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-5-feature-1',
						name: 'Tooth! Tusk! Claw!',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 damage',
							tier2: '7 damage',
							tier3: '9 damage'
						}),
						effect: 'Each enemy adjacent to the fangling takes 2 damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-5-feature-2',
						name: 'Tumbling Gore',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 8, value2: 3, within: 1 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 damage; pull 1; A<1 bleeding (save ends)',
							tier2: '3 damage; pull 2; A<2 bleeding (save ends)',
							tier3: '4 damage; pull 3; A<3 bleeding (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-5-feature-3',
					name: 'Made of Teeth',
					description: 'Whenever an enemy makes physical contact with the fangling or uses a melee ability against the fangling, they take 2 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-5-feature-4',
					name: 'Lethe',
					description: 'While winded, the fangling has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-5-feature-5',
					name: 'Soulsight',
					description: 'Each creature within 2 of the fangling can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-5-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-6',
			name: 'Demon Gunge',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 1, 2, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-6-feature-1',
						name: 'Bilious Expulsion',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 })
						],
						target: 'One creature or object in the area',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 acid damage; M<1 slowed (save ends)',
							tier2: '7 acid damage; M<2 slowed (save ends)',
							tier3: '9 acid damage; M<3 restrained (save ends)'
						}),
						effect: 'The affected area pools with slime. The slime is difficult terrain for enemies, and an enemy is bleeding while occupying an affected square.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-6-feature-2',
						name: 'Spew Slide',
						type: FactoryLogic.type.createTrigger('The gunge takes damage from a melee strike.', { free: true }),
						cost: 1,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The gunge vomits and shifts up to their speed, ignoring any additional effects from the strike. Each square they started in is covered in slime. The slime is difficult terrain for enemies, and an enemy is bleeding while occupying an affected square.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-6-feature-3',
					name: 'Lethe',
					description: 'While winded, the gunge has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-6-feature-4',
					name: 'Soulsight',
					description: 'Each creature within 2 of the gunge can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-6-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-7',
			name: 'Demon Niktin',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Ambusher),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 2, 1, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-7-feature-1',
						name: 'Violent Transformation',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 corruption damage',
							tier2: '6 corruption damage',
							tier3: '7 corruption damage; I<3 dazed (save ends)'
						}),
						effect: 'The niktin violently changes shape. The niktin deals an additional 6 damage to each target they were hidden from with their Aggressive Mimicry ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-7-feature-2',
						name: 'Aggressive Mimicry',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The nitkin can become a mundane object the same size or smaller and is hidden. They can change back as a free action.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-7-feature-3',
					name: 'Lethe',
					description: 'While winded, the nitkin has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-7-feature-4',
					name: 'Soulsight',
					description: 'Each creature within 2 of the nitkin can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-7-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-8',
			name: 'Demon Tormenauk',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 45,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 0, 2, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-8-feature-1',
						name: 'Many Maws',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 damage',
							tier2: '9 damage',
							tier3: '11 damage; grabbed, the target has a bane on escaping the grab'
						}),
						effect: 'While the target is grabbed by this ability, they take 4 psychic damage at the start of each of the tormenauk\'s turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-8-feature-2',
						name: 'Agony Wail',
						type: FactoryLogic.type.createAction(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '4 psychic damage; I<2 dazed (save ends)',
							tier2: '6 psychic damage; I<3 dazed (save ends)',
							tier3: '8 psychic damage; I<4 dazed (save ends)'
						}),
						effect: 'The potency increases by 1 if the target is grabbed by the tormenauk.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-8-feature-3',
					name: 'Lethe',
					description: 'While winded, the tormenauk has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-8-feature-4',
					name: 'Soulsight',
					description: 'Each creature within 2 of the tormenauk can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-8-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-9',
			name: 'Lumbering Egress',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 180,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, -1, 1, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-1',
						name: 'Ensnarer Cannon',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 corruption damage; A<2 restrained (save ends)',
							tier2: '16 corruption damage; A<3 restrained (save ends)',
							tier3: '19 corruption damage; A<4 restrained (save ends)'
						}),
						spend: [
							{ value: 2, effect: 'An **ensnarer**(s) survives the launch, appearing adjacent to one of the targets. Two ensnarers appear on a tier-3 result.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-2',
						name: 'Demonic Egress',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Special',
						effect: 'Four level 1 demon minions (**ensnarer**, **frenzied**, **pitling**) burst forth from the egress and appear in unoccupied squares.',
						spend: [
							{ value: 2, effect: 'A level 4 demon minion (**orflig**, **wobalas**, **grulqin**) also bursts forth and appears in an unoccupied square.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-3',
						name: 'Abyssal Protectors',
						cost: 1,
						type: FactoryLogic.type.createTrigger('The last ally minion on the encounter map dies OR the Egress falls below 25 Stamina.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Special',
						effect: 'A **muceron** and 2 **ensnarers** appear anywhere in range.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-9-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the egress can take 10 damage to end one save ends eﬀect aﬀecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-9-feature-6',
					name: 'Soulsight',
					description: 'Each creature within 2 of the egress can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-9-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-8',
						name: 'Frenzied Deluge',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '7 corruption damage',
							tier2: '12 corruption damage',
							tier3: '15 corruption damage; a frenzied appears in an unoccupied square adjacent to the target.'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-9',
						name: 'Fold Space',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Self',
						effect: 'The egress folds into their own portal and teleports to an unoccupied space within distance. Four level 1 demon minions (**ensnarer**, **frenzied**, **pitling*) appear in the space the egress leaves behind.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-10',
						name: 'Blood of the Abyss',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 3, within: 1 }) ],
						target: 'All enemies and objects in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '5 corruption damage; R<2 weakened (save ends)',
							tier2: '10 corruption damage; R<3 weakened (save ends)',
							tier3: '13 corruption damage; R<4 weakened (save ends)'
						}),
						effect: 'The egress recalls and instantly destroys any ally minions on the encounter map. A torrent of churned up minion bodies and blood erupts from the egress, dealing an additional 2 damage for each minion destroyed this way.'
					})
				})
			]
		})
	],
	addOns: []
};
