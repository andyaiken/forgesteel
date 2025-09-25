import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { KitArmor } from '../../../enums/kit-armor';
import { KitWeapon } from '../../../enums/kit-weapon';
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
				FactoryLogic.feature.create({
					id: 'summoner-1-2',
					name: 'Minions',
					description: `
The creatures you control are called minions. You can summon and maintain up to a maximum of 8 minions. Your minions are considered allies at your level.

You can manage up to two squads of minions. Newly summoned minions can either be organized into a new squad or be distributed into other squads under your control. A squad can’t contain more than eight minions, and all minions in the squad must have the same name.

You have a Summoner’s Range that defines the maximum distance you can summon minions and use specific conjuring abilities. Your Summoner’s Range is equal to 5 + your Reason score. You can summon and give commands to minions while they are within line of effect. Commanding a minion to take a main action or a maneuver reveals yourself if you are hidden.

You have special minions at your disposal called signature minions, low cost creatures that you’ve become accustomed to summoning frequently.`
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
							FactoryLogic.createAbilitySectionText('R damage. If the target has R < weak, they are slowed (save ends).')
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
