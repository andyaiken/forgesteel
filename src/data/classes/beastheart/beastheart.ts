import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { HeroClass } from '@/models/class';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
import { guardian } from './guardian';
import { prowler } from './prowler';
import { punisher } from './punisher';
import { spark } from './spark';

export const beastheart: HeroClass = {
	id: 'class-beastheart',
	name: 'Beastheart',
	description: `
A beastheart never fights alone! You travel with a ferocious beast by your side—no trained pet, but an untamed wild creature such as a wolf, a basilisk, or even a young dragon. Bound to you by a primordial connection, your companion honors your wishes just as you are guided by your companion’s instincts. But beware: as battle rages on, your companion may become lost in a blood-soaked rampage, lashing out at enemies and friends alike.

Play a beastheart if you want to face the world’s dangers with your mighty wild companion by your side, rushing into the thick of combat to challenge enemy champions or prowling around the outskirts to pick off vulnerable foes.`,
	type: 'standard',
	subclassName: 'Wild Nature',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Might, Characteristic.Intuition ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'beastheart-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 12
				}),
				FactoryLogic.feature.createBonus({
					id: 'beastheart-recoveries',
					field: FeatureField.Recoveries,
					value: 12
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'beastheart-resource',
					name: 'Ferocity',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '1d3'
						},
						{
							tag: 'deal-damage-self',
							trigger: 'The first time in a round that you deal damage',
							value: '1'
						},
						{
							tag: 'deal-damage-companion',
							trigger: 'The first time in a round that your companion deals damage',
							value: '1'
						}
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-1-1a',
					selected: [ 'Handle Animals' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-1-1b',
					listOptions: [ SkillList.Exploration, SkillList.Intrigue ],
					count: 2
				}),
				FactoryLogic.feature.createSummonChoice({
					id: 'beastheart-1-2a',
					name: 'Companion',
					description: 'You gain the companionship of a wild animal that shares your travels. Your companion isn’t your pet—rather, they share a mystical bond with you, a bond that allows you to share your companion’s senses and primal instincts.',
					options: [
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-1',
								name: 'Basilisk',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 2,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-1-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-1-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createDamageModifier({
										id: 'beastheart-1-2a-1-3',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												value: 3
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-1-4',
											name: 'Turn to Stone',
											description: 'Transfixed by the basilisk’s magical gaze or poisoned claws, the foe’s body begins to calcify.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
											distance: [
												FactoryLogic.distance.createMelee(),
												FactoryLogic.distance.createRanged(5)
											],
											target: 'One enemy',
											sections: [
												FactoryLogic.createAbilitySectionText('2 + M corruption damage; stoned (Save Ends)'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'While stoned, the target is slowed.'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-1-5',
										name: 'Stoned',
										description: 'Some of the basilisk’s abilities can inflict the Stoned condition. Until the condition ends, a stoned target is magically turning to stone. Each time a creature fails a saving throw against this condition, they take corruption damage equal to the basilisk’s Might score. The creature or a creature adjacent to them can use a maneuver to cut the encroaching stone from the target’s body, ending the condition and dealing damage equal to twice the basilisk’s Might score that can’t be reduced in any way. A creature reduced to 0 Stamina while they have the Stoned condition, or by an attack that inflicts the Stoned condition on the target, is turned to stone until they are restored to life by magical means.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-1-3-1',
									name: 'Foes Forever Frozen',
									description: 'When the basilisk hits a creature with a strike while rampaging, the creature is stoned (save ends).'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-1-6-1',
									name: 'Rock Smasher',
									description: 'While the basilisk is rampaging, when you deal rolled damage to a stoned creature you deal extra damage equal to twice your Might score.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-1-10-1',
									name: 'Heart of Stone',
									description: 'While the basilisk is rampaging, you and the basilisk become living statues, impervious to most damage. You and the basilisk have damage immunity 10.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-2',
								name: 'Bear',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(5, 'climb'),
								stamina: 0,
								stability: 2,
								freeStrikeDamage: 2,
								characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-2-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-2-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-2-3',
										selected: [ 'Intimidate' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-2-4',
											name: 'Backhand',
											description: 'The bear casually swats the pesky foe into next week.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One creature or object',
											sections: [
												FactoryLogic.createAbilitySectionText('3 + M damage; push 2'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'The target is pushed up to an additional number of squares equal to the bear’s Might score.'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-2-5',
										name: 'Shared Stability',
										description: 'The beastheart gains a +1 bonus to their Stability.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-2-3-1',
									name: 'Foe Thresher',
									description: 'When the bear hits a creature with a strike while rampaging, the bear can push the creature up to a number of squares equal to the bear’s Might score if the strike doesn’t otherwise force move the target.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-2-6-1',
									name: 'Ursine Form',
									description: 'While the bear is rampaging, you have damage immunity 5 and your size changes to match the bear’s size (maximum 2). If there is not enough unoccupied space for your size to increase, it increases as soon as there is sufficient space.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-2-10-1',
									name: 'Twin Colossi',
									description: 'While the bear is rampaging, the distance of your melee and weapon abilities increases by 1, your size changes to match the bear’s size (maximum 3), and your strikes deal an extra 5 damage.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-3',
								name: 'Boar',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 2,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-3-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-3-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-3-3',
										selected: [ 'Search' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-3-4',
											name: 'Gore',
											description: 'With an enraged snort, the boar lunges forward to rip open foes with their tusks.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One creature or object',
											sections: [
												FactoryLogic.createAbilitySectionText('The boar moves up to their speed in a straight line, and can then deal 2 + M damage to an adjacent target. If the boar moved closer to the target as part of this ability’s movement, the boar deals extra damage equal to their Might score.'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'The target is bleeding (EoT).'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-3-5',
										name: 'Spiteful Endurance',
										description: 'While the boar is winded, they gain damage immunity equal to their Might score and they ignore damage from the Bleeding condition.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-3-3-1',
									name: 'Greased Pig',
									description: 'While the boar is rampaging, the boar has a +2 bonus to speed and has a double edge on the Escape Grab maneuver.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-3-6-1',
									name: 'Wild Rush',
									description: 'While the boar is rampaging, you can use the Gore maneuver, and when either of you uses the Charge action or the Gore maneuver you can shift instead of move.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-3-10-1',
									name: 'Immortal Rage',
									description: 'While the boar is rampaging, when one of you uses an ability that deals damage you gain 10 temporary Stamina.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-4',
								name: 'Condor',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(7, 'fly'),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-4-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-4-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-4-3',
										selected: [ 'Alertness' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-4-4',
											name: 'Flurry of Wings',
											description: 'I can’t draw a bead on them with that infernal bird flapping in my face!',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One enemy',
											sections: [
												FactoryLogic.createAbilitySectionText('2 + M damage; until the end of your next turn, enemies are weakened while adjacent to the condor.'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'When an enemy would be weakened by this ability, they are taunted instead.'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-4-5',
										name: 'Moving Target',
										description: 'Ranged attacks against the condor have a bane while the condor is flying and has a speed greater than 0.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-4-3-1',
									name: 'Dive Bomb',
									description: 'When the condor makes a strike while rampaging, they deal extra damage equal to the number of squares they already moved on their turn, up to a maximum of 5.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-4-6-1',
									name: 'Borne Aloft',
									description: 'While the condor is rampaging, you gain wings. You can fly, and you have a +2 bonus to your speed while flying. When this flight ends, you descend harmlessly.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-4-10-1',
									name: 'Flight of the Condor',
									description: 'While the condor is rampaging, both of your speeds increase by 5.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-5',
								name: 'Deinonychus',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(7),
								stamina: 0,
								stability: 1,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-5-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-5-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-5-3',
										selected: [ 'Track' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-5-4',
											name: 'Terrible Claw',
											description: 'The deinonychus kicks their prey, slashing them with their wicked claws.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One enemy',
											sections: [
												FactoryLogic.createAbilitySectionText('2 + M damage; bleeding (EoT)'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'The target is bleeding (save ends) instead of bleeding (EoT).'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-5-5',
										name: 'Blood Frenzy',
										description: 'The deinonychus gains a surge when they deal damage to a bleeding creature.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-5-3-1',
									name: 'Tear You to Ribbons',
									description: 'When the deinonychus strikes a creature while rampaging, the creature is bleeding (save ends). Until the condition ends, the target is also slowed.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-5-6-1',
									name: 'Slake my Thirst in Blood',
									description: 'While the deinonychus is rampaging, when you use an action that deals rolled damage to a bleeding creature you gain 2 surges.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-5-10-1',
									name: 'Reaping Scythe',
									description: 'The deinonychus’s claws slash at creatures underfoot. While rampaging, the first time on a turn the deinonycus moves adjacent to each enemy or enters their space, the deinonychus deals damage to the enemy equal to the deinonychus’s Might score.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-6',
								name: 'Drake',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5, 'fly'),
								stamina: 0,
								stability: 1,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-6-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-6-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-6-3',
											name: 'Drake Breath',
											description: 'The drake exhales a blast of flesh-melting energy.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Area ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 1 }) ],
											target: 'Each creature in the area',
											sections: [
												FactoryLogic.createAbilitySectionText('M damage of the attuned damage type (see Elementally Attuned)'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													repeatable: true,
													effect: 'For each ferocity you spend (max 4), the damage increases by 1 and the size of the cube increases by 1.'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-6-4',
										name: 'Elementally Attuned',
										description: 'When you gain this companion, choose a damage type from acid, cold, corruption, fire, lightning, poison, or sonic. The drake is attuned to that damage type. Their attuned damage type affects their other features.'
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-6-5',
										name: 'Shared Immunity',
										description: 'You gain immunity 3 to the drake’s attuned damage type.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-6-3-1',
									name: 'Endless Breath',
									description: 'When the drake uses Drake Breath, they don’t need to spend ferocity to change its size and damage.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-6-6-1',
									name: 'A Burning Inside Me',
									description: `
While the drake is rampaging, you gain draconic wings. You can fly. When this flight ends, you descend harmlessly.

Additionally, you can use Drake Breath. You don’t need to spend ferocity to change its size and damage.`
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-6-10-1',
									name: 'Elemental Avatar',
									description: 'While the drake is rampaging, you and your companion gain immunity to the drake’s attuned damage type, and when you or the drake hit a creature with an attack the creature is dragonsealed (save ends). While dragonsealed, the creature has weakness 10 against the drake’s attuned damage type.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-7',
								name: 'Gummy Ball',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 2,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-7-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-7-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createDamageModifier({
										id: 'beastheart-1-2a-7-3',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Acid,
												modifierType: DamageModifierType.Immunity,
												value: 3
											})
										]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-7-4',
											name: 'Absorb',
											description: 'With a sickening squelch, the sphere oozes around their hapless prey.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One enemy',
											sections: [
												FactoryLogic.createAbilitySectionText('2 + M acid damage; A < [average], the sphere moves into the target’s space. If the target is completely within the sphere’s space, the target is grabbed.'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'Until the grab ends, the creature takes acid damage equal to the sphere’s Might score at the end of each of the sphere’s turns.'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-7-5',
										name: 'Gelatinous',
										description: 'The sphere can share a creature’s space. While sharing a creature’s space, the sphere has line of effect to the creature. If the creature is completely within the sphere’s space, the creature has line of effect only to the sphere. The sphere’s space is difficult terrain.'
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-7-6',
										name: 'Roll With It',
										description: 'When the sphere would gain the prone condition, they can instead shift one square.'
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-7-7',
										name: 'Translucent',
										description: 'The sphere is hidden until they act.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-7-3-1',
									name: 'Suck it Up',
									description: 'When the sphere strikes a creature while rampaging, the creature is pulled up to 3 squares into the sphere’s space. If the creature ends this movement completely within the sphere, the creature is grabbed.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-7-6-1',
									name: 'A Burning Inside Me',
									description: 'While the sphere is rampaging, your arms and legs become viscous and stretchy. Your speed and melee distance gain a +2 bonus.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-7-10-1',
									name: 'Runaway Expansion',
									description: 'While the sphere is rampaging, whenever a creature is reduced to 0 Stamina while inside the sphere the sphere’s size increases by 1, to a maximum of 5. The sphere’s size can’t increase in this way more than once per turn, and the sphere returns to its true size when its rampage ends. Additionally, you and the sphere gain acid immunity 10.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-8',
								name: 'Hellhound',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(7),
								stamina: 0,
								stability: 1,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-8-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-8-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createDamageModifier({
										id: 'beastheart-1-2a-8-3',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Fire,
												modifierType: DamageModifierType.Immunity,
												value: 3
											})
										]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-8-4',
										selected: [ 'Intimidate' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-8-5',
											name: 'Fire Breath',
											description: 'The hellhound exhales infernal flames.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee ],
											distance: [ FactoryLogic.distance.createMelee(2) ],
											target: 'One creature or object',
											sections: [
												FactoryLogic.createAbilitySectionText('2 + M fire damage'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'The hellhound adds their Intuition score to either the damage or the range.'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-8-6',
										name: 'Hellish Pact',
										description: 'You gain fire immunity equal to the hellhound’s fire immunity.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-8-3-1',
									name: 'Infernal Apparition',
									description: 'When the hellhound strikes a creature while rampaging, a target who has P < [average] is frightened.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-8-6-1',
									name: 'Mad Dog',
									description: 'While the hellhound is rampaging, your jaws slaver with acidic foam. When you strike a creature, you deal extra acid damage equal to your Might score.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-8-10-1',
									name: 'Wreathed in Flames',
									description: 'While the hellhound is rampaging, you and the hellhound are surrounded by an aura of flames. Enemies that start their turn adjacent to you or the hellhound take fire damage equal to the hellhound’s Might score.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-9',
								name: 'Lightbender',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'L'),
								speed: FactoryLogic.createSpeed(7),
								stamina: 0,
								stability: 2,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 2, 2),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-9-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-9-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-9-3',
										selected: [ 'Hide' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-9-4',
											name: 'Sparkling Tail Whip',
											description: 'The lightbender swings their tail, sending gouts of sparks in their foe’s face.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One enemy',
											sections: [
												FactoryLogic.createAbilitySectionText(`
2 + M damage; I < [average], dazzled (EoT)

A dazzled creature can’t have line of effect to targets who aren’t adjacent to them.`),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'A dazzled creature also has a bane on strikes.'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-9-5',
										name: 'Avoidance',
										description: 'The lightbender always treats a save ends effect as an EoT effect.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-9-3-1',
									name: 'Hit and Run',
									description: 'When the lightbender strikes a creature while rampaging, the lightbender can teleport up to 5 squares and use the Hide maneuver.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-9-6-1',
									name: 'Lightbearer',
									description: 'While the lightbender is rampaging, you can use a free maneuver to glow with blinding light or to extinguish the glow. The glow is extinghished when the rampage ends. While glowing, your skin sheds light for 10 squares and strikes against you take a bane.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-9-10-1',
									name: 'Everywhere and Nowhere',
									description: 'While the lightbender is rampaging, your grip on spatial reality is weakened. Once on each of your turns, as a free maneuver either you or the lightbender can teleport up to 3 spaces. Additionally, enemies’ strikes that target you or the lightbender automatically get a result that is one tier lower, to a minimum of 1.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-10',
								name: 'Panther',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(7, 'climb'),
								stamina: 0,
								stability: 1,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-10-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-10-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-10-3',
										selected: [ 'Sneak' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-10-4',
											name: 'Pounce',
											description: 'The panther bunches themself up and then uncoils into a deadly leap.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One enemy',
											sections: [
												FactoryLogic.createAbilitySectionText('2 + M damage; M < [average], prone'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'The panther can jump up to their speed before using this ability. If they jump at least 1 square in this way, a target who is M < [strong] is prone.'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-10-5',
										name: 'Mighty Spring',
										description: 'When the panther takes the Advance move action or takes the Charge action, as part of the movement they can jump up to their speed in any direction, including vertically.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-10-3-1',
									name: 'Primordial Pounce',
									description: 'When the panther strikes a creature while rampaging, the creature is knocked prone.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-10-6-1',
									name: 'Single Bound',
									description: 'While the panther is rampaging, once on your turn you can use a free maneuver to jump up to a number of squares equal to your speed.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-10-10-1',
									name: 'Panther Spirit',
									description: 'While the panther is rampaging, you and the panther are invisible and can pass through objects and terrain as if they were difficult terrain. A creature that ends their turn inside a solid object in this way is teleported to the last empty space they occupied.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-11',
								name: 'Spider',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(5, 'climb'),
								stamina: 0,
								stability: 1,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-11-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-11-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-11-3',
										selected: [ 'Sneak' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-11-4',
											name: 'Web Shot',
											description: 'The spider fires a ball of sticky silk.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createRanged(5) ],
											target: 'One enemy',
											sections: [
												FactoryLogic.createAbilitySectionText('M < [average], restrained (EoT)'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'M < [strong], restrained (save ends)'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-11-5',
										name: 'Come Into My Parlor',
										description: 'When the spider strikes a restrained creature, the spider deals extra poison damage equal to twice the spider’s Intuition score.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-11-3-1',
									name: 'Dripping Fangs',
									description: 'When the spider hits a creature with a strike while rampaging, the creature takes poison damage equal to the spider’s Might score.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-11-6-1',
									name: 'Web Slinger',
									description: 'While the spider is rampaging, once on your turn you can use a free maneuver to shoot a web to a ceiling, wall, or sturdy object above you within 5 squares. You can then fly in a straight line to any space within 5 squares of that object.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-11-10-1',
									name: 'Life Drinker',
									description: 'While the spider is rampaging, when you or the spider attack with a maneuver that deals damage, the attacker regains Stamina equal to the damage dealt.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-12',
								name: 'Sporeling',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'S'),
								speed: FactoryLogic.createSpeed(5),
								stamina: 0,
								stability: 0,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-12-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-12-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createDamageModifier({
										id: 'beastheart-1-2a-12-3',
										modifiers: [
											FactoryLogic.damageModifier.create({
												damageType: DamageType.Poison,
												modifierType: DamageModifierType.Immunity,
												value: 3
											})
										]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-12-4',
										selected: [ 'Hide' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-12-5',
											name: 'Spore Puff',
											description: 'The sporeling breathes a cloud of disorienting fumes.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One enemy',
											sections: [
												FactoryLogic.createAbilitySectionText('2 + M poison damage; the sporeling is invisible to the enemy until the end of the sporeling’s next turn or the sporeling deals damage to the enemy.'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'An enemy affected by Spore Puff who is M < [strong] is dazed (EoT).'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-12-6',
										name: 'Skulker',
										description: 'The sporeling can end their movement in allies’ spaces. While in an ally’s space, the sporeling has cover.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-12-3-1',
									name: 'Slowing Spores',
									description: 'When the sporeling hits a creature with a strike while rampaging, the creature is slowed (EoT).'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-12-6-1',
									name: 'Plant Walk',
									description: 'While the sporeling is rampaging, once on your turn can use a free maneuver to teleport to a space within 15 squares, provided the space or an adjacent space contains your companion or size 1S or larger plants or fungus. You then gain an edge on the next strike you make before the end of your turn.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-12-10-1',
									name: 'Trailing Mycelia',
									description: 'While the sporeling is rampaging, your and the sporeling’s limbs sprout rootlike, gripping mycelia. While the sporeling is rampaging, you and the sporeling can’t be force moved or knocked prone, and when you or the sporeling strike a creature who is M < [strong] the creature is grabbed.'
								})
							]
						}),
						FactoryLogic.createSummon({
							monster: FactoryLogic.createMonster({
								id: 'beastheart-1-2a-13',
								name: 'Wolf',
								level: 0,
								role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Companion),
								keywords: [ 'Animal' ],
								encounterValue: 0,
								size: FactoryLogic.createSize(1, 'M'),
								speed: FactoryLogic.createSpeed(7),
								stamina: 0,
								stability: 1,
								freeStrikeDamage: 1,
								characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 2, 1),
								features: [
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-13-1',
										field: FeatureField.Stamina,
										valueFromController: FeatureField.Stamina
									}),
									FactoryLogic.feature.createBonus({
										id: 'beastheart-1-2a-13-2',
										field: FeatureField.FreeStrikeDamage,
										valueCharacteristics: [ Characteristic.Might ]
									}),
									FactoryLogic.feature.createSkillChoice({
										id: 'beastheart-1-2a-13-3',
										selected: [ 'Track' ]
									}),
									FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'beastheart-1-2a-13-4',
											name: 'Clamping Jaws',
											description: 'With an unnerving growl, the wolf sinks powerful teeth onto their quarry.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One enemy',
											sections: [
												FactoryLogic.createAbilitySectionText('2 + M damage; M < [average], grabbed'),
												FactoryLogic.createAbilitySectionField({
													name: 'Spend',
													value: 1,
													effect: 'M < [strong], grabbed'
												})
											]
										})
									}),
									FactoryLogic.feature.create({
										id: 'beastheart-1-2a-13-5',
										name: 'Retriever',
										description: 'The wolf can move at full speed while they have a creature grabbed, no matter the grabbed creature’s size.'
									})
								]
							}),
							isSignature: false,
							cost: 0,
							count: 1,
							level3: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-13-3-1',
									name: 'My, What Big Teeth You Have',
									description: 'When the wolf hits a creature with a strike while rampaging, the creature is grabbed.'
								})
							],
							level6: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-13-6-1',
									name: 'Call of the Wild',
									description: 'While the wolf is rampaging, both of you have a +2 bonus to speed and creatures within 5 squares can’t be hidden or concealed from you or your companion.'
								})
							],
							level10: [
								FactoryLogic.feature.create({
									id: 'beastheart-1-2a-13-10-1',
									name: 'Dire Wolf',
									description: 'While the wolf is rampaging, you and the wolf are surrounded by an aura of dread. Enemies that start their turn adjacent to you or the wolf who have P < [strong] are frightened (EoT).'
								})
							]
						})
					]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-1-2b',
					name: 'Companions in Combat',
					description: `
**Companion Stamina and Recoveries**. Your companion has a maximum Stamina equal to your maximum Stamina. Your companion has no Recoveries of their own. Instead, when an effect would allow your companion to spend a Recovery, your companion spends one of your Recoveries.

**Companion Actions**. Your companion is your ally, but they take their turn as a part of your turn. For the purpose of effects that end at the end of the companion’s turn, or any other rules elements that depend on the start or end of creature’s turn, the start and end of your turn is also the start and end of the companion’s turn.

You and your companion each have separate move actions. You have one triggered action which can be taken by either you or your companion. You split your maneuver and action between you: if you take an action, you can’t take a maneuver but your companion can. If you take a maneuver, you can’t take an action but your companion can.

**Shared Maneuvers**. When you or your companion take the following maneuvers, you can choose for both of you to benefit from the maneuver: Catch Breath, Escape Grab, Hide, Stand Up.

**Ranged Free Strikes**. Your companion doesn’t have a ranged free strike.

**Shared Abilities**. Some of the abilities granted by the beastheart class can be used by only the beastheart, some can be used only by the companion, and some can be used by either. If a beastheart ability has the Beastheart keyword, it can be used by only the beastheart. If it has the Companion keyword, it can be used only by the companion. If an ability can be used by either you or your companion, the word “you” in the ability’s text refers to the user of the ability, and the word “partner” refers to whichever of you did not use the ability. Phrases like "you both” and “you each” refer to you and your companion.

**Shared Senses**. While you are both within 1 mile of each other, you can communicate telepathically as if you shared a language, although this communication uses vague images and feelings instead of words.

**Shared Skills**. Your companion has any skill that you have, and vice versa. No matter what skills they possess, your companion can’t take any action that is not allowed by their physiology (for instance, a wolf can’t pick locks).

**Shared Space**. Both of you can freely move through and stop in each others’ spaces.

**Shared Perks and Titles**. If you gain a benefit by earning a perk or a title, your companion gains the same benefit. Your companion can only use benefits that are logically usable by an animal: for instance, an animal can’t craft and therefore can’t benefit from the Handy perk.

**Surges**. Surges gained by your companion go to your surge pool, which your companion shares. Your companion can spend your surges the same way you can. When the same effect would grant surges to you both, you only gain surges once.

**Changing your Companion**. As a respite activity, you can release your current companion, gaining a new companion of a different species or summoning a companion you previously released.

**One Hero**. You and your companion count as one hero for determining the difficulty of combats, montage tests, and so on.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-1-3',
						name: 'Heart of the Beast',
						description: '“Better look away, this might not be pretty.”',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You spend a Recovery as your partner rips their way out of your chest or climbs from your unnaturally wide jaws. Your partner teleports to your space over any distance, even if they don’t have line of effect to you. Your partner gains temporary Stamina equal to their recovery value.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: '(Beastheart only) You rip your heart from your chest and throw it up to 10 squares to an unoccupied space. Your heart then transforms into your companion, teleporting them to that space instead of to your space.'
							}),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'The teleported creature gains additional temporary Stamina equal to their Recovery value times the number of Ferocity you spend in this way (max 3). If they are dead, you can spend 3 Ferocity to restore them to life with 1 Stamina, even if their body was destroyed, and they gain no temporary Stamina.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-1-4',
						name: 'Feral Strike',
						description: 'Your companion lunges into the fray, attacking wildly with teeth, claws, or other weapons.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('Before taking this action, your companion moves a number of squares equal to their Intuition score straight toward the closest enemy they are aware of, avoiding damaging terrain and ending the movement when they are adjacent to an enemy. If they are within distance of the enemy at the end of this movement, they make the following power roll.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Might,
									tier1: '2 + M damage',
									tier2: '4 + M damage',
									tier3: '7 + M damage'
								})
							),
							FactoryLogic.createAbilitySectionPackage('feral-strike')
						]
					})
				}),
				FactoryLogic.feature.createPackage({
					id: 'beastheart-1-5',
					name: 'Rampage',
					description: `
While your ferocity sharpens your killer instinct, it can also drive your companion into a rampage, causing them to strike friends and foes alike in their blood-soaked battle frenzy. As their rampage builds, they become something more than a mortal companion, embodying a primordial spirit of destruction.

Your companion has a resource called rampage. Whenever you or your companion spends ferocity, your companion accumulates rampage equal to the ferocity spent. Your companion loses their rampage and all of its effects at the end of an encounter.

Your companion doesn’t spend rampage to activate abilities. Instead, when your companion accumulates 8 rampage, they are rampaging. As your companion’s rampage increases, your companion gains the listed effects from the Rampage table. Effects are cumulative.

| Rampage     | Effect |
|:============|:=======|
| 8           | At the end of each of your turns, your companion must use Feral Strike as a free maneuver. Each creature within the ability's distance takes damage equal to your companion's Might score. You gain 1 surge for each ally damaged in this way.    |
| 12          | Your companion has damage immunity equal to their Intuition. As a free maneuver, your companion can increase their size by 1 or return to their true size. They return to their true size when the rampage ends.    |
| 16 (lvl 4)  | When your companion uses Feral Strike, they deal extra damage equal to your companion's Intuition score to eachcreature within the ability's distance. You gain 1 extra surge for each ally damaged in this way.    |
| 20 (lvl 7)  | While your companion's size is increased, their Stability, Potency, and Speed are increased by 2, and the distance of Feral Strike is increased by 1.    |
| 24 (lvl 10) | When your companion increases their size, they can increase it by 1 or 2. While they are size 3 or larger, when they make a power roll they can roll 3d10 and discard the lowest roll.    |`,
					tag: 'rampage'
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'beastheart-1-6a',
					types: [ 'Beastheart' ]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-1-6b',
					name: 'Beasthearts and Magic Treasure',
					description: `
**Consumables**: While your companion can’t use all consumables, with your help they can benefit from an edible or drinkable consumable, such as a Healing Potion. While wearing a kit, they can also benefit from a consumable that enhances a weapon, such as a Lachomp Tooth. While you are adjacent to your companion, when you use one of these consumables, you can grant the benefit to your companion instead of yourself. You must spend the action required to use the consumable; your companion doesn’t need to take any action.

**Trinkets**: Most trinkets are designed to be worn by bipeds (such as cloaks, masks, and hats), or require words or gestures to activate. Your companion can’t use such a trinket. However, your companion can benefit from one necklace, pendant, collar, or other trinket with the Neck keyword that doesn’t require any action to activate, such as a Necklace of the Bayou or one of the new magic trinkets presented in this document. Although your companion can wear only one item with the Neck keyword, they don’t need to wear it around their neck: a condor might wear a necklace wrapped around a talon, and a gummy ball might carry it suspended inside their body!

**Leveled Items**: Although your companion can’t wield a sword, they can benefit from a magic blade! When you wield a leveled weapon, armor, implement, or other leveled item, your companion gains the benefits of the magic treasure as if they were wielding it. As is true with any character, both of you only benefit from a wieldable magic weapon or armor if its keywords match your kit.`
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-1-7',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-1-8',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-1-9',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-2-1',
					name: 'Perk',
					lists: [ PerkList.Exploration, PerkList.Intrigue, PerkList.Interpersonal ]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-2-2',
					name: 'Timely Aid',
					description: 'Your companion may not be much of a talker, but they’ve got a lifetime of experience surviving the deadly dangers of the wild. They can offer aid in nearly any circumstance: helping exhausted travelers find their way, leading panicked villagers out of a burning building, or even providing a comforting nuzzle at just the right time. Once per round during a montage test, when you or another character makes a test, you can have your companion increase the tier outcome by one stage, to a maximum of 3.'
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-3-1',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-4-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-4-1b',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createPerk({
					id: 'beastheart-4-2'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-4-3'
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'beastheart-4-4a',
					name: 'Unchained Ferocity',
					tag: 'deal-damage-self 2',
					trigger: 'The first time in a round that you deal damage',
					value: '2',
					replacesTags: [ 'deal-damage-self' ]
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'beastheart-4-4b',
					name: 'Unchained Ferocity',
					tag: 'deal-damage-companion 2',
					trigger: 'The first time in a round that your companion deals damage',
					value: '2',
					replacesTags: [ 'deal-damage-companion' ]
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-5-1',
					cost: 9
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-6-1',
					name: 'Perk',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1b',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1c',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1d',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1e',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'beastheart-7-2',
					name: 'Greater Ferocity',
					tag: 'start 2',
					trigger: 'Start of your turn',
					value: '1d3 +1',
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-7-3'
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-8-1'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-8-2',
					cost: 11
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-9-1a',
					name: 'Nature’s Wisdom',
					description: 'Your companion has transcended beasthood. Although they are still your faithful friend, they are also a vessel for nature’s wisdom and memories. Your companion’s Reason increases to 1, and they learn every language you know. Your companion can communicate telepathically with any creature within 10 squares, using language as well as images and feelings.'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-9-1b',
					selected: [ 'Nature' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-9-1c',
					listOptions: [ SkillList.Lore ]
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-10-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-10-1b',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'beastheart-10-2',
					name: 'Hot Blooded',
					tag: 'start 3',
					trigger: 'Start of your turn',
					value: '1d3 +2',
					replacesTags: [ 'start', 'start 2' ]
				}),
				FactoryLogic.feature.createPerk({
					id: 'beastheart-10-3',
					name: 'Perk',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'beastheart-10-4',
					name: 'Primordial Power',
					type: 'epic',
					gains: [
						{
							tag: '',
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					],
					description: 'You can spend 1 primordial power as a free maneuver to allow you each to take a main action on your turn, instead of a main action and a maneuver. For that turn, the ferocity cost of heroic abilities is reduced by 1.'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-10-5',
					name: 'Skill'
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'beastheart-ability-1',
			name: 'Burning Rage',
			description: 'Lances of primordial energy leap from you and your companion to sear, crush, or freeze your foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '2 + M cold, fire, lightning, or sonic damage',
						tier2: '4 + M cold, fire, lightning, or sonic damage',
						tier3: '6 + M cold, fire, lightning, or sonic damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can spend a surge to allow your partner to use this ability as a free triggered action, targeting a different target with the same power roll and not using this effect.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-2',
			name: 'Covering Fire',
			description: 'Keep your head down or I’ll shoot it off!',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '2 + I damage',
						tier2: '4 + I damage',
						tier3: '6 + I damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target is not prone, they must use a free triggered action to fall prone or take extra damage equal to twice your Intuition score. Your companion can shift up to a number of spaces equal to their Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-3',
			name: 'Scatter!',
			description: 'You launch a flurry of attacks and then retreat.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '2 + M damage',
						tier2: '3 + M damage',
						tier3: '4 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Your companion makes a free strike. You both shift up to a number of squares equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-4',
			name: 'Tag Me In',
			description: 'Drawing on your primordial magic, you magically switch places with an ally, giving them a breather while you deliver a surprise attack.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionText('If you and a willing ally are standing on the ground within 10 squares of each other, you can teleport, swapping places. If you do so, you gain an edge on this ability’s power roll.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '3 + I damage',
						tier2: '5 + I damage',
						tier3: '7 + I damage'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-5',
			name: 'Herd the Sheep',
			description: 'Your companion circles your foe, luring them out of position with fake openings and unpredictable attacks.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '5 + M damage; slide 1; I < [weak], weakened (save ends)',
						tier2: '8 + M damage; slide 2; I < [average], weakened (save ends)',
						tier3: '11 + M damage; slide 4; I < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You and your companion can shift up to a number of squares equal to the number of squares the target was moved.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-6',
			name: 'High and Low',
			description: 'You and your companion surround your foe in order to bring them down.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '5 + M damage; push 2',
						tier2: '8 + M damage; push 4',
						tier3: '11 + M damage; push 6'
					})
				),
				FactoryLogic.createAbilitySectionText('This ability’s push can pass through your space but not end there. If it passes through your space, the target falls prone and takes extra damage equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-7',
			name: 'Hungry like the Wolf',
			description: 'The enemy’s blood flows like wine, invigorating your companion.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '4 + M damage; your companion can spend a Recovery',
						tier2: '7 + M damage; each of you can can spend a Recovery',
						tier3: '11 + M damage; A < [strong], bleeding (EoT); each of you can spend a Recovery and shift up to 2 squares'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-8',
			name: 'Mighty Roar',
			description: 'Your companion unleashes a shattering roar, screech, or howl that terrifies your foes—or at least gets their attention.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '3 sonic damage; push 1; P < [weak], taunted (save ends)',
						tier2: '5 sonic damage; push 2; P < [average], taunted (save ends)',
						tier3: '7 sonic damage; push 3; P < [strong], taunted (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Spend',
					value: 1,
					effect: 'This ability also affects a 2 burst around you. An enemy in both areas is only affected once.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-9',
			name: 'Bloodlust Strike',
			description: 'Invigorated by the smell of blood, you strike a savage blow.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '8 + M damage',
						tier2: '12 + M damage',
						tier3: '16 + M damage; M < [strong], bleeding (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target is winded or bleeding after the attack, you gain two surges.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-10',
			name: 'Bring it On!',
			description: 'Let all of them come forward and shatter yourselves against your might!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Beastheart ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('You can spend a Recovery. Each enemy in the area is taunted (EoT). You gain 3 temporary Stamina for each enemy in the area.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Spend',
					value: 1,
					effect: 'This ability also affects a 3 burst around your companion. Creatures in this second burst are taunted by your companion. An enemy in both areas is taunted only by you.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-11',
			name: 'Friendly Fire',
			description: 'As your arrows rain down on your foes, flames spiral around your companion, setting the arrows ablaze.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Beastheart, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '3 damage',
						tier2: '5 damage',
						tier3: '8 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If your companion is in the area, your companion deals fire damage equal to their Intuition score to each enemy in the area.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-12',
			name: 'Unfair Advantage',
			description: 'The wilderness has no concept of fair play.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '8 + M damage; M < [weak], grabbed',
						tier2: '12 + M damage; M < [average], grabbed',
						tier3: '16 + M damage; M < [strong], grabbed'
					})
				),
				FactoryLogic.createAbilitySectionText('If you grab the target while your companion is adjacent to the target, your companion can make a melee free strike against the target.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-13',
			name: 'Heart Eater',
			description: 'Bones crack as a bloody figure leaps from your foe’s corpse.',
			type: FactoryLogic.type.createTrigger('You use an ability that reduces the creature to 0 Stamina.'),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('The creature dies and your companion rips their way out of the creature’s body. Your companion teleports into the creature’s space, shifts up to a number of squares equal to their Might, and can then make a melee free strike. Your companion makes the following power roll once, targeting each enemy within 5 squares of the target:'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: 'P < [weak], frightened (save ends)',
						tier2: '4 psychic damage; P < [average], frightened (save ends)',
						tier3: '8 psychic damage; P < [strong], frightened (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-14',
			name: 'Heedless Headbutt',
			description: 'Your bloody forehead smash drives your companion into a frenzy.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '13 + M damage; P < [weak], dazed (save ends)',
						tier2: '19 + M damage; P < [average], dazed (save ends)',
						tier3: '25 + M damage; P < [strong], dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You are bleeding (save ends). Until you are no longer bleeding, your companion has an edge on power rolls.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-15',
			name: 'Primordial Jaws',
			description: 'The spectral jaws of a trap clamp on a foe, chaining them to you and draining their life essence.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '7 + I damage; P < [weak], weakened (save ends)',
						tier2: '10 + I damage; P < [average], weakened (save ends)',
						tier3: '14 + I damage; P < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('When a target weakened by this ability fails their saving throw against this ability while more than 3 squares from you, as a free triggered action you can pull the target up to a number of squares equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-16',
			name: 'Setup Strike',
			description: 'Your attack sets up a vicious combo.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '9 + M damage',
						tier2: '14 + M damage',
						tier3: '19 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The next creature to damage the target before the start of your next turn gains three surges.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-17',
			name: 'Dogpile',
			description: 'You and your allies surround your enemy like a pack of wolves, mobbing them and pulling them down.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '10 + M damage; M < [weak], grabbed and prone',
						tier2: '15 + M damage; M < [average], grabbed and prone',
						tier3: '20 + M damage; M < [strong], grabbed and prone'
					})
				),
				FactoryLogic.createAbilitySectionText('Each ally adjacent to the target can use a triggered free action to deal damage to the target equal to the ally’s highest characteristic.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-18',
			name: 'Hunter\'s Mercy',
			description: 'You take a single shot that ends your quarry’s life.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(15) ],
			target: 'One creature or object',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '12 + I damage',
						tier2: '18 + I damage',
						tier3: '30 + I damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If you are hidden, you remain hidden after the attack.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-19',
			name: 'Massive Throw',
			description: 'You can bear impossible burdens with the aid of your companion.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '10 + M damage; vertical push 4; prone',
						tier2: '15 + M damage; vertical push 6; prone',
						tier3: '20 + M damage; vertical push 8; prone'
					})
				),
				FactoryLogic.createAbilitySectionText('If your companion is adjacent to the target, you can ignore the target’s Stability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-20',
			name: 'Rend in Two',
			description: 'In a gruesome display, you and your companion rip off a pinioned enemy’s limb or other body part and toss it away.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '11 + M damage; M < [weak], bleeding (save ends)',
						tier2: '17 + M damage; M < [average], bleeding (save ends)',
						tier3: '22 + M damage; M < [strong], bleeding (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target is grabbed by your partner, the target takes extra damage equal to your Might score plus your companion’s Might score. If this ability reduces a target to 0 Stamina, each enemy within 2 squares who has P < average is frightened (save ends).')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-21',
			name: 'Bloodied Blade and Claw',
			description: 'Driven by the pain and desperation of battle, you and your companion spend your last strength in a flurry of wild attacks.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature or object',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '5 + M damage',
						tier2: '15 + M damage',
						tier3: '25 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Your companion can repeat the attack as a melee attack, making their own power roll. Both power rolls have an edge if either of you is bleeding, dying, or winded, and your power roll has a double edge if your companion is dead or otherwise unable to act.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-22',
			name: 'Burn the World to Ash',
			description: 'Wrenching power from your primordial bond, you unleash elemental power in a devastating conflagration that you can’t control.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Beastheart, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Intuition,
						tier1: '10 cold, fire, lightning, or sonic damage',
						tier2: '18 cold, fire, lightning, or sonic damage',
						tier3: '26 cold, fire, lightning, or sonic damage'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Spend',
					value: 2,
					repeatable: true,
					effect: 'You can spend up to 6 extra ferocity. For each 2 extra ferocity you spend, the size of the burst is increased by 1, 2 is added to the power roll, and you take 5 damage that can’t be reduced in any way. You can decide how much ferocity you spend after you make the power roll.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-23',
			name: 'Double Trouble',
			description: 'Your enemies might be stronger than you, but that’s why you’re not here alone.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('You each use a different ability that costs 9 or less ferocity and that uses a maneuver or an action. These abilities cost no ferocity. If an ability lets you spend extra ferocity for an enhanced effect, you can’t do so.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'beastheart-ability-24',
			name: 'Life-Drinking Wound',
			description: 'As your attack strikes home, your enemy’s escaping life force drifts to your allies in crimson threads.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '12 + M damage',
						tier2: '18 + M damage',
						tier3: '24 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Up to three creatures within 2 squares of the target gain temporary Stamina equal to half the damage you dealt.')
			]
		})
	],
	subclasses: [
		guardian,
		prowler,
		punisher,
		spark
	],
	level: 1,
	characteristics: []
};
