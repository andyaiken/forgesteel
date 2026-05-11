import { FillerCard, SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { useHeroes, useOptions } from '@/contexts/data-context';
import { DebugCard } from '@/components/panels/classic-sheet/reference/debug-card';
import { Encounter } from '@/models/encounter';
import { EncounterHeaderCard } from '@/components/panels/classic-sheet/encounter-header/encounter-header';
import { EncounterRosterCard } from '@/components/panels/classic-sheet/encounter-roster/encounter-roster';
import { EncounterSheetBuilder } from '@/logic/playbook-sheets/encounter-sheet-builder';
import { MaliceCard } from '@/components/panels/classic-sheet/malice-card/malice-card';
import { MonsterCard } from '@/components/panels/classic-sheet/monster-card/monster-card';
import { NotesCard } from '@/components/panels/classic-sheet/notes-card/notes-card';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { useMemo } from 'react';

import './encounter-sheet-page.scss';

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

	const getMonsterCards = () => {
		const layout = SheetLayout.getFollowerCardsLayout(options, true);

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

		requiredCards.sort((a, b) => a.height - b.height);

		return SheetLayout.getMonsterCardPages(requiredCards, encounter, layout, 'monsters');
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

	return (
		<main id='classic-sheet'>
			<div className={sheetClasses.join(' ')}>
				<div className={`page page-1 ${options.pageOrientation}`} id={SheetFormatter.getPageId('encounter', encounter.id)}>
					<EncounterHeaderCard encounter={encounter} />
					<MaliceCard encounter={encounter} />
					<EncounterRosterCard encounter={encounter} sourcebooks={props.sourcebooks} />
				</div>
				{getMonsterCards()}
			</div>
		</main>
	);
};
