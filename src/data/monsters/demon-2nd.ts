import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const demon2nd: MonsterGroup = {
	id: 'monster-group-demon-2nd',
	name: 'Demon — 2nd Echelon',
	description: 'As demons consume more souls and their mercurial forms shift into more powerful ones, they begin to evolve more distinct personalities, desires, and intelligence—often based on the souls consumed. Across categories 4 to 6, demons develop a particular taste for certain types of souls, which eventually come to define them should they survive long enough.',
	picture: null,
	information: [
		{
			id: 'demon-2nd-info-1',
			name: 'Demons — 2nd Echelon',
			description: `
• **Grulqins** (GRUHL-kinz) consist of a bulbous head, two powerful arms, and a circular serrated blade of bone that runs down the middle of their head.

• **Orliq** (or-LEEK) are made of shifting bone plates surrounding a swirling core of corruptive energy.

• **Wobalas** (WOH-buh-luss) prefer to kill from afar while protected by allies, firing psychic bolts from bows shaped of their own flesh and sinew.

• **Bale eyes**, sometimes called “flesh moons,” are colossal floating orbs of roiling, dripping flesh. A weeping seam in that flesh opens to reveal a demonic eye whose gaze turns creatures’ mental and physical faculties upside down.

• **Fangling** have bodies overgrown with teeth, fangs, and tusks from countless creatures. They are deadly in close quarters, to attackers and bystanders alike.

• **Fiktin** (FIK-ten) are cunning hunters who disguise themselves as mundane objects, leaving a foul-smelling oily red residue wherever they have been. Their true form is a humanoid shape made of red oil.

• **Gunge** (GUHNJ) demons are horrifically distended, with maws that can swallow a horse whole. A gunge vomits up bilious slime that traps and dissolves any creature unlucky enough to get caught in it.

• **Tourmenauks** (tor-min-AUX) resemble a hulking ape with a dozen or more extra mouths distributed around their body. Though their brute force is formidable, this demon also inflicts raw psychic pain by wailing from their mouths in different voices—often the agonized voices of souls the tormenauk has devoured.

• **Lumbering Egress** are mobile masses of warped flesh set around an enormous whirling portal to the demonic realms. Lesser demons pour out through these portals at alarming rates, letting these creatures act as devastating siege engines.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'demon-2nd-malice-1',
			name: 'Prior Malice Features',
			cost: 3,
			repeatable: true,
			sections: [
				'The demon activates a Malice feature available to demons of level 3 or lower.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-2nd-malice-2',
			name: 'Abyssal Jaunt',
			cost: 3,
			sections: [
				'One demon acting this turn folds space around them, temporarily slipping in and out of the Abyssal Wasteland. Until the start of the demon’s next turn, they ignore difficult terrain, can move through solid matter, and don’t provoke opportunity attacks by moving. If the demon ends their turn inside solid matter, they are shunted out into the space from which they entered it.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'demon-2nd-1',
			name: 'Grulqin',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 9,
			stability: 1,
			freeStrikeDamage: 3,
			withCaptain: '+2 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(3, 2, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-1-feature-1',
						name: 'Spinning Bone Blade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage',
								tier2: '5 damage',
								tier3: '7 damage'
							})),
							FactoryLogic.createAbilitySectionText('The grulqin gains an edge on this ability if they previously moved 3 or more squares in a straight line on their turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-1-feature-2',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the grulqin can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-2',
			name: 'Orliq',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(6, 'fly'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-2-feature-1',
						name: 'Soul Prism',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 corruption damage; slide 2',
								tier2: '4 corruption damage; vertical slide 2',
								tier3: '6 corruption damage; vertical slide 4'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-2-feature-2',
					name: 'Imposing Energy',
					description: 'Any enemy who starts their turn with two or more orliq adjacent to them is slowed (EoT).'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-2-feature-3',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the orliq can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-3',
			name: 'Wobalas',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+2 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(1, 3, 1, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-3-feature-1',
						name: 'Despair Bolt',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 psychic damage',
								tier2: '5 psychic damage',
								tier3: '7 psychic damage'
							})),
							FactoryLogic.createAbilitySectionText('The target takes a bane on their next strike. If the target is winded, they have a double bane on their next strike instead.')
						]
					})
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-3-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-4',
			name: 'Bale Eye',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 psychic damage',
								tier2: '8 psychic damage',
								tier3: '9 psychic damage'
							})),
							FactoryLogic.createAbilitySectionText('The target has corruption weakness 5 (EoT).'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The target has I<2 corruption weakness 5 (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-4-feature-2',
						name: 'Demonwarp Tears',
						type: FactoryLogic.type.createMain(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** The bale eye must create the cube beneath themself.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 psychic damage, A<1 the target is warped (save ends)',
								tier2: '5 psychic damage, A<2 the target is warped (save ends)',
								tier3: '6 psychic damage, A<3 the target is warped (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('While warped, a creature has a double bane on power rolls using any characteristic higher than 0, and has a double edge on power rolls using any characteristic lower than 0.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-4-feature-3',
					name: 'Lethe',
					description: 'While the bale eye is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-4-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 5 squares of the bale eye can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-5',
			name: 'Fangling',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 damage',
								tier2: '7 damage',
								tier3: '9 damage'
							})),
							FactoryLogic.createAbilitySectionText('Each enemy adjacent to the fangling takes 2 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-5-feature-2',
						name: 'Tumbling Gore',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 8, value2: 3, within: 1 }) ],
						target: 'All enemies',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 damage; pull 1; A<1 bleeding (save ends)',
								tier2: '3 damage; pull 1; A<2 bleeding (save ends)',
								tier3: '4 damage; pull 1; A<3 bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-5-feature-3',
					name: 'Made of Teeth',
					description: 'Whenever an adjacent enemy grabs the fangling or uses a melee ability against the fangling, they take 2 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-5-feature-4',
					name: 'Lethe',
					description: 'While the fangling is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-5-feature-5',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the fangling can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-5-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-6',
			name: 'Fiktin',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
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
						id: 'demon-2nd-6-feature-1',
						name: 'Violent Transformation',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 corruption damage',
								tier2: '6 corruption damage',
								tier3: '7 corruption damage; I<3 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The fiktin violently changes shape, dealing an extra 6 damage to any target they were hidden from with their Aggressive Mimicry ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-6-feature-2',
						name: 'Aggressive Mimicry',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The fiktin transforms into a mundane object of their size or smaller and is automatically hidden. They can revert to their true form as a free maneuver.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-6-feature-3',
					name: 'Lethe',
					description: 'While the fiktin is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-6-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the fiktin can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-6-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-7',
			name: 'Gunge',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 25,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 1, 2, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-7-feature-1',
						name: 'Bilious Expulsion',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 })
						],
						target: 'One creature or object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 acid damage; M<1 slowed (save ends)',
								tier2: '7 acid damage; M<2 slowed (save ends)',
								tier3: '9 acid damage; M<3 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The ground and any surfaces in the area pool with slime. The slime is difficult terrain for enemies, and any enemy is bleeding while in the area.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-7-feature-2',
						name: 'Spew Slide',
						type: FactoryLogic.type.createTrigger('The gunge takes damage from a melee strike.', { free: true }),
						cost: 1,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The gunge vomits with great force, letting them shift up to their speed and ignore any additional effects from the strike. The space the gunge occupied before the shift is covered in slime that is difficult terrain for enemies. Additionally, any enemy is bleeding while in the slime.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-7-feature-3',
					name: 'Lethe',
					description: 'While the gunge is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-7-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the gunge can’t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2nd-7-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2nd-8',
			name: 'Tormenauk',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(2),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 damage',
								tier2: '9 damage',
								tier3: '11 damage; grabbed, and the target takes a bane on the Escape Grab maneuver'
							})),
							FactoryLogic.createAbilitySectionText('Any target grabbed this way takes 4 psychic damage at the start of each of the tormenauk’s turns.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-8-feature-2',
						name: 'Agony Wail',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 psychic damage; I<2 dazed (save ends)',
								tier2: '6 psychic damage; I<3 dazed (save ends)',
								tier3: '8 psychic damage; I<4 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The potency increases by 1 if the target is grabbed by the tormenauk.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-8-feature-3',
					name: 'Lethe',
					description: 'While the tormenauk is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-8-feature-4',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the tormenauk can’t be hidden from them.'
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 corruption damage; A<2 restrained (save ends)',
								tier2: '16 corruption damage; A<3 restrained (save ends)',
								tier3: '19 corruption damage; A<4 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'Two **ensnarers** appear in unoccupied spaces adjacent to each target. On a tier 3 outcome, four ensnarers appear.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-2',
						name: 'Demonic Egress',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Four level 1 demon minions (most commonly **ensnarers**, **frenzieds**, and **pitlings**) burst forth from the egress and appear in unoccupied squares in the area.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'Four level 4 demon minions (most commonly **orliq**, **grulqins**, and **wobalas**) appear instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-3',
						name: 'Abyssal Protectors',
						cost: 2,
						type: FactoryLogic.type.createTrigger('The last ally minion on the encounter map dies, or the egress is reduced below 25 Stamina.'),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Eight **ensnarers** appear anywhere in the area.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2nd-9-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the egress can take 10 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
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
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three enemies',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 corruption damage',
								tier2: '12 corruption damage',
								tier3: '15 corruption damage; two **frenzieds** appears in an unoccupied spaces adjacent to each target.'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-9',
						name: 'Fold Space',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The egress folds into their own portal and teleports to an unoccupied space within distance. Four level 4 demon minions (most commonly **orliq**, **grulqins**, and **wobalas**) appear in squares in the egress’s former space.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2nd-9-feature-10',
						name: 'Blood of the Abyss',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 3, within: 1 }) ],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 corruption damage; R<2 weakened (save ends)',
								tier2: '11 corruption damage; R<3 weakened (save ends)',
								tier3: '14 corruption damage; R<4 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The egress recalls and instantly destroys any minion allies on the encounter map. A torrent of churned-up minion bodies, blood, and ichor erupts from the egress, dealing an extra 1 damage for each minion destroyed this way.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
