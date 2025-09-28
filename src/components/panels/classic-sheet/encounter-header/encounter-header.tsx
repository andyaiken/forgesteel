import { EncounterSheet } from '../../../../models/classic-sheets/encounter-sheet';
import { HeaderImage } from '../header-image/header-image';
import { LabeledTextField } from '../components/labeled-field';
import { Markdown } from '../../../controls/markdown/markdown';
import { Options } from '../../../../models/options';
import { useMemo } from 'react';

import './encounter-header.scss';

interface Props {
	encounter: EncounterSheet;
	options: Options;
}

export const EncounterHeaderCard = (props: Props) => {
	const encounter = useMemo(() => props.encounter, [ props.encounter ]);

	return (
		<div className='encounter-header card'>
			<HeaderImage />
			<section className='container overview'>
				<LabeledTextField
					label='Encounter Objective'
					content={encounter.objective}
					additionalClasses={[ 'name', 'no-box', 'text-left' ]}
				/>
				<LabeledTextField
					label='Number of Heroes'
					content={encounter.heroCount}
				/>
				<LabeledTextField
					label='Average Level'
					content={encounter.heroLvl}
				/>
				<LabeledTextField
					label='Heroes’ Victories'
					content={encounter.heroVictories}
				/>
				<LabeledTextField
					label='Difficulty'
					content={encounter.difficulty}
					additionalClasses={[ 'difficulty' ]}
				/>
				<LabeledTextField
					label='Victories'
					content={encounter.encounterVictories}
				/>
				<LabeledTextField
					label='EV'
					content={encounter.encounterEv}
				/>
			</section>
			<section className='container success'>
				<h3>Success Condition</h3>
				<Markdown text={encounter.successCondition || ''} />
			</section>
			<section className='container failure'>
				<h3>Failure Condition</h3>
				<Markdown text={encounter.failureCondition || ''} />
			</section>
		</div>
	);
};
