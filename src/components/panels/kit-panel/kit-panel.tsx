import { Kit } from '../../../models/kit';
import { PanelMode } from '../../../enums/panel-mode';

import './kit-panel.scss';

interface Props {
	kit: Kit;
	mode?: PanelMode;
}

export const KitPanel = (props: Props) => {
	return (
		<div className='kit-panel'>
			<div className='header-text'>{props.kit.name}</div>
			<div className='description-text'>{props.kit.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div className='ds-text'>DETAILS</div>
					: null
			}
		</div>
	);
};
