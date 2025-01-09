import { FeaturePanel } from '../feature-panel/feature-panel';
import { Hero } from '../../../../models/hero';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { Sourcebook } from '../../../../models/sourcebook';

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
			<div key={props.perk.id} className='perk-panel'>
				<FeaturePanel feature={props.perk} hero={props.hero} sourcebooks={props.sourcebooks} mode={props.mode} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
