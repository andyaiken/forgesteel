import { EncounterSheet } from '@/models/classic-sheets/encounter-sheet';
import { HeaderImage } from '@/components/panels/classic-sheet/header-image/header-image';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
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
					label='Encounter Name'
					content={encounter.name}
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
			<div className='encounter-objective'>
				<LabeledTextField
					label='Encounter Objective'
					content={encounter.objective}
					additionalClasses={[ 'objective', 'no-box', 'text-left' ]}
				/>
				<section className='bordered success'>
					<h3>Success Condition</h3>
					<Markdown text={encounter.successCondition || ''} />
				</section>
				<section className='bordered failure'>
					<h3>Failure Condition</h3>
					<Markdown text={encounter.failureCondition || ''} />
				</section>
			</div>
			<div className='encounter-tracker'>
				<div className='round-tracker'>
					<LabeledTextField
						content=''
						label='Round'
						additionalClasses={[ 'label-above', 'fancy' ]}
					/>
					<div className='reference'>
						<div className='round-1'>
							<h4>Round 1 Malice</h4>
							<LabeledTextField
								content={encounter.heroCount}
								label='Heroes'
								additionalClasses={[ 'no-box' ]}
							/>
							<span>+ 1 +</span>
							<LabeledTextField
								content={encounter.heroVictories}
								label='Victories'
								additionalClasses={[ 'no-box' ]}
							/>
						</div>
						<div className='round-2'>
							<h4>Round 2+ Malice</h4>
							<LabeledTextField
								content={encounter.heroCount}
								label='Heroes'
								additionalClasses={[ 'no-box' ]}
							/>
							<span>+ Rounds</span>
						</div>
					</div>
				</div>
				<div className='malice-tracker'>
					<h3>Malice</h3>
					<div className='bordered'>&nbsp;</div>
				</div>
			</div>
		</div>
	);
};
