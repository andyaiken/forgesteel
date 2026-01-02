import { Button, Segmented, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Feature, FeatureChoice } from '@/models/feature';
import { SearchBox, TextInput } from '@/components/controls/text-input/text-input';
import { Ancestry } from '@/models/ancestry';
import { AncestryLogic } from '@/logic/ancestry-logic';
import { AncestryPanel } from '@/components/panels/elements/ancestry-panel/ancestry-panel';
import { Collections } from '@/utils/collections';
import { Culture } from '@/models/culture';
import { CultureEditPanel } from '@/components/panels/edit/culture-edit/culture-edit-panel';
import { CultureType } from '@/enums/culture-type';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './ancestry-edit-panel.scss';

interface Props {
	ancestry: Ancestry;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (ancestry: Ancestry) => void;
}

export const AncestryEditPanel = (props: Props) => {
	const [ ancestry, setAncestry ] = useState<Ancestry>(props.ancestry);
	const [ featureCost, setFeatureCost ] = useState<number>(0);
	const [ featureSearch, setFeatureSearch ] = useState<string>('');

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(ancestry);
			copy.name = value;
			setAncestry(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(ancestry);
			copy.description = value;
			setAncestry(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<TextInput
						status={ancestry.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={ancestry.name}
						onChange={setName}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={ancestry.description} onChange={setDescription} />
			</Space>
		);
	};

	const getSignatureEditSection = () => {
		const addFeature = () => {
			const copy = Utils.copy(ancestry);
			copy.features.push(FactoryLogic.feature.create({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setAncestry(copy);
			props.onChange(copy);
		};

		const changeFeature = (feature: Feature) => {
			const copy = Utils.copy(ancestry);
			const index = copy.features.findIndex(f => f.id === feature.id);
			if (index !== -1) {
				copy.features[index] = feature;
			}
			setAncestry(copy);
			props.onChange(copy);
		};

		const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
			const copy = Utils.copy(ancestry);
			const index = copy.features.findIndex(f => f.id === feature.id);
			copy.features = Collections.move(copy.features, index, direction);
			setAncestry(copy);
			props.onChange(copy);
		};

		const deleteFeature = (feature: Feature) => {
			const copy = Utils.copy(ancestry);
			copy.features = copy.features.filter(f => f.id !== feature.id);
			setAncestry(copy);
			props.onChange(copy);
		};

		const features = AncestryLogic.getSignatureFeatures(ancestry);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addFeature} />
					}
				>
					Signature Traits
				</HeaderText>
				{
					features.map(f => (
						<Expander
							key={f.id}
							title={f.name || 'Unnamed Feature'}
							tags={[ FeatureLogic.getFeatureTag(f) ]}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(f); }} />
							]}
						>
							<FeatureEditPanel
								feature={f}
								sourcebooks={props.sourcebooks}
								options={props.options}
								onChange={changeFeature}
							/>
						</Expander>
					))
				}
				{
					features.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getPurchasedEditSection = () => {
		const choiceFeature = ancestry.features.find(AncestryLogic.isPurchasedFeature);
		if (!choiceFeature) {
			return null;
		}

		const setAncestryPoints = (value: number) => {
			const copy = Utils.copy(ancestry);
			copy.ancestryPoints = value;
			setAncestry(copy);
			props.onChange(copy);
		};

		const addFeature = () => {
			const copy = Utils.copy(ancestry);
			const choice = copy.features.find(f => f.id === choiceFeature.id);
			if (choice) {
				(choice as FeatureChoice).data.options.push({
					feature: FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					}),
					value: 1
				});
				setAncestry(copy);
				props.onChange(copy);
			}
		};

		const changeFeature = (f: { feature: Feature, value: number }) => {
			const copy = Utils.copy(ancestry);
			const choice = copy.features.find(x => x.id === choiceFeature.id);
			if (choice) {
				const index = (choice as FeatureChoice).data.options.findIndex(x => x.feature.id === f.feature.id);
				if (index !== -1) {
					(choice as FeatureChoice).data.options[index] = f;
				}
				setAncestry(copy);
				props.onChange(copy);
			}
		};

		const moveFeature = (featureID: string, direction: 'up' | 'down') => {
			const copy = Utils.copy(ancestry);
			const choice = copy.features.find(x => x.id === choiceFeature.id);
			if (choice) {
				const index = (choice as FeatureChoice).data.options.findIndex(f => f.feature.id === featureID);
				(choice as FeatureChoice).data.options = Collections.move((choice as FeatureChoice).data.options, index, direction);
				setAncestry(copy);
				props.onChange(copy);
			}
		};

		const deleteFeature = (featureID: string) => {
			const copy = Utils.copy(ancestry);
			const choice = copy.features.find(x => x.id === choiceFeature.id);
			if (choice) {
				(choice as FeatureChoice).data.options = (choice as FeatureChoice).data.options.filter(f => f.feature.id !== featureID);
				setAncestry(copy);
				props.onChange(copy);
			}
		};

		const features = AncestryLogic.getPurchasedFeatures(ancestry);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Ancestry Points</HeaderText>
				<NumberSpin min={1} value={ancestry.ancestryPoints} onChange={setAncestryPoints} />
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addFeature} />
					}
				>
					Purchased Traits
				</HeaderText>
				{
					features.map(f => (
						<Expander
							key={f.feature.id}
							title={f.feature.name || 'Unnamed Feature'}
							tags={[ FeatureLogic.getFeatureTag(f.feature) ]}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f.feature.id, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(f.feature.id, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(f.feature.id); }} />
							]}
						>
							<HeaderText>Cost</HeaderText>
							<NumberSpin min={1} max={2} value={f.value} onChange={v => changeFeature({ feature: f.feature, value: v })} />
							<FeatureEditPanel
								feature={f.feature}
								sourcebooks={props.sourcebooks}
								options={props.options}
								onChange={x => changeFeature({ feature: x, value: f.value })}
							/>
						</Expander>
					))
				}
				{
					features.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getCultureEditSection = () => {
		const setHasCulture = (value: boolean) => {
			const copy = Utils.copy(ancestry);
			copy.culture = value ? FactoryLogic.createCulture(ancestry.name, '', CultureType.Ancestral) : undefined;
			setAncestry(copy);
			props.onChange(copy);
		};

		const setCulture = (value: Culture) => {
			const copy = Utils.copy(ancestry);
			copy.culture = value;
			setAncestry(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Culture</HeaderText>
				<Toggle label='Include a culture' value={!!ancestry.culture} onChange={setHasCulture} />
				{
					ancestry.culture ?
						<CultureEditPanel culture={ancestry.culture} sourcebooks={props.sourcebooks} onChange={setCulture} />
						: null
				}
			</Space>
		);
	};

	const getCherryPick = () => {
		const cherryPick = (feature: Feature, value: number) => {
			const copy = Utils.copy(ancestry);
			const featureCopy = Utils.copy(feature);
			if (value === 0) {
				// Signature
				copy.features.push(featureCopy);
			} else {
				// Purchased
				const f = copy.features.find(AncestryLogic.isPurchasedFeature);
				if (f) {
					(f as FeatureChoice).data.options.push({ feature: featureCopy, value: value });
				}
			}
			setAncestry(copy);
			props.onChange(copy);
		};

		const currentFeatureNames = [
			...AncestryLogic.getSignatureFeatures(ancestry).map(f => f.name),
			...AncestryLogic.getPurchasedFeatures(ancestry).map(f => f.feature.name)
		];

		const availableSignatureFeatures = SourcebookLogic.getAncestries(props.sourcebooks).flatMap(AncestryLogic.getSignatureFeatures).filter(f => !currentFeatureNames.includes(f.name)).map(f => ({ feature: f, value: 0 }));
		const availablePurchasedFeatures = SourcebookLogic.getAncestries(props.sourcebooks).flatMap(AncestryLogic.getPurchasedFeatures).filter(f => !currentFeatureNames.includes(f.feature.name));

		const features = Collections.sort(
			Collections.distinct(
				[
					...availableSignatureFeatures,
					...availablePurchasedFeatures
				],
				f => f.feature.name
			),
			f => f.feature.name
		);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<Segmented
					block={true}
					options={[
						{ value: 0, label: 'Signature' },
						{ value: 1, label: '1pt' },
						{ value: 2, label: '2pt' }
					]}
					value={featureCost}
					onChange={setFeatureCost}
				/>
				<SearchBox searchTerm={featureSearch} setSearchTerm={setFeatureSearch} />
				{
					features
						.filter(f => f.value === featureCost)
						.filter(f => Utils.textMatches([ f.feature.name ], featureSearch))
						.map(f => (
							<SelectablePanel
								key={f.feature.id}
								action={
									<Button
										onClick={e => {
											e.stopPropagation();
											cherryPick(f.feature, f.value);
										}}
									>
										Import
									</Button>
								}
							>
								<FeaturePanel
									feature={f.feature}
									cost={f.value || 'signature'}
									sourcebooks={props.sourcebooks}
									options={props.options}
									mode={PanelMode.Full}
								/>
							</SelectablePanel>
						))
				}
			</Space>
		);
	};

	return (
		<ErrorBoundary>
			<div className='ancestry-edit-panel'>
				<div className='ancestry-workspace-column'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Ancestry',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Signature Traits',
								children: getSignatureEditSection()
							},
							{
								key: '3',
								label: 'Purchased Traits',
								children: getPurchasedEditSection()
							},
							{
								key: '4',
								label: 'Culture',
								children: getCultureEditSection()
							}
						]}
					/>
				</div>
				<div className='ancestry-preview-column'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Preview',
								children: (
									<SelectablePanel>
										<AncestryPanel
											ancestry={ancestry}
											sourcebooks={props.sourcebooks}
											options={props.options}
											mode={PanelMode.Full}
										/>
									</SelectablePanel>
								)
							},
							{
								key: '2',
								label: 'Cherry Pick',
								children: getCherryPick()
							}
						]}
					/>
				</div>
			</div>
		</ErrorBoundary>
	);
};
