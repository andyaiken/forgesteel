import { Button, Divider, Drawer, Flex, Input, Popover, Select, Space, Tabs, Upload } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Plot, PlotContent, PlotContentElement, PlotContentImage, PlotContentReference, PlotContentRoll, PlotContentText, PlotLink } from '@/models/plot';
import { Adventure } from '@/models/adventure';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Element } from '@/models/element';
import { Empty } from '@/components/controls/empty/empty';
import { EncounterPanel } from '@/components/panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Follower } from '@/models/follower';
import { FollowerEditPanel } from '../follower-edit/follower-edit-panel';
import { FollowerType } from '@/enums/follower-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Item } from '@/models/item';
import { ItemEditPanel } from '../item-edit/item-edit-panel';
import { ItemPanel } from '../../elements/item-panel/item-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { MonsterEditPanel } from '../monster-edit/monster-edit-panel';
import { MonsterPanel } from '../../elements/monster-panel/monster-panel';
import { MontagePanel } from '@/components/panels/elements/montage-panel/montage-panel';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NegotiationPanel } from '@/components/panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Playbook } from '@/models/playbook';
import { PlaybookLogic } from '@/logic/playbook-logic';
import { PlotPanel } from '@/components/panels/elements/plot-panel/plot-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { Title } from '@/models/title';
import { TitleEditPanel } from '../title-edit/title-edit-panel';
import { TitlePanel } from '../../elements/title-panel/title-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './plot-edit-panel.scss';

interface Props {
	plot: Plot;
	adventure: Adventure;
	playbook: Playbook;
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
	const [ addingEncounter, setAddingEncounter ] = useState<boolean>(false);
	const [ addingMontage, setAddingMontage ] = useState<boolean>(false);
	const [ addingNegotiation, setAddingNegotiation ] = useState<boolean>(false);
	const [ addingMap, setAddingMap ] = useState<boolean>(false);

	const [ addingItem, setAddingItem ] = useState<boolean>(false);
	const [ addingMonster, setAddingMonster ] = useState<boolean>(false);
	const [ addingTitle, setAddingTitle ] = useState<boolean>(false);

	const parentPlot = PlaybookLogic.getPlotPointParent(props.adventure.plot, plot.id) as Plot;
	const upstreamIDs = PlaybookLogic.getUpstreamPlotPoints(parentPlot, plot.id).map(p => p.id);
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

	const addContentReference = (type: 'encounter' | 'montage' | 'negotiation' | 'map', id: string) => {
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

		setAddingEncounter(false);
		setAddingMontage(false);
		setAddingNegotiation(false);
		setAddingMap(false);
	};

