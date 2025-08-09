import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const war: Domain = {
	id: 'domain-war',
	name: 'War',
	description: 'The War domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-war-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-war-1-1',
							name: 'Sanctified Weapon',
							description: 'As a respite activity, you can bless a weapon. Any creature who wields the weapon gains a +1 bonus to rolled damage with abilities that use the weapon. This benefit lasts until you finish another respite.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-war-1-2',
							listOptions: [ SkillList.Exploration ]
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
						id: 'domain-war-2',
						name: 'Blessing of Insight',
						description: 'The gods grant insight revealing where best to strike your enemies.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and each ally',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each target gains 1 surge at the end of each of your turns.')
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
					id: 'domain-war-4',
					name: 'Improved Sanctified Weapon',
					description: 'The weapon improved by your Sanctified Weapon feature grants a +3 bonus to rolled damage instead of +1.'
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
						id: 'domain-war-6',
						name: 'Blade of the Heavens',
						description: 'A greatsword streams down from the sky, threatening to pin your foe.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '8 + I damage; A < [weak], prone and restrained (save ends)',
									tier2: '12 + I damage; A < [average], prone and restrained (save ends)',
									tier3: '16 + I damage; A < [strong], prone and restrained (save ends)'
								})
							)
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-war-7',
					name: 'Your Triumphs Are Remembered',
					description: 'The gods allow you and your companions to bask in the glory of past successes. Whenever you finish a respite, you and any other heroes who rested with you regain 1 Victory after your Victories are converted to XP. This Victory isn’t converted into XP at the end of a subsequent respite.'
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
						id: 'domain-war-9',
						name: 'Righteous Phalanx',
						description: 'A wall of spinning swords and knives appears where you wish.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 15, within: 10 }) ],
						target: 'Special',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionText('The wall lasts until the end of the encounter or until you are dying, and can be placed in occupied squares. Creatures can enter and pass through the wall. Each enemy who enters the area for the first time in a combat round or starts their turn there takes 15 damage.')
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
			trigger: 'The first time in an encounter that you or a creature within 10 squares takes damage greater than 10 + your level in a single turn.',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'war-default-1',
			name: 'War Prayer Effect',
			description: 'Choose up to three allies within 10 squares of you, or choose yourself instead of one ally. Each target gains 2 surges.',
			tag: 'conduit-prayer'
		})
	]
};
