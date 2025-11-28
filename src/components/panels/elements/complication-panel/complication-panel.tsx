import { Complication } from '@/models/complication';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';

import './complication-panel.scss';

interface Props {
	complication: Complication;
	sourcebooks: Sourcebook[];
	options: Options;
	hero?: Hero;
	mode?: PanelMode;
}

export const ComplicationPanel = (props: Props) => {
	const tags = [];
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getComplicationSourcebook(props.sourcebooks, props.complication)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'complication-panel' : 'complication-panel compact'} id={props.mode === PanelMode.Full ? SheetFormatter.getPageId('complication', props.complication.id) : undefined}>
				<HeaderText level={1} tags={tags}>
					{props.complication.name || 'Unnamed Complication'}
				</HeaderText>
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
};
