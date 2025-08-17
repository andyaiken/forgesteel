import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
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
								description: 'You can craft objects with the power of your mind.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You create a mundane object of size 1S or smaller. You can maintain a number of objects created this way equal to your Intuition score. You can destroy an object created this way with a thought, no matter how far you are from it (no action required).')
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
						description: 'A marble statue of your deity rises from the earth.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('A size 2 statue rises out of the ground in an unoccupied space within distance and lasts until the end of the encounter. While within 3 squares of the statue, you gain 1 surge at the start of each of your turns. Each ally within 3 squares of the statue gains this same benefit. The statue is destroyed if it takes 20 or more damage. It has immunity all to poison and psychic damage.')
						]
					})
				})
			]
		},
		{
			level: 3,
			features: []
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-creation-4',
					name: 'Improved Hands of the Maker',
					description: 'When you use your Hands of the Maker ability, you can create a mundane object that is size 2 or smaller.'
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
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-creation-6',
						name: 'Gods’ Machine',
						description: 'You conjure a whirring tank made of blades and metal.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionText('You conjure a size 2 rolling machine that appears in an unoccupied space within distance. The machine has 50 Stamina and immunity all to poison and psychic damage. It disappears at the end of the encounter, if its Stamina drops to 0, or if you are dying. When the machine first appears, make the following power roll once, targeting each enemy adjacent to it.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '3 damage',
									tier2: '5 damage',
									tier3: '8 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('Once on each subsequent turn, you can use a free maneuver to move the machine a number of squares up to your Intuition score then repeat the power roll.')

						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-creation-7',
					name: 'Divine Quartermaster',
					description: 'Each time you finish a respite, you can choose a treasure with a project goal equal to 50 times your level or less. You gain a divine version of this treasure that lasts until you finish another respite or it is consumed.'
				})
			]
		},
		{
			level: 8,
			features: []
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-creation-9',
						name: 'Divine Dragon',
						description: 'From nothing but divine will, you create a powerful ally.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionText(`
You conjure a size 4 dragon that appears in an unoccupied space within distance. The dragon has speed 6 and can fly, stability 4, 100 Stamina, immunity all to fire damage, and uses your characteristics. The dragon disappears at the end of the encounter, if their Stamina drops to 0, or if you are dying.

On subsequent turns, you can use a main action to command the dragon to breathe magic fire in a 3 cube within 1 square of them. Make the following power roll targeting each enemy in the area.`),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '5 fire damage',
									tier2: '9 fire damage',
									tier3: '12 fire damage'
								})
							),
							FactoryLogic.createAbilitySectionText('Additionally, you can use a maneuver to move the dragon up to their speed, or to make a melee weapon strike with their claw against an adjacent creature or object. The dragon can also make this strike as a free strike.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '3 + I damage',
									tier2: '5 + I damage',
									tier3: '8 + I damage'
								})
							)
						]
					})
				})
			]
		},
		{
			level: 10,
			features: []
		}
	],
	resourceGains: [
		{
			resource: 'Piety',
			tag: '',
			trigger: 'The first time in an encounter that a creature within 10 squares of you uses an area ability.',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'creation-default-1',
			name: 'Creation Prayer Effect',
			description: 'You summon the forces of creation and create a wall of stone within 10 squares whose size is 5 + your Intuition score. The wall lasts until the end of the encounter.',
			tag: 'conduit-prayer'
		})
	]
};
