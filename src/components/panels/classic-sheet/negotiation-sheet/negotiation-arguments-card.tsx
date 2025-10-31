import { LabeledBooleanField } from '../components/labeled-field';

import rollT1Icon from '@/assets/icons/power-roll-t1.svg';
import rollT2Icon from '@/assets/icons/power-roll-t2.svg';
import rollT3Icon from '@/assets/icons/power-roll-t3.svg';

import './negotiation-arguments-card.scss';

export const NegotiationArgumentsCard = () => {
	return (
		<div className='negotiation-arguments card'>
			<h2>Arguments</h2>
			<div className='arguments-tracker-table'>
				<div className='header row'>
					<div>Argument</div>
					<div>Used Motivation?</div>
				</div>
				{
					[ ...Array(6) ].map((_e, i) => {
						return (
							<div className='row' key={`negotiaion-arguments-${i}`}>
								<div className='motivation-indicator'>
									<LabeledBooleanField value={false} label='' />
									<div className='space'>&nbsp;</div>
								</div>
							</div>
						);
					})
				}
			</div>

			<div className='reference-rolls'>
				<div className='appeal-roll'>
					<h3>Appeal to Motivation</h3>
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
									The NPC's interest increases by 1, and their patience decreases by 1.
								</span>
							</div>
							<div className='tier t3'>
								<img alt='17 +' className='range' src={rollT3Icon} />
								<span className='effect'>
									The NPC's interest increases by 1, and their patience doesn't change.
								</span>
							</div>
						</div>
					</div>
					<p>
						If the heroes attempt to appeal to a motivation that's already
						been appealed to, the NPC's interest remains the same and their
						patience decreases by 1.
					</p>
				</div>
				<div className='standard-roll'>
					<h3>No Motivation or Pitfall</h3>
					<div className='power-roll'>
						<div className='power'>Power Roll + Reason, Intuition, or Presence:</div>
						<div className='roll-tiers'>
							<div className='tier t1'>
								<img alt='≤ 11' className='range' src={rollT1Icon} />
								<span className='effect'>
									The NPC's patience decreases by 1, and their interest decreases by 1.
								</span>
							</div>
							<div className='tier t2'>
								<img alt='12 - 16' className='range' src={rollT2Icon} />
								<span className='effect'>
									The NPC's patience decreases by 1.
								</span>
							</div>
							<div className='tier t3'>
								<img alt='17 +' className='range' src={rollT3Icon} />
								<span className='effect'>
									The NPC's interest increases by 1, and their patience decreases by 1.
									(on a natural 19 or 20, the NPC's patience remains the same.)
								</span>
							</div>
						</div>
					</div>
					<p>
						If the heroes try to use the same argument without a pitfall or motivation twice,
						the test automatically gets a tier 1 result.
					</p>
				</div>
			</div>
		</div>
	);
};
