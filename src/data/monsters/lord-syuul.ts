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

export const lordSyuul: MonsterGroup = {
	id: 'monster-group-lord-syuul',
	name: 'Lord Syuul',
	description: 'Chief Design Architect of his nation’s body banks, the synliroi Lord Syuul (see-YOU-ull) seeks more material for his experiments. His spies, informants, and allies are always on the lookout for subjects with unique hereditary traits the Interlace might extract.',
	information: [
		{
			id: 'lord-syuul-info-1',
			name: 'A Lord Above',
			description: `
Lord Syuul, who belongs to an ancient and respected noble house, often leaves his estate without his typical retinue to slow him down. His house would prefer he not do this, so they always send a covert squad of bodyguards to track his movements. Confronting Lord Syuul guarantees incurring the ire of the rest of his house. 

Syuul’s recent experiments have focused on isolating the trait that expresses sorcerous ability in humanoids. Thus far, these attempts have been unsuccessful. Not to be deterred, Lord Syuul has placed his assistant in charge of the day-to-day operations of the body banks, while Syuul himself ventures forth to observe the surface world and plunder its diversity.`
		},
		{
			id: 'lord-syuul-info-2',
			name: 'Lord Syuul’s Languages',
			description: 'Lord Syuul uses Mind Speech and Variac.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'lord-syuul-malice-1',
			name: 'Guise',
			cost: 3,
			sections: [
				'Lord Syuul projects a psionic image over their body, making him unable to be identified as an enemy until the end of his next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lord-syuul-malice-2',
			name: 'Do It For Me',
			cost: 5,
			sections: [
				'Lord Syuul psionically plunders the mind of all creatures within 2 of him. Each creature makes a **Reason test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '13 psychic damage; makes a signature attack against a creature Lord Syuul chooses.',
					tier2: '10 psychic damage; makes a free strike against a creature Lord Syuul chooses.',
					tier3: 'No Effect.'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lord-syuul-malice-3',
			name: 'Overpower',
			cost: 7,
			sections: [
				'Lord Syuul sends out a psionic burst to completely overpower his greatest threats. He makes a **Reason Test** (2d10 + 4).',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					bonus: 4,
					tier1: 'Lord Syuul gains damage weakness 5.',
					tier2: 'Lord Syuul gains damage immunity 2.',
					tier3: 'Lord Syuul gains damage immunity 5.'
				}),
				`
He can repeat this reason test once per round as a maneuver, replacing the previous Overpower effect.

However, any hero who has at least one psionic ability can use their maneuver to push back on this effect with a **Reason Test** of their own, replacing the previous Overpower effect.`,
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: 'Lord Syuul gains damage immunity 5',
					tier2: 'Lord Syuul gains damage immunity 2',
					tier3: 'Lord Syuul gains damage weakness 5'
				}),
				'The Overpower effect lasts until the end of the encounter.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'lord-syuul-1',
			name: 'Lord Syuul',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 80,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'teleport, hover'),
			stamina: 450,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 4, 4, 3),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'lord-syuul-feature-1',
					name: 'Lord Syuul',
					gender: 'm',
					endEfect: 10
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-2',
						name: 'Tentacle Grab',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 damage; A<2 grabbed',
							tier2: '17 damage; A<2 grabbed',
							tier3: '20 damage; A<2 grabbed'
						}),
						spend: [
							{ value: 2, effect: 'The distance of this ability increases to Melee 10. Each target grabbed by Lord Syuul is immediately pulled 10.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-3',
						name: 'Dampening Grenade',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 5 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 damage; effect ends after 2 turns.',
							tier2: '10 damage; effect ends after 1 round.',
							tier3: '13 damage; effect ends with the encounter.'
						}),
						effect: 'All psionic or magical abilities within the affected area have a double bane. All tests against psionic or magical effects within this area have a double edge.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-4',
						name: 'Mind Blown',
						type: FactoryLogic.type.createAction(),
						cost: 7,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One grabbed enemy',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '12 damage',
							tier2: '20 damage',
							tier3: '24 damage'
						}),
						effect: 'If this affect reduces the target to 0 Stamina and they have a brain, their brain explodes, instantly killing them.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-5',
						name: 'You Come With Me',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Lord Syuul teleports 5 along with each creature and object he has grabbed. He can release them as part of this maneuver.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-6',
						name: 'Adaptability',
						type: FactoryLogic.type.createTrigger('Lord Syuul takes typed damage.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Lord Syuul gains immunity 5 to the triggering type of damage until the start of his next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'lord-syuul-feature-7',
					name: 'Mind Over Manners',
					description: 'When Lord Syuul uses an ability with the Psionic keyword, he can do so as if he were in the space of any creature within line of effect he has observed using an ability with the Psionic keyword.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-8',
						name: 'See Only Me',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All enemies',
						preEffect: 'Each target makes an **Intuition Test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Intuition,
							tier1: '16 psychic damage; can’t establish line of effect to creatures besides Lord Syuul, and strikes targeting Lord Syuul have a bane (save ends)',
							tier2: '13 psychic damage; can’t establish line of effect to creatures besides Lord Syuul (save ends)',
							tier3: '7 psychic damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-9',
						name: 'Phantom Pain',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Lord Syuul teleports up to 10 and projects an illusory double within 10. The double can’t move or act, but Lord Syuul can use psionic abilities as if he were in its space. When a creature touches or damages the double with a melee strike, they take 10 psionic damage. The double disappears when Lord Syuul takes damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syuul-feature-10',
						name: 'Mindshatter',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '7 psychic damage',
							tier2: '13 psychic damage',
							tier3: '16 psychic damage'
						}),
						effect: 'Each target gains damage weakness 3 until the end of the encounter.'
					})
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'lord-syull-feature-11',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lord-syull-2',
			name: 'Voiceless Talker Exile',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Artillery),
			keywords: [ 'Horror', 'Voiceless Talker' ],
			encounterValue: 27,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'flying, teleport'),
			stamina: 70,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(0, 3, 1, 2, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'lord-syull-2-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syull-2-2',
						name: 'Psychic Erasure',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Psionic, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '7 psychic damage',
							tier2: '12 psychic damage',
							tier3: '15 psychic damage'
						}),
						effect: 'The exile is invisible to the target until the end of the target’s next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syull-2-3',
						name: 'Mindspace Jaunt',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Self and mentor',
						effect: 'The exile and their mentor turn invisible until the start of their next turn. While this invisibility lasts, the exile and their mentor take half damage from all attacks and their attacks do half damage to enemies.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'lord-syull-2-4',
					name: 'Psionic Conductor',
					description: 'When an ally within 5 of the exile uses an ability with the Psionic keyword, they can do so as if they were in the exile’s space.'
				})
			],
			retainer: {
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syull-2-retainer-7',
						name: 'Psychic Toss',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Psionic, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 damage; vertical slide 2',
							tier2: '10 damage; vertical slide 3',
							tier3: '14 damage; vertical slide 5'
						}),
						effect: 'The exile can forego dealing damage. If they do so, the slide distance is doubled.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lord-syull-2-retainer-10',
						name: 'Cower Before Me',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '8 damage; R (weak) frightened (save ends) and prone',
							tier2: '10 damage; R (average) frightened (save ends) and prone',
							tier3: '14 damage; R (strong) frightened (save ends) and prone'
						})
					})
				})
			}
		})
	],
	addOns: []
};
