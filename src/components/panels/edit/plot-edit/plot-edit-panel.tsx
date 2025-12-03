import { Button, Divider, Drawer, Flex, Input, Popover, Select, Space, Tabs, Upload } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownloadOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Markdown, MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Plot, PlotContent, PlotContentImage, PlotContentReference, PlotContentRoll, PlotContentText, PlotLink } from '@/models/plot';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Adventure } from '@/models/adventure';
import { AdventureLogic } from '@/logic/adventure-logic';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { EncounterPanel } from '@/components/panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { MontagePanel } from '@/components/panels/elements/montage-panel/montage-panel';
import { NegotiationPanel } from '@/components/panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { PlotPanel } from '@/components/panels/elements/plot-panel/plot-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './plot-edit-panel.scss';

interface Props {
	plot: Plot;
	adventure: Adventure;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	onChange: (plot: Plot) => void;
	onAddAfter: (plotPointID: string) => void;
	onDelete: (plotPointID: string) => void;
}

export const PlotEditPanel = (props: Props) => {
	const [ plot, setPlot ] = useState<Plot>(props.plot);
	const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
	const [ addingReference, setAddingReference ] = useState<boolean>(false);
	const [ referenceType, setReferenceType ] = useState<SourcebookElementKind>('encounter');
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const parentPlot = AdventureLogic.getPlotPointParent(props.adventure.plot, plot.id) as Plot;
	const upstreamIDs = AdventureLogic.getUpstreamPlotPoints(parentPlot, plot.id).map(p => p.id);
	const linkTargets = parentPlot.plots.filter(p => !plot.links.map(x => x.plotID).includes(p.id) && !upstreamIDs.includes(p.id));

	const addContentText = () => {
		const content: PlotContentText = {
			id: Utils.guid(),
			contentType: 'text',
			format: 'standard',
			text: ''
		};

		const copy = Utils.copy(plot);
		copy.content.push(content);
		setPlot(copy);
		props.onChange(copy);
	};

	const addContentImage = () => {
		const content: PlotContentImage = {
			id: Utils.guid(),
			contentType: 'image',
			data: '',
			title: ''
		};

		const copy = Utils.copy(plot);
		copy.content.push(content);
		setPlot(copy);
		props.onChange(copy);
	};

	const addContentRoll = () => {
		const content: PlotContentRoll = {
			id: Utils.guid(),
			contentType: 'roll',
			roll: FactoryLogic.createPowerRoll({
				characteristic: Characteristic.Might,
				tier1: '',
				tier2: '',
				tier3: ''
			})
		};

		const copy = Utils.copy(plot);
		copy.content.push(content);
		setPlot(copy);
		props.onChange(copy);
	};

	const addContentReference = (type: SourcebookElementKind, id: string) => {
		const content: PlotContentReference = {
			id: Utils.guid(),
			contentType: 'reference',
			type: type,
			contentID: id
		};

		const copy = Utils.copy(plot);
		copy.content.push(content);
		setPlot(copy);
		props.onChange(copy);

		setAddingReference(false);
	};

	const addLink = (target: Plot) => {
		const copy = Utils.copy(plot);
		copy.links.push({
			id: Utils.guid(),
			plotID: target.id,
			label: ''
		});
		setPlot(copy);
		props.onChange(copy);
	};

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(plot);
			copy.name = value;
			setPlot(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(plot);
			copy.description = value;
			setPlot(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					status={plot.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					value={plot.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={plot.description} onChange={setDescription} />
			</Space>
		);
	};

	const getContentSection = () => {
		const moveContent = (content: PlotContent, direction: 'up' | 'down') => {
			const copy = Utils.copy(plot);
			const index = copy.content.findIndex(c => c.id === content.id);
			copy.content = Collections.move(copy.content, index, direction);
			setPlot(copy);
			props.onChange(copy);
		};

		const deleteContent = (content: PlotContent) => {
			const copy = Utils.copy(plot);
			copy.content = copy.content.filter(c => c.id !== content.id);
			setPlot(copy);
			props.onChange(copy);
		};

		const setTextFormat = (contentID: string, value: 'standard' | 'read-aloud' | 'director') => {
			const copy = Utils.copy(plot);
			copy.content
				.filter(c => c.contentType === 'text')
				.filter(c => c.id === contentID)
				.forEach(c => c.format = value);
			setPlot(copy);
			props.onChange(copy);
		};

		const setText = (contentID: string, value: string) => {
			const copy = Utils.copy(plot);
			copy.content
				.filter(c => c.contentType === 'text')
				.filter(c => c.id === contentID)
				.forEach(c => c.text = value);
			setPlot(copy);
			props.onChange(copy);
		};

		const setImageData = (contentID: string, value: string) => {
			const copy = Utils.copy(plot);
			copy.content
				.filter(c => c.contentType === 'image')
				.filter(c => c.id === contentID)
				.forEach(c => c.data = value);
			setPlot(copy);
			props.onChange(copy);
		};

		const setImageTitle = (contentID: string, value: string) => {
			const copy = Utils.copy(plot);
			copy.content
				.filter(c => c.contentType === 'image')
				.filter(c => c.id === contentID)
				.forEach(c => c.title = value);
			setPlot(copy);
			props.onChange(copy);
		};

		const setRollCharacteristics = (contentID: string, value: Characteristic[]) => {
			const copy = Utils.copy(plot);
			copy.content
				.filter(c => c.contentType === 'roll')
				.filter(c => c.id === contentID)
				.forEach(c => c.roll.characteristic = value);
			setPlot(copy);
			props.onChange(copy);
		};

		const setRollTier1 = (contentID: string, value: string) => {
			const copy = Utils.copy(plot);
			copy.content
				.filter(c => c.contentType === 'roll')
				.filter(c => c.id === contentID)
				.forEach(c => c.roll.tier1 = value);
			setPlot(copy);
			props.onChange(copy);
		};

		const setRollTier2 = (contentID: string, value: string) => {
			const copy = Utils.copy(plot);
			copy.content
				.filter(c => c.contentType === 'roll')
				.filter(c => c.id === contentID)
				.forEach(c => c.roll.tier2 = value);
			setPlot(copy);
			props.onChange(copy);
		};

		const setRollTier3 = (contentID: string, value: string) => {
			const copy = Utils.copy(plot);
			copy.content
				.filter(c => c.contentType === 'roll')
				.filter(c => c.id === contentID)
				.forEach(c => c.roll.tier3 = value);
			setPlot(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Popover
							trigger='click'
							content={
								<Space orientation='vertical' style={{ width: '120px' }}>
									<Button block={true} type='text' onClick={() => { setMenuOpen(false); addContentText(); }}>Text</Button>
									<Button block={true} type='text' onClick={() => { setMenuOpen(false); addContentImage(); }}>Picture</Button>
									<Button block={true} type='text' onClick={() => { setMenuOpen(false); addContentRoll(); }}>Power Roll</Button>
									<Button block={true} type='text' onClick={() => { setMenuOpen(false); setAddingReference(true); }}>Library Element</Button>
								</Space>
							}
							open={menuOpen}
							onOpenChange={setMenuOpen}
						>
							<Button type='text' icon={<PlusOutlined />} />
						</Popover>
					}
				>
					Content
				</HeaderText>
				{
					plot.content.map(c => {
						let name = 'Content';
						let tag = '';
						let content = null;

						switch (c.contentType) {
							case 'text': {
								switch (c.format) {
									case 'standard':
										name = 'Text';
										break;
									case 'read-aloud':
										name = 'Read-aloud Text';
										break;
									case 'director':
										name = 'Director Note';
										break;
								}
								content = (
									<Space orientation='vertical' style={{ width: '100%' }}>
										<HeaderText>Text</HeaderText>
										<Select
											style={{ width: '100%' }}
											options={[
												{
													value: 'standard',
													label: 'Standard'
												},
												{
													value: 'read-aloud',
													label: 'Read-aloud Text'
												},
												{
													value: 'director',
													label: 'Director Note'
												}
											]}
											optionRender={option => <div className='ds-text'>{option.data.label}</div>}
											value={c.format}
											onChange={value => setTextFormat(c.id, value)}
										/>
										<MarkdownEditor value={c.text} onChange={value => setText(c.id, value)} />
									</Space>
								);
								break;
							}
							case 'image': {
								name = c.title || 'Picture';
								tag = 'Picture';
								content = (
									<Space orientation='vertical' style={{ width: '100%' }}>
										<HeaderText>Picture</HeaderText>
										{
											c.data ?
												<Flex align='center' justify='center' gap={10}>
													<img src={c.data} title={c.title} />
													<DangerButton mode='clear' onConfirm={() => setImageData(c.id, '')} />
												</Flex>
												:
												<Upload
													style={{ width: '100%' }}
													accept='.png,.webp,.gif,.jpg,.jpeg,.svg'
													showUploadList={false}
													beforeUpload={file => {
														const reader = new FileReader();
														reader.onload = progress => {
															if (progress.target) {
																const content = progress.target.result as string;
																setImageData(c.id, content);
															}
														};
														reader.readAsDataURL(file);
														return false;
													}}
												>
													<Button>
														<DownloadOutlined />
														Choose a picture
													</Button>
												</Upload>
										}
										<HeaderText>Title</HeaderText>
										<Input
											status={c.title === '' ? 'warning' : ''}
											placeholder='Title'
											allowClear={true}
											value={c.title}
											onChange={e => setImageTitle(c.id, e.target.value)}
										/>
									</Space>
								);
								break;
							}
							case 'roll': {
								name = 'Power Roll';
								content = (
									<Space orientation='vertical' style={{ width: '100%' }}>
										<HeaderText>Roll</HeaderText>
										<Select
											style={{ width: '100%' }}
											status={c.roll.characteristic.length === 0 ? 'warning' : ''}
											placeholder='Characteristics'
											mode='multiple'
											options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
											optionRender={option => <div className='ds-text'>{option.data.value}</div>}
											value={c.roll.characteristic}
											onChange={value => setRollCharacteristics(c.id, value)}
										/>
										<Input
											status={c.roll.tier1 === '' ? 'warning' : ''}
											placeholder='Tier 1'
											allowClear={true}
											value={c.roll.tier1}
											onChange={e => setRollTier1(c.id, e.target.value)}
										/>
										<Input
											status={c.roll.tier2 === '' ? 'warning' : ''}
											placeholder='Tier 2'
											allowClear={true}
											value={c.roll.tier2}
											onChange={e => setRollTier2(c.id, e.target.value)}
										/>
										<Input
											status={c.roll.tier3 === '' ? 'warning' : ''}
											placeholder='Tier 3'
											allowClear={true}
											value={c.roll.tier3}
											onChange={e => setRollTier3(c.id, e.target.value)}
										/>
									</Space>
								);
								break;
							}
							case 'reference': {
								switch (c.type) {
									case 'encounter': {
										const element = SourcebookLogic.getEncounters(props.sourcebooks).find(e => e.id === c.contentID);
										if (element) {
											name = element.name;
											tag = 'Encounter';
											content = (
												<EncounterPanel encounter={element} sourcebooks={props.sourcebooks} heroes={props.heroes} options={props.options} />
											);
										}
										break;
									}
									case 'montage': {
										const element = SourcebookLogic.getMontages(props.sourcebooks).find(m => m.id === c.contentID);
										if (element) {
											name = element.name;
											tag = 'Montage';
											content = (
												<MontagePanel montage={element} heroes={props.heroes} sourcebooks={props.sourcebooks} options={props.options} />
											);
										}
										break;
									}
									case 'negotiation': {
										const element = SourcebookLogic.getNegotiations(props.sourcebooks).find(n => n.id === c.contentID);
										if (element) {
											name = element.name;
											tag = 'Negotiation';
											content = (
												<NegotiationPanel negotiation={element} sourcebooks={props.sourcebooks} options={props.options} />
											);
										}
										break;
									}
									case 'tactical-map': {
										const element = SourcebookLogic.getTacticalMaps(props.sourcebooks).find(tm => tm.id === c.contentID);
										if (element) {
											name = element.name;
											tag = 'Tactical Map';
											content = (
												<TacticalMapPanel map={element} display={TacticalMapDisplayType.Thumbnail} sourcebooks={props.sourcebooks} options={props.options} />
											);
										}
										break;
									}
									default: {
										const element = SourcebookLogic.getElement(c.contentID, props.sourcebooks);
										if (element) {
											name = element.name;
											tag = Format.capitalize(c.type.split('-').join(' '));
											content = (
												<>
													<HeaderText>{element.name}</HeaderText>
													<div className='ds-text'>{element.description}</div>
												</>
											);
										}
										break;
									}
								}
								break;
							}
						}

						return content ?
							<Expander
								key={c.id}
								title={name}
								tags={tag ? [ tag ] : []}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveContent(c, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveContent(c, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteContent(c); }} />
								]}
							>
								{content}
							</Expander>
							: null;
					})
				}
				{
					plot.content.length === 0 ?
						<Empty text='No content' />
						: null
				}
			</Space>
		);
	};

	const getLinksSection = () => {
		const setLinkLabel = (link: PlotLink, value: string) => {
			const copy = Utils.copy(plot);
			const index = copy.links.findIndex(l => l.id === link.id);
			if (index !== -1) {
				copy.links[index].label = value;
			}
			setPlot(copy);
			props.onChange(copy);
		};

		const moveLink = (link: PlotLink, direction: 'up' | 'down') => {
			const copy = Utils.copy(plot);
			const index = copy.links.findIndex(l => l.id === link.id);
			copy.links = Collections.move(copy.links, index, direction);
			setPlot(copy);
			props.onChange(copy);
		};

		const deleteLink = (link: PlotLink) => {
			const copy = Utils.copy(plot);
			copy.links = copy.links.filter(l => l.id !== link.id);
			setPlot(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						linkTargets.length > 0 ?
							<Popover
								trigger='click'
								content={
									<Space orientation='vertical' style={{ width: '100%', padding: '0 5px' }}>
										{
											linkTargets.map(p => (
												<Button
													key={p.id}
													type='text'
													block={true}
													onClick={() => addLink(p)}
												>
													{p.name || 'Unnamed Plot Point'}
												</Button>
											))
										}
									</Space>
								}
							>
								<Button type='text' icon={<PlusOutlined />} />
							</Popover>
							: null
					}
				>
					Links
				</HeaderText>
				{
					plot.links.map(l => (
						<Expander
							key={l.id}
							title={parentPlot.plots.find(p => p.id === l.plotID)?.name || 'Unknown Plot Point'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveLink(l, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveLink(l, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteLink(l); }} />
							]}
						>
							<HeaderText>Label</HeaderText>
							<Input
								placeholder='Label'
								allowClear={true}
								value={l.label}
								onChange={e => setLinkLabel(l, e.target.value)}
							/>
						</Expander>
					))
				}
				{
					plot.links.length === 0 ?
						<Empty text='No links' />
						: null
				}
			</Space>
		);
	};

	const getPreviewSection = () => {
		return (
			<PlotPanel
				plot={plot}
				adventure={props.adventure}
				sourcebooks={props.sourcebooks}
				heroes={props.heroes}
				options={props.options}
				mode={PanelMode.Full}
				onSelect={() => null}
				onStart={() => null}
			/>
		);
	};

	const elements = props.sourcebooks
		.flatMap(sb => SourcebookLogic.getElements(sb))
		.filter(e => e.element.id !== props.adventure.id)
		.filter(e => e.type === referenceType)
		.filter(e => Utils.textMatches([ e.element.name, e.element.description ], searchTerm));

	return (
		<ErrorBoundary>
			<div className='plot-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Plot Point',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Content',
							children: getContentSection()
						},
						{
							key: '3',
							label: 'Links',
							children: getLinksSection()
						},
						{
							key: '4',
							label: 'Preview',
							children: getPreviewSection()
						}
					]}
					tabBarExtraContent={
						<Flex gap={5}>
							<Button icon={<PlusOutlined />} onClick={() => props.onAddAfter(plot.id)}>Add Point After</Button>
							<DangerButton mode='icon' onConfirm={() => props.onDelete(plot.id)} />
						</Flex>
					}
				/>
			</div>
			<Drawer open={addingReference} onClose={() => setAddingReference(false)} closeIcon={null} size={500}>
				<Modal
					content={
						<div style={{ padding: '20px' }}>
							<Space orientation='vertical' style={{ width: '100%' }}>
								<Select
									style={{ width: '100%' }}
									options={
										[
											'adventure',
											'ancestry',
											'career',
											'class',
											'complication',
											'culture',
											'domain',
											'encounter',
											'imbuement',
											'item',
											'kit',
											'monster-group',
											'montage',
											'negotiation',
											'perk',
											'project',
											'subclass',
											'tactical-map',
											'terrain',
											'title'
										].map(opt => ({ value: opt, label: <div className='ds-text'>{Format.capitalize(opt.split('-').join(' '))}</div> }))
									}
									value={referenceType}
									onChange={setReferenceType}
								/>
								<Input
									name='search'
									placeholder='Search'
									allowClear={true}
									value={searchTerm}
									suffix={<SearchOutlined />}
									onChange={e => setSearchTerm(e.target.value)}
								/>
								<Divider />
								{
									Collections.sort(elements, e => e.element.name)
										.map(e => (
											<SelectablePanel key={e.element.id} onSelect={() => addContentReference(e.type, e.element.id)}>
												<HeaderText tags={[ Format.capitalize(e.type.split('-').join(' ')) ]}>{e.element.name}</HeaderText>
												<Markdown text={e.element.description} />
											</SelectablePanel>
										))
								}
								{elements.length === 0 ? <Empty /> : null}
							</Space>
						</div>
					}
					onClose={() => setAddingReference(false)}
				/>
			</Drawer>
		</ErrorBoundary>
	);
};
