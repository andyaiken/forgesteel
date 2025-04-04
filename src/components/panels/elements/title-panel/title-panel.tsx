import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Markdown } from '../../../controls/markdown/markdown';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Title } from '../../../../models/title';

import './title-panel.scss';

interface Props {
	title: Title;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const TitlePanel = (props: Props) => {
	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'title-panel' : 'title-panel compact'} id={props.mode === PanelMode.Full ? props.title.id : undefined}>
					<HeaderText level={1}>{props.title.name || 'Unnamed Title'}</HeaderText>
					<Markdown text={props.title.description} />
					{props.mode === PanelMode.Full ? <Field label='Echelon' value={props.title.echelon} /> : null}
					{props.mode === PanelMode.Full ? <Field label='Prerequisites' value={props.title.prerequisites} /> : null}
					{
						props.mode === PanelMode.Full ?
							<div className='features'>
								{
									props.title.features.map(f => (
										<FeaturePanel
											key={f.id}
											feature={f}
											options={props.options}
											hero={props.hero}
											sourcebooks={props.sourcebooks}
											mode={PanelMode.Full}
										/>
									))
								}
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
