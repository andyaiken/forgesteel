import { Markdown } from '@/components/controls/markdown/markdown';
import { NegotiationSheet } from '@/models/classic-sheets/negotiation-sheet';
import { useMemo } from 'react';

import './negotiation-responses-card.scss';

interface Props {
	negotiation: NegotiationSheet;
}

export const NegotiationResponsesCard = (props: Props) => {
	const negotiation = useMemo(() => props.negotiation, [ props.negotiation ]);
	return (
		<div className='negotiation-responses card'>
			<h2>Response and Offers</h2>
			<section className='bordered'>
				<h3>Interest 5</h3>
				<h4>Yes, and...</h4>
				<Markdown text={negotiation.outcomes[5]} />
			</section>

			<section className='bordered'>
				<h3>Interest 4</h3>
				<h4>Yes.</h4>
				<Markdown text={negotiation.outcomes[4]} />
				<p className='reference'>
					If the NPC still has patience, they can<br />prompt the heroes to ask for a better deal.
				</p>
			</section>

			<section className='bordered'>
				<h3>Interest 3</h3>
				<h4>Yes, but...</h4>
				<Markdown text={negotiation.outcomes[3]} />
			</section>

			<section className='bordered'>
				<h3>Interest 2</h3>
				<h4>No, but...</h4>
				<Markdown text={negotiation.outcomes[2]} />
			</section>

			<section className='bordered'>
				<h3>Interest 1</h3>
				<h4>No.</h4>
				<Markdown text={negotiation.outcomes[1]} />
				<p className='reference'>
					If the NPC still has patience, they can<br />ask for a better deal.
				</p>
			</section>

			<section className='bordered'>
				<h3>Interest 0</h3>
				<h4>No, and...</h4>
				<Markdown text={negotiation.outcomes[0]} />
			</section>
		</div>
	);
};
