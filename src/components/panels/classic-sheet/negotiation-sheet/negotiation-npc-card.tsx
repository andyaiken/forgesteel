import { Markdown } from '@/components/controls/markdown/markdown';
import { NegotiationSheet } from '@/models/classic-sheets/negotiation-sheet';
import { useMemo } from 'react';

import rollT1Icon from '@/assets/icons/power-roll-t1.svg';
import rollT2Icon from '@/assets/icons/power-roll-t2.svg';
import rollT3Icon from '@/assets/icons/power-roll-t3.svg';

import './negotiation-npc-card.scss';

interface Props {
	negotiation: NegotiationSheet;
}

export const NegotiationNpcCard = (props: Props) => {
	const negotiation = useMemo(() => props.negotiation, [ props.negotiation ]);
	return (
		<div className='negotiation-npc card'>
			<h2>Negotiating NPC</h2>
			<section className='bordered'>
				<h3>Motivations</h3>
				<div className='traits'>
					<h4>{negotiation.motivations[0]?.trait}</h4>
					<h4>{negotiation.motivations[1]?.trait}</h4>
				</div>
				{
					negotiation.motivations[0] ?
						<Markdown text={`**${negotiation.motivations[0].trait}:** ` + negotiation.motivations[0]?.description} />
						: null
				}
				{
					negotiation.motivations[1] ?
						<Markdown text={`**${negotiation.motivations[1].trait}:** ` + negotiation.motivations[1]?.description} />
						: null
				}
			</section>

			<section className='bordered'>
				<h3>Pitfalls</h3>
				<div className='traits'>
					<h4>{negotiation.pitfalls[0]?.trait}</h4>
					<h4>{negotiation.pitfalls[1]?.trait}</h4>
				</div>
				{
					negotiation.pitfalls[0] ?
						<Markdown text={`**${negotiation.pitfalls[0].trait}:** ` + negotiation.pitfalls[0]?.description} />
						: null
				}
				{
					negotiation.pitfalls[1] ?
						<Markdown text={`**${negotiation.pitfalls[1].trait}:** ` + negotiation.pitfalls[1]?.description} />
						: null
				}
				<p className='reference'>
					Arguments that use a pitfall automatically fail: <br />
					<strong>-1 Interest, -1 Patience</strong>
				</p>
			</section>

			<div className='uncover-roll'>
				<h3>Uncover Motivation</h3>
				<div className='power-roll'>
					<div className='power'>Power Roll + Reason, Intuition, or Presence:</div>
					<div className='roll-tiers'>
						<div className='tier t1'>
							<img alt='≤ 11' className='range' src={rollT1Icon} />
							<span className='effect'>
								The NPC's patience decreases by 1.
							</span>
						</div>
						<div className='tier t2'>
							<img alt='12 - 16' className='range' src={rollT2Icon} />
							<span className='effect'>
								The hero learns no information regarding the NPC's motivations or pitfalls
							</span>
						</div>
						<div className='tier t3'>
							<img alt='17 +' className='range' src={rollT3Icon} />
							<span className='effect'>
								The hero learns one of the NPC's motivations or pitfalls (their choice).
							</span>
						</div>
					</div>
				</div>
			</div>

			<section className='bordered'>
				<h3>Skills and Languages</h3>
				<p className='languages'>
					Languages: {negotiation.languages.join(', ')}
				</p>
			</section>
		</div>
	);
};
