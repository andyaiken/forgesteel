import { Playbook, PlaybookElementKind } from '@/models/playbook';
import { Adventure } from '@/models/adventure';
import { Divider } from 'antd';
import { Element } from '@/models/element';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Plot } from '@/models/plot';
import { PlotGraphPanel } from '@/components/panels/plot-graph/plot-graph-panel';
import { PlotPanel } from '@/components/panels/elements/plot-panel/plot-panel';
import { Sourcebook } from '@/models/sourcebook';
import { useState } from 'react';

import './adventure-panel.scss';

interface Props {
	adventure: Adventure;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	mode?: PanelMode;
	onStart?: (kind: PlaybookElementKind, element: Element, party: string) => void;
}

export const AdventurePanel = (props: Props) => {
	const [ currentPlot, setCurrentPlot ] = useState<Plot>(props.adventure.plot);
	const [ selectedPlot, setSelectedPlot ] = useState<Plot | null>(null);

	const getPreview = () => {
		if (selectedPlot) {
			return (
				<PlotPanel
					plot={selectedPlot}
					adventure={props.adventure}
					playbook={props.playbook}
					sourcebooks={props.sourcebooks}
					heroes={props.heroes}
					options={props.options}
					mode={PanelMode.Full}
					onSelect={setSelectedPlot}
					onStart={props.onStart!}
				/>
			);
		}

		if (currentPlot !== props.adventure.plot) {
			return (
				<PlotPanel
					plot={currentPlot}
					adventure={props.adventure}
					playbook={props.playbook}
					sourcebooks={props.sourcebooks}
					heroes={props.heroes}
					options={props.options}
					mode={PanelMode.Full}
					onSelect={setSelectedPlot}
					onStart={props.onStart!}
				/>
			);
		}

		return (
			<div className='adventure-preview'>
				<Markdown text={props.adventure.description} />
				{props.adventure.description ? <Divider /> : null}
				<div className='ds-text'>
					A <b>DRAW STEEL</b> adventure for {props.adventure.party.count} heroes of level {props.adventure.party.level}.
				</div>
				{props.adventure.introduction.length > 0 ? <Divider /> : null}
				{
					props.adventure.introduction.map(section => (
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
			</div>
		);
	};

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='adventure-panel compact'>
				<HeaderText level={1}>{props.adventure.name || 'Unnamed Adventure'}</HeaderText>
				<Markdown text={props.adventure.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='adventure-panel' id={props.adventure.id}>
				<div className='plot-workspace'>
					<PlotGraphPanel
						label={currentPlot === props.adventure.plot ? props.adventure.name || 'Unnamed Adventure' : currentPlot.name || 'Unnamed Plot Point'}
						plot={currentPlot}
						adventure={props.adventure}
						selectedPlot={selectedPlot || undefined}
						onSelect={setSelectedPlot}
						onOpen={plot => {
							setSelectedPlot(null);
							setCurrentPlot(plot);
						}}
					/>
				</div>
				{getPreview()}
			</div>
		</ErrorBoundary>
	);
};
