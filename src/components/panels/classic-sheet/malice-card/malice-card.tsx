import { Fragment, useMemo } from 'react';
import { EncounterSheet } from '@/models/classic-sheets/encounter-sheet';
import { Feature } from '@/models/feature';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';

import './malice-card.scss';

interface MaliceCardProps {
	encounter: EncounterSheet;
}

export const MaliceCard = (props: MaliceCardProps) => {
	const encounter = useMemo(() => props.encounter, [ props.encounter ]);

	return (
		<div className='malice card'>
			<h2>
				Malice Features
				<br />
				<span>At the start of a monster’s turn, you can spend malice to activate a Malice feature</span>
			</h2>
			<div className='malice-features features-container three-column'>
				{encounter.malice?.map(m => {
					return (
						<MaliceGroupComponent monster={m.monster} malice={m.malice} />
					);
				})}
			</div>
		</div>
	);
};

interface MaliceComponentProps {
	monster: string;
	malice: Feature[];
}

export const MaliceGroupComponent = (props: MaliceComponentProps) => {
	return (
		<Fragment key={`malice-group-${props.monster}`}>
			{props.malice.map((malice, i) =>
				<div className='wrapper' key={malice.id}>
					{i === 0 ? <h3>{props.monster} Malice</h3> : null}
					<FeatureComponent feature={malice} />
				</div>
			)}
		</Fragment>
	);
};
