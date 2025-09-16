import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureAddOnType } from '../../enums/feature-addon-type';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const animal: MonsterGroup = {
	id: 'monster-group-animal',
	name: 'Animal',
	description: `
The natural denizens of every world, animals ferocious, atrocious, and precocious roam the lands between and among settlements of humanoids and other folk. Whether they graze or hunt, stay solitary or move in packs, fight danger or fly from it, all animals share a singular goal—to live. 

Most animals are not monsters, but some are twisted by magic and malice to become monsters. A hero wouldn’t mercilessly kill a pack of hungry wolves—but they’ll slay rot-magic dire wolves created by vampires. In many cases, animals are more likely to be bystanders than threats in an encounter.`,
	picture: null,
	information: [
		{
			id: 'animal-info-1',
			name: 'Animal Traits',
			description: 'This section presents a number of default animal stat blocks with basic features. You can customize those stat blocks by adding traits from the following categories to more closely model the animal’s most identifiable features. You can spend up to 4 points on traits to add to a stat block without increasing the encounter value. Each point you spend after 4 increases the stat block’s EV by 2. Unless otherwise specified, you can select a trait only once.'
		},
		{
			id: 'animal-info-2',
			name: 'Animal Stat Blocks',
			description: 'The following stat blocks can be used to describe everyday animals capable of acting as threats or challenges to the heroes under appropriate circumstances. Alternatively, you can add traits to these stat blocks to describe animals of a specific type. If you’re adding traits to animal stat blocks, build out your custom animals ahead of time to lessen the amount of flipping back and forth between stat blocks and traits during play.'
		},
		{
			id: 'animal-info-3',
			name: 'Animal Notation',
			description: `When building an animal by adding traits to a stat block, you can use a shorthand to describe the animal. For example, a dire wolf might be denoted as “Predator B: Swiftness, Pack, Hunter” to indicate that you’re using the Predator B stat block with the Swiftness, Pack, and Hunter traits.

The Example Animals table breaks out a number of animals using this notation. Selected traits are listed in order by category—mobility, defensive, offensive, and supernatural.`
		}
	],
	malice: [],
	monsters: [
		FactoryLogic.createMonster({
			id: 'animal-1',
			name: 'Animal',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Animal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 2, -2, 1, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-1-feature-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage',
								tier3: '12 damage'
							})),
							FactoryLogic.createAbilitySectionText('The animal can shift 2 between striking the first and second target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-1-feature-2',
						name: 'Rush',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The animal moves up to their speed.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-1-feature-3',
					name: 'Nature’s Spirit',
					description: 'While outdoors or in a natural environment, the animal can negate a bane on their abilities or turn a double bane into a bane.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-2',
			name: 'Swarm',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Animal', 'Swarm' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(-2, 1, -3, 2, -3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-2-feature-1',
						name: 'Flurry',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage; pull 1',
								tier3: '12 damage; pull 2'
							})),
							FactoryLogic.createAbilitySectionText('The target can be pulled into the swarm without inflicting damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-2-feature-2',
						name: 'Impede',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 1 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The swarm forces themselves in the way of their foes. The affected area is considered difficult terrain for enemies until the start of the swarm’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-2-feature-3',
					name: 'Swarm',
					description: 'The animal swarm can move through spaces as if they were a size 1M creature, and can occupy other creatures’ spaces. At the start of each of the animal swarm’s turns, they can make a free strike against each creature whose space they share.'
				}),
				FactoryLogic.feature.create({
					id: 'animal-2-feature-4',
					name: 'Nature’s Spirit',
					description: 'While outdoors or in a natural environment, the animal swarm can negate a bane on their abilities or turn a double bane into a bane.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-3',
			name: 'Big Animal A',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Animal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 60,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 2, -2, 1, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-3-feature-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage; A < 1 3 damage',
								tier3: '12 damage; A < 2 3 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-3-feature-2',
						name: 'Toss',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** The target must be the animal’s size or smaller.'),
							FactoryLogic.createAbilitySectionText('The target vertical slides up to 3 squares. If the target is an ally, they can make a free strike at the end of the forced movement, then fall without taking damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-3-feature-3',
						name: 'Juke',
						type: FactoryLogic.type.createTrigger('The animal is targeted by an area ability.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The animal shifts up to 2 squares before the ability resolves.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-3-feature-4',
					name: 'Nature’s Spirit',
					description: 'While outdoors or in a natural environment, the animal can negate a bane on their abilities or turn a double bane into a bane.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-4',
			name: 'Big Animal B',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Animal' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 80,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -1, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-4-feature-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage',
								tier2: '10 damage; push 1',
								tier3: '13 damage; push 2'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-4-feature-2',
						name: 'Trundle',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The animal moves up to their speed. They can make a free strike against each creature who makes an opportunity attack against them during this movement.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-4-feature-3',
						name: 'Animal Rally',
						type: FactoryLogic.type.createTrigger('The target is knocked prone.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The animal moves up to their speed. If they end their turn adjacent to the target, they can use the Stand Up maneuver to let the target stand, then get on to ride them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-4-feature-4',
					name: 'Beast of Burden',
					description: 'While riding the animal, two size 1 allies can occupy the same space.'
				}),
				FactoryLogic.feature.create({
					id: 'animal-4-feature-5',
					name: 'Nature’s Spirit',
					description: 'While outdoors or in a natural environment, the animal can negate a bane on their abilities or turn a double bane into a bane.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-5',
			name: 'Predator A',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Animal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 2, -2, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-5-feature-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage',
								tier2: '10 damage; M < 1 prone',
								tier3: '13 damage; M < 2 prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-5-feature-2',
						name: 'Ready to Strike',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The predator assesses their environment or lets loose a threatening roar and gains an edge on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-5-feature-3',
						name: 'Quick Strike',
						type: FactoryLogic.type.createTrigger('A creature or object comes within distance.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The predator makes a free strike against the target. If the predator was hidden from the target, the strike deals an extra 3 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-5-feature-4',
					name: 'Nature’s Spirit',
					description: 'While outdoors or in a natural environment, the predator can negate a bane on their abilities or turn a double bane into a bane.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-6',
			name: 'Predator B',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Animal' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(5),
			stamina: 100,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -1, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-6-feature-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage',
								tier2: '11 damage; push 1; M<1 prone',
								tier3: '14 damage; push 2; M<2 prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-6-feature-2',
						name: 'Wild Swing',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy or object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '6 damage',
								tier3: '8 damage; A < 2 bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-6-feature-3',
						name: 'Swat',
						type: FactoryLogic.type.createTrigger('A creature or object within distance deals damage to the predator.'),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is pushed up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-6-feature-4',
					name: 'Trample',
					description: 'The predator can move through enemies’ and objects’ spaces at their usual speed. Any mundane size 2 or smaller object whose space they move through is destroyed. When the predator enters a creature’s space for the first time on a turn, that creature takes 3 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'animal-6-feature-5',
					name: 'Nature’s Spirit',
					description: 'While outdoors or in a natural environment, the predator can negate a bane on their abilities or turn a double bane into a bane.'
				})
			]
		})
	],
	addOns: [
		FactoryLogic.feature.createAddOn({
			id: 'burrowing-1',
			name: 'Burrowing',
			description: `The animal can burrow.
			
<span class='pill'>+1pt</span> The animal can burrow through stone, creating a tunnel of their size in each square of stone they move through.

**Typically Used By:** Ants, groundhogs, mohlers.`,
			category: FeatureAddOnType.Mobility,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'climbing-1',
			name: 'Climbing',
			description: `The animal can automatically climb at full speed while moving.

**Typically Used By:** Jaguars, monkeys.`,
			category: FeatureAddOnType.Mobility,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'flight-1',
			name: 'Flight',
			description: `The animal can fly, and their stability decreases by 2 (to a minimum of 0).

<span class='pill'>+1pt</span> The animal can also hover.

**Typically Used By:** Bees, birds.`,
			category: FeatureAddOnType.Mobility,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'leaping-1',
			name: 'Leaping',
			description: `On their turn, the animal can high jump or long jump up to half their speed. This jump can allow the animal to move more squares than their speed.

**Typically Used By:** Frogs, rabbits.`,
			category: FeatureAddOnType.Mobility,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'slinking-1',
			name: 'Slinking',
			description: `The animal can use a move action to shift up to 3 squares, even while prone.

**Typically Used By:** Snakes, vermin.`,
			category: FeatureAddOnType.Mobility,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'swiftness-1',
			name: 'Swiftness',
			description: `The animal has a +2 bonus to speed, and they ignore difficult terrain.
(This trait can be selected twice.)

**Typically Used By:** Tigers, wolves.`,
			category: FeatureAddOnType.Mobility,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'swimming-1',
			name: 'Swimming',
			description: `The animal can automatically swim at full speed while moving.

**Typically Used By:** Fish, penguins.`,
			category: FeatureAddOnType.Mobility,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'camouflage-1',
			name: 'Camouflage',
			description: `The animal can attempt to hide even while observed. While no enemy has line of effect to the animal, they can automatically hide at the end of their turn.

**Typically Used By:** Chameleons, foxes, tigers.`,
			category: FeatureAddOnType.Defensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'fearsome-1',
			name: 'Fearsome',
			description: `As a maneuver, the animal makes an imposing display. Each enemy within 2 squares of the animal who has <code>I < 1</code> must shift 3 squares in a straight line away from the animal.

**Typically Used By:** Aardvarks, lions, peacocks.`,
			category: FeatureAddOnType.Defensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'pack-1',
			name: 'Pack',
			description: `While adjacent to an ally, the animal can’t be flanked or be made frightened.

**Typically Used By:** Hyenas, sheep, wolves.`,
			category: FeatureAddOnType.Defensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'plated-1',
			name: 'Plated',
			description: `The animal has a +2 bonus to stability, and melee strikes against them take a bane.

**Typically Used By:** Beetles, crabs, turtles.`,
			category: FeatureAddOnType.Defensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'spiny-1',
			name: 'Spiny',
			description: `Whenever an adjacent enemy grabs the animal or uses a melee ability against them, that enemy takes 3 damage.

**Typically Used By:** Porcupines, urchins.`,
			category: FeatureAddOnType.Defensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'stench-1',
			name: 'Stench',
			description: `At the start of the animal’s turn, each enemy adjacent to the animal who has <code>M < 1</code> must shift 1 square away from the animal.

**Typically Used By:** Oxen, skunks, wolverines.`,
			category: FeatureAddOnType.Defensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'thick-hide-1',
			name: 'Thick Hide',
			description: `The animal starts any combat encounter with 10 temporary Stamina.
(This trait can be selected twice.)

**Typically Used By:** Bears, elephants, rhinoceroses.`,
			category: FeatureAddOnType.Defensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'unrelenting-1',
			name: 'Unrelenting',
			description: `Once per combat, when the animal is reduced to 0 Stamina, they can choose to either remain alive with 1 Stamina or immediately move up to their speed and make a free strike before dying.

**Typically Used By:** Bears, boars.`,
			category: FeatureAddOnType.Defensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'wiggly-1',
			name: 'Wiggly',
			description: `The animal ignores opportunity attacks and gains an edge on the Escape Grab maneuver.

**Typically Used By:** Eels, lizards, rats.`,
			category: FeatureAddOnType.Defensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'withdraw-1',
			name: 'Withdraw',
			description: `Whenever the animal takes damage, they can use a triggered action to halve that damage and all other damage they take until the start of their next turn.

**Typically Used By:** Armadillos, turtles.`,
			category: FeatureAddOnType.Defensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'charger-1',
			name: 'Charger',
			description: `The animal’s signature ability has the Charge keyword, and they gain an edge on that ability if it is used as part of the Charge main action.

**Typically Used By:** Boars, rhinoceroses, swordfish`,
			category: FeatureAddOnType.Offensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'frenzy-1',
			name: 'Frenzy',
			description: `The animal gains an edge on strikes against creatures who are bleeding or winded.

**Typically Used By:** Blood bats, piranhas, sharks`,
			category: FeatureAddOnType.Offensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'grappler-1',
			name: 'Grappler',
			description: `If the target of the animal’s signature ability has <code>A < 1</code>, they are grabbed by the animal.

<span class='pill'>+1pt</span> An enemy grabbed by the animal takes a bane on the Escape Grab maneuver.

**Typically Used By:** Apes, octopuses, snakes.`,
			category: FeatureAddOnType.Offensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'hunter-1',
			name: 'Hunter',
			description: `The animal ignores concealment.

**Typically Used By:** Eagles, rats, wolves.`,
			category: FeatureAddOnType.Offensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'multilimb-1',
			name: 'Multilimb',
			description: `The animal can target one additional creature or object whenever they make a free strike, use the Grab maneuver, or use the Knockback maneuver. 
(This trait can be selected twice.)

**Typically Used By:** Monkeys, octopuses, quadrakangas`,
			category: FeatureAddOnType.Offensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'pouncer-1',
			name: 'Pouncer',
			description: `As a maneuver, the animal jumps up to 3 squares. If they land on an enemy their size or smaller, that enemy is knocked prone and the animal can make a free strike against them.

**Typically Used By:** Foxes, wild cats.`,
			category: FeatureAddOnType.Offensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'power-1',
			name: 'Power',
			description: `Whenever the animal force moves a target, they have a +2 bonus to the forced movement distance.

**Typically Used By:** Bears, bulls, lions.`,
			category: FeatureAddOnType.Offensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'projectile-1',
			name: 'Projectile',
			description: `The animal’s signature ability gains the Ranged keyword and adds Ranged 10 to its distance.

**Optional:** The animal’s signature ability can deal acid or cold damage.

**Typically Used By:** Archer fish, snakes.`,
			category: FeatureAddOnType.Offensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'reach-1',
			name: 'Reach',
			description: `The animal’s signature ability gains a +2 bonus to distance. 
(This trait can be selected twice.)

**Optional:** The animal’s signature ability can deal fire or sonic damage.

**Typically Used By:** Frogs, giraffes, pistol shrimp.`,
			category: FeatureAddOnType.Offensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'venom-1',
			name: 'Venom',
			description: `The animal’s signature ability deals an extra 2 poison damage, and if the target has <code>M < 1</code>, they are weakened (save ends).

**Typically Used By:** Platypuses, snakes, wasps.`,
			category: FeatureAddOnType.Offensive,
			cost: 1
		}),
		FactoryLogic.feature.createAddOn({
			id: 'web-1',
			name: 'Web',
			description: `
The animal gains the following ability.

**Web** (Maneuver)
**Keywords** Area, Weapon
**Distance** 3 cube within 1
**Target** Each creature in the area
**Power Roll** 2d10 + highest characteristic
**11-** <code>A < 0</code> restrained (save ends)
**12–16** <code>A < 1</code> restrained (save ends)
**17+** <code>A < 2</code> restrained (save ends)
**Effect** The area is difficult terrain for enemies until the end of the encounter.

**Typically Used By:** Pelagic snails, spiders.`,
			category: FeatureAddOnType.Offensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'death-fumes-1',
			name: 'Death Fumes',
			description: `Whenever the animal takes damage, each creature adjacent to the animal who has <code>M < 1</code> takes damage equal to half the creature’s current Stamina.

**Typically Used By:** Death snails.`,
			category: FeatureAddOnType.Supernatural,
			cost: 10
		}),
		FactoryLogic.feature.createAddOn({
			id: 'elemental-1',
			name: 'Elemental',
			description: `The animal has an affinity for one of the following damage types: acid, cold, corruption, fire, lightning, poison. The animal has damage immunity 3 to the chosen damage type, and their strikes deal the chosen damage type instead of their original damage type.

**Typically Used By:** Fire salamanders, ice bats.`,
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'gelatinous-1',
			name: 'Gelatinous',
			description: `The animal can move through spaces as if they were size 1T. Whenever the animal takes damage, they can use a triggered action to separate into two animals. Each new animal has the same statistics as the original but has half the original’s current Stamina.

**Typically Used By:** Earthworms, thunderjellies.`,
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'hypnosis-1',
			name: 'Hypnosis',
			description: `As a maneuver, the animal targets one enemy within 5 squares with their gaze, movements, or vocalizations. If the enemy has <code>R < 1</code>, they are dazed (save ends).

**Typically Used By:** Angler fish, snakes, tigers.`,
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'imposer-1',
			name: 'Imposer',
			description: `The animal’s size increases by 1 (to a minimum of size 2), and they gain a +2 bonus to stability. Additionally, the animal gains a +3 damage bonus to strikes.

**Typically Used By:** Dire animals, terror lizards.`,
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'pass-through-1',
			name: 'Pass Through',
			description: `The animal can move through solid matter, and strikes made against them take a bane. If the animal ends their turn inside solid matter, they are shunted out into the space from which they entered it.

**Typically Used By:** Barn owls, tiger wraiths.`,
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'translation-1',
			name: 'Translation',
			description: `The animal can teleport.

<span class='pill'>+1pt</span> The animal can also hover.

**Typically Used By:** Quantum spiders, thrazzes.`,
			category: FeatureAddOnType.Supernatural,
			cost: 2
		})
	]
};
