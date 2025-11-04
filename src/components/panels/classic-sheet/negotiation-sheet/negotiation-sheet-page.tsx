import { Negotiation } from '@/models/negotiation';
import { NegotiationArgumentsCard } from './negotiation-arguments-card';
import { NegotiationHeaderCard } from './negotiation-header';
import { NegotiationNpcCard } from './negotiation-npc-card';
import { NegotiationResponsesCard } from './negotiation-responses-card';
import { NegotiationSheetBuilder } from '@/logic/playbook-sheets/negotiation-sheet-builder';
import { Options } from '@/models/options';
import { PatienceInterestCard } from './patience-interest-card';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { useMemo } from 'react';

import './negotiation-sheet-page.scss';

interface Props {
	negotiation: Negotiation;
	options: Options;
}

export const NegotiationSheetPage = (props: Props) => {
	const negotiation = useMemo(
		() => NegotiationSheetBuilder.buildNegotiationSheet(props.negotiation),
		[ props.negotiation ]
	);

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'negotiation-sheet',
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
				<div className={`page page-1 ${props.options.pageOrientation}`} id={SheetFormatter.getPageId('negotiation', negotiation.id, 'main')}>
					<NegotiationHeaderCard negotiation={negotiation} />
					<PatienceInterestCard negotiation={negotiation} />
					<NegotiationNpcCard negotiation={negotiation} />
					<NegotiationResponsesCard negotiation={negotiation} />
					<NegotiationArgumentsCard />
				</div>
			</div>
		</main>
	);
};
