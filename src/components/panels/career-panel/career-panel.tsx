import { CampaignSetting } from '../../../models/campaign-setting';
import { Career } from '../../../models/career';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';

import './career-panel.scss';

interface Props {
	career: Career;
	hero?: Hero;
	campaignSettings?: CampaignSetting[];
	mode?: PanelMode;
}

export const CareerPanel = (props: Props) => {
	try {
		return (
			<div className='career-panel' id={props.mode === PanelMode.Full ? props.career.id : undefined}>
				<HeaderText level={1}>{props.career.name}</HeaderText>
				<div className='ds-text description-text'>{props.career.description}</div>
				{
					props.mode === PanelMode.Full ?
						<div>
							{props.career.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />)}
							<FeaturePanel feature={props.career.title} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
