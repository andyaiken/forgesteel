import { Kit } from '../../../models/kit';

import './kit-panel.scss';

interface Props {
	kit: Kit
}

export const KitPanel = (props: Props) => {
	return (
		<div className='kit-panel'>
			<div className='header-text'>{props.kit.name}</div>
			<div className='description-text'>{props.kit.description}</div>
		</div>
	);
};
