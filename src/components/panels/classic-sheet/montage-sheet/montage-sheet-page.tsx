import { Montage } from '@/models/montage';
import { MontageHeaderCard } from './montage-header';
import { MontageSheetBuilder } from '@/logic/playbook-sheets/montage-sheet-builder';
import { Options } from '@/models/options';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { useMemo } from 'react';

interface Props {
	montage: Montage;
	options: Options;
}

export const MontageSheetPage = (props: Props) => {
	const montage = useMemo(
		() => MontageSheetBuilder.buildMontageSheet(props.montage),
		[ props.montage ]
	);

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'montage-sheet',
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
			<div className={sheetClasses.join(' ')}>
				<div className={`page page-1 ${props.options.pageOrientation}`} id={SheetFormatter.getPageId('montage', montage.id, 'main')}>
					<MontageHeaderCard montage={montage} options={props.options} />
				</div>
			</div>
		</main>
	);
};
