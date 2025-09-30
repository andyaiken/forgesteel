import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { SkillList } from '@/enums/skill-list';
import { SubClass } from '@/models/subclass';

export const paragon: SubClass = {
	id: 'censor-sub-3',
	name: 'Paragon',
	description: 'Without a strong example and a firm hand, the weak will be corrupted. You specialize in setting an example for your order. You have the Lead skill.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'censor-sub-3-1-1',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Lead' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'censor-sub-3-1-2',
					name: 'Judgment Order Benefit',
					description: 'You can vertical pull the judged creature up to a number of squares equal to twice your Presence score.',
					tag: 'censor-judgment'
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'censor-sub-3-2-1',
					name: 'Lead by Example',
					description: 'Your devotion to your deity allows you to take command of the battlefield, letting your allies benefit from your wisdom. While you are adjacent to a creature, your allies gain the benefits of flanking against that creature. Additionally, your allies gain an edge on tests made to aid other creatures with their tests.'
				}),
				FactoryLogic.feature.create({
					id: 'censor-sub-3-2-2',
					name: 'Stalwart Example',
					description: 'You exhibit a small spark of your deity’s power, causing creatures to trust or fear you, depending on what you need. You gain an edge on tests made to intimidate or persuade others.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'censor-sub-3-2-3',
					name: '2nd-Level Paragon Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-3-2-3a',
									name: 'Blessing of the Faithful',
									description: 'The gods reward your faith.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
									target: 'Self and each ally in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each target in the aura gains 1 surge at the end of each of your turns.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-3-2-3b',
									name: 'Sentenced',
									description: 'The shock of your condemnation freezes your enemy in their boots.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Presence ],
											tier1: '5 + P damage; P < [weak], restrained (save ends)',
											tier2: '9 + P damage; P < [average], restrained (save ends)',
											tier3: '12 + P damage; P < [strong], restrained (save ends)'
										})),
										FactoryLogic.createAbilitySectionText('While the target is restrained this way, your abilities that impose forced movement can still move them.')
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
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'censor-sub-3-3-1',
					name: 'Stand Fast!',
					description: 'Your divine spark grows in power, allowing you and your allies to focus and endure. At the start of each of your turns, you can spend 1d6 Stamina to end one effect on you that is ended by a saving throw or that ends at the end of your turn. Any ally who starts their turn within 5 squares of you can also spend Stamina to gain this benefit.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'censor-sub-3-4-1',
					name: '6th-Level Paragon Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-3-4-1a',
									name: 'Congregation',
									description: 'You focus your allies’ wrath on a chosen foe.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might ],
											tier1: '8 + M damage; as a free triggered action, one ally within 10 squares of the target can use a strike signature ability against the target',
											tier2: '12 + M damage; as a free triggered action, one ally within 10 squares of the target can use a strike signature ability that gains an edge against the target',
											tier3: '16 + M damage; as a free triggered action, two allies within 10 squares of the target can each use a strike signature ability that gains an edge against the target'
										})),
										FactoryLogic.createAbilitySectionText('Each ally can shift up to 2 squares and gains 2 surges before making the strike.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-3-4-1b',
									name: 'Intercede',
									description: 'You take your ally’s place.',
									type: FactoryLogic.type.createTrigger('A creature makes a strike against the target.', { free: true }),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One ally',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('The target is unaffected by the strike and you become the target instead, even if you aren’t a valid target for it. You take half the damage from the strike, and the target gains 3 surges.')
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
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'censor-sub-3-5-1',
					name: 'Vow',
					description: 'Your words take on the power of your deity, with all the authority that entails. If you convince a creature to take an oath, they can’t break it for 7 days. If you take an oath, you can’t break it for 7 days.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'censor-sub-3-6-1',
					name: '9th-Level Paragon Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-3-6-1a',
									name: 'Apostate',
									description: 'You channel holy energy to seal an enemy’s fate.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might ],
											tier1: '13 + M holy damage',
											tier2: '19 + M holy damage',
											tier3: '26 + M holy damage'
										})),
										FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, the target has damage weakness 10.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-3-6-1b',
									name: 'Edict of Unyielding Resolve',
									description: 'You and your allies are clad in shimmering armor.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 2 }) ],
									target: 'Self and each ally in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each target who starts their turn in the area gains 10 temporary Stamina.')
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
			level: 10,
			features: []
		}
	],
	selected: false
};
