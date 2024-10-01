import { Ancestry } from '../../../models/ancestry';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';

import './ancestry-panel.scss';

interface Props {
	ancestry: Ancestry;
	hero?: Hero;
	mode?: PanelMode;
}

export const AncestryPanel = (props: Props) => {
	try {
		return (
			<div className='ancestry-panel'>
				<HeaderText level={1}>{props.ancestry.name}</HeaderText>
				<div className='ds-text description-text'>{props.ancestry.description}</div>
				{
					props.mode === PanelMode.Full ?
						props.ancestry.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />)
						:
						<Field label='Features' value={props.ancestry.features.map(f => f.name).join(', ')} />
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
