import { Counter } from '../../../../models/counter';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { Statistic } from 'antd';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './counter-panel.scss';

interface Props {
	counter: Counter;
	mode?: PanelMode;
	onChange?: (counter: Counter) => void;
}

export const CounterPanel = (props: Props) => {
	const [ counter, setCounter ] = useState<Counter>(Utils.copy(props.counter));

	const setValue = (value: number) => {
		const copy = Utils.copy(counter);
		copy.value = value;
		setCounter(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	try {
		return (
			<div className={props.mode === PanelMode.Full ? 'counter-panel' : 'counter-panel compact'} id={props.mode === PanelMode.Full ? props.counter.id : undefined}>
				<HeaderText level={1}>{props.counter.name || 'Unnamed Counter'}</HeaderText>
				{
					props.mode === PanelMode.Full ?
						<>
							{
								props.onChange ?
									<div className='stats'>
										<NumberSpin min={0} max={20} value={counter.value} onChange={setValue}>
											<Field orientation='vertical' label='Value' value={counter.value} />
										</NumberSpin>
									</div>
									:
									<div className='stats'>
										<Field orientation='vertical' label='Value' value={counter.value} />
									</div>
							}
						</>
						:
						<Statistic value={counter.value} />
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
