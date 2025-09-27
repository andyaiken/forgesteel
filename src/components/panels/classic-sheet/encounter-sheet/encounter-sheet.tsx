import { Encounter } from '../../../../models/encounter';
import { EncounterHeaderCard } from '../encounter-header/encounter-header';
import { EncounterRosterCard } from '../encounter-roster/encounter-roster';
import { EncounterSheetBuilder } from '../../../../logic/playbook-sheets/encounter-sheet-builder';
import { Hero } from '../../../../models/hero';
import { MaliceCard } from '../malice-card/malice-card';
import { Options } from '../../../../models/options';
import { SheetFormatter } from '../../../../logic/hero-sheet/sheet-formatter';
import { Sourcebook } from '../../../../models/sourcebook';
import { useMemo } from 'react';

import './encounter-sheet.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
}

export const EncounterSheet = (props: Props) => {
	const encounter = useMemo(
		() => EncounterSheetBuilder.buildEncounterSheet(props.encounter, props.sourcebooks, props.heroes, props.options),
		[ props.encounter, props.sourcebooks, props.heroes, props.options ]
	);

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
			</div>
		</main>
	);
};
