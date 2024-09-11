import { Culture } from '../../../models/culture';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';

import './culture-panel.scss';

interface Props {
	culture: Culture;
	hero?: Hero;
	mode?: PanelMode;
}

export const CulturePanel = (props: Props) => {
	return (
		<div className='culture-panel'>
			<div className='header-text'>{props.culture.name}</div>
			<div className='description-text'>{props.culture.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div style={{ paddingTop: '10px' }}>
						<FeaturePanel feature={props.culture.environment} hero={props.hero} />
						<FeaturePanel feature={props.culture.organization} hero={props.hero} />
						<FeaturePanel feature={props.culture.upbringing} hero={props.hero} />
					</div>
					: null
			}
		</div>
	);
};
