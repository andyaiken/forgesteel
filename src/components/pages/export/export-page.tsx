import { AdventurePanel } from '@/components/panels/elements/adventure-panel/adventure-panel';
import { AppFooter } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { EncounterPanel } from '@/components/panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Hero } from '@/models/hero';
import { HeroPanel } from '@/components/panels/hero/hero-panel';
import { MontagePanel } from '@/components/panels/elements/montage-panel/montage-panel';
import { NegotiationPanel } from '@/components/panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '@/models/options';
import { Playbook } from '@/models/playbook';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookPanel } from '@/components/panels/elements/sourcebook-panel/sourcebook-panel';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { Utils } from '@/utils/utils';

import './export-page.scss';

interface Props {
	heroes: Hero[];
	homebrewSourcebooks: Sourcebook[];
	playbook: Playbook;
	options: Options;
	highlightAbout: boolean;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
	showSettings: () => void;
}

export const ExportPage = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='export-page'>
				<AppHeader />
				<ErrorBoundary>
					<div className='export-page-content'>
						{
							props.heroes.map(hero => (
								<SelectablePanel key={hero.id} onSelect={() => Utils.exportData(hero.name || 'Unnamed Hero', hero, 'hero')}>
									<HeroPanel hero={hero} sourcebooks={SourcebookLogic.getSourcebooks(props.homebrewSourcebooks)} options={props.options} />
								</SelectablePanel>
							))
						}
						{
							props.homebrewSourcebooks.map(sb => (
								<SelectablePanel key={sb.id} onSelect={() => Utils.exportData(sb.name || 'Unnamed Sourcebook', sb, 'sourcebook')}>
									<SourcebookPanel sourcebook={sb} />
								</SelectablePanel>
							))
						}
						{
							props.playbook.adventures.map(adventure => (
								<SelectablePanel key={adventure.id} onSelect={() => Utils.exportData(adventure.name || 'Unnamed Adventure', adventure, 'adventure')}>
									<AdventurePanel adventure={adventure} playbook={props.playbook} heroes={props.heroes} sourcebooks={SourcebookLogic.getSourcebooks(props.homebrewSourcebooks)} options={props.options} />
								</SelectablePanel>
							))
						}
						{
							props.playbook.encounters.map(encounter => (
								<SelectablePanel key={encounter.id} onSelect={() => Utils.exportData(encounter.name || 'Unnamed Encounter', encounter, 'encounter')}>
									<EncounterPanel encounter={encounter} heroes={props.heroes} sourcebooks={SourcebookLogic.getSourcebooks(props.homebrewSourcebooks)} options={props.options} />
								</SelectablePanel>
							))
						}
						{
							props.playbook.montages.map(montage => (
								<SelectablePanel key={montage.id} onSelect={() => Utils.exportData(montage.name || 'Unnamed Montage', montage, 'montage')}>
									<MontagePanel montage={montage} heroes={props.heroes} options={props.options} />
								</SelectablePanel>
							))
						}
						{
							props.playbook.negotiations.map(negotiation => (
								<SelectablePanel key={negotiation.id} onSelect={() => Utils.exportData(negotiation.name || 'Unnamed Negotiation', negotiation, 'negotiation')}>
									<NegotiationPanel negotiation={negotiation} sourcebooks={SourcebookLogic.getSourcebooks(props.homebrewSourcebooks)} options={props.options} />
								</SelectablePanel>
							))
						}
						{
							props.playbook.tacticalMaps.map(map => (
								<SelectablePanel key={map.id} onSelect={() => Utils.exportData(map.name || 'Unnamed Map', map, 'map')}>
									<TacticalMapPanel map={map} display={TacticalMapDisplayType.Thumbnail} heroes={props.heroes} sourcebooks={SourcebookLogic.getSourcebooks(props.homebrewSourcebooks)} options={props.options} />
								</SelectablePanel>
							))
						}
					</div>
				</ErrorBoundary>
				<AppFooter
					page='welcome'
					highlightAbout={props.highlightAbout}
					showReference={props.showReference}
					showRoll={props.showRoll}
					showAbout={props.showAbout}
					showSettings={props.showSettings}
				/>
			</div>
		</ErrorBoundary>
	);
};
