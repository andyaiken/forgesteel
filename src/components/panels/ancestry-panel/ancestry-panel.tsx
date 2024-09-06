import { Ancestry } from '../../../models/ancestry';
import { PanelMode } from '../../../enums/panel-mode';

import './ancestry-panel.scss';

interface Props {
	ancestry: Ancestry;
	mode?: PanelMode;
}

export const AncestryPanel = (props: Props) => {
	return (
		<div className='ancestry-panel'>
			<div className='header-text'>{props.ancestry.name}</div>
			<div className='description-text'>{props.ancestry.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div className='ds-text'>DETAILS</div>
					: null
			}
		</div>
	);
};
