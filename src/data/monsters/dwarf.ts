import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const dwarf: MonsterGroup = {
	id: 'monster-group-dwarf',
	name: 'Dwarf',
	description: `
Possessed of a strength that belies their size, dwarves have flesh infused with stone—a silico-organic hybrid that makes them physically denser than humans or elves. They enjoy a reputation in Orden as savvy engineers and technologists thanks to the lore they inherited from their elder siblings, the long-extinct steel dwarves.

They are the children of the Elder God Ord. A common phrase among the dwarves is “Ord made the world.” Their way of saying, “What will be, will be.” Dwarves take great pride in knowing that along with Aan, Eth, and Kul, their god created the mundane world, and many dwarves leave their homes to see the world and seek glory in Ord’s name.`,
	picture: null,
	information: [
		{
			id: 'dwarf-info-1',
			name: 'Tools of the Trade',
			description: `
Those raised within dwarven enclaves have a relationship with technology not found in many other places on Orden. The gifts of the steel dwarves are many in number, but the most prominent is that of pneumatic steam power.

Dwarves have incorporated steam into much of their warfare and weaponry, making them deadly opponents. But like all technology, it’s a double-headed hammer. As much as they use steam for destruction, construction is where it truly shines. Creating the formidable and brutalist facades common to dwarven architecture is made much easier with the use of tools designed to utilize pneumatic power. Some of the larger and more metropolitan dwarven cities are rumored to power wealthier districts using steam from geothermal vents.`
		},
		{
			id: 'dwarf-info-2',
			name: 'Innovative Operation',
			description: `
The dwarves have yet to crack all the secrets of the valok, the autonomous machines that were their ancestors’ greatest achievement, but they’ve made great strides in researching them. They’ve innovated ways to repurpose, recycle, and reverse engineer (to a limited degree) valok assemblage, giving rise to a new multifaceted occupation: the operator.

Operators now span the world and come from all walks of life, but the first among them were dwarves who built powered suits from excavated valok parts. These suits were initially used for construction and utility purposes, but can be repurposed and refitted for warfare when the need arises.

Word of these wonderous dwarven creations quickly spread among the tunnels of the underground, and up into the overworld. This led to a brief arms race where artisans, craftspeople, and smiths from all over were commissioned by wealthy rulers and aristocrats to create mechanized suits to bolster their armies and personal guard.`
		},
		{
			id: 'dwarf-info-3',
			name: 'The Press-Gangs of Kas Kalavar',
			description: `
Before Ajax came to power, the dwarves of Kal Kalavar were renowned for their disciplined constabulary. The constables were kind, kept order, and kept the city safe.

But now, the dwarves of Kal Kalavar have submitted to Ajax’s rule and pay him tribute in prisoners. Ajax has need of bodies, to be used as either forced labor or as fodder for the Body Banks, whether to make war dogs or grant eternal life to those in Ajax’s favor. Most dwarves don’t like this deal, but the press-gangs are committed to their work.

The marauder lords who lead the press-gangs make use of salvaged valok communication arrays that they wear like a mohawk on their heads. The array gives them access to magnetomancy, allowing them to shape and levitate metal, including wielding multiple axes in battle.`
		},
		{
			id: 'dwarf-info-4',
			name: 'Servitor War Walkers',
			description: 'The war walker is a common sight in both dwarven armies and dwarven cities. They vary widely in appearance and make, ranging from cobbled-together heaps of belts, gears, and plates to elegant and sleek marvels of dwarven engineering. In battle, war walkers carry multiple dwarves and keep foes at a distance. In society, they’re used for public transit and accessibility needs within dwarven cities.'
		},
		{
			id: 'dwarf-info-5',
			name: 'Stone Whisperers',
			description: `
Some dwarves are born with an innate talent to communicate with stone. Young dwarves identified with this gift are taken to a secretive enclave where they are trained to manipulate the movement and shape of stones using only whispers. The stone whispering technique is a deadly and quiet force in battle, and often the rumble of stone is the only precursor to an enemy’s crushing defeat.

Legends speak of stone singers, dwarves who could move mountains with their song. However, those same legends tell a tale of two stone singers who harmonized their voices and nearly ended the world. This is why today’s stone whisperers stay quiet, afraid of their own potential.`
		},
		{
			id: 'dwarf-info-6',
			name: 'Dwarf Languages',
			description: 'Most dwarves speak Caelian and Zaliac.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dwarf-malice-1',
			name: 'Breaching Charge',
			cost: 3,
			repeatable: true,
			sections: [
				'A dwarf can destroy one adjacent object or square of wall for each 3 Malice spent. Each enemy adjacent to the destroyed object or square takes the object’s Stamina in damage (3 for wood, 6 for stone, or 9 for metal).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dwarf-malice-2',
			name: 'Rappelling Barrage',
			cost: 5,
			sections: [
				'Each dwarf acting this turn can automatically climb at full speed while moving. At any point during this movement, they can make a free strike.'
			]
		}),
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'dwarf-malice-3',
				name: 'Snaring Line',
				type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Non-minion' ] }),
				cost: 7,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 10, within: 10 }) ],
				target: 'Each enemy in the area',
				sections: [
					FactoryLogic.createAbilitySectionText('Each target makes an **Agility test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Agility,
						tier1: '8 damage; restrained (EoT)',
						tier2: '6 damage; slowed (EoT)',
						tier3: 'No effect'
					})),
					FactoryLogic.createAbilitySectionText('The snaring line remains until the end of the encounter. Any enemy who moves into the area for the first time in a round or starts their turn there must make the test.'),
					FactoryLogic.createAbilitySectionText('**Special:** This ability can’t be used by a minion.')

				]
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'dwarf-1',
			name: 'Dwarf Axethrower',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 2,
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to Stamina',
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-1-feature-1',
						name: 'Whistling Axes',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage; an ally adjacent to the target can make a free strike'
							})),
							FactoryLogic.createAbilitySectionText('The target can’t use triggered actions until the start of the next round.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-2',
			name: 'Dwarf Catchpole',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 2,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to Stamina',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-2-feature-1',
						name: 'Maul',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage; grabbed or prone'
							})),
							FactoryLogic.createAbilitySectionText('If the target is restrained, they take an extra 2 damage.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-3',
			name: 'Dwarf Driver',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 6,
			stability: 1,
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to Stamina',
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-3-feature-1',
						name: 'Handaxes',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage; push 1',
								tier2: '2 damage; push 2',
								tier3: '3 damage; push 4'
							})),
							FactoryLogic.createAbilitySectionText('A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-4',
			name: 'Dwarf Hunter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Support),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 6,
			stability: 1,
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to Stamina',
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-4-feature-1',
						name: 'Snaring Javelin',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage; pull 1',
								tier2: '2 damage; pull 2',
								tier3: '3 damage; pull 4'
							})),
							FactoryLogic.createAbilitySectionText('A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-5',
			name: 'Dwarf Gunner',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Artillery),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 26,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-5-feature-1',
						name: 'Portable Ballista',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage; push 1',
								tier2: '9 damage; push 3',
								tier3: '12 damage; push 5'
							})),
							FactoryLogic.createAbilitySectionText('If the target is adjacent to an object or a wall after the power roll is resolved, they are restrained until the end of their next turn. A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'If the target is pushed into another creature, the target and the creature are each restrained until the end of their next turn.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-5-feature-2',
						name: 'Ensnaring Chains',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One prone, restrained, or slowed creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The gunner makes a free strike against the target, and the prone, restrained, and slowed conditions on the target end. The target is then restrained (save ends).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-5-feature-3',
					name: 'Split Shot',
					description: 'Whenever the gunner deals rolled damage to a target, one creature or object adjacent to the target takes 3 damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-6',
			name: 'Dwarf Launcher',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 39,
			stability: 3,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-6-feature-1',
						name: 'Concussive Grenade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage; push 1',
								tier2: '6 damage; push 3; M<1 slowed (save ends)',
								tier3: '8 damage; push 3; M<2 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-6-feature-2',
						name: 'Sleep Grenade',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 poison damage; I<0 dazed (save ends)',
								tier2: '6 poison damage; I<1 dazed (save ends)',
								tier3: '8 poison damage; I<2 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target dazed this way treats their characteristic scores as 1 lower for the purpose of resisting potencies.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-6-feature-3',
					name: 'Indirect Fire',
					description: 'The launcher ignores concealment and cover, and doesn’t need line of effect to use their abilities as long as a size 1 opening exists between the dwarf and the target.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-7',
			name: 'Dwarf Reel Winch',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 36,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-6-feature-1',
						name: 'Snaring Crossbow',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; M<2 slowed (save ends)',
								tier2: '7 damage; M<2 slowed (save ends)',
								tier3: '9 damage; M<2 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The target is pulled up to 5 squares. A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-6-feature-2',
						name: 'Reel Them In',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is pulled up to 8 squares. A restrained or slowed target can be pulled an additional 2 squares. A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-6-feature-3',
					name: 'We Have a Quota!',
					description: 'If a target made slowed by the reel winch is already grabbed or slowed, the grabbed and slowed conditions end and the target is restrained (save ends).'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-8',
			name: 'Dwarf Shieldwall',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 72,
			stability: 4,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-8-feature-1',
						name: 'Wide Axe',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; slide 1',
								tier2: '10 damage; slide 1',
								tier3: '13 damage; slide 1'
							})),
							FactoryLogic.createAbilitySectionText('The shieldwall can shift 1 square to remain adjacent to the target. A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'This ablitiy targets one additional target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-8-feature-2',
						name: 'Intercepting Shield',
						type: FactoryLogic.type.createTrigger('A creature makes a strike against an ally adjacent to the shieldwall.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The shieldwall becomes the target of the triggering strike and halves the damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-8-feature-3',
					name: 'Call to the Wall',
					description: 'Whenever a creature deals damage to or takes damage from the shieldwall, the shieldwall can make that creature taunted until the end of the creature’s next turn.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-9',
			name: 'Dwarf Stone Whisperer',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'burrow'),
			stamina: 52,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 2, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-9-feature-1',
						name: 'Tile Slide',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; slide 1; M<0 slowed (save ends)',
								tier2: '8 damage; slide 3; M<1 slowed (save ends)',
								tier3: '11 damage; slide 5; M<2 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-9-feature-2',
						name: 'Stone Wave',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage; push 2; R<1 slowed (save ends)',
								tier2: '6 damage; push 3; R<2 slowed (save ends)',
								tier3: '9 damage; push 3; R<3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain for enemies. A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-9-feature-3',
					name: 'Stonewalker',
					description: 'Whenever the stone whisperer willingly moves, they can phase through up to 2 squares of stone as part of that movement. If they end their movement inside stone, they are shunted out into the space from which they entered it.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-10',
			name: 'Dwarf Trapper',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 36,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-10-feature-1',
						name: 'Concussive Bolts',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; push 2',
								tier2: '7 damage; push 4',
								tier3: '9 damage; push 6'
							})),
							FactoryLogic.createAbilitySectionText('A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-10-feature-2',
						name: 'Steam-Powered Snare',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a **Might test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Might,
								tier1: '7 damage; restrained (EoT)',
								tier2: '5 damage; slowed (EoT)',
								tier3: 'No effect'
							})),
							FactoryLogic.createAbilitySectionText('The snare remains until the end of the encounter. Any enemy who moves into the area for the first time in a round or starts their turn there must make the test.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-11',
			name: 'Dwarf Warden',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 59,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-11-feature-1',
						name: 'Concussive Maul',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; push 1',
								tier2: '10 damage; push 3',
								tier3: '13 damage; push 5; M<2 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-11-feature-2',
						name: 'Concussive Shockwave',
						type: FactoryLogic.type.createMain(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; push 2; A<0 slowed (save ends)',
								tier2: '8 damage; push 2; A<1 slowed (save ends)',
								tier3: '11 damage; push 2; A<2 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-11-feature-3',
					name: 'Escort the Prisoners',
					description: 'Whenever the warden moves, they can carry an adjacent restrained enemy as if the enemy were grabbed by them.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-12',
			name: 'Dwarf Marauder Lord',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 132,
			stability: 4,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 0, 2, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-12-feature-1',
						name: 'Levitating Axes',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage; slide 1',
								tier2: '12 damage; slide 3',
								tier3: '15 damage; slide 5'
							})),
							FactoryLogic.createAbilitySectionText('target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'A target force moved adjacent to an ally of the marauder lord is restrained until the end of their next turn.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-12-feature-2',
						name: 'Magnetomancy',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The target vertical slides up to 5 squares. A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'This ability takes the Area keyword and loses the Ranged keyword, its distance becomes a 10 burst, and it targets each restrained creature in the area.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-12-feature-3',
						name: 'Your Weapon Is Useless',
						type: FactoryLogic.type.createTrigger('A creature makes a melee strike against the target.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target halves any damage from the strike and the triggering creature takes 4 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-12-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the marauder lord can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-12-feature-5',
						name: 'Ajax Will Pay Well for These Specimens',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The marauder lord uses Levitating Axes against each target, making one power roll against all targets.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-12-feature-6',
						name: 'Don’t Let Them Escape!',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed. The marauder lord then uses Levitating Axes.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-12-feature-7',
						name: 'Test Your Metal!',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The marauder lord creates three size 2 metal objects in unoccupied spaces within distance. Whenever the marauder lord uses Magnetomancy, they can additionally target one of these objects.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-13',
			name: 'Servitor War Worker',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Construct', 'Dwarf' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(8, 'climb'),
			stamina: 60,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, 0, -2, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-13-feature-1',
						name: 'Grasping Claws',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '8 damage',
								tier3: '12 damage; M<2 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target already restrained or restrained by this ability is pulled up to 3 squares. A target restrained by a dwarf can be force moved by this ability. This forced movement doesn’t end the restrained condition unless the Director determines otherwise.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-13-feature-2',
						name: 'Stunning Blast',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 lightning damage; A<0 slowed (save ends)',
								tier2: '6 lightning damage; A<1 slowed (save ends)',
								tier3: '8 lightning damage; A<2 slowed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-13-feature-3',
					name: 'Cupola',
					description: 'While riding the war walker, three size 1 allies can occupy the same space. Creatures riding the war walker have cover.'
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-13-feature-4',
					name: 'Mobile Prison Harness',
					description: 'Any restrained or slowed creature who comes adjacent to the war walker is automatically restrained (save ends) and takes a bane on power rolls. A creature restrained this way moves with the war walker.'
				})
			]
		})
	],
	addOns: []
};
