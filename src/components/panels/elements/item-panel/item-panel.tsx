import { Alert, Divider, Tag } from 'antd';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { Item } from '../../../../models/item';
import { ItemType } from '../../../../enums/item-type';
import { Markdown } from '../../../controls/markdown/markdown';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './item-panel.scss';

interface Props {
	item: Item;
	hero?: Hero;
	mode?: PanelMode;
	onChange?: (item: Item) => void;
}

export const ItemPanel = (props: Props) => {
	const [ item, setItem ] = useState<Item>(Utils.copy(props.item));

	const setCount = (value: number) => {
		const copy = Utils.copy(item);
		copy.count = value;
		if (props.onChange) {
			props.onChange(copy);
		}
		setItem(copy);
	};

	try {
		return (
			<div className={props.mode === PanelMode.Full ? 'item-panel' : 'item-panel compact'} id={props.mode === PanelMode.Full ? item.id : undefined}>
				<HeaderText level={1} tags={[ item.type ]}>{item.name || 'Unnamed Item'}</HeaderText>
				{
					props.hero && !HeroLogic.canUseItem(props.hero, item) ?
						<Alert
							type='warning'
							showIcon={true}
							message='Your kit does not allow you to use this item.'
						/>
						: null
				}
				<Markdown text={item.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<Field label='Keywords' value={item.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)} />
							<Markdown text={item.effect} />
							{
								item.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
									<div key={lvl.level}>
										<HeaderText>Level {lvl.level.toString()}</HeaderText>
										{lvl.features.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)}
									</div>
								))
							}
						</>
						: null
				}
				{
					props.onChange && (item.type !== ItemType.Artifact) ?
						<>
							<Divider />
							<NumberSpin min={1} label='Number' value={item.count} onChange={setCount} />
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
