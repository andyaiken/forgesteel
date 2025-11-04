import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { SubClass } from '@/models/subclass';
import { TerrainRoleType } from '@/enums/terrain-role-type';

export const undead: SubClass = {
	id: 'summoner-sub-4',
	name: 'Undead Portfolio',
	description: 'The undead army of necromancers. The corporeal and incorporeal creatures under your command are hardy and numerous.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'summoner-1-1-1',
					name: 'Communication',
					description: 'You can communicate with creatures that have the undead keyword even if you don’t share a language.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-4-1-2',
					name: 'Dead Men Do Tell Tales',
					description: `
You can touch a corpse of a creature that died within the past week and ask them a question. The corpse can choose to answer the question to the best of their ability. Each additional question you ask the corpse requires a Moderate Reason Test, where failure or consequence breaks your connection with the corpse permanently.

The corpse can also choose to refuse to answer or lie, especially if you were the one to kill them in the first place.`
				}),
				FactoryLogic.feature.create({
					id: 'summoner-4-1-3',
					name: 'Rise!',
					description: `
Once per round, when a creature dies within your Summoner’s Range that you didn’t sacrifice, you can use a triggered action to summon a signature undead minion in their space at no cost even if you’re at your minion maximum, but only if they can be organized into one of your squads. The new minion can’t act until the start of your next turn.

This ability becomes a free triggered action if the target was a minion (either yours or an enemy).`
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-4-1-4',
					name: 'Signature Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-4a',
								name: 'Husk',
								description: 'A stiff corpse that snaps and crackles with each sudden movement. Corrosive breath endlessly billows out from their slackjawed faces.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 3,
								stability: 1,
								freeStrikeDamage: 1,
								freeStrikeType: DamageType.Corruption,
								characteristics: FactoryLogic.createCharacteristics(2, -2, 0, 0, -2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-1-4a-1',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Damage,
												modifierType: DamageModifierType.Immunity,
												value: 2
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-1-4a-2',
										name: 'Rotting Strike',
										description: 'The husk’s melee free strikes inflict M < [weak] slowed (EoT). The potency increases by 1 for each addi􀆟onal husk adjacent to the target (maximum +2).'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-4b',
								name: 'Shrieker',
								description: 'The shrieker expresses their unending pain in a way that can be heard and felt for miles. A white hot fire rests within each of their sunken eye sockets.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(4),
								stamina: 4,
								stability: 1,
								freeStrikeDamage: 2,
								freeStrikeType: DamageType.Sonic,
								characteristics: FactoryLogic.createCharacteristics(-2, -2, 0, 0, 2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-1-4b-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-1-4b-2',
										name: 'Howling Strike',
										description: 'The shrieker’s ranged free strikes have a distance of 12.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-1-4b-3',
										name: 'Shrill Alarm',
										description: 'Each enemy within 2 squares of the shrieker can’t hide or be hidden.'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-4c',
								name: 'Skeleton',
								description: 'Autonomous bone networks that fall short of replicating the structure they had in life. Skeleton bones are especially brittle and can splinter into huge shards when met with enough force.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(6),
								stamina: 2,
								stability: 0,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(-2, 2, 0, 0, -2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-1-4c-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-1-4c-2',
										name: 'Bonetrops',
										description: 'When the skeleton is reduced to 0 Stamina, their square becomes difficult terrain for enemies. The first time any enemy enters this space, they take 2 damage and end this effect.'
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
					id: 'summoner-4-1-5',
					name: '3-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-5a',
								name: 'Grave Knight',
								description: 'Zombie warriors that continue to fight after death. Any blood spilled at a grave knight’s hand runs pitch black.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(6),
								stamina: 6,
								stability: 1,
								freeStrikeDamage: 5,
								characteristics: FactoryLogic.createCharacteristics(2, 1, 0, 0, 1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-1-5a-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-4-1-5a-2',
											name: 'Knight Strike',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One creature or object per minion',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '5 corruption damage; M < [weak] bleeding (EoT)',
														tier2: '7 corruption damage; M < [average] bleeding (EoT)',
														tier3: '9 corruption damage; M < [strong] bleeding (save ends)'
													})
												)
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-1-5a-3',
										name: 'To the Grave',
										description: 'When the grave knight is reduced to 0 Stamina, they make a melee free strike before being destroyed.'
									})
								]
							}),
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-5b',
								name: 'Stalker Shade',
								description: 'An umbral stalker that floats free from any floor or surface. They can bend their appearance to completely vanish in the light.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5, 'fly, hover'),
								stamina: 6,
								stability: 1,
								freeStrikeDamage: 5,
								freeStrikeType: DamageType.Corruption,
								characteristics: FactoryLogic.createCharacteristics(-2, 1, 0, 0, 2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-1-5b-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-1-5b-2',
										name: 'Shadow Strike',
										description: 'The stalker shade turns invisible, shifts 3 squares, and reappears after making a strike.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-1-5b-3',
										name: 'Shadow Phasing',
										description: 'The stalker shade can move through other creatures and objects at normal speed. The first time in a round that the stalker shade passes through a creature, that creature takes 2 corruption damage. The stalker shade doesn’t take damage from being force moved into objects.'
									})
								]
							}),
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-1-5c',
								name: 'Zombie Lumberer',
								description: 'Massive, animated ogre corpses with incredible grip strength. When a lumberer falls, they’ll take anything within reach down with them.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(2),
								speed: FactoryLogic.createSpeed(5),
								stamina: 8,
								stability: 0,
								freeStrikeDamage: 4,
								characteristics: FactoryLogic.createCharacteristics(2, -2, 0, 0, 1),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'summoner-4-1-5c-1',
										field: FeatureField.Stability,
										valueCharacteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-1-5c-2',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-1-5c-3',
										name: 'Zombie Clutch',
										description: 'The lumberer’s melee free strikes inflict A < [average] grabbed. A creature or object that starts their turn grabbed by the lumberer takes corruption damage equal to your Reason.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-1-5c-4',
										name: 'Death Grasp',
										description: 'When the lumberer is reduced to 0 Stamina, they latch onto an adjacent enemy before being destroyed. The enemy is M < [strong] restrained (EoT).'
									})
								]
							}),
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
						id: 'summoner-4-fixture',
						name: 'Barrow Gates',
						description: 'Tall iron gates from the Necropolitan Ruins arise from the earth as wailing spirits swirl around its bars. The undead refuse to stop moving while near the threshold of oblivion.',
						role: FactoryLogic.createTerrainRole(MonsterRoleType.Defender, TerrainRoleType.Fortification),
						baseStamina: 20,
						size: FactoryLogic.createSize(2),
						featuresByLevel: [
							{
								level: 1,
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-4-fixture-1-1',
										name: 'The Bell Tolls',
										description: 'Each enemy that starts their turn within 3 squares of the gates is I < [average] frightened (EoT) by the gates. The potency increases by 1 for winded enemies.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-fixture-1-2',
										name: 'Undead Dominion',
										description: 'Each of your undead minions has damage immunity 2 while occupying a space within 3 squares of the gates.'
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
										id: 'summoner-4-fixture-5-1',
										name: 'Memento Mori',
										description: 'You gain a surge the first me in a round one of your undead minions unwillingly dies while you have line of eﬀect to the gates. You can choose to give the surge to an ally who also has line of eﬀect to the gates.'
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
										id: 'summoner-4-fixture-9-1',
										name: 'Size Increase',
										description: 'The gates are now Size 3.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-fixture-9-2',
										name: 'Open the Gates',
										description: 'You can use Rise! As a free triggered action each me an enemy dies within 3 squares of the gates while you have line of eﬀect to the gates.'
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
					id: 'summoner-4-2-2',
					name: '5-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-2-2a',
								name: 'Assursed Mummy',
								description: 'The preserved dead, bound for eternal rest, know only violence when robbed of their future. Accursed mummies use their wrappings to bind others to the same fate.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
								keywords: [ 'Mummy', 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 4,
								stability: 2,
								freeStrikeDamage: 3,
								freeStrikeType: DamageType.Poison,
								characteristics: FactoryLogic.createCharacteristics(2, -1, 1, 3, -1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-2-2a-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-4-2-2a-2',
											name: 'Fetid Bindings',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createSpecial('Melee R') ],
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '3 poison damage; pull R',
														tier2: '4 poison damage; pull R + 1',
														tier3: '6 poison damage; pull R + 2'
													})
												),
												FactoryLogic.createAbilitySectionText('A target pulled adjacent to the mummy is M < [strong] weakened (EoT).')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-2-2a-3',
										name: 'Mummy Dust',
										description: 'Whenever the mummy takes damage, each enemy adjacent to the mummy takes 2 poison damage.'
									})
								]
							}),
							cost: 5,
							count: 3
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-2-2b',
								name: 'Ceaseless Mournling',
								description: 'A hulking amalgam of mismatched cadavers with tear stained trenches where their cheeks used to be. Their crying shakes enemies to their bone and renders them struggling to move.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(2),
								speed: FactoryLogic.createSpeed(5, 'burrow'),
								stamina: 4,
								stability: 0,
								freeStrikeDamage: 3,
								freeStrikeType: DamageType.Sonic,
								characteristics: FactoryLogic.createCharacteristics(3, 2, -1, 1, -2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-2-2b-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createBonus({
										id: 'summoner-4-2-2b-2',
										field: FeatureField.Stability,
										valueCharacteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-2-2b-3',
										name: 'Always Crying',
										description: 'At the end of the mournling’s turn, each enemy within 1 of the mournling takes 2 sonic damage and can’t shift until the start of the mournling’s next turn.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-2-2b-4',
										name: 'Immutable Form',
										description: 'The mournling’s shape can’t change via any external eﬀects.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-2-2b-5',
										name: 'Rupture',
										description: 'The first time the mournling burrows out of the ground on their turn, they make a free strike against each adjacent enemy.'
									})
								]
							}),
							cost: 5,
							count: 3
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-2-2c',
								name: 'Phase Ghoul',
								description: 'Phase ghouls are caught between two different manifolds and rapidly flicker between them. They almost appear transparent save for their long, bright blue tongues that appears to lag behind their movements by a full second.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5, 'teleport'),
								stamina: 5,
								stability: 0,
								freeStrikeDamage: 3,
								characteristics: FactoryLogic.createCharacteristics(2, 3, -2, 0, 1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-2-2c-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-2-2c-2',
										name: 'Leaping Strike',
										description: 'The ghoul teleports 5 squares before making a melee free strike. The target is M < [average] knocked prone. If the target is in the air, the potency increases by 1.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-2-2c-3',
										name: 'Nerveless',
										description: 'The ghoul takes no damage from falling and always lands on their feet.'
									})
								]
							}),
							cost: 5,
							count: 3
						})
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
					id: 'summoner-4-5-1',
					name: 'Channel',
					description: `
You can spend 1 uninterrupted minute to perform a ritual and use your body as a host for a willing spirit of a creature who died in the area. While hosting the spirit, you have access to their memories of the 24 hours leading up to their death and any skills they knew in life. You can also magically change your appearance to look like them while they were alive.

You can attempt to stop channeling the spirit at any time. If the spirit is hostile to you or you’ve hosted them for at least 1 hour, you must make a medium Presence test. On success, the spirit leaves your body. On failure, you become fully possessed by a haunt; you have no access to your skills and you can’t get above a tier 2 result on power rolls until you exorcise the haunt either by completing the Find a Cure project or taking a respite with an exorcist.

After you stop channeling their spirit, you can’t use this feature to channel the same creature again.`
				}),
				FactoryLogic.feature.create({
					id: 'summoner-4-5-2',
					name: 'Dread March',
					description: 'You and your undead minions don’t spend additional speed to move through difficult terrain. If any of your undead minions would die while using their move action, they can choose to not die until the end of your turn.'
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-4-5-3',
					name: '7-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-5-3a',
								name: 'False Vampire',
								description: 'A false vampire is a bestial, bipedal ghoul that draws life from liquified remains. In death, their hands have curled into thick hooks, their bodies have darkened until they resemble suits, and their mouths have twisted and extended into large feeding needles that can pierce steel.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(6, 'climb'),
								stamina: 17,
								stability: 2,
								freeStrikeDamage: 8,
								freeStrikeType: DamageType.Acid,
								characteristics: FactoryLogic.createCharacteristics(4, 1, 3, 0, 0),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-5-3a-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-5-3a-2',
										name: 'Proboscis Strike',
										description: 'The false vampire’s melee free strikes have a distance of 2 and inflict M < [average] restrained (EoT). The false vampire can move the target while they are restrained this way. At the start of a restrained creature’s turn, they take acid damage equal to your Reason.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-5-3a-3',
										name: 'Bloodthirsty',
										description: 'The false vampire has a speed of 10 while a creature is bleeding within 10.'
									})
								]
							}),
							cost: 7,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-5-3b',
								name: 'Phantom of the Ripper',
								description: 'These phantoms still puppet along remnants of their corporeal forms. Unlike other spirits, the ripper tears the reality around them and leaves behind distorted or uneven “bumps” in the air. They can also do this to living matter!',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(6, 'fly, hover'),
								stamina: 17,
								stability: 1,
								freeStrikeDamage: 8,
								characteristics: FactoryLogic.createCharacteristics(0, 4, 0, 0, 3),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-5-3b-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-4-5-3b-2',
											name: 'Plunge of the Knife',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One creature or object per minion',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '8 damage; A < [weak] slowed (save ends)',
														tier2: '13 damage; A < [average] slowed (save ends)',
														tier3: '17 damage; A < [strong] slowed (save ends)'
													})
												),
												FactoryLogic.createAbilitySectionText('The phantom deals an additional 3 damage if they have an edge.')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-5-3b-3',
										name: 'Ripping Phase',
										description: 'The phantom can move through other creatures and objects at normal speed. The first time in a round that the phantom passes through a creature, that creature takes 3 corrup on damage and has a bane on their next strike. The phantom doesn’t take damage from being force moved into objects.'
									})
								]
							}),
							cost: 7,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-5-3c',
								name: 'Zombie Titan',
								description: 'Undead giants, or sometimes mishmashes of a graveyard’s entire population. The titan lumbers and slumps across battlefields, wanting desperately to collapse and crash into the earth like a sea of flesh and bone.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(4),
								speed: FactoryLogic.createSpeed(4),
								stamina: 40,
								stability: 0,
								freeStrikeDamage: 7,
								characteristics: FactoryLogic.createCharacteristics(4, 3, 0, 2, 3),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'summoner-4-5-3c-1',
										field: FeatureField.Stability,
										valueCharacteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-5-3c-2',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-5-3c-3',
										name: 'Big Stomp',
										description: 'The titan’s melee free strikes M < [strong] knock the target prone.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-5-3c-4',
										name: 'Overwhelming Size',
										description: 'The titan can move through enemies at normal speed. If the titan ends their turn in a prone size 2 or smaller creature’s space, the creature can’t stand.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-5-3c-5',
										name: 'Flesh to Mountains',
										description: 'When the titan is reduced to 0 Stamina, their space becomes diﬃcult terrain. If a creature was prone underneath the titan when the titan is killed, they take 10 damage and are restrained (save ends).'
									})
								]
							}),
							cost: 7,
							count: 1
						})
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
					id: 'summoner-4-8-1',
					name: 'Kill the Pain',
					description: 'You and each of your undead minions ignore damage rolled as a d3 or a d6 and damage from environmental effects while you are not winded.'
				}),
				FactoryLogic.feature.createSummon({
					id: 'summoner-4-8-2',
					name: 'Portfolio Champion',
					summons: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-4-8-2a',
								name: 'Avatar of Death',
								description: `
Your champion is an Avatar of Death. The number of creatures you and your army have laid to rest now hangs above your head and threatens to crush your skull at any moment. You were unable to gain the power of the ultimate force of nature without a memento mori to keep you humble.

The Avatar of Death weighs down their foes with conditions so their army can take care of the rest. If an enemy can’t handle it, well then maybe they should just die.`,
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Champion),
								keywords: [ 'Undead' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(2),
								speed: FactoryLogic.createSpeed(6, 'fly'),
								stamina: 0,
								stability: 3,
								freeStrikeDamage: 9,
								freeStrikeType: DamageType.Holy,
								characteristics: FactoryLogic.createCharacteristics(5, 2, 5, 2, 2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'summoner-4-8-2a-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-4-8-2a-2',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												value: 5
											}),
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												value: 5
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-4-8-2a-3',
											name: 'Culling Scythe',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee(2) ],
											target: 'Two creatures or objects',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														bonus: 5,
														tier1: '9 corruption damage; M < [weak] bleeding (save ends)',
														tier2: '12 corruption damage; M < [average] bleeding (save ends)',
														tier3: '12 corruption damage; M < [strong] bleeding (save ends)'
													})
												),
												FactoryLogic.createAbilitySectionText('If the target is a creature that isn’t a leader or a solo and they are still bleeding at the end of the encounter, they instantly die.')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-8-2a-4',
										name: 'Revelation Strike',
										description: 'The Avatar’s melee free strikes P < [weak] instantly reduces a winded non-leader or solo creature to 0 Stamina, including targets winded by the strike.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-8-2a-5',
										name: 'Champion’s Ire',
										description: 'If the Avatar only targets one creature or object with a strike, they deal additional damage to the target equal to your Reason.'
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-4-8-2a-6',
											name: 'Dust and Rot',
											type: FactoryLogic.type.createTrigger('The Avatar takes damage.', { free: true }),
											keywords: [ AbilityKeyword.Area ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
											target: 'Each enemy in the burst',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionText('M < [average] weakened (EoT).')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-4-8-2a-7',
										name: '',
										description: 'The Avatar is unaﬀected by diﬃcult terrain and damage from forced movement.'
									})
								]
							}),
							cost: 9,
							count: 1,
							level10: [
								FactoryLogic.feature.createSize({
									id: 'summoner-4-8-2a-10-1',
									sizeValue: 3
								}),
								FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'summoner-4-8-2a-10-2',
										name: 'Gravemaker',
										type: FactoryLogic.type.createChampionAction(),
										keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
										distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 3, within: 1 }) ],
										target: 'All enemies and objects in the line',
										cost: 1,
										sections: [
											FactoryLogic.createAbilitySectionText('9 holy damage. Each target is vertically pulled a number of squares equal to their size straight down, ignoring stability. If the target would be force moved into the ground, they are buried beneath the ground instead.')
										]
									})
								})
							]
						})
					]
				})
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
