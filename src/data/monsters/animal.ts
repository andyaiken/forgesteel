import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureAddOnType } from '../../models/feature';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const animal: MonsterGroup = {
	id: 'monster-group-animal',
	name: 'Animal',
	description: `
The natural denizens of every world. Beasties ferocious, atrocious, and precocious roam the land between and among civilizations. Whether they graze or hunt, stay solitary, in packs, or in swarms, fight danger or fly from it, their goal is to live on.

Beware! Most animals are not monsters, but are often twisted by magic and malice to *become* monsters. A hero wouldn’t mercilessly kill a pack of hungry wolves — they slay rot magic dire wolves created by vampires. When drawing steel, know what lies ahead of the heroes and handle the situation justly.`,
	information: [],
	malice: [],
	monsters: [
		FactoryLogic.createMonster({
			id: 'animal-1',
			name: 'Animal',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Harrier),
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
						id: 'animal-1-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '12 damage'
						}),
						effect: 'The animal can shift 2 between striking the first and second target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-1-2',
						name: 'Rush',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The animal moves up to their speed.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-1-3',
					name: 'Nature Calls',
					description: 'The animal ignores 1 bane on their abilities while in an encounter outside or in a natural environment.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-2',
			name: 'Big Animal A',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Mount),
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
						id: 'animal-2-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage; A<1 3 damage',
							tier3: '12 damage; A<2 3 damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-2-2',
						name: 'Toss',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						effect: 'Vertical slide 3. If the target is an ally, they can make a free strike and then fall without taking damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-2-3',
						name: 'Juke',
						type: FactoryLogic.type.createTrigger('The animal is targeted by an area ability.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The animal shifts 2 before the ability activates.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-2-4',
					name: 'Nature Calls',
					description: 'The beast ignores 1 bane on their abilities while in an encounter outside or in a natural environment.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-3',
			name: 'Big Animal B',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Mount),
			keywords: [ 'Animal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 80,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, -2, 1, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-3-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '10 damage; push 1',
							tier3: '13 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-3-2',
						name: 'Trundle',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The beast moves up to their speed. The beast can make a free strike on each creature that makes an opportunity attack against them during this movement.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-3-3',
						name: 'Animal Rally',
						type: FactoryLogic.type.createTrigger('An ally within line of effect is knocked prone.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The beast moves up to their speed. If they end their turn adjacent to the triggering ally, they can pick the ally up and allow them to climb on top of the beast.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-3-4',
					name: 'Beast of Burden',
					description: 'Two of the beast’s size 1 allies can occupy the same space while riding the beast.'
				}),
				FactoryLogic.feature.create({
					id: 'animal-3-5',
					name: 'Nature Calls',
					description: 'The beast ignores 1 bane on their abilities while in an encounter outside or in a natural environment.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-4',
			name: 'Swarm',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Hexer),
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
						id: 'animal-4-1',
						name: 'Flurry',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage; pull 1',
							tier3: '12 damage; pull 2'
						}),
						effect: 'The target can be pulled into the swarm without inflicting damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-4-2',
						name: 'Impede',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 1 }) ],
						target: 'Special',
						effect: 'The swarm forces themselves in the way of their foes. The affected area is considered difficult terrain for enemies until the start of the swarm’s next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-4-3',
					name: 'Swarm',
					description: 'The swarm can move through squares as if they were size-1M, and can occupy other creatures’ spaces. At the start of the swarm’s turn, they can make a free strike against each creature they share a square with.'
				}),
				FactoryLogic.feature.create({
					id: 'animal-4-4',
					name: 'Nature Calls',
					description: 'The swarm ignores 1 bane on their abilities while in an encounter outside or in a natural environment.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-5',
			name: 'Predator A',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Animal' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 2, -2, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-5-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '10 damage; M<1 prone',
							tier3: '13 damage; M<2 prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-5-2',
						name: 'Ready to Strike',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The predator assesses their environment or lets loose a battle cry and gives themself an edge on their next strike.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-5-3',
						name: 'Rush',
						type: FactoryLogic.type.createTrigger('A creature or object comes within distance.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Triggering creature or object',
						effect: 'The predator makes a free strike against the target. The predator deals an additional 3 damage if they were hidden from the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-5-4',
					name: 'Nature Calls',
					description: 'The predator ignores 1 bane on their abilities while in an encounter outside or in a natural environment.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'animal-6',
			name: 'Predator B',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
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
						id: 'animal-6-1',
						name: 'Natural Weapon',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '11 damage; push 1; M<1 prone',
							tier3: '14 damage; push 2; M<2 prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-6-2',
						name: 'Wild Swing',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies and objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '6 damage',
							tier3: '8 damage; A<2 bleeding (save ends)'
						}),
						effect: 'The predator uses their weapons in a wanton flurry.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'animal-6-3',
						name: 'Swat',
						type: FactoryLogic.type.createTrigger('The predator takes damage from a creature or object within distance.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Triggering creature or object',
						effect: 'Push 5.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'animal-6-4',
					name: 'Trample',
					description: 'The predator can move through enemies and objects at normal speed. When the predator enters a creature’s space for the first time on their turn, the creature takes 3 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'animal-6-5',
					name: 'Nature Calls',
					description: 'The predator ignores 1 bane on their abilities while in an encounter outside or in a natural environment.'
				})
			]
		})
	],
	addOns: [
		FactoryLogic.feature.createAddOn({
			id: 'burrowing-1',
			name: 'Burrowing',
			description: 'The animal’s movement has the burrow keyword.',
			category: FeatureAddOnType.Mobility,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'burrowing-2',
			name: 'Burrowing (2)',
			description: 'The animal can burrow through stone and creates a tunnel of their size while burrowing.',
			category: FeatureAddOnType.Mobility
		}),
		FactoryLogic.feature.createAddOn({
			id: 'climbing-1',
			name: 'Climbing',
			description: 'The animal’s movement has the climb keyword.',
			category: FeatureAddOnType.Mobility
		}),
		FactoryLogic.feature.createAddOn({
			id: 'flight-1',
			name: 'Flight',
			description: 'The animal’s movement has the fly keyword and their stability decreases by 2 (to a minimum of 0).',
			category: FeatureAddOnType.Mobility,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'flight-2',
			name: 'Flight (2)',
			description: 'Their movement also has the hover keyword.',
			category: FeatureAddOnType.Mobility
		}),
		FactoryLogic.feature.createAddOn({
			id: 'leaping-1',
			name: 'Leaping',
			description: 'On their turn, the animal can high or long jump up to half their speed in addition to their movement.',
			category: FeatureAddOnType.Mobility,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'slinking-1',
			name: 'Slinking',
			description: 'The animal can use their move action to shift 3, even while prone.',
			category: FeatureAddOnType.Mobility
		}),
		FactoryLogic.feature.createAddOn({
			id: 'swiftness-1',
			name: 'Swiftness',
			description: 'The animal’s speed increases by 2 and they ignore difficult terrain.',
			category: FeatureAddOnType.Mobility
		}),
		FactoryLogic.feature.createAddOn({
			id: 'swiftness-2',
			name: 'Swiftness 2',
			description: 'The animal’s speed increases by 2.',
			category: FeatureAddOnType.Mobility
		}),
		FactoryLogic.feature.createAddOn({
			id: 'swimming-1',
			name: 'Swimming',
			description: 'The animal’s movement has the swim keyword.',
			category: FeatureAddOnType.Mobility
		}),
		FactoryLogic.feature.createAddOn({
			id: 'camouflage-1',
			name: 'Camouflage',
			description: 'The animal can hide even while observed. The animal automatically hides at the end of their turn while no enemy has line of effect to them.',
			category: FeatureAddOnType.Defensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'fearsome-1',
			name: 'Fearsome',
			description: 'As a maneuver, the animal makes an imposing display. Each enemy within 2 of the animal I<1 shifts 3 squares away.',
			category: FeatureAddOnType.Defensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'pachyderm-1',
			name: 'Pachyderm',
			description: 'The animal starts combat with 10 temporary Stamina.',
			category: FeatureAddOnType.Defensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'pachyderm-2',
			name: 'Pachyderm (2)',
			description: 'The animal starts combat with 10 temporary Stamina.',
			category: FeatureAddOnType.Defensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'pack-1',
			name: 'Pack',
			description: 'The animal can’t be flanked or frightened while adjacent to an ally.',
			category: FeatureAddOnType.Defensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'plated-1',
			name: 'Plated',
			description: 'The animal imposes a bane on incoming melee strikes and their stability increases by 2.',
			category: FeatureAddOnType.Defensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'slippery-1',
			name: 'Slippery',
			description: 'The animal ignores opportunity attacks and has an edge on escaping grabs.',
			category: FeatureAddOnType.Defensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'spiny-1',
			name: 'Spiny',
			description: 'When an adjacent enemy grabs or uses a melee ability against the animal, they take 3 damage.',
			category: FeatureAddOnType.Defensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'stench-1',
			name: 'Stench',
			description: 'At the start of the animal’s turn, each enemy adjacent to the animal M<1 shifts 1 square away.',
			category: FeatureAddOnType.Defensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'unrelenting-1',
			name: 'Unrelenting',
			description: 'Once per combat, when the animal is reduced to 0 Stamina, they can either survive with 1 Stamina or immediately move up to their speed and make a free strike before dying.',
			category: FeatureAddOnType.Defensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'withdraw-1',
			name: 'Withdraw',
			description: 'When the animal takes damage, they can use a triggered action to reduce all incoming damage by half until the start of their next turn.',
			category: FeatureAddOnType.Defensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'charger-1',
			name: 'Charger',
			description: 'The animal’s signature action has the charge keyword. They have an edge on the ability while charging.',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'frenzy-1',
			name: 'Frenzy',
			description: 'The animal has an edge on strikes against bleeding and winded creatures.',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'grappler-1',
			name: 'Grappler',
			description: 'The animal’s signature action inflicts A<1 grabbed.',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'grappler-2',
			name: 'Grappler (2)',
			description: 'An enemy has a bane to escape the animal’s grab.',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'hunter-1',
			name: 'Hunter',
			description: 'The animal ignores concealment.',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'multilimb-1',
			name: 'Multilimb',
			description: 'The animal can target an additional creature or object whenever they make a free strike, grab, or use knockback.',
			category: FeatureAddOnType.Offensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'multilimb-2',
			name: 'Multilimb (2)',
			description: 'The animal can target a second additional creature or object whenever they make a free strike, grab, or use knockback.',
			category: FeatureAddOnType.Offensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'projectile-1',
			name: 'Projectile',
			description: 'The animal’s signature action gains the Ranged keyword, adds Ranged 10 to the distance, and the damage type of ranged strikes can become either acid or cold damage.',
			category: FeatureAddOnType.Offensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'pouncer-1',
			name: 'Pouncer',
			description: 'As a maneuver, the animal jumps 3 squares. If they land on an enemy their size or smaller, that enemy is knocked prone and the animal makes a free strike against them.',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'power-1',
			name: 'Power',
			description: 'The forced movement of the animal’s abilities increase by 2.',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'reach-1',
			name: 'Reach',
			description: 'The distance of the animal’s signature action increases by 2, and the damage type can become sonic damage.',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'reach-2',
			name: 'Reach (2)',
			description: 'The distance of the animal’s signature action increases by 2.',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'venom-1',
			name: 'Venom',
			description: 'The animal’s signature action deals an additional 2 poison damage and inflicts M<1 weakened (save ends).',
			category: FeatureAddOnType.Offensive
		}),
		FactoryLogic.feature.createAddOn({
			id: 'web-1',
			name: 'Web',
			description: `
The animal gains the following ability.

**Web** (Maneuver)
**Keywords** Area, Weapon
**Distance** 3 cube within 1
**Target** All creatures in the cube
**11-** A<0 restrained (save ends)
**12–16** A<1 restrained (save ends)
**17+** A<2 restrained (save ends)
**Effect** The affected area is considered difficult terrain for enemies.`,
			category: FeatureAddOnType.Offensive,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'death-fumes-1',
			name: 'Death Fumes',
			description: 'When the animal takes damage, each creature adjacent to the animal M<1 takes half their current Stamina in damage.',
			category: FeatureAddOnType.Supernatural,
			cost: 10
		}),
		FactoryLogic.feature.createAddOn({
			id: 'elemental-1',
			name: 'Elemental',
			description: 'The animal has an affinity for one of the following damage types: acid, cold, corruption, fire, lightning, poison. The animal has affinity immunity 3 and the damage type of their strikes becomes affinity damage.',
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'gelatinous-1',
			name: 'Gelatinous',
			description: 'The animal can move through spaces as if they were size-1T. When the animal takes damage, they can use a triggered action to separate into 2 animals, splitting their current Stamina in half between them. The animals have the same statistics as the original.',
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'hypnosis-1',
			name: 'Hypnosis',
			description: 'As a maneuver, the animal targets an enemy within 5 to be R<1 dazed (save ends) with their gaze or their roar.',
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'imposer-1',
			name: 'Imposer',
			description: 'The animal’s size increases by 1 (to a minimum of size-2) and their stability increases by 2. The animal’s strikes deal an additional 3 damage.',
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'incorporeal-1',
			name: 'Incorporeal',
			description: 'The animal can move through solid matter and imposes a bane on incoming strikes. If the animal ends their turn inside solid matter, they are shunted out into the space they originally entered.',
			category: FeatureAddOnType.Supernatural,
			cost: 2
		}),
		FactoryLogic.feature.createAddOn({
			id: 'translation-1',
			name: 'Translation',
			description: 'The animal’s movement has the teleport keyword.',
			category: FeatureAddOnType.Supernatural,
			cost: 2
		})
	]
};
