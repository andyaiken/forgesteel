import { Culture } from '../../../../models/culture';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Markdown } from '../../../controls/markdown/markdown';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';

import './culture-panel.scss';

interface Props {
	culture: Culture;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const CulturePanel = (props: Props) => {
	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'culture-panel' : 'culture-panel compact'} id={props.mode === PanelMode.Full ? props.culture.id : undefined}>
					<HeaderText level={1}>{props.culture.name || 'Unnamed Culture'}</HeaderText>
					<Markdown text={props.culture.description} />
					{
						props.mode === PanelMode.Full ?
							<div style={{ paddingTop: '10px' }}>
								{props.culture.environment ? <FeaturePanel feature={props.culture.environment} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} /> : null}
								{props.culture.organization ? <FeaturePanel feature={props.culture.organization} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} /> : null}
								{props.culture.upbringing ? <FeaturePanel feature={props.culture.upbringing} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} /> : null}
							</div>
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
