import { EncounterObjectiveData } from '../../data/encounter-objective-data';
import { FactoryLogic } from '../factory-logic';
import { MonsterUpdateLogic } from './monster-update-logic';
import { Playbook } from '../../models/playbook';
import { PlotContentReference } from '../../models/plot';

export class PlaybookUpdateLogic {
	static updatePlaybook = (playbook: Playbook) => {
		if (playbook.adventures === undefined) {
			playbook.adventures = [];
		}

		playbook.adventures.forEach(a => {
			if (a.plot === undefined) {
				a.plot = FactoryLogic.createAdventurePlot('');
			}

			if (a.plot.plots === undefined) {
				a.plot.plots = [];
			}

			a.plot.plots.flatMap(p => p.content).forEach(c => {
				if (c.contentType === undefined) {
					(c as PlotContentReference).contentType = 'reference';
				}
			});
		});

		playbook.encounters.forEach(e => {
			e.groups.forEach(g => {
				if (g.encounterState === undefined) {
					g.encounterState = 'ready';
				}

				g.slots.forEach(s => {
					if (s.customization === undefined) {
						s.customization = {
							addOnIDs: [],
							itemIDs: [],
							convertToSolo: false
						};
					}

					if (s.customization.itemIDs === undefined) {
						s.customization.itemIDs = [];
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
		});

		if (playbook.montages === undefined) {
			playbook.montages = [];
		}

		if (playbook.negotiations === undefined) {
			playbook.negotiations = [];
		}

		playbook.negotiations.forEach(n => {
			if (n.impression === undefined) {
				n.impression = 1;
			}

			if (n.outcomes === undefined) {
				n.outcomes = [ '', '', '', '', '', '' ];
			}
		});

		if (playbook.tacticalMaps === undefined) {
			playbook.tacticalMaps = [];
		}

		playbook.tacticalMaps.forEach(tm => {
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

		if (playbook.counters === undefined) {
			playbook.counters = [];
		}

		if (playbook.playerViewID === undefined) {
			playbook.playerViewID = null;
		}
	};
}
