import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { MonsterRoleType } from '../../../enums/monster-role-type';
import { SubClass } from '../../../models/subclass';

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
							isSignature: false,
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
							isSignature: false,
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
			features: []
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
			features: []
		},
		{
			level: 10,
			features: []
		}
	],
	selected: false
};
