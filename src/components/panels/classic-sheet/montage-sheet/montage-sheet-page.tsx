import { Montage } from '@/models/montage';
import { MontageHeaderCard } from './montage-header';
import { MontageSheetBuilder } from '@/logic/playbook-sheets/montage-sheet-builder';
import { Options } from '@/models/options';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SuccessFailureTrackerCard } from './success-failure-tracker';
import { useMemo } from 'react';

import './montage-sheet-page.scss';

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

					<div className='tests-difficulty card'>
						<h2>Test Difficulty</h2>
						<div className='tests-difficulty-table'>
							<div className='header'>
								<div>Result</div>
								<div>Easy Test</div>
								<div>Medium Test</div>
								<div>Hard Test</div>
							</div>
							<div className='result-row'>
								<div>≤ 11</div>
								<div>Success with consequence</div>
								<div>Failure</div>
								<div>Failure with consequence</div>
							</div>
							<div className='result-row'>
								<div>12-16</div>
								<div>Success</div>
								<div>Success with consequence</div>
								<div>Failure</div>
							</div>
							<div className='result-row'>
								<div>17 +</div>
								<div>Success with reward</div>
								<div>Success</div>
								<div>Success</div>
							</div>
							<div className='result-row'>
								<div>Natural 19 or 20</div>
								<div>Success with reward</div>
								<div>Success with reward</div>
								<div>Success with reward</div>
							</div>
						</div>
					</div>

					<SuccessFailureTrackerCard montage={montage} options={props.options} />
				</div>
			</div>
		</main>
	);
};
