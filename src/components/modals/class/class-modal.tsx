import { ClassPanel } from '../../panels/class-panel/class-panel';
import { HeroClass } from '../../../models/class';
import { PanelMode } from '../../../enums/panel-mode';

import './class-modal.scss';

interface Props {
	heroClass: HeroClass;
}

export const ClassModal = (props: Props) => {
	try {
		return (
			<div className='class-modal'>
				<ClassPanel heroClass={props.heroClass} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
