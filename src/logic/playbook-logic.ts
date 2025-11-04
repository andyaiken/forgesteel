import { Adventure } from '@/models/adventure';
import { Counter } from '@/models/counter';
import { Encounter } from '@/models/encounter';
import { EncounterLogic } from '@/logic/encounter-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { Options } from '@/models/options';
import { Playbook } from '@/models/playbook';
import { Plot } from '@/models/plot';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { TacticalMap } from '@/models/tactical-map';
import { Utils } from '@/utils/utils';

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

	static getContentOptions = (session: Playbook) => {
		const options: { type: string, id: string, name: string }[] = [];

		session.encounters.forEach(e => options.push({ type: 'encounter', id: e.id, name: e.name || 'Unnamed Encounter' }));
		session.montages.forEach(m => options.push({ type: 'montage', id: m.id, name: m.name || 'Unnamed Montage' }));
		session.negotiations.forEach(n => options.push({ type: 'negotiation', id: n.id, name: n.name || 'Unnamed Negotiation' }));
		session.tacticalMaps.forEach(tm => options.push({ type: 'map', id: tm.id, name: tm.name || 'Unnamed Map' }));
		session.counters.forEach(c => options.push({ type: 'counter', id: c.id, name: c.name || 'Unnamed Counter' }));

		return options;
	};

	static getAdventurePackage = (adventure: Adventure, playbook: Playbook) => {
		const contentIDs = PlaybookLogic.getAllPlotPoints(adventure.plot)
			.flatMap(p => p.content)
			.filter(c => c.contentType === 'reference')
			.map(c => c.contentID)
			.filter(id => id !== null);

		return {
			adventure: adventure,
			elements: [
				...playbook.encounters.filter(e => contentIDs.includes(e.id)).map(e => ({ type: 'encounter' as const, data: e })),
				...playbook.montages.filter(m => contentIDs.includes(m.id)).map(m => ({ type: 'montage' as const, data: m })),
				...playbook.negotiations.filter(n => contentIDs.includes(n.id)).map(n => ({ type: 'negotiation' as const, data: n })),
				...playbook.tacticalMaps.filter(tm => contentIDs.includes(tm.id)).map(tm => ({ type: 'map' as const, data: tm }))
			]
		};
	};

	static startEncounter = (encounter: Encounter, sourcebooks: Sourcebook[], heroes: Hero[], options: Options) => {
		const copy = Utils.copy(encounter);
		copy.id = Utils.guid();
		copy.round = 0;

		const monsterInfo: { monsterID: string, monster: Monster, name: string, count: number, added: number }[] = [];
		copy.groups
			.flatMap(g => g.slots)
			.forEach(slot => {
				const monster = EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization, sourcebooks);
				const monsterGroup = SourcebookLogic.getMonsterGroup(sourcebooks, slot.monsterID);
				if (monster && monsterGroup) {
					const count = slot.count * MonsterLogic.getRoleMultiplier(monster.role.organization, options);
					const current = monsterInfo.find(info => info.monsterID === slot.monsterID);
					if (current) {
						current.count += count;
					} else {
						monsterInfo.push({
							monsterID: slot.monsterID,
							monster: monster,
							name: MonsterLogic.getMonsterName(monster, monsterGroup),
							count: count,
							added: 0
						});
					}
				}
			});

		copy.groups
			.flatMap(g => g.slots)
			.forEach(slot => {
				const info = monsterInfo.find(info => info.monsterID === slot.monsterID);
				if (info) {
					const count = slot.count * MonsterLogic.getRoleMultiplier(info.monster.role.organization, options);
					for (let n = 1; n <= count; ++n) {
						const monsterCopy = Utils.copy(info.monster);
						monsterCopy.id = Utils.guid();
						monsterCopy.name = info.count === 1 ? info.name : `${info.name} ${info.added + 1}`;
						slot.monsters.push(monsterCopy);
						info.added += 1;
					}
				}
			});

		copy.groups.forEach(g => {
			const minions = g.slots.filter(s => {
				const info = monsterInfo.find(info => info.monsterID === s.monsterID);
				return info && (info.monster.role.organization === MonsterOrganizationType.Minion);
			});
			const nonMinions = g.slots.filter(s => {
				const info = monsterInfo.find(info => info.monsterID === s.monsterID);
				return info && (info.monster.role.organization !== MonsterOrganizationType.Minion);
			});
			if ((minions.length > 0) && (nonMinions.length > 0)) {
				minions.forEach(s => s.state.captainID = nonMinions[0].monsters[0].id);
			}
		});

		if (options.party !== '') {
			heroes
				.filter(h => h.folder === options.party)
				.forEach(h => {
					h.state.controlledSlots = [];
					HeroLogic.getCompanions(h).forEach(monster => {
						if (!h.state.controlledSlots.some(slot => slot.monsters.some(m => m.name === monster.name))) {
							h.state.controlledSlots.push(FactoryLogic.createEncounterSlotFromMonster(monster));
						}
					});
					copy.heroes.push(h);
				});
		}

		copy.terrain.forEach(slot => {
			const terrain = SourcebookLogic.getTerrains(sourcebooks).find(t => t.id === slot.terrainID);
			if (terrain) {
				const name = terrain.name || 'Unnamed Terrain';
				const count = slot.count;
				for (let n = 1; n <= count; ++n) {
					const terrainCopy = Utils.copy(terrain);
					terrainCopy.id = Utils.guid();
					terrainCopy.name = name;
					slot.terrain.push(terrainCopy);
				}
			}
		});

		return copy;
	};

	static startMontage = (montage: Montage) => {
		const copy = Utils.copy(montage);
		copy.id = Utils.guid();

		return copy;
	};

	static startNegotiation = (negotiation: Negotiation) => {
		const copy = Utils.copy(negotiation);
		copy.id = Utils.guid();

		return copy;
	};

	static startMap = (map: TacticalMap) => {
		const copy = Utils.copy(map);
		copy.id = Utils.guid();

		return copy;
	};

	static startCounter = (counter: Counter) => {
		const copy = Utils.copy(counter);
		copy.id = Utils.guid();

		return copy;
	};
}
