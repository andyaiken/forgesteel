import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const hobgoblin: MonsterGroup = {
	id: 'monster-group-hobgoblin',
	name: 'Hobgoblin',
	description: `
Also known as demogoblins, hobgoblins descend from ancient goblins who made a pact with an infernal power in exchange for increased size and strength. Each hobgoblin has fang-like tusks, and one or more horns protrude from their head.

Like other humanoids, hobgoblins have no special inclination toward conquest, battle, or cruelty, and they can be found in all walks of life. But when the wicked among them fall on desperate times, some use their talents for the violence and subjugation of others.`,
	information: [
		{
			id: 'hobgoblin-info-1',
			name: 'Synergized Tactics',
			description: 'Hobgoblin magic and talents complement one another in a fight. Wise commanders put these strategies to good use and scout the battlefield before combat to gain every advantage. Thanks to their emphasis on tactics, hobgoblin armies are often second to none.'
		},
		{
			id: 'hobgoblin-info-2',
			name: 'Playing With Fire',
			description: 'The infernal heritage of hobgoblins allows them to live in extreme heat that many other humanoids can’t tolerate. Hobgoblins often settle in deserts, tropics, and other hot areas. Their heritage also allows them to bend fire to their will, and many choose professions that make use of fire, such as smithing or glassblowing.'
		},
		{
			id: 'hobgoblin-info-3',
			name: 'Innate Magic',
			description: 'Infernal magic runs through the veins of every hobgoblin, though their gifts vary. Many can harness the power of fire or corruptive energy, while others can turn allies invisible or run like Hell.'
		},
		{
			id: 'hobgoblin-info-4',
			name: 'Binding Bargains',
			description: 'Many hobgoblins still hold to the infernal concept of being true to their word when entering into agreements. Even spoken contracts are considered unbreakable, and hobgoblin communities scorn any creature—hobgoblin or otherwise—who degrades themself by breaking their word.'
		},
		{
			id: 'hobgoblin-info-5',
			name: 'Grilp',
			description: 'The grilp—a green-skinned devil about the size of a housecat—can change the color and texture of their skin to blend in with their surroundings. They often serve as scouts, spies, messengers, and errand-runners for high-ranking hobgoblins. Beyond these covert skills, however, hobgoblins value grilps most highly for their magic-laced saliva, which weakens the defenses of other creatures.'
		},
		{
			id: 'hobgoblin-info-6',
			name: 'Slaughter Demon',
			description: `
When evil hobgoblins who embrace their fiendish heritage need to wipe an enemy off the map, their war mages ritualistically beseech an archdevil for the service of a grack’tanar, known as a slaughter demon in the Common tongue. Once summoned, this towering, serpent-bodied, six-clawed demon slithers to war alongside the hobgoblins who summoned them.

Devils captured the grack’tanars eons ago. Broken, these demons wait for a call to war, hungry and frothing in the Seven Cities of Hell. Their archdevil captors reward loyal hobgoblins by allowing the mortals to hold a grack’tanar’s reins for a time. These slaughter demons are eager to kill and please their captors so they might be sent out again, and they rarely turn on hobgoblins unless they fall into lethe.`
		},
		{
			id: 'hobgoblin-info-7',
			name: 'Hobgoblin Languages',
			description: 'Most hobgoblins speak Caelian, Anjali and Szetch.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'hobgoblin-malice-0',
			name: 'Goblin Malice Features',
			cost: 1,
			repeatable: true,
			sections: [
				'The hobgoblin activates a malice feature available to goblins.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'hobgoblin-malice-1',
			name: 'Operation Goblin Mode',
			cost: 3,
			sections: [
				'Each goblin in the encounter gains a +3 bonus to speed until the end of the round.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'hobgoblin-malice-2',
			name: 'Operation Tactical Swarm',
			cost: 5,
			sections: [
				'All hobgoblins shift up to their speed and take the Defend action.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'hobgoblin-malice-3',
			name: 'Operation Earthsear',
			cost: 7,
			sections: [
				'The ground throughout the encounter map becomes blazing hot until the end of the round. An enemy takes 1 fire damage for each affected square they enter. An enemy that ends their turn in an affected square has fire weakness 2 until the start of their next turn.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'hobgoblin-1',
			name: 'Chimera',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.NoRole, MonsterOrganizationType.Solo),
			keywords: [ 'Beast', 'Chimera' ],
			encounterValue: 50,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10, 'fly'),
			stamina: 300,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 2, -2, 1, 0),
			features: [
				FactoryLogic.feature.create({
					id: 'hobgoblin-feature-2',
					name: 'Volant',
					description: 'When the hobgoblin makes a creature winded or reduces them to 0 Stamina or less, the hobgoblin can move their speed towards one enemy within line of eﬀect.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-feature-3',
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
						effect: 'This attack deals an additional 3 damage if the hobgoblin has an edge on the attack.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-feature-4',
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
						id: 'hobgoblin-feature-5',
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
						id: 'hobgoblin-feature-6',
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
						id: 'hobgoblin-feature-7',
						name: 'Ram\'s Defiance',
						type: FactoryLogic.type.createTrigger('The target attacks the hobgoblin and gets a tier 1 result.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 creature',
						preEffect: 'The hobgoblin shifts 5. If they end this movement adjacent to the target, roll power.',
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
						id: 'hobgoblin-feature-8',
						name: 'Overture of Destruction',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies in the burst',
						effect: 'The hobgoblin uses Bite and Lion’s Toss against each target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-feature-9',
						name: 'Fire Solo',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The hobgoblin uses Dragon’s Eruption and Roar without spending malice.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-feature-10',
						name: 'Chorus of Destruction',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The hobgoblin uses Roar. The hobgoblin then shifts their speed and can make a free strike against each enemy who comes within 1 of them during the move. When the hobgoblin ends this movement, they use Dragon’s Eruption.'
					})
				})
			]
		})
	]
};
