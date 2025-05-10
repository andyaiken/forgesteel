import { Button, Popover } from 'antd';
import { CloseOutlined, CopyOutlined, DownOutlined, EditOutlined, LeftOutlined, UploadOutlined } from '@ant-design/icons';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Sourcebook, SourcebookElementKind } from '../../../../models/sourcebook';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerPanel } from '../../../panels/elements/career-panel/career-panel';
import { ClassPanel } from '../../../panels/elements/class-panel/class-panel';
import { Complication } from '../../../../models/complication';
import { ComplicationPanel } from '../../../panels/elements/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/elements/culture-panel/culture-panel';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Domain } from '../../../../models/domain';
import { DomainPanel } from '../../../panels/elements/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Format } from '../../../../utils/format';
import { HeroClass } from '../../../../models/class';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { Playbook } from '../../../../models/playbook';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { ReactNode } from 'react';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { SubClass } from '../../../../models/subclass';
import { SubclassPanel } from '../../../panels/elements/subclass-panel/subclass-panel';
import { Terrain } from '../../../../models/terrain';
import { TerrainPanel } from '../../../panels/elements/terrain-panel/terrain-panel';
import { Title } from '../../../../models/title';
import { TitlePanel } from '../../../panels/elements/title-panel/title-panel';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './library-view-page.scss';

interface Props {
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	createElement: (kind: SourcebookElementKind, sourcebookID: string | null, element: Element) => void;
	export: (kind: SourcebookElementKind, isSubElement: boolean, element: Element, format: 'image' | 'pdf' | 'json') => void;
	copy: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	copySubElement: (kind: SourcebookElementKind, sourcebookID: string, parentElementID: string, subElement: Element) => void;
	delete: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
}

