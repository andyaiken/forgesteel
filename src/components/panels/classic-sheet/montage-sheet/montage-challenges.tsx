import { LabeledBooleanField } from '@/components/panels/classic-sheet/components/labeled-field';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MontageSheet } from '@/models/classic-sheets/montage-sheet';
import { Options } from '@/models/options';
import { useMemo } from 'react';

import './montage-challenges.scss';

interface Props {
	montage: MontageSheet;
	options: Options;
}

export const MontageChallengesCard = (props: Props) => {
	const montage = useMemo(() => props.montage, [ props.montage ]);

	return (
		<div className='montage-challenges card'>
			<h2>Challenges</h2>
			<div className='hazards-events'>
				<section className='bordered'>
					<h3>Hazards</h3>
					<Markdown text={montage.hazards} />
				</section>
				<section className='bordered'>
					<h3>Events</h3>
					<Markdown text={montage.eventsNotes} />
				</section>
			</div>
			<div className='test-table'>
				<div className='header'>
					<div>Round</div>
					<div>Hero</div>
					<div>Test</div>
					<div>Skill</div>
					<div>Result</div>
				</div>
				{[ ...Array(12) ].map((_o, i) => {
					return (
						<div className='row' key={`challenge-result-table-test-${i}`}>
							<div>&nbsp;</div>
							<div>&nbsp;</div>
							<div>&nbsp;</div>
							<div>&nbsp;</div>
							<div className='test-result'>
								<LabeledBooleanField value={false} label='Success' />
								<LabeledBooleanField value={false} label='Failure' />
							</div>
						</div>
					);
				})}

				<div className='header'>
					<div>Round</div>
					<div>Hero</div>
					<div>Is Assisting</div>
					<div>Skill</div>
					<div>Result</div>
				</div>
				{[ ...Array(5) ].map((_o, i) => {
					return (
						<div className='row' key={`challenge-result-table-assist-${i}`}>
							<div>&nbsp;</div>
							<div>&nbsp;</div>
							<div>&nbsp;</div>
							<div>&nbsp;</div>
							<div className='test-result'>
								<LabeledBooleanField value={false} label='T1' />
								<LabeledBooleanField value={false} label='T2' />
								<LabeledBooleanField value={false} label='T3' />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
