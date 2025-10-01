import { Fragment, useMemo } from 'react';
import { EncounterSheet } from '@/models/classic-sheets/encounter-sheet';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { MonsterData } from '@/data/monster-data';
import { Options } from '@/models/options';

import './malice-card.scss';

interface Props {
	encounter: EncounterSheet;
	options: Options;
}

export const MaliceCard = (props: Props) => {
	const encounter = useMemo(() => props.encounter, [ props.encounter ]);

	return (
		<div className='malice card'>
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
			<div className='basic-malice'>
				<h2>
					Basic Malice Features
					<br />
					<span>All creatures have the following Malice features</span>
				</h2>
				<ul className='features-container'>
					{MonsterData.malice.map(malice => <li key={malice.id}><FeatureComponent feature={malice} /></li>)}
				</ul>
			</div>
			<div className='malice-features'>
				<h2>
					Malice Features
					<br />
					<span>At the start of a monster’s turn, you can spend malice to activate a Malice feature</span>
				</h2>
				<ul className='features-container two-column'>
					{encounter.malice?.map(m => {
						return (
							<Fragment key={`malice-group-${m.monster}`}>
								{m.malice.map((malice, i) =>
									<li key={malice.id}>
										{i === 0 ? <h3>{m.monster} Malice</h3> : null}
										<FeatureComponent feature={malice} />
									</li>
								)}
							</Fragment>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
