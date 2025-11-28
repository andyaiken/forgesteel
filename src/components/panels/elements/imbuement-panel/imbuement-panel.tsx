import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Imbuement } from '@/models/imbuement';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';

import './imbuement-panel.scss';

interface Props {
	imbuement: Imbuement;
	sourcebooks: Sourcebook[];
	options: Options;
	hero?: Hero;
	mode?: PanelMode;
	onChange?: (imbuement: Imbuement) => void;
}

export const ImbuementPanel = (props: Props) => {
	const tags = [ `Level ${props.imbuement.level}` ];
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getImbuementSourcebook(props.sourcebooks, props.imbuement)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'imbuement-panel' : 'imbuement-panel compact'} id={props.mode === PanelMode.Full ? SheetFormatter.getPageId('imbuement', props.imbuement.id) : undefined}>
				<HeaderText
					level={1}
					tags={tags}
				>
					{props.imbuement.name || 'Unnamed Imbuement'}
				</HeaderText>
				<Field label='Applies to' value={props.imbuement.type} />
				<div className='features'>
					<FeaturePanel
						key={props.imbuement.feature.id}
						feature={props.imbuement.feature}
						options={props.options}
						hero={props.hero}
						sourcebooks={props.sourcebooks}
						mode={PanelMode.Full}
					/>
				</div>
				{
					props.imbuement.crafting ?
						<Expander title='Crafting'>
							<ProjectPanel project={props.imbuement.crafting} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
						</Expander>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
