import { Negotiation } from '@/models/negotiation';
import { NegotiationArgumentsCard } from '@/components/panels/classic-sheet/negotiation-sheet/negotiation-arguments-card';
import { NegotiationHeaderCard } from '@/components/panels/classic-sheet/negotiation-sheet/negotiation-header';
import { NegotiationNpcCard } from '@/components/panels/classic-sheet/negotiation-sheet/negotiation-npc-card';
import { NegotiationResponsesCard } from '@/components/panels/classic-sheet/negotiation-sheet/negotiation-responses-card';
import { NegotiationSheetBuilder } from '@/logic/playbook-sheets/negotiation-sheet-builder';
import { PatienceInterestCard } from '@/components/panels/classic-sheet/negotiation-sheet/patience-interest-card';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { useMemo } from 'react';
import { useOptions } from '@/contexts/data-context';

import './negotiation-sheet-page.scss';

interface Props {
	negotiation: Negotiation;
}

export const NegotiationSheetPage = (props: Props) => {
	const negotiation = useMemo(
		() => NegotiationSheetBuilder.buildNegotiationSheet(props.negotiation),
		[ props.negotiation ]
	);

	const options = useOptions();

	const sheetClasses = useMemo(
		() => {
			const classes = [
				'negotiation-sheet',
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
				<div className={`page page-1 ${options.pageOrientation}`} id={SheetFormatter.getPageId('negotiation', negotiation.id)}>
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
