import { EncounterLogic } from './encounter-logic';
import { Playbook } from '../models/playbook';
import { Plot } from '../models/plot';

export class PlaybookLogic {
	static getUsedIn = (playbook: Playbook, elementID: string) => {
		return [
			...playbook.encounters.filter(enc => EncounterLogic.getMonsterData(enc).map(data => data.monsterID).includes(elementID)),
			...playbook.adventures.filter(adv => PlaybookLogic.getContentIDs(adv.plot).includes(elementID))
		];
	};

	static getContentIDs = (plot: Plot) => {
		return PlaybookLogic
			.getAllPlotPoints(plot)
			.flatMap(p => p.content)
			.map(c => c.contentID)
			.filter(id => id !== null);
	};

	static getAllPlotPoints = (plot: Plot) => {
		const list: Plot[] = [];

		const addPoints = (plot: Plot) => {
			list.push(plot);
			plot.plots.forEach(addPoints);
		};

		addPoints(plot);
		return list;
	};

	static getPlotPoint = (plot: Plot, plotPointID: string) => {
		return PlaybookLogic.getAllPlotPoints(plot).find(p => p.id === plotPointID);
	};

	static getPlotPointParent = (plot: Plot, plotPointID: string) => {
		return PlaybookLogic.getAllPlotPoints(plot).find(p => p.plots.map(pp => pp.id).includes(plotPointID));
	};

	static getDownstreamPlotPoints = (plot: Plot, plotPointID: string) => {
		const downstream: Plot[] = [];

		const traverse = (id: string) => {
			const p = plot.plots.find(p => p.id === id);
			if (p) {
				if (!downstream.some(x => x.id === p.id)) {
					downstream.push(p);
				}
				p.links.forEach(l => traverse(l.plotID));
			}
		};

		traverse(plotPointID);

		return downstream;
	};

	static getUpstreamPlotPoints = (plot: Plot, plotPointID: string) => {
		return plot.plots.filter(p => {
			const down = PlaybookLogic.getDownstreamPlotPoints(plot, p.id).map(dsp => dsp.id);
			return down.includes(plotPointID);
		});
	};

	static updatePlaybook = (playbook: Playbook) => {
		if (playbook.adventures === undefined) {
			playbook.adventures = [];
		}

		playbook.encounters.forEach(e => {
			e.groups.forEach(g => {
				g.slots.forEach(s => {
					if (s.customization === undefined) {
						s.customization = {
							addOnIDs: []
						};
					}

					if (s.monsters === undefined) {
						s.monsters = [];
					}
				});
			});

			if (e.malice === undefined) {
				e.malice = 0;
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

	};
}
