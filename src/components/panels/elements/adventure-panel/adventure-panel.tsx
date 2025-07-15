import { Button, Drawer, Flex, Input, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, EditOutlined, InfoCircleOutlined, PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { Plot, PlotContent, PlotContentReference } from '../../../../models/plot';
import { Adventure } from '../../../../models/adventure';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Markdown } from '../../../controls/markdown/markdown';
import { Modal } from '../../../modals/modal/modal';
import { Montage } from '../../../../models/montage';
import { MontagePanel } from '../montage-panel/montage-panel';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationPanel } from '../negotiation-panel/negotiation-panel';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { PlotEditPanel } from '../../edit/plot-edit/plot-edit-panel';
import { PlotPanel } from '../plot-panel/plot-panel';
import { PowerRollPanel } from '../../power-roll/power-roll-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
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
	const [ selectedEncounter, setSelectedEncounter ] = useState<Encounter | null>(null);
	const [ selectedMontage, setSelectedMontage ] = useState<Montage | null>(null);
	const [ selectedNegotiation, setSelectedNegotiation ] = useState<Negotiation | null>(null);

	const addPlotPoint = (previousID?: string) => {
		const copy = Utils.copy(adventure);

		const plot = FactoryLogic.createAdventurePlot();
		copy.plot.plots.push(plot);

		if (previousID) {
			const previous = copy.plot.plots.find(p => p.id === previousID);
			if (previous) {
				previous.links.push({
					id: Utils.guid(),
					plotID: plot.id,
					label: ''
				});
			}
		}

		setAdventure(copy);
		setSelectedPlot(plot);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const deletePlotPoint = (id: string) => {
		const copy = Utils.copy(adventure);
		copy.plot.plots = copy.plot.plots.filter(p => p.id !== id);
		copy.plot.plots.forEach(p => {
			p.links = p.links.filter(l => l.plotID !== id);
		});
		setAdventure(copy);
		if (selectedPlot && (selectedPlot.id === id)) {
			setSelectedPlot(null);
		}
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const getContent = (content: PlotContent) => {
		switch (content.contentType) {
			case 'text':
				return (
					<div className={`content-text ${content.format}`}>
						<Markdown text={content.text} />
					</div>
				);
			case 'image':
				return (
					<div className='content-image'>
						<img className='picture' src={content.data} title={content.title} />
					</div>
				);
			case 'roll':
				return (
					<div className='content-roll'>
						<PowerRollPanel powerRoll={content.roll} />
					</div>
				);
			case 'reference':
				return getContentReference(content);
		}
	};

	const getContentReference = (content: PlotContentReference) => {
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
		}

		return null;
	};

	const getActions = (content: PlotContent) => {
		switch (content.contentType) {
			case 'text':
				return null;
			case 'image':
				return null;
			case 'roll':
				return null;
			case 'reference':
				return getActionsReference(content);
		}
	};

	const getActionsReference = (content: PlotContentReference) => {
		switch (content.type) {
			case 'encounter': {
				const encounter = props.playbook.encounters.find(e => e.id === content.contentID);
				if (encounter) {
					return (
						<Flex vertical={true} gap={5}>
							<Button title='Info' icon={<InfoCircleOutlined />} onClick={() => setSelectedEncounter(encounter)} />
							{props.onStart ? <Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('encounter', encounter, '')} /> : null}
							<Button title='Edit' icon={<EditOutlined />} onClick={() => navigation.goToPlaybookEdit('encounter', encounter.id)} />
						</Flex>
					);
				}
				break;
			}
			case 'montage': {
				const montage = props.playbook.montages.find(m => m.id === content.contentID);
				if (montage) {
					return (
						<Flex vertical={true} gap={5}>
							<Button title='Info' icon={<InfoCircleOutlined />} onClick={() => setSelectedMontage(montage)} />
							{props.onStart ? <Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('montage', montage, '')} /> : null}
							<Button title='Edit' icon={<EditOutlined />} onClick={() => navigation.goToPlaybookEdit('montage', montage.id)} />
						</Flex>
					);
				}
				break;
			}
			case 'negotiation': {
				const negotiation = props.playbook.negotiations.find(n => n.id === content.contentID);
				if (negotiation) {
					return (
						<Flex vertical={true} gap={5}>
							<Button title='Info' icon={<InfoCircleOutlined />} onClick={() => setSelectedNegotiation(negotiation)} />
							{props.onStart ? <Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('negotiation', negotiation, '')} /> : null}
							<Button title='Edit' icon={<EditOutlined />} onClick={() => navigation.goToPlaybookEdit('negotiation', negotiation.id)} />
						</Flex>
					);
				}
				break;
			}
			case 'map': {
				const map = props.playbook.tacticalMaps.find(tm => tm.id === content.contentID);
				if (map) {
					return (
						<Flex vertical={true} gap={5}>
							{props.onStart ? <Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('tactical-map', map, '')} /> : null}
							<Button title='Edit' icon={<EditOutlined />} onClick={() => navigation.goToPlaybookEdit('tactical-map', map.id)} />
						</Flex>
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
			copy.plot.name = value;
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

		const movePlotPoint = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(adventure);
			copy.plot.plots = Collections.move(copy.plot.plots, index, direction);
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
								<MultiLine value={adventure.description} onChange={setDescription} />
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
												<MultiLine placeholder='Description' value={section.description} onChange={value => setSectionDescription(n, value)} />
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
								<Button block={true} onClick={() => addPlotPoint()}>
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
				heroes={props.heroes}
				options={props.options}
				onChange={changePlotPoint}
				onAddAfter={addPlotPoint}
				onDelete={deletePlotPoint}
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
								{
									selectedPlot.content.map(c => (
										<div key={c.id} className='plot-content-row'>
											{getContent(c)}
											{getActions(c)}
										</div>
									))
								}
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
										{
											section.description ?
												<Markdown text={section.description} />
												:
												<div className='ds-text dimmed-text'>No details</div>
										}
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
					{props.mode !== PanelMode.Full ? <Markdown text={adventure.description} /> : null}
					{
						props.mode === PanelMode.Full ?
							<div className='plot-display-container'>
								{
									props.onChange || (adventure.plot.plots.length > 0) ?
										<div className='plot-workspace'>
											<PlotPanel
												plot={adventure.plot}
												adventure={adventure}
												selectedPlot={selectedPlot || undefined}
												onSelect={props.allowSelection ? setSelectedPlot : undefined}
												onCreate={props.onChange ? addPlotPoint : undefined}
											/>
										</div>
										: null
								}
								{
									props.allowSelection ?
										<div className='plot-sidebar'>
											{getSidebar()}
										</div>
										: null
								}
							</div>
							: null
					}
				</div>
				<Drawer open={!!selectedEncounter} onClose={() => setSelectedEncounter(null)} closeIcon={null} width='500px'>
					<Modal
						content={
							selectedEncounter ?
								<EncounterPanel
									encounter={selectedEncounter}
									sourcebooks={props.sourcebooks}
									heroes={props.heroes}
									options={props.options}
									mode={PanelMode.Full}
								/>
								: null
						}
						onClose={() => setSelectedEncounter(null)}
					/>
				</Drawer>
				<Drawer open={!!selectedMontage} onClose={() => setSelectedMontage(null)} closeIcon={null} width='500px'>
					<Modal
						content={
							selectedMontage ?
								<MontagePanel
									montage={selectedMontage}
									mode={PanelMode.Full}
								/>
								: null
						}
						onClose={() => setSelectedMontage(null)}
					/>
				</Drawer>
				<Drawer open={!!selectedNegotiation} onClose={() => setSelectedNegotiation(null)} closeIcon={null} width='500px'>
					<Modal
						content={
							selectedNegotiation ?
								<NegotiationPanel
									negotiation={selectedNegotiation}
									mode={PanelMode.Full}
								/>
								: null
						}
						onClose={() => setSelectedNegotiation(null)}
					/>
				</Drawer>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
