import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { FollowerType } from '../../../enums/follower-type';
import { HeroClass } from '../../../models/class';
import { KitArmor } from '../../../enums/kit-armor';
import { KitWeapon } from '../../../enums/kit-weapon';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { demon } from './demon';
import { elemental } from './elemental';
import { fey } from './fey';
import { undead } from './undead';

export const summoner: HeroClass = {
	id: 'class-summoner',
	name: 'Summoner',
	description: `
You are the armada. The kings of old would trade their entire armies for one of your predecessors. You’ve undertaken the tradition that conjures an endless supply of warriors. You are the summoner, the mage who takes their dreams and makes them manifest.

You utilize minions to provide tactical positioning and reinforcement support to take the pressure off yourself and your fellow heroes. You call upon minions to trudge along perilous corridors and draw the enemy’s attention long enough for the rest of you to take the counteroffensive.

You can also take advantage of powerful magic to buff your allies, whittle down your enemies, or enlist the fallen into your ranks. And when push comes to shove, you can call upon your champion to finish the fight.`,
	type: 'master',
	subclassName: 'Portfolio',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Reason ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'summoner-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'summoner-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'summoner-resource',
					name: 'Essence',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '2'
						},
						{
							tag: 'minion-death',
							trigger: 'The first time in a round that any minion dies unwillingly within your Summoner’s Range',
							value: '1'
						}
					],
					details: 'Whenever you use a heroic ability or call forth a minion that costs essence, you can willingly sacrifice one or more of your minions within your Summoner’s Range to reduce the cost by 1. You can’t kill minions this way if they used a main action or maneuver during the turn. You can sacrifice more minions than you would reduce the cost by.'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'summoner-1-1a',
					listOptions: [ SkillList.Lore ],
					selected: [ 'Magic' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'summoner-1-1b',
					listOptions: [ SkillList.Lore ],
					selected: [ 'Strategy' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'summoner-1-1c',
					listOptions: [ SkillList.Intrigue, SkillList.Lore ],
					count: 2
				}),
				FactoryLogic.feature.createPackage({
					id: 'summoner-1-2',
					name: 'Minions',
					description: `
The creatures you control are called minions. You can summon and maintain up to a maximum of 8 minions. Your minions are considered allies at your level.

You can manage up to two squads of minions. Newly summoned minions can either be organized into a new squad or be distributed into other squads under your control. A squad can’t contain more than eight minions, and all minions in the squad must have the same name.

You have a Summoner’s Range that defines the maximum distance you can summon minions and use specific conjuring abilities. Your Summoner’s Range is equal to 5 + your Reason score. You can summon and give commands to minions while they are within line of effect. Commanding a minion to take a main action or a maneuver reveals yourself if you are hidden.

You have special minions at your disposal called signature minions, low cost creatures that you’ve become accustomed to summoning frequently.

### Minions in Combat

**Start of Combat**: At the start of a combat encounter or some other stressful situation tracked in combat rounds (as determined by the Director), you summon two of your signature minions at no cost into unoccupied spaces within your Summoner’s Range (no action required).

**Summoning**: At the start of each of your turns during combat, you summon up to three of your signature minions at no cost into unoccupied spaces within your Summoner’s Range (no action required). Unless an ability specifies, you can’t summon any number of new minions beyond your minion maximum until the same number of your existing minions are dismissed or destroyed.

**Stamina**: Minions in a squad pool their Stamina together. Whenever a minion in a squad takes damage, the squad’s Stamina pool is reduced by a number equal to the damage taken. Each time the pool is reduced by an amount equal to a single squad member’s Stamina, one minion dies (starting with the minion that took damage, followed by the next nearest minion). If there is any excess damage after all minions in the squad are dead, you take 1d6 damage. Minions can’t be winded, can’t regain Stamina, and can’t gain temporary Stamina.

**Area Effects**: The damage from an area effect dealt to a squad’s Stamina pool can only kill up to the minions in its area. Any excess damage is ignored.

**Strikes with Multiple Targets**: A squad’s Stamina pool only takes the largest single instance of damage from a strike that targets two or more minions in that squad. Any additional effects still affect the minions targeted by the strike.

**Conditions**: You resolve any saving throws on conditions affecting one or more of your minions. Treat saving throws as if you had one instance of each condition.

**Immunity and Weakness**: If a minion has either a damage immunity or a damage weakness for a source of damage, apply the effects to the minion’s squad once, even if multiple minions share the same immunity or weakness.

**Actions**: Minions in a squad act together on your turn in any order, before, in-between, and/or after any of your actions. They can either take a move action and a main action (excluding Heal and Defend), a move action and a maneuver, or two move actions. Individual minions can also take opportunity attacks.

**Free Strikes**: Unless otherwise specified, a minion’s free strike has a distance of Melee 1 or Ranged 5 and deals the damage value listed on the stat block. The minion can choose to deal untyped damage or the damage type next to the damage value.

**Damage**: Whenever multiple minions strike the same target simultaneously, the damage is added together and treated as a single strike. Minions in a squad targeting the same target with a signature action only apply one instance of the signature action while each additional minion increases the damage by their free strike value.

**Surges**: Your minions use your pool of Surges and can apply them to their strikes. Whenever one or more of your minions would gain a Surge during a turn, you gain one Surge instead.

**Maneuvers**: Unless otherwise specified on the minion’s stat block, a squad uses their maneuver together as a unit. If a maneuver targets a single creature, all minions in the squad target the same creature. If a maneuver requires a power roll, the result is equal to 8 + the minion’s characteristic + the number of squad members within distance of the maneuver.

**Unconscious**: If you are unconscious or unable to act on your turn, you can’t summon new minions. Additionally, your remaining minions can’t deal damage; they can only act to bring you to safety.

**End of Combat**: At the end of combat, your minions finish their tasks (such as carrying someone to safety) and are then dismissed.

### Minions Outside of Combat

You can have up to 4 minions summoned outside of combat. You can summon your signature minions at no cost. Other minions with an essence cost can be summoned as if you had spent an amount of essence on them equal to your Victories.

Each of your minions can be given a simple task and a destination you’ve previously been to and they’ll fulfill it to the best of their ability. Example tasks include sending messages, scouting, and carrying supplies. Your minions aren’t followers and can’t make project rolls until you can summon specialists.

When combat begins, any of your minions who were summoned outside of combat finish their tasks and are then dismissed.`,
					tag: 'minions'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'summoner-1-3',
						name: 'Summoner Strike',
						description: 'A sudden burst of energy erupts from your implement and shocks your foes’ nerves.',
						type: FactoryLogic.type.createMain({ freeStrike: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('R damage. If the target has R < weak, they are slowed (save ends).'),
							FactoryLogic.createAbilitySectionPackage('summoner-strike')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'summoner-1-4',
						name: 'Strike For Me',
						description: 'Your minions fight in your stead.',
						type: FactoryLogic.type.createTrigger('You use a triggered action to make a free strike or use a signature ability.', { free: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSummoner() ],
						target: 'Each of your minions',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Reason,
									tier1: 'Up to three targets make a free strike',
									tier2: 'Up to five targets make a free strike',
									tier3: 'Up to seven targets make a free strike',
									crit: 'Each target makes a free strike'
								})
							),
							FactoryLogic.createAbilitySectionText('Instead of using the triggering ability, your minions act against the same creature or object you would have targeted. You have an edge on the power roll if the triggering ability was a signature ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'summoner-1-5',
						name: 'Call Forth',
						description: 'My power is yours, and yours, mine. I summon thee.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSummoner() ],
						target: 'Self',
						cost: 1,
						repeatable: true,
						sections: [
							FactoryLogic.createAbilitySectionText('You summon one or more minions from your portfolio into unoccupied spaces within distance. Choose one of the following options.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Signature Minions',
								effect: 'You summon one signature minion for each essence you spend on this ability.'
							}),
							FactoryLogic.createAbilitySectionField({
								name: 'All Other Minions',
								effect: 'You summon the set number of minions listed on the stat block for their essence cost.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'summoner-1-6',
						name: 'Minion Bridge',
						description: 'Your minions do everything in their power to form a safe path for you to cross.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One of your minions',
						sections: [
							FactoryLogic.createAbilitySectionText(`
You shift into a square adjacent to the target, including vertically.

You can shift into squares that contain one of your minions, even if they occupy difficult terrain. Each time you shift into a square that contains one of your minions while using this maneuver, you can shift an additional square.`),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'An adjacent ally can shift alongside you during this movement. They must end their movement in an unoccupied square adjacent to the last minion you moved through.'
							})
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'summoner-1-7',
					name: 'Formation',
					description: 'You’ve practiced a specific formation for your minions.',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'summoner-1-7a',
								name: 'Horde Formation',
								description: 'Your maximum number of minions increases by 4 and you summon up to four of your signature minions at the start of each of your turns instead of three.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'summoner-1-7b',
								name: 'Platoon Formation',
								description: 'Whenever one of your squads uses a damaging ability, one of their targets takes an extra 3 damage.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'summoner-1-7c',
								name: 'Elite Formation',
								description: 'Each of your minions have their Stamina increased by 3.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'summoner-1-7d',
								features: [
									FactoryLogic.feature.create({
										id: 'summoner-1-7da',
										name: 'Leader Formation',
										description: 'You don’t take any excess damage after all minions in a squad are dead. If your minion is within your Summoner’s Range when they take damage, you can choose to take damage in place of the minion.'
									}),
									FactoryLogic.feature.createProficiency({
										id: 'summoner-1-7db',
										weapons: [ KitWeapon.Light ],
										armor: [ KitArmor.Light ]
									})
								]
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'summoner-1-8',
					name: 'Tactic Call',
					description: 'You have a quick command you can issue to your minions.',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'summoner-1-8a',
									name: 'Focus Fire!',
									description: 'You ensure the enemy can’t escape the incoming attack.',
									type: FactoryLogic.type.createTrigger('The target deals damage to another creature.'),
									distance: [ FactoryLogic.distance.createSummoner() ],
									target: 'Self or one ally',
									sections: [
										FactoryLogic.createAbilitySectionText('You command up to two of your minions to shift up their speed towards squares adjacent to the target. The target gains a surge for each of your minions adjacent to them (up to a maximum of 3 surges), which they can use on the triggering damage.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Spend',
											value: 1,
											effect: 'If the triggering damage is from an ability that uses a power roll, the power roll gains an edge.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'summoner-1-8b',
									name: 'Impede!',
									description: 'You order a minion to get in the way.',
									type: FactoryLogic.type.createTrigger('The target starts their turn, moves, or is force moved.'),
									distance: [ FactoryLogic.distance.createSummoner() ],
									target: 'One creature',
									sections: [
										FactoryLogic.createAbilitySectionText('You summon a signature minion in an unoccupied space adjacent to the target. If the target is force moved into the minion, you can choose to make the target take no damage from the collision.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Special',
											effect: 'Instead of summoning a new minion, you can command one of your minions within distance to shift up to their speed towards a square adjacent to the target before any additional effects occur.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'summoner-1-8c',
									name: 'Not Yet!',
									description: 'I command you to not die.',
									type: FactoryLogic.type.createTrigger('The target receives enough damage to die or be destroyed.'),
									distance: [ FactoryLogic.distance.createSummoner() ],
									target: 'One ally',
									sections: [
										FactoryLogic.createAbilitySectionField({
											name: 'Special',
											effect: 'If the target is a minion, they must be the only minion remaining in their squad.'
										}),
										FactoryLogic.createAbilitySectionText('The damage the target receives is reduced by an amount that leaves the target alive with 1 point of Stamina.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'summoner-1-8d',
									name: 'Take the Hit!',
									description: 'You call upon a minion to use their body to dampen the blow.',
									type: FactoryLogic.type.createTrigger('The target is targeted by a strike.'),
									distance: [ FactoryLogic.distance.createSummoner() ],
									target: 'Self or one ally',
									sections: [
										FactoryLogic.createAbilitySectionText('You command one of your minions to shift up their speed towards a square adjacent to the target. If the minion enters within distance of the strike, they become the new target of the strike.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Spend',
											value: 1,
											effect: 'Instead of commanding an existing minion, you summon a signature minion into an unoccupied space adjacent to the target to take the strike.'
										})
									]
								})
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'summoner-1-9',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'summoner-2-1',
					name: 'Perk',
					lists: [ PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.create({
					id: 'summoner-2-2',
					name: 'Dominion',
					description: `
Once per encounter, you can use a maneuver to summon a fixture from your minions’ native manifold or origin into an unoccupied space on the ground within your Summoner’s Range. You can spend 1 essence to relocate the fixture as a free maneuver on your turn. The fixture stays until the end of the encounter, its stamina is reduced to 0, or you become dying.

Your fixture gains additional features at 5th and 9th level.`
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createPackageContent({
					id: 'summoner-3-1',
					name: 'Summoner’s Kit',
					description: `
You conjure a kit for yourself. This kit includes an implement, such as a rod or a baton, which grants you the following benefits:

* The damage of your Summoner Strike ability increases to twice your Reason score.
* The potency of your Summoner Strike ability increases to R < [average].
* The distance of your Summoner Strike ability is now equal to your Summoner’s Range.`,
					tag: 'summoner-strike'
				}),
				FactoryLogic.feature.createChoice({
					id: 'summoner-3-2',
					name: 'Ward',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'summoner-3-2a',
								name: 'Conjured Ward',
								description: 'You are clad in the natural defenses of your portfolio (bones, fairy wood, stone, writhing flesh). You gain a +3 bonus to Stamina and that bonus increases by 3 at 4th, 7th, and 10th levels.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'summoner-3-2b',
								name: 'Emergency Ward',
								description: 'Whenever you take damage, you can use a free triggered action to shift 1 after the triggering effect resolves and summon a signature minion into the square you left (as long as there is enough space).'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'summoner-3-2c',
								name: 'Howling Ward',
								description: 'You enter combat surrounded by a 1 Aura of defensive forces. An enemy that starts their turn adjacent to you takes damage equal to your Reason.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'summoner-3-2d',
								name: 'Swap Ward',
								description: 'Whenever you take damage, you can use a free triggered action to swap places with one of your minions within distance. That minion suffers any additional effects instead of you.'
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'summoner-3-3',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'summoner-4-1',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'summoner-4-2',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'summoner-4-2a',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'summoner-4-2b',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'summoner-4-2c',
								characteristic: Characteristic.Intuition,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'summoner-4-2d',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'summoner-4-3',
					name: 'Minion Improvement',
					description: `
Your maximum number of minions increases by 4.

You can increase each of your minions’ Stamina, as shown on the table. Additionally, each minion that receives a Stamina boost can treat their characteristics as one higher for the purposes of resisting potencies (to a maximum value of 3).

| Minion           | Stamina Increase |
|:=================|:=================|
| Signature Minion | Stamina +1       |
| 3-Essence Minion | Stamina +3       |
| 5-Essence Minion | Stamina +2.      |`,
					tag: 'minions'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-4-4',
					name: 'Essence Salvage',
					description: 'The first time each combat round that any minion dies within your Summoner’s Range, you gain 2 essence instead of 1.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-4-5',
					name: 'Minion Chain',
					description: `
Whenever you use minion bridge as a maneuver, each of your minions within your Summoner’s Range can shift up to their speed before the maneuver takes effect, as long as each minion that shifts ends their movement adjacent to another one of your minions.

Additionally, your minions can chain themselves together to act like a ladder or a swinging rope. When your minions move as a part of using minion bridge, each minion can use this movement to shift into a position directly beneath another one of your minions, hoisting them and each other minion they have hoisted, until they form a chain. The chain can then choose to fall across an unoccupied space a gap and/or the topmost minion grabs an object to keep the chain steady.

The chain lasts until the start of your next turn or the chain is no longer steady. The chain can also end when a minion in the chain is destroyed or you command your minions to let go as a free action. All size 1 minions count as one square when determining the chain’s length.`
				}),
				FactoryLogic.feature.createPerk({
					id: 'summoner-4-6'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'summoner-4-7'
				})
			]
		},
		{
			level: 5,
			features: []
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'summoner-6-1',
					name: 'Perk',
					lists: [ PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.create({
					id: 'summoner-6-2',
					name: 'Go Forth',
					description: `
You can “unsummon” yourself and your allies into the space that your minions come from. When you take a respite, you can open a portal to your portfolio’s native manifold and bring along any allies to gather resources or research details about that manifold’s denizens. You are seen as a native resident of the manifold, but your allies might be seen as intruders.

| Portfolio | Manifold/Origin    |
|:==========|:===================|
| Demon     | Abyssal Waste      |
| Elemental | Quintessence       |
| Fey       | Arcadia            |
| Undead    | Necropolitan Ruins |`
				}),
				FactoryLogic.feature.createMultiple({
					id: 'summoner-6-3',
					features: [
						FactoryLogic.feature.createPackageContent({
							id: 'summoner-6-3a',
							name: 'Minion Machinations',
							description: 'Your maximum number of followers increases by 2.',
							tag: 'minions'
						}),
						FactoryLogic.feature.createFollower({
							id: 'summoner-6-3b',
							follower: FactoryLogic.createFollower(FollowerType.Artisan)
						}),
						FactoryLogic.feature.createFollower({
							id: 'summoner-6-3c',
							follower: FactoryLogic.createFollower(FollowerType.Sage)
						})
					]
				}),
				FactoryLogic.feature.create({
					id: 'summoner-6-4a',
					name: 'Kit Improvement',
					description: 'You can choose one additional ward from your Summoner’s Kit.'
					// TODO: another Ward
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'summoner-6-4b',
					name: 'Kit Improvement',
					description: `
Whenever you reduce an enemy to 0 Stamina with your Summoner Strike ability, you can use Call Forth as a free maneuver. Minions summoned this way are unable to act during this turn.`,
					tag: 'summoner-strike'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'summoner-6-5',
					cost: 9
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'summoner-7-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'summoner-7-1b',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'summoner-7-1c',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'summoner-7-1d',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'summoner-7-1e',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'summoner-7-2',
					name: 'Minion Improvement',
					description: `
At the start of each of your turns during combat, you can summon one additional signature minion at no cost into an unoccupied space within your Summoner’s Range (no action required).

All of your minions are reaching their zenith. You can further increase each of your minions’ Stamina, as shown in the table. Additionally, each minion that receives a Stamina boost can treat their characteristics as one higher for the purposes of resisting potencies (to a maximum value of 4).

| Minion           | Stamina Increase              |
|:=================|:==============================|
| Signature Minion | Stamina +1 (to a total of +2) |
| 3-Essence Minion | Stamina +3 (to a total of +6) |
| 5-Essence Minion | Stamina +2 (to a total of +4) |
| 7-Essence Minion | Stamina +5                    |`,
					tag: 'minions'
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'summoner-7-3',
					name: 'Font of Creation',
					tag: 'start 2',
					trigger: 'Start of your turn',
					value: '3',
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.create({
					id: 'summoner-7-4',
					name: 'Their Life for Mine',
					description: `
If you or an ally within your Summoner’s Range would die from an effect that isn’t age related, you sacrifice all your active minions (minimum 1) and spend all your essence (minimum 1) as a free triggered action to bring the target back to life, summoning “minion material” to reconstruct the damaged parts of their body. The target comes back with 0 Stamina plus 1 stamina for each minion and essence used in the effect. You must have at least one fragment of the creature’s remains, and the creature’s soul must be willing to return to life for the effect to work.

You can’t use this feature again until you gain a new level, or you spend 3 eidos to use it.`
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'summoner-7-5'
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'summoner-8-1'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-8-2',
					name: 'Portfolio Champion',
					description: `
You can now use Call Forth to summon your portfolio’s champion for their essence cost. Champions follow all the same rules as your minions, with the following exceptions:

* Your champion enters into a new squad that does not count towards your maximum number of squads.
* Your champion can regain Stamina and gain temporary Stamina. Your champion uses your recoveries to regain Stamina.
* Your champion can take the heal and defend actions.
* Your champion uses the normal rules for maneuvers.
* You have an edge whenever you use an ability with the Champion keyword from your Champion’s space.
* Your champion refuses to be referred to as a minion.

After summoning a champion, you can’t summon them again until you earn a Victory.

Your champion gains additional features at 10th level. This includes a special Champion Action ability that costs Eidos to use. This ability can be activated once per encounter at the end of any other creature’s turn.`
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'summoner-10-1a',
					name: 'Kit Improvement',
					description: 'You can choose one additional ward from your Summoner’s Kit.'
					// TODO: another Ward
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'summoner-9-1b',
					name: 'Kit Improvement',
					description: 'The potency of your Summoner Strike ability increases to R < [strong].',
					tag: 'summoner-strike'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-9-1c',
					name: 'Kit Improvement',
					description: 'When you finish a respite, you can choose a willing hero ally who took the respite with you. That hero gains the benefits of one of your wards until you finish another respite.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-9-2',
					name: 'Steward of Two Worlds',
					description: 'You and your allies are now welcome in your portfolio’s native manifold or origin. Negotiations with native residents of that manifold have their patience increased by 2.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'summoner-9-3',
					cost: 11
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'summoner-10-1',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'summoner-10-2',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'summoner-10-2a',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'summoner-10-2b',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'summoner-10-2c',
								characteristic: Characteristic.Intuition,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'summoner-10-2d',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'summoner-10-3',
					name: 'Minion Improvement',
					description: `
You now start encounters and round tracked situations by summoning up to two additional minions for every two Victories you have (in addition to the two you normally summon).

Each of your minions’ Stamina further improves, as shown in the table. Additionally, each minion that receives a Stamina boost can treat their characteristics as one higher for the purposes of resisting potencies (to a maximum value of 5).

| Minion           | Stamina Increase               |
|:=================|:===============================|
| Signature Minion | Stamina +1 (to a total of +3)  |
| 3-Essence Minion | Stamina +3 (to a total of +9)  |
| 5-Essence Minion | Stamina +2 (to a total of +6)  |
| 7-Essence minion | Stamina +5 (to a total of +10) |`,
					tag: 'minions'
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'summoner-10-4',
					name: 'Eidos',
					type: 'epic',
					gains: [
						{
							tag: '',
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					],
					description: `
You gain an epic resource called eidos. When you take a Respite, you gain eidos equal to the XP you gain. You can spend eidos as if it were essence on minions and abilities you have. When you do, you summon up to two bonus signature minions into unoccupied spaces within your Summoner’s Range.

You and your champion also have access to abilities that can be used by spending eidos (see Their Life for Mine and Portfolio Champion).

Eidos remains until you spend it.`
				}),
				FactoryLogic.feature.create({
					id: 'summoner-10-5',
					name: 'No Matter the Cost',
					description: 'Whenever you sacrifice minions, you now reduce the cost of a heroic ability or minion by the same amount (to a minimum of 1) instead of only reducing the cost by 1.'
				}),
				FactoryLogic.feature.create({
					id: 'summoner-10-6',
					name: 'Among our Ranks',
					description: 'As a Respite Activity, you summon a willing and not restrained NPC or Player ally to join your party, regardless of distance or manifold. The target stays until the start of your next respite or until they are killed, in which they are immediately dismissed to the place where they were summoned from. You can’t have more than one target summoned in this way.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'summoner-10-7',
					name: 'Perk',
					lists: [ PerkList.Intrigue, PerkList.Interpersonal, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'summoner-10-8',
					name: 'Skill'
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'summoner-ability-1',
			name: 'Essence Transfer',
			description: 'You pierce your foe and repurpose some of that ‘fiber of their being’ they weren’t using.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '5 + R corruption damage; 2 charges (see below)',
						tier2: '8 + R corruption damage; 3 charges',
						tier3: '11 + R corruption damage; 4 charges'
					})
				),
				FactoryLogic.createAbilitySectionText(`
You can spend charges to activate one of the following effects. You can activate an effect multiple times. All charges disappear after using this ability.

* **1 charge**: You or an ally within your Summoner’s Range can spend a recovery.
* **1 charge**: You or an ally within your Summoner’s Range gains a surge.
* **2 charges**: You call forth a signature minion into an unoccupied space within your Summoner’s Range.`)
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-2',
			name: 'Explosive Parade',
			description: 'Your minions swell with energy until they can no longer maintain their shape.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createSummoner() ],
			target: 'Special',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: 'You summon four signature minions',
						tier2: 'You summon five signature minions',
						tier3: 'You summon six signature minions'
					})
				),
				FactoryLogic.createAbilitySectionText(`
The minions are summoned within distance regardless of your minion maximum and without organizing them into squads. Each newly summoned minion immediately moves up to their speed towards a creature or object.

If they move adjacent to their target, become targeted by an opportunity attack, or stop moving, they explode, dealing 2 damage to one adjacent creature or object and pushing them 1 square. If a target is affected by two or more minions’ explosions, the effects stack. These minions activate no effects upon death, and you gain no essence from their deaths.`),
				FactoryLogic.createAbilitySectionField({
					name: 'Special',
					effect: 'In addition to the minions summoned as a part of this ability, you can choose to command any number of your minions within distance, provided they haven’t used a main action or maneuver during the turn.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-3',
			name: 'Distraction Tactics',
			description: 'Your minions do the work to draw the heat away from your allies.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Special',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, each minion under your control during the encounter is the target of the following effect. The target’s strikes can inflict I < [weak] taunted (EoT) to enemies. The potency increases by 1 for each minion that joined the strike.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-4',
			name: 'Rally Cry',
			description: '“Show them what you’re made of!”',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'All allies',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('The target chooses between gaining 2 surges or dealing R additional damage on their next strike.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-5',
			name: 'Summoner\'s Cradle',
			description: 'You call forth protective forces to keep you all from harm.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createSummoner() ],
			target: 'Special',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: 'Three creatures',
						tier2: 'Four creatures',
						tier3: 'Five creatures'
					})
				),
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, each target can use a free triggered action whenever they take damage to reduce the incoming damage by half and then lose this effect.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-6',
			name: 'Summoner\'s Sword',
			description: 'You draw your strength from the army you surround yourself with and summon a hot blade of energy and fervor.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee(3) ],
			target: 'One creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: 'R damage',
						tier2: '2 + R damage',
						tier3: '4 + R damage'
					})
				),
				FactoryLogic.createAbilitySectionText('This strike deals an additional 1 damage for each minion ally adjacent to you, or 2 damage for each non-minion ally adjacent to you.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-7',
			name: 'Blitz Tactics',
			description: 'Rush em! CRUSH EM!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Special',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, each minion under your control during the encounter is the target of the following effect. The first time on a turn that the target moves through an enemy’s space, the enemy can choose to shift 1 square or be M < [weak] (or M < [average] if the target is larger than the enemy) knocked prone. The potency increases by 1 for each subsequent target that moves through the enemy’s space during the same move action.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-8',
			name: 'Cavalry Call',
			description: 'A lone squad appears to disrupt the enemy’s plans and peel off their forces, one by one.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSummoner() ],
			target: 'Special',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('You summon a temporary squad containing 6 of your signature minions regardless of your minion maximum within distance. Whenever one of these minions deals damage to an enemy, the enemy is R < [average] compelled to move 5 squares towards the source of the damage (provoking attacks of opportunity). The potency increases by 1 for enemies targeted by two or more of these minions. These minions die at the end of your turn, activate no effects upon death, and you gain no essence from their deaths.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-9',
			name: 'Essence Funnel',
			description: 'You rapidly summon and sacrifice minions in order to power a devastating blast of magic.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
			target: 'All enemies and objects',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '5 damage; push 2',
						tier2: '9 damage; push 4',
						tier3: '12 damage; push 6'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Special',
					effect: 'You can choose to kill any number of your minions within your Summoner’s Ranged as a part of this ability, provided they haven’t used a main action or maneuver during the turn. Each target takes an additional 1 damage, plus 1 damage for each minion killed this way. These minions activate no effects upon death, and you gain no essence from their deaths.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-10',
			name: 'Lead by Example',
			description: 'Your minions watch as your implement crackles with power, ready to slam unbelievable force into your foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createSummoner()
			],
			target: 'One enemy or object',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '8 + R damage; R < [weak], dazed (save ends)',
						tier2: '12 + R damage; R < [average], dazed (save ends)',
						tier3: '16 + R damage; R < [strong], dazed (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-11',
			name: 'A Champion\'s Cry',
			description: 'Your champion unleashes a bellow that shakes you to your core.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Champion, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'All enemies',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '2 psychic or sonic damage; I < [weak] frightened of you (save ends)',
						tier2: '5 psychic or sonic damage; I < [average] frightened of you and all allies (EoT)',
						tier3: '7 psychic or sonic damage; I < [strong] frightened of you and all allies (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You can use this ability as if in the space of one of your minions within your Summoner’s Range.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-12',
			name: 'Army\'s Idol',
			description: 'Your champion’s appearance has an enchanting impact on you and your allies.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Champion, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Self and all allies',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText(`
You can use this ability as if in the space of one of your minions within your Summoner’s Range.

Until the end of the encounter or you become dying, each target has a +2 bonus to saving throws.

Each target can then immediately make each of their saving throws and stand up from prone.`)
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-13',
			name: 'The Champion Slams the Earth',
			description: 'Your champion lays their fury upon those unfortunate enough to be in their wake.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Champion, AbilityKeyword.Magic, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 1 }) ],
			target: 'All enemies and objects',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '5 damage; M < [weak] prone can’t stand (save ends)',
						tier2: '8 damage; M < [average] prone can’t stand (save ends)',
						tier3: '11 damage; M < [strong] prone can’t stand (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You can use this ability as if in the space of one of your minions within your Summoner’s Range.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Special',
					effect: 'You can change the damage type to be a type that your champion deals on their stat block.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-14',
			name: 'Their Pall Shrouds All',
			description: 'Your champion fills the area with a thick haze hiding friend from foe.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Champion, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
			target: 'All enemies',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText(`
You can use this ability as if in the space of one of your minions within your Summoner’s Range.

The target is R < [average] weakened (save ends).

Until the end of the encounter, whenever the target gets a tier 1 result on a strike, they deal half damage. If the target was striking a creature adjacent to one of their allies, they target their ally instead.`)
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-15',
			name: '1,000,000 Minions',
			description: 'The battle is now a war. Your entire army storms the field.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSpecial('Special') ],
			target: 'Special',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText(`
Until the end of the encounter or you are dying, each square on the ground is considered teeming with minions. An enemy that ends their turn in an affected square takes 5 damage. This damage can’t be reduced.

Additionally, you can use minion bridge treating each affected square as an eligible minion (up to a maximum of 10 additional squares).`)
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-16',
			name: 'Bodyguard Tactics',
			description: 'You surround your allies with a nigh-endless supply of summons that stand in the way of all impacts.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
			target: 'Self and each non-minion ally',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, each target has damage immunity 5 and can use a free triggered action once per turn whenever they are force moved to reduce the distance by half.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-17',
			name: 'I Unsummon Thee',
			description: 'Cast those not affixed to this manifold into the void of a minion’s existence.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'All enemies',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText(`
Each minion target is removed from the encounter map. Up to three non-leader or non-solo targets of your choice are removed from the encounter for 1 round.

A leader or solo target is R, I, and P < [average] weakened and slowed (save ends) as they are partially removed from the manifold. You can increase the potency by 1 for each of your minions adjacent to the target you choose to sacrifice as a part of using this ability.`)
			]
		}),
		FactoryLogic.createAbility({
			id: 'summoner-ability-18',
			name: 'Wrath of a Champion',
			description: 'Your champion appears and goes into a rampage, clearing the way for your minions to march forth.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Champion, AbilityKeyword.Magic, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
			target: 'All enemies',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Reason,
						tier1: '6 damage; push 4 M < [weak] push is vertical',
						tier2: '10 damage; push 5 M < [average] push is vertical',
						tier3: '14 damage; push 6 M < [strong] push is vertical'
					})
				),
				FactoryLogic.createAbilitySectionText(`
You can use this ability as if in the space of one of your minions within your Summoner’s Range.

You can change the damage type to be a type that your champion deals on their stat block. For each enemy reduced to 0 Stamina by this ability, an ally within distance can move up to their speed.`)
			]
		})
	],
	subclasses: [
		demon,
		elemental,
		fey,
		undead
	],
	level: 1,
	characteristics: []
};
