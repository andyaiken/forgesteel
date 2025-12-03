import { Button, Drawer, Flex, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Feature, FeatureChoiceData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureSelectModal } from '@/components/modals/select/feature-select/feature-select-modal';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%', padding: '0 20px', borderLeft: '5px solid rgb(200 200 200)' }}>
				{props.data.selected.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} mode={PanelMode.Full} />)}
			</Space>
		);
	}

	if (props.data.options.length === 0) {
		return null;
	}

	const showCosts = props.data.options.some(o => o.value > 1);
	return (
		<div>
			<div className='ds-text'>
				{
					showCosts ?
						`You have ${props.data.count} points to spend on the following options:`
						:
						`Choose ${props.data.count} of the following options:`
				}
			</div>
			{
				props.data.options.map(o => (
					<div key={o.feature.id} className='container'>
						<FeaturePanel feature={o.feature} options={props.options} cost={showCosts ? o.value : undefined} mode={PanelMode.Full} />
					</div>
				))
			}
		</div>
	);
};

interface EditProps {
	data: FeatureChoiceData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureChoiceData) => void;
}

export const EditChoice = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureChoiceData>(Utils.copy(props.data));

	const addChoice = (data: FeatureChoiceData) => {
		const copy = Utils.copy(data);
		copy.options.push({
			feature: FactoryLogic.feature.create({
				id: Utils.guid(),
				name: '',
				description: ''
			}),
			value: 1
		});
		setData(copy);
		props.setData(copy);
	};

	const moveChoice = (data: FeatureChoiceData, index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(data);
		copy.options = Collections.move(copy.options, index, direction);
		setData(copy);
		props.setData(copy);
	};

	const deleteChoice = (data: FeatureChoiceData, index: number) => {
		const copy = Utils.copy(data);
		copy.options.splice(index, 1);
		setData(copy);
		props.setData(copy);
	};

	const setChoiceFeature = (data: FeatureChoiceData, index: number, value: Feature) => {
		const copy = Utils.copy(data);
		copy.options[index].feature = value;
		setData(copy);
		props.setData(copy);
	};

	const setChoiceValue = (data: FeatureChoiceData, index: number, value: number) => {
		const copy = Utils.copy(data);
		copy.options[index].value = value;
		setData(copy);
		props.setData(copy);
	};

	const setChoiceCount = (value: number | 'ancestry') => {
		const copy = Utils.copy(data) as FeatureChoiceData;
		copy.count = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText
				extra={
					<Button type='text' icon={<PlusOutlined />} onClick={() => addChoice(data)} />
				}
			>
				Options
			</HeaderText>
			{
				data.options.map((option, n) => (
					<Expander
						key={option.feature.id}
						title={option.feature.name || 'Unnamed Feature'}
						extra={[
							<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveChoice(data, n, 'up'); }} />,
							<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveChoice(data, n, 'down'); }} />,
							<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteChoice(data, n); }} />
						]}
					>
						<Space orientation='vertical' style={{ width: '100%' }}>
							<FeatureEditPanel
								feature={option.feature}
								sourcebooks={props.sourcebooks}
								options={props.options}
								onChange={f => setChoiceFeature(data, n, f)}
							/>
							<NumberSpin min={1} value={option.value} onChange={value => setChoiceValue(data, n, value)} />
						</Space>
					</Expander>
				))
			}
			{
				data.options.length === 0 ?
					<Empty />
					: null
			}
			<HeaderText>Count</HeaderText>
			<Toggle label='Use ancestry points' value={data.count === 'ancestry'} onChange={value => setChoiceCount(value ? 'ancestry' : 3)} />
			{data.count !== 'ancestry' ? <NumberSpin min={1} value={data.count} onChange={setChoiceCount} /> : null}
		</Space>
	);
};

interface ConfigProps {
	data: FeatureChoiceData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureChoiceData) => void;
}

export const ConfigChoice = (props: ConfigProps) => {
	const [ choiceSelectorOpen, setChoiceSelectorOpen ] = useState<boolean>(false);
	const [ selectedFeature, setSelectedFeature ] = useState<Feature | null>(null);

	let allOptions = [ ...props.data.options ];
	if (allOptions.some(opt => opt.feature.type === FeatureType.AncestryFeatureChoice)) {
		allOptions = allOptions.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
		const additionalOptions = HeroLogic.getFormerAncestries(props.hero!)
			.flatMap(a => a.features)
			.filter(f => f.type === FeatureType.Choice)
			.flatMap(f => f.data.options)
			.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
		allOptions.push(...additionalOptions);
	}

	const selectedIDs = props.data.selected.map(f => f.id);
	const pointsUsed = Collections.sum(selectedIDs, id => {
		const original = allOptions.find(o => o.feature.id === id);
		return original ? original.value : 0;
	});
	const pointsMax = props.data.count === 'ancestry' ? HeroLogic.getAncestryPoints(props.hero!) : props.data.count;
	const pointsLeft = pointsMax - pointsUsed;

	let unavailableIDs: string[] = [];
	if (props.data.options.some(opt => opt.value > 1)) {
		unavailableIDs = allOptions
			.filter(opt => !selectedIDs.includes(opt.feature.id) && (opt.value > pointsLeft))
			.map(opt => opt.feature.id);
	}

	const availableOptions = allOptions
		.filter(f => !unavailableIDs.includes(f.feature.id))
		.filter(f => !selectedIDs.includes(f.feature.id));
	const sortedOptions = Collections.sort(availableOptions, opt => opt.feature.name);

	const showCosts = props.data.options.some(opt => opt.value > 1);

	const getAddButton = () => {
		if (sortedOptions.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Button className='status-warning' block={true} onClick={() => setChoiceSelectorOpen(true)}>
				Choose an option
			</Button>
		);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<div className='ds-text'>
				{
					showCosts ?
						(pointsLeft > 0) ? `You have ${pointsLeft} point(s) to spend.` : null
						:
						`Choose ${props.data.count} option(s).`
				}
			</div>
			{
				props.data.selected.map(f => (
					<Flex key={f.id} className='selection-box' align='center' gap={10}>
						<Field
							style={{ flex: '1 1 0' }}
							label={f.name}
							value={<Markdown text={f.description} useSpan={true} />}
						/>
						<Flex vertical={true}>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Show details'
								icon={<InfoCircleOutlined />}
								onClick={() => setSelectedFeature(f)}
							/>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Remove'
								icon={<CloseOutlined />}
								onClick={() => {
									const dataCopy = Utils.copy(props.data);
									dataCopy.selected = dataCopy.selected.filter(x => x.id !== f.id);
									props.setData(dataCopy);
								}}
							/>
						</Flex>
					</Flex>
				))
			}
			{pointsLeft > 0 ? getAddButton() : null}
			<Drawer open={choiceSelectorOpen} onClose={() => setChoiceSelectorOpen(false)} closeIcon={null} size={500}>
				<FeatureSelectModal
					features={sortedOptions}
					hero={props.hero}
					options={props.options}
					onSelect={feature => {
						setChoiceSelectorOpen(false);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selected.push(feature);
						props.setData(dataCopy);
					}}
					onClose={() => setChoiceSelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedFeature} onClose={() => setSelectedFeature(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedFeature ? <FeaturePanel style={{ padding: '0 20px 20px 20px' }} feature={selectedFeature} options={props.options} mode={PanelMode.Full} /> : null}
					onClose={() => setSelectedFeature(null)}
				/>
			</Drawer>
		</Space>
	);
};
