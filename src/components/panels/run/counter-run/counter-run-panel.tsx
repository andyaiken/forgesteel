import { Counter } from '../../../../models/counter';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './counter-run-panel.scss';

interface Props {
	counter: Counter;
	onChange: (counter: Counter) => void;
}

export const CounterRunPanel = (props: Props) => {
	const [ counter, setCounter ] = useState<Counter>(Utils.copy(props.counter));

	const setValue = (value: number) => {
		const copy = Utils.copy(counter);
		copy.value = value;
		setCounter(copy);
		props.onChange(copy);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='counter-run-panel' id={counter.id}>
					<HeaderText level={1}>{counter.name || 'Unnamed Counter'}</HeaderText>
					<div className='stats'>
						<NumberSpin min={0} max={20} value={counter.value} onChange={setValue}>
							<Field orientation='vertical' label='Value' value={counter.value} />
						</NumberSpin>
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
