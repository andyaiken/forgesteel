import { LabeledBooleanField, LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { Options } from '@/models/options';
import { StaminaSheet } from '@/models/classic-sheets/hero-sheet';

import './stamina-component.scss';

interface Props {
	stamina: StaminaSheet;
	options: Options;
}

export const StaminaComponent = (props: Props) => {
	const stamina = props.stamina;
	const showState = props.options.includePlayState;

	return (
		<div className='stamina'>
			<h4>Stamina</h4>
			<div className='wrapper'>
				<div className='current-stamina'>
					<LabeledTextField
						label='Current'
						content={(showState && stamina.current?.toString()) || ''}
						additionalClasses={[ 'no-box' ]}
					/>
				</div>
			</div>
			<div className='current-state'>
				<div className='winded'>
					<LabeledBooleanField
						label='Winded'
						value={showState && (stamina.current || 1) <= (stamina.windedAt || 0)}
						additionalClasses={[ 'label-below' ]}
					/>
					<div className='ref'>≤ <span className='data'>{stamina.windedAt}</span></div>
				</div>
				<div className='dying'>
					<LabeledBooleanField
						label='Dying'
						value={showState && (stamina.current || 1) <= 0}
						additionalClasses={[ 'label-below' ]}
					/>
					<div className='ref'>0 to <span className='data'>{stamina.deadAt}</span></div>
				</div>
			</div>
			<div className='reference'>
				<LabeledTextField
					label='Temporary'
					content={(showState && stamina.temp?.toString()) || ''}
					additionalClasses={[ 'no-box' ]}
				/>
				<LabeledTextField
					label='Max'
					content={stamina.max}
					additionalClasses={[ 'no-box' ]}
				/>
			</div>
		</div>
	);
};
