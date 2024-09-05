import { Complication } from '../../../models/complication';

import './complication-panel.scss';

interface Props {
	complication: Complication
}

export const ComplicationPanel = (props: Props) => {
	return (
		<div className='complication-panel'>
			{props.complication.name}
		</div>
	);
};
