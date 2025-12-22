import { Adventure } from '@/models/adventure';
import { EncounterDifficultyLogic } from '@/logic/encounter-difficulty-logic';
import { Plot } from '@/models/plot';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';

export class AdventureLogic {
	static getVictories = (adventure: Adventure, sourcebooks: Sourcebook[]) => {
		return AdventureLogic.getVictoriesForPlot(adventure.plot, adventure.party.count, adventure.party.level, sourcebooks);
	};

	static getVictoriesForPlot = (plot: Plot, heroCount: number, heroLevel: number, sourcebooks: Sourcebook[]) => {
		let victories = 0;

		plot.content
			.filter(pc => pc.contentType === 'reference')
			.forEach(pc => {
				switch (pc.type) {
					case 'adventure': {
						const adventure = SourcebookLogic.getAdventures(sourcebooks).find(a => a.id === pc.contentID);
						if (adventure) {
							victories += AdventureLogic.getVictories(adventure, sourcebooks);
						}
						break;
					}
					case 'encounter': {
						const encounter = SourcebookLogic.getEncounters(sourcebooks).find(e => e.id === pc.contentID);
						if (encounter) {
							const strength = EncounterDifficultyLogic.getStrength(encounter, sourcebooks);
							const difficulty = EncounterDifficultyLogic.getDifficultyForParty(strength, heroCount, heroLevel, 0);
							victories += EncounterDifficultyLogic.getVictories(difficulty);
						}
						break;
					}
					case 'montage': {
						const montage = SourcebookLogic.getMontages(sourcebooks).find(m => m.id === pc.contentID);
						if (montage) {
							victories += EncounterDifficultyLogic.getVictories(montage.difficulty);
						}
						break;
					}
					case 'negotiation': {
						const negotiation = SourcebookLogic.getNegotiations(sourcebooks).find(n => n.id === pc.contentID);
						if (negotiation) {
							victories += 1;
						}
						break;
					}
				}
			});

		plot.plots.forEach(subplot => {
			victories += AdventureLogic.getVictoriesForPlot(subplot, heroCount, heroLevel, sourcebooks);
		});

		return victories;
	};

	static getContentIDs = (plot: Plot) => {
		return AdventureLogic
			.getAllPlotPoints(plot)
			.flatMap(p => p.content)
			.filter(c => c.contentType === 'reference')
			.map(c => c.contentID)
			.filter(id => id !== null);
	};

	static getAllPlotPoints = (plot: Plot | undefined) => {
		const list: Plot[] = [];

		const addPoints = (plot: Plot | undefined) => {
			if (plot) {
				list.push(plot);
				plot.plots.forEach(addPoints);
			}
		};

		addPoints(plot);
		return list;
	};

	static getPlotPoint = (plot: Plot, plotPointID: string) => {
		return AdventureLogic.getAllPlotPoints(plot).find(p => p.id === plotPointID);
	};

	static getPlotPointParent = (plot: Plot, plotPointID: string) => {
		return AdventureLogic.getAllPlotPoints(plot).find(p => p.plots.map(pp => pp.id).includes(plotPointID));
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
			const down = AdventureLogic.getDownstreamPlotPoints(plot, p.id).map(dsp => dsp.id);
			return down.includes(plotPointID);
		});
	};

	static getContentOptions = (session: Session) => {
		const options: { type: string, id: string, name: string }[] = [];

		session.encounters.forEach(e => options.push({ type: 'encounter', id: e.id, name: e.name || 'Unnamed Encounter' }));
		session.montages.forEach(m => options.push({ type: 'montage', id: m.id, name: m.name || 'Unnamed Montage' }));
		session.negotiations.forEach(n => options.push({ type: 'negotiation', id: n.id, name: n.name || 'Unnamed Negotiation' }));
		session.tacticalMaps.forEach(tm => options.push({ type: 'map', id: tm.id, name: tm.name || 'Unnamed Map' }));
		session.counters.forEach(c => options.push({ type: 'counter', id: c.id, name: c.name || 'Unnamed Counter' }));

		return options;
	};
}
