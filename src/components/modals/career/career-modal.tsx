import { Career } from '../../../models/career';
import { CareerPanel } from '../../panels/career-panel/career-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './career-modal.scss';

interface Props {
	career: Career;
}

export const CareerModal = (props: Props) => {
	try {
		return (
			<div className='career-modal'>
				<CareerPanel career={props.career} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
