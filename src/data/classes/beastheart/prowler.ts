import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { PerkData } from '@/data/perk-data';
import { SubClass } from '@/models/subclass';

export const prowler: SubClass = {
	id: 'beastheart-sub-2',
	name: 'Prowler',
	description: 'You are an unseen ambusher that strikes from the shadows. Your prey is dead before they even know you’re there.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-sub-2-1-1',
					selected: [ 'Hide' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'beastheart-sub-2-1-2',
					name: 'Wild Nature Benefit',
					description: 'The target is weakened until the start of your next turn.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-2-1-3',
						name: 'While No One’s Looking',
						description: 'While everyone’s eyes are drawn to your foe, you take the opportunity to blend into the scenery.',
						type: FactoryLogic.type.createTrigger('An enemy deals damage to a creature other than you.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You become invisible, use the Hide maneuver, and move up to a number of squares equal to your Intuition score, in any order. You remain invisible until the end of your next turn or you deal damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The distance of your move is doubled, and it ignores difficult terrain.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-sub-2-2-1a',
					selected: [ PerkData.bornTracker ]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-sub-2-2-1b',
					name: 'Keen Smell',
					description: 'While a creature is adjacent to your companion, the creature can’t be concealed or hidden from your companion.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-2-2-2',
					name: 'Prowler Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-2-2-2a',
									name: 'Jump Scare',
									description: 'Surprised to see me?',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
									target: 'Each enemy in the area with line of effect',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion shifts up to a number of squares equal to their Intuition score. During this movement, they are invisible. They then make a power roll.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Intuition,
												tier1: '4 damage; P < [weak], frightened (save ends)',
												tier2: '6 damage; P < [average], frightened (save ends)',
												tier3: '10 damage; P < [strong], frightened (save ends)'
											})
										)
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-2-2-2b',
									name: 'Close Combat',
									description: 'Your companion darts around their target, staying out of reach and using them as a shield.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Charge, AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature or object',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '5 + M damage',
												tier2: '8 + M damage',
												tier3: '12 + M damage'
											})
										),
										FactoryLogic.createAbilitySectionText('Your companion enters the target’s space. Until your companion is no longer in the target’s space, your companion can end their turn in the target’s space, strikes against your companion also affect the target, and your strikes against the target gain an edge.')
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
					id: 'beastheart-sub-2-5-1',
					name: 'I Hate Being the Center of Attention',
					description: 'You or your companion can use While No One’s Looking even when targeted by the triggering attack.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-2-6-1',
					name: 'Prowler Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-2-6-1a',
									name: 'Phantom Form',
									description: 'Your companion becomes a soul-freezing wraith.',
									type: FactoryLogic.type.createMove(),
									keywords: [ AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('You and your companion shift up to your speeds. During this movement, you are both invisible and can move through enemies, objects, and difficult terrain without spending additional squares of movement. You deal corruption damage equal to your Intuition score to each enemy you pass through during this movement. Each of you can damage each enemy once in this way.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-2-6-1b',
									name: 'Raking Lunge',
									description: 'Your companion ducks under your enemy’s guard and rakes open their soft vitals, leaving them vulnerable to further attacks.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee(2) ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '10 + M damage; A < [weak], bleeding (save ends)',
												tier2: '15 + M damage; A < [average], bleeding (save ends)',
												tier3: '20 + M damage; A < [strong], bleeding (save ends)'
											})
										),
										FactoryLogic.createAbilitySectionText('While the target is bleeding, they have damage weakness 5.')
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
					id: 'beastheart-sub-2-8-1',
					name: 'Born to Run',
					description: 'Your and your companion’s speed increases by 2.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-2-9-1',
					name: 'Prowler Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-2-9-1a',
									name: 'Chaos Duel',
									description: 'You or your companion drag your chosen foe into storms of the Primordial Plane.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText(`
You, your companion, and the target enter a tiny pocket of Quintessence. The three of you can’t affect or be affected by any creatures except each other. Creatures in this pocket can’t move or teleport away from each other and are always adjacent to each other, but can otherwise act normally.

While on Quintessence, the target takes 5 cold damage, 5 fire damage, 5 lightning damage, and 5 sonic damage at the start of each of your turns. You can end the effect as a free maneuver, and the target can make a save at the end of each of their turns to end the effect. The effect also ends when one of you dies. When the effect ends, you each return to the closest unoccupied space from the space you departed. If the target dies in the Quintessence, their remains do not return.`)
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-2-9-1b',
									name: 'Nightmare Apparition',
									description: 'Your companion appears next to their victim in the guise of a heart-stopping nightmare.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion teleports up to their speed.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Intuition,
												tier1: '13 + I psychic damage; P < [weak], frightened (save ends)',
												tier2: '20 + I psychic damage; P < [average], frightened (save ends)',
												tier3: '27 + I psychic damage; P < [strong], frightened (save ends)'
											})
										)
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