	const addContentElement = (type: 'follower' | 'item' | 'monster' | 'title', element: Element) => {
		const content: PlotContentElement = {
			id: Utils.guid(),
			contentType: 'element',
			type: type,
			content: element
		};

		const copy = Utils.copy(plot);
		copy.content.push(content);
		setPlot(copy);
		props.onChange(copy);

		setAddingItem(false);
		setAddingMonster(false);
		setAddingTitle(false);
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
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					status={plot.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					value={plot.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine value={plot.description} onChange={setDescription} />
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

		const setElement = (contentID: string, value: Element) => {
			const copy = Utils.copy(plot);
			copy.content
				.filter(c => c.contentType === 'element')
				.filter(c => c.id === contentID)
				.forEach(c => c.content = value);
			setPlot(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Popover
							trigger='click'
							content={
								<div style={{ width: '210px' }}>
									<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); addContentText(); }}>Text</Button>
									</div>
									<Divider>Common Elements</Divider>
									<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); addContentImage(); }}>Picture</Button>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); addContentRoll(); }}>Power Roll</Button>
									</div>
									<Divider>Playbook Elements</Divider>
									<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); setAddingEncounter(true); }}>Encounter</Button>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); setAddingMontage(true); }}>Montage</Button>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); setAddingNegotiation(true); }}>Negotiation</Button>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); setAddingMap(true); }}>Tactical Map</Button>
									</div>
									<Divider>Library Elements</Divider>
									<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); addContentElement('follower', FactoryLogic.createFollower(FollowerType.Artisan)); }}>Follower</Button>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); setAddingItem(true); }}>Item</Button>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); setAddingMonster(true); }}>Monster</Button>
										<Button block={true} type='text' onClick={() => { setMenuOpen(false); setAddingTitle(true); }}>Title</Button>
									</div>
								</div>
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
									<Space direction='vertical' style={{ width: '100%' }}>
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
										<MultiLine value={c.text} onChange={value => setText(c.id, value)} />
									</Space>
								);
								break;
							}
							case 'image': {
								name = c.title || 'Picture';
								tag = 'Picture';
								content = (
									<Space direction='vertical' style={{ width: '100%' }}>
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
									<Space direction='vertical' style={{ width: '100%' }}>
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
										const element = props.playbook.encounters.find(e => e.id === c.contentID);
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
										const element = props.playbook.montages.find(m => m.id === c.contentID);
										if (element) {
											name = element.name;
											tag = 'Montage';
											content = (
												<MontagePanel montage={element} />
											);
										}
										break;
									}
									case 'negotiation': {
										const element = props.playbook.negotiations.find(n => n.id === c.contentID);
										if (element) {
											name = element.name;
											tag = 'Negotiation';
											content = (
												<NegotiationPanel negotiation={element} />
											);
										}
										break;
									}
									case 'map': {
										const element = props.playbook.tacticalMaps.find(tm => tm.id === c.contentID);
										if (element) {
											name = element.name;
											tag = 'Tactical Map';
											content = (
												<TacticalMapPanel map={element} display={TacticalMapDisplayType.Thumbnail} options={props.options} />
											);
										}
										break;
									}
								}
								break;
							}
							case 'element': {
								switch (c.type) {
									case 'follower': {
										name = c.content.name || 'Unnamed Follower';
										tag = 'Follower';
										content = (
											<FollowerEditPanel follower={c.content as Follower} sourcebooks={props.sourcebooks} options={props.options} onChange={f => setElement(c.id, f)} />
										);
										break;
									}
									case 'item': {
										name = c.content.name || 'Unnamed Item';
										tag = 'Item';
										content = (
											<ItemEditPanel item={c.content as Item} sourcebooks={props.sourcebooks} options={props.options} onChange={i => setElement(c.id, i)} />
										);
										break;
									}
									case 'monster': {
										name = c.content.name || 'Unnamed Monster';
										tag = 'Monster';
										content = (
											<MonsterEditPanel monster={c.content as Monster} similarMonsters={[]} sourcebooks={props.sourcebooks} options={props.options} onChange={m => setElement(c.id, m)} />
										);
										break;
									}
									case 'title': {
										name = c.content.name || 'Unnamed Title';
										tag = 'Title';
										content = (
											<TitleEditPanel title={c.content as Title} sourcebooks={props.sourcebooks} options={props.options} onChange={t => setElement(c.id, t)} />
										);
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
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						linkTargets.length > 0 ?
							<Popover
								trigger='click'
								content={
									<Space direction='vertical' style={{ width: '100%', padding: '0 5px' }}>
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
				playbook={props.playbook}
				sourcebooks={props.sourcebooks}
				heroes={props.heroes}
				options={props.options}
				mode={PanelMode.Full}
				onSelect={() => null}
				onStart={() => null}
			/>
		);
	};

	try {
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
				<Drawer open={addingEncounter} onClose={() => setAddingEncounter(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<div style={{ padding: '20px' }}>
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										props.playbook.encounters.map(e =>
											<SelectablePanel key={e.id} onSelect={() => addContentReference('encounter', e.id)}>
												<EncounterPanel encounter={e} sourcebooks={props.sourcebooks} heroes={props.heroes} options={props.options} />
											</SelectablePanel>
										)
									}
									{props.playbook.encounters.length === 0 ? <Empty /> : null}
								</Space>
							</div>
						}
						onClose={() => setAddingEncounter(false)}
					/>
				</Drawer>
				<Drawer open={addingMontage} onClose={() => setAddingMontage(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<div style={{ padding: '20px' }}>
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										props.playbook.montages.map(m =>
											<SelectablePanel key={m.id} onSelect={() => addContentReference('montage', m.id)}>
												<MontagePanel montage={m} />
											</SelectablePanel>
										)
									}
									{props.playbook.montages.length === 0 ? <Empty /> : null}
								</Space>
							</div>
						}
						onClose={() => setAddingMontage(false)}
					/>
				</Drawer>
				<Drawer open={addingNegotiation} onClose={() => setAddingNegotiation(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<div style={{ padding: '20px' }}>
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										props.playbook.negotiations.map(n =>
											<SelectablePanel key={n.id} onSelect={() => addContentReference('negotiation', n.id)}>
												<NegotiationPanel negotiation={n} />
											</SelectablePanel>
										)
									}
									{props.playbook.negotiations.length === 0 ? <Empty /> : null}
								</Space>
							</div>
						}
						onClose={() => setAddingNegotiation(false)}
					/>
				</Drawer>
				<Drawer open={addingMap} onClose={() => setAddingMap(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<div style={{ padding: '20px' }}>
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										props.playbook.tacticalMaps.map(tm =>
											<SelectablePanel key={tm.id} onSelect={() => addContentReference('map', tm.id)}>
												<TacticalMapPanel map={tm} display={TacticalMapDisplayType.Thumbnail} options={props.options} />
											</SelectablePanel>
										)
									}
									{props.playbook.tacticalMaps.length === 0 ? <Empty /> : null}
								</Space>
							</div>
						}
						onClose={() => setAddingMap(false)}
					/>
				</Drawer>
				<Drawer open={addingItem} onClose={() => setAddingItem(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<div style={{ padding: '20px' }}>
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										SourcebookLogic.getItems(props.sourcebooks).map(i =>
											<SelectablePanel key={i.id} onSelect={() => addContentElement('item', i)}>
												<ItemPanel item={i} options={props.options} />
											</SelectablePanel>
										)
									}
									{SourcebookLogic.getItems(props.sourcebooks).length === 0 ? <Empty /> : null}
								</Space>
							</div>
						}
						onClose={() => setAddingItem(false)}
					/>
				</Drawer>
				<Drawer open={addingMonster} onClose={() => setAddingMonster(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<div style={{ padding: '20px' }}>
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										SourcebookLogic.getMonsters(props.sourcebooks).map(m =>
											<SelectablePanel key={m.id} onSelect={() => addContentElement('monster', m)}>
												<MonsterPanel monster={m} options={props.options} />
											</SelectablePanel>
										)
									}
									{SourcebookLogic.getMonsters(props.sourcebooks).length === 0 ? <Empty /> : null}
								</Space>
							</div>
						}
						onClose={() => setAddingMonster(false)}
					/>
				</Drawer>
				<Drawer open={addingTitle} onClose={() => setAddingTitle(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<div style={{ padding: '20px' }}>
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										SourcebookLogic.getTitles(props.sourcebooks).map(t =>
											<SelectablePanel key={t.id} onSelect={() => addContentElement('title', t)}>
												<TitlePanel title={t} options={props.options} />
											</SelectablePanel>
										)
									}
									{SourcebookLogic.getItems(props.sourcebooks).length === 0 ? <Empty /> : null}
								</Space>
							</div>
						}
						onClose={() => setAddingTitle(false)}
					/>
				</Drawer>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
