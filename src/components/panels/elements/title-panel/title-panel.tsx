import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Title } from '../../../../models/title';

import './title-panel.scss';

interface Props {
	title: Title;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const TitlePanel = (props: Props) => {
	try {
		return (
			<div className='title-panel' id={props.mode === PanelMode.Full ? props.title.id : undefined}>
				<HeaderText level={1}>{props.title.name || 'Unnamed Title'}</HeaderText>
				<Markdown text={props.title.description} />
				<Field label='Echelon' value={props.title.echelon} />
				<Field label='Prerequisites' value={props.title.prerequisites} />
				{
					props.mode === PanelMode.Full ?
						props.title.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
