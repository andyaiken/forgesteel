import { Alert, Button, Drawer, Flex, Space } from 'antd';
import { EditOutlined, InfoCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Plot, PlotContent, PlotContentReference } from '@/models/plot';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Adventure } from '@/models/adventure';
import { Element } from '@/models/element';
import { ElementModal } from '@/components/modals/element/element-modal';
import { Empty } from '@/components/controls/empty/empty';
import { EncounterPanel } from '@/components/panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Format } from '@/utils/format';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { MontagePanel } from '@/components/panels/elements/montage-panel/montage-panel';
import { NegotiationPanel } from '@/components/panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { PowerRollPanel } from '@/components/panels/power-roll/power-roll-panel';
import { SashPanel } from '@/components/panels/sash/sash-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { useNavigation } from '@/hooks/use-navigation';
import { useState } from 'react';

import './plot-panel.scss';

interface PlotPanelProps {
	plot: Plot;
	adventure: Adventure;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	mode?: PanelMode;
	onSelect: (plot: Plot) => void;
	onStart: (kind: SourcebookElementKind, element: Element, party: string) => void;
}

export const PlotPanel = (props: PlotPanelProps) => {
	const navigation = useNavigation();
	const [ selectedReference, setSelectedReference ] = useState<PlotContentReference | null>(null);

	const getContent = (content: PlotContent) => {
		switch (content.contentType) {
			case 'text':
				if (content.format === 'director') {
					return (
						<Alert
							type='info'
							showIcon={true}
							title={content.text}
							style={{ width: '100%' }}
						/>
					);
				}
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
			case 'reference': {
				switch (content.type) {
					case 'encounter': {
						const encounter = SourcebookLogic.getEncounters(props.sourcebooks).find(e => e.id === content.contentID);
						if (encounter) {
							return (
								<SelectablePanel style={{ overflow: 'hidden' }} onSelect={() => navigation.goToLibrary('encounter', encounter.id)}>
									<EncounterPanel
										encounter={encounter}
										sourcebooks={props.sourcebooks}
										heroes={props.heroes}
										options={props.options}
									/>
									<SashPanel monogram='Encounter' />
								</SelectablePanel>
							);
						}
						break;
					}
					case 'montage': {
						const montage = SourcebookLogic.getMontages(props.sourcebooks).find(m => m.id === content.contentID);
						if (montage) {
							return (
								<SelectablePanel style={{ overflow: 'hidden' }} onSelect={() => navigation.goToLibrary('montage', montage.id)}>
									<MontagePanel
										montage={montage}
										heroes={props.heroes}
										sourcebooks={props.sourcebooks}
										options={props.options}
									/>
									<SashPanel monogram='Montage' />
								</SelectablePanel>
							);
						}
						break;
					}
					case 'negotiation': {
						const negotiation = SourcebookLogic.getNegotiations(props.sourcebooks).find(n => n.id === content.contentID);
						if (negotiation) {
							return (
								<SelectablePanel style={{ overflow: 'hidden' }} onSelect={() => navigation.goToLibrary('negotiation', negotiation.id)}>
									<NegotiationPanel
										negotiation={negotiation}
										sourcebooks={props.sourcebooks}
										options={props.options}
									/>
									<SashPanel monogram='Negotiation' />
								</SelectablePanel>
							);
						}
						break;
					}
					case 'tactical-map': {
						const map = SourcebookLogic.getTacticalMaps(props.sourcebooks).find(tm => tm.id === content.contentID);
						if (map) {
							return (
								<SelectablePanel style={{ overflow: 'hidden' }} onSelect={() => navigation.goToLibrary('tactical-map', map.id)}>
									<HeaderText level={1}>{map.name || 'Unnamed Map'}</HeaderText>
									<div className='tactical-map-container'>
										<TacticalMapPanel
											map={map}
											display={TacticalMapDisplayType.Thumbnail}
											sourcebooks={props.sourcebooks}
											options={props.options}
										/>
									</div>
									<SashPanel monogram='Map' />
								</SelectablePanel>
							);
						}
						break;
					}
					default: {
						const element = SourcebookLogic.getElement(content.contentID, props.sourcebooks);
						if (element) {
							return (
								<SelectablePanel style={{ overflow: 'hidden' }} onSelect={() => navigation.goToLibrary(content.type, element.id)}>
									<HeaderText level={1}>{element.name || 'Unnamed Element'}</HeaderText>
									<div className='ds-text'>{element.description}</div>
									<SashPanel monogram={Format.capitalize(content.type.split('-').join(' '))} />
								</SelectablePanel>
							);
						}
						break;
					}
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
			case 'reference': {
				switch (content.type) {
					case 'encounter': {
						const encounter = SourcebookLogic.getEncounters(props.sourcebooks).find(e => e.id === content.contentID);
						if (encounter) {
							return (
								<Flex vertical={true} gap={5}>
									<Button title='Info' icon={<InfoCircleOutlined />} onClick={() => setSelectedReference(content)} />
									<Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('encounter', encounter, '')} />
									<Button title='Edit' icon={<EditOutlined />} onClick={() => navigation.goToLibraryEdit('encounter', SourcebookLogic.getEncounterSourcebook(props.sourcebooks, encounter)!.id, encounter.id)} />
								</Flex>
							);
						}
						break;
					}
					case 'montage': {
						const montage = SourcebookLogic.getMontages(props.sourcebooks).find(m => m.id === content.contentID);
						if (montage) {
							return (
								<Flex vertical={true} gap={5}>
									<Button title='Info' icon={<InfoCircleOutlined />} onClick={() => setSelectedReference(content)} />
									<Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('montage', montage, '')} />
									<Button title='Edit' icon={<EditOutlined />} onClick={() => navigation.goToLibraryEdit('montage', SourcebookLogic.getMontageSourcebook(props.sourcebooks, montage)!.id, montage.id)} />
								</Flex>
							);
						}
						break;
					}
					case 'negotiation': {
						const negotiation = SourcebookLogic.getNegotiations(props.sourcebooks).find(n => n.id === content.contentID);
						if (negotiation) {
							return (
								<Flex vertical={true} gap={5}>
									<Button title='Info' icon={<InfoCircleOutlined />} onClick={() => setSelectedReference(content)} />
									<Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('negotiation', negotiation, '')} />
									<Button title='Edit' icon={<EditOutlined />} onClick={() => navigation.goToLibraryEdit('negotiation', SourcebookLogic.getNegotiationSourcebook(props.sourcebooks, negotiation)!.id, negotiation.id)} />
								</Flex>
							);
						}
						break;
					}
					case 'tactical-map': {
						const map = SourcebookLogic.getTacticalMaps(props.sourcebooks).find(tm => tm.id === content.contentID);
						if (map) {
							return (
								<Flex vertical={true} gap={5}>
									<Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('tactical-map', map, '')} />
									<Button title='Edit' icon={<EditOutlined />} onClick={() => navigation.goToLibraryEdit('tactical-map', SourcebookLogic.getTacticalMapSourcebook(props.sourcebooks, map)!.id, map.id)} />
								</Flex>
							);
						}
						break;
					}
					default: {
						return (
							<Flex vertical={true} gap={5}>
								<Button title='Info' icon={<InfoCircleOutlined />} onClick={() => setSelectedReference(content)} />
							</Flex>
						);
					}
				}
				break;
			}
		}

		return null;
	};

	if (props.mode !== PanelMode.Full) {
		return (
			<ErrorBoundary>
				<div className='plot-panel compact'>
					<HeaderText level={1}>{props.plot.name || 'Unnamed Plot Point'}</HeaderText>
					<Markdown text={props.plot.description} />
				</div>
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary>
			<div className='plot-panel'>
				<HeaderText level={1}>{props.plot.name || 'Unnamed Plot Point'}</HeaderText>
				<Markdown text={props.plot.description} />
				{
					props.plot.content.map(c => (
						<div key={c.id} className='plot-content-row'>
							{getContent(c)}
							{getActions(c)}
						</div>
					))
				}
				{!props.plot.description && (props.plot.content.length === 0) ? <Empty text='No details' /> : null}
				{props.plot.links.length > 0 ? <HeaderText>Links</HeaderText> : null}
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						props.plot.links.map(l => (
							<Button key={l.id} block={true} onClick={() => props.onSelect(props.adventure.plot.plots.find(p => p.id === l.plotID)!)}>
								{FormatLogic.getPlotLinkTitle(l, props.adventure.plot)}
							</Button>
						))
					}
				</Space>
			</div>
			<Drawer open={!!selectedReference} onClose={() => setSelectedReference(null)} closeIcon={null} size={500}>
				{
					selectedReference ?
						<ElementModal
							category={selectedReference.type}
							element={SourcebookLogic.getElement(selectedReference.contentID, props.sourcebooks) as Element}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onClose={() => setSelectedReference(null)}
						/>
						: null
				}
			</Drawer>
		</ErrorBoundary>
	);
};
