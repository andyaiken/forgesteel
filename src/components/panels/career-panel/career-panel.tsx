import { Career } from '../../../models/career';

import './career-panel.scss';

interface Props {
	career: Career
}

export const CareerPanel = (props: Props) => {
	return (
		<div className='career-panel'>
			{props.career.name}
		</div>
	);
};
