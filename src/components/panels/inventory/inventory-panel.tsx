import { Alert, Divider, Tag } from 'antd';
import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Item } from '../../../models/item';
import { ItemType } from '../../../enums/item-type';
import { Markdown } from '../../controls/markdown/markdown';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { PanelMode } from '../../../enums/panel-mode';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './inventory-panel.scss';

interface Props {
	item: Item;
	hero: Hero;
	onChange: (item: Item) => void;
}

export const InventoryPanel = (props: Props) => {
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
			<div className='inventory-panel' id={props.item.id}>
				<HeaderText level={1} tags={[ props.item.type ]}>{props.item.name || 'Unnamed Item'}</HeaderText>
				{
					HeroLogic.canUseItem(props.hero, item) ?
						null :
						<Alert
							type='warning'
							showIcon={true}
							message='Your kit does not allow you to use this item.'
						/>
				}
				<Markdown text={props.item.description} />
				<Field label='Keywords' value={props.item.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)} />
				<Markdown text={props.item.effect} />
				{
					props.item.featuresByLevel
						.filter(lvl => lvl.features.length > 0)
						.map(lvl => (
							<div key={lvl.level}>
								<HeaderText>Level {lvl.level.toString()}</HeaderText>
								{lvl.features.map(f => <FeaturePanel key={f.id} feature={f} mode={PanelMode.Full} />)}
							</div>
						))
				}
				{
					item.type !== ItemType.Artifact ?
						<>
							<Divider />
							<NumberSpin min={1} label='Items' value={props.item.count} onChange={setCount} />
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
