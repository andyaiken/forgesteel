import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { FactoryLogic } from '../../../logic/factory-logic';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { MonsterRoleType } from '../../../enums/monster-role-type';
import { SubClass } from '../../../models/subclass';
import { TerrainRoleType } from '../../../enums/terrain-role-type';

export const demon: SubClass = {
	id: 'summoner-sub-1',
	name: 'Demon Portfolio',
	description: 'The demon underlings of the demoniacs. This portfolio is filled with shapechanging demons that grow in hunger and power over time.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'summoner-1-1-1',
					name: 'Communication',
					description: 'You can communicate with creatures that have the abyssal keyword even if you don’t share a language.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-1-1-2',
					name: 'Soulsense',
					description: `
While you have line of effect to a creature with a soul, you can perceive a trail of where the creature has been in the last number of minutes equal to 5 x your level.

When you finish a respite, the soul trails of each creature that took the respite with you are always visible to you until your next respite.`
				}),
				FactoryLogic.feature.create({
					id: 'summoner-1-1-3',
					name: 'Death Snap',
					description: 'Whenever one of your demon minions would unwillingly die, they can deal damage to an adjacent creature equal to their free strike value before dying.'
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-1-1-4',
					name: 'Signature Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-1-1-4a',
								name: 'Ensnarer',
								description: 'A vaguely humanoid form, ripped apart and distorted by a demon nestled inside. They can extend long tongues from their extensive number of orifices and drag victims in close.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
								keywords: [ 'Abyssal', 'Demon' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 2,
								stability: 0,
								freeStrikeDamage: 2,
								characteristics: FactoryLogic.createCharacteristics(2, 0, -1, -1, -1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-1-1-4a-1',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Holy,
												modifierType: DamageModifierType.Weakness,
												value: 1
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-4a-2',
										name: 'Extended Barbed Strike',
										description: 'The ensnarer’s melee free strikes have a distance of 3 and inflict pull 1. The pull distance increases by 1 for each additional ensnarer striking the same target. Choose the ensnarer that the target is being pulled to before applying forced movement.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-4a-3',
										name: 'Soulsight',
										description: 'Each creature adjacent to the ensnarer can’t be hidden from them.'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-1-1-4b',
								name: 'Rasquine',
								description: 'A skulking demon that shimmers in the light. They teleport into position before biting the necks of their prey.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [ 'Abyssal', 'Demon' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'S'),
								speed: FactoryLogic.createSpeed(4, 'teleport'),
								stamina: 2,
								stability: 0,
								freeStrikeDamage: 2,
								characteristics: FactoryLogic.createCharacteristics(-1, 0, -1, -1, 2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-1-1-4b-1',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Holy,
												modifierType: DamageModifierType.Weakness,
												value: 1
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-4b-2',
										name: 'Skulker',
										description: 'Once per turn, the rasquine can hide as a free action after teleporting.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-4b-3',
										name: 'Soulsight',
										description: 'Each creature adjacent to the rasquine can’t be hidden from them.'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-1-1-4c',
								name: 'Razor',
								description: 'A diminutive form of ruinant demon. Their bodies are swift, tumbling mounds of scarred flesh and deadly claws.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
								keywords: [ 'Abyssal', 'Demon' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(6),
								stamina: 2,
								stability: 0,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(0, 2, -1, -1, -1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-1-1-4c-1',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Holy,
												modifierType: DamageModifierType.Weakness,
												value: 1
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-4c-2',
										name: 'Teeth!',
										description: 'Whenever an adjacent enemy grabs the razor or uses a melee ability against them, that enemy takes 1 damage.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-4c-3',
										name: 'Soulsight',
										description: 'Each creature adjacent to the razor can’t be hidden from them.'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						})
					],
					count: 2
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-1-1-5',
					name: '3-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-1-1-5a',
								name: 'Archer Spittlich',
								description: 'These minor demons resemble larger pitlings. They can spit a nerve-numbing phlegm at long distance that makes it easy to catch their next meal.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
								keywords: [ 'Abyssal', 'Demon' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'S'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 5,
								stability: 2,
								freeStrikeDamage: 5,
								freeStrikeType: DamageType.Poison,
								characteristics: FactoryLogic.createCharacteristics(0, 2, -1, -1, 0),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-1-1-5a-1',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Holy,
												modifierType: DamageModifierType.Weakness,
												value: 1
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-5a-2',
										name: 'Splash Strike',
										description: 'The spittlich’s ranged free strikes have a distance of 10 and deals 2 poison damage to an enemy adjacent to the target. Creatures that take poison damage can’t shift until the start of the spittlich’s next turn.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-5a-3',
										name: 'Soulsight',
										description: 'Each creature adjacent to the spittlich can’t be hidden from them.'
									})
								]
							}),
							isSignature: false,
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-1-1-5b',
								name: 'Fanged Musilex',
								description: 'A heaving, knotted mass of ensnarer bodies. A musilex is compelled to drag everything in towards their body.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
								keywords: [ 'Abyssal', 'Demon' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(6),
								stamina: 6,
								stability: 1,
								freeStrikeDamage: 5,
								characteristics: FactoryLogic.createCharacteristics(2, 1, -1, -1, 0),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-1-1-5b-1',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Holy,
												modifierType: DamageModifierType.Weakness,
												value: 1
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-5b-2',
										name: 'Mawful Strike',
										description: 'The musilex’s melee free strikes have a distance of 2 + R and inflict pull 2. The pull distance increases by 2 for each additional musilex striking the same target. Choose the musilex that the target is being pulled to before applying forced movement. If the target is pulled adjacent to the musilex, the musilex either deals an additional 2 damage or grabs them.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-5b-3',
										name: 'Soulsight',
										description: 'Each creature adjacent to the musilex can’t be hidden from them.'
									})
								]
							}),
							isSignature: false,
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-1-1-5c',
								name: 'Twisted Bengrul',
								description: 'The bengrul is an undulating heap of glass and flesh. They shatter pieces of themselves into their prey and disrupt their senses.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
								keywords: [ 'Abyssal', 'Demon' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 5,
								stability: 1,
								freeStrikeDamage: 4,
								freeStrikeType: DamageType.Psychic,
								characteristics: FactoryLogic.createCharacteristics(2, 1, -1, -1, 0),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-1-1-5c-1',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Holy,
												modifierType: DamageModifierType.Weakness,
												value: 1
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-1-1-5c-2',
											name: 'Mind Twist',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
											distance: [ FactoryLogic.distance.createRanged(5) ],
											target: 'One creature or object per minion',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '4 damage; P < [weak] twisted (save ends)',
														tier2: '4 damage; P < [average] twisted (save ends)',
														tier3: '4 damage; P < [strong] twisted (save ends)'
													})
												),
												FactoryLogic.createAbilitySectionText('A twisted target can’t take advantage of edges or search for hidden creatures until the condition ends.')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-1-5c-3',
										name: 'Soulsight',
										description: 'Each creature adjacent to the bengrul can’t be hidden from them.'
									})
								]
							}),
							isSignature: false,
							cost: 3,
							count: 2
						})
					],
					count: 2
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createFixture({
					fixture: {
						id: 'summoner-1-fixture',
						name: 'The Boil',
						description: 'The boil arises from the chaotic depths of the Abyssal Waste, concentrated into a heaving mass by the pressure of a coherent reality. As it slushes and threatens to burst, the noises drive nearby demons into a frenzy.',
						role: FactoryLogic.createTerrainRole(MonsterRoleType.Support, TerrainRoleType.Hazard),
						baseStamina: 20,
						size: FactoryLogic.createSize(2),
						featuresByLevel: [
							{
								level: 1,
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-1-fixture-1-1',
										name: 'Hunger Thrush',
										description: 'Each enemy that starts their turn within 3 squares of the boil is I < [average] taunted (EoT) by the boil, or I < [weak] taunted (EoT) by the boil and can’t move further from it.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-fixture-1-2',
										name: 'Oh, It Pops',
										description: 'When the boil is destroyed, each enemy within 3 squares of the boil takes acid damage equal to your level and is A < [strong] weakened (save ends).'
									})
								]
							},
							{
								level: 2,
								features: []
							},
							{
								level: 3,
								features: []
							},
							{
								level: 4,
								features: []
							},
							{
								level: 5,
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-1-fixture-5-1',
										name: 'Soul Rancor',
										description: 'You gain a surge the first time in a round that your demon minions deal 3 or more damage to a creature while you have line of eﬀect to the boil. You can choose to give the surge to an ally who also has line of eﬀect to the boil.'
									})
								]
							},
							{
								level: 6,
								features: []
							},
							{
								level: 7,
								features: []
							},
							{
								level: 8,
								features: []
							},
							{
								level: 9,
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-1-fixture-9-1',
										name: 'Size Increase',
										description: 'The boil is now Size 3.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-1-fixture-9-2',
										name: 'Fester Field',
										description: 'Each non-abyssal enemy that starts their turn within 3 squares of the boil takes 5 corruption damage.'
									})
								]
							},
							{
								level: 10,
								features: []
							}
						]
					}
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-1-2-2',
					name: '5-Essence Minion',
					options: [
						// TODO: Gushing Spewler
						// TODO: Hulking Chimor
						// TODO: Violence
					]
				})
			]
		},
		{
			level: 3,
			features: []
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'summoner-1-5-1',
					name: 'Soul Flense',
					description: `
As a maneuver, you can command one or more of your demon minions to each deal damage equal to their free strike value to an adjacent ally. This damage can’t be reduced. The ally then ends a condition affecting them and confers it to the demon that attacked them.

Additionally, whenever one of your demon minions Death Snaps, their target is P < [weak] affected by a condition the minion was suffering from. The potency increases by 1 on each subsequent Death Snap the target takes damage from in the same turn (maximum +2).`
				}),
				FactoryLogic.feature.create({
					id: 'summoner-1-5-2',
					name: 'Take Face',
					description: 'You can spend 1 uninterrupted minute to perform a ritual that causes one of your minions to fold their shape and disguise themself to look like a duplicate of you, including speaking basic Caelian, allowing them to (potentially) freely move through civilization while completing their tasks. You can have a number of minions disguised at the same time equal to your Reason score.'
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-1-5-3',
					name: '7-Essence Minion',
					options: [
						// TODO: Faded Blightling
						// TODO: Gorrre
						// TODO: Vicisittante
					]
				})
			]
		},
		{
			level: 6,
			features: []
		},
		{
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'summoner-1-8-1',
					name: 'Abyssal Evolution',
					description: 'At the start of each of your turns, you can transform one of your demon minions within your Summoner’s Range into a different demon minion within your Summoner’s Range, maintaining their current Stamina. Starting from round 2, you can choose to transform the demon into any demon minion you can call forth for half the essence cost. The minion must be reassigned to a new squad if their new name differs from the other squad members.'
				})
				// TODO: Portfolio Champion
			]
		},
		{
			level: 9,
			features: []
		},
		{
			level: 10,
			features: []
		}
	],
	selected: false
};
