import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const blackAsh: SubClass = {
	id: 'shadow-sub-1',
	name: 'College of Black Ash',
	description: 'The College of Black Ash founded the art of being a shadow. Its graduates use Black Ash sorcery to teleport around the battlefield in clouds of soot, and to manipulate and create darkness. Graduates of the college are unmatched in mobility.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'shadow-sub-1-1-1',
					listOptions: [ SkillList.Lore ],
					selected: [ 'Magic' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-sub-1-1-2',
						name: 'Black Ash Teleport',
						description: 'In a swirl of black ash, you step from one place to another.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You teleport up to 5 squares. If you have concealment or cover at your destination, you can use the Hide maneuver even if you are observed. If you hide using this maneuver, you gain a surge.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'You teleport 1 additional square for each insight spent.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-sub-1-1-3',
						name: 'In All This Confusion',
						description: 'You vanish in a plume of black smoke to avoid danger.',
						type: FactoryLogic.type.createTrigger('You take damage.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You halve the damage, then can teleport up to 4 squares after the triggering effect resolves.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'You teleport 1 additional square for each insight spent.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'shadow-sub-1-2-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-1-2-1a',
									name: 'In a Puff of Ash',
									description: 'You enchant a strike with your teleportation magic.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [
										FactoryLogic.distance.createMelee(),
										FactoryLogic.distance.createRanged(5)
									],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '6 + A damage; you can teleport the target 1 square',
											tier2: '10 + A damage; you can teleport the target up to 3 squares',
											tier3: '14 + A damage; you can teleport the target up to 5 squares'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-1-2-1b',
									name: 'Too Slow',
									description: 'Your foe made a big mistake.',
									type: FactoryLogic.type.createTrigger('You use your In All This Confusion ability.', { free: true }),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You avoid any effects associated with the damage that triggered your In All This Confusion ability. Before you teleport, you can make a free strike against a creature who damaged you to trigger In All This Confusion. After you teleport, you can spend a Recovery.')
									]
								})
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'shadow-sub-1-2-2',
					name: 'Burning Ash',
					description: 'The ash you leave behind burns your foes. The first time on a turn that you use a shadow ability to teleport away from or into a space adjacent to an enemy, that enemy takes fire damage equal to your Reason score.'
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
