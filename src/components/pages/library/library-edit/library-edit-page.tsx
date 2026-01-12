import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Adventure } from '@/models/adventure';
import { AdventureEditPanel } from '@/components/panels/edit/adventure-edit/adventure-edit-panel';
import { Ancestry } from '@/models/ancestry';
import { AncestryEditPanel } from '@/components/panels/edit/ancestry-edit/ancestry-edit-panel';
import { AppFooter } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { Button } from 'antd';
import { Career } from '@/models/career';
import { CareerEditPanel } from '@/components/panels/edit/career-edit/career-edit-panel';
import { ClassEditPanel } from '@/components/panels/edit/class-edit/class-edit-panel';
import { Complication } from '@/models/complication';
import { ComplicationEditPanel } from '@/components/panels/edit/complication-edit/complication-edit-panel';
import { Culture } from '@/models/culture';
import { CultureEditPanel } from '@/components/panels/edit/culture-edit/culture-edit-panel';
import { Domain } from '@/models/domain';
import { DomainEditPanel } from '@/components/panels/edit/domain-edit/domain-edit-panel';
import { Element } from '@/models/element';
import { Encounter } from '@/models/encounter';
import { EncounterEditPanel } from '@/components/panels/edit/encounter-edit/encounter-edit-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { ImbuementEditPanel } from '@/components/panels/edit/imbuement-edit/imbuement-edit-panel';
import { Item } from '@/models/item';
import { ItemEditPanel } from '@/components/panels/edit/item-edit/item-edit-panel';
import { Kit } from '@/models/kit';
import { KitEditPanel } from '@/components/panels/edit/kit-edit/kit-edit-panel';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterGroupEditPanel } from '@/components/panels/edit/monster-group-edit/monster-group-edit-panel';
import { Montage } from '@/models/montage';
import { MontageEditPanel } from '@/components/panels/edit/montage-edit/montage-edit-panel';
import { Negotiation } from '@/models/negotiation';
import { NegotiationEditPanel } from '@/components/panels/edit/negotiation-edit/negotiation-edit-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { Project } from '@/models/project';
import { ProjectEditPanel } from '@/components/panels/edit/project-edit/project-edit';
import { SubClass } from '@/models/subclass';
import { SubClassEditPanel } from '@/components/panels/edit/subclass-edit/subclass-edit-panel';
import { TacticalMap } from '@/models/tactical-map';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { Terrain } from '@/models/terrain';
import { TerrainEditPanel } from '@/components/panels/edit/terrain-edit/terrain-edit-panel';
import { Title } from '@/models/title';
import { TitleEditPanel } from '@/components/panels/edit/title-edit/title-edit-panel';
import { Utils } from '@/utils/utils';
import { useNavigation } from '@/hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useTitle } from '@/hooks/use-title';

import './library-edit-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	highlightAbout: boolean;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
	showSettings: () => void;
	showMonster: (monster: Monster, monsterGroup: MonsterGroup) => void;
	showTerrain: (terrain: Terrain, upgradeIDs: string[]) => void;
	saveChanges: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
}

