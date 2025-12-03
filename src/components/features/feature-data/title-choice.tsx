import { Button, Drawer, Flex, Space } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Feature, FeatureTitleChoiceData } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { FactoryLogic } from '@/logic/factory-logic';
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
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { TitleSelectModal } from '@/components/modals/select/title-select/title-select-modal';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureTitleChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoTitleChoice = (props: InfoProps) => {
	if (props.data.selected.length > 0) {
		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					props.data.selected.map(t => <TitlePanel key={t.id} title={t} sourcebooks={props.sourcebooks || []} options={props.options} />)
				}
			</Space>
		);
	}

	if (!props.feature.description) {
		return (
			<div className='ds-text'>Choose {props.data.count > 1 ? props.data.count : 'a'} {props.data.count > 1 ? 'titles' : 'title'}.</div>
		);
	}

	return null;
};

interface EditProps {
	data: FeatureTitleChoiceData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureTitleChoiceData) => void;
}

export const EditTitleChoice = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureTitleChoiceData>(Utils.copy(props.data));

	const setCount = (value: number) => {
		const copy = Utils.copy(data);
		copy.count = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Count</HeaderText>
			<NumberSpin min={1} value={data.count} onChange={setCount} />
		</Space>
	);
};

interface ConfigProps {
	data: FeatureTitleChoiceData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureTitleChoiceData) => void;
}

export const ConfigTitleChoice = (props: ConfigProps) => {
	const [ titleSelectorOpen, setTitleSelectorOpen ] = useState<boolean>(false);
	const [ selectedTitle, setSelectedTitle ] = useState<Title | null>(null);

	const currentTitleIDs = HeroLogic.getTitles(props.hero).map(t => t.id);
	const titles = SourcebookLogic.getTitles(props.sourcebooks as Sourcebook[])
		.filter(t => t.echelon === props.data.echelon)
		.filter(t => !currentTitleIDs.includes(t.id));
	const sortedTitles = Collections.sort(titles, t => t.name);

	const customTitle = FactoryLogic.createTitle();
	customTitle.name = 'Custom Title';
	customTitle.echelon = props.data.echelon;
	customTitle.features.push(FactoryLogic.feature.create({ id: Utils.guid(), name: 'Custom Title', description: 'Details' }));

	const getAddButton = () => {
		return (
			<Button className='status-warning' block={true} onClick={() => setTitleSelectorOpen(true)}>
				Choose a title
			</Button>
		);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{props.data.count > 1 ? <div className='ds-text'>Choose {props.data.count}:</div> : null}
			{
				props.data.selected.map(t => {
					const feature = t.features.find(f => f.id === t.selectedFeatureID);
					if (!feature) {
						return null;
					}
					return (
						<Flex key={t.id} className='selection-box' align='center' gap={10}>
							<Flex vertical={true} style={{ flex: '1 1 0' }}>
								<Field
									label={t.name}
									value={<Markdown text={t.description} useSpan={true} />}
								/>
								<Field
									label={feature.name}
									value={<Markdown text={feature.description} useSpan={true} />}
								/>
							</Flex>
							<Flex vertical={true}>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={() => setSelectedTitle(t)}
								/>
								<Button
									style={{ flex: '0 0 auto' }}
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={() => {
										const dataCopy = Utils.copy(props.data);
										dataCopy.selected = dataCopy.selected.filter(x => x.id !== t.id);
										props.setData(dataCopy);
									}}
								/>
							</Flex>
						</Flex>
					);
				})
			}
			{props.data.selected.length < props.data.count ? getAddButton() : null}
			<Drawer open={titleSelectorOpen} onClose={() => setTitleSelectorOpen(false)} closeIcon={null} size={500}>
				<TitleSelectModal
					titles={[ customTitle, ...sortedTitles ]}
					hero={props.hero}
					sourcebooks={props.sourcebooks}
					options={props.options}
					onSelect={title => {
						setTitleSelectorOpen(false);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selected.push(title);
						props.setData(dataCopy);
					}}
					onClose={() => setTitleSelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedTitle} onClose={() => setSelectedTitle(null)} closeIcon={null} size={500}>
				<Modal
					content={
						selectedTitle ?
							<TitlePanel
								title={selectedTitle}
								options={props.options}
								sourcebooks={props.sourcebooks}
								mode={PanelMode.Full}
								onChange={title => {
									const dataCopy = Utils.copy(props.data);
									const index = dataCopy.selected.findIndex(t => t.id === title.id);
									if (index !== -1) {
										dataCopy.selected[index] = title;
										props.setData(dataCopy);
									}
								}}
							/>
							: null
					}
					onClose={() => setSelectedTitle(null)}
				/>
			</Drawer>
		</Space>
	);
};
