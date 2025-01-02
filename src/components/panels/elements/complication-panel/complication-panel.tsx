import { Complication } from '../../../../models/complication';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';

import './complication-panel.scss';

interface Props {
	complication: Complication;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const ComplicationPanel = (props: Props) => {
	try {
		return (
			<div className='complication-panel' id={props.mode === PanelMode.Full ? props.complication.id : undefined}>
				<HeaderText level={1}>{props.complication.name || 'Unnamed Complication'}</HeaderText>
				{props.complication.description ? <div dangerouslySetInnerHTML={{ __html: Utils.makeHtml(props.complication.description) }} /> : null}
				{
					props.mode === PanelMode.Full ?
						props.complication.features.map(f => (
							<FeaturePanel key={f.id} feature={f} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
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
