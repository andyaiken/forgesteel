import { CampaignSetting } from '../../../models/campaign-setting';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';
import { Perk } from '../../../models/perk';

import './perk-panel.scss';

interface Props {
	perk: Perk;
	hero?: Hero;
	campaignSettings?: CampaignSetting[];
	mode?: PanelMode;
}

export const PerkPanel = (props: Props) => {
	try {
		return (
			<div className='perk-panel' id={props.mode === PanelMode.Full ? props.perk.id : undefined}>
				<HeaderText level={1} tags={[ props.perk.type ]}>{props.perk.name || 'Unnamed Perk'}</HeaderText>
				<div className='ds-text description-text'>{props.perk.description}</div>
				{
					props.mode === PanelMode.Full ?
						props.perk.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />)
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
