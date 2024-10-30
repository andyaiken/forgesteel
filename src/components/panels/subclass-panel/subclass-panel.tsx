import { CampaignSetting } from '../../../models/campaign-setting';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';
import { Space } from 'antd';
import { SubClass } from '../../../models/class';

import './subclass-panel.scss';

interface Props {
	subclass: SubClass;
	hero?: Hero;
	campaignSettings?: CampaignSetting[];
	mode?: PanelMode;
}

export const SubclassPanel = (props: Props) => {
	try {
		return (
			<div className='subclass-panel' id={props.mode === PanelMode.Full ? props.subclass.id : undefined}>
				<HeaderText level={1}>{props.subclass.name || 'Unnamed Class'}</HeaderText>
				<div className='ds-text description-text'>{props.subclass.description}</div>
				{
					props.mode === PanelMode.Full ?
						props.subclass.featuresByLevel.map(lvl => (
							<Space key={lvl.level} direction='vertical'>
								<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
								{...lvl.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />)}
								{...lvl.optionalFeatures.map((opt, n) => (
									<div key={n}>
										<HeaderText>Optional: {opt.category}</HeaderText>
										{...opt.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />)}
									</div>
								))}
							</Space>
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
