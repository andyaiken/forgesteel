import { Kit } from '../../../models/kit';

import './kit-panel.scss';

interface Props {
	kit: Kit
}

export const KitPanel = (props: Props) => {
	return (
		<div className='kit-panel'>
			{props.kit.name}
		</div>
	);
};
