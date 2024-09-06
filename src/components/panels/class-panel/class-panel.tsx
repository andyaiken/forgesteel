import { HeroClass } from '../../../models/class';
import { PanelMode } from '../../../enums/panel-mode';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass;
	mode?: PanelMode;
}

export const ClassPanel = (props: Props) => {
	return (
		<div className='class-panel'>
			<div className='header-text'>{props.heroClass.name}</div>
			<div className='description-text'>{props.heroClass.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div className='ds-text'>DETAILS</div>
					: null
			}
		</div>
	);
};
