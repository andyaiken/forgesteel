import { AttitudeType } from '@/enums/attitude-type';
import { EncounterDifficulty } from '@/enums/encounter-difficulty';
import { EncounterObjectiveData } from '@/data/encounter-objective-data';
import { MonsterUpdateLogic } from '@/logic/update/monster-update-logic';
import { Session } from '@/models/session';

export class SessionUpdateLogic {
	static updateSession = (session: Session) => {
		session.encounters.forEach(e => {
			e.groups.forEach(g => {
				if (g.name === undefined) {
					g.name = '';
				}

				if (g.encounterState === undefined) {
					g.encounterState = 'ready';
				}

				g.slots.forEach(s => {
					if (s.customization === undefined) {
						s.customization = {
							addOnIDs: [],
							itemIDs: [],
							levelAdjustment: 0,
							convertToSolo: false
						};
					}

					if (s.customization.itemIDs === undefined) {
						s.customization.itemIDs = [];
					}

					if (s.customization.levelAdjustment === undefined) {
						s.customization.levelAdjustment = 0;
					}

					if (s.customization.convertToSolo === undefined) {
						s.customization.convertToSolo = false;
					}

					if (s.monsters === undefined) {
						s.monsters = [];
					}

					if (s.state === undefined) {
						s.state = {
							staminaDamage: 0,
							staminaTemp: 0,
							recoveriesUsed: 0,
							conditions: [],
							reactionUsed: false,
							hidden: false,
							defeated: false,
							captainID: undefined
						};
					}

					s.monsters.forEach(MonsterUpdateLogic.updateMonster);
				});

				if (e.heroes === undefined) {
					e.heroes = [];
				}

				e.heroes.forEach(h => {
					if (h.state.controlledSlots === undefined) {
						h.state.controlledSlots = [];
					}
				});
			});

			if (e.terrain === undefined) {
				e.terrain = [];
			}

			e.terrain.forEach(slot => {
				if (slot.terrain === undefined) {
					slot.terrain = [];
				}

				slot.terrain.forEach(t => {
					if (t.state === undefined) {
						t.state = {
							squares: 1,
							staminaDamage: 0
						};
					}
				});
			});

			if (e.objective === undefined) {
				e.objective = EncounterObjectiveData.diminishNumbers;
			}

			if (e.notes === undefined) {
				e.notes = [];
			}

			if (e.round === undefined) {
				e.round = 1;
			}

			if (e.malice === undefined) {
				e.malice = 0;
			}

			if (e.additionalTurnsTaken === undefined) {
				e.additionalTurnsTaken = [];
			}

			if (e.hiddenMaliceFeatures === undefined) {
				e.hiddenMaliceFeatures = [];
			}
		});

		if (session.montages === undefined) {
			session.montages = [];
		}

		session.montages.forEach(m => {
			if (m.difficulty === undefined) {
				m.difficulty = EncounterDifficulty.Standard;
			}
		});

		if (session.negotiations === undefined) {
			session.negotiations = [];
		}

		session.negotiations.forEach(n => {
			if (n.attitude === undefined) {
				n.attitude = AttitudeType.Open;
			}

			if (n.impression === undefined) {
				n.impression = 1;
			}

			if (n.languages === undefined) {
				n.languages = [];
			}

			if (n.outcomes === undefined) {
				n.outcomes = [ '', '', '', '', '', '' ];
			}
		});

		if (session.tacticalMaps === undefined) {
			session.tacticalMaps = [];
		}

		session.tacticalMaps.forEach(tm => {
			if (tm.items === undefined) {
				tm.items = [];
			}

			tm.items
				.filter(item => item.type === 'tile')
				.forEach(tile => {
					if (tile.content === undefined) {
						tile.content = { type: 'color', color: 'C8C8C8FF' };
					}
				});
		});
	};
}
