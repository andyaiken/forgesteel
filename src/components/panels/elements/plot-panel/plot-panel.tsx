import { Alert, Button, Drawer, Flex, Space } from 'antd';
import { EditOutlined, InfoCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '@/models/playbook';
import { Plot, PlotContent } from '@/models/plot';
import { Adventure } from '@/models/adventure';
import { Element } from '@/models/element';
import { Empty } from '@/components/controls/empty/empty';
import { Encounter } from '@/models/encounter';
import { EncounterPanel } from '@/components/panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { Montage } from '@/models/montage';
import { MontagePanel } from '@/components/panels/elements/montage-panel/montage-panel';
import { Negotiation } from '@/models/negotiation';
import { NegotiationPanel } from '@/components/panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { PowerRollPanel } from '@/components/panels/power-roll/power-roll-panel';
import { SashPanel } from '@/components/panels/sash/sash-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { useNavigation } from '@/hooks/use-navigation';
import { useState } from 'react';

import './plot-panel.scss';

interface PlotPanelProps {
	plot: Plot;
	adventure: Adventure;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	mode?: PanelMode;
	onSelect: (plot: Plot) => void;
	onStart: (kind: PlaybookElementKind, element: Element, party: string) => void;
}

export const PlotPanel = (props: PlotPanelProps) => {
	const navigation = useNavigation();
	const [ selectedEncounter, setSelectedEncounter ] = useState<Encounter | null>(null);
	const [ selectedMontage, setSelectedMontage ] = useState<Montage | null>(null);
	const [ selectedNegotiation, setSelectedNegotiation ] = useState<Negotiation | null>(null);

	const getContent = (content: PlotContent) => {
		switch (content.contentType) {
			case 'text':
				if (content.format === 'director') {
					return (
						<Alert
							type='info'
							showIcon={true}
							message={content.text}
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
						const encounter = props.playbook.encounters.find(e => e.id === content.contentID);
						if (encounter) {
							return (
								<SelectablePanel showShadow={false} style={{ overflow: 'hidden' }} onSelect={() => navigation.goToPlaybook('encounter', encounter.id)}>
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
						const montage = props.playbook.montages.find(m => m.id === content.contentID);
						if (montage) {
							return (
								<SelectablePanel showShadow={false} style={{ overflow: 'hidden' }} onSelect={() => navigation.goToPlaybook('montage', montage.id)}>
									<MontagePanel
										montage={montage}
									/>
									<SashPanel monogram='Montage' />
								</SelectablePanel>
							);
						}
						break;
					}
					case 'negotiation': {
						const negotiation = props.playbook.negotiations.find(n => n.id === content.contentID);
						if (negotiation) {
							return (
								<SelectablePanel showShadow={false} style={{ overflow: 'hidden' }} onSelect={() => navigation.goToPlaybook('negotiation', negotiation.id)}>
									<NegotiationPanel
										negotiation={negotiation}
									/>
									<SashPanel monogram='Negotiation' />
								</SelectablePanel>
							);
						}
						break;
					}
					case 'map': {
						const map = props.playbook.tacticalMaps.find(tm => tm.id === content.contentID);
						if (map) {
							return (
								<SelectablePanel showShadow={false} style={{ overflow: 'hidden' }} onSelect={() => navigation.goToPlaybook('tactical-map', map.id)}>
									<HeaderText level={1}>{map.name || 'Unnamed Map'}</HeaderText>
									<div className='tactical-map-container'>
										<TacticalMapPanel
											map={map}
											display={TacticalMapDisplayType.Thumbnail}
											options={props.options}
										/>
									</div>
									<SashPanel monogram='Map' />
								</SelectablePanel>
							);
						}
						break;
					}
				}
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
						const encounter = props.playbook.encounters.find(e => e.id === content.contentID);
						if (encounter) {
							return (
								<Flex vertical={true} gap={5}>
									<Button title='Info' icon={<InfoCircleOutlined />} onClick={() => setSelectedEncounter(encounter)} />
									<Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('encounter', encounter, '')} />
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
									<Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('montage', montage, '')} />
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
									<Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('negotiation', negotiation, '')} />
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
									<Button title='Run' icon={<PlayCircleOutlined />} onClick={() => props.onStart!('tactical-map', map, '')} />
									<Button title='Edit' icon={<EditOutlined />} onClick={() => navigation.goToPlaybookEdit('tactical-map', map.id)} />
								</Flex>
							);
						}
						break;
					}
				}
			}
		}

		return null;
	};

	try {
		if (props.mode !== PanelMode.Full) {
			return (
				<div className='plot-panel compact'>
					<HeaderText level={1}>{props.plot.name || 'Unnamed Plot Point'}</HeaderText>
					<Markdown text={props.plot.description} />
				</div>
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
					<Space direction='vertical' style={{ width: '100%' }}>
						{
							props.plot.links.map(l => (
								<Button key={l.id} block={true} onClick={() => props.onSelect(props.adventure.plot.plots.find(p => p.id === l.plotID)!)}>
									{FormatLogic.getPlotLinkTitle(l, props.adventure.plot)}
								</Button>
							))
						}
					</Space>
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
