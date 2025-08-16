import { Alert, Button, Divider, Space, Tag } from 'antd';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FeatureConfigPanel } from '../../feature-config-panel/feature-config-panel';
import { FeatureData } from '../../../../models/feature';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { Imbuement } from '../../../../models/imbuement';
import { Item } from '../../../../models/item';
import { ItemType } from '../../../../enums/item-type';
import { Markdown } from '../../../controls/markdown/markdown';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './item-panel.scss';

interface Props {
	item: Item;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	onChange?: (item: Item) => void;
}

export const ItemPanel = (props: Props) => {
	const [ item, setItem ] = useState<Item>(Utils.copy(props.item));

	const addImbuement = (imbuement: Imbuement) => {
		const copy = Utils.copy(item);
		copy.imbuements.push(imbuement);
		if (props.onChange) {
			props.onChange(copy);
		}
		setItem(copy);
	};

	const removeImbuement = (featureID: string) => {
		const copy = Utils.copy(item);
		copy.imbuements = copy.imbuements.filter(imbuement => imbuement.feature.id !== featureID);
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

	const setFeatureData = (featureID: string, data: FeatureData) => {
		const copy = Utils.copy(item);
		const feature = copy.imbuements
			.map(f => f.feature)
			.find(f => f.id === featureID);
		if (feature) {
			feature.data = data;
		}
		if (props.onChange) {
			props.onChange(copy);
		}
		setItem(copy);
	};

	const getAvailableImbuements = () => {
		const selectedNames = item.imbuements.map(imbuement => imbuement.feature.name.toLowerCase());
		const selectedLvl1 = item.imbuements.filter(imbuement => imbuement.level === 1);
		const selectedLvl5 = item.imbuements.filter(imbuement => imbuement.level === 5);
		const selectedLvl9 = item.imbuements.filter(imbuement => imbuement.level === 9);

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

		const options = SourcebookLogic.getImbuements(props.sourcebooks ?? [])
			.filter(imbuement => {
				if (imbuement.level !== level || imbuement.type !== item.type) {
					return false;
				}

				const featureName = imbuement.feature.name.toLowerCase();

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
							<FeaturePanel feature={f.feature} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
							<Button block={true} onClick={() => addImbuement(f)}>Select</Button>
						</div>
					))
				}
				{
					options.length === 0 ?
						<Empty text='No imbuements are available.' />
						: null
				}
			</Space>
		);
	};

	const imbueable = item.type === ItemType.ImbuedArmor || item.type === ItemType.ImbuedImplement || item.type === ItemType.ImbuedWeapon;

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
						item.imbuements
							.map(f => f.feature)
							.map(f => (
								<div key={f.id} style={{ margin: '10px 0' }}>
									<FeatureConfigPanel feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} setData={setFeatureData} />
									{
										props.onChange ?
											<Button block={true} onClick={() => removeImbuement(f.id)}>Unselect</Button>
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
						props.onChange && imbueable ?
							<Expander title='Imbue'>
								{getAvailableImbuements()}
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
