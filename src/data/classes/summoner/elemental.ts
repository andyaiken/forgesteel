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

export const elemental: SubClass = {
	id: 'summoner-sub-2',
	name: 'Elemental Portfolio',
	description: 'The elemental songs of the storm canters. The portfolio contains forces of nature that leave a big impact on the environment.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'summoner-1-1-1',
					name: 'Communication',
					description: 'You can communicate with creatures that have the elemental keyword even if you don’t share a language.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-2-1-2',
					name: 'Heart of Nature',
					description: 'You can sense the presence of creatures with the elemental or dragon keywords within 1 mile of you. You can innately feel their emotions or pain, and you can’t obtain lower than a tier 2 outcome on any Intuition test made to socially interact with them.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-2-1-3',
					name: 'Elemental Affinity',
					description: 'Whenever you use Call Forth to summon one or more non-signature elemental minions, you can summon one bonus signature minion at no cost. You can choose between a signature minion that shares an Element keyword with the minions you summoned (such as fire, earth, or air) or an elemental mote.'
				}),
				FactoryLogic.feature.createSummon({
					id: 'summoner-2-1-4',
					name: 'Signature Minion: Elemental Mote',
					summons: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-1-4a',
								name: 'Elemental Mote',
								description: 'A near-pure form of autonomous essence, just barely maintaining their form. They can shift their nature to match their surroundings.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
								keywords: [ 'Elemental' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(5, 'fly'),
								stamina: 1,
								stability: 0,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 2),
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-2-1-4a-1',
										name: 'Dweomer Burst',
										description: 'When the mote is reduced to 0 Stamina, each enemy adjacent to the mote has a bane on their next strike.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-1-4a-2',
										name: 'Catalyst',
										description: 'Once per turn, the mote can transform into an adjacent allied signature minion, maintaining their current Stamina. Instead, you can spend 1 essence to transform the mote into any signature minion in the elemental portfolio you don’t have. The minion must be reassigned to a new squad if their new name diﬀers from the other squad members.'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						})
					]
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-2-1-5',
					name: 'Signature Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-1-5a',
								name: 'Brisk Gale',
								description: 'The gales are twisting ribbons of cloud and debris endlessly dancing in place. They disrupt the air in the area and allow their allies to move freely.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
								keywords: [ 'Elemental (air)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'S'),
								speed: FactoryLogic.createSpeed(5, 'fly'),
								stamina: 2,
								stability: 0,
								freeStrikeDamage: 1,
								freeStrikeType: DamageType.Sonic,
								characteristics: FactoryLogic.createCharacteristics(-2, 2, 0, 0, 1),
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-2-1-5a-1',
										name: 'Cutting the Air',
										description: 'The gale doesn’t provoke opportunity attacks by moving.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-1-5a-2',
										name: 'Whirlwind',
										description: 'When the gale is reduced to 0 Stamina, winds whip in their space until the end of the encounter. You or any ally that enters this space or starts their turn there can immediately shift 1 (including vertically).'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-1-5b',
								name: 'Fire Plume',
								description: 'A fire plume burns so bright that their true shape is hard to discern from the flames. They sputter and spit motes of fire in high arcs.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
								keywords: [ 'Elemental (fire)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 1,
								stability: 0,
								freeStrikeDamage: 2,
								freeStrikeType: DamageType.Fire,
								characteristics: FactoryLogic.createCharacteristics(-2, 2, 0, 0, 2),
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-2-1-5b-1',
										name: 'Spitfire Strike',
										description: 'The plume’s ranged free strikes have a distance of 10.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-1-5b-2',
										name: 'Pyre',
										description: 'When the plume is reduced to 0 Stamina, their space becomes wreathed in flames until the end of the encounter. An enemy that enters this space or starts their turn there takes 2 fire damage.'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-1-5c',
								name: 'Walking Boulder',
								description: 'A massive clod of animated stone that rolls above smaller piles of rocks that could be perceived as ‘legs’. Boulders are good for taking up space and building barricades.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
								keywords: [ 'Elemental (fire)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(2),
								speed: FactoryLogic.createSpeed(4, 'climb'),
								stamina: 3,
								stability: 0,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, -2, 0, 0, 2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'summoner-2-1-5c-1',
										field: FeatureField.Stability,
										valueCharacteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-1-5c-2',
										name: 'Obstruct',
										description: 'The boulder obstructs line of eﬀect for enemies.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-1-5c-3',
										name: 'Pile Up',
										description: 'When the boulder is reduced to 0 Stamina, they leave behind a stone Wall equal to their size in their space until the end of the encounter.'
									})
								]
							}),
							isSignature: true,
							cost: 1,
							count: 1
						})
					]
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-2-1-6',
					name: '3-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-1-6a',
								name: 'Crux of Ash',
								description: 'A curtain of billowing hot ash with an avian head. They cover their victims in a burning cloak of charcoal and soot.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
								keywords: [ 'Elemental (fire, air)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(6, 'fly'),
								stamina: 6,
								stability: 0,
								freeStrikeDamage: 5,
								characteristics: FactoryLogic.createCharacteristics(-2, -2, 0, 0, 1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-2-1-6a-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Sonic,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Fire,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-1-6a-2',
										name: 'Soot Strike',
										description: 'The crux’s melee free strikes M < [average] automatically hides each ally from the target until the start of the crux’s next turn, the target uses a maneuver to clear the soot, the crux takes damage, or the crux is destroyed.'
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-1-6a-3',
											name: 'Ashen Cloud',
											cost: 1,
											sections: [
												FactoryLogic.createAbilitySectionText('When the crux is reduced to 0 Stamina, the area within 1 square of the crux is clouded by ash until it is dispersed by wind. You and any ally are concealed while occupying an aﬀected square. An enemy can’t establish line of eﬀect beyond the ash while occupying an aﬀected square.')
											]
										})
									})
								]
							}),
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-1-6b',
								name: 'Flow of Magma',
								description: 'A long, serpentine creature of heated rock. They drool trails of lava from their fangs after biting their prey.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
								keywords: [ 'Elemental (fire, earth)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(5, 'climb'),
								stamina: 6,
								stability: 2,
								freeStrikeDamage: 4,
								freeStrikeType: DamageType.Fire,
								characteristics: FactoryLogic.createCharacteristics(2, -2, 0, 0, 1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-2-1-6b-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Fire,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-1-6b-2',
											name: 'Molten Strike',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
											distance: [ FactoryLogic.distance.createMelee(2) ],
											target: 'One creature or object per minion',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '4 fire damage; shift 3',
														tier2: '6 fire damage; shift 4',
														tier3: '8 fire damage; shift 5'
													})
												),
												FactoryLogic.createAbilitySectionText('Each square that the flow shifts into becomes wreathed in flames until the start of the flow’s next turn. An enemy that enters an affected square takes 2 damage.')
											]
										})
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-1-6b-3',
											name: 'Eruption',
											cost: 1,
											sections: [
												FactoryLogic.createAbilitySectionText('When the flow is reduced to 0 Stamina, they launch lava into an area equal to 1 + their size within 5 squares. The aﬀected area becomes diﬃcult terrain for enemies until the end of the encounter. An enemy that enters an aﬀected square or starts their turn there takes A < [average] 4 fire damage.')
											]
										})
									})
								]
							}),
							cost: 3,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-1-6c',
								name: 'Desolation of Sand',
								description: 'The desolations have vaguely humanoid sand forms with no legs. Their glass hose “arms” shift and gristle before firing high pressure streams of sand at their foes.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
								keywords: [ 'Elemental (air, earth)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5, 'burrow'),
								stamina: 5,
								stability: 1,
								freeStrikeDamage: 4,
								characteristics: FactoryLogic.createCharacteristics(1, 2, 0, 0, -2),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-2-1-6c-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Sonic,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-1-6c-2',
										name: 'Burying Strike',
										description: 'The desolation’s free strikes inflict M < [average] slowed (save ends). If the target is already slowed, then they are M < [strong] restrained (EoT).'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-1-6c-3',
										name: 'You Can’t Fight Sand',
										description: 'The desolation doesn’t provoke opportunity attacks by moving.'
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-1-6c-4',
											name: 'Shifting Sand Pit',
											cost: 1,
											sections: [
												FactoryLogic.createAbilitySectionText('When the desolation is reduced to 0 Stamina, the area within 1 square of the desolation becomes diﬃcult terrain for enemies until the end of the encounter. You or any ally that enters the aﬀected area can immediately shift 3.')
											]
										})
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
						id: 'summoner-2-fixture',
						name: 'Primordial Crystal',
						description: 'The storm of elements from Quintessence coalesce into a hardened, crystalline structure. It magnifies the elemental composition of any matter that passes through it, and emits supernatural colors while doing so.',
						role: FactoryLogic.createTerrainRole(MonsterRoleType.Artillery, TerrainRoleType.Relic),
						baseStamina: 20,
						size: FactoryLogic.createSize(2),
						featuresByLevel: [
							{
								level: 1,
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-2-fixture-1-1',
										name: 'Magnetic Pull',
										description: 'Each enemy that starts their turn within 3 squares of the crystal is vertically pulled 3.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-fixture-1-2',
										name: 'Elemental Boost',
										description: 'When you or any ally use a ranged ability that draws a line through the crystal, the distance increases by 5.'
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
										id: 'summoner-2-fixture-5-1',
										name: 'Terra Resonance',
										description: 'You gain a surge the first time in a round an area of terrain gains a supernatural eﬀect (excluding auras) while you have line of eﬀect to the crystal. You can choose to give the surge to an ally who also has line of eﬀect to the crystal.'
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
										id: 'summoner-2-fixture-9-1',
										name: 'Size Increase',
										description: 'The crystal is now Size 3.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-fixture-9-2',
										name: 'Magnified Strike',
										description: 'When you or any ally make a ranged strike that draws a line through the crystal, the user gains a surge which they can use on the ability.'
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
					id: 'summoner-2-2-2',
					name: '5-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-2-2a',
								name: 'Dancing Silk',
								description: 'The silks are akin to baby spiders ballooning through the air on strands of webbing. They spin silk from their legs as they fly, eventually turning huge swaths of the environment into tangled web mazes.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
								keywords: [ 'Elemental (earth, air, green)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'T'),
								speed: FactoryLogic.createSpeed(5, 'fly'),
								stamina: 4,
								stability: 0,
								freeStrikeDamage: 3,
								characteristics: FactoryLogic.createCharacteristics(-1, 2, 3, 0, -1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-2-2-2a-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-2-2a-2',
										name: 'Entangling Strike',
										description: 'The silk’s ranged free strikes inflict A < [average] restrained (EoT). Each creature adjacent to the target is A < [weak] slowed (EoT).'
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-2-2a-3',
											name: 'Web',
											cost: 1,
											sections: [
												FactoryLogic.createAbilitySectionText('When the silk is reduced to 0 Stamina, they launch ribbons of webbing into an area equal to their size + 1 within 5 before being destroyed. The aﬀected area is considered diﬃcult terrain for enemies until the end of the encounter. An enemy that ends their turn in the webbing is M < [strong] slowed (EoT).')
											]
										})
									})
								]
							}),
							cost: 5,
							count: 3
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-2-2b',
								name: 'Principle of the Swamp',
								description: 'The manes of these equine sludge dwellers extends and hooks into things like strong, fraying arms. This allows the principle of the swamp to either pull themselves onto dry land, or pull their prey into the dank depths.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
								keywords: [ 'Elemental (green, water, rot)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(2),
								speed: FactoryLogic.createSpeed(4, 'swim'),
								stamina: 5,
								stability: 0,
								freeStrikeDamage: 4,
								characteristics: FactoryLogic.createCharacteristics(3, -2, 0, 2, -2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'summoner-2-2-2b-1',
										field: FeatureField.Stability,
										valueCharacteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-2-2-2b-2',
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
										id: 'summoner-2-2-2b-3',
										name: 'Encroaching Strike',
										description: 'The principle’s melee free strikes have a distance of R and inflict M < [strong] grabbed. The principle can have an unlimited number of creatures or objects grabbed. A creature grabbed by this strike still has their normal speed, but can’t move further away from the principle.'
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-2-2b-4',
											name: 'Sludgefoot',
											cost: 1,
											sections: [
												FactoryLogic.createAbilitySectionText('When the principle is reduced to 0 Stamina, the area within 1 square of the principle becomes diﬃcult terrain for enemies until the end of the encounter. An enemy that ends their turn in the aﬀected area is pulled 4 towards the center of the area.')
											]
										})
									})
								]
							}),
							cost: 5,
							count: 3
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-2-2c',
								name: 'Quiet of Snow',
								description: 'A pure-white vulpine with six legs that freely sprints through the air. Their howls are telepathic, washing over the receivers with a strong chill and a wave of goosebumps.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
								keywords: [ 'Elemental (air, rot, water)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'S'),
								speed: FactoryLogic.createSpeed(5, 'fly, hover'),
								stamina: 4,
								stability: 1,
								freeStrikeDamage: 4,
								freeStrikeType: DamageType.Cold,
								characteristics: FactoryLogic.createCharacteristics(-1, 2, 0, 0, 3),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-2-2-2c-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Sonic,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Cold,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-2-2c-2',
											name: 'Freezing Strike',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
											distance: [ FactoryLogic.distance.createRanged(5) ],
											target: 'One creature or object per minion',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '4 cold damage; M < [weak] slowed (EoT)',
														tier2: '6 cold damage; M < [average] slowed (EoT)',
														tier3: '8 cold damage; M < [strong] speed is 0 (EoT)'
													})
												),
												FactoryLogic.createAbilitySectionText('Frost slows the enemy down, allowing one ally adjacent to each target to shift 2 and either hide or defend.')
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-2-2c-3',
										name: 'Cold Surge',
										description: 'When the quiet is reduced to 0 Stamina, they launch a refreshing blast of air into an area equal to their size + 1 within 5 before being destroyed. Each ally in the aﬀected area gains a Surge.'
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
					id: 'summoner-2-5-1',
					name: 'Nature Watch',
					description: 'You can spend 1 uninterrupted minute each day to perform a ritual and summon a special elemental mote called a beacon to patrol the area. This mote telepathically communicates any hostile creatures, hazards, or traps within 20 squares of them to you no matter how far away you are. You know the number of nearby hazards and which direction they’re in relative to where the beacon is, but not their exact position. You can have a number of beacons active equal to your level.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-2-5-2',
					name: 'Split',
					description: 'Once during your turn, you can use a free maneuver to deal damage to one of your elemental minions equal to half their maximum Stamina in order to create one additional copy of that minion in an adjacent unoccupied space and add them to their squad, even if you’re at your minion maximum. You can’t use this feature if it would kill one or more of the minions in the squad.'
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'summoner-2-5-3',
					name: '7-Essence Minion',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-5-3a',
								name: 'Iron Reaver',
								description: 'Iron reavers are long, gnashing lines of centipede-like bladed legs. Their bodies endlessly shed metal shavings and hard sheets of iron as they move.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
								keywords: [ 'Elemental (earth, fire, void)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(6, 'burrow'),
								stamina: 10,
								stability: 0,
								freeStrikeDamage: 6,
								characteristics: FactoryLogic.createCharacteristics(3, 4, 0, 0, -1),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-2-5-3a-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createBonus({
										id: 'summoner-2-5-3a-2',
										field: FeatureField.Stability,
										valueCharacteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-5-3a-3',
										name: 'Decentralized Segments',
										description: 'The reaver has cover while adjacent to another reaver they were summoned with. Whenever they receive an eﬀect that allows them to move or shift outside of their move action, they share the eﬀect with each adjacent reaver they were summoned with.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-5-3a-4',
										name: 'Bladed Strike',
										description: 'The reaver’s free strikes inflict M < [weak] bleeding (save ends). Each time the reaver inflicts bleeding on a creature, they can shift 2 and make an additional free strike on a new target.'
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-5-3a-5',
											name: 'Iron Barricade',
											cost: 1,
											sections: [
												FactoryLogic.createAbilitySectionText('When the reaver is reduced to 0 Stamina, they create a line equal to 2 x their size centered on their space of iron shards on the ground until the end of the encounter. You or any ally have cover and damage immunity 2 while occupying an aﬀected square.')
											]
										})
									})
								]
							}),
							cost: 7,
							count: 3
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-5-3b',
								name: 'Knight of Blood',
								description: 'A faceless suit of armor with visible rivers of deep red blood flowing throughout their being. Their blood has a powerful pull to it, causing any open wounds nearby to rip further and leak towards the knight.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
								keywords: [ 'Elemental (earth, fire, rot, water)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(6),
								stamina: 16,
								stability: 0,
								freeStrikeDamage: 7,
								freeStrikeType: DamageType.Corruption,
								characteristics: FactoryLogic.createCharacteristics(4, 2, 0, 0, 3),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-2-5-3b-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createBonus({
										id: 'summoner-2-5-3b-2',
										field: FeatureField.Stability,
										valueCharacteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-5-3b-3',
										name: 'Scarlet Death',
										description: 'The knight’s melee strikes inflict P < [strong] bleeding (save ends). While bleeding this way, the target can’t roll lower than a 3 on the die used to resolve bleeding damage.'
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-5-3b-4',
											name: 'Red River',
											cost: 2,
											sections: [
												FactoryLogic.createAbilitySectionText('When the knight is reduced to 0 Stamina, they move up to their speed ignoring opportunity attacks. Each square that they exit during this movement pools with blood until the end of the encounter. Each aﬀected square is considered diﬃcult terrain for enemies and deals 3 corruption damage to an enemy when they first enter it on a turn. Whenever a bleeding enemy starts their turn, they are pulled 2 towards the nearest aﬀected square, ignoring stability.')
											]
										})
									})
								]
							}),
							cost: 7,
							count: 2
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-5-3c',
								name: 'Light of the Sun',
								description: 'These elementals are blazing white avian-shaped beings that are near impossible to look at directly. Between a light of the sun’s talons is a massive glowing sword that can render the heaviest of defenses weak.',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Support),
								keywords: [ 'Elemental (air, green, fire, void)' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(2),
								speed: FactoryLogic.createSpeed(6, 'fly'),
								stamina: 17,
								stability: 0,
								freeStrikeDamage: 7,
								freeStrikeType: DamageType.Fire,
								characteristics: FactoryLogic.createCharacteristics(0, 2, 4, 0, 3),
								features: [
									FactoryLogic.feature.createDamageModifier({
										id: 'summoner-2-5-3c-1',
										modifiers: [
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Corruption,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											}),
											FactoryLogic.damageModifier.createCharacteristic({
												damageType: DamageType.Fire,
												modifierType: DamageModifierType.Immunity,
												characteristics: [ Characteristic.Reason ]
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-5-3c-2',
											name: 'Solar Blade',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One creature or object per minion',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														characteristic: Characteristic.Reason,
														tier1: '7 fire damage; I < [weak] dazed (EoT)',
														tier2: '11 fire damage; I < [average] dazed (EoT)',
														tier3: '16 fire damage; I < [strong] dazed (save ends)'
													})
												),
												FactoryLogic.createAbilitySectionText('A target dazed by this ability has their stability reduced to 0 until the condition ends.')
											]
										})
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-5-3c-3',
											name: 'Radiant Field',
											cost: 2,
											sections: [
												FactoryLogic.createAbilitySectionText('When the light is reduced to 0 Stamina, the area within 1 square of the light becomes wreathed in sentient flames until the end of the encounter. An enemy that enters this area or starts their turn there takes 3 fire damage and is slowed (EoT). You or any ally that enters this area or starts their turn there gains 5 temporary Stamina and their Speed increased by 2 until the end of their turn.')
											]
										})
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
					id: 'summoner-2-8-1',
					name: 'Control the Elements',
					description: `
Whenever you use Call Forth, you can spend essence to increase the size of one elemental minion you summon as shown on the following table.

| Essence Cost | Size Change               |
|:=============|===========================|
| 1            | The minion becomes size 2 |
| 3            | The minion becomes size 3 |
| 5            | The minion becomes size 4 |

Enlarged minions have their melee distance increased by 1 and inherent damage immunities doubled.`
				}),
				FactoryLogic.feature.createSummon({
					id: 'summoner-2-8-2',
					name: 'Portfolio Champion',
					summons: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'summoner-2-8-2a',
								name: 'Dragon’s Portent',
								description: `
Your champion is a Portent of a dragon yet to manifest. Through defending the innocent, you have made yourself and your elementals a close neighbor to the malice that threatens them. The dragon desires you bring their creation about, and lends you strength to see your justice through.

As a harbinger of ruin, the Dragon’s Portent has incredibly potent impact and control of the environment. Their final shape has yet to be determined; use this to your advantage and call upon the affinity that will end conflict the quickest.`,
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Champion),
								keywords: [ 'Dragon', 'Elemental' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(2),
								speed: FactoryLogic.createSpeed(6, 'fly'),
								stamina: 0,
								stability: 4,
								freeStrikeDamage: 9,
								characteristics: FactoryLogic.createCharacteristics(2, 2, 5, 5, 2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'summoner-2-8-2a-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-8-2a-2',
										name: 'Affinity',
										description: 'The Portent selects an affinity for one of the following damage types when they are summoned: acid, cold, corruption, fire, lightning, or poison. The Portent gains immunity 5 to this damage type. This type determines the  damage type of their abilities and free strikes.'
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'summoner-2-8-2a-3',
											name: 'Elemental Tail Swing',
											type: FactoryLogic.type.createMain(),
											keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee(2) ],
											target: 'Two creatures or objects',
											cost: 'signature',
											sections: [
												FactoryLogic.createAbilitySectionRoll(
													FactoryLogic.createPowerRoll({
														bonus: 5,
														tier1: '9 affinity damage; push 2',
														tier2: '12 affinity damage; push 4',
														tier3: '14 affinity damage; push 6'
													})
												)
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-8-2a-2',
										name: 'Sealing Strike',
										description: 'The Portent’s free strikes inflict M < [strong] slowed (save ends). While slowed this way, the target takes 1d6 aﬃnity damage at the start of each of their turns.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-8-2a-2',
										name: 'Champion’s Ire',
										description: 'If the Portent only targets one creature or object with a strike, they deal additional damage to the target equal to your Reason.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-8-2a-2',
										name: 'Searing Wyrmscale',
										description: 'Whenever an adjacent creature deals damage to the Portent, they take 4 affinity damage.'
									}),
									FactoryLogic.feature.create({
										id: 'summoner-2-8-2a-2',
										name: 'Dragon Heart',
										description: 'Once per turn, the Portent can take 10 damage to allow you or an ally within your Summoner’s Range to gain 1 heroic resource. This damage can’t be reduced in any way.'
									})
								]
							}),
							cost: 9,
							count: 1,
							level10: [
								FactoryLogic.feature.createSize({
									id: 'summoner-2-8-2a-10-1',
									sizeValue: 3
								}),
								FactoryLogic.feature.createAbility({
									ability: FactoryLogic.createAbility({
										id: 'summoner-2-8-2a-10-2',
										name: 'A Breath Felt in a Hurricane ',
										type: FactoryLogic.type.createChampionAction(),
										keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
										distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 10, within: 4 }) ],
										target: 'All enemies and objects in the area',
										cost: 1,
										sections: [
											FactoryLogic.createAbilitySectionText('9 affinity damage. The damage ignores immunity. The affected area becomes difficult terrain. An enemy has affinity weakness 5 while occupying an affected square.')
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
