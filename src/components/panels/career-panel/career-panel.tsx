import { Career } from '../../../models/career';

import './career-panel.scss';

interface Props {
	career: Career
}

export const CareerPanel = (props: Props) => {
	return (
		<div className='career-panel'>
			<div className='header-text'>{props.career.name}</div>
			<div className='description-text'>{props.career.description}</div>
		</div>
	);
};
