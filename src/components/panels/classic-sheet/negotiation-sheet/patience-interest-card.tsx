import { LabeledBooleanField } from '../components/labeled-field';
import { NegotiationSheet } from '@/models/classic-sheets/negotiation-sheet';
import { useMemo } from 'react';

import './patience-interest-card.scss';

interface Props {
	negotiation: NegotiationSheet;
}

export const PatienceInterestCard = (props: Props) => {
	const negotiation = useMemo(() => props.negotiation, [ props.negotiation ]);

	return (
		<div className='negotiation-patience-interest card'>
			<div className='patience'>
				<label>Patience</label>
				<div className='current-patience'>
					<div className='field'>
						{negotiation.patience}
					</div>
					<p className='reference'>
						<strong>Patience 0:</strong>
						<br />
						NPC Makes Final Offer
					</p>
				</div>
				<div className='patience-reference'>
					<p className='reference'>One hero shares NPC's native language (non-Caelian): <strong>Patience +1</strong></p>
					<p className='reference'>Three or more heroes shares NPC's native language (non-Caelian): <strong>Patience +2</strong></p>
				</div>
			</div>
			<div className='interest'>
				<label>Interest</label>
				<div className='interest-tracker'>
					<div className='tracker'>
						<div className={`start-point start-${negotiation.interest}`}>
							<LabeledBooleanField value={false} label='0' />
							<LabeledBooleanField value={false} label='1' />
							<LabeledBooleanField value={false} label='2' />
							<LabeledBooleanField value={false} label='3' />
							<LabeledBooleanField value={false} label='4' />
							<LabeledBooleanField value={false} label='5' />
						</div>
					</div>
					<div className='reference'>
						<div className='ref-0'>NPC Ends Negotiation</div>
						<div className='ref-5'>NPC Makes Final Offer</div>
					</div>
				</div>
				<div className='renown'>
					<p className='renown-level'>
						<strong>Hero renown ≥ {negotiation.impression}</strong> (NPC Impression score)
					</p>
					<p>
						<strong>Hero is famous to NPC:</strong>
						<br />
						Edge on tests using Flirt, Lead, or Persuade
					</p>
					<p>
						<strong>Hero is infamous to NPC:</strong>
						<br />
						Edge on tests using Brag, Interrogate, or Intimidate
					</p>
				</div>
			</div>
		</div>
	);
};
