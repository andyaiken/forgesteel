import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Hero } from '@/models/hero';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';

import './perk-panel.scss';

interface Props {
	perk: Perk;
	sourcebooks: Sourcebook[];
	hero?: Hero;
	mode?: PanelMode;
}

export const PerkPanel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'perk-panel' : 'perk-panel compact'} id={props.mode === PanelMode.Full ? SheetFormatter.getPageId('perk', props.perk.id) : undefined}>
				<FeaturePanel feature={props.perk} hero={props.hero} sourcebooks={props.sourcebooks} mode={props.mode} />
			</div>
		</ErrorBoundary>
	);
};
