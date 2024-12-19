import { EncounterLogic } from './encounter-logic';
import { Playbook } from '../models/playbook';

export class PlaybookLogic {
	static getMonster = (playbook: Playbook, monsterID: string) => {
		const monsters = playbook.monsterGroups.flatMap(mg => mg.monsters);
		return monsters.find(m => m.id === monsterID) || null;
	};

	static getMonsterGroup = (playbook: Playbook, monsterID: string) => {
		return playbook.monsterGroups.find(mg => {
			const ids = mg.monsters.map(m => m.id);
			return ids.includes(monsterID);
		}) || null;
	};

	static isUsed = (playbook: Playbook, monsterID: string) => {
		return playbook.encounters.some(enc => EncounterLogic.getMonsterIDs(enc).includes(monsterID));
	};
}
