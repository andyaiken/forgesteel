import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Item } from '../../../models/item';
import { ItemType } from '../../../enums/item-type';
import { Markdown } from '../../controls/markdown/markdown';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { PanelMode } from '../../../enums/panel-mode';
import { Tag } from 'antd';
import { useState } from 'react';

import './inventory-panel.scss';

interface Props {
	item: Item;
	onChange: (item: Item) => void;
}

export const InventoryPanel = (props: Props) => {
	const [ item, setItem ] = useState<Item>(JSON.parse(JSON.stringify(props.item)) as Item);

	const setCount = (value: number) => {
		const copy = JSON.parse(JSON.stringify(item)) as Item;
		copy.count = value;
		if (props.onChange) {
			props.onChange(copy);
		}
		setItem(copy);
	};

	try {
		return (
			<div className='inventory-panel' id={props.item.id}>
				<HeaderText level={1} tags={[ props.item.type ]}>{props.item.name || 'Unnamed Item'}</HeaderText>
				<Markdown text={props.item.description} />
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
				{
					item.type !== ItemType.Artifact ?
						<NumberSpin min={1} label='Items' value={props.item.count} onChange={setCount} />
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