export const LibraryEditPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, sourcebookID, elementID } = useParams<{ kind: SourcebookElementKind, sourcebookID: string, elementID: string }>();
	const [ element, setElement ] = useState<Element>(() => {
		const sourcebook = props.sourcebooks.find(s => s.id === sourcebookID)!;
		let original: Element;
		switch (kind!) {
			case 'adventure':
				original = sourcebook.adventures.find(e => e.id === elementID)!;
				break;
			case 'ancestry':
				original = sourcebook.ancestries.find(e => e.id === elementID)!;
				break;
			case 'career':
				original = sourcebook.careers.find(e => e.id === elementID)!;
				break;
			case 'class':
				original = sourcebook.classes.find(e => e.id === elementID)!;
				break;
			case 'complication':
				original = sourcebook.complications.find(e => e.id === elementID)!;
				break;
			case 'culture':
				original = sourcebook.cultures.find(e => e.id === elementID)!;
				break;
			case 'domain':
				original = sourcebook.domains.find(e => e.id === elementID)!;
				break;
			case 'encounter':
				original = sourcebook.encounters.find(e => e.id === elementID)!;
				break;
			case 'item':
				original = sourcebook.items.find(e => e.id === elementID)!;
				break;
			case 'imbuement':
				original = sourcebook.imbuements.find(e => e.id === elementID)!;
				break;
			case 'kit':
				original = sourcebook.kits.find(e => e.id === elementID)!;
				break;
			case 'monster-group':
				original = sourcebook.monsterGroups.find(e => e.id === elementID)!;
				break;
			case 'montage':
				original = sourcebook.montages.find(e => e.id === elementID)!;
				break;
			case 'negotiation':
				original = sourcebook.negotiations.find(e => e.id === elementID)!;
				break;
			case 'perk':
				original = sourcebook.perks.find(e => e.id === elementID)!;
				break;
			case 'project':
				original = sourcebook.projects.find(e => e.id === elementID)!;
				break;
			case 'subclass':
				original = sourcebook.subclasses.find(e => e.id === elementID)!;
				break;
			case 'tactical-map':
				original = sourcebook.tacticalMaps.find(e => e.id === elementID)!;
				break;
			case 'terrain':
				original = sourcebook.terrain.find(e => e.id === elementID)!;
				break;
			case 'title':
				original = sourcebook.titles.find(e => e.id === elementID)!;
				break;
		}
		return Utils.copy(original) as Element;
	});
	const [ dirty, setDirty ] = useState<boolean>(false);
	const [ revision, setRevision ] = useState<number>(0);

	const getSubheader = () => {
		return `${Format.capitalize(kind!.split('-').join(' '))} Builder`;
	};

	useTitle(getSubheader());

	const applyChanges = (element: Element) => {
		const copy = Utils.copy(element);
		setElement(copy);
		setDirty(true);
		setRevision(revision + 1);
	};

	const getEditSection = () => {
		switch (kind) {
			case 'adventure':
				return (
					<div className='adventure-container'>
						<AdventureEditPanel
							adventure={element as Adventure}
							sourcebooks={props.sourcebooks}
							heroes={props.heroes}
							options={props.options}
							onChange={applyChanges}
						/>
					</div>
				);
			case 'ancestry':
				return (
					<AncestryEditPanel
						key={element.id}
						ancestry={element as Ancestry}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'career':
				return (
					<CareerEditPanel
						key={element.id}
						career={element as Career}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'class':
				return (
					<ClassEditPanel
						key={element.id}
						heroClass={element as HeroClass}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'complication':
				return (
					<ComplicationEditPanel
						key={element.id}
						complication={element as Complication}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'culture':
				return (
					<CultureEditPanel
						key={element.id}
						culture={element as Culture}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'domain':
				return (
					<DomainEditPanel
						key={element.id}
						domain={element as Domain}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'encounter':
				return (
					<EncounterEditPanel
						encounter={element as Encounter}
						heroes={props.heroes}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={applyChanges}
						showMonster={props.showMonster}
						showTerrain={props.showTerrain}
					/>
				);
			case 'imbuement':
				return (
					<ImbuementEditPanel
						key={element.id}
						imbuement={element as Imbuement}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'item':
				return (
					<ItemEditPanel
						key={element.id}
						item={element as Item}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'kit':
				return (
					<KitEditPanel
						key={element.id}
						kit={element as Kit}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'monster-group':
				return (
					<MonsterGroupEditPanel
						key={element.id}
						monsterGroup={element as MonsterGroup}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'montage':
				return (
					<MontageEditPanel
						montage={element as Montage}
						heroes={props.heroes}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'negotiation':
				return (
					<NegotiationEditPanel
						negotiation={element as Negotiation}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'perk':
				return (
					<FeatureEditPanel
						key={element.id}
						feature={element as Perk}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'project':
				return (
					<ProjectEditPanel
						key={element.id}
						project={element as Project}
						includeNameAndDescription={true}
						sourcebooks={props.sourcebooks}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'subclass':
				return (
					<SubClassEditPanel
						key={element.id}
						subClass={element as SubClass}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'tactical-map':
				return (
					<div className='tactical-map-container'>
						<TacticalMapPanel
							map={element as TacticalMap}
							display={TacticalMapDisplayType.DirectorEdit}
							sourcebooks={props.sourcebooks}
							options={props.options}
							mode={PanelMode.Full}
							updateMap={applyChanges}
						/>
					</div>
				);
			case 'terrain':
				return (
					<TerrainEditPanel
						key={element.id}
						terrain={element as Terrain}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
			case 'title':
				return (
					<TitleEditPanel
						key={element.id}
						title={element as Title}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
						onChange={applyChanges}
					/>
				);
		}

		return null;
	};

	return (
		<ErrorBoundary>
			<div className='library-edit-page'>
				<AppHeader subheader={getSubheader()}>
					<Button type='primary' icon={<SaveOutlined />} disabled={!dirty} onClick={() => props.saveChanges(kind!, sourcebookID!, element)}>
						Save Changes
					</Button>
					<Button icon={<CloseOutlined />} onClick={() => navigation.goToLibrary(kind!, elementID!)}>
						Cancel
					</Button>
				</AppHeader>
				<div className='library-edit-page-content'>
					{getEditSection()}
				</div>
				<AppFooter
					page='library'
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
