import { Fragment, useMemo } from 'react';
import { EncounterSheet } from '@/models/classic-sheets/encounter-sheet';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
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
			<h2>
				Malice Features
				<br />
				<span>At the start of a monster’s turn, you can spend malice to activate a Malice feature</span>
			</h2>
			<ul className='malice-features features-container three-column'>
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
	);
};
