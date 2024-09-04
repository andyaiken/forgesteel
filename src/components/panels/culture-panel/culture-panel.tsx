import { Culture } from '../../../models/culture';

import './culture-panel.scss'

interface Props {
	culture: Culture
}

export const CulturePanel = (props: Props) => {
	return (
		<div className='culture-panel'>
			{props.culture.name}
		</div>
	);
}
