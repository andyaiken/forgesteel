import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const ankheg: MonsterGroup = {
	id: 'monster-group-ankheg',
	name: 'Ankheg',
	description: `Pebbles dance as the ground quivers. A spray of rock and earth shatters the afternoon’s peace, and an ankheg blooms from the earth. Their mandibles drip sizzling acid as a talon impales their next meal: sometimes a fat sheep, other times a shepherd. 

An ankheg is a chitinous, burrowing monstrosity larger than a horse. Their hooked claws and serrated mandibles are fearsome weapons, but even more dangerous is the stream of caustic spittle they use to dissolve their prey.`,
	information: [
		{
			id: 'ankheg-info-1',
			name: 'Pastoral Pest',
			description: 'Although ankhegs can be found anywhere, they are a particular plague in settled lands. Ankhegs hunt alone, lurking a few feet below roadways and pastures. When their sensitive antennae detect movement above, they burst from the earth, dragging living prey into their tunnels to be devoured. These hit-and-run tactics make ankhegs virtually impossible to eradicate - unless they have the bad luck to ambush a party of well-armed adventurers. Many communities pay a handsome bounty for a slain ankheg.'
		},
		{
			id: 'ankheg-info-2',
			name: 'Terror of the Thaw',
			description: 'Ankhegs are a year-round menace in the warmest lands. In temperate places, ankhegs hibernate during the winter, granting farmers a season of peace … but this respite is paid for on the first thaw of spring, when every ankheg awakens ravenous on the same day and bursts from the ground to feed.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'ankheg-malice-1',
			name: 'Burning Maw',
			cost: 3,
			sections: [
				'The ankheg dribbles acid over their mandibles. Their next strike deals 6 acid damage until the end of their turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ankheg-malice-2',
			name: 'Geyser',
			cost: 5,
			sections: [
				'The ankheg tunnels underneath the encounter map cause a sudden influx of hot gas to burst from a 2-square-by-2-square area on the ground. Each enemy in an affected square must make an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '3 damage; vertical push 5; prone',
					tier2: '3 damage; vertical push 2',
					tier3: 'The target shifts to the nearest unnocupied space outside the area.'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ankheg-malice-3',
			name: 'Earth Sink',
			cost: 10,
			sections: [
				'The area of the encounter map slowly sinks into the ground. Each creature who starts their turn on the ground and can’t burrow must spend 1 extra square of movement to leave their starting position, or 2 squares if they start their turn prone or restrained. A creature who starts and ends their turn in the same space and can’t burrow is restrained by the ground (save ends).'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'ankheg-1',
			name: 'Ankheg',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Ankheg', 'Beast' ],
			encounterValue: 30,
			speed: FactoryLogic.createSpeed(5, 'burrow'),
			stamina: 200,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -3, 1, -4),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'ankheg-1-feature-0',
					name: 'the ankheg'
				}),
				FactoryLogic.feature.create({
					id: 'ankheg-1-feature-1',
					name: 'Soft Underbelly',
					description: 'A prone creature gains an edge on melee strikes against the ankheg instead of taking a bane.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ankheg-1-feature-2',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage; grabbed',
							tier3: '16 damage; grabbed'
						}),
						effect: 'A size 1 target grabbed this way takes 3 acid damage at the start of each of their turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ankheg-1-feature-3',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; A<1 grabbed',
							tier2: '11 damage; A<2 grabbed',
							tier3: '14 damage; A<3 grabbed'
						}),
						spend: [
							{
								value: 2,
								effect: 'The ankheg can vertical slide each target up to 5 squares.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ankheg-1-feature-4',
						name: 'Spitfire',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 }) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 acid damage',
							tier2: '8 acid damage',
							tier3: '11 acid damage'
						}),
						effect: 'The affected area is covered in burning acid. An enemy who enters an affected square for the first time on their turn or starts their turn there takes 2 acid damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'ankheg-1-feature-5',
						name: 'Earth Eruption',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'Each enemy in the burst',
						preEffect: 'The ankheg burrows up to their speed then creates the burst when they breach the surface.',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ankheg-1-feature-6',
						name: 'Dust Cloud',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Special',
						effect: 'The ankheg kicks up dust into the affected area that blocks line of effect for enemies. The ankheg then shifts or burrows up to their speed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ankheg-1-feature-7',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('A creature damages the ankheg'),
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 }) ],
						target: 'Self',
						effect: 'The ankheg shifts up to 3 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'ankheg-1-feature-8',
					name: 'Earthwalk',
					description: 'Difficult terrain composed of earth or loose rock doesn’t cost the ankheg extra movement.'
				}),
				FactoryLogic.feature.create({
					id: 'ankheg-1-feature-9',
					name: 'Tunneler',
					description: 'When the ankheg burrows, they create a size 2 tunnel. The tunnel remains stable for one day, then collapses.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ankheg-1-feature-10',
						name: 'Acid Spew',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 10, within: 10 }) ],
						target: 'Each creature in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '5 acid damage',
							tier2: '8 acid damage',
							tier3: '11 acid damage'
						}),
						effect: 'The ground within the affected area is covered in burning acid. An enemy who enters an affected square for the first time on their turn or starts their turn there takes 2 acid damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ankheg-1-feature-11',
						name: 'Sinkhole',
						type: FactoryLogic.type.createVillainAction(),
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 }) ],
						target: 'Self',
						effect: 'The ankheg shifts up to their speed by burrowing. If the ankheg ends this move underground and within 2 squares of a creature on the surface, the ankheg uses Bite against the creature.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ankheg-1-feature-12',
						name: 'Acid and Claws',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each creature in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '5 acid damage, M<1 bleeding (save ends)',
							tier2: '8 acid damage, M<2 bleeding (save ends)',
							tier3: '11 acid damage, M<3 bleeding (save ends)'
						})
					})
				})
			]
		})
	],
	addOns: []
};
