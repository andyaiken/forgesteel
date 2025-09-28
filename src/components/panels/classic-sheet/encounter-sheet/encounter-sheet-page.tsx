import { FillerCard, SheetLayout } from '../../../../logic/classic-sheet/sheet-layout';
import { Encounter } from '../../../../models/encounter';
import { EncounterHeaderCard } from '../encounter-header/encounter-header';
import { EncounterRosterCard } from '../encounter-roster/encounter-roster';
import { EncounterSheetBuilder } from '../../../../logic/playbook-sheets/encounter-sheet-builder';
import { Hero } from '../../../../models/hero';
import { MaliceCard } from '../malice-card/malice-card';
import { MonsterCard } from '../monster-card/monster-card';
import { NotesCard } from '../notes-card/notes-card';
import { Options } from '../../../../models/options';
import { SheetFormatter } from '../../../../logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '../../../../models/sourcebook';
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
			requiredCards.push({
				element: <NotesCard notes={encounter.notes} key='notes' />,
				width: 1,
				height: Math.max(20, SheetFormatter.countLines(encounter.notes, layout.cardLineLen)),
				shown: false
			});
		}

		if (encounter.monsters?.length) {
			encounter.monsters?.forEach(ms => {
				requiredCards.push({
					element: <MonsterCard monster={ms} options={props.options} key={ms.id} />,
					width: 1,
					height: Math.min(layout.linesY, SheetFormatter.calculateMonsterSize(ms, layout.cardLineLen)),
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
			}
			return classes;
		},
		[ props.options.classicSheetPageSize, props.options.colorSheet ]
	);

	return (
		<main id='classic-sheet'>
			<div className={sheetClasses.join(' ')} id={SheetFormatter.getPageId('encounter', encounter.id, 'main')}>
				<div className={`page page-1 ${props.options.pageOrientation}`}>
					<EncounterHeaderCard encounter={encounter} options={props.options} />
					<MaliceCard encounter={encounter} options={props.options} />
					<EncounterRosterCard encounter={encounter} sourcebooks={props.sourcebooks} options={props.options} />
				</div>
				{getMonsterCards()}
			</div>
		</main>
	);
};
