import { LabeledTextField } from '../components/labeled-field';
import { MontageSheet } from '@/models/classic-sheets/montage-sheet';
import { Options } from '@/models/options';
import { useMemo } from 'react';

import './success-failure-tracker.scss';

interface Props {
	montage: MontageSheet;
	options: Options;
}

export const SuccessFailureTrackerCard = (props: Props) => {
	const montage = useMemo(() => props.montage, [ props.montage ]);

	return (
		<div className='success-failure-tracker card'>
			<div className='success-failures'>
				<div className='tracker'>
					<label>Successes</label>
					<div className='current-successes'>
						<LabeledTextField
							label='Current'
							content=''
							additionalClasses={[ 'no-box' ]}
						/>
					</div>
					<div className='limits'>
						<LabeledTextField
							label='Success Limit'
							content=''
							additionalClasses={[ 'no-box' ]}
						/>
						<LabeledTextField
							label='Failure Limit'
							content=''
							additionalClasses={[ 'no-box' ]}
						/>
					</div>
					<div className='current-failures'>
						<LabeledTextField
							label='Current'
							content=''
							additionalClasses={[ 'no-box' ]}
						/>
					</div>
					<label>Failures</label>
				</div>
				<div className='info'><strong>Limit -1</strong> for each hero &lt;5 (Minimum 2)</div>
				<div className='info'><strong>Limit +1</strong> for each hero &gt;5</div>
			</div>
			<div className='outcomes'>
				<section className='bordered'>
					<h3>Total Success</h3>
					<p>{montage.outcomes.totalSuccess}</p>
				</section>
				<section className='bordered'>
					<h3>Partial Success</h3>
					<p>{montage.outcomes.partialSuccess}</p>
				</section>
				<section className='bordered'>
					<h3>Total Failure</h3>
					<p>{montage.outcomes.totalFailure}</p>
				</section>
			</div>
		</div>
	);
};
