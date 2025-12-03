import { Button, Drawer, Flex, Select, Space } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Feature, FeaturePerkData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
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
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { PerkSelectModal } from '@/components/modals/select/perk-select/perk-select-modal';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeaturePerkData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoPerk = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.selected.map(p => <PerkPanel key={p.id} perk={p} sourcebooks={props.sourcebooks || []} options={props.options} />)
				}
			</Space>
		);
	}

	if (!props.feature.description) {
		return (
			<div className='ds-text'>Choose {props.data.count > 1 ? props.data.count : 'a'} {props.data.count > 1 ? 'perks' : 'perk'}.</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeaturePerkData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeaturePerkData) => void;
}

export const EditPerk = (props: EditProps) => {
	const [ data, setData ] = useState<FeaturePerkData>(Utils.copy(props.data));

	const setPerkLists = (value: PerkList[]) => {
		const copy = Utils.copy(data);
		copy.lists = value;
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
			<HeaderText>Lists</HeaderText>
			<Select
				style={{ width: '100%' }}
				status={data.lists.length === 0 ? 'warning' : ''}
				placeholder='Perk lists'
				mode='multiple'
				allowClear={true}
				options={[ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ].map(option => ({ value: option }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.lists}
				onChange={setPerkLists}
			/>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
		</Space>
	);
};

interface ConfigProps {
	data: FeaturePerkData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeaturePerkData) => void;
}

export const ConfigPerk = (props: ConfigProps) => {
	const [ perkSelectorOpen, setPerkSelectorOpen ] = useState<boolean>(false);
	const [ selectedPerk, setSelectedPerk ] = useState<Perk | null>(null);

	const currentPerkIDs = HeroLogic.getFeatures(props.hero)
		.map(f => f.feature)
		.filter(f => f.type === FeatureType.Perk)
		.flatMap(f => f.data.selected)
		.map(p => p.id);

	const perks = SourcebookLogic.getPerks(props.sourcebooks as Sourcebook[]).filter(p => props.data.lists.includes(p.list));
	const sortedPerks = Collections.sort(perks, p => p.name);

	const getAddButton = () => {
		if (sortedPerks.length === 0) {
			return (
				<Empty text='There are no options to choose for this feature.' />
			);
		}

		return (
			<Button className='status-warning' block={true} onClick={() => setPerkSelectorOpen(true)}>
				Choose a perk
			</Button>
		);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{props.data.count > 1 ? <div className='ds-text'>Choose {props.data.count}:</div> : null}
			{
				props.data.selected.map(perk => (
					<Flex key={perk.id} className='selection-box' align='center' gap={10}>
						<Field
							style={{ flex: '1 1 0' }}
							label={perk.name}
							value={<Markdown text={perk.description} useSpan={true} />}
						/>
						<Flex vertical={true}>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Show details'
								icon={<InfoCircleOutlined />}
								onClick={() => setSelectedPerk(perk)}
							/>
							<Button
								style={{ flex: '0 0 auto' }}
								type='text'
								title='Remove'
								icon={<CloseOutlined />}
								onClick={() => {
									const dataCopy = Utils.copy(props.data);
									dataCopy.selected = dataCopy.selected.filter(p => p.id !== perk.id);
									props.setData(dataCopy);
								}}
							/>
						</Flex>
					</Flex>
				))
			}
			{props.data.selected.length < props.data.count ? getAddButton() : null}
			<Drawer open={perkSelectorOpen} onClose={() => setPerkSelectorOpen(false)} closeIcon={null} size={500}>
				<PerkSelectModal
					perks={sortedPerks.filter(p => !currentPerkIDs.includes(p.id))}
					hero={props.hero}
					sourcebooks={props.sourcebooks}
					options={props.options}
					onSelect={perk => {
						setPerkSelectorOpen(false);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selected.push(perk);
						props.setData(dataCopy);
					}}
					onClose={() => setPerkSelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedPerk} onClose={() => setSelectedPerk(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedPerk ? <PerkPanel perk={selectedPerk} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} /> : null}
					onClose={() => setSelectedPerk(null)}
				/>
			</Drawer>
		</Space>
	);
};
