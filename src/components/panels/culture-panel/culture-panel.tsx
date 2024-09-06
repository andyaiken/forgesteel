import { Culture } from '../../../models/culture';

import './culture-panel.scss';

interface Props {
	culture: Culture
}

export const CulturePanel = (props: Props) => {
	return (
		<div className='culture-panel'>
			<div className='header-text'>{props.culture.name}</div>
			<div className='description-text'>{props.culture.description}</div>
		</div>
	);
};
