import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const basilisk: MonsterGroup = {
	id: 'monster-group-basilisk',
	name: 'Basilisk',
	description: 'They’re great guard dogs. You just gotta raise ’em from eggs. No, no. Don’t look her in the eye. She turned the tax collector to stone the other day when he tried to pet her. She’s just a big softie, really.',
	information: [
		{
			id: 'basilisk-info-1',
			name: 'Stone Cold Looks',
			description: 'With eight legs, a scaled rough hide, and razor-sharp teeth coated in poison, the basilisk is a deadly threat—even aside from their petrifying eye beams. This dreadful creature can fell the mightiest of foes with a look, turning them into immobilized stone statues. Horrifyingly, the basilisk’s petrified prey remain aware of their fate and surroundings, trapping them in an unending nightmare.'
		},
		{
			id: 'basilisk-info-2',
			name: 'Rasising Young',
			description: 'Basilisks typically live in mated pairs and raise small clutches of younglings from the comforts of damp caves. Adults prefer to subsist on berries, fish, fowl, and carrion, resorting to eating their petrified victims only when starving. On the other hand, basilisk younglings can only eat petrified victims, and families of basilisk have been known to travel far from their nest to populated areas in search of prey for their babies.'
		},
		{
			id: 'basilisk-info-3',
			name: 'Dangerous Servitors',
			description: `
Crime lords and overminds seek basilisk eggs to raise and train as bodyguards and pets. Training is dangerous, and many handlers (and their unscrupulous colleagues) find themselves turned to stone as the basilisk escapes and runs amok.

Some creatures keep basilisks not for their terrifying abilities, but for their immunity to petrification. Medusas, largely due to their own limited options for companionship, commonly keep basilisks as pets. Both parties benefit from this symbiotic relationship, as the medusa feeds their own victims to the basilisk and their younglings.`
		},
		{
			id: 'basilisk-info-4',
			name: 'Cyclops: Ogre Progenitor',
			description: `
Alchemists have discovered that after a basilisk eats petrified flesh, the basilisk’s gullet produces an oil that can be used to restore a petrified victim. Unsavory alchemists pay good money to those willing to steal a basilisk youngling from their nest.

**ALCHEMICAL INGREDIENTS**
After a basilisk dies, a creature can make a medium Reason test on the basilisk’s gullet. On a success, the creature creates 3 doses of salve. One dose of salve can be applied to a petrified creature as an action, and 1 minute after the salve is applied, the petrified condition ends for that creature.

On a success with a consequence, you produce 1 dose of salve but cannot extract more from the spent gullet without completing a Find A Cure project. On a failure with a consequence, you can only rely on completing a Find A Cure project to extract enough salve from the gullet.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'basilisk-malice-1',
			name: 'Stone Swim',
			cost: 3,
			sections: [
				'A basilisk acting this turn adds the burrow keyword to their movement moves up to their speed. The basilisk can burrow into stone this way, including vertically. While burrowing, the basilisk has damage immunity 2.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'baslisk-malice-2',
				name: 'Upchuck',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
				target: 'All enemies in the cube',
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 2,
					tier1: '4 damage',
					tier2: '4 damage; A<1 2 damage, prone',
					tier3: '4 damage; A<2 5 damage, prone can\'t stand (save ends)'
				}),
				effect: 'A basilisk acting this turn spits out a chuck of a past petrified victim.'
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'basilisk-malice-3',
			name: 'Rampage',
			cost: 7,
			sections: [
				'A basilisk spews reﬂective spittle across an adjacent 3 × 3 segment of wall. Whenever the basilisk uses their petrifying eye beams ability targeting an aﬀected square, the distance of the ability increases to include a 20 × 3 line within 1 of the wall.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'basilisk-1',
			name: 'Basilisk',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Basilisk', 'Beast' ],
			encounterValue: 12,
			speed: FactoryLogic.createSpeed(8),
			stamina: 80,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, -3, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-1-feature-1',
						name: 'Noxious Bite',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 poison damage',
							tier2: '10 poison damage',
							tier3: '13 poison damage'
						}),
						effect: 'This ability has an edge against targets that the basilisk has previously dealt poison damage to.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-1-feature-2',
						name: 'Petrifying Eye Beams',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 2, within: 1 }) ],
						target: 'Special',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'M<0 Restrained (save ends)',
							tier2: 'M<1 Restrained (save ends)',
							tier3: 'Slowed (save ends) or M<2 Restrained (save ends)'
						}),
						effect: `
The basilisk targets the first unobstructed creature in each column of the area. An already slowed target has -1 to resisting the potency. Each target magically begins to turn to stone. A creature restrained by this ability or a creature adjacent to them can use an action to cut the encroaching stone from their body, taking 8 damage which can’t be reduced in any way and ending the effect.

A target that ends two consecutive turns restrained by this ability is petrified until they are cured (see Alchemical Ingredients).`
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-1-feature-3',
						name: 'Poison Fumes',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'All creatures in the cube',
						cost: 5,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 poison damage; M<0 weakened (save ends)',
							tier2: '6 poison damage; M<1 weakened and slowed (save ends)',
							tier3: '9 poison damage; M<2 weakened and slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-1-feature-4',
						name: 'Lash Out',
						type: FactoryLogic.type.createTrigger('The basilisk takes melee damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies in the burst',
						effect: 'Each target takes 5 damage and is A<2 bleeding (save ends).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'basilisk-1-feature-5',
					name: 'Calcifying Presence',
					description: 'The area within 3 squares of the basilisk is considered difficult terrain for enemies.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'basilisk-1-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'basilisk-2',
			name: 'Basilisk Tonguesnapper',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Hexer),
			keywords: [ 'Basilisk', 'Beast' ],
			encounterValue: 12,
			speed: FactoryLogic.createSpeed(8),
			stamina: 40,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 2, -3, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-2-feature-1',
						name: 'Prehensile Tongue',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '8 acid damage; pull 1',
							tier2: '10 acid damage; pull 2',
							tier3: '14 acid damage; pull 3'
						}),
						effect: 'This ability can pull targets restrained by Petrifying Eye Beams, ignoring stability.',
						spend: [
							{
								value: 3,
								effect: 'The toungesnapper targets two additional creatures or objects.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-2-feature-2',
						name: 'Petrifying Eye Beams',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 2, within: 1 }) ],
						target: 'Special',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'M<0 Restrained (save ends)',
							tier2: 'M<1 Restrained (save ends)',
							tier3: 'Slowed (save ends) or M<2 Restrained (save ends)'
						}),
						effect: `
The tonguesnapper targets the first unobstructed creature in each column of the area. An already slowed target has -1 to resisting the potency. Each target magically begins to turn to stone. A creature restrained by this ability or a creature adjacent to them can use an action to cut the encroaching stone from their body, taking 8 damage which can’t be reduced in any way and ending the effect.

A target that ends two consecutive turns restrained by this ability is petrified until they are cured (see Alchemical Ingredients).`
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-2-feature-3',
						name: 'Wink',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature',
						cost: 2,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '8 corruption damage; R<0 dazed (save ends)',
							tier2: '10 corruption damage; R<1 dazed (save ends)',
							tier3: '14 corruption damage; R<2 dazed (save ends)'
						}),
						effect: 'A creature dazed by this ability can’t benefit from edges or surges until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-2-feature-4',
						name: 'Neurotoxin Splash',
						type: FactoryLogic.type.createTrigger('The tonguesnapper takes melee damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in the burst',
						effect: 'Each target takes 4 acid damage and is A<2 bleeding (save ends).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'basilisk-2-feature-5',
					name: 'Calcifying Presence',
					description: 'A creature that starts their turn adjacent to the tonguesnapper is M<1 slowed (save ends).'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'basilisk-2-feature-6',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 2 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				})
			]
		})
	],
	addOns: []
};
