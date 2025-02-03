import { Playbook, PlaybookElementKind, PlaybookElementsKey } from '../models/playbook';
import { EncounterLogic } from './encounter-logic';

export class PlaybookLogic {
	static getPlaybookKey = (kind: PlaybookElementKind): PlaybookElementsKey => {
		switch (kind) {
			case 'encounter': return 'encounters';
			case 'negotiation': return 'negotiations';
		}
	};

	static isUsed = (playbook: Playbook, monsterID: string) => {
		return playbook.encounters.some(enc => EncounterLogic.getMonsterIDs(enc).includes(monsterID));
	};
}
