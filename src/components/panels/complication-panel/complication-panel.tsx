import { CampaignSetting } from '../../../models/campaign-setting';
import { Complication } from '../../../models/complication';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';

import './complication-panel.scss';

interface Props {
	complication: Complication;
	hero?: Hero;
	campaignSettings?: CampaignSetting[];
	mode?: PanelMode;
}

export const ComplicationPanel = (props: Props) => {
	try {
		return (
			<div className='complication-panel' id={props.mode === PanelMode.Full ? props.complication.id : undefined}>
				<HeaderText level={1}>{props.complication.name}</HeaderText>
				<div className='ds-text description-text'>{props.complication.description}</div>
				{
					props.mode === PanelMode.Full ?
						props.complication.features.map(f => (
							<FeaturePanel key={f.id} feature={f} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />
						))
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
