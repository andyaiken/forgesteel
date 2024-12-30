import { FeaturePanel } from '../feature-panel/feature-panel';
import { Hero } from '../../../../models/hero';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';

import './perk-panel.scss';

interface Props {
	perk: Perk;
	hero?: Hero;
	mode?: PanelMode;
}

export const PerkPanel = (props: Props) => {
	try {
		return (
			<div key={props.perk.id} className='perk-panel'>
				<FeaturePanel feature={props.perk} hero={props.hero} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
