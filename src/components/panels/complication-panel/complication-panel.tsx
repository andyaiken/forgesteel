import { Complication } from '../../../models/complication';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';

import './complication-panel.scss';

interface Props {
	complication: Complication;
	hero?: Hero;
	mode?: PanelMode;
}

export const ComplicationPanel = (props: Props) => {
	try {
		return (
			<div className='complication-panel'>
				<HeaderText>{props.complication.name}</HeaderText>
				<div className='description-text'>{props.complication.description}</div>
				{
					props.mode === PanelMode.Full ?
						props.complication.features.map(f => (
							<FeaturePanel key={f.id} feature={f} hero={props.hero} />
						))
						: null
				}
			</div>
		);
	} catch {
		return null;
	}
};
