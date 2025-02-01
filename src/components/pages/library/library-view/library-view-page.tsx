import { Button, Popover } from 'antd';
import { Sourcebook, SourcebookElementKind } from '../../../../models/sourcebook';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
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
import { HeroClass } from '../../../../models/class';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { MonsterGroup } from '../../../../models/monster';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { ReactNode } from 'react';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Title } from '../../../../models/title';
import { TitlePanel } from '../../../panels/elements/title-panel/title-panel';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './library-view-page.scss';

interface Props {
	sourcebooks: Sourcebook[];
	showAbout: () => void;
	createHomebrew: (kind: SourcebookElementKind, element: Element, sourcebook: Sourcebook | null) => void;
	export: (kind: SourcebookElementKind, element: Element, format: 'image' | 'pdf' | 'json') => void;
	delete: (kind: SourcebookElementKind, element: Element) => void;
}

export const LibraryViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: SourcebookElementKind, elementID: string }>();

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
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'class':
			element = props.sourcebooks.flatMap(sb => sb.classes).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getClassSourcebook(props.sourcebooks, element as HeroClass) as Sourcebook;
			panel = (
				<ClassPanel
					heroClass={element as HeroClass}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'complication':
			element = props.sourcebooks.flatMap(sb => sb.complications).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getComplicationSourcebook(props.sourcebooks, element as Complication) as Sourcebook;
			panel = (
				<ComplicationPanel
					complication={element as Complication}
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
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'monster-group':
			element = props.sourcebooks.flatMap(sb => sb.monsterGroups).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getMonsterGroupSourcebook(props.sourcebooks, element as MonsterGroup) as Sourcebook;
			panel = (
				<MonsterGroupPanel
					monsterGroup={element as MonsterGroup}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'perk':
			element = props.sourcebooks.flatMap(sb => sb.perks).find(x => x.id === elementID) as Element;
			sourcebook = SourcebookLogic.getPerkSourcebook(props.sourcebooks, element as Perk) as Sourcebook;
			panel = (
				<PerkPanel
					perk={element as Perk}
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
					mode={PanelMode.Full}
				/>
			);
			break;
	}

	if (!element || !sourcebook || !panel) {
		return null;
	}

	try {
		return (
			<div className='library-view-page'>
				<AppHeader breadcrumbs={[ { label: 'Library' } ]} showAbout={props.showAbout}>
					<Button onClick={() => navigation.goToLibraryList(kind!)}>
						Close
					</Button>
					{
						sourcebook.isHomebrew ?
							<Button onClick={() => navigation.goToLibraryEdit(kind!, sourcebook.id, element.id)}>
								Edit
							</Button>
							:
							<Popover
								trigger='click'
								placement='bottom'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										{
											props.sourcebooks
												.filter(sb => sb.isHomebrew)
												.map(cs => <Button key={cs.id} onClick={() => props.createHomebrew(kind!, element, cs)}>In {cs.name || 'Unnamed Collection'}</Button>)
										}
										<Button onClick={() => props.createHomebrew(kind!, element, null)}>In a new collection</Button>
									</div>
								)}
							>
								<Button>
									Create Homebrew Version
								</Button>
							</Popover>
					}
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.export(kind!, element, 'image')}>Export As Image</Button>
								<Button onClick={() => props.export(kind!, element, 'pdf')}>Export As PDF</Button>
								<Button onClick={() => props.export(kind!, element, 'json')}>Export as Data</Button>
							</div>
						)}
					>
						<Button>
							Export
						</Button>
					</Popover>
					{
						sourcebook.isHomebrew ?
							<DangerButton
								onConfirm={() => props.delete(kind!, element)}
							/>
							: null
					}
				</AppHeader>
				<div className='library-view-page-content'>
					{panel}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
