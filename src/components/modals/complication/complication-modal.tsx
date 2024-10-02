import { Complication } from '../../../models/complication';
import { ComplicationPanel } from '../../panels/complication-panel/complication-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './complication-modal.scss';

interface Props {
	complication: Complication;
}

export const ComplicationModal = (props: Props) => {
	try {
		return (
			<div className='complication-modal'>
				<ComplicationPanel complication={props.complication} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
