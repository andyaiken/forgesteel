import { Complication } from '../../../models/complication';

import './complication-panel.scss';

interface Props {
	complication: Complication
}

export const ComplicationPanel = (props: Props) => {
	return (
		<div className='complication-panel'>
			<div className='header-text'>{props.complication.name}</div>
			<div className='description-text'>{props.complication.description}</div>
		</div>
	);
};
