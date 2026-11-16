import { FillerCard, SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { GenericCard, NotesCard } from '@/components/panels/classic-sheet/notes-card/notes-card';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useHeroes, useOptions } from '@/contexts/data-context';
import { DebugCard } from '@/components/panels/classic-sheet/reference/debug-card';
import { Encounter } from '@/models/encounter';
import { EncounterHeaderCard } from '@/components/panels/classic-sheet/encounter-header/encounter-header';
import { EncounterRosterCard } from '@/components/panels/classic-sheet/encounter-roster/encounter-roster';
import { EncounterSheet } from '@/models/classic-sheets/encounter-sheet';
import { EncounterSheetBuilder } from '@/logic/playbook-sheets/encounter-sheet-builder';
import { MaliceCard } from '@/components/panels/classic-sheet/malice-card/malice-card';
import { MonsterCard } from '@/components/panels/classic-sheet/monster-card/monster-card';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { TerrainCard } from '../monster-card/terrain-card.tsx';

import './encounter-sheet-page.scss';

// A shared empty list, so that a sheet with no roster breaks yet doesn't look like a change on every render
const noRosterBreaks: number[] = [];

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
}

export const EncounterSheetPage = (props: Props) => {
	const options = useOptions();
	const heroes = useHeroes();
	const encounter = useMemo(
		() => EncounterSheetBuilder.buildEncounterSheet(props.encounter, props.sourcebooks, heroes, options),
		[ props.encounter, props.sourcebooks, heroes, options ]
	);

	// #region Roster pages

	// The roster shares page 1 with the header and the malice features, and a page is a fixed size, so a long roster
	// carries on over as many further pages as it needs. Where it breaks is found by measuring the pages as rendered:
	// after each render, if a row on a roster page runs off the bottom, the next page starts at that row.
	// The breaks are worked out afresh whenever the sheet changes, and whenever fonts finish loading - fonts load lazily,
	// after the sheet is first laid out, and change how much fits on a page.

	const rowCount = (encounter.groups?.length ?? 0) + (encounter.terrainSlots?.length ?? 0);

	const [ fontLoads, setFontLoads ] = useState<number>(0);
	useEffect(() => {
		const fonts = document.fonts;
		if (!fonts) {
			return;
		}

		const onFontsLoaded = () => setFontLoads(n => n + 1);
		fonts.addEventListener('loadingdone', onFontsLoaded);
		return () => fonts.removeEventListener('loadingdone', onFontsLoaded);
	}, []);

	// The index of the first row on each roster page after page 1
	const [ rosterLayout, setRosterLayout ] = useState<{ sheet: EncounterSheet, fontLoads: number, breaks: number[] }>(
		{ sheet: encounter, fontLoads: fontLoads, breaks: [] }
	);
	const rosterBreaks = ((rosterLayout.sheet === encounter) && (rosterLayout.fontLoads === fontLoads)) ? rosterLayout.breaks : noRosterBreaks;

	const rosterPages = [ 0, ...rosterBreaks ].map((from, n, starts) => ({ from: from, to: starts[n + 1] ?? rowCount }));

	const sheetRef = useRef<HTMLDivElement>(null);

	// Each new break changes the pages, which are measured again in turn, until every page's rows fit
	useLayoutEffect(() => {
		const pages = [ ...(sheetRef.current?.querySelectorAll<HTMLElement>('.roster-page') ?? []) ];
		for (let n = 0; n < pages.length; n++) {
			const page = pages[n];
			const card = page.querySelector<HTMLElement>('.encounter-roster');
			if (!card) {
				// Page 1 can end up with none of the roster on it
				continue;
			}

			const pageBox = page.getBoundingClientRect();
			if (pageBox.height === 0) {
				// Not laid out, so there's nothing to measure
				return;
			}

			// A row has to end above the card's own bottom padding and border, which have to fit on the page too
			const cardStyle = getComputedStyle(card);
			const limit = pageBox.bottom - parseFloat(cardStyle.paddingBottom) - parseFloat(cardStyle.borderBottomWidth);

			const rows = [ ...page.querySelectorAll<HTMLElement>('tr[data-roster-item]') ];
			// Page 1 has other cards on it, so it can give up all of its rows; a page of nothing but roster can't
			const position = SheetLayout.getRowBreak(rows.map(row => row.getBoundingClientRect().bottom), limit, n > 0);
			if (position !== null) {
				// The pages before this one are fine; everything after its new break is laid out again from there
				const breaks = [ ...rosterBreaks.slice(0, n), Number(rows[position].dataset.rosterItem) ];
				setRosterLayout({ sheet: encounter, fontLoads: fontLoads, breaks: breaks });
				return;
			}
		}
	}, [ encounter, fontLoads, rosterBreaks ]);

	// #endregion

	const getMonsterCards = () => {
		const layout = SheetLayout.getMonsterCardsLayout(options);

		const requiredCards: FillerCard[] = [];

		if (encounter.notes?.length) {
			let nH = Math.max(20, SheetFormatter.calculateNotesCardSize(encounter.notes, layout.cardLineLen));
			nH = Math.min(layout.linesY, nH);
			requiredCards.push({
				element: <NotesCard notes={encounter.notes} key='notes' />,
				width: 1,
				height: nH,
				shown: false
			});
		}

		if (options.debugClassicSheet) {
			requiredCards.push({
				element: <DebugCard key='debug' />,
				width: 1,
				height: 15,
				shown: false
			});
		}

		if (encounter.monsters?.length) {
			encounter.monsters?.forEach(ms => {
				let mH = SheetFormatter.calculateMonsterSize(ms, layout.cardLineLen);
				let mW = 1;
				if (mH > layout.linesY) {
					mW = 2;
					mH = SheetFormatter.calculateMonsterSize(ms, layout.cardLineLen, 2);
					if (mH > layout.linesY) {
						console.warn('Card still larger than a full page!', ms.name, mH);
						mH = layout.linesY;
					}
				}
				requiredCards.push({
					element: <MonsterCard monster={ms} columns={mW} key={ms.id} />,
					width: mW,
					height: mH,
					shown: false
				});
			});
		}

		if (encounter.terrain?.length) {
			encounter.terrain?.forEach(t => {
				let tH = SheetFormatter.calculateTerrainSize(t, layout.cardLineLen);
				let tW = 1;
				if (tH > layout.linesY) {
					tW = 2;
					tH = SheetFormatter.calculateTerrainSize(t, layout.cardLineLen, 2);
					if (tH > layout.linesY) {
						console.warn('Card still larger than a full page!', t.name, tH);
						tH = layout.linesY;
					}
				}
				requiredCards.push({
					element: <TerrainCard terrain={t} columns={tW} key={t.id} />,
					width: tW,
					height: tH,
					shown: false
				});
			});
		}

		requiredCards.sort((a, b) => a.height - b.height);

		return SheetLayout.getMonsterCardPages(requiredCards, layout, `encounter-${encounter.id}-page-monsters`);
	};

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'encounter-sheet',
				options.classicSheetPageSize.toLowerCase()
			];
			if (options.colorSheet) {
				classes.push('color');
				classes.push(`colors-${options.colorScheme}`);
			}
			return classes;
		},
		[ options.classicSheetPageSize, options.colorSheet, options.colorScheme ]
	);

	const firstRosterPage = rosterPages[0];

	return (
		<main id='classic-sheet'>
			<div className={sheetClasses.join(' ')} ref={sheetRef}>
				<div
					className={`page page-1 roster-page ${options.pageOrientation}${encounter.description ? ' with-description' : ''}`}
					id={SheetFormatter.getPageId('encounter', encounter.id)}
				>
					<EncounterHeaderCard encounter={encounter} />
					{encounter.description ? <GenericCard title='Encounter Description' content={encounter.description} /> : null}
					<MaliceCard encounter={encounter} />
					{
						(firstRosterPage.to > firstRosterPage.from) || (rowCount === 0) ?
							<EncounterRosterCard encounter={encounter} sourcebooks={props.sourcebooks} from={firstRosterPage.from} to={firstRosterPage.to} />
							: null
					}
				</div>
				{
					rosterPages.slice(1).map((rosterPage, n) => (
						<div
							key={rosterPage.from}
							className={`page roster-page roster-continued ${options.pageOrientation}`}
							id={SheetFormatter.getPageId('encounter', encounter.id, `roster-${n + 2}`)}
						>
							<EncounterRosterCard
								encounter={encounter}
								sourcebooks={props.sourcebooks}
								from={rosterPage.from}
								to={rosterPage.to}
								continued={true}
							/>
						</div>
					))
				}
				{getMonsterCards()}
			</div>
		</main>
	);
};
