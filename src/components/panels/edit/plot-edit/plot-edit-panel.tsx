import { Button, Drawer, Flex, Input, Popover, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Plot, PlotContent, PlotLink } from '../../../../models/plot';
import { Adventure } from '../../../../models/adventure';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../../elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Modal } from '../../../modals/modal/modal';
import { Montage } from '../../../../models/montage';
import { MontagePanel } from '../../elements/montage-panel/montage-panel';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationPanel } from '../../elements/negotiation-panel/negotiation-panel';
import { Options } from '../../../../models/options';
import { Playbook } from '../../../../models/playbook';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { TacticalMap } from '../../../../models/tactical-map';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../../elements/tactical-map-panel/tactical-map-panel';
import { Utils } from '../../../../utils/utils';
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
	const [ addingContent, setAddingContent ] = useState<boolean>(false);

	const parentPlot = PlaybookLogic.getPlotPointParent(props.adventure.plot, plot.id) as Plot;
	const upstreamIDs = PlaybookLogic.getUpstreamPlotPoints(parentPlot, plot.id).map(p => p.id);
	const linkTargets = parentPlot.plots.filter(p => !plot.links.map(x => x.plotID).includes(p.id) && !upstreamIDs.includes(p.id));

	const addContent = (type: 'encounter' | 'montage' | 'negotiation' | 'map', id: string) => {
		const copy = Utils.copy(plot);
		copy.content.push({
			id: Utils.guid(),
			type: type,
			contentID: id
		});
		setPlot(copy);
		setAddingContent(false);
		props.onChange(copy);
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
				<MultiLine label='Description' value={plot.description} onChange={setDescription} />
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

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={() => setAddingContent(true)} />
					}
				>
					Content
				</HeaderText>
				{
					plot.content.map(c => {
						let element: Element |undefined = undefined;
						switch (c.type) {
							case 'encounter':
								element = props.playbook.encounters.find(e => e.id === c.contentID);
								break;
							case 'montage':
								element = props.playbook.montages.find(m => m.id === c.contentID);
								break;
							case 'negotiation':
								element = props.playbook.negotiations.find(n => n.id === c.contentID);
								break;
							case 'map':
								element = props.playbook.tacticalMaps.find(tm => tm.id === c.contentID);
								break;
						}
						return element ?
							<Expander
								key={c.id}
								title={element.name}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveContent(c, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveContent(c, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteContent(c); }} />
								]}
							>
								{
									c.type === 'encounter' ?
										<EncounterPanel encounter={element as Encounter} sourcebooks={props.sourcebooks} heroes={props.heroes} options={props.options} />
										: null
								}
								{
									c.type === 'montage' ?
										<MontagePanel montage={element as Montage} />
										: null
								}
								{
									c.type === 'negotiation' ?
										<NegotiationPanel negotiation={element as Negotiation} />
										: null
								}
								{
									c.type === 'map' ?
										<TacticalMapPanel map={element as TacticalMap} display={TacticalMapDisplayType.Thumbnail} options={props.options} />
										: null
								}
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
									<Space direction='vertical' style={{ width: '100%' }}>
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
							}
						]}
						tabBarExtraContent={
							<Flex gap={5}>
								<Button icon={<PlusOutlined />} onClick={() => props.onAddAfter(plot.id)}>Add Point After</Button>
								<DangerButton onConfirm={() => props.onDelete(plot.id)} />
							</Flex>
						}
					/>
				</div>
				<Drawer open={addingContent} onClose={() => setAddingContent(false)} closeIcon={null} width='500px'>
					<Modal
						content={
							<div style={{ padding: '0 20px' }}>
								<Tabs
									items={[
										{
											key: '1',
											label: 'Encounters',
											children: (
												<Space direction='vertical' style={{ width: '100%' }}>
													{
														props.playbook.encounters.map(e =>
															<SelectablePanel key={e.id} onSelect={() => addContent('encounter', e.id)}>
																<EncounterPanel encounter={e} sourcebooks={props.sourcebooks} heroes={props.heroes} options={props.options} />
															</SelectablePanel>
														)
													}
													{props.playbook.encounters.length === 0 ? <Empty /> : null}
												</Space>
											)
										},
										{
											key: '2',
											label: 'Montages',
											children: (
												<Space direction='vertical' style={{ width: '100%' }}>
													{
														props.playbook.montages.map(m =>
															<SelectablePanel key={m.id} onSelect={() => addContent('montage', m.id)}>
																<MontagePanel montage={m} />
															</SelectablePanel>
														)
													}
													{props.playbook.montages.length === 0 ? <Empty /> : null}
												</Space>
											)
										},
										{
											key: '3',
											label: 'Negotiations',
											children: (
												<Space direction='vertical' style={{ width: '100%' }}>
													{
														props.playbook.negotiations.map(n =>
															<SelectablePanel key={n.id} onSelect={() => addContent('negotiation', n.id)}>
																<NegotiationPanel negotiation={n} />
															</SelectablePanel>
														)
													}
													{props.playbook.negotiations.length === 0 ? <Empty /> : null}
												</Space>
											)
										},
										{
											key: '4',
											label: 'Tactical Maps',
											children: (
												<Space direction='vertical' style={{ width: '100%' }}>
													{
														props.playbook.tacticalMaps.map(tm =>
															<SelectablePanel key={tm.id} onSelect={() => addContent('map', tm.id)}>
																<TacticalMapPanel map={tm} display={TacticalMapDisplayType.Thumbnail} options={props.options} />
															</SelectablePanel>
														)
													}
													{props.playbook.tacticalMaps.length === 0 ? <Empty /> : null}
												</Space>
											)
										}
									]}
								/>
							</div>
						}
						onClose={() => setAddingContent(false)}
					/>
				</Drawer>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
