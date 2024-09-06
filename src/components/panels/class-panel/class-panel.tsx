import { HeroClass } from '../../../models/class';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass
}

export const ClassPanel = (props: Props) => {
	return (
		<div className='class-panel'>
			<div className='header-text'>{props.heroClass.name}</div>
			<div className='description-text'>{props.heroClass.description}</div>
		</div>
	);
};
