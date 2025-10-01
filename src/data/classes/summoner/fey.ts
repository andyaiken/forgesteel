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
						id: 'summoner-3-fixture',
						name: 'Glade Pond',
						description: 'The vibrant waters of Arcadia pour through a hole in reality and pool into a verdant cup of paradise. As the pond babbles, it causes the surrounding flora to grow and provides the fey places to hide.',
						role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Hazard),
						baseStamina: 20,
						size: FactoryLogic.createSize(2),
						featuresByLevel: [
							{
								level: 1,
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-3-fixture-1-1',
										name: 'Bubbling Boost',
										description: 'You and each non-minion ally that enters one or more squares within 3 squares of the pond or starts their turn there has their speed increased by 2 until the end of their turn.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-fixture-1-2',
										name: 'Overgrowth',
										description: 'Each of your fey minions that ends their turn within 3 squares of the pond is hidden until the start of their next turn.'
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
										id: 'summoner-3-fixture-5-1',
										name: 'Garden of Jest',
										description: 'You can spend a recovery the first me in a round a creature gains or starts their turn with a condition while you have line of eﬀect to the pond. You can choose to enable an ally who also has line of eﬀect to the boil to spend a recovery instead.'
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
										id: 'summoner-3-fixture-9-1',
										name: 'Size Increase',
										description: 'The pond is now Size 3.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-fixture-9-2',
										name: 'Folly Field',
										description: 'Each non-fey enemy that starts their turn within 3 squares of the pond has a -1 penalty to saving throws and resis ng potent eﬀects until the start of their next turn.'
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
					id: 'summoner-3-2-2',
					name: '5-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-2-2a',
								name: 'Nixie Hemloche',
								description: 'A spotted nixie whose long, wavy hair endlessly bobs and flows into the water surrounding them. Any sailor caught in a whirlpool created by hemloches knows that their ship won’t survive the encounter.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(6, 'swim'),
								stamina: 4,
								stability: 0,
								freeStrikeDamage: 3,
								freeStrikeType: DamageType.Lightning,
								characteristics: FactoryLogic.createCharacteristics(-2, 0, 1, 3, 2),
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-3-2-2a-1',
										name: 'Water Weird',
										description: 'Once per turn, each nixie under your control can teleport to a body of water within 6. The hemloche can’t teleport into water their own whirling waves is currently creating.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-2-2a-2',
										name: 'Whirling Waves',
										description: 'The area within 1 square of the hemloche is filled with churning water and is considered diﬃcult terrain. At the end of the hemloche’s turn, the hemloche can choose to slide each enemy in the aﬀected area 3 squares. An enemy that takes damage while being force moved is also M < [average] knocked prone.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-2-2a-3',
										name: 'Minuscule',
										description: 'The hemloche has cover while occupying a larger creature’s space.'
									})
								]
							}),
							cost: 5,
							count: 3
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-2-2b',
								name: 'Sprite Foxglow',
								description: 'Foxglows are masked sprites that leave behind an evanescent trail of tiny glowing orbs as they fly. They beat their wings at a frequency that completely blocks out all nearby noise.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(8, 'fly'),
								stamina: 5,
								stability: 0,
								freeStrikeDamage: 4,
								freeStrikeType: DamageType.Fire,
								characteristics: FactoryLogic.createCharacteristics(-1, 3, 0, 1, 2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-3-2-2b-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Fire,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-2-2b-2',
										name: 'Flash Strike',
										description: 'The foxglow’s melee strikes inflict I < [strong] dazed (EoT) if they were hidden.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-2-2b-3',
										name: 'Quiet Flight',
										description: 'The area within 2 squares of the foxglow is completely silent. Each enemy has a bane on tests made to search for the foxglow and allies hidden in the aﬀected area.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-2-2b-4',
										name: 'Minuscule',
										description: 'The foxglow has cover while occupying a larger creature’s space.'
									})
								]
							}),
							cost: 5,
							count: 3
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-2-2c',
								name: 'Pixie Rosenthall',
								description: 'The collective of warrior, blood-eyed pixies that make up a rosenthall are also known as rosies. It’s said that some rosenthall armies contain thousands of pixies and can span half the length of a wode.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(2),
								speed: FactoryLogic.createSpeed(6, 'fly, hover'),
								stamina: 5,
								stability: 1,
								freeStrikeDamage: 3,
								characteristics: FactoryLogic.createCharacteristics(0, 2, 4, 0, 3),
								features: [
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-3-2-2c-1',
											name: 'Stickerbush Symphony',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee(2) ],
											target: 'One creature or object per minion',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '3 damage; pull 2; A < [weak] bleeding (EoT)',
														tier2: '6 damage; pull 3; A < [average] bleeding (EoT)',
														tier3: '8 damage; pull 4; A < [strong] bleeding (EoT)'
													})
												),
												FactoryLogic.createAbilitySectionText('A target can’t shift while bleeding from this ability.')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-2-2c-2',
										name: 'Swarm',
										description: 'The rosenthall can move through squares as if they were size-1T, and can occupy other creatures’ spaces. At the start of the rosenthall’s turn, they deal 2 damage to each enemy they share a square with.'
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
					id: 'summoner-3-5-1',
					name: 'Flash Powder',
					description: `
Your number of Recoveries further increases by 2.

Each ally that gains temporary Stamina from your Pixie Dust feature also gains one of the following effects until the end of their next turn (or for 10 minutes if used outside of combat):

* **Flight**: Their speed gains the Fly keyword.
* **Vanish**: They become invisible.
* **Water Weird**: As a free action, they can teleport to a body of water within 5 once during their turn.
* **Panacea**: They can end one condition affecting them or stand up.`
				}),
				FactoryLogic.feature.create({
					id: 'summoner-3-5-2',
					name: 'Pixie Lift',
					description: `
Your speed gains the Fly and Hover keywords. You lose the Hover keyword from this feature while you are dazed, dying, or you fly more than 1 square above the surface of the ground.

If your speed previously had the Fly keyword, you can now fly while sneaking an additional number of squares equal to your Reason.`
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-3-5-3',
					name: '7-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-5-3a',
								name: 'Nixie Corallia',
								description: 'Corallias are saltwater nixies with coarse, coral-like skin and curly hair with sharp hook ends. The salt that comes off of their bodies has been used to hallow places of worship and ward off demons.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Support),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(6, 'swim'),
								stamina: 17,
								stability: 0,
								freeStrikeDamage: 7,
								freeStrikeType: DamageType.Lightning,
								characteristics: FactoryLogic.createCharacteristics(-2, 3, 3, 4, 1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-3-5-3a-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Lightning,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-5-3a-2',
										name: 'Water Weird',
										description: 'Once per turn, each coralia in a squad can teleport to a body of water within 6. The coralia can’t teleport into water their own pooling magic is currently creating.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-5-3a-3',
										name: 'Seafoam Pool',
										description: 'The area within 2 squares of the coralia is filled with purifying saltwater that disables the eﬀects of diﬃcult terrain created by enemies. At the end of the coralia’s turn, the coralia can scrub you or an ally in the aﬀected area and end one condition.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-5-3a-4',
										name: 'Minuscule',
										description: 'The coralia has cover while occupying a larger creature’s space.'
									})
								]
							}),
							cost: 7,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-5-3b',
								name: 'Pixie Belladonix',
								description: 'The belladonix are among an archfey’s elite guard and carry themselves like royalty. Their moth-like wings ooze with vibrant colors and are barbed; the poison within threatening to completely shift the reality of their victims.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(6, 'fly, hover'),
								stamina: 16,
								stability: 0,
								freeStrikeDamage: 8,
								freeStrikeType: DamageType.Poison,
								characteristics: FactoryLogic.createCharacteristics(-2, 2, 4, 0, 4),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-3-5-3b-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-3-5-3b-2',
											name: 'A Thorn, Woe to the Pricked ',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
											distance: [ FactoryLogic.distance.createRanged(15) ],
											target: 'One creature or object per minion',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '8 poison damage; M < [weak] restrained (save ends)',
														tier2: '12 poison damage; M < [average] restrained (save ends)',
														tier3: '17 poison damage; M < [strong] restrained (save ends)'
													})
												),
												FactoryLogic.createAbilitySectionText('A target restrained by this ability is trapped in a poison fueled haze and considers each creature within 1 square of them to be an enemy until the condition ends.')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-5-3b-3',
										name: 'Minuscule',
										description: 'The belladonix has cover while occupying a larger creature’s space.'
									})
								]
							}),
							cost: 7,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-5-3c',
								name: 'Sprite Oleandercules',
								description: 'These sprites wear heavy beetle armor and have a halo hovering away from their backs where their wings used to be. The faster the halo spins, the more power the oleandercules generates, enabling them to stand toe to toe with giants.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(6, 'fly'),
								stamina: 17,
								stability: 0,
								freeStrikeDamage: 8,
								characteristics: FactoryLogic.createCharacteristics(4, 3, 0, 1, 2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'summoner-3-5-3c-1',
										field: FeatureField.Stability,
										valueCharacteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-5-3c-2',
										name: 'Warrior’s Toss',
										description: 'The oleandercules’ melee strikes inflict push 4. If the target is force moved into an object, they are M < [average] knocked prone and can’t stand (save ends).'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-5-3c-3',
										name: 'Use Their Might',
										description: 'When targeting a creature with a grab or forced movement, the oleandercules’ size is considered one larger than the target.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-5-3c-4',
										name: 'Minuscule',
										description: 'The oleandercules has cover while occupying a larger creature’s space.'
									})
								]
							}),
							cost: 7,
							count: 2
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
					id: 'summoner-3-8-1',
					name: 'The Archfey\'s Will',
					description: `
The characteristic scores of you and each of your fey minions are considered 1 higher for the purposes of resisting potencies. If a characteristic would hit a maximum value this way, that maximum value also increases by 1.

Additionally, any of your fey minions’ traits that affect adjacent creatures and/or the area within 1 or more squares of them have that distance increased by 1 square.`
				}),
				FactoryLogic.feature.createSummon({
					id: 'summoner-3-8-2',
					name: 'Portfolio Champion',
					summons: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-3-8-2a',
								name: 'Celestial Attendant',
								description: `
Your champion is an Attendant of a celestial. Whenever you call on their assistance, you must formally welcome and introduce them to the occasion. You can’t be certain if this is truly the blessing of a celestial you’ve previously allied yourself with, or if you’ve received someone else’s power—neither circumstance puts you in any less danger.

The Celestial Attendant wants to swarm the map with pixies while limiting their foes’ ability to do anything about it. A single neurotoxic strike is all it takes to move everyone into position.`,
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Champion),
								keywords: [ 'Fey' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(2),
								speed: FactoryLogic.createSpeed(7, 'fly, hover'),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 9,
								freeStrikeType: DamageType.Poison,
								characteristics: FactoryLogic.createCharacteristics(2, 2, 5, 2, 5),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'summoner-3-8-2a-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-3-8-2a-2',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Damage,
												modifierType: DamageModifierType.Immunity,
												value: 2
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-3-8-2a-3',
											name: 'Pixie Swarm',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: 'Two creatures or objects',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														bonus: 5,
														tier1: '9 damage; slide 3',
														tier2: '12 damage; slide 5',
														tier3: '14 damage; slide 6'
													})
												),
												FactoryLogic.createAbilitySectionText('An ally targeted by this ability can, instead, spend a recovery and shift the slide amount.')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-8-2a-4',
										name: 'Neurotoxic Strike',
										description: 'The Attendant’s free strikes inflict the target with I < [average] being unable to establish line of eﬀect beyond 3 squares (EoT).'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-8-2a-5',
										name: 'Champion’s Ire',
										description: 'If the Attendant only targets one creature or object with a strike, they deal additional damage to the target equal to your Reason.'
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-3-8-2a-6',
											name: 'Celestial Bell',
											type: FactoryLogic.type.createTrigger('The Attendant takes damage from an enemy.', { free: true }),
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											sections: [
												FactoryLogic.createAbilitySectionText('The Attendant rings a bell, and you summon a signature minion into an unoccupied space adjacent to the Attendant.')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-3-8-2a-7',
										name: 'Pixie Bouquet',
										description: 'The Attendant starts their turn with temporary Stamina equal to 2 x the number of fey minions within 1 square of them. This temporary Stamina lasts until the start of their next turn.'
									})
								]
							}),
							cost: 9,
							count: 1,
							level10: [
								FactoryLogic.feature.createSize({
									id: 'summoner-3-8-2a-10-1',
									sizeValue: 3
								}),
								FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'summoner-3-8-2a-10-2',
										name: 'A Shower of Dust ',
										type: FactoryLogic.type.createChampionAction(),
										distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 20 }) ],
										target: 'Self and all non-minion allies in the area',
										cost: 1,
										sections: [
											FactoryLogic.createAbilitySectionText('Each target gains 20 temporary Stamina and receives the benefits of one of your Flash Powder effects until the end of their next turn.')
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
