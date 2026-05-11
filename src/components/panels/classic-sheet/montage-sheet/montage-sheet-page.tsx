import { useHeroes, useOptions } from '@/contexts/data-context';
import { Montage } from '@/models/montage';
import { MontageChallengesCard } from '@/components/panels/classic-sheet/montage-sheet/montage-challenges';
import { MontageHeaderCard } from '@/components/panels/classic-sheet/montage-sheet/montage-header';
import { MontageSheetBuilder } from '@/logic/playbook-sheets/montage-sheet-builder';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { SuccessFailureTrackerCard } from '@/components/panels/classic-sheet/montage-sheet/success-failure-tracker';
import { useMemo } from 'react';

import rollT1Icon from '@/assets/icons/power-roll-t1.svg';
import rollT2Icon from '@/assets/icons/power-roll-t2.svg';
import rollT3Icon from '@/assets/icons/power-roll-t3.svg';

import './montage-sheet-page.scss';

interface Props {
	montage: Montage;
}

export const MontageSheetPage = (props: Props) => {
	const options = useOptions();
	const heroes = useHeroes();
	const montage = useMemo(
		() => MontageSheetBuilder.buildMontageSheet(props.montage, heroes, options),
		[ props.montage, heroes, options ]
	);

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'montage-sheet',
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
				<div className={`page page-1 ${options.pageOrientation}`} id={SheetFormatter.getPageId('montage', montage.id)}>
					<MontageHeaderCard montage={montage} />

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
						<div className='assist-roll'>
							<h3>Assisting a Test</h3>
							<div className='power-roll'>
								<div className='power'>Power Roll + Characteristic</div>
								<div className='roll-tiers'>
									<div className='tier t1'>
										<img alt='≤ 11' className='range' src={rollT1Icon} />
										<span className='effect'>
											You get in the way or make things worse. The creature takes a bane on their test
										</span>
									</div>
									<div className='tier t2'>
										<img alt='12 - 16' className='range' src={rollT2Icon} />
										<span className='effect'>
											Your help grants the other creature an edge on their test
										</span>
									</div>
									<div className='tier t3'>
										<img alt='17 +' className='range' src={rollT3Icon} />
										<span className='effect'>
											Your help gives the other creature a double edge on their test
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<SuccessFailureTrackerCard montage={montage} />

					<MontageChallengesCard montage={montage} />
				</div>
			</div>
		</main>
	);
};
