import { useDataManager, useHeroes, useOptions, useSourcebooks } from '@/contexts/data-context';
import { Element } from '@/models/element';
import { EncounterLogic } from '@/logic/encounter-logic';
import { EncounterSlot } from '@/models/encounter';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroUpdateLogic } from '@/logic/update/hero-update-logic';
import { MinionSlotModal } from '@/components/modals/minion-slot/minion-slot-modal';
import { Monster } from '@/models/monster';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { ReactNode } from 'react';
import { SharedElementKind } from '@/logic/sharing-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { Utils } from '@/utils/utils';
import { notification } from 'antd';
import { useNavigation } from '@/hooks/use-navigation';

interface Props {
	notify: ReturnType<typeof notification.useNotification>[0];
	setDrawer: (drawer: ReactNode) => void;
	setSpinning: (spinning: boolean) => void;
	persistHero: (hero: Hero) => Promise<void>;
	exportLibraryElementData: (category: string, element: Element) => void;
	copyLibraryElementCode: (kind: SharedElementKind, element: Element) => Promise<void>;
}

export const useHeroActions = (props: Props) => {
	const { notify, setDrawer, setSpinning, persistHero, exportLibraryElementData, copyLibraryElementCode } = props;
	const navigation = useNavigation();
	const options = useOptions();
	const heroes = useHeroes();
	const sourcebooks = useSourcebooks();
	const dataManager = useDataManager();

	const newHero = (folder: string) => {
		const hero = FactoryLogic.createHero();

		hero.folder = folder;
		hero.sourcebookIDs = sourcebooks
			.filter(sb => sb.type === SourcebookType.Official)
			.map(sb => sb.id);

		setDrawer(null);
		persistHero(hero).then(() => navigation.goToHeroEdit(hero.id, 'start'));
	};

	const deleteHero = (hero: Hero) => {
		const stayInFolder = heroes.some(h => h.id !== hero.id && h.folder === hero.folder);
		navigation.goToHeroList(stayInFolder ? hero.folder : undefined);

		return dataManager.deleteHero(hero)
			.then(() => {
				navigation.goToHeroList(stayInFolder ? hero.folder : undefined);
			})
			.catch(err => {
				console.error(err);
				notify.error({
					title: 'Error deleting hero',
					description: Utils.getErrorMessage(err),
					placement: 'top'
				});
			});
	};

	const saveHero = (hero: Hero) => {
		persistHero(hero).then(() => navigation.goToHeroView(hero.id));
	};

	const importHero = (hero: Hero, folder: string, createCopy: boolean = false) => {
		if (createCopy) {
			hero = Utils.copy(hero);
			hero.name = `Copy of ${hero.name}`;
		}
		if (heroes.some(h => h.id === hero.id)) {
			hero.id = Utils.guid();
		}
		hero.folder = folder;
		HeroUpdateLogic.updateHero(hero, sourcebooks);

		setDrawer(null);
		persistHero(hero).then(() => navigation.goToHeroView(hero.id));

		return hero;
	};

	// Imports several heroes at once - from a multi-file import, say - and stays on the hero list,
	// rather than opening each of them in turn; a single hero is opened, just as importHero does
	const importHeroes = (list: Hero[], folder: string) => {
		if (list.length === 1) {
			importHero(list[0], folder);
			return;
		}

		// Two of the files might be the same hero, as well as one of them being a hero we already have
		const ids = heroes.map(h => h.id);
		list.forEach(hero => {
			if (ids.includes(hero.id)) {
				hero.id = Utils.guid();
			}
			ids.push(hero.id);
			hero.folder = folder;
			HeroUpdateLogic.updateHero(hero, sourcebooks);

			persistHero(hero);
		});

		setDrawer(null);
		notify.info({
			title: 'Heroes Imported',
			description: `${list.length} heroes have been imported.`,
			placement: 'top'
		});
	};

	const copyHero = (hero: Hero) => {
		importHero(hero, hero.folder, true);
	};

	const exportHeroData = (hero: Hero) => {
		Utils.exportData(hero.name || 'Unnamed Hero', hero, 'hero');
	};

	const exportHeroImage = (hero: Hero) => {
		const pageIds: string[] = [];
		document.querySelectorAll(`[id^=hero-sheet-${hero.id}-page]`).forEach(elem => pageIds.push(elem.id));

		Utils.exportImage(pageIds, hero.name || 'Unnamed Hero');
	};

	const exportHeroPdf = (hero: Hero, resolution: 'standard' | 'high') => {
		setSpinning(true);
		Utils.wait(500).then(() => {
			const name = hero.name || 'Unnamed Hero';

			const pageIds: string[] = [];
			document.querySelectorAll(`[id^=hero-sheet-${hero.id}-page]`).forEach(elem => pageIds.push(elem.id));

			Utils.elementsToPdf(pageIds, name, options.classicSheetPageSize, resolution)
				.then(() => setSpinning(false));
		});
	};

	const exportStandardAbilities = () => {
		setSpinning(true);
		Utils.wait(500).then(() => {
			const pageIds: string[] = [];
			document.querySelectorAll('[id^=hero-sheet-standard-abilities-page-abilities]').forEach(elem => pageIds.push(elem.id));

			Utils.elementsToPdf(pageIds, 'Standard Abilities', options.classicSheetPageSize, 'high')
				.then(() => setSpinning(false));
		});
	};

	const setNotes = (hero: Hero, value: string) => {
		const copy = Utils.copy(hero);
		copy.state.notes = value;

		persistHero(copy);
	};

	const addSquad = (hero: Hero, monster: Monster, count: number) => {
		const copy = Utils.copy(hero);

		const slot = FactoryLogic.createEncounterSlotFromMonster(monster);
		while (slot.monsters.length < count) {
			const m = Utils.copy(monster);
			m.id = Utils.guid();
			slot.monsters.push(m);
		}
		copy.state.controlledSlots.push(slot);

		persistHero(copy);
	};

	const removeSquad = (hero: Hero, slotID: string) => {
		const copy = Utils.copy(hero);

		copy.state.controlledSlots = copy.state.controlledSlots.filter(s => s.id !== slotID);

		persistHero(copy);
	};

	const addMonsterToSquad = (hero: Hero, slotID: string) => {
		const copy = Utils.copy(hero);

		const monsters = [
			...HeroLogic.getCompanions(copy),
			...HeroLogic.getRetainers(copy),
			...HeroLogic.getSummons(copy).map(s => s.monster)
		];

		copy.state.controlledSlots
			.filter(s => s.id === slotID)
			.forEach(slot => {
				const original = monsters.find(m => m.id === slot.monsterID);
				if (original) {
					const m = Utils.copy(original);
					m.id = Utils.guid();
					slot.monsters.push(m);
				}
			});

		persistHero(copy);
	};

	const removeMonsterFromSquad = (hero: Hero, slotID: string, monsterID: string) => {
		const copy = Utils.copy(hero);

		copy.state.controlledSlots
			.filter(s => s.id === slotID)
			.forEach(slot => EncounterLogic.removeMonsterFromSlot(slot, monsterID));

		// A squad with no monsters left in it goes too
		copy.state.controlledSlots = copy.state.controlledSlots.filter(s => (s.id !== slotID) || (s.monsters.length > 0));

		persistHero(copy);
	};

	const updateControlledMonster = (hero: Hero, monster: Monster) => {
		const copy = Utils.copy(hero);

		copy.state.controlledSlots.forEach(s => {
			s.monsters = s.monsters.map(m => m.id === monster.id ? monster : m);
		});

		persistHero(copy);
	};

	const setControlledMonsterDefeated = (hero: Hero, monster: Monster, value: boolean) => {
		const copy = Utils.copy(monster);
		copy.state.defeated = value;

		updateControlledMonster(hero, copy);
	};

	const setControlledMonsterHidden = (hero: Hero, monster: Monster, value: boolean) => {
		const copy = Utils.copy(monster);
		copy.state.hidden = value;

		updateControlledMonster(hero, copy);
	};

	const selectControlledMonster = (hero: Hero, monster: Monster) => {
		setDrawer(
			<MonsterModal
				monster={monster}
				sourcebooks={sourcebooks}
				controller={hero}
				onClose={() => setDrawer(null)}
				updateMonster={monster => updateControlledMonster(hero, monster)}
				exportElementData={exportLibraryElementData}
				copyElementCode={copyLibraryElementCode}
			/>
		);
	};

	const selectControlledSquad = (hero: Hero, slot: EncounterSlot) => {
		setDrawer(
			<MinionSlotModal
				slot={slot}
				updateSlot={slot => {
					const copy = Utils.copy(hero);

					copy.state.controlledSlots = copy.state.controlledSlots.map(s => s.id === slot.id ? slot : s);

					persistHero(copy);
				}}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	return {
		newHero,
		deleteHero,
		saveHero,
		importHero,
		importHeroes,
		copyHero,
		exportHeroData,
		exportHeroImage,
		exportHeroPdf,
		exportStandardAbilities,
		setNotes,
		addSquad,
		removeSquad,
		addMonsterToSquad,
		removeMonsterFromSquad,
		setControlledMonsterDefeated,
		setControlledMonsterHidden,
		selectControlledMonster,
		selectControlledSquad
	};
};
