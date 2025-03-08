import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';

export const chimera: MonsterGroup = {
	id: 'monster-group-chimera',
	name: 'Chimera',
	description: 'Massive flexing claws. Lashing draconic tail. Nimble leathery wings. And not one, but three menacing heads: a snarling lion, a helix-horned ram, and a dragon with fire sparking in its throat. Many see the chimera as an aggressor, but few know its origins as a divine guardian.',
	information: [
		{
			id: 'chimera-info-1',
			name: 'The First Chimera',
			description: `
The first chimera was a gift. A deity gave a devout queen this young guardian - one with the cunning of a dragon, the bravery of a lion, and the tenacity of a ram. The queen raised the chimera to be a strong protector of not just her person, but of her people, who loved the chimera and their ruler. But neighboring lands feared the beast. As a conquering force swept into the land, their first defilement of peace was slaughtering the chimera.

The queen’s resulting fury was said to be felt by the gods. As she screamed, a nearby volcano erupted, spewing basalt and chimeras over the land. With fiery might, the chimeras overtook the opposing army and dispersed. Each found a new territory and claimed the role of divine protector over that place, its inhabitants, and its treasures.`
		},
		{
			id: 'chimera-info-2',
			name: 'Tactical Warriors',
			description: 'Chimeras have many ways to keep themselves and their charges from being cornered. The lion head snaps up enemies in massive jaws and hurls them away, the ram head pummels them to the ground, and the dragon head bathes them in fire. The sound of the three heads crying together can shake even the most stalwart warriors.'
		},
		{
			id: 'chimera-info-3',
			name: 'One Being, Three Heads',
			description: 'Unlike many other multiheaded creatures, a chimera has a single mind. Their heads work together, never snapping at one another over food, favors, or personality conflicts. The heads often express the chimera’s emotions in unison, braying together in times of battle or purring all at once to show affection.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'chimera-malice-1',
			name: 'Defensive Snapping',
			cost: 3,
			sections: [
				'The chimera takes up a defensive stance. Until the start of their next turn, the chimera can make a free strike against each enemy that comes within 2 of them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'chimera-malice-2',
			name: 'Unstable Terrain',
			cost: 5,
			sections: [
				'The chimera shakes the crowd, causing loose rocks or debris to appear. Create three size 1L stone objects anywhere on the battlefield. Each creature adjacent to one of the objects when it appears takes A<2 5 damage.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'chimera-malice-3',
			name: 'Ashen Clouds',
			cost: 7,
			sections: [
				'Until the beginning of the chimera’s next turn, the entire battle map is concealed by a thick cloud of ash. The chimera ignores concealment. Each enemy R<1 can’t establish line of eﬀect beyond 3 squares until the cloud dissipates. The potency of this feature increases by 1 each time it’s used.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'chimera-1',
			name: 'Chimera',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Beast', 'Chimera' ],
			encounterValue: 50,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10, 'fly'),
			stamina: 300,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 2, -2, 1, 0),
			features: [
				FactoryLogic.feature.createSoloMonster({
					id: 'chimera-feature-1',
					name: 'the chimera'
				}),
				FactoryLogic.feature.create({
					id: 'chimera-feature-2',
					name: 'Volant',
					description: 'When the chimera makes a creature winded or reduces them to 0 Stamina or less, the chimera can move their speed towards one enemy within line of eﬀect.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-3',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage',
							tier3: '16 damage'
						}),
						effect: 'This attack deals an additional 3 damage if the chimera has an edge on the attack.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-4',
						name: 'Dragon\'s Eruption',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'All enemies in the cube',
						cost: 7,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 fire damage; A<1 3 fire damage',
							tier2: '5 fire damage; A<2 5 fire damage',
							tier3: '7 fire damage; A<3 7 fire damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-5',
						name: 'Lion\'s Toss',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: 'vertical push 2',
							tier2: 'vertical push 3',
							tier3: 'vertical push 5'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-6',
						name: 'Roar',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies in the burst',
						cost: 5,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '4 psychic damage',
							tier2: '8 psychic damage; I<2 frightened (save ends)',
							tier3: '10 psychic damage; I<3 frightened (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-7',
						name: 'Ram\'s Defiance',
						type: FactoryLogic.type.createTrigger('The target attacks the chimera and gets a tier 1 result.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 creature',
						preEffect: 'The chimera shifts 5. If they end this movement adjacent to the target, roll power.',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 damage; M<1 slowed (save ends)',
							tier2: '8 damage; prone; M<2 slowed (save ends)',
							tier3: '10 damage; prone; M<3 slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-8',
						name: 'Overture of Destruction',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies in the burst',
						effect: 'The chimera uses Bite and Lion’s Toss against each target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-9',
						name: 'Fire Solo',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The chimera uses Dragon’s Eruption and Roar without spending malice.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'chimera-feature-10',
						name: 'Chorus of Destruction',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The chimera uses Roar. The chimera then shifts their speed and can make a free strike against each enemy who comes within 1 of them during the move. When the chimera ends this movement, they use Dragon’s Eruption.'
					})
				})
			]
		})
	],
	addOns: []
};
