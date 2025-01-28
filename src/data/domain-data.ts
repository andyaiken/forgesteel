import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { Domain } from '../models/domain';
import { FactoryLogic } from '../logic/factory-logic';
import { SkillList } from '../enums/skill-list';

export class DomainData {
	static creation: Domain = {
		id: 'domain-creation',
		name: 'Creation',
		description: 'The Creation domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createMultiple({
						id: 'domain-creation-1',
						features: [
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'domain-creation-1-1',
									name: 'Hands Of The Maker',
									description: 'You can craft objects with the power of your mind!',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									effect: 'You create a mundane object no larger than size 1S. You can maintain a number of objects created this way equal to your Intuition score. You can destroy an object created this way with a thought, no matter how far you are from it (no action required).'
								})
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'domain-creation-1-2',
								listOptions: [ SkillList.Crafting ]
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
							id: 'domain-creation-2',
							name: 'Statue of Power',
							description: 'A marble statue of your patron rises from the earth.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.createRanged() ],
							target: 'Special',
							cost: 5,
							effect: 'A size 2 statue rises out of the ground in an unoccupied space within distance and lasts until the end of the encounter. While within 3 squares of the statue, you and your allies each gains a surge at the start of their turns. The statue is destroyed if it takes 20 or more damage. It is immune to poison and psychic damage.'
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that a creature within 10 squares of you uses an ability with the Area keyword.
* Prayer Effect: You summon the forces of creation and create a wall of stone whose size is 5 + your Intuition score within 10 squares of you. The wall lasts until the end of the encounter.`
	};

	static death: Domain = {
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
									effect: 'You can speak to the target corpse (including just the head) of a creature who has died within the last 24 hours and who can speak a language you know. The target regards you as they would have in life, and you might need to make tests to influence them and convince them to speak with you. The trauma of dying can make a creature’s memory of that event hazy, but the target otherwise knows all they knew in life. After 1 minute, the effect ends. You can’t use this ability on the same creature twice.'
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
							distance: [ FactoryLogic.distance.createRanged() ],
							target: 'Each ally',
							cost: 5,
							effect: 'Until the start of your next turn, each time a target kills an enemy, they regain Stamina equal to 5 + your Intuition score.'
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that a creature within 10 squares of you who isn’t a minion dies or a solo creature becomes winded.
* Prayer Effect: You inflict a deadly curse upon two enemies of your choice within 10 squares of you. Each target takes corruption damage equal to twice your Intuition score.`
	};

	static fate: Domain = {
		id: 'domain-fate',
		name: 'Fate',
		description: 'The Fate domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createMultiple({
						id: 'domain-fate-1',
						features: [
							FactoryLogic.feature.create({
								id: 'domain-fate-1-1',
								name: 'Oracular Visions',
								description: 'Your deity rewards you with hazy visions of things to come. Each time you earn 1 or more Victories, you earn an equal number of fate points. When you or a creature within 10 squares of you makes a test, you can spend 1 fate point to tap into a vision of the outcome, granting that creature an edge on the test. You lose any remaining fate points when you finish a respite.'
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'domain-fate-1-2',
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
							id: 'domain-fate-2',
							name: 'Blessing of Fate and Destiny',
							description: 'Your enemies suffer their fate; your allies embrace their destiny!',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.createRanged() ],
							target: 'Three creatures, including self',
							cost: 5,
							effect: `
Choose one of the following effects, which lasts until the end of the encounter or until you are dying:

* Whenever a target makes a power roll, they can roll three dice and choose which two to use.
* Whenever a target makes a power roll, they must roll three dice and use the lowest two.`
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that an ally within 10 squares of you gets a tier 3 result or an enemy within 10 squares of you gets a tier 1 result.
* Prayer Effect: You call on the forces of fate to create a reliable future. Choose a creature within your line of effect. That creature automatically gets a tier 1 or tier 3 result (your choice) on their next power roll made before the end of the encounter.`
	};

	static knowledge: Domain = {
		id: 'domain-knowledge',
		name: 'Knowledge',
		description: 'The Knowledge domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createMultiple({
						id: 'domain-knowledge-1',
						features: [
							FactoryLogic.feature.create({
								id: 'domain-knowledge-1-1',
								name: 'Blessing of Comprehension',
								description: 'You can interpret diagrams and charts even if you don’t understand the language associated with them. For the purpose of making project rolls for research and crafting items, you are considered fluent in all languages.'
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'domain-knowledge-1-2',
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
							id: 'domain-knowledge-2',
							name: 'The Gods Command, You Obey',
							description: 'You speak with the voice of your saint, commanding your enemies.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createRanged() ],
							target: '1 creature',
							cost: 5,
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Intuition ],
								tier1: '4 + I holy damage; P < weak, before taking damage, the target makes a free strike against a target you choose',
								tier2: '7 + I holy damage; P < average, before taking damage, the target uses an ability of your choice and you choose any targets for that ability',
								tier3: '11 + I holy damage; P < strong, before taking damage, the target shifts up to their speed, uses an ability of your choice, and you choose any targets for that ability'
							})
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that the Director uses an ability or feature that costs Malice.
* Prayer Effect: Choose up to three allies, including yourself, within 10 squares of you. Each target gains a surge.`
	};

	static life: Domain = {
		id: 'domain-life',
		name: 'Life',
		description: 'The Life domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createMultiple({
						id: 'domain-life-1',
						features: [
							FactoryLogic.feature.create({
								id: 'domain-life-1-1',
								name: 'Revitalizing Ritual',
								description: 'Each time you finish a respite, you can choose yourself or an ally who is also ending a respite to gain the benefit of a divine ritual. When you perform the ritual, the chosen character gains a bonus to their recovery value equal to your level, which lasts until you finish another respite.'
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'domain-life-1-2',
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
							id: 'domain-life-2',
							name: 'Wellspring of Grace',
							description: 'A holy light is emitted from your body, healing your allies.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
							target: 'Each ally in the area',
							cost: 5,
							effect: 'Until the end of the encounter or you are dying, whenever a target starts their turn in the aura, they can spend a Recovery.'
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that a creature within 10 squares of you regains Stamina.
* Prayer Effect: Choose yourself or one ally within 10 squares of you. The targets can spend a Recovery, can end any effects on them that are ended by a saving throw or that end at the end of their turn, or can stand up if they are prone. Alternatively, you and one ally within 10 squares of you gain temporary Stamina equal to 5 × your Intuition score.`
	};

	static love: Domain = {
		id: 'domain-love',
		name: 'Love',
		description: 'The Love domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createMultiple({
						id: 'domain-love-1',
						features: [
							FactoryLogic.feature.create({
								id: 'domain-love-1-1',
								name: 'Blessing of Compassion',
								description: `
You exude a magic aura that can soothe those willing to socially engage with you. You gain an edge on any test made to assist another creature with a test.
Additionally, when you are present at the start of a negotiation, one NPC of your choice has their patience increased by 1 (to a maximum of 5), and the first test made to influence them gains an edge.`
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'domain-love-1-2',
								listOptions: [ SkillList.Interpersonal ]
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
							id: 'domain-love-2',
							name: 'Our Hearts, Your Strength',
							description: 'An ally gains strength from their friends.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.createRanged() ],
							target: 'Self and one ally',
							cost: 5,
							effect: 'Until the end of the encounter or the target is dying, whenever the target starts their turn, they gain a bonus to speed and damage equal to the number of allies within 10 squares of them. This bonus lasts until the start of their next turn.'
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that you or an ally within 10 squares of you uses the Aid Another maneuver or an ability that targets an ally.
* Prayer Effect: Each ally within 10 squares of you gains temporary Stamina equal to 2 × your Intuition score.`
	};

	static nature: Domain = {
		id: 'domain-nature',
		name: 'Nature',
		description: 'The Nature domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createMultiple({
						id: 'domain-nature-1',
						features: [
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'domain-nature-1-1',
									name: 'Faithful Friend',
									description: 'An animal spirit is drawn to you, sharing their senses and serving you faithfully.',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									effect: 'You conjure a spirit that takes the form of any animal you have seen. The incorporeal animal can’t physically interact with the world, but they have a speed of 5 and can fly. While you are within 10 squares of the spirit, you can sense everything an animal of their type would sense, in addition to sensing your own surroundings. You can dismiss the spirit at any time (no action required). If the spirit takes any damage, it is dismissed and you take 1d10 psychic damage, which can’t be reduced in any way.'
								})
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'domain-nature-1-2',
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
							id: 'domain-nature-2',
							name: 'Nature Judges Thee',
							description: 'Mystical thorned vines appear at your bidding and bind your foes.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
							target: 'Each enemy in the area',
							cost: 5,
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Intuition ],
								tier1: '2 damage; A < weak, restrained (save ends)',
								tier2: '3 damage; A < average, restrained (save ends)',
								tier3: '7 damage; A < strong, restrained (save ends)'
							})
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that you or a creature within 10 squares of you takes acid, cold, fire, lightning, poison, or sonic damage.
* Prayer Effect: Vines whip up from the floor or ground within 10 squares of you, wrapping around a number of creatures of your choice equal to your Intuition score. You can slide each creature up to a number of squares equal to your Intuition score. The vines then fade away.`
	};

	static protection: Domain = {
		id: 'domain-protection',
		name: 'Protection',
		description: 'The Protection domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createMultiple({
						id: 'domain-protection-1',
						features: [
							FactoryLogic.feature.create({
								id: 'domain-protection-1-1',
								name: 'Protective Circle',
								description: 'You can spend 10 minutes working while uninterrupted to create a protective circle on the ground large enough to hold a size 1 creature. The circle lasts for 24 hours or until you dismiss it (no action required). Only creatures you designate at the time of drawing the circle can enter and exit the area. While in the protective area, a creature can’t be targeted by strikes.'
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'domain-protection-1-2',
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
							id: 'domain-protection-2',
							name: 'Sacred Bond',
							description: 'You forge a divine connection between two creatures.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.createRanged() ],
							target: 'Self and one ally',
							cost: 5,
							effect: `
Until the end of the encounter, whenever one target takes damage, the other target can use a free triggered action to take the damage instead. The original target suffers any effects associated with the damage.

Additionally, whenever one target spends a Recovery, the other target can use a free triggered action to spend a Recovery.`
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that you or an ally within 10 squares of you gains temporary Stamina or uses a triggered action to reduce incoming damage or give an enemy a bane on a power roll.
* Prayer Effect: One ally within 10 squares of you gains temporary Stamina equal to three times your Intuition score.`
	};

	static storm: Domain = {
		id: 'domain-storm',
		name: 'Storm',
		description: 'The Storm domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createMultiple({
						id: 'domain-storm-1',
						features: [
							FactoryLogic.feature.create({
								id: 'domain-storm-1-1',
								name: 'Blessing of Fortunate Weather',
								description: `
When you finish a respite, you can decide the weather conditions within 100 squares of you. If you are in the same area as a creature using this or a similar feature, both features cancel each other where their areas overlap. Until you finish another respite, the weather conditions you establish follow you through any mundane outdoor locations.

Choose one of the following types of weather, each of which grants a benefit to you and your allies:

* **Clear**: You and each ally gain an edge on tests that use the Search or Navigate skills.
* **Foggy**: You and each ally gain an edge on tests that use the Hide skill.
* **Overcast**: You and each ally gain an edge on tests that use the Endurance skill.
* **Precipitation**: When the ground is muddy or snowy, you and each ally gain an edge on tests that use the Track skill.`
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'domain-storm-1-2',
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
							id: 'domain-storm-2',
							name: 'Saint’s Tempest',
							description: 'A raging storm appears, striking your foes with lightning and throwing them around with wind.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
							target: 'Each enemy in the area',
							cost: 5,
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Intuition ],
								tier1: '2 lightning damage; vertical slide 1',
								tier2: '5 lightning damage; vertical slide 2',
								tier3: '7 lightning damage; vertical slide 3'
							})
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that an enemy within 10 squares of you is force moved.
* Prayer Effect: Each enemy in a 3-cube area within 10 squares of you takes lightning damage equal to twice your Intuition score.`
	};

	static sun: Domain = {
		id: 'domain-sun',
		name: 'Sun',
		description: 'The Sun domain.',
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.createMultiple({
						id: 'domain-sun-1',
						features: [
							FactoryLogic.feature.create({
								id: 'domain-sun-1-1',
								name: 'Inner Light',
								description: 'Each time you finish a respite, you can choose yourself or an ally who is also ending a respite to gain the benefit of a divine ritual. As you perform the ritual, you place a ray of morning light into the chosen character’s soul, granting them a +1 bonus on saving throws. This benefit lasts until you finish another respite.'
							}),
							FactoryLogic.feature.createSkillChoice({
								id: 'domain-sun-1-2',
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
							id: 'domain-sun-2',
							name: 'Morning Light',
							description: 'Light shines at your command, burning your foes and blessing your allies.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
							target: 'Each enemy in the area',
							cost: 5,
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Intuition ],
								tier1: '4 fire damage',
								tier2: '6 fire damage',
								tier3: '10 fire damage'
							}),
							effect: 'Each ally in the area deals fire damage equal to your Intuition score with their next strike made before the end of their next turn.'
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that an enemy within 10 squares of you takes fire or holy damage.
* Prayer Effect: One enemy of your choice within 10 squares of you takes fire damage equal to three times your Intuition score.`
	};

	static trickery: Domain = {
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
							target: 'Each ally in the area',
							cost: 5,
							effect: 'Each target can choose another creature within 5 squares of them, then swap places with that creature. The creature they choose must be able to fit into the space they leave and vice versa.'
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that you or a creature within 10 squares of you takes the Aid Another or Hide maneuver.
* Prayer Effect: Choose a creature within 10 squares of you. You can slide that creature up to a number of squares equal to 5 + your conduit level.`
	};

	static war: Domain = {
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
								description: 'As a respite activity, you can bless a weapon. Any creature who wields the weapon gains a +1 rolled damage bonus with abilities that use the weapon. This benefit lasts until you finish another respite.'
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
							distance: [ FactoryLogic.distance.createRanged() ],
							target: 'Self and each ally in the area',
							cost: 5,
							effect: 'Until the end of the encounter or until you are dying, each target gains a surge at the end of each of your turns.'
						})
					})
				]
			},
			{
				level: 3,
				features: []
			}
		],
		piety: `
* Piety: You gain 2 piety the first time in an encounter that you or a creature within 10 squares of deals damage in an amount equal to or greater than 10 + your level.
* Prayer Effect: Three allies of your choice within 10 squares of you, including yourself, gain two surges.`
	};
}
