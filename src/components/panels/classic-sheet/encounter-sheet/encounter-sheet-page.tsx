import { FillerCard, SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { Encounter } from '@/models/encounter';
import { EncounterHeaderCard } from '@/components/panels/classic-sheet/encounter-header/encounter-header';
import { EncounterRosterCard } from '@/components/panels/classic-sheet/encounter-roster/encounter-roster';
import { EncounterSheetBuilder } from '@/logic/playbook-sheets/encounter-sheet-builder';
import { Hero } from '@/models/hero';
import { MaliceCard } from '@/components/panels/classic-sheet/malice-card/malice-card';
import { MonsterCard } from '@/components/panels/classic-sheet/monster-card/monster-card';
import { NotesCard } from '@/components/panels/classic-sheet/notes-card/notes-card';
import { Options } from '@/models/options';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { useMemo } from 'react';

import './encounter-sheet-page.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
}

export const EncounterSheetPage = (props: Props) => {
	const encounter = useMemo(
		() => EncounterSheetBuilder.buildEncounterSheet(props.encounter, props.sourcebooks, props.heroes, props.options),
		[ props.encounter, props.sourcebooks, props.heroes, props.options ]
	);

	const getMonsterCards = () => {
		const layout = SheetLayout.getFollowerCardsLayout(props.options, true);

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
					element: <MonsterCard monster={ms} columns={mW} options={props.options} key={ms.id} />,
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
				props.options.classicSheetPageSize.toLowerCase()
			];
			if (props.options.colorSheet) {
				classes.push('color');
				classes.push(`colors-${props.options.colorScheme}`);
			}
			return classes;
		},
		[ props.options.classicSheetPageSize, props.options.colorSheet, props.options.colorScheme ]
	);

	return (
		<main id='classic-sheet'>
			<div className={sheetClasses.join(' ')}>
				<div className={`page page-1 ${props.options.pageOrientation}`} id={SheetFormatter.getPageId('encounter', encounter.id)}>
					<EncounterHeaderCard encounter={encounter} options={props.options} />
					<MaliceCard encounter={encounter} options={props.options} />
					<EncounterRosterCard encounter={encounter} sourcebooks={props.sourcebooks} options={props.options} />
				</div>
				{getMonsterCards()}
			</div>
		</main>
	);
};
