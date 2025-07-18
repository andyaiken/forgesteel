import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { blackAsh } from './black-ash';
import { causticAlchemy } from './caustic-alchemy';
import { harlequinMask } from './harlequin-mask';

export const shadow: HeroClass = {
	id: 'class-shadow',
	name: 'Shadow',
	description: `
Subtlety is your art, the tip of the blade your brush. You studied at a secret college, specializing in alchemy, illusion, or shadow-magics. Your training and knowledge places you among the elite assassins, spies, and commandos. But more powerful than any weapon or sorcery is your insight into your enemies’ weaknesses.

As a shadow, you have abilities that deal a lot of damage, let you move swiftly across the battlefield and away from hazards, and allow you to fade from notice even in the middle of the most heated combat encounter. You also possess more skills than any other hero.`,
	subclassName: 'Shadow College',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Agility ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'shadow-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'shadow-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'shadow-resource',
					name: 'Insight',
					gains: [
						{
							trigger: 'Start of your turn',
							value: '1d3'
						},
						{
							trigger: 'The first time each round that you deal damage with at least one surge',
							value: '1'
						}
					],
					details: `
When you use a heroic ability that has a power roll, that ability costs 1 less insight if you have an edge or double edge on it.

If the ability has multiple targets, the cost is reduced even if the ability has an edge or double edge against only one target.`
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'shadow-1-1',
					listOptions: [ SkillList.Intrigue ],
					count: 2,
					selected: [ 'Hide', 'Sneak' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'shadow-1-3',
					options: [ 'Criminal Underworld' ],
					listOptions: [ SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue ],
					count: 5
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-1-5',
						name: 'Hesitation Is Weakness',
						description: 'Keep up the attack. Never give them a moment’s grace.',
						type: FactoryLogic.type.createTrigger('Another hero ends their turn. That hero can’t have used this ability to start their turn.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('You take your turn after the triggering hero.')
						]
					})
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'shadow-1-5.5'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'shadow-1-6',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'shadow-1-7',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'shadow-1-8',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'shadow-2-1',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-3-1',
						name: 'Careful Observation',
						description: 'A moment of focus leaves a foe firmly in your sights.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSpecial('20 squares') ],
						target: '1 creature',
						sections: [
							FactoryLogic.createAbilitySectionText('As long as you remain within distance of the target, maintain line of effect to them, and strike no other creature first, you gain a surge and an edge on the next strike you make against the assessed creature.')
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'shadow-3-2',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'shadow-ability-1',
			name: 'Gasping in Pain',
			description: 'Your precise strikes let your allies take advantage of a target’s agony.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '3 + A damage',
						tier2: '5 + A damage',
						tier3: '8 + A damage; I < [strong], prone'
					})
				),
				FactoryLogic.createAbilitySectionText('An ally of your choice within 5 squares of the target gains a surge.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-2',
			name: 'I Work Better Alone',
			description: 'It’s better, just you and me. Isn’t it?',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '3 + A damage',
						tier2: '6 + A damage',
						tier3: '9 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target has no allies adjacent to them, this strike deals extra damage equal to your Agility score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-3',
			name: 'Teamwork Has Its Place',
			description: 'You attack an enemy, distracting them long enough for an ally to stab them.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '3 + A damage',
						tier2: '6 + A damage',
						tier3: '9 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('If an ally is adjacent to the target, the target takes extra damage equal to your Agility score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-4',
			name: 'You Were Watching The Wrong One',
			description: 'They can’t watch both of you at once.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '3 + A damage',
						tier2: '5 + A damage',
						tier3: '8 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('As long as you have at least one ally within 5 squares of the target, you gain a surge. If you are flanking the target when you use this ability, choose one ally who is flanking with you. That ally also gain a surge.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-5',
			name: 'Disorienting Strike',
			description: 'Your attack leaves them reeling, allowing you to follow up.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '4 + A damage; slide 2',
						tier2: '6 + A damage; slide 3',
						tier3: '10 + A damage; slide 5'
					})
				),
				FactoryLogic.createAbilitySectionText('You can shift into any square the target leaves when you slide them.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-6',
			name: 'Eviscerate',
			description: 'You leave your foe bleeding out after a devastating attack.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '4 + A damage; A < [weak], bleeding (save ends)',
					tier2: '6 + A damage; A < [average], bleeding (save ends)',
					tier3: '10 + A damage; A < [strong], bleeding (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-7',
			name: 'Get In Get Out',
			description: 'Move unexpectedly, strike fast, and be gone!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '5 + A damage',
						tier2: '8 + A damage',
						tier3: '11 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can shift up to your speed, dividing that movement before or after your strike as desired.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-8',
			name: 'Two Throats At Once',
			description: 'A bargain.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '2 creatures or objects',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '4 damage',
					tier2: '6 damage',
					tier3: '10 damage'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-9',
			name: 'Coup de Grâce',
			description: 'Your blade might be the last thing they see.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '1d6 + 7 + A damage',
					tier2: '1d6 + 11 + A damage',
					tier3: '1d6 + 16 + A damage'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-10',
			name: 'One Hundred Throats',
			description: 'As you move across the battlefield, every foe within reach feels your wrath.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('You shift up to your speed. You make one power roll that targets up to three enemies, each of who became adjacent to you during the move.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '3 damage',
						tier2: '6 damage',
						tier3: '9 + A damage'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-11',
			name: 'Set-Up',
			description: 'Your friends will thank you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: '1 creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '6 + A damage; R < [weak], the target has damage weakness 5 (save ends)',
					tier2: '9 + A damage; R < [average], the target has damage weakness 5 (save ends)',
					tier3: '13 + A damage; R < [strong], the target has damage weakness 5 (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-12',
			name: 'Shadowstrike',
			description: 'They have no idea what the college taught you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('You make two signature strikes.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-13',
			name: 'Dancer',
			description: 'You enter a flow state that makes you nearly impossible to pin down.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, whenever an enemy moves adjacent to you or damages you, you can take the Disengage move action as a free triggered action.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-14',
			name: 'Misdirecting Strike',
			description: 'Why are you looking at ME?!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '9 + A damage',
						tier2: '13 + A damage',
						tier3: '18 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The target is taunted by a willing ally within 5 squares of you until the end of the target’s next turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-15',
			name: 'Pinning Shot',
			description: 'One missile - placed well and placed hard.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: '1 creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '8 + A damage; A < [weak], restrained (save ends)',
					tier2: '12 + A damage; A < [average], restrained (save ends)',
					tier3: '16 + A damage; A < [strong], restrained (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-16',
			name: 'Staggering Blow',
			description: 'There’s no recovering from this.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '7 + A damage; M < [weak], slowed (save ends)',
					tier2: '11 + A damage; M < [average], prone and can’t stand (save ends)',
					tier3: '16 + A damage; M < [strong], prone and can’t stand (save ends)'
				}))
			]
		})
	],
	subclasses: [
		blackAsh,
		causticAlchemy,
		harlequinMask
	],
	level: 1,
	characteristics: []
};
