import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const lightbender: MonsterGroup = {
	id: 'monster-group-lightbender',
	name: 'lightbender',
	description: 'Lightbenders prowl deserts, plains, forests—any sunbathed wilderness. Their adaptations make them skilled daylight predators. This monstrous creature’s fur bends and refracts light from the surrounding environment, producing mirages that distract and confuse their prey—hence their name.',
	information: [
		{
			id: 'lightbender-info-1',
			name: 'Hidden Hunters',
			description: 'At a distance, a lightbender looks akin to a regular lion, but closer inspection reveals their glowing eyes, iridescent mane, and pair of lashing tails spiked with refractive crystals. The lightbender’s pelt magically warps light around them to disguise their movement, allowing them to teleport while leaving behind a past visual imprint. Unsuspecting prey rarely realize they’re staring at an afterimage of the lightbender until the predator pounces.'
		},
		{
			id: 'lightbender-info-2',
			name: 'Prized Manes',
			description: 'Both male and female lightbenders have the distinctive mane, which is highly prized for its light-displacing qualities and can be fashioned into a mantle of the lightbender, though only a few mages possess the knowledge to do so.'
		},
		{
			id: 'lightbender-info-3',
			name: 'Protective Companions',
			description: 'Though lightbenders are typically solitary creatures, they sometimes cross into another lightbender’s territory to help protect a newborn litter of kittens. A few people have succeeded in taming lightbenders as guards or hunting animals, and if treated well, they can make for loyal protectors, often viewing their smaller humanoid companions as surrogate kittens.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'lightbender-malice-1',
			name: 'Silent Prowl',
			cost: 3,
			sections: [
				'A lightbender acting this turn adds the teleport keyword to their movement and can hide as a free maneuver until the start of their next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lightbender-malice-2',
			name: 'Duplicate',
			cost: 5,
			sections: [
				'A lightbender acting this turn creates a duplicate lightbender in an unoccupied space adjacent to them. The duplicate has 1 Stamina and shares the lightbender’s speed and turn. Once per round, the lightbender can instantly trade places with a duplicate before or after using an ability.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lightbender-malice-3',
			name: 'Rampage',
			cost: 7,
			sections: [
				'All lightbenders in the encounter shine radiantly and distort the senses of each enemy within 5 of one. Each aﬀected enemy makes a **Reason test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: 'The target can\'t establish line of effect with any lightbenders (save ends)',
					tier2: 'The target can\'t establish line of effect with any lightbenders (EoT)',
					tier3: 'no effect'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'lightbender-1',
			name: 'Lightbender',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Ambusher),
			keywords: [ 'Beast', 'Lightbender' ],
			encounterValue: 20,
			speed: FactoryLogic.createSpeed(10),
			stamina: 100,
			stability: 1,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -3, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-1-feature-1',
						name: 'Flash Swipe',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '9 damage',
							tier2: '14 damage',
							tier3: '18 damage'
						}),
						effect: 'The lightbender deals an additional 4 damage if they have an edge.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-1-feature-2',
						name: 'Piercing Tails',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '8 damage',
							tier2: '12 damage; M<1 bleeding (save ends)',
							tier3: '15 damage; M<2 bleeding (save ends)'
						}),
						effect: 'A creature who is bleeding from this ability has a bane on tests to search for the lightbender until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-1-feature-3',
						name: 'Hypnotic Mane',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						cost: 5,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'I<0 dazed (save ends)',
							tier2: 'I<1 dazed (save ends)',
							tier3: 'I<2 dazed (save ends)'
						}),
						effect: 'Targets dazed by this ability have a speed of 0 while dazed. If a dazed target takes damage or if someone else spends an action to shake the creature out of their stupor, the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-1-feature-4',
						name: 'Stalker\'s Afterimage',
						type: FactoryLogic.type.createTrigger('The lightbender takes damage from a strike.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The lightbender halves the damage, doesn\'t suffer any effect associated with it, and teleports 5 squares. The lightbender immediately hides if they teleport into cover or concealment.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'lightbender-1-feature-5',
					name: 'Avoidance',
					description: 'The lightbender always treats a save ends effect as na EoT effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lightbender-2',
			name: 'Lightbender Pouncer',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Harrier),
			keywords: [ 'Beast', 'Lightbender' ],
			encounterValue: 20,
			speed: FactoryLogic.createSpeed(10),
			stamina: 100,
			stability: 1,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, -3, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-2-feature-1',
						name: 'Pounce',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '11 damage; A<1 prone',
							tier3: '14 damage; A<2 prone'
						}),
						effect: 'The pouncer makes a free strike against each target they have knocked prone.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-2-feature-2',
						name: 'Sparkling Tail Whip',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies and objects in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '7 damage; A<1 dazzled (save ends)',
							tier3: '10 damage; A<2 dazzled (save ends)'
						}),
						effect: 'A dazzled creature has a bane on strikes and can’t have line of effect to targets who aren’t adjacent to them.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-2-feature-3',
						name: 'Illusory Feint',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'All enemies in the cube',
						cost: 5,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'R<0 dazed (save ends)',
							tier2: 'R<1 dazed (save ends)',
							tier3: 'R<2 dazed (save ends)'
						}),
						effect: 'Targets dazed by this ability have a speed of 0 while dazed. If a dazed target takes damage or if someone else spends an action to shake the creature out of their stupor, the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lightbender-2-feature-4',
						name: 'Striking Afterimage',
						type: FactoryLogic.type.createTrigger('The pouncer takes damage from a strike.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The pouncer halves the damage, doesn’t suffer any effect associated with it, and teleports 5 squares. The pouncer makes a free strike if they teleport into a space adjacent to an enemy.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'lightbender-2-feature-5',
					name: 'Avoidance',
					description: 'The pouncer always treats a save ends effect as na EoT effect.'
				})
			]
		})
	],
	addOns: []
};
