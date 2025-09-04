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

export const warDog4th: MonsterGroup = {
	id: 'monster-group-wardog-4th',
	name: 'War Dog - 4th Echelon',
	description: 'At the apex of the war dog command structure, a number of infamous figures are known for their brutal tactics, legendary battle prowess, and unbreakable loyalty to Ajax.',
	picture: null,
	information: [
		{
			id: 'wardog-4th-info-warning',
			name: 'Content Warning: Brainwashing and Body Horror',
			description: 'War dogs are explicitly evil soldiers built from the body parts of other humanoids. Check in with your players before running war dogs to make sure that they’re okay with battling brainwashed soldiers with an appearance akin to Frankenstein’s monster if he were built to be a shock trooper. If anyone is uncomfortable, modify the appearance and lore of the war dogs as you see fit.'
		},
		{
			id: 'wardog-4th-info-1',
			name: 'Castellan Hoplon',
			description: 'Hoplon’s scars are not from the Body Banks, but from years of combat and hard-fought sieges. A master of the harrying retreat, the holdfast, and the last stand, Hoplon is there to lead the defense wherever the fighting is most intense and the lines threaten to buckle.'
		},
		{
			id: 'wardog-4th-info-2',
			name: 'Iron Champion Doru',
			description: 'Upon the accidental creation of the Iron Champion, only the intervention of Ajax was able to stop Doru’s rampage. His raw strength and untempered aggression make him a valuable combatant, but it is his mysterious regeneration that makes him a true monster on the battlefield.'
		},
		{
			id: 'wardog-4th-info-3',
			name: 'Logostician Vesper',
			description: 'A master of logistical support and a living portal network, Vesper is the emergent personality of several dozen potent psychic minds working in concert. From their position within an armored and highly mobile flesh chassis, Vesper manages supply lines and transport for the forces of the Iron Saint.'
		},
		{
			id: 'wardog-4th-info-4',
			name: 'Soulbinder Psyche',
			description: 'Viewed by other war dogs as “The Goddess of the Banks,” Psyche possesses a spirit that can return from the Body Banks again and again without ever losing her core self. She is a master of the connection between soul and flesh, and a talented mage besides.'
		},
		{
			id: 'wardog-4th-info-5',
			name: 'Strategos Alkestis',
			description: 'Leader of the Legion Alkestis and one of the most brilliant commanders ever to be born a war dog, Alkestis has made her legion one of the most feared of Ajax’s armies. The Silver Wolf is known for her battlefield tactics and a willingness to stoop to any depths to gain an edge on her enemies.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wardog-4th-malice-1',
			name: 'Reconstitute',
			cost: 3,
			sections: [
				'One war dog acting this turn tears apart a nearby corpse of a humanoid and incorporates its body parts into their own. The war dog regains Stamina equal to 5 times their level.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-4th-malice-2',
				name: 'Fire for Effect',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'Each creature in the area',
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** Each target makes an **Agility test**. The same condition is imposed on each affected target'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '5 fire damage; slowed or weakened (save ends)',
						tier2: '5 fire damage; slowed or weakened (EoT)',
						tier3: '5 fire damage'
					}))
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'wardog-4th-malice-3',
			name: 'Fodder Run',
			cost: 7,
			sections: [
				'Each war dog minion in the encounter shifts up to their speed and can make a free strike. A minion who does so is then reduced to 0 Stamina.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-4th-malice-4',
				name: 'Loyalty Unto Death',
				type: FactoryLogic.type.createManeuver(),
				cost: 5,
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'Two war dogs',
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** Each target who has a loyalty collar shifts up to their speed, then is reduced to 0 Stamina. After each target’s Loyalty Collar trait is resolved, each enemy adjacent to either target makes a **Presence test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'Push 4; the enemy is frightened of the nearest non-minion war dog (save end)',
						tier2: 'Push 2; the enemy is frightened of the nearest non-minion war dog (EoT)',
						tier3: 'Push 2'
					}))
				]
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-4th-malice-5',
				name: 'Alchemical Cloud',
				type: FactoryLogic.type.createNoAction(),
				cost: 7,
				keywords: [ ],
				distance: [ ],
				target: '',
				sections: [
					FactoryLogic.createAbilitySectionText('A bank of choking chemicals sweeps across the area of the enácounter map. Each enemy in the encounter makes a **Might test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '8 poison damage; dazed (Eot)',
						tier2: '7 poison damage; weakened (EoT)',
						tier3: '4 poison damage'
					}))
				]
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-4th-malice-6',
				name: 'Cry Havoc',
				type: FactoryLogic.type.createManeuver(),
				cost: 7,
				keywords: [ ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
				target: 'Each enemy in the area',
				sections: [
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						bonus: 5,
						tier1: '7 psychic damage',
						tier2: '11 psychic damage; P < 4 frightened (save ends)',
						tier3: '14 psychic damage; P < 5 frightened (save ends)'
					})),
					FactoryLogic.createAbilitySectionText('**Effect:** Each war dog within distance deals an extra 15 damage with strikes until the end of their next turn. Additionally, they end any effect on them that can be ended by a saving throw or that ends at the end of their turn, then shift up to their speed and can make a free strike.'),
					FactoryLogic.createAbilitySectionText('**Special:** This ability can’t be used by a minion.')
				]
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wardog-4th-1',
			name: 'War Dog Blood Jumper',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'Fly'),
			stamina: 15,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: '+3 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(5, 4, 2, 3, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-1-feature-1',
						name: 'Jumplance',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '4 damage',
								tier2: '7 damage',
								tier3: '9 damage; A < 4 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** If this damage leaves the target winded, they are frightened of the draconite until the end of the target’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-1-feature-2',
					name: 'Drop Troop',
					description: 'If the jumper doesn’t end their turn on the ground, they fall prone.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-1-feature-3',
					name: 'Loyalty Collar',
					description: 'When the jumper is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-2',
			name: 'War Dog Hunter-Killer',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 14,
			stability: 0,
			freeStrikeDamage: 5,
			withCaptain: '+4 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(1, 5, 3, 5, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-2-feature-1',
						name: 'Fuse-Iron Rocket',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '5 damage; push 2',
								tier2: '8 damage; push 3',
								tier3: '10 damage; push 4'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Each enemy adjacent to the target before the forced movement takes 5 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-2-feature-2',
					name: 'Loyalty Collar',
					description: 'When the hunter-killer is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-3',
			name: 'War Dog Socialite',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 14,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 2, 4, 3, 5),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-3-feature-1',
						name: 'Call to Self-Sabotage',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: 'The target makes a free strike (tier 1 result) against themself',
								tier2: 'The target makes a free strike (tier 2 result) against themself',
								tier3: 'The target makes a free strike (tier 3 result) against themself'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Each enemy adjacent to the target before the forced movement takes 5 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-3-feature-2',
					name: 'Loyalty Collar',
					description: 'When the socialite is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-4',
			name: 'Castellan Hoplon',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 3,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(5, 2, 4, 3, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-4-feature-1',
						name: 'Inspiring Strike',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage',
								tier2: '20 damage; push 3',
								tier3: '24 damage; push 5'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Two allies within 10 squares of Hoplon each shift up to their speed, then can take the Defend main action or make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-4-feature-2',
						name: 'Summon the Onyx Tower',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** A 10-square-tall tower made of black stone shimmers into being in an unoccupied space that is 5 squares on a side. The tower has three floors, an entrance in the middle of each side on the ground floor, and a crenelated rooftop. Any war dog inside or adjacent to the tower has damage immunity 2 and regains 5 Stamina at the start of each of their turns, and war dogs inside the tower can observe through and have line of effect through its walls. This ability can be used only once per encounter.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-4-feature-3',
						name: 'Shield Warden',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: 'R < 3 taunted (EoT)',
								tier2: 'R < 4 taunted (EoT)',
								tier3: 'R < 5 taunted (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Until the start of Hoplon’s next turn, any enemy ability that includes him as a target takes a bane.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-4-feature-4',
						name: 'Timely Intervention',
						type: FactoryLogic.type.createTrigger('An enemy within 10 squares targets an ally with an ability.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Hoplon teleports to an unoccupied space adjacent to the enemy and becomes the new target of the ability. He can then make a free strike against the enemy, and if that enemy has <code>R < 4</code> they are taunted until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-4-feature-5',
					name: 'Hold the Line',
					description: 'Each ally within 3 squares of Hoplon has cover and damage immunity 2.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-4-feature-6',
					name: 'Loyalty Collar',
					description: 'The first time in an encounter that Hoplon is reduced to 0 Stamina, he instead has 1 Stamina and gains damage immunity 10 until the end of his next turn. When Hoplon is reduced to 0 Stamina again, each ally within 5 squares of him gains damage immunity 3 and deals an extra 5 damage on strikes, all until the end of the encounter.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-4th-4-feature-7',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Damage, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-5',
			name: 'Iron Champion Doru',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(5, 4, 1, 4, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-5-feature-1',
						name: 'Houndaxe',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage',
								tier2: '21 damage; Doru gains an edge on his next power rolls; M < 4 slide 3',
								tier3: '25 damage; Doru has a double edge on his next power roll; M < 5 slide 5'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The damage from this ability can’t be reduced in any way.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'This ability targets one additional target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-5-feature-2',
						name: 'Bloody Whirlwind',
						type: FactoryLogic.type.createMain(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '5 damage; A < 3 bleeding (save ends)',
								tier2: '11 damage; A < 4 bleeding (save ends)',
								tier3: '15 damage; A < 5 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability deals an extra 5 damage for each winded target in the area.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-5-feature-3',
						name: 'Hunting Leap',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature of object',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Doru jumps to an unoccupied space adjacent to the target, then can make a free strike against them. If the target is bleeding or winded, the distance of the ability becomes Ranged 10 and the free strike deals an extra 5 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-5-feature-4',
						name: 'Laugh It Off',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The triggering strike takes a bane and Doru gains an edge on his next power roll.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-5-feature-5',
					name: 'Iron Juggernaut',
					description: 'Doru can’t be made slowed or restrained. Additionally, he can move while grabbed, and a creature grabbing him moves along with him unless they let go.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-5-feature-6',
					name: 'The Scarless',
					description: 'Doru regains 10 Stamina at the start of each of his turns unless he took acid or fire damage since the start of his previous turn. Whenever he regains Stamina this way, the Director can spend 2 Malice to end one effect on Doru that can be ended by a saving throw.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-5-feature-7',
					name: 'Champion’s Loyalty Collar',
					description: 'When Doru is reduced to 0 Stamina, his loyalty collar explodes, dealing 20 damage to each enemy and object within 3 squares of him.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-6',
			name: 'Logostician Vesper',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10),
			stamina: 253,
			stability: 3,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 5, 4, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-6-feature-1',
						name: 'Portal to the Firing Line',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 3, within: 15 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** This ability targets only non-prone creatures.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '8 damage',
								tier2: '12 damage; I < 4 slowed (save ends)',
								tier3: '15 damage; I < 5 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** A target creature can choose to drop prone, in which case the ability takes a bane against them.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The area remains active until Vesper is reduced to 0 Stamina or until the end of the encounter. Any non-prone enemy who enters the area for the first time in a round or starts their turn there takes 15 damage, or 7 damage if they choose to fall prone.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-6-feature-2',
						name: 'Portal to the Mantle',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 15 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '8 fire damage',
								tier2: '12 fire damage',
								tier3: '15 fire damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The area is difficult terrain. Any creature who enters the area for the first time in a round or starts their turn there takes 10 fire damage. Until the end of the encounter, the size of the area increases by 1 at the start of each round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-6-feature-3',
						name: 'Portal to the Void',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, value2: 15 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: 'A < 4 pull 3 toward the center of the area',
								tier2: 'A < 5 pull 3 toward the center of the area',
								tier3: 'Pull 3 toward the center of the area'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** A portal appears at the center of the area. Any creature at the center of the area when this ability is used or who is pulled into the center for the first time in a round takes 10 sonic damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The area remains active and deals its damage until Vesper is reduced to 0 Stamina or until the end of the encounter. Any creature who enters the area and has <code>A < 4</code> is pulled 3 squares toward the center of the area. Any creature who starts their turn in the area and has <code>M < 4</code> is slowed until the end of their turn.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-6-feature-4',
						name: 'Portal to the Sky',
						type: FactoryLogic.type.createTrigger('The target moves within distance of Vesper'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The target is dropped through a portal, which teleports them up to 7 squares above a space within 15 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-6-feature-5',
					name: 'Living Logistics Network',
					description: 'Each ally who starts their turn within 10 squares of Vesper can teleport whenever they willingly move until the end of their turn. Whenever an affected ally teleports, they deal an extra 5 damage on their next strike.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-6-feature-6',
					name: 'Crash and Burn',
					description: 'When Vesper is reduced to 0 Stamina, they move up to their speed and then explode, dealing 4d6 damage to each adjacent enemy and object. Any enemy who takes more than 14 damage this way vertically slides 5 squares.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-7',
			name: 'Soulbinder Psyche',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(10, 'Fly, hover'),
			stamina: 220,
			stability: 1,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 3, 4, 5),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-1',
						name: 'Soulbind',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 holy damage; R < 3 the target is soulbound (save ends)',
								tier2: '20 holy damage; R < 4 the target is soulbound (save ends)',
								tier3: '24 holy damage; R < 5 the target is soulbound (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** A soulbound creature can’t benefit from edges or double edges, and can’t gain or use surges.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-2',
						name: 'Soulstorm',
						type: FactoryLogic.type.createMain(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '8 corruption damage; P < 3 weakened (EoT)',
								tier2: '12 corruption damage; P < 4 weakened (EoT)',
								tier3: '15 corruption damage; P < 5 weakened (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The area is difficult terrain until the start of Psyche’s next turn. At the start of each of her turns, Psyche can use a maneuver to maintain this effect, move the area up to 5 squares, and make the power roll against each creature in the area’s new location.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'Until the start of Psyche’s next turn, if this ability makes a creature weakened, that creature is also soulbound (save ends; see Soulbind above).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-3',
						name: 'Command the Awakened',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each soulbound enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target takes 5 damage from a self-inflicted wound, and if they have <code>M < 4</code> Psyche slides them up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-4',
						name: 'Spirit Form',
						type: FactoryLogic.type.createTrigger('An enemy moves within 2 squares of Psyche'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Psyche moves up to 5 squares, and has damage immunity 5 and ignores difficult terrain during this movement. The first time she moves through any creature during this movement, that creature takes 5 corruption damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-5',
						name: 'Vengence for the Slain',
						type: FactoryLogic.type.createTrigger('A war dog within distance is made winded or reduced to 0 Stamina', { free: true }),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The target loses all their surges and takes 5 corruption damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The target also takes a bane on their next strike.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-7-feature-6',
					name: 'Immortal Soul',
					description: 'When Psyche is reduced to 0 Stamina, her spirit surrounds the nearest war dog, who has damage immunity 2, deals an extra 5 damage on strikes, and can use the Immortal Flare maneuver until the end of the encounter. That war dog also gains the Immortal Soul trait, and transfers this effect to the nearest war dog when they die.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-7-feature-7',
						name: 'Immortal Flare',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The target takes 10 psychic damage.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4th-8',
			name: 'Strategos Alkestis',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(4, 4, 5, 5, 5),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-1',
						name: 'Houndgun and Houndblade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage; M < 4 bleeding (save ends)',
								tier2: '21 damage; M < 5 bleeding (save ends)',
								tier3: '25 damage; M < 6 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Each target loses 1d3 Recoveries.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'When a target is made bleeding this way, each ally adjacent to them can make a free strike against the target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-2',
						name: 'Focus Fire',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Until the start of Alkestis’s next turn, any effect that reduces the damage taken by the target has no effect.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-3',
						name: 'Artillery Enfilade',
						type: FactoryLogic.type.createTrigger('An ally is reduced to 0 Stamina within 10 squares of Alkestis.'),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 7, value2: 3, within: 10 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '8 damage; A < 4 slowed (save ends)',
								tier2: '13 damage; A < 5 slowed (save ends)',
								tier3: '16 damage; A < 6 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The area is difficult terrain until the start of the next round.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-8-feature-4',
					name: 'End Effect',
					description: 'At the end of each of her turns, Alkestis can take 20 damage to end one effect on her that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4th-8-feature-5',
					name: 'Tactical Brilliance',
					description: 'At the start of each of Alkestis’s turns, the Director gains 2 Malice. While Alkestis is alive and in the encounter, the Director also gains 1 Malice whenever a war dog in the encounter obtains a tier 3 outcome on a power roll.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-6',
						name: 'Fog of War',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [],
						distance: [ FactoryLogic.distance.createSpecial('') ],
						target: 'Each ally in the encounter',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target can disappear, then reappear anywhere on the encounter map 3 or more squares away from any enemy. Additionally, each target has a double edge on their next power roll.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-7',
						name: 'Send in the Second Wave',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** For each war dog reduced to 0 Stamina in the encounter, a war dog shriketrooper appears in an unoccupied space within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4th-8-feature-8',
						name: 'The Silver Wolf’s Final Stratagem',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Until the start of the next round, each target enemy who has <code>I < 4</code> is dazed, each target enemy who has <code>M < 4</code> is restrained, and each target enemy who has <code>A < 4</code> can’t use triggered actions. Additionally, until the end of the encounter, Alkestis and each target ally have damage immunity 3 and deal an extra 5 damage with strikes.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
