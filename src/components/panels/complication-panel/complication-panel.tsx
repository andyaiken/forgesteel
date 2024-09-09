import { Complication } from '../../../models/complication';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './complication-panel.scss';

interface Props {
	complication: Complication;
	mode?: PanelMode;
}

export const ComplicationPanel = (props: Props) => {
	return (
		<div className='complication-panel'>
			<div className='header-text'>{props.complication.name}</div>
			<div className='description-text'>{props.complication.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div>
						<FeaturePanel feature={props.complication.benefit} settingID='' />
						<FeaturePanel feature={props.complication.drawback} settingID='' />
					</div>
					: null
			}
		</div>
	);
};
