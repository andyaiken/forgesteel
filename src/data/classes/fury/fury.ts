import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { berserker } from './berserker';
import { reaver } from './reaver';
import { stormwight } from './stormwight';

export const fury: HeroClass = {
	id: 'class-fury',
	name: 'Fury',
	description: `
You do not temper the heat of battle within you - you unleash it! Like a raptor, a panther, a wolf, your experience in the wild taught you the secret of channeling unfettered anger into martial prowess. Primordial chaos is your ally. Leave it to others to use finesse to clean up the pieces you leave behind.

As a fury, you have abilities that deal a lot of damage, move you around the battlefield, and grow in strength as your rage increases. Nature has no concept of fairness - and neither do you.`,
	subclassName: 'Primordial Aspect',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Might, Characteristic.Agility ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'fury-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 12
				}),
				FactoryLogic.feature.createBonus({
					id: 'fury-recoveries',
					field: FeatureField.Recoveries,
					value: 10
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'fury-resource',
					name: 'Rage',
					gains: [
						{
							trigger: 'Start of your turn',
							value: '1d3'
						},
						{
							trigger: 'The first time each round that you take damage',
							value: '1'
						},
						{
							trigger: 'The first time in an encounter that you become winded or dying',
							value: '1d3'
						}
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'fury-1-1',
					listOptions: [ SkillList.Lore ],
					selected: [ 'Nature' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'fury-1-2',
					listOptions: [ SkillList.Exploration, SkillList.Intrigue ],
					count: 2
				}),
				FactoryLogic.feature.create({
					id: 'fury-1-4',
					name: 'Mighty Leaps',
					description: 'You always succeed on Might tests made to jump. You can still roll to see if you get a reward result.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'fury-1-5',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'fury-1-6',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'fury-1-7',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'fury-2-1',
					lists: [ PerkList.Crafting, PerkList.Exploration, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'fury-3-1',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'fury-ability-1',
			name: 'Brutal Slam',
			description: 'The heavy impact of your weapon attacks drives your foes ever backward.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M damage; push 1',
						tier2: '6 + M damage; push 2',
						tier3: '9 + M damage; push 4'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-2',
			name: 'Hit And Run',
			description: 'Keeping in constant motion helps you slip out of reach after a brutal assault.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '2 + M damage',
						tier2: '5 + M damage',
						tier3: '7 + M damage; A < [strong], slowed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You can shift 1 square.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-3',
			name: 'Impaled!',
			description: 'You plunge your weapon into your enemy like a boar upon a spit.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature of your size or smaller',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '2 + M damage; M < [weak], grabbed',
						tier2: '5 + M damage; M < [average], grabbed',
						tier3: '7 + M damage; M < [strong], grabbed'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-4',
			name: 'To the Death!',
			description: 'Your reckless assault leaves you tactically vulnerable.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M damage',
						tier2: '6 + M damage',
						tier3: '9 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You gain two surges. The enemy can make an opportunity attack against you as a free triggered action.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-5',
			name: 'Back!',
			description: 'Surrounded? The fools!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '5 damage',
						tier2: '8 damage; push 1',
						tier3: '11 damage; push 3'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-6',
			name: 'Out of the Way!',
			description: 'Your enemies will get out of your way - whether they want to or not.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M damage; slide 2',
						tier2: '5 + M damage; slide 3',
						tier3: '8 + M damage; slide 5'
					})
				),
				FactoryLogic.createAbilitySectionText('When you slide the target, you can move into any square they leave. If you take damage from an opportunity attack by moving this way, the target takes the same amount and type of damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-7',
			name: 'Tide of Death',
			description: 'Teach them the folly of lining up for you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('You move up to your speed in a straight line, and you don’t treat enemy squares as difficult terrain for this move. You can end this move in a creature’s space and then move them to an adjacent unoccupied space. You make one power roll that targets each enemy whose space you move through.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '2 damage',
						tier2: '3 damage',
						tier3: '5 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The last target you damage takes extra damage equal to your Might score for every free strike you triggered during your move.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-8',
			name: 'Your Entrails Are Your Extrails!',
			description: 'Hard for them to fight when they’re busy holding in their giblets.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M damage; M < [weak], bleeding (save ends)',
						tier2: '5 + M damage; M < [average], bleeding (save ends)',
						tier3: '8 + M damage; M < [strong], bleeding (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While bleeding, the target takes damage equal to your Might score at the end of your turns.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-9',
			name: 'Blood for Blood!',
			description: 'A mighty strike leaves your foe reeling.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or obeject',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '4 + M damage; M < [weak], bleeding and weakened (save ends)',
						tier2: '6 + M damage; M < [average], bleeding and weakened (save ends)',
						tier3: '10 + M damage; M < [strong], bleeding and weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You can deal 1d6 damage to yourself to deal 1d6 bonus damage to the target.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-10',
			name: 'Make Peace With Your God!',
			description: 'Anger is an energy.',
			type: FactoryLogic.type.createManeuver({ free: true }),
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('The next ability roll you make this turn automatically achieves a tier 3 result. You gain one surge.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-11',
			name: 'Thunder Roar',
			description: 'A howl erupts from you that hurls your enemies back.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '6 damage; push 2',
						tier2: '9 damage; push 4',
						tier3: '13 damage; push 6'
					})
				),
				FactoryLogic.createAbilitySectionText('The targets are pushed one at a time, starting with the target closest to you.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-12',
			name: 'To the Uttermost End',
			description: 'You spend your life force to ensure their death.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '7 + M damage',
						tier2: '11 + M damage',
						tier3: '16 + M damage'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Spend',
					value: 1,
					effect: 'If you are winded, this ability deals 1d6 bonus damage for each rage spent. If you are dying, it deals 1d10 bonus damage for each rage spent. In either case, you then lose 1d6 Stamina after making this strike.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-13',
			name: 'A Demon Unleashed',
			description: 'Foes tremble at the sight of you.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each enemy who starts their turn adjacent to you and has P < strong is frightened until the end of their turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-14',
			name: 'Face the Storm!',
			description: 'Fight or flight? FIGHT!!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each creature you make a melee strike against who has P < average is taunted until the end of their next turn. Additionally, against any enemy taunted by you, your abilities deal additional damage equal to twice your Might score and gain a +1 bonus to potency.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-15',
			name: 'Steelbreaker',
			description: 'See how useless their weapons are!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('You gain 20 Temporary Stamina.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-16',
			name: 'You Are Already Dead',
			description: 'Slash. Walk away.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('If the target is not a leader or solo creature, they die at the end of their next turn. If the target is a leader or solo creature, you gain three surges and can make a melee free strike against them.')
			]
		})
	],
	subclasses: [
		berserker,
		reaver,
		stormwight
	],
	level: 1,
	characteristics: []
};
