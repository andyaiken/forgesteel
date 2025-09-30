import { Fragment, useMemo } from 'react';
import { EncounterSheet } from '@/models/classic-sheets/encounter-sheet';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
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
			<h2>
				Malice Features
				<br />
				<span>At the start of a monster’s turn, you can spend malice to activate a Malice feature</span>
			</h2>
			<div className='malice-features'>
				<ul className='features-container three-column'>
					{MonsterData.malice.map((basicMalice, i) => {
						return (
							<li key={basicMalice.id}>
								{
									i === 0 ?
										<h3>
											Basic Malice Features
											<br />
											<span>All creatures have the following Malice features</span>
										</h3>
										: null
								}
								<FeatureComponent feature={basicMalice} />
							</li>
						);
					})}
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
