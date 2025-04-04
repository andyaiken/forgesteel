import { Button, Space, Tabs } from 'antd';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { Plot, PlotContent } from '../../../../models/plot';
import { Adventure } from '../../../../models/adventure';
import { Element } from '../../../../models/element';
import { EncounterPanel } from '../encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { ItemPanel } from '../item-panel/item-panel';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { MontagePanel } from '../montage-panel/montage-panel';
import { NegotiationPanel } from '../negotiation-panel/negotiation-panel';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { PlayCircleOutlined } from '@ant-design/icons';
import { PlotPanel } from '../plot-panel/plot-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../tactical-map-panel/tactical-map-panel';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useState } from 'react';

import './adventure-panel.scss';

interface Props {
	adventure: Adventure;
	mode?: PanelMode;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	options: Options;
	allowSelection?: boolean;
	start?: (kind: PlaybookElementKind, element: Element, party: string) => void;
}

export const AdventurePanel = (props: Props) => {
	const navigation = useNavigation();
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
						<SelectablePanel onSelect={() => navigation.goToPlaybookView('encounter', encounter.id)}>
							<EncounterPanel
								encounter={encounter}
								sourcebooks={props.sourcebooks}
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
						<SelectablePanel onSelect={() => navigation.goToPlaybookView('montage', montage.id)}>
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
						<SelectablePanel onSelect={() => navigation.goToPlaybookView('negotiation', negotiation.id)}>
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
						<SelectablePanel onSelect={() => navigation.goToPlaybookView('tactical-map', map.id)}>
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
						<SelectablePanel onSelect={() => navigation.goToLibraryView('item', item.id)}>
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
						<SelectablePanel onSelect={() => navigation.goToLibraryView('monster-group', monsterGroup.id, monster.id)}>
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
							{props.start ? <Button icon={<PlayCircleOutlined />} onClick={() => props.start!('encounter', encounter, '')} /> : null}
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
							{props.start ? <Button icon={<PlayCircleOutlined />} onClick={() => props.start!('montage', montage, '')} /> : null}
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
							{props.start ? <Button icon={<PlayCircleOutlined />} onClick={() => props.start!('negotiation', negotiation, '')} /> : null}
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
							{props.start ? <Button icon={<PlayCircleOutlined />} onClick={() => props.start!('tactical-map', map, '')} /> : null}
						</>
					);
				}
				break;
			}
		}

		return null;
	};

	const getPlotInfo = () => {
		if (props.adventure.plot.plots.length === 0) {
			return null;
		}

		if (selectedPlot) {
			return (
				<div className='plot-details'>
					<HeaderText level={1}>{selectedPlot.name || 'Unnamed Plot Point'}</HeaderText>
					{
						selectedPlot.description ?
							<Markdown text={selectedPlot.description} />
							:
							<div className='ds-text dimmed-text'>No details</div>
					}
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
								<Button key={l.id} block={true} onClick={() => setSelectedPlot(props.adventure.plot.plots.find(p => p.id === l.plotID)!)}>
									{FormatLogic.getPlotLinkTitle(l, props.adventure.plot)}
								</Button>
							))
						}
					</Space>
				</div>
			);
		}

		return (
			<div className='plot-details'>
				<div className='ds-text dimmed-text'>Select a plot point to view details.</div>
			</div>
		);
	};

	try {
		return (
			<ErrorBoundary>
				<div className={props.mode === PanelMode.Full ? 'adventure-panel' : 'adventure-panel compact'} id={props.mode === PanelMode.Full ? props.adventure.id : undefined}>
					<HeaderText level={1}>{props.adventure.name || 'Unnamed Adventure'}</HeaderText>
					<Markdown text={props.adventure.description} />
					<div className='ds-text'>A <b>DRAW STEEL</b> adventure for {props.adventure.party.count} heroes of level {props.adventure.party.level}.</div>
					{
						props.mode === PanelMode.Full ?
							<Tabs
								items={[
									{
										key: 'introduction',
										label: 'Introduction',
										children: props.adventure.introduction.map(section => (
											<div key={section.id}>
												<HeaderText>{section.name}</HeaderText>
												{section.description ? <Markdown text={section.description} /> : <div className='ds-text dimmed-text'>None</div>}
											</div>
										))
									},
									{
										key: 'plot',
										label: 'Plot',
										children:
											<div className='plot-display-container'>
												<PlotPanel
													plot={props.adventure.plot}
													selectedPlot={selectedPlot || undefined}
													onSelect={props.allowSelection ? setSelectedPlot : undefined}
												/>
												{props.allowSelection ? getPlotInfo() : null}
											</div>
									}
								]}
							/>
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
