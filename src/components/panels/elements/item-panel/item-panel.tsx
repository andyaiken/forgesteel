import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Item } from '../../../../models/item';
import { PanelMode } from '../../../../enums/panel-mode';
import { Utils } from '../../../../utils/utils';

import './item-panel.scss';

interface Props {
	item: Item;
	hero?: Hero;
	mode?: PanelMode;
}

export const ItemPanel = (props: Props) => {
	try {
		return (
			<div className='item-panel' id={props.mode === PanelMode.Full ? props.item.id : undefined}>
				<HeaderText level={1}>{props.item.name || 'Unnamed Item'}</HeaderText>
				{props.item.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.item.description) }} /> : null}
				{
					props.mode === PanelMode.Full ?
						props.item.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />)
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
