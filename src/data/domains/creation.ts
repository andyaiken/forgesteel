import { AbilityKeyword } from '../../enums/ability-keyword';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const creation: Domain = {
	id: 'domain-creation',
	name: 'Creation',
	description: 'The Creation domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-creation-1',
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'domain-creation-1-1',
								name: 'Hands Of The Maker',
								description: 'You can craft objects with the power of your mind!',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You create a mundane object no larger than size 1S. You can maintain a number of objects created this way equal to your Intuition score. You can destroy an object created this way with a thought, no matter how far you are from it (no action required).')
								]
							})
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-creation-1-2',
							listOptions: [ SkillList.Crafting ]
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
						id: 'domain-creation-2',
						name: 'Statue of Power',
						description: 'A marble statue of your patron rises from the earth.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('A size 2 statue rises out of the ground in an unoccupied space within distance and lasts until the end of the encounter. While within 3 squares of the statue, you and your allies each gains a surge at the start of their turns. The statue is destroyed if it takes 20 or more damage. It is immune to poison and psychic damage.')
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
			trigger: 'The first time in an encounter that a creature within 10 squares of you uses an ability with the Area keyword',
			value: '2'
		}
	],
	piety: `
* Prayer Effect: You summon the forces of creation and create a wall of stone whose size is 5 + your Intuition score within 10 squares of you. The wall lasts until the end of the encounter.`
};
