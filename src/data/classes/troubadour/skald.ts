import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const skald: SubClass = {
	id: 'troubadour-sub-2',
	name: 'Skald',
	description: 'You seek drama from story and recount, using your magic to manipulate the sequence of events unfolding before you.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'troubadour-sub-2-1-0',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Brag' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-2-1-1',
						name: 'Blocking',
						description: 'No, no, no, you lose the audience that way. Try it like this …',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 2 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('At the end of each of your turns while this routine is active, you can choose a number of creatures equal to your Presence score in the aura, causing those creatures to be teleported to unoccupied squares in the aura. A target can’t be teleported in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-2-1-2',
						name: 'Dramatic Monologue',
						description: 'It doesn’t need to make sense. Just say it with emotionality.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText(`
Choose one of the following effects:

* You orate a rousing tale of victory. One ally within distance gains an edge on the next power roll they make before the start of your next turn.
* You weave a tale of high stakes heroics. One ally within distance gains a surge.
* You insult a foe where they’re most vulnerable. That foe takes a bane on the next power roll they make before the end of their next turn.`),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You can choose two targets for any of these effects.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-2-1-3',
						name: 'Turnabout is Fair Play',
						description: 'All’s fair in love and whatever.',
						type: FactoryLogic.type.createTrigger('The target makes an ability power roll with at least one edge or bane.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						sections: [
							FactoryLogic.createAbilitySectionText('One of the edges becomes a bane or vice versa.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'One of the edges becomes a double bane, or one of the attack’s banes becomes a double edge.'
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
					id: 'troubadour-sub-2-2-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'troubadour-sub-2-2-1a',
									name: 'Guest Star',
									description: 'We offered them a percentage of the gross. So they’re working for free!',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Special',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Either a bystander within distance is uplifted by your magic, or a mysterious new hero appears in an unoccupied space to help out during the encounter. This guest star is controlled by you, has their own turn, shares your characteristics. Their stamina is maximum is half yours. They have no abilities other than your melee and ranged free strikes. When the target is reduced to 0 Stamina or at the end of the encounter, they retreat or revert to a bystander. An individual bystander can’t be uplifted in this way more than once in an encounter.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'troubadour-sub-2-2-1b',
									name: 'Twist at the End',
									description: 'You didn’t see that coming, did you?!',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: '1 dead enemy',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('As long as the target is not a leader or a solo creature, they come back to life with half their Stamina and become an ally under the Director’s control. The players can discuss with the Director when the target takes their turn each round. The target turns to dust and blows away at the end of the encounter.')
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
					id: 'troubadour-sub-2-3-1',
					name: 'Recast a Supporting Part',
					description: 'If you aren’t surprised at the beginning of an encounter, you can choose one enemy within line of effect who isn’t a leader or a solo creature. The director swaps that creature out with a squad of minions whose encounter value doesn’t exceed the chosen creature’s encounter value. The Director can determine that this feature can’t be used against certain special enemies.'
				})
			]
		}
	],
	selected: false
};
