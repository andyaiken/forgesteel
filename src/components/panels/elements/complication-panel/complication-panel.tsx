import { Complication } from '../../../../models/complication';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Markdown } from '../../../controls/markdown/markdown';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';

import './complication-panel.scss';

interface Props {
	complication: Complication;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const ComplicationPanel = (props: Props) => {
	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'complication-panel' : 'complication-panel compact'} id={props.mode === PanelMode.Full ? props.complication.id : undefined}>
					<HeaderText level={1}>{props.complication.name || 'Unnamed Complication'}</HeaderText>
					<Markdown text={props.complication.description} />
					{
						props.mode === PanelMode.Full ?
							props.complication.features.map(f => (
								<FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
							))
							: null
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
