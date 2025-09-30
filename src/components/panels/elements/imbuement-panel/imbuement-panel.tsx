import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Imbuement } from '@/models/imbuement';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';

import './imbuement-panel.scss';

interface Props {
	imbuement: Imbuement;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	onChange?: (imbuement: Imbuement) => void;
}

export const ImbuementPanel = (props: Props) => {
	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'imbuement-panel' : 'imbuement-panel compact'} id={props.mode === PanelMode.Full ? props.imbuement.id : undefined}>
					<HeaderText
						level={1}
						tags={[ `Level ${props.imbuement.level}` ]}
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
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
