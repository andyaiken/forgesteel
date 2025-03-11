import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const elfShadow: MonsterGroup = {
	id: 'monster-group-elf-shadow',
	name: 'Elf, Shadow',
	description: 'Long ago, the shadow elves of the manifold Equinox committed the Great Sin and for their impunity were exiled to Orden. The descendants of those elves now skulk about the World Below, searching for a means to return to their home.',
	information: [
		{
			id: 'elf-shadow-info-1',
			name: 'In Equinox\'s Shadow',
			description: 'Shadow elves are lit by an unseen sun. In places like Orden, they appear washed out, silhouetted, or grayscale.  In Equinox, they lived in the shadow of their manifold’s eternal dusk, making them incompatible with other light sources. Their skills, magic, and weapons do not fare well in the sun. However, this does allow them to blend in with existing darkness and dissolve out of sight.'
		},
		{
			id: 'elf-shadow-info-2',
			name: 'Manifold Weaponry',
			description: 'The shadow elves have mastered the art of combining deep, ancient magic with cutting-edge technology. The closest they’ve gotten to reconnecting with their home is through their manifold weapons, blades crafted of shadow that strike and wound in many dimensions at once. A creature hit by one of these blades is injured in multiple worlds at a time. Only one of strong mind can compartmentalize and end these effects on their body in the here and now.'
		},
		{
			id: 'elf-shadow-info-3',
			name: 'Brush Stalkers',
			description: `
When the shadow elves were exiled from Equinox, many left on ancient beasts known as brush stalkers, quadrupedal beasts that carry entire ecosystems on their rack of antlers. Brush stalkers cannot reproduce unless they are in Equinox, so the ones who still walk with Shadow elves are old indeed: overgrown with bioluminescent moss, cracks on their ancient cloven hooves. 

A brush stalker’s glamor allows it to look just like a normal deer. But when the glamour is off, the creature devours the light around it and plunges its surroundings into darkness.`
		},
		{
			id: 'elf-shadow-info-4',
			name: 'Fractured Factions',
			description: `
Almost immediately upon arrival in The World Below, the shadow elves developed wildly different ideas for what to do about it. Some want desperately to return, while others seek to assimilate into their new home. As generations come and go, and memories of Equinox are lost to time, the shadow elves who have not yet carved a new place for themselves grow anxious. 

One particularly fanatical sect has made it to Orden and mold the manifold in Equinox’s image. They believe their home is lost to them forever, and their only recourse is to blot out Orden’s sun and make a new one. `
		},
		{
			id: 'elf-shadow-info-5',
			name: 'Dusk Calling',
			description: `
Certain shadow elf warriors have a natural link to the unseen cosmos by which they are lit. With this link, a warrior can perform the Call: a mix of humming and throat singing that aligns celestial bodies across manifolds. This can temporarily induce an eclipse on the manifold in which the Caller is performing, allowing their comrades to gain the advantage. 

A skilled duskcaller can lead a band in a group Call, which is powerful enough to recreate the conditions of Equinox for a short time. Some shadow elf factions are researching this connection in earnest, considering it a viable step towards terraforming a second Equinox. `
		},
		{
			id: 'elf-shadow-info-6',
			name: 'Shadow Tactics',
			description: `
Since shadow elves have no permanent home, their military strength typically emphasizes both impenetrable defense and a swift and decisive offense. Since they cannot benefit from a home advantage, all warriors are taught to create one. If there are no places to hide, create them. If the light is too bright, remove it.  

In many shadow elf societies, all people are given at least basic combat training and are expected to serve at least one military tour in their life. Those who excel move on to become duskcallers, mournblades, and eclipses: paragons of strength who are venerated by the people. Research and discovery are employed for the primary purpose of furthering military goals. Even the popular children’s game hide and seek is a military device created to prepare a people for constant, imminent conflict.`
		},
		{
			id: 'elf-shadow-info-7',
			name: 'Shadow Elf Languages',
			description: 'Most shadow elves speak Variac and Illyvric, though platoon leaders may speak some Caelian or Hyrallic. '
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'elf-shadow-malice-1',
			name: 'Watch Me Disappear',
			cost: 3,
			sections: [
				'All shadow elves acting on this turn can hide as a free maneuver while concealed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'elf-shadow-malice-2',
			name: 'Extra Dimension',
			cost: 5,
			sections: [
				'All shadow elves acting on this turn inﬂict I<2 bleeding (save ends) or slowed (save ends) on their strikes, even if their attacks already inﬂict a condition.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'elf-shadow-malice-3',
			name: 'Home is Where the Hurt is',
			cost: 7,
			sections: [
				'The shadow elves synthesize a concentrated pocket manifold reminiscent of Equinox and graft it onto the encounter map. Until the end of the encounter, all creatures can see shadow elves in full color, and shadow elves no longer beneﬁt from their Of the Umbra ability. The potency of all shadow elf abilities increases by 2, and a creature needs an 8 or higher to end a save ends eﬀect inﬂicted by a shadow elf, as they are impacted by the condition across two worlds.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'elf-shadow-1',
			name: 'Shadow Elf Cloak',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8, 'climb'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(3, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-1-feature-1',
						name: 'Stick and Poke',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '6 damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-1-feature-2',
					name: 'Of the Umbra',
					description: 'The cloak ignores concealment granted by darkness. While the cloak is in direct sunlight, they have damage weakness 3. While the cloak is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-2',
			name: 'Shadow Elf Dusk Mage',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 3, 2, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-2-feature-1',
						name: 'Gloom Strike',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 damage',
							tier2: '4 damage; A<2 slowed (save ends)',
							tier3: '6 damage; A<3 slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-2-feature-2',
					name: 'Of the Umbra',
					description: 'The dusk mage ignores concealment granted by darkness. While the dusk mage is in direct sunlight, they have damage weakness 3. While the dusk mage is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-3',
			name: 'Shadow Elf Nightstrike',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-3-feature-1',
						name: 'Vault',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}),
						effect: 'The nightstrike leaps over the target, shifting into an unoccupied square adjacent to the target opposite from their starting position.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-3-feature-2',
					name: 'Of the Umbra',
					description: 'The nightstrike ignores concealment granted by darkness. While the nightstrike is in direct sunlight, they have damage weakness 3. While the nightstrike is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-4',
			name: 'Shadow Elf Sniper',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +2',
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-4-feature-1',
						name: 'Neon Arrow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(7) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}),
						effect: 'The next strike made against the target has an edge.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-4-feature-2',
					name: 'Of the Umbra',
					description: 'The sniper ignores concealment granted by darkness. While the sniper is in direct sunlight, they have damage weakness 3. While the sniper is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-5',
			name: 'Shadow Elf Assassin',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Artillery),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 70,
			stability: 0,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(0, 3, 2, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-5-feature-1',
						name: 'Neon Assault',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 damage',
							tier2: '15 damage',
							tier3: '18 damage'
						}),
						effect: 'The next ability made against the target has a double edge.',
						spend: [
							{ value: 5, effect: 'Each ally within 5 of the target makes a free strike against them.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-5-feature-2',
						name: 'Splitbow',
						type: FactoryLogic.type.createAction(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 4, within: 10 }) ],
						target: 'All enemies in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 damage; I<1 bleeding (save ends)',
							tier2: '10 damage; I<2 bleeding (save ends)',
							tier3: '12 damage; I<3 bleeding (save ends)'
						}),
						effect: 'Push 4.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-5-feature-3',
					name: 'Of the Umbra',
					description: 'The assassin ignores concealment granted by darkness. While the assassin is in direct sunlight, they have damage weakness 3. While the assassin is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-6',
			name: 'Shadow Elf Dark Knight',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 70,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 3, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-6-feature-1',
						name: 'Suffusing Strike',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 corruption damage',
							tier2: '7 corruption damage; R<2 taunted (EoT)',
							tier3: '9 corruption damage; R<3 taunted (EoT)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-6-feature-2',
						name: 'Trick of the Eye',
						type: FactoryLogic.type.createTrigger('An enemy within distance makes a strike against the target.'),
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '1 ally',
						effect: 'The damage is halved. The dark knight takes the other half of the damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-6-feature-3',
					name: 'Of the Umbra',
					description: 'The dark knight ignores concealment granted by darkness. While the dark knight is in direct sunlight, they have damage weakness 3. While the dark knight is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-7',
			name: 'Shadow Elf Duskcaller',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(0, 3, 3, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-7-feature-1',
						name: 'Night Knife',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage',
							tier3: '16 damage'
						}),
						effect: 'The duskcaller can target an additional creature or object while concealed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-7-feature-2',
						name: 'Shadesong',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 3 }) ],
						target: 'Special',
						effect: 'The affected area is covered in darkness and is considered concealment until the start of the duskcaller’s next turn.',
						spend: [
							{ value: 2, effect: 'The area of the cube increases by 3' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-7-feature-3',
					name: 'Of the Umbra',
					description: 'The duskcaller ignores concealment granted by darkness. While the duskcaller is in direct sunlight, they have damage weakness 3. While the duskcaller is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-8',
			name: 'Shadow Elf Luminator',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 1, 3, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-8-feature-1',
						name: 'Neon Mark',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 lightning damage',
							tier2: '12 lightning damage',
							tier3: '15 lightning damage'
						}),
						effect: 'The next strike against the target deals an additional 5 damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-8-feature-2',
						name: 'Mourning \'Til Dusk',
						type: FactoryLogic.type.createAction(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All allies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: 'The target regains 2 Stamina',
							tier2: 'The target regains 3 Stamina',
							tier3: 'The target regains 5 Stamina; The Director gains 3 Malice'
						}),
						effect: 'Each target has an edge on their next strike.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-8-feature-3',
					name: 'Of the Umbra',
					description: 'The luminator ignores concealment granted by darkness. While the luminator is in direct sunlight, they have damage weakness 3. While the luminator is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-9',
			name: 'Shadow Elf Moondancer',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 70,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 1, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-9-feature-1',
						name: 'Crescent Sweep',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage',
							tier3: '16 damage'
						}),
						effect: 'The moondancer ignores opportunity attacks from the target until the end of their turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-9-feature-2',
						name: 'Dissolve',
						type: FactoryLogic.type.createTrigger('The moondancer takes damage from a strike'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Special',
						effect: 'The moondancer teleports to a square in concealment granted by darkness within 10.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-1-feature-3',
					name: 'Of the Umbra',
					description: 'The moondancer ignores concealment granted by darkness. While the moondancer is in direct sunlight, they have damage weakness 3. While the moondancer is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-10',
			name: 'Shadow Elf Mournblade',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 80,
			stability: 0,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(2, 3, 1, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-10-feature-1',
						name: 'Knife in the Dark',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 damage',
							tier2: '15 damage',
							tier3: '18 damage'
						}),
						effect: 'The mournblade is invisible to the target until the start of their next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-10-feature-2',
						name: 'Shadow Step',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Special',
						effect: 'If the mournblade is concealed, they can teleport to another square in concealment granted by darkness within 10. '
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-10-feature-3',
					name: 'Of the Umbra',
					description: 'The mournblade ignores concealment granted by darkness. While the mournblade is in direct sunlight, they have damage weakness 3. While the mournblade is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-11',
			name: 'Shadow Elf Noctis Mage',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 70,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 3, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-11-feature-1',
						name: 'Blotting Bolt',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '14 damage',
							tier3: '17 damage'
						}),
						effect: 'The target has a bane on their next strike.',
						spend: [
							{ value: 3, effect: 'The target has a double bane on the next signature action they use.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-11-feature-2',
						name: 'Enemies in the Dark',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; R<1 the target makes a free strike against an enemy of the noctis mage\'s choice',
							tier2: '10 damage; R<2 the target makes a free strike against an enemy of the noctis mage\'s choice',
							tier3: '13 damage; R<3 the target makes a signature action against an enemy of the noctis mage\'s choice'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-11-feature-3',
					name: 'Of the Umbra',
					description: 'The noctis mage ignores concealment granted by darkness. While the noctis mage is in direct sunlight, they have damage weakness 3. While the noctis mage is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-12',
			name: 'Shadow Elf Panther',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 70,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 2, -1, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-12-feature-1',
						name: 'Dusk Cleave',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage',
							tier3: '16 damage; I<3 bleeding (save ends)'
						}),
						effect: 'The panther makes a free strike against a creature or object adjacent to the target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-12-feature-2',
						name: 'Bladestorm',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 corruption damage',
							tier2: '8 corruption damage; I<2 dazed (save ends)',
							tier3: '10 damage; I<3 dazed (save ends)'
						}),
						effect: 'The panther has a double edge on strikes against targets dazed by this ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-12-feature-3',
					name: 'Of the Umbra',
					description: 'The panther ignores concealment granted by darkness. While the panther is in direct sunlight, they have damage weakness 3. While the panther is concealed, they have damage immunity 3.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-13',
			name: 'Shadow Elf Eclipse',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 180,
			stability: 1,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 3, 2, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-13-feature-1',
						name: 'Manifold Blade',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 damage; I<2 bleeding (save ends)',
							tier2: '16 damage; I<3 bleeding (save ends)',
							tier3: '19 damage; I<4 bleeding (save ends)'
						}),
						spend: [
							{ value: 2, effect: 'The potency of this ability increases by 1.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-13-feature-2',
						name: 'Grasping Shadow',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Three creatures or objects casting a shadow',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'pull 5; I<2 slowed (save ends)',
							tier2: 'pull 7; I<3 slowed (save ends)',
							tier3: 'pull 10; I<4 slowed (save ends)'
						}),
						effect: 'The eclipse makes a free strike against each target pulled into an adjacent square.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-13-feature-3',
						name: 'PUT IT OUT!',
						type: FactoryLogic.type.createTrigger('An enemy uses an ability that emits light, such as fire.'),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						effect: 'The enemy has a double bane on the ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-13-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the warleader can take 10 damage to end one save ends effecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-13-feature-5',
					name: 'Of the Umbra',
					description: 'The eclipse ignores concealment granted by darkness. While the eclipse is in direct sunlight, they have damage weakness 3. While the eclipse is concealed, they have damage immunity 3.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-13-feature-6',
						name: 'From the Shadows',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'All allies',
						effect: 'The eclipse calls forth one **brush stalker** that appears within distance. Each target then shifts up to their speed and makes a free strike.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-13-feature-7',
						name: 'Cast Away All Hope',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						effect: 'The eclipse dispels their enemies’ hard-earned advantages, removing each target’s surges. Each ally ignores edges and additional effects of each target’s damaging abilities until the end of the round.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-13-feature-8',
						name: 'Umbral Hunger',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
						target: 'All enemies in the cube',
						effect: 'R<3 speed becomes zero (save ends). The affected area is shrouded in darkness and becomes concealment. When an enemy starts their turn in an affected square, they take 5 corruption damage.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-14',
			name: 'Brush Stalker',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Mount),
			keywords: [ 'Animal', 'Fey' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 60,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 2, -1, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-14-feature-1',
						name: 'Gore',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 damage',
							tier2: '10 damage',
							tier3: '13 damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-14-feature-2',
						name: 'Reclamation',
						type: FactoryLogic.type.createAction(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '4 corruption damage; M<1 weakened (save ends)',
							tier2: '7 corruption damage; M<2 weakened (save ends)',
							tier3: '10 corruption damage; M<3 weakened (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-14-feature-3',
					name: 'Suneater',
					description: 'The brush stalker sheds darkness like other creatures would shed light. Each square within 2 of the brush stalker is devoid of light and provides concealment.'
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-14-feature-4',
					name: 'Wyrd Dyr',
					description: 'Each non-brush stalker creature with the Animal keyword is frightened while they have line of effect to the brush stalker.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-shadow-15',
			name: 'Shadow Elf Shade',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Ambusher),
			keywords: [ 'Fey', 'Humanoid', 'Shadow Elf' ],
			encounterValue: 23,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-15-feature-1',
						name: 'Shadow Dagger',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(3)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 damage',
							tier2: '10 damage',
							tier3: '13 damage'
						}),
						effect: 'When the shade starts their turn concealed from the target gain a surge.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-15-feature-2',
						name: 'Gathering Gloom',
						type: FactoryLogic.type.createManeuver({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: '-',
						effect: 'Until the end of the next turn, the area is filled with darkness. The shade\'s mentor ignores concealment granted by the darkness.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-shadow-15-feature-3',
					name: 'Of the Umbra',
					description: 'The shade ignores concealment granted by darkness. While the shade is in direct sunlight, they have damage weakness 3. While the shade is concealed, they have damage immunity 3.'
				})
			],
			retainer: {
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-15-retainer-7',
						name: 'Slow-Poison Needle',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 creature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: 'at the start of the target’s next turn, 8 poison damage and weakened (save ends)',
							tier2: 'at the start of the target’s next turn, 12 poison damage and weakened (save ends)',
							tier3: 'at the start of the target’s next turn, 16 poison damage and weakened (save ends)'
						}),
						effect: 'The slow-poison needle is initially painless. When using this ability, the shade can remain hidden if they are already hidden.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-shadow-15-retainer-10',
						name: 'Shadow-Poison Dagger',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '12 poison damage; shadowed vision (save ends)',
							tier2: '17 poison damage; shadowed vision (save ends)',
							tier3: '23 poison damage; shadowed vision (save ends)'
						}),
						effect: 'While a creature has shadowed vision, every creature has concealment from them.'
					})
				})
			}
		})
	],
	addOns: []
};
