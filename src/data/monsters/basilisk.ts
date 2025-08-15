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
	description: 'With eight legs, a scaled rough hide, and razor-sharp teeth coated in poison, the basilisk is a deadly threat—even aside from their petrifying eye beams. This dreadful creature can fell the mightiest of foes with a look, turning them into an immobilized stone statue who remains thankfully unaware when the basilisk later consumes their petrified form at their leisure.',
	picture: null,
	information: [
		{
			id: 'basilisk-info-1',
			name: 'Rasising Young',
			description: 'Basilisks typically live in mated pairs and raise small clutches of younglings from the comforts of damp caves. Adults prefer to subsist on berries, fish, fowl, and carrion, resorting to eating their petrified victims only when starving. By contrast, basilisk younglings can eat only petrified victims, and basilisks have been known to travel far from their nest to populated areas in search of prey for their babies.'
		},
		{
			id: 'basilisk-info-2',
			name: 'Dangerous Servitors',
			description: `Crime lords and overminds seek basilisk eggs to hatch, raising and training basilisks as bodyguards and pets. Training is dangerous, and many handlers (and their unscrupulous colleagues) find themselves turned to stone when a basilisk escapes and runs amok.

Some creatures keep basilisks not for their terrifying abilities, but for their immunity to petrification. Medusas commonly keep basilisks as pets, owing to their own limited options for companionship. Both parties benefit from this relationship, as the medusa feeds their own victims to the basilisk and their younglings.`},
		{
			id: 'basilisk-info-3',
			name: 'Alchemical Properties',
			description: 'Alchemists have discovered a gland in the basilisk’s mouth that excretes an oil that reverts stone to flesh, making it easier to digest prey. If enough of the oil is collected, a salve can be created to restore a petrified victim. Unsavory alchemists pay good money to those willing to steal a basilisk youngling from their nest.'
		},
		{
			id: 'basilisk-info-4',
			name: 'Restorative Salve',
			description: `After a basilisk dies, a character can make a Reason test to claim oil from the basilisk’s mouth, which can be used to create a special salve. One dose of salve can be applied to a petrified creature as a main action, and 1 minute after the salve is applied, that creature is no longer petrified.
			
<code><11</code> The character must complete the Find a Cure downtime project in Draw Steel: Heroes to create one dose of salve.

<code>12-16</code> The character creates one dose of salve and can create two more doses by completing the Find a Cure downtime project.

<code>17+</code> The character creates three doses of salve.`}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'basilisk-malice-1',
			name: 'Stone Swim',
			cost: 3,
			repeatable: true,
			sections: [
				'A basilisk acting this turn can burrow until the start of their next turn, and moves up to their speed. They have damage immunity 2 while underground. The basilisk can burrow through stone, but can’t drag other creatures underground when they do so. At the start of each of the basilisk’s turns, the Director can spend 1 Malice to let the basilisk continue burrowing.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'baslisk-malice-2',
				name: 'Upchuck',
				type: FactoryLogic.type.createMain(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
				target: 'Each enemy in the area',
				cost: 5,
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** The basilisk spits up a chuck of a past petrified victim.'),
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '4 damage; A < 1 2 damage, prone',
							tier3: '4 damage; A < 2 5 damage, prone and can\'t stand (save ends)'
						})
					)
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'basilisk-malice-3',
			name: 'Walleye',
			cost: 7,
			sections: [
				'A basilisk spews reflective spittle across an adjacent vertical surface in a 3-square-by-3-square area. The basilisk can use their Petrifying Eye Beams ability to target a square in the area, causing the area and distance of that ability to become a 20 × 3 line within 1 square of the wall.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'basilisk-1',
			name: 'Basilisk',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
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
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '7 poison damage',
									tier2: '10 poison damage',
									tier3: '13 poison damage'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability gains an edge against targets the basilisk has previously dealt poison damage to')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-1-feature-2',
						name: 'Petrifying Eye Beams',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 2, within: 1 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** The area extends from both the basilisk’s eyes, and this ability targets the first creature without cover on either side of the area.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'M < 0 Restrained (save ends)',
									tier2: 'M < 1 Restrained (save ends)',
									tier3: 'Slowed (save ends) or M < 2 Restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** If a target is already slowed, the potency increases by 1 for that target. A target restrained this way magically begins to turn to stone, and a target who ends two consecutive turns restrained this way is petrified. A target restrained this way or a creature adjacent to them can use a main action to cut encroaching stone from the target’s body, dealing 8 damage to the target that can’t be reduced in any way and ending this effect.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-1-feature-3',
						name: 'Poison Fumes',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'Each creature in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '4 poison damage; M < 0 weakened (save ends)',
									tier2: '6 poison damage; M < 1 weakened and slowed (save ends)',
									tier3: '9 poison damage; M < 2 weakened and slowed (save ends)'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-1-feature-4',
						name: 'Lash Out',
						type: FactoryLogic.type.createTrigger('The basilisk takes damage from a melee ability.'),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target takes 5 damage. Any target who has <code>A < 2</code> is also bleeding (save ends).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'basilisk-1-feature-5',
					name: 'Calcifying Presence',
					description: 'The area within 3 squares of the basilisk is difficult terrain for enemies.'
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
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
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '8 acid damage; pull 1',
									tier2: '10 acid damage; pull 2',
									tier3: '14 acid damage; pull 3'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability can pull targets restrained by Petrifying Eye Beams, and ignores stability if it does so.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'The toungesnapper targets two additional creatures or objects.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-2-feature-2',
						name: 'Petrifying Eye Beams',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 2, within: 1 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** The area extends from both the tonguesnapper’s eyes, and this ability targets the first creature without cover on either side of the area.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'A < 0 Restrained (save ends)',
									tier2: 'A < 1 Restrained (save ends)',
									tier3: 'Slowed (save ends) or M < 2 Restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** If a target is already slowed, the potency increases by 1 for that target. A target restrained this way magically begins to turn to stone, and a target who ends two consecutive turns restrained this way is petrified. A target restrained this way or a creature adjacent to them can use a main action to cut encroaching stone from the target’s body, dealing 8 damage to the target that can’t be reduced in any way and ending this effect.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-2-feature-3',
						name: 'Wink',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '8 corruption damage; R < 0 dazed (save ends)',
									tier2: '10 corruption damage; R < 1 dazed (save ends)',
									tier3: '14 corruption damage; R < 2 dazed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('**Effect:** A creature dazed this way can’t benefit from edges or double edges and can’t gain or use surges.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'basilisk-2-feature-4',
						name: 'Neurotoxin Splash',
						type: FactoryLogic.type.createTrigger('The tonguesnapper takes damage from a melee ability.'),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target takes 4 acid damage. Any target who has <code>M < 2</code> is also slowed (save ends).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'basilisk-2-feature-5',
					name: 'Petrifying Fumes',
					description: 'Any creature who starts their turn adjacent to the tonguesnapper and has <code>M < 1</code> is slowed (save ends).'
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
