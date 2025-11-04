import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { Options } from '@/models/options';
import { RecoveriesSheet } from '@/models/classic-sheets/hero-sheet';

import './recoveries-component.scss';

interface Props {
	recoveries: RecoveriesSheet;
	options: Options;
}

export const RecoveriesComponent = (props: Props) => {
	const recoveries = props.recoveries;
	const showState = props.options.includePlayState;

	return (

		<div className='recoveries'>
			<LabeledTextField
				label='Recoveries'
				content={(showState && recoveries.current?.toString()) || ''}
				additionalClasses={[ 'label-above', 'fancy' ]}
			/>
			<div className='reference'>
				<LabeledTextField
					label='Stamina'
					content={recoveries.value}
					additionalClasses={[ 'no-box' ]}
				/>
				<LabeledTextField
					label='Max'
					content={recoveries.max}
					additionalClasses={[ 'no-box' ]}
				/>
			</div>
		</div>
	);
};
