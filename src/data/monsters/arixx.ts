import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const arixx: MonsterGroup = {
	id: 'monster-group-arixx',
	name: 'Arixx',
	description: `Pebbles dance as the ground quivers. A spray of rock and earth shatters the afternoon’s peace, and an arixx blooms from the earth. Their mandibles drip sizzling acid as a talon impales their next meal—sometimes a fat sheep, other times a shepherd. 

An arixx is a chitinous burrowing insectoid beast who stands taller than a horse. Their hooked claws and serrated mandibles are fearsome weapons, but even more dangerous is the stream of caustic spittle they use to dissolve their prey.`,
	picture: null,
	information: [
		{
			id: 'arixx-info-1',
			name: 'Pastoral Pest',
			description: 'Although arixxi can be found anywhere, they are a particular plague in settled lands. An arixx hunts alone, lurking a few feet below roadways and pastures. When their sensitive antennae detect movement above, they burst from the earth, dragging living prey into their tunnels to be devoured. These hit-and-run tactics make the arixx virtually impossible to eradicate—unless they have the bad luck to ambush a party of well-armed adventurers. Many communities pay a handsome bounty for a slain arixx.'
		},
		{
			id: 'arixx-info-2',
			name: 'Terror of the Thaw',
			description: 'Arixxi are a year-round menace in the warmest lands. In temperate places, arixxi hibernate during the winter, granting farmers a season of peace. But this respite is paid for on the first thaw of spring, when every arixx awakens ravenous on the same day and bursts from the ground to feed.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'arixx-malice-1',
			name: 'Burning Maw',
			cost: 3,
			sections: [
				'The arixx dribbles acid over their mandibles, causing the next strike they make to gain an edge and deal an extra 3 acid damage.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'arixx-malice-2',
			name: 'Geyser',
			cost: 5,
			sections: [
				'The arixx’s underground tunnels swell with pressure, causing a sudden influx of hot gas to burst from a 3-square-by-3-square area anywhere on the surface. Each enemy in the area makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '4 damage; vertical push 5',
					tier2: '4 damage; vertical push 2',
					tier3: 'The target shifts to the nearest unoccupied space outside the area.'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'arixx-malice-3',
			name: 'Solo Action',
			cost: 5,
			sections: [
				'The arixx takes an additional main action on their turn. They can use this feature even if they are dazed.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'arixx-malice-4',
			name: 'Earth Sink',
			cost: 10,
			sections: [
				'The encounter map suddenly quakes, then begins to sink. Each creature on the ground who has <code>A < 1</code> is knocked prone. Until the end of the encounter, each creature who starts their turn on the ground and can’t burrow must spend 1 additional square of movement to leave their starting position, or 2 squares if they start their turn prone or underground. A creature who starts and ends their turn in the same space on the ground and can’t burrow sinks 1 square into the ground.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'arixx-1',
			name: 'Arixx',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Arixx', 'Beast' ],
			encounterValue: 36,
			speed: FactoryLogic.createSpeed(5, 'burrow'),
			stamina: 200,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(3, 1, -3, 1, -4),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'arixx-1-feature-0',
					name: 'the arixx'
				}),
				FactoryLogic.feature.create({
					id: 'arixx-1-feature-1',
					name: 'Soft Underbelly',
					description: 'A prone creature making a melee strike against the arixx has a double edge on the strike instead of taking a bane.'
				}),
				FactoryLogic.feature.create({
					id: 'arixx-1-feature-2',
					name: 'Earthwalk',
					description: 'Difficult terrain composed of earth or loose rock doesn’t cost the arixx extra movement.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'arixx-1-feature-3',
						name: 'Bite',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage; grabbed',
								tier2: '13 damage; grabbed',
								tier3: '16 damage; grabbed'
							})),
							FactoryLogic.createAbilitySectionText('A size 1 target grabbed this way takes 3 acid damage at the start of each of their turns.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'arixx-1-feature-4',
						name: 'Claw Swing',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 damage; A < 1 grabbed',
								tier2: '8 damage; A < 2 grabbed',
								tier3: '11 damage; A < 3 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('The arixx can vertically slide each grabbed target up to 3 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'arixx-1-feature-5',
						name: 'Spitfire',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 acid damage',
								tier2: '6 acid damage',
								tier3: '7 acid damage'
							})),
							FactoryLogic.createAbilitySectionText('The ground beneath each target is covered in burning acid until the end of the encounter. Any enemy who enters an affected space for the first time in a round or starts their turn there takes 2 acid damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'arixx-1-feature-6',
						name: 'Dirt Devil',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 damage',
								tier2: '6 damage; push 2',
								tier3: '7 damage; push 4'
							})),
							FactoryLogic.createAbilitySectionText('The arixx flings rocks and debris to fill the area, and has a double edge on the power roll if they started their turn underground. The area is difficult terrain.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'arixx-1-feature-7',
						name: 'Dust Cloud',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The arixx kicks up dust to fill the area until the start of their next turn, then moves up to their speed. Any enemy in the area or who targets a creature in the area takes a bane on power rolls.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'arixx-1-feature-8',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('The arixx takes damage.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect**: The arixx halves the damage and shifts up to 3 squares after the triggering effect resolves.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'arixx-1-feature-9',
						name: 'Acid Spew',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 2, value2: 10, within: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 acid damage',
								tier2: '8 acid damage',
								tier3: '11 acid damage'
							})),
							FactoryLogic.createAbilitySectionText('The ground in the area is covered in a puddle of acid until the end of the encounter. Any enemy who enters the area for the first time in a round or starts their turn there takes 2 acid damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'arixx-1-feature-10',
						name: 'Sinkhole',
						type: FactoryLogic.type.createVillainAction(2),
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 }) ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The arixx shifts up to their speed. If they end this shift above ground and within 2 squares of a creature, they use Bite against the creature and can then use the Dig maneuver.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'arixx-1-feature-11',
						name: 'Acid and Claws',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 acid damage; M < 1 bleeding (save ends)',
								tier2: '8 acid damage; M < 2 bleeding (save ends)',
								tier3: '11 acid damage; M < 3 bleeding (save ends)'
							}))
						]
					})
				})
			]
		})
	],
	addOns: []
};
