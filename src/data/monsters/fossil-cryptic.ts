import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const fossilCryptic: MonsterGroup = {
	id: 'monster-group-fossil-cryptic',
	name: 'Fossil Cryptic',
	description: 'The cave-diving humans who first found fossil cryptics initially thought those beings were fossilized, reanimated skeletons of creatures predating recorded history. When the explorers’ priest presented a holy symbol and attempted to turn the cryptics, he learned these fossilized bones aren’t mindless undead—and seconds later, he wound up crushed to death by a pillar of stone.',
	information: [
		{
			id: 'fossil-cryptic-info-1',
			name: 'Primal Sentries',
			description: 'In truth, these living fossil amalgamations are inhabited by elemental spirits. Fossil cryptics are found in places of otherworldly beauty with a connection to an elemental plane of Quintessence—often in caves that have remained untouched for eons or whose tunnels are laced with veins of priceless metal in exquisite fractal patterns. The elemental spirits from that plane inhabit the fossils of creatures who once protected the site, carrying on their legacy. Archaeologists, miners, and others who disturb a cryptic’s domain are ground into dust and subsumed into the cryptic’s own form.'
		},
		{
			id: 'fossil-cryptic-info-2',
			name: 'Bones of the Earth',
			description: 'Though fossil cryptics vary wildly in their chosen shape and form, all contain a central cluster of fossils atop a churning column of rock and metal. With malleable limbs extending from their earthy core, cryptics move with unsettling speed.'
		},
		{
			id: 'fossil-cryptic-info-3',
			name: 'Ancient Intelligence',
			description: 'Fossil cryptics often warn trespassers to leave their domains, speaking threats in ancient languages before attacking. Should trespassers persist, cryptics weaponize columns of stone at range and can manipulate the ground around them, pushing and pulling friend and foe alike into the best positions for a battle.'
		},
		{
			id: 'fossil-cryptic-info-4',
			name: 'Fossil Cryptic Languages',
			description: 'Many Fossil Cryptics speak Phorialtic, but are known to use the ancient language (or languages) of the ruins they inhabit.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'fossil-cryptic-malice-1',
			name: 'Floor Mosaic',
			cost: 3,
			sections: [
				'A creature on the ground slides up to 5 squares, ignoring stability.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'fossil-cryptic-malice-2',
			name: 'Blade Wall',
			cost: 5,
			sections: [
				'Two pillars of stone 1 square wide thrust 5 squares up out of the ground anywhere on the encounter map. A creature in the area of a pillar before it rises falls prone on top of it. If the creature comes in contact with the ceiling, they are M<2 restrained (save ends).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'fossil-cryptic-malice-3',
			name: 'Bone Storm',
			cost: 7,
			sections: [
				'The air across the area of the encounter map becomes thick with dust until the end of the encounter. Each enemy in the dust must immediately make a **Might test**, then repeat that test at the start of each of their turns:',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Might,
					tier1: 'Slowed (EoT); target\'s stability is reduced by 3 (EoT)',
					tier2: 'Target\'s speed is reduceded by 2 (EoT) and their stability is reduced by 1 (EoT)',
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
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(8, 'burrow'),
			stamina: 250,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 1, 1, 0),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'fossil-cryptic-feature-1',
					name: 'the ashen hoarder'
				}),
				FactoryLogic.feature.create({
					id: 'fossil-cryptic-feature-2',
					name: 'Churning Trunk',
					description: 'The cryptic emits a 1 aura of swirling debris that obscures their form. Any enemy who enters the aura for the ﬁrst time in a round or starts their turn there takes 5 damage. Ranged abilities that target the cryptic have a bane.'
				}),
				FactoryLogic.feature.create({
					id: 'fossil-cryptic-feature-3',
					name: 'Seismic Step',
					description: 'The cryptic ignores diﬃcult terrain. Additionally, they have line of eﬀect to concealed creatures touching the ground.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-4',
						name: 'Sand Slam',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; one target A<1 prone',
							tier2: '12 damage; one target A<2 prone and can\'t stand (EoT)',
							tier3: '15 damage; one target A<3 prone and can\'t stand (save ends)'
						}),
						effect: 'Each enemy within 1 square of the target takes 2 damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-5',
						name: 'Stone Bone Storm',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 6, value2: 1, within: 1 }) ],
						target: 'All enemies in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '4 damage; M<1 push 2',
							tier2: '7 damage; M<2 prone',
							tier3: '10 damage; M<3 prone'
						}),
						effect: 'The cryptic reforms thier body and appears in an unoccupied space within the line.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-6',
						name: 'Shatterstone',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'Each enemy in the burst',
						cost: 5,
						preEffect: 'The cryptic burrows up to half their speed, then creates the burst when they breach the surface.',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 damage; push 2',
							tier2: '7 damage; push 3; prone',
							tier3: '10 damage; push 4; prone'
						})
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
						effect: 'Slide 3.',
						spend: [
							{ value: 2, effect: 'The distance of the ability becomes Ranged 10 and the slide increases to slide 6.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-8',
						name: 'Dissipate',
						type: FactoryLogic.type.createTrigger('The cryptic takes damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 1,
						effect: 'The cryptic halves the damage, ignores any additional effects associated with it, and shifts up to 3 squares.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-9',
						name: 'First Warning Quake',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy on the ground in the burst',
						preEffect: 'Each target makes a **Might test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Might,
							tier1: 'The target is prone and can\'t stand.',
							tier2: 'Prone',
							tier3: 'No effect'
						}),
						effect: 'The affected area becomes difficult terrain. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-10',
						name: 'Final Warning Fissure',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy on the ground in the burst',
						preEffect: 'Each target makes a **Agility test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Agility,
							tier1: '9 damage; prone',
							tier2: '5 damage',
							tier3: 'The target moves up to the nearest unoccupied space outside the area.'
						}),
						effect: 'The area drops 2 squares. Each enemy in the area falls, while allies of the fossil cryptic drop safely. The affect area then becomes difficult terrain.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-11',
						name: 'No Escape',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						preEffect: 'The cryptic makes an initial power roll that calls down stone pillars from the ceiling',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 damage; prone; M<1 restrained (save ends)',
							tier2: '9 damage; prone; M<2 restrained (save ends)',
							tier3: '12 damage; prone; M<3 restrained (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fossil-cryptic-feature-12',
						name: 'No Escape (part two)',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						preEffect: 'The cryptic makes a final power roll that raises stone pillars from the floor',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 damage; vertical slide 2',
							tier2: '3 damage; vertical slide 4',
							tier3: '4 damage; vertical slide 8 or the target is restrained against the ceiling (save ends)'
						})
					})
				})
			]
		})
	],
	addOns: []
};
