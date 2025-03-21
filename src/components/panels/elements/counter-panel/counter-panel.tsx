import { Counter } from '../../../../models/counter';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { PanelMode } from '../../../../enums/panel-mode';

import './counter-panel.scss';

interface Props {
	counter: Counter;
	mode?: PanelMode;
}

export const CounterPanel = (props: Props) => {
	try {
		return (
			<div className={props.mode === PanelMode.Full ? 'counter-panel' : 'counter-panel compact'} id={props.mode === PanelMode.Full ? props.counter.id : undefined}>
				<HeaderText level={1}>{props.counter.name || 'Unnamed Counter'}</HeaderText>
				<Field label='Value' value={props.counter.value} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
