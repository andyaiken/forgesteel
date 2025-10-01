import { Button, Input, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Adventure } from '@/models/adventure';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Playbook } from '@/models/playbook';
import { PlaybookLogic } from '@/logic/playbook-logic';
import { Plot } from '@/models/plot';
import { PlotEditPanel } from '@/components/panels/edit/plot-edit/plot-edit-panel';
import { PlotGraphPanel } from '@/components/panels/plot-graph/plot-graph-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './adventure-edit-panel.scss';

interface Props {
	adventure: Adventure;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	onChange: (adventure: Adventure) => void;
}

export const AdventureEditPanel = (props: Props) => {
	const [ adventure, setAdventure ] = useState<Adventure>(Utils.copy(props.adventure));
	const [ currentPlot, setCurrentPlot ] = useState<Plot>(adventure.plot);
	const [ selectedPlot, setSelectedPlot ] = useState<Plot | null>(null);

	const addPlotPoint = (previousID?: string) => {
		const copy = Utils.copy(adventure);
		const currentPlotCopy = PlaybookLogic.getPlotPoint(copy.plot, currentPlot.id);

		if (currentPlotCopy) {
			const plot = FactoryLogic.createAdventurePlot();
			currentPlotCopy.plots.push(plot);

			if (previousID) {
				const previous = currentPlotCopy.plots.find(p => p.id === previousID);
				if (previous) {
					previous.links.push({
						id: Utils.guid(),
						plotID: plot.id,
						label: ''
					});
				}
			}

			setAdventure(copy);
			setCurrentPlot(currentPlotCopy);
			setSelectedPlot(plot);
			if (props.onChange) {
				props.onChange(copy);
			}
		}
	};

	const deletePlotPoint = (id: string) => {
		const copy = Utils.copy(adventure);
		const currentPlotCopy = PlaybookLogic.getPlotPoint(copy.plot, currentPlot.id);

		if (currentPlotCopy) {
			currentPlotCopy.plots = currentPlotCopy.plots.filter(p => p.id !== id);
			currentPlotCopy.plots.forEach(p => {
				p.links = p.links.filter(l => l.plotID !== id);
			});

			setAdventure(copy);
			setCurrentPlot(currentPlotCopy);
			if (selectedPlot && (selectedPlot.id === id)) {
				setSelectedPlot(null);
			}
			if (props.onChange) {
				props.onChange(copy);
			}
		}
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
								<HeaderText>Party</HeaderText>
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
								<HeaderText
									extra={
										<Button type='text' icon={<PlusOutlined />} onClick={addSection} />
									}
								>
									Sections
								</HeaderText>
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
							</Space>
						)
					},
					{
						key: '4',
						label: 'Plot Points',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								<HeaderText
									extra={
										<Button type='text' icon={<PlusOutlined />} onClick={() => addPlotPoint()} />
									}
								>
									Plot Points
								</HeaderText>
								{
									currentPlot.plots.map((p, n) => (
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
									currentPlot.plots.length === 0 ?
										<Empty />
										: null
								}
							</Space>
						)
					}
				]}
			/>
		);
	};

	const getPlotEditor = (plot: Plot) => {
		const changePlotPoint = (plot: Plot) => {
			const copy = Utils.copy(adventure);
			const currentPlotCopy = PlaybookLogic.getPlotPoint(copy.plot, currentPlot.id);

			if (currentPlotCopy) {
				const index = currentPlotCopy.plots.findIndex(p => p.id === plot.id);
				if (index !== -1) {
					currentPlotCopy.plots[index] = plot;
				}

				setAdventure(copy);
				setCurrentPlot(currentPlotCopy);
				if (selectedPlot && (selectedPlot.id === plot.id)) {
					setSelectedPlot(plot);
				}
				if (props.onChange) {
					props.onChange(copy);
				}
			}
		};

		return (
			<PlotEditPanel
				key={plot.id}
				plot={plot}
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

	const getEditor = () => {
		if (selectedPlot) {
			return getPlotEditor(selectedPlot);
		}

		if (currentPlot.id !== adventure.plot.id) {
			return getPlotEditor(currentPlot);
		}

		return getAdventureEditor();
	};

	try {
		return (
			<ErrorBoundary>
				<div className='adventure-edit-panel'>
					<div className='plot-workspace'>
						<PlotGraphPanel
							label={currentPlot === adventure.plot ? adventure.name || 'Unnamed Adventure' : currentPlot.name || 'Unnamed Plot Point'}
							plot={currentPlot}
							adventure={adventure}
							selectedPlot={selectedPlot || undefined}
							onSelect={setSelectedPlot}
							onOpen={plot => {
								setSelectedPlot(null);
								setCurrentPlot(plot);
							}}
							onCreate={addPlotPoint}
						/>
					</div>
					<div className='plot-editor'>
						{getEditor()}
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
