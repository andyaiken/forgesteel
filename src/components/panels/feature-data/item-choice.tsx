import { Button, Drawer, Flex, Select, Space } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Feature, FeatureItemChoiceData } from '@/models/feature';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Item } from '@/models/item';
import { ItemPanel } from '@/components/panels/elements/item-panel/item-panel';
import { ItemSelectModal } from '@/components/modals/select/item-select/item-select-modal';
import { ItemType } from '@/enums/item-type';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureItemChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoItemChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.selected.map(i => <ItemPanel key={i.id} item={i} sourcebooks={props.sourcebooks || []} options={props.options} />)
				}
			</Space>
		);
	}

	if (!props.feature.description) {
		let types = props.data.types.join(', ') || 'item';
		if (props.data.count > 1) {
			types = `${props.data.count} ${types}s`;
		} else {
			if (Format.startsWithVowel(types)) {
				types = `an ${types}`;
			} else {
				types = `a ${types}`;
			}
		}
		return (
			<div className='ds-text'>Choose {types}.</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureItemChoiceData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureItemChoiceData) => void;
}

export const EditItemChoice = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureItemChoiceData>(Utils.copy(props.data));

	const setItemTypes = (value: ItemType[]) => {
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
				placeholder='Item types'
				mode='multiple'
				allowClear={true}
				options={[ ItemType.Artifact, ItemType.Consumable, ItemType.Leveled, ItemType.Trinket1st, ItemType.Trinket2nd, ItemType.Trinket3rd, ItemType.Trinket4th ].map(option => ({ value: option }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.types}
				onChange={setItemTypes}
			/>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
		</Space>
	);
};

interface ConfigProps {
	data: FeatureItemChoiceData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureItemChoiceData) => void;
}

export const ConfigItemChoice = (props: ConfigProps) => {
	const [ itemSelectorOpen, setItemSelectorOpen ] = useState<boolean>(false);
	const [ selectedItem, setSelectedItem ] = useState<Item | null>(null);

	const getAddButton = () => {
		return (
			<Button className='status-warning' block={true} onClick={() => setItemSelectorOpen(true)}>
				Choose an item
			</Button>
		);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{props.data.count > 1 ? <div className='ds-text'>Choose {props.data.count}:</div> : null}
			{
				props.data.selected.map(item => (
					<Flex key={item.id} className='selection-box' align='center' gap={10}>
						<Field
							style={{ flex: '1 1 0' }}
							label={item.name}
							value={<Markdown text={item.description} useSpan={true} />}
						/>
						<Flex vertical={true}>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Show details'
								icon={<InfoCircleOutlined />}
								onClick={() => setSelectedItem(item)}
							/>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Remove'
								icon={<CloseOutlined />}
								onClick={() => {
									const dataCopy = Utils.copy(props.data);
									dataCopy.selected = dataCopy.selected.filter(i => i.id !== item.id);
									props.setData(dataCopy);
								}}
							/>
						</Flex>
					</Flex>
				))
			}
			{props.data.selected.length < props.data.count ? getAddButton() : null}
			<Drawer open={itemSelectorOpen} onClose={() => setItemSelectorOpen(false)} closeIcon={null} size={500}>
				<ItemSelectModal
					types={props.data.types}
					sourcebooks={props.sourcebooks}
					hero={props.hero}
					options={props.options}
					onSelect={item => {
						setItemSelectorOpen(false);

						const itemCopy = Utils.copy(item);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selected.push(itemCopy);
						props.setData(dataCopy);
					}}
					onClose={() => setItemSelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedItem} onClose={() => setSelectedItem(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedItem ? <ItemPanel item={selectedItem} sourcebooks={props.sourcebooks} options={props.options} /> : null}
					onClose={() => setSelectedItem(null)}
				/>
			</Drawer>
		</Space>
	);
};
