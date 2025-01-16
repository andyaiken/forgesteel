import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Item } from '../../../../models/item';
import { ItemType } from '../../../../enums/item-type';
import { Markdown } from '../../../controls/markdown/markdown';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { ProjectPanel } from '../project-panel/project-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { Tag } from 'antd';
import { useState } from 'react';

import './item-panel.scss';

interface Props {
	item: Item;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	showCrafting?: boolean;
	onChange?: (item: Item) => void;
}

export const ItemPanel = (props: Props) => {
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
			<div className={props.mode === PanelMode.Full ? 'item-panel' : 'item-panel compact'} id={props.mode === PanelMode.Full ? props.item.id : undefined}>
				<HeaderText level={1} tags={[ props.item.type ]}>{props.item.name || 'Unnamed Item'}</HeaderText>
				<Markdown text={props.item.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<Field label='Keywords' value={props.item.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)} />
							{props.showCrafting && (props.item.type !== ItemType.Artifact) ? <ProjectPanel project={props.item.crafting} mode={PanelMode.Full} /> : null}
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
								props.onChange ?
									<NumberSpin min={0} label='Number' value={props.item.count} onChange={setCount} />
									: null
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
