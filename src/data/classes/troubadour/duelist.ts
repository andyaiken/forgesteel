import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const duelist: SubClass = {
	id: 'troubadour-sub-1',
	name: 'Duelist',
	description: 'Drama embraces your every movement done in tandem with another. You perform dances of death, putting trust in your opponent to return your passion in kind.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'troubadour-sub-1-1-0',
					listOptions: [ SkillList.Exploration ],
					selected: [ 'Gymnastics' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-1-1-1',
						name: 'Acrobatics',
						description: 'Folks love a good tumble.',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('While this routine is active, any target who starts their turn in the aura can automatically obtain a tier 3 result on one test made to jump, tumble, or climb as part of their movement before the end of their turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-1-1-2',
						name: 'Star Power',
						description: 'You’re the one they came to see!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You gain a +2 bonus to speed until the end of your turn. Additionally, the next power roll you make this turn can’t have a result lower than tier 2.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'You gain a +4 bonus to speed instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-1-1-3',
						name: 'Riposte',
						description: '“I’d have brought treats had I known I’d be fighting a dog.”',
						type: FactoryLogic.type.createTrigger('The target takes damage from a melee strike.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes a free strike against the triggering striker.')
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'troubadour-sub-1-2-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'troubadour-sub-1-2-1a',
									name: 'Classic Chandelier Stunt',
									description: 'Audiences love this bit.',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'Self and 1 willing ally',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target shifts up to 5 squares, and can shift vertically. Both targets must end this movement adjacent to each other and on solid ground. Each target can then make a melee free strike that deals additional damage equal to twice their highest characteristic score.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'troubadour-sub-1-2-1b',
									name: 'En Garde!',
									description: 'Wait it’s … Guard! Turn! Perry! Dodge! Spin! Thrust! Hah!',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '6 + A damage; the target can shift up to 3 squares and make a free strike against you',
											tier2: '9 + A damage; the target can shift up to 2 squares and make a free strike against you',
											tier3: '13 + A damage; the target can shift 1 square'
										})),
										FactoryLogic.createAbilitySectionText('If the target shifts or makes a free strike against you as a result of this ability, you can shift up to 3 squares and make a melee free strike against the target.')
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
			features: [
				FactoryLogic.feature.create({
					id: 'troubadour-sub-1-3-1',
					name: 'Foil',
					description: 'Choose one creature within line of effect at the start of an encounter. You have a double edge on power rolls made against or in competition with that creature. The chosen creature also has a double edge on power rolls made against or in competition with you. If the creature dies, you can choose a new foil at the start of the next round.'
				})
			]
		}
	],
	selected: false
};
