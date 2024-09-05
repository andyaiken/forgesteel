import { HeroClass } from '../../../models/class';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass
}

export const ClassPanel = (props: Props) => {
	return (
		<div className='class-panel'>
			{props.heroClass.name}
		</div>
	);
};
