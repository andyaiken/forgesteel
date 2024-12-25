import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';

import './perk-panel.scss';

interface Props {
	perk: Perk;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const PerkPanel = (props: Props) => {
	try {
		return (
			<div className='perk-panel' id={props.mode === PanelMode.Full ? props.perk.id : undefined}>
				<HeaderText level={1} tags={[ props.perk.type ]}>{props.perk.name || 'Unnamed Perk'}</HeaderText>
				{props.perk.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.perk.description) }} /> : null}
				{
					props.mode === PanelMode.Full ?
						props.perk.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
