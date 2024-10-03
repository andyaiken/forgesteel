import { CampaignSetting } from '../../../models/campaign-setting';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroClass } from '../../../models/class';
import { PanelMode } from '../../../enums/panel-mode';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass;
	hero?: Hero;
	campaignSettings?: CampaignSetting[];
	mode?: PanelMode;
}

export const ClassPanel = (props: Props) => {
	try {
		return (
			<div className='class-panel' id={props.mode === PanelMode.Full ? props.heroClass.id : undefined}>
				<HeaderText level={1}>{props.heroClass.name}</HeaderText>
				<div className='ds-text description-text'>{props.heroClass.description}</div>
				<Field label='Heroic Resource' value={props.heroClass.heroicResource} />
				<Field label={`${props.heroClass.subclassName}s`} value={props.heroClass.subclasses.map(c => c.name).join(', ')} />
				<Field label='Primary Characteristics' value={props.heroClass.primaryCharacteristics.join(', ')} />
				{
					props.mode === PanelMode.Full ?
						props.heroClass.featuresByLevel.map(lvl => (
							<div key={lvl.level} className='level-details'>
								<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
								{
									lvl.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />)
								}
							</div>
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
