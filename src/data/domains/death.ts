import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Domain } from '@/models/domain';
import { FactoryLogic } from '@/logic/factory-logic';
import { SkillList } from '@/enums/skill-list';

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
									FactoryLogic.createAbilitySectionText('You can speak to the target if they are a creature who has died within the last 24 hours and who can speak a language you know, even if they are just a head. The target regards you as they would have in life, and you might need to make tests to influence them and convince them to speak with you. The trauma of dying can make a creature’s memory of that event hazy, but the target otherwise knows all they knew in life. After 1 minute, the effect ends. You can’t use this ability on the same creature twice.')
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
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-death-4',
					name: 'Seance',
					description: 'You can commune with a network of spirits. As a respite activity, you speak the name of a creature who died and isn’t undead. If the creature’s spirit is free and willing to speak with you, they appear and you can have a conversation with them. During this time, the creature responds to you as they would have in life. If the creature isn’t free or willing to appear, you can speak another name or choose another respite activity.'
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
						id: 'domain-death-6',
						name: 'Aura of Souls',
						description: 'A whirlwind of souls of the dead flies around you at your command.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
						target: 'Each creature in the area',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, at the end of each of your turns, you can slide each creature in the area up to a number of squares equal to your Intuition score. This forced movement ignores stability for your allies.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-death-7',
					name: 'Word of Death Deferred',
					description: `
You can stop death from taking your allies. When an ally within distance of your Healing Grace ability dies and you are not dying, you can use a free triggered action to instead have that ally fall unconscious until they regain Stamina.

Additionally, your abilities deal an extra 5 damage to winded creatures.`
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
						id: 'domain-death-9',
						name: 'Word of Final Redemption',
						description: 'Your death will fuel our victory.',
						type: FactoryLogic.type.createTrigger('The target dies.', { free: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionText('Before the target dies, you can look at their stat block and force them to use one ability that is a main action or a maneuver. If the ability costs a Heroic Resource or Malice, the creature can use it without any cost. For the purpose of using this ability, your allies and enemies are the target’s allies and enemies, and you decide who the ability targets.')
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
			trigger: 'The first time in an encounter that a creature within 10 squares who isn’t a minion is reduced to 0 Stamina, or the first time in an encounter that a solo creature within 10 squares becomes winded.',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'death-default-1',
			name: 'Death Prayer Effect',
			description: 'You inflict a deadly curse upon up to two enemies within 10 squares of you. Each target takes corruption damage equal to twice your Intuition score.',
			tag: 'conduit-prayer'
		})
	]
};
