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

export const elfHigh: MonsterGroup = {
	id: 'monster-group-elf-high',
	name: 'Elf, High',
	description: 'The children of the solar celestials. The high elves were created to tend to the sun elves as librarians and heralds. They sequester themselves away from the world amid sky elf ruins, remembering a better age before the arrival of war.',
	information: [
		{
			id: 'elf-high-info-1',
			name: 'Glamorous',
			description: 'The high elves hold an unwavering poise worthy of a noble background. They also emit a glamor that allows them to take on any skin, hair, or eye color they desire. Each person sees this glamor slightly differently, emphasizing some details over others based on one\'s own values and fascinations.'
		},
		{
			id: 'elf-high-info-2',
			name: 'Loremasters',
			description: `
The adage “knowledge is power” is a rough translation of an ancient Hyrallic saying. A closer translation might be, “knowledge before power.” High elves believe knowledge is the pursuit from which all good things flow: life, power, legacy.

In their ruined towers they study ancient history and magic thought long extinct. They revive dead spells and languages and manipulate their use to suit their means. High elves can use this magic for wondrous creations. They can also use it to kill without lifting more than a few fingers.`
		},
		{
			id: 'elf-high-info-3',
			name: 'Elemental Summoners',
			description: `
Through their studies of ancient magic, the high elves have cultivated a strong bond to elementals and can call upon their aid where they need it. Soot crows scout from the sky, living vine walls called brambleguards create labyrinthine barricades, and ceramic horses provide fast transport over long distances. 

Most high elves have also learned to summon magical wisps called elemental motes. These sprites enervate their foes to expose them to high elf magic, and can transfer their energy into fallen elementals to revive them in a brilliant flash.`
		},
		{
			id: 'elf-high-info-4',
			name: 'Surround and Suppress',
			description: 'Foes that threaten high elf armies are dealt with quickly and entirely. They take advantage of each other’s magic to corral enemies together and throw huge waves of destruction upon them. The more exposure a victim has to high elf magic, the more effective it is in destroying them. Wyrds ensure there’s no escape, warping the environment into treacherous pits and, eventually, graveyards.'
		},
		{
			id: 'elf-high-info-5',
			name: 'Magical Manipulation',
			description: `
The high elves practice a tradition of group-casting magic that empowers their abilities as more elves participate. This enables them to extend their spells further, sometimes miles away from the caster with an entire platoon working in unison.

Many high elves have also collected extensive libraries of tomes over the centuries. Even on the battlefield, an elf can turn to a book to turn their mundane volleys into magical ones.`
		},
		{
			id: 'elf-high-info-6',
			name: 'Unseen Hands Will Illuminate Their Unchanged Minds',
			description: 'Unseen Hands Will Illuminate Their Unchanged Minds are a sect of high elf radicals who believe they have stumbled upon sky elf texts detailing their downfall by the hands of the sun elves. The story surrounding their purported discoveries have twisted into a narrative decrying all modern society for benefiting from the lore accumulated in service to the sun elves. The sect hides among high elf society in plain sight, slowly manipulating nobles and reshaping the world as they see fit.'
		},
		{
			id: 'elf-high-info-7',
			name: 'The Ordinator',
			description: `
Being in the presence of a high elf ordinator inspires an ancient fear in your chest. An ordinator is capable of focusing an army of high elves to precisely strike an arrow’s tip from the other end of the battlefield. These spellcasters are among the most studied elves in their circles, and their strategic minds are matched only by their affinity with elementals.  

The ordinator is not only an illuminating beacon of command for their platoon; they are spiritual beacon of hope for their people. Ordinators carry out their circles’ will, knowledge, and power, not unlike a conduit’s duty to their saint.`
		},
		{
			id: 'elf-high-info-8',
			name: 'High Elf Languages',
			description: 'Most high elves speak Caelian and Hyrallic.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'elf-high-malice-1',
			name: 'Chaincast',
			cost: 3,
			sections: [
				'Until the end of the round, whenever a high elf uses a Magic ability, they can use it as if they were occupying the space of another high elf on the encounter map to whom they have line of eﬀect.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'elf-high-malice-2',
				name: 'Gift From an Accursed Tome',
				type: FactoryLogic.type.createAction({ qualifiers: [ 'Non-minion' ] }),
				cost: 5,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
				target: 'All enemies',
				powerRoll: FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '5 damage; R<1 condition (save ends)',
					tier2: '9 damage; R<2 condition (save ends)',
					tier3: '12 damage; R<3 condition (save ends)'
				}),
				effect: 'The high elf chooses damage type and condition afflicted from one of the following pairs: cold and slowed, poison and weakened, or corruption and frightened of the high elf.'
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'elf-high-malice-3',
			name: 'In Defiance of Time',
			cost: 7,
			sections: [
				'Until the end of the round, all high elves have their speed increased by 4. When a high elf uses an ability against an enemy, each high elf adjacent to the enemy can make a free strike against them.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'elf-high-1',
			name: 'Elemental Mote',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Elemental', 'High Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-1-feature-1',
						name: 'Dweomer Plume',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage; R<1 Magic weakness 3 (save ends)',
							tier3: '3 damage; R<2 Magic weakness 3 (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-1-feature-2',
					name: 'Spark of Life',
					description: 'On their turn, the mote can choose to die to revive a dead soot crow, brambleguard, or ceramic horse within 1, returning with 3 Stamina.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-2',
			name: 'High Elf Dawn Mage',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Ranged distance +5',
			characteristics: MonsterLogic.createCharacteristics(0, 0, 1, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-2-feature-1',
						name: 'Bright Bolt',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 holy damage',
							tier2: '2 holy damage',
							tier3: '3 holy damage'
						}),
						effect: 'The target can’t hide until the start of the dawn mage’s next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-2-feature-2',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the dawn mage can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-3',
			name: 'High Elf Quiver',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Ranged distance +5',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-3-feature-1',
						name: 'Heavy Arrow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'Each ally adjacent to the target can shift 2.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-3-feature-2',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the quiver can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-4',
			name: 'Soot Crow',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Elemental', 'High Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-4-feature-1',
						name: 'Heckle',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage; taunted (EoT)'
						}),
						effect: 'The soot crow ignores opportunity attacks from the target until the end of its turn.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-5',
			name: 'Brambleguard',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Elemental', 'High Elf' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(4),
			stamina: 59,
			stability: 3,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-5-feature-1',
						name: 'Wall of Roses',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The brambleguard’s speed becomes 0 and they extend themself into a 5 wall until the start of their next turn. Each ally adjacent to the brambleguard at the start of their turn regains 5 Stamina and can apply the Magic keyword to their weapon abilities until the end of their turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-5-feature-2',
						name: 'Whip Frenzy',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '7 damage; push 3',
							tier3: '10 damage; push 3; A<2 bleeding (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-5-feature-3',
					name: 'Thicket and Thorns',
					description: 'The brambleguard blocks line of eﬀect for enemies. An enemy that starts their turn adjacent to a brambleguard takes 4 damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-6',
			name: 'High Elf Bloodletter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-6-feature-1',
						name: 'Razor\'s Edge',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '12 damage; R<2 bleeding (save ends)'
						}),
						effect: 'The bloodletter and each ally has a double edge on abilities targeting a creature or object bleeding from this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-6-feature-2',
						name: 'Blood Haze',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Special',
						effect: 'The bloodletter creates a cloud of blood vapor in the area until the end of the next round. The cloud blocks line of effect for enemies, and an enemy has Magic weakness 3 occupying an affected square. The bloodletter then shifts up to their speed, hiding if they end their movement under concealment.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-6-feature-4',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the bloodletter can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-7',
			name: 'High Elf Deathtouch',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Artillery),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 1, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-7-feature-1',
						name: 'Heartpiercer',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '10 damage',
							tier3: '13 damage; R<1 bleeding (save ends); I<1 frightened (save ends); P<1 restrained (save ends)'
						}),
						spend: [
							{ value: 5, effect: 'The ability replaces Strike with the Area keyword, the distance becomes 3 cube within 10, and it targets all creatures in the cube.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-7-feature-2',
						name: 'Kiss of Death',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 ally',
						effect: 'The target’s speed increases by 5 and they cannot get results lower than tier 3 on their power rolls. The target immediately dies at the end of their next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-7-feature-3',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the deathtouch can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-8',
			name: 'High Elf Orbweaver',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-8-feature-1',
						name: 'Awash',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'All creatures in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 cold damage; M<0 slide 3',
							tier2: '6 cold damage; M<1 slide 4 or prone',
							tier3: '9 cold damage; M<2 slide 5 or prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-8-feature-2',
						name: 'Aetherweb',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'Two enemies or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; R<0 slowed (save ends)',
							tier2: '8 damage; R<1 slowed (save ends)',
							tier3: '11 damage; R<2 restrained (save ends)'
						}),
						effect: 'Each enemy within 3 of a target suffers the same additional effects as the target unless they shift into an unoccupied square adjacent to them.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-8-feature-3',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the mage can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-9',
			name: 'High Elf Palinode',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-9-feature-1',
						name: 'Instill Regret',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 psychic damage',
							tier2: '7 psychic damage; I<1 weakened (save ends)',
							tier3: '9 psychic damage; I<2 weakened (save ends)'
						}),
						spend: [
							{ value: 2, effect: 'The potency of this ability increases by 1. If the target is still weakened by this ability at the end of the encounter they cannot take a respite activity during their next respite.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-9-feature-2',
						name: 'Recall',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '2 allies',
						effect: 'Each target is teleported to an unoccupied square adjacent to the palinode. Then, the palinode and each target gain 5 temporary Stamina.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-9-feature-3',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the palinode can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'elf-high-9-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-10',
			name: 'High Elf Wyrd',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 2, -1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-10-feature-1',
						name: 'Twystrd',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'vertical push 3',
							tier2: 'vertical push 5',
							tier3: 'vertical push 6'
						}),
						effect: 'The area of the cube increases by 1 for each elemental mote adjacent to the wyrd.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-10-feature-2',
						name: 'Summon Elemental',
						cost: 2,
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Special',
						effect: 'The wyrd summons 2 **elemental motes** or 2 **soot crows** into unoccupied squares within distance.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-10-feature-3',
						name: 'Wyrd Warp',
						cost: 2,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 8, within: 8 }) ],
						target: 'Special',
						effect: 'The wyrd shapes the land as if it were loose clay. Each wall segment takes up the entire square. A segment can also be used to push a square of the terrain further into the ground. An enemy on top of an affected square moves with the elevation of the terrain.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-10-feature-4',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the wyrd can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-11',
			name: 'High Elf Zephyr',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-11-feature-1',
						name: 'Sweeping Blade',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '7 damage',
							tier3: '9 damage; the zephyr makes a free strike on a creature adjacent to the target; both creatures are A<2 prone'
						}),
						effect: 'Shift 2.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-11-feature-2',
						name: 'Windwalk',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The zephyr moves up to their speed through the air. They must end this movement on solid ground or immediately fall prone.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-11-feature-3',
					name: 'Like the Wind',
					description: 'All of the zephyr\'s movement is considered shifting.'
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-11-feature-4',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the zephyr can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-12',
			name: 'High Elf Ordinator',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 120,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 3, 2, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-12-feature-1',
						name: 'Lightning Rod',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 lightning damage; R<1 dazed (save ends)',
							tier2: '14 lightning damage; R<2 dazed (save ends)',
							tier3: '17 lightning damage; R<3 dazed (save ends)'
						}),
						effect: 'High elves have an edge on abilities used against the target until the start of the ordinator’s next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-12-feature-2',
						name: 'Elemental Uproar',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each elemental ally in the burst',
						effect: 'Each target moves up to their speed or makes a free strike. An elemental mote target can use their Spark of Life trait.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-12-feature-3',
						name: 'Summon Elemental',
						cost: 3,
						repeatable: true,
						type: FactoryLogic.type.createManeuver( { free: true } ),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						effect: 'For every 3 malice spent, the ordinator summons 5 **elemental motes**, 3 **soot crows**, 1 **ceramic horse**, or 1 **brambleguard** into unoccupied squares within distance.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-12-feature-4',
						name: 'Enough!',
						type: FactoryLogic.type.createTrigger('An enemy targets the ordinator or an ally within distance with an ability.'),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Triggering enemy',
						effect: 'The ordinator uses Lightning Rod against the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-12-feature-5',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the ordinator can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-12-feature-6',
					name: 'Magic Beacon',
					description: 'While using Chaincast, magic abilities tha tuse the Ordinator\'s space have a double edge (see Chaincast).'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-12-feature-7',
						name: 'Fountains Roar, Now Free From The Earth',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All allies in the burst',
						effect: 'Each target glows, ending one condition on themselves and then moving up to twice their speed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-12-feature-8',
						name: 'And The Sun Forsook Her Children',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: 'All enemies in the cube',
						preEffect: 'Each target makes a **Presence test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Presence,
							tier1: '12 corruption damage; pull 5 towards the center of the cube',
							tier2: '9 corruption damage; pull 3 towards the center of the cube',
							tier3: 'pull 1 towards the center of the cube'
						}),
						effect: 'The affected area becomes darkened and its space warps violently in every direction.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-12-feature-9',
						name: 'But We Will Change Her Mind.',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and all allies in the burst',
						effect: 'All elves radiate wisps of magic. Each target makes a free strike that has the Magic keyword and deals an additional 3 damage.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-13',
			name: 'Ceramic Horse',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Mount),
			keywords: [ 'Plant', 'High Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10),
			stamina: 30,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-13-feature-1',
						name: 'Elemental Charge',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '7 fire damage',
							tier3: '9 lightning damage; M<2 prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-13-feature-2',
						name: 'Stomp',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies in burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}),
						effect: 'This attack deals an additional 2 damage to prone targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-13-feature-3',
						name: 'Buck',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'The horse\'s rider',
						effect: 'Vertical slide 3; The rider can use a ranged ability at any point during the movement and then fall without taking damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-13-feature-4',
					name: 'Shared Otherwordly Grace',
					description: 'If the ceramic horse’s rider has the Otherworldly Grace trait, it also gains the Otherworldly Grace trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-high-14',
			name: 'High Elf Weatherwise',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Controller),
			keywords: [ 'Fey', 'Humanoid', 'High Elf' ],
			encounterValue: 11,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 2, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-14-feature-1',
						name: 'Summer\'s Bolt',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 fire damage',
							tier2: '5 fire damage',
							tier3: '7 fire damage'
						}),
						effect: 'If the weatherwise targets their mentor, instead of taking damage the mentor gains the same amount of Temporary Stamina.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-high-14-feature-2',
					name: 'Otherwordly Grace',
					description: 'At the start of their turn, the weatherwise can turn the duration of one save ends eﬀect they suﬀer from into EoT.'
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-14-retainer-4',
						name: 'Winter\'s Breath',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 cold damage; push 2',
							tier2: '5 cold damage; push 3',
							tier3: '8 cold damage; push 5'
						}),
						effect: 'The weatherwise can teleport 5 before or after using this ability.'
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-14-retainer-7',
						name: 'Magic Arrows',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All allies',
						effect: 'Each target can spend a recovery. Additionally, they can turn the duration of one Save Ends effect they suffer from into EoT or end one EoT effect.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-high-14-retainer-10',
						name: 'Autumn\'s Decay',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 corruption damage; P (weak) prone and can\'t stand (save ends)',
							tier2: '10 corruption damage; P (average) prone and can\'t stand (save ends)',
							tier3: '14 corruption damage; P (strong) prone and can\'t stand (save ends)'
						})
					})
				})
			}
		})
	],
	addOns: []
};
