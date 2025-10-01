import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { StatBlockIcon } from '@/enums/stat-block-icon';

export const fossilCryptic: MonsterGroup = {
	id: 'monster-group-fossil-cryptic',
	name: 'Fossil Cryptic',
	description: 'The cave-diving humans who first found fossil cryptics initially thought they were the fossilized reanimated skeletons of creatures predating recorded history. When the explorers’ priest presented a holy symbol and attempted to turn the cryptics, he learned these fossilized bones aren’t mindless undead—and seconds later, he wound up crushed to death by a pillar of stone.',
	picture: null,
	information: [
		{
			id: 'fossil-cryptic-info-1',
			name: 'Primal Sentries',
			description: 'In truth, these living fossil amalgamations are inhabited by elemental spirits. Fossil cryptics are found in places of otherworldly beauty with a connection to an elemental plane of Quintessence, often in caves that have remained untouched for eons or whose tunnels are laced with veins of priceless metal in exquisite fractal patterns. Elemental spirits from that plane inhabit the fossils of creatures who once protected the site, carrying on their legacy. Archaeologists, miners, and others who disturb a cryptic’s domain are ground into dust and subsumed into the creature’s own form. '
		},
		{
			id: 'fossil-cryptic-info-2',
			name: 'Bones of the Earth',
			description: 'Though fossil cryptics vary wildly in their chosen shape and form, all contain a central cluster of fossils atop a churning column of rock and metal. With malleable limbs extending from their earthy core, cryptics move with unsettling speed.'
		},
		{
			id: 'fossil-cryptic-info-3',
			name: 'Ancient Intelligence',
			description: 'Fossil cryptics often warn trespassers to leave their domains, speaking threats in ancient languages before attacking. Should trespassers persist, cryptics weaponize columns of stone at range and can manipulate the ground around them, pushing and pulling friend and foe alike into the best positions for battle.'
		},
		{
			id: 'fossil-cryptic-info-4',
			name: 'Fossil Cryptic Languages',
			description: 'Many fossil cryptics speak Phorialtic, but they are known to also use the ancient languages of the ruins they inhabit.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'fossil-cryptic-malice-1',
			name: 'Floor Mosaic',
			cost: 3,
			icon: StatBlockIcon.Ranged,
			sections: [
				'The fossil cryptic slides one creature on the ground up to 5 squares. If the creature is prone, this forced movement ignores stability.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'fossil-cryptic-malice-2',
			name: 'Solo Action',
			cost: 5,
			icon: StatBlockIcon.Villain,
			sections: [
				'The fossil cryptic takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'fossil-cryptic-malice-3',
			name: 'Stone Pillars ',
			cost: 5,
			icon: StatBlockIcon.Area,
			sections: [
				'Two pillars of stone 1 square wide either thrust up out of the ground or jut down from the ceiling anywhere on the encounter map, to a height of up to 5 squares. A creature in the area of a pillar before it appears is knocked prone on its surface. If the creature comes into contact with the ceiling above or the floor beneath the pillar and has M<2 they are restrained (save ends).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'fossil-cryptic-malice-4',
			name: 'Choking Dust',
			cost: 10,
			icon: StatBlockIcon.SpecialArea,
			sections: [
				'The air across the encounter map is thick with dust until the end of the encounter. Each enemy in the dust is suffocating. Additionally, at the end of each round, each enemy in the dust makes a **Might test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Might,
					tier1: 'Until the end of the enemy\'s next turn, their stability is reduced to 0, and any forced movement effects targeting them gain a +2 bonus to the distance moved',
					tier2: 'The enemy\'s stability is halved (EoT).',
					tier3: 'No effect'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'fossil-cryptic-1',
			name: 'Fossil Cryptic',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Elemental' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(8, 'burrow'),
			stamina: 250,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(3, 2, 1, 1, 0),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'fossil-cryptic-feature-1',
					name: 'the fossil cryptic'
				}),
				FactoryLogic.feature.create({
					id: 'fossil-cryptic-feature-3',
					name: 'Churning Trunk',
					description: 'The cryptic is constantly surrounded by a 1 aura of swirling debris that obscures their form. Ranged abilities that target the cryptic take a bane. Additionally, any enemy who enters the aura for the first time in a round or starts their turn there takes 5 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'fossil-cryptic-feature-4',
					name: 'Seismic Step',
					description: ' The cryptic ignores difficult terrain. Additionally, they have line of effect to any creature with concealment if that creature is touching the ground.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-5',
						name: 'Sand Slam',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage; A<1 slide 2',
								tier2: '12 damage; A<2 slide 2, prone',
								tier3: '15 damage; A<3 slide 3, prone and can\'t stand (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('If a target made prone this way is already prone, they are instead restrained (EoT).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-6',
						name: 'Stone Bone Storm',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 6, value2: 1, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 damage; M<1 push 2',
								tier2: '7 damage; M<2 prone',
								tier3: '10 damage; M<3 prone'
							})),
							FactoryLogic.createAbilitySectionText('The cryptic reforms their body and appears in an unoccupied space in the area.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-7',
						name: 'Stoneshift',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object on the ground',
						sections: [
							FactoryLogic.createAbilitySectionText('The cryptic slides the target up to 3 squares.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The ability targets one additional target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-8',
						name: 'Dissipate',
						type: FactoryLogic.type.createTrigger('The cryptic takes damage.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The cryptic halves the damage, ignores any nondamaging effects associated with it, and shifts up to 3 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-9',
						name: 'Shatterstone',
						type: FactoryLogic.type.createTrigger('The cryptic uses the Dig maneuver to resurface.'),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Before using the Dig maneuver, the cryptic moves up to their speed. They then create the burst when they breach the surface.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 damage; push 2',
								tier2: '7 damage; push 3; prone',
								tier3: '10 damage; push 4; prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-10',
						name: 'First Warning Quake',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('*Special*: A target must be on the ground.'),
							FactoryLogic.createAbilitySectionText('Each target makes a **Might test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Might,
								tier1: 'Prone and can’t stand (EoT)',
								tier2: 'Prone',
								tier3: 'No effect'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-11',
						name: 'Final Warning Fissure',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('*Special*: A target must be on the ground.'),
							FactoryLogic.createAbilitySectionText('The area drops 2 squares and is difficult terrain. Each target enemy falls, while each target ally drops safely. Additionally, each target enemy makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Agility,
								tier1: '9 damage; prone',
								tier2: '5 damage',
								tier3: 'The target moves to the nearest unoccupied space outside the area.'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-12',
						name: 'No Escape',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionText('The cryptic makes an initial power roll that calls down stone pillars from the ceiling.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 damage; prone; M<1 restrained (save ends)',
								tier2: '9 damage; prone; M<2 restrained (save ends)',
								tier3: '12 damage; prone; M<3 restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-13',
						name: 'No Escape (part two)',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects on the ground',
						sections: [
							FactoryLogic.createAbilitySectionText('The cryptic then makes a second power roll that raises stone pillars from the floor.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 damage; vertical slide 2',
								tier2: '3 damage; vertical slide 4',
								tier3: '4 damage; vertical slide 6; if this movement brings the target into contact with the ceiling, they are restrained (save ends).'
							}))
						]
					})
				})
			]
		})
	],
	addOns: []
};