export const LibraryViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID, subElementID } = useParams<{ kind: SourcebookElementKind, elementID: string, subElementID: string }>();

	let element: Element | null = null;
	let sourcebook: Sourcebook | null = null;
	let panel: ReactNode | null = null;
	switch (kind) {
		case 'ancestry':
			element = props.sourcebooks.flatMap(sb => sb.ancestries).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getAncestrySourcebook(props.sourcebooks, element as Ancestry) as Sourcebook;
			panel = (
				<AncestryPanel
					ancestry={element as Ancestry}
					options={props.options}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'career':
			element = props.sourcebooks.flatMap(sb => sb.careers).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getCareerSourcebook(props.sourcebooks, element as Career) as Sourcebook;
			panel = (
				<CareerPanel
					career={element as Career}
					options={props.options}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'class':
			element = props.sourcebooks.flatMap(sb => sb.classes).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getClassSourcebook(props.sourcebooks, element as HeroClass) as Sourcebook;
			if (subElementID) {
				element = (element as HeroClass).subclasses.find(sc => sc.id === subElementID) as Element;
				panel = (
					<SubclassPanel
						subclass={element as SubClass}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			} else {
				panel = (
					<ClassPanel
						heroClass={element as HeroClass}
						options={props.options}
						mode={PanelMode.Full}
						onSelectSubclass={sc => navigation.goToLibraryView(kind, element!.id, sc.id)}
					/>
				);
			}
			break;
		case 'complication':
			element = props.sourcebooks.flatMap(sb => sb.complications).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getComplicationSourcebook(props.sourcebooks, element as Complication) as Sourcebook;
			panel = (
				<ComplicationPanel
					complication={element as Complication}
					options={props.options}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'culture':
			element = props.sourcebooks.flatMap(sb => sb.cultures).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getCultureSourcebook(props.sourcebooks, element as Culture) as Sourcebook;
			panel = (
				<CulturePanel
					culture={element as Culture}
					options={props.options}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'domain':
			element = props.sourcebooks.flatMap(sb => sb.domains).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getDomainSourcebook(props.sourcebooks, element as Domain) as Sourcebook;
			panel = (
				<DomainPanel
					domain={element as Domain}
					options={props.options}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'item':
			element = props.sourcebooks.flatMap(sb => sb.items).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getItemSourcebook(props.sourcebooks, element as Item) as Sourcebook;
			panel = (
				<ItemPanel
					item={element as Item}
					options={props.options}
					showCustomizations={true}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'kit':
			element = props.sourcebooks.flatMap(sb => sb.kits).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getKitSourcebook(props.sourcebooks, element as Kit) as Sourcebook;
			panel = (
				<KitPanel
					kit={element as Kit}
					options={props.options}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'monster-group':
			element = props.sourcebooks.flatMap(sb => sb.monsterGroups).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getMonsterGroupSourcebook(props.sourcebooks, element as MonsterGroup) as Sourcebook;
			if (subElementID) {
				element = (element as MonsterGroup).monsters.find(m => m.id === subElementID) as Element;
				panel = (
					<MonsterPanel
						monster={element as Monster}
						monsterGroup={element as MonsterGroup}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			} else {
				panel = (
					<MonsterGroupPanel
						monsterGroup={element as MonsterGroup}
						options={props.options}
						mode={PanelMode.Full}
						onSelectMonster={m => navigation.goToLibraryView(kind, element!.id, m.id)}
					/>
				);
			}
			break;
		case 'perk':
			element = props.sourcebooks.flatMap(sb => sb.perks).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getPerkSourcebook(props.sourcebooks, element as Perk) as Sourcebook;
			panel = (
				<PerkPanel
					perk={element as Perk}
					options={props.options}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'terrain':
			element = props.sourcebooks.flatMap(sb => sb.terrain).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getTerrainSourcebook(props.sourcebooks, element as Terrain) as Sourcebook;
			panel = (
				<TerrainPanel
					terrain={element as Terrain}
					showCustomizations={true}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'title':
			element = props.sourcebooks.flatMap(sb => sb.titles).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getTitleSourcebook(props.sourcebooks, element as Title) as Sourcebook;
			panel = (
				<TitlePanel
					title={element as Title}
					options={props.options}
					mode={PanelMode.Full}
				/>
			);
			break;
	}

	if (!element || !sourcebook || !panel) {
		return null;
	}

	const getSubheader = () => {
		if (kind === 'class') {
			if (subElementID) {
				return 'Subclass';
			}
		}

		if (kind === 'monster-group') {
			if (subElementID) {
				return 'Monster';
			}

			return 'Monster Group';
		}

		return Format.capitalize(kind!);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='library-view-page'>
					<AppHeader subheader={getSubheader()} showDirectory={props.showDirectory}>
						{
							subElementID ?
								<Button icon={<LeftOutlined />} onClick={() => navigation.goToLibraryView(kind!, elementID!)}>
									Back
								</Button>
								:
								<Button icon={<CloseOutlined />} onClick={() => navigation.goToLibraryList(kind!)}>
									Close
								</Button>
						}
						<div className='divider' />
						{
							!sourcebook.isHomebrew && !subElementID && (props.sourcebooks.filter(sb => sb.isHomebrew).length === 0) ?
								<Button icon={<CopyOutlined />} onClick={() => props.createElement(kind!, null, element)}>
									Create Homebrew Version
								</Button>
								: null
						}
						{
							!sourcebook.isHomebrew && !subElementID && (props.sourcebooks.filter(sb => sb.isHomebrew).length > 0) ?
								<Popover
									trigger='click'
									content={(
										<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
											<ErrorBoundary>
												{
													props.sourcebooks
														.filter(sb => sb.isHomebrew)
														.map(sb => <Button key={sb.id} onClick={() => props.createElement(kind!, sb.id, element)}>In {sb.name || 'Unnamed Sourcebook'}</Button>)
												}
											</ErrorBoundary>
											<Button onClick={() => props.createElement(kind!, null, element)}>In a new sourcebook</Button>
										</div>
									)}
								>
									<Button icon={<CopyOutlined />}>
										Create Homebrew Version
										<DownOutlined />
									</Button>
								</Popover>
								: null
						}
						{
							sourcebook.isHomebrew ?
								<Button icon={<EditOutlined />} onClick={() => navigation.goToLibraryEdit(kind!, sourcebook.id, elementID!, subElementID)}>
									Edit
								</Button>
								: null
						}
						{
							sourcebook.isHomebrew && !subElementID ?
								<Popover
									trigger='click'
									content={(
										<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
											<ErrorBoundary>
												{
													props.sourcebooks
														.filter(sb => sb.isHomebrew)
														.map(sb => <Button key={sb.id} onClick={() => props.createElement(kind!, sb.id, element)}>In {sb.name || 'Unnamed Sourcebook'}</Button>)
												}
											</ErrorBoundary>
											<Button onClick={() => props.createElement(kind!, null, element)}>In a new sourcebook</Button>
										</div>
									)}
								>
									<Button icon={<CopyOutlined />}>
										Copy
									</Button>
								</Popover>
								: null
						}
						{
							sourcebook.isHomebrew && subElementID ?
								<Button icon={<CopyOutlined />} onClick={() => props.copySubElement(kind!, sourcebook.id, elementID!, element)}>
									Copy
								</Button>
								: null
						}
						<Popover
							trigger='click'
							content={(
								<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<Button onClick={() => props.export(kind!, !!subElementID, element, 'image')}>Export As Image</Button>
									<Button onClick={() => props.export(kind!, !!subElementID, element, 'pdf')}>Export As PDF</Button>
									<Button onClick={() => props.export(kind!, !!subElementID, element, 'json')}>Export as Data</Button>
								</div>
							)}
						>
							<Button icon={<UploadOutlined />}>
								Export
								<DownOutlined />
							</Button>
						</Popover>
						{
							sourcebook.isHomebrew && !subElementID ?
								<DangerButton
									mode='block'
									disabled={PlaybookLogic.getUsedIn(props.playbook, element.id).length !== 0}
									onConfirm={() => props.delete(kind!, sourcebook.id, element)}
								/>
								: null
						}
					</AppHeader>
					<div className='library-view-page-content'>
						{panel}
					</div>
					<AppFooter page='library' showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
