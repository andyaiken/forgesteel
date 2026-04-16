import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
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
					description: 'Each enemy target is weakened until the start of your next turn.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-2-1-3',
						name: 'Lightning Leap',
						description: 'You summon a lightning bolt and ride it into battle.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes damage equal to 3 + your Might score. Before you use this ability, you can jump up to a number of squares equal to your Intuition score in a straight line. During this jump, enemies’ spaces don’t count as difficult terrain for you. The target takes extra lightning damage equal to the number of squares you jumped this way.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'Your jump doesn’t provoke opportunity attacks.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-2-1-4',
						name: 'Shadow in the Mist',
						description: 'While everyone’s eyes are drawn to your foe, you wreathe yourself in obscuring mist.',
						type: FactoryLogic.type.createTrigger('An enemy within 10 squares deals damage to a creature other than you.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You become invisible until the end of your next turn or you deal damage. You can then use the Hide maneuver even if you are observed and can move up to a number of squares equal to your Intuition score before or after using that maneuver.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'You can move up to a number of squares equal to twice your Intuition score and ignore difficult terrain during this movement.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-sub-2-2-1b',
					name: 'Supersniffer',
					description: 'While a creature is adjacent to your companion, that creature can’t be hidden or have concealment from your companion.'
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
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
									target: 'Each enemy in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionField({
											name: 'Special',
											effect: 'This ability targets only enemies with line of effect to your companion.'
										}),
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
									name: 'On You Like Your Shadow',
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
										FactoryLogic.createAbilitySectionText('Your companion enters the target’s space. Until your companion is no longer in the target’s space, they can end their turn in that space, strikes against them also affect the target, and your strikes against the target gain an edge.')
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
					name: 'Melt Away',
					description: 'You or your companion can use your Shadow in the Mist ability even when targeted by the triggering ability.'
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
									id: 'beastheart-sub-2-6-1b',
									name: 'Soft Underbelly',
									description: 'Your companion ducks under your enemy’s guard and rakes open their soft vitals, leaving them vulnerable.',
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
										FactoryLogic.createAbilitySectionText('While bleeding this way, the target has damage weakness 5.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-2-6-1a',
									name: 'Wraith Heart',
									description: 'You and your companion become soul-freezing wraiths.',
									type: FactoryLogic.type.createMove(),
									keywords: [ AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('You and your companion shift up to your speeds. During this movement, you are both invisible, can move through enemies and objects, and ignore difficult terrain. You each deal corruption damage equal to your own Intuition score to each enemy you pass through during this movement. You can both damage each enemy once this way.')
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
					description: 'You and your companion gain a +2 bonus to speed.'
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
									id: 'beastheart-sub-2-9-1b',
									name: 'Behold the Face of Chaos',
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
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-2-9-1a',
									name: 'Let’s Take This Outside',
									description: 'Your companion drags your chosen foe into storms of the Primordial Plane.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText(`
You, your companion, and the target enter the heart of an eternal storm on Quintessence. The three of you can’t affect or be affected by any creatures except each other. Creatures in this area are always adjacent to each other and can’t move or teleport away from each other, but can otherwise act normally.

While on Quintessence, the target takes 5 cold damage, 5 fire damage, 5 lightning damage, and 5 sonic damage at the start of each of your turns.

The effect ends when one of you dies or you end it as a free maneuver. The target can make a save at the end of each of their turns to end the effect early. When the effect ends, you each reappear in the space you left or the nearest unoccupied space. If the target dies on Quintessence, their remains do not return.`)
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
	abilities: [],
	selected: false
};
