import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Item } from '../../../../models/item';
import { ItemType } from '../../../../enums/item-type';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';
import { ProjectPanel } from '../project-panel/project-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { Tag } from 'antd';

import './item-panel.scss';

interface Props {
	item: Item;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const ItemPanel = (props: Props) => {
	try {
		return (
			<div className='item-panel' id={props.mode === PanelMode.Full ? props.item.id : undefined}>
				<HeaderText level={1} tags={[ props.item.type ]}>{props.item.name || 'Unnamed Item'}</HeaderText>
				<Markdown text={props.item.description} />
				{
					props.mode === PanelMode.Full ?
						<>
							<Field label='Keywords' value={props.item.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)} />
							{props.item.type === ItemType.Artifact ? null : <ProjectPanel project={props.item.crafting} mode={PanelMode.Full} />}
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
