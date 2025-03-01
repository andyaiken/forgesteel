import { EncounterLogic } from './encounter-logic';
import { Playbook } from '../models/playbook';

export class PlaybookLogic {
	static isUsed = (playbook: Playbook, monsterID: string) => {
		return playbook.encounters.some(enc => EncounterLogic.getMonsterIDs(enc).includes(monsterID));
	};

	static updatePlaybook = (playbook: Playbook) => {
		playbook.encounters.forEach(e => {
			e.groups.forEach(g => {
				g.slots.forEach(s => {
					if (s.monsters === undefined) {
						s.monsters = [];
					}
				});
			});

			if (e.malice === undefined) {
				e.malice = 0;
			}
		});

		if (playbook.negotiations === undefined) {
			playbook.negotiations = [];
		}

		playbook.negotiations.forEach(n => {
			if (n.impression === undefined) {
				n.impression = 1;
			}

			if (n.state === undefined) {
				n.state = { deltaInterest: 0, deltaPatience: 0 };
			}
		});

		if (playbook.montages === undefined) {
			playbook.montages = [];
		}

		playbook.montages.forEach(m => {
			m.sections.forEach(s => {
				s.challenges.forEach(c => {
					if (c.state === undefined) {
						c.state = { successes: 0, failures: 0 };
					}
				});
			});
		});
	};
}
