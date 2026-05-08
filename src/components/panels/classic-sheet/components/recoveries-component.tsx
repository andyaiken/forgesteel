import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { RecoveriesSheet } from '@/models/classic-sheets/hero-sheet';
import { useOptions } from '@/contexts/data-context';

import './recoveries-component.scss';

interface Props {
	recoveries: RecoveriesSheet;
}

export const RecoveriesComponent = (props: Props) => {
	const recoveries = props.recoveries;
	const options = useOptions();
	const showState = options.includePlayState;

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
