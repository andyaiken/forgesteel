import { Button, Input, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, EditOutlined, PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { Plot, PlotContent } from '../../../../models/plot';
import { Adventure } from '../../../../models/adventure';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { EncounterPanel } from '../encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { ItemPanel } from '../item-panel/item-panel';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { MontagePanel } from '../montage-panel/montage-panel';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NegotiationPanel } from '../negotiation-panel/negotiation-panel';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { PlotEditPanel } from '../../edit/plot-edit/plot-edit-panel';
import { PlotPanel } from '../plot-panel/plot-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../tactical-map-panel/tactical-map-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useState } from 'react';

import './adventure-panel.scss';

interface Props {
	adventure: Adventure;
	mode?: PanelMode;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	allowSelection?: boolean;
	onChange?: (adventure: Adventure) => void;
	onStart?: (kind: PlaybookElementKind, element: Element, party: string) => void;
}

export const AdventurePanel = (props: Props) => {
	const navigation = useNavigation();
	const [ adventure, setAdventure ] = useState<Adventure>(Utils.copy(props.adventure));
	const [ selectedPlot, setSelectedPlot ] = useState<Plot | null>(null);

	const getContent = (content: PlotContent) => {
		if (!content.contentID) {
			return null;
		}

		switch (content.type) {
			case 'encounter': {
				const encounter = props.playbook.encounters.find(e => e.id === content.contentID);
				if (encounter) {
					return (
						<SelectablePanel showShadow={false} onSelect={() => navigation.goToPlaybookView('encounter', encounter.id)}>
							<EncounterPanel
								encounter={encounter}
								sourcebooks={props.sourcebooks}
								heroes={props.heroes}
								options={props.options}
							/>
						</SelectablePanel>
					);
				}
				break;
			}
			case 'montage': {
				const montage = props.playbook.montages.find(m => m.id === content.contentID);
				if (montage) {
					return (
						<SelectablePanel showShadow={false} onSelect={() => navigation.goToPlaybookView('montage', montage.id)}>
							<MontagePanel
								montage={montage}
							/>
						</SelectablePanel>
					);
				}
				break;
			}
			case 'negotiation': {
				const negotiation = props.playbook.negotiations.find(n => n.id === content.contentID);
				if (negotiation) {
					return (
						<SelectablePanel showShadow={false} onSelect={() => navigation.goToPlaybookView('negotiation', negotiation.id)}>
							<NegotiationPanel
								negotiation={negotiation}
							/>
						</SelectablePanel>
					);
				}
				break;
			}
			case 'map': {
				const map = props.playbook.tacticalMaps.find(tm => tm.id === content.contentID);
				if (map) {
					return (
						<SelectablePanel showShadow={false} onSelect={() => navigation.goToPlaybookView('tactical-map', map.id)}>
							<HeaderText level={1}>{map.name || 'Unnamed Map'}</HeaderText>
							<div className='tactical-map-container'>
								<TacticalMapPanel
									map={map}
									display={TacticalMapDisplayType.Thumbnail}
									options={props.options}
								/>
							</div>
						</SelectablePanel>
					);
				}
				break;
			}
			case 'item': {
				const item = SourcebookLogic.getItems(props.sourcebooks).find(i => i.id === content.contentID);
				if (item) {
					return (
						<SelectablePanel showShadow={false} onSelect={() => navigation.goToLibraryView('item', item.id)}>
							<ItemPanel
								item={item}
								options={props.options}
							/>
						</SelectablePanel>
					);
				}
				break;
			}
			case 'monster': {
				const monster = SourcebookLogic.getMonster(props.sourcebooks, content.contentID);
				const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, content.contentID);
				if (monster && monsterGroup) {
					return (
						<SelectablePanel showShadow={false} onSelect={() => navigation.goToLibraryView('monster-group', monsterGroup.id, monster.id)}>
							<MonsterPanel
								monster={monster}
								monsterGroup={monsterGroup}
								options={props.options}
							/>
						</SelectablePanel>
					);
				}
				break;
			}
		}

		return null;
	};

	const getActions = (content: PlotContent) => {
		if (!content.contentID) {
			return null;
		}

		switch (content.type) {
			case 'encounter': {
				const encounter = props.playbook.encounters.find(e => e.id === content.contentID);
				if (encounter) {
					return (
						<>
							{props.onStart ? <Button icon={<PlayCircleOutlined />} onClick={() => props.onStart!('encounter', encounter, '')} /> : null}
						</>
					);
				}
				break;
			}
			case 'montage': {
				const montage = props.playbook.montages.find(m => m.id === content.contentID);
				if (montage) {
					return (
						<>
							{props.onStart ? <Button icon={<PlayCircleOutlined />} onClick={() => props.onStart!('montage', montage, '')} /> : null}
						</>
					);
				}
				break;
			}
			case 'negotiation': {
				const negotiation = props.playbook.negotiations.find(n => n.id === content.contentID);
				if (negotiation) {
					return (
						<>
							{props.onStart ? <Button icon={<PlayCircleOutlined />} onClick={() => props.onStart!('negotiation', negotiation, '')} /> : null}
						</>
					);
				}
				break;
			}
			case 'map': {
				const map = props.playbook.tacticalMaps.find(tm => tm.id === content.contentID);
				if (map) {
					return (
						<>
							{props.onStart ? <Button icon={<PlayCircleOutlined />} onClick={() => props.onStart!('tactical-map', map, '')} /> : null}
						</>
					);
				}
				break;
			}
		}

		return null;
	};

	const getAdventureEditor = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(adventure);
			copy.name = value;
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(adventure);
			copy.description = value;
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const setCount = (value: number) => {
			const copy = Utils.copy(adventure);
			copy.party.count = value;
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const setLevel = (value: number) => {
			const copy = Utils.copy(adventure);
			copy.party.level = value;
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const addSection = () => {
			const copy = Utils.copy(adventure);
			copy.introduction.push(FactoryLogic.createElement());
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const setSectionName = (index: number, value: string) => {
			const copy = Utils.copy(adventure);
			const m = copy.introduction[index];
			m.name = value;
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const setSectionDescription = (index: number, value: string) => {
			const copy = Utils.copy(adventure);
			const m = copy.introduction[index];
			m.description = value;
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const moveSection = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(adventure);
			copy.introduction = Collections.move(copy.introduction, index, direction);
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const deleteSection = (id: string) => {
			const copy = Utils.copy(adventure);
			copy.introduction = copy.introduction.filter(section => section.id !== id);
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const addPlotPoint = () => {
			const copy = Utils.copy(adventure);
			copy.plot.plots.push(FactoryLogic.createAdventurePlot());
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const movePlotPoint = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(adventure);
			copy.plot.plots = Collections.move(copy.plot.plots, index, direction);
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		const deletePlotPoint = (id: string) => {
			const copy = Utils.copy(adventure);
			copy.plot.plots = copy.plot.plots.filter(p => p.id !== id);
			setAdventure(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		return (
			<Tabs
				items={[
					{
						key: '1',
						label: 'Adventure',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								<HeaderText>Name</HeaderText>
								<Input
									status={adventure.name === '' ? 'warning' : ''}
									placeholder='Name'
									allowClear={true}
									value={adventure.name}
									onChange={e => setName(e.target.value)}
								/>
								<HeaderText>Description</HeaderText>
								<MultiLine label='Description' value={adventure.description} onChange={setDescription} />
							</Space>
						)
					},
					{
						key: '2',
						label: 'Party',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								<NumberSpin label='Number of Heroes' min={1} value={adventure.party.count} onChange={setCount} />
								<NumberSpin label='Hero Level' min={1} max={10} value={adventure.party.level} onChange={setLevel} />
							</Space>
						)
					},
					{
						key: '3',
						label: 'Sections',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									adventure.introduction.map((section, n) => (
										<Expander
											key={section.id}
											title={section.name || 'Unnamed Section'}
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSection(n, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSection(n, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSection(section.id); }} />
											]}
										>
											<HeaderText>Section</HeaderText>
											<Space direction='vertical' style={{ width: '100%' }}>
												<Input
													status={section.name === '' ? 'warning' : ''}
													placeholder='Name'
													allowClear={true}
													value={section.name}
													onChange={e => setSectionName(n, e.target.value)}
												/>
												<MultiLine label='Description' value={section.description} onChange={value => setSectionDescription(n, value)} />
											</Space>
										</Expander>
									))
								}
								{
									adventure.introduction.length === 0 ?
										<Empty />
										: null
								}
								<Button block={true} onClick={addSection}>
									<PlusOutlined />
									Add a section
								</Button>
							</Space>
						)
					},
					{
						key: '4',
						label: 'Plot Points',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									adventure.plot.plots.map((p, n) => (
										<Expander
											key={p.id}
											title={p.name || 'Unnamed Plot Point'}
											extra={[
												<Button key='edit' type='text' title='Edit' icon={<EditOutlined />} onClick={e => { e.stopPropagation(); setSelectedPlot(p); }} />,
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); movePlotPoint(n, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); movePlotPoint(n, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deletePlotPoint(p.id); }} />
											]}
										>
											<HeaderText>{p.name}</HeaderText>
											<Markdown text={p.description} />
										</Expander>
									))
								}
								{
									adventure.plot.plots.length === 0 ?
										<Empty />
										: null
								}
								<Button block={true} onClick={addPlotPoint}>
									<PlusOutlined />
									Add a plot point
								</Button>
							</Space>
						)
					}
				]}
			/>
		);
	};

	const getPlotEditor = () => {
		if (!selectedPlot) {
			return null;
		}

		const changePlotPoint = (plot: Plot) => {
			const copy = Utils.copy(adventure);
			const parent = PlaybookLogic.getPlotPointParent(copy.plot, plot.id);
			if (parent) {
				const index = parent.plots.findIndex(p => p.id === plot.id);
				if (index !== -1) {
					parent.plots[index] = plot;
				}
				setAdventure(copy);
				if (props.onChange) {
					props.onChange(copy);
				}
			}
		};

		return (
			<PlotEditPanel
				key={selectedPlot.id}
				plot={selectedPlot}
				adventure={adventure}
				playbook={props.playbook}
				sourcebooks={props.sourcebooks}
				onChange={changePlotPoint}
			/>
		);
	};

	const getSidebar = () => {
		if (selectedPlot) {
			return (
				<>
					{
						props.onChange ?
							getPlotEditor()
							:
							<>
								<HeaderText level={1}>{selectedPlot.name || 'Unnamed Plot Point'}</HeaderText>
								{
									selectedPlot.description ?
										<Markdown text={selectedPlot.description} />
										:
										<div className='ds-text dimmed-text'>No details</div>
								}
								{selectedPlot.content.length > 0 ? <HeaderText level={1}>Content</HeaderText> : null}
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										selectedPlot.content.map(c => (
											<div key={c.id} className='plot-content-row'>
												{getContent(c)}
												{getActions(c)}
											</div>
										))
									}
								</Space>
								{selectedPlot.links.length > 0 ? <HeaderText level={1}>Links</HeaderText> : null}
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										selectedPlot.links.map(l => (
											<Button key={l.id} block={true} onClick={() => setSelectedPlot(adventure.plot.plots.find(p => p.id === l.plotID)!)}>
												{FormatLogic.getPlotLinkTitle(l, adventure.plot)}
											</Button>
										))
									}
								</Space>
							</>
					}
				</>
			);
		}

		return (
			<>
				{
					props.onChange ?
						getAdventureEditor()
						:
						<>
							<Markdown text={adventure.description} />
							<div className='ds-text'>
								A <b>DRAW STEEL</b> adventure for {adventure.party.count} heroes of level {adventure.party.level}.
							</div>
							{
								adventure.introduction.map(section => (
									<div key={section.id}>
										<HeaderText>{section.name}</HeaderText>
										{section.description ? <Markdown text={section.description} /> : <div className='ds-text dimmed-text'>None</div>}
									</div>
								))
							}
						</>
				}
			</>
		);
	};

	try {
		let className = 'adventure-panel';
		if (props.mode !== PanelMode.Full) {
			className += ' compact';
		}
		if (props.onChange) {
			className += ' editor';
		}

		return (
			<ErrorBoundary>
				<div className={className} id={props.mode === PanelMode.Full ? adventure.id : undefined}>
					{props.onChange ? null : <HeaderText level={1}>{adventure.name || 'Unnamed Adventure'}</HeaderText>}
					{
						props.mode === PanelMode.Full ?
							<div className='plot-display-container'>
								<div className='plot-workspace'>
									<PlotPanel
										plot={adventure.plot}
										selectedPlot={selectedPlot || undefined}
										onSelect={props.allowSelection ? setSelectedPlot : undefined}
									/>
								</div>
								{
									props.allowSelection ?
										<div className='plot-sidebar'>
											{
												props.onChange ?
													<Select
														style={{ width: '100%' }}
														options={[ null, ...adventure.plot.plots ].map(p => ({ value: p ? p.id : '', label: p ? p.name || 'Unnamed Plot Point' : 'Adventure' }))}
														optionRender={option => <div className='ds-text'>{option.data.label}</div>}
														showSearch={true}
														filterOption={(input, option) => {
															const strings = option ?
																[
																	option.label
																]
																: [];
															return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
														}}
														value={selectedPlot ? selectedPlot.id : ''}
														onChange={id => setSelectedPlot(adventure.plot.plots.find(p => p.id === id) || null)}
													/>
													: null
											}
											{getSidebar()}
										</div>
										: null
								}
							</div>
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
