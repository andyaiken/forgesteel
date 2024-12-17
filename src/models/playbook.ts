import { Encounter } from './encounter';
import { MonsterGroup } from './monster';

export interface Playbook {
	monsterGroups: MonsterGroup[];
	encounters: Encounter[];
}
