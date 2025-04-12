import { Encounter } from '../models/encounter';
import { EncounterObjectiveData } from './encounter-objective-data';
import { MonsterData } from './monster-data';
import { TerrainData } from './terrain-data';

export class EncounterData {
	static goblinAmbush: Encounter = {
		id: 'encounter-goblin-ambush',
		name: 'Goblin Ambush',
		description: 'An unexpected goblin attack.',
		groups: [
			{
				id: 'group-1',
				slots: [
					{
						id: 'group-1-slot-1',
						monsterID: MonsterData.goblin.monsters.find(m => m.name === 'Goblin Assassin')!.id,
						monsterGroupID: MonsterData.goblin.id,
						count: 2,
						customization: {
							addOnIDs: []
						},
						monsters: [],
						state: {
							staminaDamage: 0,
							staminaTemp: 0,
							conditions: [],
							reactionUsed: false,
							hidden: false,
							defeated: false,
							captainID: undefined
						}
					}
				],
				acted: false
			},
			{
				id: 'group-2',
				slots: [
					{
						id: 'group-2-slot-1',
						monsterID: MonsterData.goblin.monsters.find(m => m.name === 'Goblin Sniper')!.id,
						monsterGroupID: MonsterData.goblin.id,
						count: 1,
						customization: {
							addOnIDs: []
						},
						monsters: [],
						state: {
							staminaDamage: 0,
							staminaTemp: 0,
							conditions: [],
							reactionUsed: false,
							hidden: false,
							defeated: false,
							captainID: undefined
						}
					}
				],
				acted: false
			},
			{
				id: 'group-3',
				slots: [
					{
						id: 'group-3-slot-1',
						monsterID: MonsterData.goblin.monsters.find(m => m.name === 'Goblin Spinecleaver')!.id,
						monsterGroupID: MonsterData.goblin.id,
						count: 1,
						customization: {
							addOnIDs: []
						},
						monsters: [],
						state: {
							staminaDamage: 0,
							staminaTemp: 0,
							conditions: [],
							reactionUsed: false,
							hidden: false,
							defeated: false,
							captainID: undefined
						}
					}
				],
				acted: false
			},
			{
				id: 'group-4',
				slots: [
					{
						id: 'group-4-slot-1',
						monsterID: MonsterData.goblin.monsters.find(m => m.name === 'Goblin Underboss')!.id,
						monsterGroupID: MonsterData.goblin.id,
						count: 1,
						customization: {
							addOnIDs: []
						},
						monsters: [],
						state: {
							staminaDamage: 0,
							staminaTemp: 0,
							conditions: [],
							reactionUsed: false,
							hidden: false,
							defeated: false,
							captainID: undefined
						}
					}
				],
				acted: false
			}
		],
		terrain: [
			{
				id: 'terrain-hidey-hole',
				terrainID: TerrainData.hideyHole.id,
				upgradeIDs: [],
				count: 2,
				terrain: []
			},
			{
				id: 'terrain-snare-trap',
				terrainID: TerrainData.snareTrap.id,
				upgradeIDs: [],
				count: 2,
				terrain: []
			}
		],
		heroes: [],
		objective: EncounterObjectiveData.diminishNumbers,
		round: 1,
		malice: 0
	};

	static dragonAttack: Encounter = {
		id: 'encounter-dragon-attack',
		name: 'Dragon Attack',
		description: 'Survive a dragon.',
		groups: [
			{
				id: 'group-1',
				slots: [
					{
						id: 'group-1-slot-1',
						monsterID: MonsterData.dragonThorn.monsters[0].id,
						monsterGroupID: MonsterData.dragonThorn.id,
						count: 1,
						customization: {
							addOnIDs: []
						},
						monsters: [],
						state: {
							staminaDamage: 0,
							staminaTemp: 0,
							conditions: [],
							reactionUsed: false,
							hidden: false,
							defeated: false,
							captainID: undefined
						}
					}
				],
				acted: false
			}
		],
		terrain: [],
		heroes: [],
		objective: EncounterObjectiveData.holdThemOff,
		round: 1,
		malice: 0
	};
}