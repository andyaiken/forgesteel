import { Alert, Button, Divider, Segmented, Space, Tag } from 'antd';
import { Expander } from '../../../controls/expander/expander';
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
	showCustomizations?: boolean;
	mode?: PanelMode;
	onChange?: (item: Item) => void;
}

export const ItemPanel = (props: Props) => {
	const [ item, setItem ] = useState<Item>(Utils.copy(props.item));
	const [ customizationLevel, setCustomizationLevel ] = useState<number>(1);

	const toggleCustomization = (featureID: string) => {
		const copy = Utils.copy(item);
		copy.customizationsByLevel.forEach(lvl => {
			lvl.features.forEach(f => {
				if (f.feature.id === featureID) {
					f.selected = !f.selected;
				}
			});
		});
		if (props.onChange) {
			props.onChange(copy);
		}
		setItem(copy);
	};

	const setCount = (value: number) => {
		const copy = Utils.copy(item);
		copy.count = value;
		if (props.onChange) {
			props.onChange(copy);
		}
		setItem(copy);
	};

	const customizable = item.customizationsByLevel.flatMap(lvl => lvl.features).length > 0;

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
					item.customizationsByLevel
						.flatMap(lvl => lvl.features)
						.filter(f => f.selected)
						.map(f => f.feature)
						.map(f => (
							<div key={f.id} style={{ margin: '10px 0' }}>
								<FeaturePanel feature={f} mode={PanelMode.Full} />
								{
									props.onChange ?
										<Button block={true} onClick={() => toggleCustomization(f.id)}>Unselect</Button>
										: null
								}
							</div>
						))
				}
				{
					props.mode === PanelMode.Full ?
						<>
							{item.keywords.length > 0 ? <Field label='Keywords' value={item.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)} /> : null}
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
					props.showCustomizations ?
						props.item.customizationsByLevel.map(lvl => (
							<div key={lvl.level}>
								<HeaderText level={1}>Customization: Level {lvl.level}</HeaderText>
								{lvl.features.map(f => <FeaturePanel key={f.feature.id} feature={f.feature} mode={PanelMode.Full} />)}
							</div>
						))
						: null
				}
				{
					props.onChange && customizable ?
						<Expander title='Customization'>
							<Space direction='vertical' style={{ width: '100%' }}>
								<HeaderText>Customization</HeaderText>
								<Segmented
									name='levels'
									block={true}
									options={item.customizationsByLevel.map(lvl => ({ value: lvl.level, label: `Level ${lvl.level}` }))}
									value={customizationLevel}
									onChange={setCustomizationLevel}
								/>
								{
									item.customizationsByLevel
										.filter(lvl => lvl.level === customizationLevel)
										.flatMap(lvl => lvl.features)
										.map(f => (
											<div key={f.feature.id}>
												<FeaturePanel feature={f.feature} mode={PanelMode.Full} />
												{
													f.selected ?
														<Alert
															type='info'
															showIcon={true}
															message='This customization has been selected.'
														/>
														:
														<Button block={true} onClick={() => toggleCustomization(f.feature.id)}>Select</Button>
												}
											</div>
										))
								}
								{
									item.customizationsByLevel.filter(lvl => lvl.level === customizationLevel).flatMap(lvl => lvl.features).length === 0 ?
										<Alert
											type='warning'
											showIcon={true}
											message='No customizations for this level.'
										/>
										: null
								}
							</Space>
						</Expander>
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
