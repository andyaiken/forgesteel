import { Button, Drawer, Flex, Select, Space } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Feature, FeatureKitData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Kit } from '@/models/kit';
import { KitPanel } from '@/components/panels/elements/kit-panel/kit-panel';
import { KitSelectModal } from '@/components/modals/select/kit-select/kit-select-modal';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureKitData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoKit = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.selected.map(k => <KitPanel key={k.id} kit={k} sourcebooks={props.sourcebooks || []} options={props.options} />)
				}
			</Space>
		);
	}

	if (!props.feature.description) {
		return (
			<div className='ds-text'>Choose {props.data.count > 1 ? props.data.count : 'a'} {props.data.types.join(', ')} {props.data.count > 1 ? 'kits' : 'kit'}.</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureKitData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureKitData) => void;
}

export const EditKit = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureKitData>(Utils.copy(props.data));

	const setKitTypes = (value: string[]) => {
		const copy = Utils.copy(data);
		copy.types = value;
		setData(copy);
		props.setData(copy);
	};

	const setCount = (value: number) => {
		const copy = Utils.copy(data);
		copy.count = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Types</HeaderText>
			<Select
				style={{ width: '100%' }}
				status={data.types.length === 0 ? 'warning' : ''}
				placeholder='Kit types'
				mode='multiple'
				allowClear={true}
				options={Collections.sort(Collections.distinct(SourcebookLogic.getKits(props.sourcebooks).map(k => k.type), x => x), x => x).map(type => ({ value: type, label: !type ? 'Standard' : type }))}
				optionRender={option => <div className='ds-text'>{option.data.label}</div>}
				value={data.types}
				onChange={setKitTypes}
			/>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
		</Space>
	);
};

interface ConfigProps {
	data: FeatureKitData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureKitData) => void;
}

export const ConfigKit = (props: ConfigProps) => {
	const [ kitSelectorOpen, setKitSelectorOpen ] = useState<boolean>(false);
	const [ selectedKit, setSelectedKit ] = useState<Kit | null>(null);

	const currentKitIDs = HeroLogic.getKits(props.hero).map(k => k.id);

	const kitTypes = props.data.types.length > 0 ? props.data.types : [ '' ];
	const kits = SourcebookLogic.getKits(props.sourcebooks as Sourcebook[])
		.filter(k => kitTypes.includes(k.type))
		.filter(k => !currentKitIDs.includes(k.id));
	const sortedKits = Collections.sort(kits, k => k.name);

	const getAddButton = () => {
		if (sortedKits.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Button className='status-warning' block={true} onClick={() => setKitSelectorOpen(true)}>
				Choose a kit
			</Button>
		);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{props.data.count > 1 ? <div className='ds-text'>Choose {props.data.count}:</div> : null}
			{
				props.data.selected.map(kit => (
					<Flex key={kit.id} className='selection-box' align='center' gap={10}>
						<Field
							style={{ flex: '1 1 0' }}
							label={kit.name}
							value={<Markdown text={kit.description} useSpan={true} />}
						/>
						<Flex vertical={true}>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Show details'
								icon={<InfoCircleOutlined />}
								onClick={() => setSelectedKit(kit)}
							/>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Remove'
								icon={<CloseOutlined />}
								onClick={() => {
									const dataCopy = Utils.copy(props.data);
									dataCopy.selected = dataCopy.selected.filter(k => k.id !== kit.id);
									props.setData(dataCopy);
								}}
							/>
						</Flex>
					</Flex>
				))
			}
			{props.data.selected.length < props.data.count ? getAddButton() : null}
			<Drawer open={kitSelectorOpen} onClose={() => setKitSelectorOpen(false)} closeIcon={null} size={500}>
				<KitSelectModal
					kits={sortedKits}
					hero={props.hero}
					sourcebooks={props.sourcebooks}
					options={props.options}
					onSelect={kit => {
						setKitSelectorOpen(false);

						const kitCopy = Utils.copy(kit);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selected.push(kitCopy);
						props.setData(dataCopy);
					}}
					onClose={() => setKitSelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedKit} onClose={() => setSelectedKit(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedKit ? <KitPanel kit={selectedKit} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} /> : null}
					onClose={() => setSelectedKit(null)}
				/>
			</Drawer>
		</Space>
	);
};
