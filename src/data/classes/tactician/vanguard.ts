import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const vanguard: SubClass = {
	id: 'tactician-sub-3',
	name: 'Vanguard',
	description: 'You have learned the tactics and stratagems of the heroes of ancient history, letting you lead from the front lines of battle and seek victory through sheer force of will and personality.',
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
					description: 'You command any room you walk into. While you are present, each hero with you is treated as having a Renown 2 higher than usual for the purpose of negotiations. Additionally, each hero with you has a double edge on tests made to stop combat and start a negotiation with the other side.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-sub-3-1-3',
						name: 'Parry',
						description: 'Your quick reflexes cost an enemy the precision they seek.',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Self or 1 ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The damage is halved. If any effect of the damage has a potency effect, you decrease the potency by 1.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The target can shift a number of squares equal to your Reason score.'
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
					description: `
After constant drills you have improved your ability to anticipate an enemy’s attack and thwart their attempts to move freely across the battlefield. Whenever you make an opportunity attack, the target’s speed is reduced to 0 until the end of the current turn.

**Mark Benefit**: You can spend 2 focus to make a melee free strike against a marked creature who attempts to move or Disengage within distance of your melee free strike as a free triggered action. If you do, the target’s speed is reduced to 0 until the end of the current turn.`
				}),
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-3-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-3-2-2a',
									name: 'No Dying On My Watch',
									description: 'You prioritize saving an ally over your own safety.',
									type: FactoryLogic.type.createTrigger('The target deals damage to an ally.'),
									keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createRanged(5) ],
									target: '1 enemy',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You move up to your speed toward the target, ending your move in the nearest square adjacent to them if you can. The triggering ally can spend a Recovery, and gains 5 Temporary Stamina for each enemy you move past while moving to the target. You then make a power roll against the target.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: 'R < [weak], frightened of the triggering ally (save ends)',
												tier2: ' R < [average], frightened of the triggering ally (save ends)',
												tier3: 'R < [strong], frightened of the triggering ally (save ends)'
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
										FactoryLogic.createAbilitySectionText('Until the start of your next turn, each target gains a bonus to their Stability equal to your Might score. Additionally, each target gains two surges.')
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
		}
	],
	selected: false
};
