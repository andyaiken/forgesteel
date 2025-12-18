import { Alert, Button, Divider, Drawer, Segmented, Space } from 'antd';
import { CSSProperties, useState } from 'react';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureConfigPanel } from '@/components/panels/feature-config-panel/feature-config-panel';
import { FeatureData } from '@/models/feature';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Imbuement } from '@/models/imbuement';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { PlusOutlined } from '@ant-design/icons';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { Utils } from '@/utils/utils';

import './item-panel.scss';

interface Props {
	item: Item;
	sourcebooks: Sourcebook[];
	options: Options;
	wielder?: Hero;
	mode?: PanelMode;
	style?: CSSProperties;
	onChange?: (item: Item) => void;
}

export const ItemPanel = (props: Props) => {
	const [ item, setItem ] = useState<Item>(Utils.copy(props.item));
	const [ page, setPage ] = useState<string>('overview');
	const [ imbuementsOpen, setImbuementsOpen ] = useState<boolean>(false);

	const getOverview = () => {
		const setCount = (value: number) => {
			const copy = Utils.copy(item);
			copy.count = value;
			if (props.onChange) {
				props.onChange(copy);
			}
			setItem(copy);
		};

		return (
			<>
				{
					props.wielder && !HeroLogic.canUseItem(props.wielder, item) ?
						<Alert
							type='warning'
							showIcon={true}
							title='Your kit does not allow you to use this item.'
						/>
						: null
				}
				<Markdown text={item.description} />
				{
					props.onChange && (item.type !== ItemType.Artifact) ?
						<>
							<Divider />
							<NumberSpin min={1} label='Number' value={item.count} onChange={setCount} />
						</>
						: null
				}
			</>
		);
	};

	const getFeatures = () => {
		return (
			<>
				<Markdown text={item.effect} />
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						item.featuresByLevel
							.filter(lvl => lvl.features.length > 0)
							.map(lvl => (
								<Expander key={lvl.level} title={`Level ${lvl.level.toString()}`}>
									{
										lvl.features.map(f => (
											<FeaturePanel
												key={f.id}
												feature={f}
												options={props.options}
												mode={PanelMode.Full}
											/>
										))
									}
								</Expander>
							))
					}
				</Space>
			</>
		);
	};

	const getImbuements = () => {
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
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						options.map(f => (
							<SelectablePanel key={f.feature.id} onSelect={() => addImbuement(f)}>
								<FeaturePanel feature={f.feature} options={props.options} hero={props.wielder} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
							</SelectablePanel>
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

		return (
			<>
				<HeaderText
					level={1}
					extra={
						props.onChange ?
							<Button type='text' icon={<PlusOutlined />} onClick={() => setImbuementsOpen(true)} />
							: null
					}
				>
					Imbuements
				</HeaderText>
				{
					item.imbuements
						.map(f => f.feature)
						.map(f => (
							<FeatureConfigPanel
								key={f.id}
								feature={f}
								options={props.options}
								hero={props.wielder!}
								sourcebooks={props.sourcebooks}
								setData={setFeatureData}
								onDelete={props.onChange ? () => removeImbuement(f.id) : undefined}
							/>
						))
				}
				{
					item.imbuements.length === 0 ?
						<Empty />
						: null
				}
				<Drawer open={imbuementsOpen} onClose={() => setImbuementsOpen(false)} closeIcon={null} size={500}>
					<Modal
						content={
							<div style={{ padding: '20px' }}>
								{getAvailableImbuements()}
							</div>
						}
						onClose={() => setImbuementsOpen(false)}
					/>
				</Drawer>
			</>
		);
	};

	const getCrafting = () => {
		if (!item.crafting) {
			return null;
		}

		return (
			<ProjectPanel project={item.crafting} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
		);
	};

	const getContent = () => {
		let content = null;
		switch (page) {
			case 'overview':
				content = getOverview();
				break;
			case 'features':
				content = getFeatures();
				break;
			case 'imbuements':
				content = getImbuements();
				break;
			case 'crafting':
				content = getCrafting();
				break;
		}

		const pages = [
			{ value: 'overview', label: 'Overview' },
			{ value: 'features', label: 'Features' }
		];
		const imbueable = item.type === ItemType.ImbuedArmor || item.type === ItemType.ImbuedImplement || item.type === ItemType.ImbuedWeapon;
		if (imbueable) {
			pages.push({ value: 'imbuements', label: 'Imbuements' });
		}
		if (item.crafting) {
			pages.push({ value: 'crafting', label: 'Crafting' });
		}

		return (
			<>
				<Segmented
					style={{ marginBottom: '20px' }}
					block={true}
					options={pages}
					value={page}
					onChange={setPage}
					onClick={e => e.stopPropagation()}
				/>
				{content}
			</>
		);
	};

	const tags: string[] = [ item.type, ...item.keywords ];
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getItemSourcebook(props.sourcebooks, item)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='item-panel compact' style={props.style}>
				<HeaderText level={1} tags={tags}>
					{item.name || 'Unnamed Item'}
				</HeaderText>
				<Markdown text={item.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='item-panel' id={SheetFormatter.getPageId('item', item.id)} style={props.style}>
				<HeaderText level={1} tags={tags}>
					{item.name || 'Unnamed Item'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
