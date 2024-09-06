import { Career } from '../../../models/career';
import { PanelMode } from '../../../enums/panel-mode';

import './career-panel.scss';

interface Props {
	career: Career;
	mode?: PanelMode;
}

export const CareerPanel = (props: Props) => {
	return (
		<div className='career-panel'>
			<div className='header-text'>{props.career.name}</div>
			<div className='description-text'>{props.career.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div className='ds-text'>DETAILS</div>
					: null
			}
		</div>
	);
};
