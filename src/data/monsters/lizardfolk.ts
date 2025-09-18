import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const lizardfolk: MonsterGroup = {
	id: 'monster-group-lizardfolk',
	name: 'Lizardfolk',
	description: `
Lizardfolk prefer warm, tropical climates, but they’re willing to settle in any humid region—the more moisture in the air, the better. Even in colder environs, lizardfolk can be found in any sufficiently marshy environment. Bogs and wetlands are particularly common nesting grounds.`,
	picture: null,
	information: [
		{
			id: 'lizardfolk-info-1',
			name: 'Homeland Protectors',
			description: `
Lizardfolk aren’t especially hostile unless they feel their territory is threatened—which it often is. Respectful travelers entering lizardfolk territory, however, find no great hardship. Lizardfolk cultures often focus on a specific trade, such as boat building, fletching, navigating, or weaving, and sell their services to travelers in need, including lizardfolk from other places.

Adventurers often cross paths with lizardfolk while trekking through their homelands. The reptilian humanoids watch travelers who skirt too close to sources of food and shelter, attacking those who take more than they need. Many lizardfolk dwell in abandoned ruins and caverns for protection. Treasure seekers who delve into these places are typically given one warning before the attack begins.`
		},
		{
			id: 'lizardfolk-info-2',
			name: 'Focused and Loyal',
			description: 'Most lizardfolk speak plainly, viewing blunt honesty as a sign of respect. When they make a vow or personal promise, they do all they can to honor that word. Lizardfolk who swear to destroy an enemy follow their quarry to the ends of the earth.'
		},
		{
			id: 'lizardfolk-info-3',
			name: 'Marshland Tyrants',
			description: 'In times of crisis, such as a food shortage, an evil lizardfolk leader can exploit the emergency, oppressing others in the name of defending their territory. But there are always other local lizardfolk tribes who oppose such aggressive, expansionist posturing, and they often seek the aid of other folk who value freedom from tyranny.'
		},
		{
			id: 'lizardfolk-info-4',
			name: 'Lizardfolk Tactics',
			description: `
Lizardfolk prefer to fight in or near water whenever they can, and if they aren’t on a battlefield with water, they perform delaying actions to buy time while they flood the battlefield with their Malice features before attacking with full force. If water is already present, they focus on positioning in the early battle to surround and split up their opponents.

With a wide array of strong grab and forced movement abilities, lizardfolk tactics are that of divide and conquer, locking down strong defenders while abducting and isolating backline heroes. Lizardfolk also have strong teamwork features and rotate units who have lost their tails to more rear positions in favor of healthier units.

**Lizardfolk Sample Encounters**
- **Marsh Hunters, 18 EV**: Eight shellguard, eight tonguers, one scaletooth
- **Ambushers, 24 EV**: Sixteen grunts, two skyterrors
- **Scalesworn Detachment, 30 EV**: Eight shellguard, sixteen tonguers, one scaletooth, two bloodeyes
- **War Party, 48 EV**: Eight shellguard, eight grunts, eight tonguers, one scaletooth, one skyterror, one bloodeye, one deathrex`
		},
		{
			id: 'lizardfolk-info-5',
			name: 'Lizardfolk Languages',
			description: 'Most lizardfolk speak Caelian and their own dialect of Khamish.'
		}
	],
	malice: [
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'lizardfolk-malice-1',
				name: 'Net Trap',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 3 }) ],
				target: 'Special',
				cost: 3,
				sections: [
					FactoryLogic.createAbilitySectionText('A lizardfolk acting this turn sets up a net trap into the area. The first time an enemy steps into a square with a net trap, they make an Agility test. If the creature was unaware of the trap, they take a bane on the test.'),
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Agility ],
							tier1: 'Restrained (save ends).',
							tier2: 'Restrained (EoT).',
							tier3: 'No effect.'
						})
					),
					FactoryLogic.createAbilitySectionText('Any creature not also restrained by a net trap who is adjacent to a creature restrained by the trap can free them as a maneuver.')
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'lizardfolk-malice-2',
			name: 'Water Pit',
			cost: 5,
			sections: [
				'A lizardfolk acting this turn unearths a magical size 2 pit that is 2 squares deep and filled with water. Any lizardfolk who moves into, then exits the pit on their turn gains 10 temporary Stamina, regrows their tail if applicable, and ends one effect on them that can be ended by a saving throw.',
				'While adjacent to the pit, any creature who can burrow or who has the Nature skill can make a **Might test** or a **Reason test** to drain it.',
				FactoryLogic.createPowerRoll({
					tier1: 'The creature falls into the pit and is knocked prone.',
					tier2: 'The creature fails to empty the pit.',
					tier3: 'The pit empties of water.'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lizardfolk-malice-3',
			name: 'Flood the Shores',
			cost: 7,
			sections: [
				'Waist-high water floods the entire encounter map. Any lizardfolk submerged in water gains an edge on abilities and doubles their speed while swimming. If there are no open water pits on the encounter map, the water drains away at the end of the round.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'lizardfolk-1',
			name: 'Lizardfolk Grunt',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 3,
			speed: FactoryLogic.createSpeed(6, 'swim'),
			stamina: 4,
			stability: 0,
			size: FactoryLogic.createSize(1, 'M'),
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-1-feature-1',
						name: 'Snap and Toss',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage; slide 2',
								tier3: '3 damage; slide 2'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-1-feature-2',
					name: 'Reptilian Escape',
					description: 'While the grunt has a tail, whenever they are grabbed, prone, slowed, or weakened, they can lose their tail to immediately end that condition, then shift up to 2 squares.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-2',
			name: 'Lizardfolk Shellguard',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 3,
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 6,
			stability: 1,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to Stamina',
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-2-feature-1',
						name: 'Shield Smash',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							})),
							FactoryLogic.createAbilitySectionText('The target takes a bane on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-2-feature-2',
					name: 'Reptilian Escape',
					description: 'While the shellguard has a tail, whenever they are grabbed, prone, slowed, or weakened, they can lose their tail to immediately end that condition, then shift up to 2 squares.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-3',
			name: 'Lizardfolk Tonguer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 3,
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 3,
			stability: 0,
			size: FactoryLogic.createSize(1, 'S'),
			freeStrikeDamage: 2,
			withCaptain: '+1 bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-3-feature-1',
						name: 'Tonguelash',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(8) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage; pull 1, or the tonguer can shift 1 square toward the target',
								tier2: '4 damage; pull 2, or the tonguer shifts up to 2 squares toward the target',
								tier3: '5 damage; pull 3, or the tonguer shifts up to 3 squares toward the target'
							})),
							FactoryLogic.createAbilitySectionText('If the forced movement or the shift leaves the target adjacent to the tonguer, the target is also grabbed.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-3-feature-2',
					name: 'Reptilian Escape',
					description: 'While the tonguer has a tail, whenever they are grabbed, prone, slowed, or weakened, they can lose their tail to immediately end that condition, then shift up to 2 squares.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-4',
			name: 'Lizardfolk Bloodeye',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 20,
			stability: 0,
			size: FactoryLogic.createSize(1, 'M'),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 1, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-4-feature-1',
						name: 'Bola Knock',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; A<0 restrained (save ends)',
								tier2: '7 damage; A<1 restrained (save ends)',
								tier3: '9 damage; A<2 restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-4-feature-2',
						name: 'Bloodshot',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 acid damage; m<0 the target has line of effect only within 4 squares (save ends)',
								tier2: '7 acid damage; m<1 the target has line of effect only within 3 squares (save ends)',
								tier3: '9 acid damage; m<2 the target has line of effect only within 2 squares (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-4-feature-3',
					name: 'Reptilian Escape',
					description: 'While the bloodeye has a tail, whenever they are grabbed, prone, slowed, or weakened, they can lose their tail to immediately end that condition, then shift up to 2 squares.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-5',
			name: 'Lizardfolk Scaletooth',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 46,
			stability: 0,
			size: FactoryLogic.createSize(1, 'M'),
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-5-feature-1',
						name: 'Razor Bite',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage',
								tier3: '12 damage; A<2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the scaletooth has the target grabbed, the potency of this ability increases by 1.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-5-feature-2',
						name: 'Tail Whip',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; slide 1',
								tier2: '8 damage; slide 2; M<1 grappled if within 2 squares of the scaletooth',
								tier3: '10 damage; slide 3; M<2 grappled if within 2 squares of the scaletooth'
							})),
							FactoryLogic.createAbilitySectionText('The scaletooth needs their tail to use this ability. The scaletooth can’t grapple more than one creature or object with this ability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-5-feature-3',
					name: 'Reptilian Escape',
					description: 'While the scaletooth has a tail, whenever they are grabbed, prone, slowed, or weakened, they can lose their tail to immediately end that condition, then shift up to 2 squares.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-6',
			name: 'Lizardfolk Skyterror',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(7, 'swim'),
			stamina: 30,
			stability: 0,
			size: FactoryLogic.createSize(1, 'S'),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-6-feature-1',
						name: 'Glaive Rush',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage',
								tier2: '7 damage',
								tier3: '9 damage; prone'
							})),
							FactoryLogic.createAbilitySectionText('If the skyterror is flying, they shift up to 4 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-6-feature-2',
						name: 'Poison Blowdart',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage; M<0 weakened (save ends)',
								tier2: '5 damage; M<1 weakened (save ends)',
								tier3: '7 damage; M<2 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Any creature who ends their turn adjacent to a target weakened this way is weakened until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-6-feature-3',
					name: 'Glider',
					description: 'Whenever the skyterror moves 2 or more squares along the ground or falls 2 or more squares, they can fly until the end of their next turn.'
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-6-feature-4',
					name: 'Reptilian Escape',
					description: 'While the skyterror has a tail, whenever they are grabbed, prone, slowed, or weakened, they can lose their tail to immediately end that condition, then shift up to 2 squares.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-7',
			name: 'Lizardfolk Deathrex',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 12,
			speed: FactoryLogic.createSpeed(5, 'climb, swim'),
			stamina: 80,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-1',
						name: 'Ripper Spear',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 damage; pull 1; A<1 bleeding (save ends)',
								tier2: '10 damage; pull 1; A<2 bleeding (save ends)',
								tier3: '12 damage; pull 2; A<3 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'One target adjacent to the deathrex is grabbed in the deathrex’s mouth.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-2',
						name: 'Death Roll',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One grabbed creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage; M<1 dazed (save ends)',
								tier2: '12 damage; M<2 dazed (save ends)',
								tier3: '15 damage; M<3 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The target is no longer grabbed by the deathrex, and the deathrex slides them up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-3',
						name: 'Trundle',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The deathrex moves up to their speed. They can make a free strike against each creature who makes an opportunity attack against them during this movement.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-4',
						name: 'Swat the Fly',
						type: FactoryLogic.type.createTrigger('A creature or object within distance moves or shifts away from the deathrex.'),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The deathrex slides the target up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-5',
						name: 'Snack Attack',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target moves up to their speed and can make a free strike. Each target gains temporary Stamina equal to the damage they deal.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-6',
						name: 'Shed Some Skin',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The deathrex shifts up to their speed, leaving behind a shed skin duplicate in the space they started in. The duplicate acts on the deathrex’s turn and has the deathrex’s characteristics, but has 10 Stamina and no villain actions.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-7',
						name: 'Thresher Thrasher',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target moves up to their speed. Until the end of the encounter, whenever a creature comes adjacent to a target or starts their turn there, the target can make a free strike against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-7-feature-8',
					name: 'Rex Reptilian Escape',
					description: 'While the deathrex has a tail, whenever they are affected by an effect that can be ended by a saving throw or that ends at the end of their turn, they can lose their tail to immediately end that effect, then shift up to 2 squares.'
				})
			]
		})
	],
	addOns: []
};
