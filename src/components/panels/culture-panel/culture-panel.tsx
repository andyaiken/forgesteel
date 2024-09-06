import { Culture } from '../../../models/culture';
import { PanelMode } from '../../../enums/panel-mode';

import './culture-panel.scss';

interface Props {
	culture: Culture;
	mode?: PanelMode;
}

export const CulturePanel = (props: Props) => {
	return (
		<div className='culture-panel'>
			<div className='header-text'>{props.culture.name}</div>
			<div className='description-text'>{props.culture.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div className='ds-text'>DETAILS</div>
					: null
			}
		</div>
	);
};
