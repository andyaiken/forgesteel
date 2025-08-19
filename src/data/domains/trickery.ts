import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const trickery: Domain = {
	id: 'domain-trickery',
	name: 'Trickery',
	description: 'The Trickery domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-trickery-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-trickery-1-1',
							name: 'Inspired Deception',
							description: 'The gods favor your thievery with magic. Whenever you make a test that uses a skill you have from the intrigue skill group, you can use Intuition on the test instead of another characteristic.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-trickery-1-2',
							listOptions: [ SkillList.Intrigue ]
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
						id: 'domain-trickery-2',
						name: 'Divine Comedy',
						description: 'You and your allies swap places to confound your foes.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Self and each ally in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can choose another creature in the area, then swap places with that creature. The creature they choose must be able to fit into the space they leave and vice versa.')
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
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-trickery-4',
						name: 'Blessing of Secrets',
						description: 'You project an illusory aura that makes you and allies harder to notice.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each creature in the area has a double edge on tests made to hide or sneak. The aura lasts until you end it (no action required) or until a target harms or deals damage to a creature or object.')
						]
					})
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
						id: 'domain-trickery-6',
						name: 'Invocation of Mystery',
						description: '“Now you see us …”',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'Self and each ally in the area',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target is invisible until the start of your next turn.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-trickery-7',
						name: 'Trinity of Trickery',
						description: 'Hey! I’m over here. No, here, numbskull.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('You create two illusory duplicates of the target, which appear anywhere within distance. These duplicates last until the end of the encounter. On each of their turns, the target can move each duplicate up to their speed. If the target is targeted by an ability, they can use a free triggered action to switch places with a duplicate within their line of effect, making the duplicate the target of the ability instead. When either duplicate takes damage, it is destroyed.')
						]
					})
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
						id: 'domain-trickery-9',
						name: 'Night Falls',
						description: 'You summon darkness that thwarts only your foes.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: 'Special',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, the area is filled with magic darkness that your enemies can’t see through, but you and your allies can.')
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
			trigger: 'The first time in an encounter that you or a creature within 10 squares takes the Aid Attack or Hide maneuver',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'trickery-default-1',
			name: 'Trickery Prayer Effect',
			description: 'You slide one creature within 10 squares of you up to a number of squares equal to 5 + your conduit level.',
			tag: 'conduit-prayer'
		})
	]
};
