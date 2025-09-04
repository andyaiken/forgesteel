import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const vanguard: SubClass = {
	id: 'tactician-sub-3',
	name: 'Vanguard',
	description: 'You have learned the stratagems of ancient heroes, letting you lead from the front lines and seek victory through sheer force of will and personality.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'tactician-sub-3-1-1',
					listOptions: [ SkillList.Interpersonal ]
				}),
				FactoryLogic.feature.create({
					id: 'tactician-sub-3-1-2',
					name: 'Commanding Presence',
					description: 'You command any room you walk into. While you are present during a negotiation, each hero with you treats their Renown as 2 higher than usual. Additionally, each hero with you during a combat encounter has a double edge on tests made to stop combat and start a negotiation.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-sub-3-1-3',
						name: 'Parry',
						description: 'Your quick reflexes cost an enemy the precision they seek.',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('You can shift 1 square. If the target is you, or if you end this shift adjacent to the target, the target takes half the damage. If the damage has any potency effect associated with it, the potency is decreased by 1.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'This ability’s distance becomes Melee 1 + your Reason score, and you can shift up to a number of squares equal to your Reason score instead of 1 square.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'tactician-sub-3-2-1',
					name: 'Melee Superiority',
					description: 'After constant drills, you can more accurately anticipate an enemy’s plan and thwart their attempts to move across the battlefield. Whenever you make an opportunity attack, the target’s speed is reduced to 0 until the end of the current turn.'
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'tactician-sub-3-2-1a',
					name: 'Mark Benefit',
					description: 'When a creature marked by you attempts to move or shift within distance of your melee free strike, you can use a free triggered action and spend 2 focus to make a melee free strike against that creature.',
					tag: 'mark'
				}),
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-3-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-3-2-2a',
									name: 'No Dying on My Watch',
									description: 'You prioritize saving an ally over your own safety.',
									type: FactoryLogic.type.createTrigger('The target deals damage to an ally.'),
									keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createRanged(5) ],
									target: 'One enemy',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You move up to your speed toward the triggering ally, ending this movement adjacent to them or in the nearest square if you can’t reach an adjacent square. The triggering ally can spend a Recovery and gains 5 temporary Stamina for each enemy you came adjacent to during the move. You then make a power roll against the target.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: 'R < [weak], the target is frightened of the triggering ally (save ends)',
												tier2: ' R < [average], the target is frightened of the triggering ally (save ends)',
												tier3: 'R < [strong], the target is frightened of the triggering ally (save ends)'
											})
										)
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-3-2-2b',
									name: 'Squad! On Me!',
									description: 'Together we are invincible!',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
									target: 'Self and each ally in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the start of your next turn, each target has a bonus to stability equal to your Might score. Additionally, each target gains 2 surges.')
									]
								})
							}),
							value: 1
						}
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
					id: 'tactician-sub-3-5-1',
					name: 'Shake It Off',
					description: 'As a free maneuver, you can spend 1d6 Stamina to ignore a consequence from a test, or to end one effect on you that is ended by a saving throw or that ends at the end of your turn. Any ally adjacent to you can also spend Stamina as a free maneuver to gain this benefit.'
				}),
				FactoryLogic.feature.create({
					id: 'tactician-sub-3-5-2',
					name: 'Tactical Offensive',
					description: 'When you use the Charge main action to attack a creature marked by you, you can use a signature or heroic ability with the Melee and Strike keywords instead of a melee free strike.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-3-6-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-3-6-1a',
									name: 'Instant Retaliation',
									description: 'You parry with almost supernatural speed.',
									type: FactoryLogic.type.createTrigger('A creature deals damage to the target.', { free: true }),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One ally',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('The target takes half the damage. You then make a power roll against the triggering creature.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: 'A < [weak], dazed (save ends)',
												tier2: 'A < [average], dazed (save ends)',
												tier3: 'A < [strong], dazed (save ends)'
											})
										)
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-3-6-1b',
									name: 'To Me Squad!',
									description: 'You lead your allies in a charge.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '6 + M damage; one ally within 10 squares can use the Charge main action as a free triggered action, and can use a melee strike signature ability instead of a free strike for the charge',
												tier2: '9 + M damage; one ally within 10 squares can use the Charge main action as a free triggered action, and can use a melee strike signature ability that gains an edge instead of a free strike for the charge',
												tier3: '13 + M damage; two allies within 10 squares can use the Charge main action as a free triggered action, and can each use a melee strike signature ability that gains an edge instead of a free strike for the charge'
											})
										),
										FactoryLogic.createAbilitySectionText('If the target is hit with two or more strikes as part of this ability and they have R < [strong] , they are dazed (save ends). If the target is reduced to 0 Stamina before one or both allies has made their strike, the ally or allies can pick a different target.')
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'tactician-sub-3-7-1',
					name: 'Shock and Awe',
					description: 'You have expanded your leadership skills, strengthening your followers’ morale and providing logistical support. During a montage test or negotiation, you can obtain one automatic success on a test made using a skill from the interpersonal skill group. Additionally, you can convince a group of people to help you with a crafting project during a respite. If these people are available when you take a respite, you can make a project roll for a crafting project in addition to undertaking another respite activity.'
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPackageContent({
					id: 'tactician-sub-1-8-1',
					name: 'See Your Enemies Driven Before You',
					description: 'When you or any ally makes a melee strike against a creature marked by you, you can spend 2 focus to have the character making the strike push the target up to a number of squares equal to your Reason score. That character can then shift up to a number of squares equal to your Reason score, ending this shift adjacent to the target.',
					tag: 'mark'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-3-9-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-3-9-1a',
									name: 'No Escape',
									description: 'Nothing will stop you from reaching your foe.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('You mark the target.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '11 + M damage',
												tier2: '16 + M damage',
												tier3: '21 + M damage'
											})
										),
										FactoryLogic.createAbilitySectionText('If you use this ability as part of the Charge main action, enemies’ spaces don’t count as difficult terrain for your movement. Additionally, if you move through any creature’s space, you can slide that creature 1 square out of the path of your charge.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-3-9-1b',
									name: 'That One Is Mine!',
									description: 'You focus on making an enemy irrelevant.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [
										FactoryLogic.distance.createMelee(),
										FactoryLogic.distance.createRanged(5)
									],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('The target is marked by you.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '8 + M damage',
												tier2: '13 + M damage',
												tier3: '17 + M damage'
											})
										),
										FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, you can use a signature or heroic ability instead of a free strike against any target marked by you.')
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 10,
			features: []
		}
	],
	selected: false
};
