import { Alert, Tag } from 'antd';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { Item } from '../../../../models/item';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';

import './item-panel.scss';

interface Props {
	item: Item;
	hero?: Hero;
	mode?: PanelMode;
}

export const ItemPanel = (props: Props) => {
	try {
		return (
			<div className={props.mode === PanelMode.Full ? 'item-panel' : 'item-panel compact'} id={props.mode === PanelMode.Full ? props.item.id : undefined}>
				<HeaderText level={1} tags={[ props.item.type ]}>{props.item.name || 'Unnamed Item'}</HeaderText>
				{
					props.hero && HeroLogic.canUseItem(props.hero, props.item) ?
						null :
						<Alert
							type='warning'
							showIcon={true}
							message='Your kit does not allow you to use this item.'
						/>
				}
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
