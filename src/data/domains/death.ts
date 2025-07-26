import { AbilityKeyword } from '../../enums/ability-keyword';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const death: Domain = {
	id: 'domain-death',
	name: 'Death',
	description: 'The Death domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-death-1',
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'domain-death-1-1',
								name: 'Grave Speech',
								description: 'You commune with the lingering soul of the recently dead.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createMelee() ],
								target: 'One dead creature',
								sections: [
									FactoryLogic.createAbilitySectionText('You can speak to the target corpse (including just the head) of a creature who has died within the last 24 hours and who can speak a language you know. The target regards you as they would have in life, and you might need to make tests to influence them and convince them to speak with you. The trauma of dying can make a creature’s memory of that event hazy, but the target otherwise knows all they knew in life. After 1 minute, the effect ends. You can’t use this ability on the same creature twice.')
								]
							})
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-death-1-2',
							listOptions: [ SkillList.Lore ]
						})
					]
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-death-2',
						name: 'Reap',
						description: 'The gods reward those who smite their foes.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Each ally',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of your next turn, each time a target kills an enemy, they regain Stamina equal to 5 + your Intuition score.')
						]
					})
				})
			]
		},
		{
			level: 3,
			features: []
		}
	],
	resourceGains: [
		{
			resource: 'Piety',
			trigger: 'The first time in an encounter that a creature within 10 squares of you who isn’t a minion dies or a solo creature becomes winded',
			value: '2'
		}
	],
	piety: `
* Prayer Effect: You inflict a deadly curse upon two enemies of your choice within 10 squares of you. Each target takes corruption damage equal to twice your Intuition score.`
};
