import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Item } from '../../../../models/item';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';
import { Tag } from 'antd';

import './item-panel.scss';

interface Props {
	item: Item;
	mode?: PanelMode;
}

export const ItemPanel = (props: Props) => {
	try {
		return (
			<div className={props.mode === PanelMode.Full ? 'item-panel' : 'item-panel compact'} id={props.mode === PanelMode.Full ? props.item.id : undefined}>
				<HeaderText level={1} tags={[ props.item.type ]}>{props.item.name || 'Unnamed Item'}</HeaderText>
				<Markdown text={props.item.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<Field label='Keywords' value={props.item.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)} />
							<Markdown text={props.item.effect} />
							{
								props.item.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
									<div key={lvl.level}>
										<HeaderText>Level {lvl.level.toString()}</HeaderText>
										{lvl.features.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)}
									</div>
								))
							}
						</>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
