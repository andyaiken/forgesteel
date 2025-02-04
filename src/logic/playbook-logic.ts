import { EncounterLogic } from './encounter-logic';
import { Playbook } from '../models/playbook';

export class PlaybookLogic {
	static isUsed = (playbook: Playbook, monsterID: string) => {
		return playbook.encounters.some(enc => EncounterLogic.getMonsterIDs(enc).includes(monsterID));
	};
}
