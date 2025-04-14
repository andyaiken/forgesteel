import { Alert, Button, Divider, Space, Tag } from 'antd';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
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
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './item-panel.scss';

interface Props {
	item: Item;
	options: Options;
	hero?: Hero;
	showCustomizations?: boolean;
	mode?: PanelMode;
	onChange?: (item: Item) => void;
}

export const ItemPanel = (props: Props) => {
	const [ item, setItem ] = useState<Item>(Utils.copy(props.item));

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

	const getAvailableCustomizations = () => {
		const selectedNames = item.customizationsByLevel.flatMap(lvl => lvl.features).filter(f => f.selected).map(f => f.feature.name.toLowerCase());
		const selectedLvl1 = item.customizationsByLevel.filter(lvl => lvl.level === 1).flatMap(lvl => lvl.features).filter(f => f.selected);
		const selectedLvl5 = item.customizationsByLevel.filter(lvl => lvl.level === 5).flatMap(lvl => lvl.features).filter(f => f.selected);
		const selectedLvl9 = item.customizationsByLevel.filter(lvl => lvl.level === 9).flatMap(lvl => lvl.features).filter(f => f.selected);

		let level = 0;
		if ((selectedLvl1.length === 0) && (selectedLvl5.length === 0) && (selectedLvl9.length === 0)) {
			level = 1;
		}

		if ((selectedLvl1.length > 0) && (selectedLvl5.length === 0) && (selectedLvl9.length === 0)) {
			level = 5;
		}

		if ((selectedLvl1.length > 0) && (selectedLvl5.length > 0) && (selectedLvl9.length === 0)) {
			level = 9;
		}

		const options = item.customizationsByLevel
			.filter(lvl => lvl.level === level)
			.flatMap(lvl => lvl.features)
			.filter(f => {
				const featureName = f.feature.name.toLowerCase();

				if (featureName.endsWith(' iii')) {
					const index = featureName.lastIndexOf(' ');
					const start = featureName.substring(0, index);
					return selectedNames.some(name => name === `${start} ii`);
				}

				if (featureName.endsWith(' ii')) {
					const index = featureName.lastIndexOf(' ');
					const start = featureName.substring(0, index);
					return selectedNames.some(name => name === `${start} i`);
				}

				return true;
			});

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					options.map(f => (
						<div key={f.feature.id}>
							<FeaturePanel feature={f.feature} options={props.options} mode={PanelMode.Full} />
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
					options.length === 0 ?
						<Empty text='No customizations are available.' />
						: null
				}
			</Space>
		);
	};

	const customizable = item.customizationsByLevel.flatMap(lvl => lvl.features).length > 0;

	try {
		return (
			<ErrorBoundary>
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
									<FeaturePanel feature={f} options={props.options} mode={PanelMode.Full} />
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
											{lvl.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} mode={PanelMode.Full} />)}
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
									{lvl.features.map(f => <FeaturePanel key={f.feature.id} feature={f.feature} options={props.options} mode={PanelMode.Full} />)}
								</div>
							))
							: null
					}
					{
						props.onChange && customizable ?
							<Expander title='Customization'>
								{getAvailableCustomizations()}
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
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
