import { HeaderImage } from '@/components/panels/classic-sheet/header-image/header-image';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { NegotiationSheet } from '@/models/classic-sheets/negotiation-sheet';
import { useMemo } from 'react';

import './negotiation-header.scss';

interface Props {
	negotiation: NegotiationSheet;
}

export const NegotiationHeaderCard = (props: Props) => {
	const negotiation = useMemo(() => props.negotiation, [ props.negotiation ]);

	return (
		<div className='negotiation-header card'>
			<HeaderImage />
			<section className='container overview'>
				<LabeledTextField
					label='Negotiation'
					content={negotiation.name}
					additionalClasses={[ 'name', 'no-box', 'text-left' ]}
				/>
			</section>
			<section className='container stats'>
				<LabeledTextField
					label='Starting Attitude'
					content={negotiation.attitude}
					additionalClasses={[ 'box-both', 'label-above' ]}
				/>
				<LabeledTextField
					label='Starting Interest'
					content={negotiation.interest}
					additionalClasses={[ 'box-both', 'label-above' ]}
				/>
				<LabeledTextField
					label='Starting Patience'
					content={negotiation.patience}
					additionalClasses={[ 'box-both', 'label-above' ]}
				/>
				<LabeledTextField
					label='Impression'
					content={negotiation.impression}
					additionalClasses={[ 'box-both', 'label-above' ]}
				/>
			</section>
		</div>
	);
};
