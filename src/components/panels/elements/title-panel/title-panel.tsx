import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { PanelMode } from '../../../../enums/panel-mode';
import { Title } from '../../../../models/title';
import { Utils } from '../../../../utils/utils';

import './title-panel.scss';

interface Props {
	title: Title;
	hero?: Hero;
	mode?: PanelMode;
}

export const TitlePanel = (props: Props) => {
	try {
		return (
			<div className='title-panel' id={props.mode === PanelMode.Full ? props.title.id : undefined}>
				<HeaderText level={1}>{props.title.name || 'Unnamed Title'}</HeaderText>
				{props.title.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.title.description) }} /> : null}
				<Field label='Echelon' value={props.title.echelon} />
				<Field label='Prerequisites' value={props.title.prerequisites} />
				{
					props.mode === PanelMode.Full ?
						props.title.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />)
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
