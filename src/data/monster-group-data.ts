import { Collections } from '../utils/collections';
import { MonsterGroup } from '../models/monster';
import { Sourcebook } from '../models/sourcebook';

export class MonsterGroupData {
	static demons: MonsterGroup = {
		id: 'monster-group-demons',
		name: 'Demons',
		description: '',
		information: [],
		malice: [],
		monsters: []
	};

	static goblins: MonsterGroup = {
		id: 'monster-group-goblins',
		name: 'Goblins',
		description: '',
		information: [],
		malice: [],
		monsters: []
	};

	static humans: MonsterGroup = {
		id: 'monster-group-humans',
		name: 'Humans',
		description: '',
		information: [],
		malice: [],
		monsters: []
	};

	static radenwights: MonsterGroup = {
		id: 'monster-group-radenwights',
		name: 'Radenwights',
		description: '',
		information: [],
		malice: [],
		monsters: []
	};

	static timeRaiders: MonsterGroup = {
		id: 'monster-group-time-raiders',
		name: 'Time Raiders',
		description: '',
		information: [],
		malice: [],
		monsters: []
	};

	static warDogs: MonsterGroup = {
		id: 'monster-group-war-dogs',
		name: 'War Dogs',
		description: '',
		information: [],
		malice: [],
		monsters: []
	};

	static getMonsterGroups = (sourcebooks: Sourcebook[]) => {
		const list: MonsterGroup[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.monsterGroups);
		});

		return Collections.sort(list, item => item.name);
	};
}
