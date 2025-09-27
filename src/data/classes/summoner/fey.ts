import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { SubClass } from '@/models/subclass';

export const fey: SubClass = {
	id: 'summoner-sub-3',
	name: 'Fey Portfolio',
	description: 'The fey garden of secretaires. Your portfolio features tiny ephemeral fey spirits surrounded by weird and powerful magic.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'summoner-1-1-1',
					name: 'Communication',
					description: 'You can communicate with creatures that have the fey keyword even if you don’t share a language.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-3-1-2',
					name: 'Fairy Whispers',
					description: `
Whenever you send a minion to perform a task for you outside of combat, they can bring back a rumor from the destination you sent them to. When the minion returns, make a **Reason** test:

* **11-**: You learn an undoubtedly false common rumor.
* **12-16**: You learn a common rumor that is most likely true.
* **17+**: You learn an obscure rumor that could either be true or false.

You gain a bane on the test for each subsequent rumor you collect in the same day or in the same location.`
				}),
				FactoryLogic.feature.createMultiple({
					id: 'summoner-3-1-3',
					name: 'Pixie Dust',
					features: [
						FactoryLogic.feature.createBonus({
							id: 'summoner-3-1-3a',
							field: FeatureField.Recoveries,
							value: 2
						}),
						FactoryLogic.feature.create({
							id: 'summoner-3-1-3b',
							name: 'Pixie Dust',
							description: 'Whenever one of your fey minions dies within your Summoner’s Range, you can spend a Recovery to give temporary Stamina equal to your recovery value to each non-minion ally that was adjacent to your minion.'
						})
					]
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-3-1-4',
					name: 'Signature Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-1-4a',
								name: 'Nixie Soakreed',
								description: 'An especially tiny nixie with long hair that curls into reeds. The water they swim in tends to turn thick and cling to surfaces.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(5, 'swim'),
								stamina: 1,
								stability: 0,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(-2, -2, 0, 2, 1),
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-3-1-4a-1',
										name: 'Water Weird',
										description: 'Once per turn, each nixie under your control can teleport to a body of water within 5. The soakreed can’t teleport into water their own soaking bog is currently creating.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-4a-2',
										name: 'Soaking Bog',
										description: 'The area within 1 square of the soakreed is filled with swampy water. An enemy that starts their turn in the area is A < [weak] slowed (EoT). The potency increases by 1 for each additional soaking bog the target occupies (maximum +2).'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-4a-3',
										name: 'Minuscule',
										description: 'The soakreed has cover while occupying a larger creature’s space.'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-1-4b',
								name: 'Pixie Bellringer',
								description: 'Glowing pixies that jingle as they fly. Historically, bellringers worked alongside bowman to ensure their arrows struck true.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Support),
								keywords: [],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(5, 'fly, hover'),
								stamina: 2,
								stability: 0,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(-3, 1, 0, 0, 2),
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-3-1-4b-1',
										name: 'Ringing Strike',
										description: 'The bellringer’s free strikes grant an edge to the next strike made against the target, or a double edge if two or more bellringers strike the same target.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-4b-2',
										name: 'Fairy Chime',
										description: 'Each ally within 1 square of a bellringer has a +1 to saving throws. Each enemy within 1 square of a bellringer has a -1 to saving throws.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-4b-3',
										name: 'Minuscule',
										description: 'The bellringer has cover while occupying a larger creature’s space.'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-1-4c',
								name: 'Sprite Dandeknight',
								description: 'Dandeknights are sprite warriors whose dragonfly wingbeats emit a tonal drone. They’re usually clad in tassels that shift color as they swing their weapons.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 0,
								characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-3-1-4c-1',
										name: 'Magic Strike',
										description: 'When the dandeknight strikes, you can choose one of the following damage types that the strike deals: acid, cold, corruption, fire, lightning, poison, or sonic.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-4c-2',
										name: 'Staccato Swings',
										description: 'The dandeknight makes two free strikes where they normally make one. The damage is added together and treated as a single strike if both strikes hit the same target.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-4c-3',
										name: 'Minuscule',
										description: 'The dandeknight has cover while occupying a larger creature’s space.'
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
					id: 'summoner-3-1-5',
					name: '3-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-1-5a',
								name: 'Pixie Hydrain',
								description: 'A pixie with a delicate array of vibrant flower petals for wings. The color drains from their wings as they call forth acid rain showers.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 5,
								stability: 0,
								freeStrikeDamage: 5,
								freeStrikeType: DamageType.Acid,
								characteristics: FactoryLogic.createCharacteristics(-3, 0, 1, 0, 2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-3-1-5a-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Acid,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-3-1-5a-2',
											name: 'Burning / Healing Rain',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
											distance: [ FactoryLogic.distance.createRanged(5) ],
											target: 'One creature or object per minion',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '5 acid damage; M < [weak] weakened (EoT)',
														tier2: '7 acid damage; M < [average] weakened (EoT)',
														tier3: '9 acid damage; M < [strong] weakened (save ends)'
													})
												),
												FactoryLogic.createAbilitySectionText('After the hydrain’s squad uses this ability, you or one ally within distance can spend a Recovery or end a condition.')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-5a-3',
										name: 'Minuscule',
										description: 'The hydrain has cover while occupying a larger creature’s space.'
									})
								]
							}),
							isSignature: false,
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-1-5b',
								name: 'Pixie Loftlilly',
								description: 'Loftlillies lazily drift through the air in flower cups. They sip on toxic nectar to emit a powerful toxic haze from their skin.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(5, 'fly, hover'),
								stamina: 5,
								stability: 0,
								freeStrikeDamage: 4,
								freeStrikeType: DamageType.Poison,
								characteristics: FactoryLogic.createCharacteristics(-2, 1, 0, 0, 2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-3-1-5b-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-5b-2',
										name: 'Floating Toxins',
										description: 'The area within 1 of the lo􀅌lilly causes each enemy and object with a size equal to your Reason or smaller to float 1 square off the ground. A floating enemy moves 2 additional squares from forced movement and has a bane on strikes if they can’t fly.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-5b-3',
										name: 'Minuscule',
										description: 'The lo􀅌lilly has cover while occupying a larger creature’s space.'
									})
								]
							}),
							isSignature: false,
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-1-5c',
								name: 'Sprite Orchiguard',
								description: 'A sprite surrounded by a wheel of shields. Orchiguards are usually crushed by the pressures of their own impenetrable defenses before ever being felled by enemy hands.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'S'),
								speed: FactoryLogic.createSpeed(6, 'fly'),
								stamina: 8,
								stability: 2,
								freeStrikeDamage: 4,
								characteristics: FactoryLogic.createCharacteristics(0, 2, -1, 1, 1),
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-3-1-5c-1',
										name: 'Fairy Guard',
										description: 'Each non-orchiguard ally takes half damage from abilities while within 1 square of the orchiguard. Whenever the orchiguard reduces damage this way, they take damage equal to half their maximum Stamina and their free strike damage increases by 1.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-1-5c-2',
										name: 'Minuscule',
										description: 'The orchiguard has cover while occupying a larger creature’s space.'
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
