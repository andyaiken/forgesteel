import { HeaderImage } from '../header-image/header-image';
import { LabeledTextField } from '../components/labeled-field';
import { MontageSheet } from '@/models/classic-sheets/montage-sheet';
import { Options } from '@/models/options';
import { useMemo } from 'react';

interface Props {
	montage: MontageSheet;
	options: Options;
}

export const MontageHeaderCard = (props: Props) => {
	const montage = useMemo(() => props.montage, [ props.montage ]);

	return (
		<div className='montage-header card'>
			<HeaderImage />
			<section className='container overview'>
				<LabeledTextField
					label='Montage Goal'
					content={montage.goal}
					additionalClasses={[ 'name', 'no-box', 'text-left' ]}
				/>
			</section>
			<div className='montage-objective'>

			</div>
		</div>
	);
};
