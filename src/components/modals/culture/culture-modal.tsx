import { Culture } from '../../../models/culture';
import { CulturePanel } from '../../panels/culture-panel/culture-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './culture-modal.scss';

interface Props {
	culture: Culture;
}

export const CultureModal = (props: Props) => {
	try {
		return (
			<div className='culture-modal'>
				<CulturePanel culture={props.culture} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
