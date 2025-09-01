import { Adventure, AdventurePackage } from '../../../../models/adventure';
import { Button, Input, Popover, Tabs } from 'antd';
import { DownOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { AdventurePanel } from '../../../panels/elements/adventure-panel/adventure-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CreatePanel } from './create-panel/create-panel';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Montage } from '../../../../models/montage';
import { MontagePanel } from '../../../panels/elements/montage-panel/montage-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { TacticalMap } from '../../../../models/tactical-map';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../../../panels/elements/tactical-map-panel/tactical-map-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './playbook-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	createElement: (kind: PlaybookElementKind, original: Element | null) => void;
	importElement: (list: { kind: PlaybookElementKind, element: Element }[]) => void;
	importAdventurePackage: (ap: AdventurePackage) => void;
	setOptions: (options: Options) => void;
}

export const PlaybookListPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind } = useParams<{ kind: PlaybookElementKind }>();
	const [ previousTab, setPreviousTab ] = useState<PlaybookElementKind | undefined>(kind);
	const [ currentTab, setCurrentTab ] = useState<PlaybookElementKind>(kind ?? 'encounter');
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	if (kind !== previousTab) {
		setCurrentTab(kind ?? 'encounter');
		setPreviousTab(kind);
	}

	const getAdventures = () => {
		return props.playbook.adventures
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getEncounters = () => {
		const adventureContentIDs = props.playbook.adventures
			.flatMap(a => PlaybookLogic.getAllPlotPoints(a.plot))
			.flatMap(p => p.content)
			.filter(c => c.contentType === 'reference')
			.map(c => c.contentID);

		return props.playbook.encounters
			.filter(item => !adventureContentIDs.includes(item.id))
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getMontages = () => {
		const adventureContentIDs = props.playbook.adventures
			.flatMap(a => PlaybookLogic.getAllPlotPoints(a.plot))
			.flatMap(p => p.content)
			.filter(c => c.contentType === 'reference')
			.map(c => c.contentID);

		return props.playbook.montages
			.filter(item => !adventureContentIDs.includes(item.id))
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getNegotiations = () => {
		const adventureContentIDs = props.playbook.adventures
			.flatMap(a => PlaybookLogic.getAllPlotPoints(a.plot))
			.flatMap(p => p.content)
			.filter(c => c.contentType === 'reference')
			.map(c => c.contentID);

		return props.playbook.negotiations
			.filter(item => !adventureContentIDs.includes(item.id))
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getTacticalMaps = () => {
		const adventureContentIDs = props.playbook.adventures
			.flatMap(a => PlaybookLogic.getAllPlotPoints(a.plot))
			.flatMap(p => p.content)
			.filter(c => c.contentType === 'reference')
			.map(c => c.contentID);

		return props.playbook.tacticalMaps
			.filter(item => !adventureContentIDs.includes(item.id))
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getAdventuresSection = (list: Adventure[]) => {
		if (list.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='playbook-section-row'>
				{
					list.map(a => (
						<SelectablePanel key={a.id} onSelect={() => navigation.goToPlaybookView('adventure', a.id)}>
							<AdventurePanel
								adventure={a}
								playbook={props.playbook}
								sourcebooks={props.sourcebooks}
								heroes={props.heroes}
								options={props.options}
							/>
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	const getEncountersSection = (list: Encounter[]) => {
		if (list.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='playbook-section-row'>
				{
					list.map(e => (
						<SelectablePanel key={e.id} onSelect={() => navigation.goToPlaybookView('encounter', e.id)}>
							<EncounterPanel encounter={e} sourcebooks={props.sourcebooks} heroes={props.heroes} options={props.options} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	const getMontagesSection = (list: Montage[]) => {
		if (list.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='playbook-section-row'>
				{
					list.map(m => (
						<SelectablePanel key={m.id} onSelect={() => navigation.goToPlaybookView('montage', m.id)}>
							<MontagePanel montage={m} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	const getNegotiationsSection = (list: Negotiation[]) => {
		if (list.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='playbook-section-row'>
				{
					list.map(n => (
						<SelectablePanel key={n.id} onSelect={() => navigation.goToPlaybookView('negotiation', n.id)}>
							<NegotiationPanel negotiation={n} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	const getTacticalMapsSection = (list: TacticalMap[]) => {
		if (list.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='playbook-section-row'>
				{
					list.map(tm => (
						<SelectablePanel key={tm.id} onSelect={() => navigation.goToPlaybookView('tactical-map', tm.id)}>
							<HeaderText level={1}>{tm.name || 'Unnamed Map'}</HeaderText>
							<div className='tactical-map-container'>
								<TacticalMapPanel map={tm} display={TacticalMapDisplayType.Thumbnail} options={props.options} />
							</div>
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	try {
		const adventures = getAdventures();
		const encounters = getEncounters();
		const montages = getMontages();
		const negotiations = getNegotiations();
		const tacticalMaps = getTacticalMaps();

		return (
			<ErrorBoundary>
				<div className='playbook-list-page'>
					<AppHeader subheader='Playbook' showDirectory={props.showDirectory}>
						<Input
							name='search'
							placeholder='Search'
							allowClear={true}
							value={searchTerm}
							suffix={<SearchOutlined />}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<div className='divider' />
						<Popover
							trigger='click'
							content={
								<CreatePanel
									currentTab={currentTab}
									createElement={props.createElement}
									importElement={props.importElement}
									importAdventurePackage={props.importAdventurePackage}
								/>
							}
						>
							<Button type='primary'>
								Add
								<DownOutlined />
							</Button>
						</Popover>
						{
							(currentTab === 'encounter') ?
								<div className='divider' />
								: null
						}
						{
							(currentTab === 'encounter') ?
								<Popover
									trigger='click'
									content={<OptionsPanel mode='encounter' options={props.options}heroes={props.heroes} setOptions={props.setOptions} />}
								>
									<Button icon={<SettingOutlined />}>
										Options
										<DownOutlined />
									</Button>
								</Popover>
								: null
						}
					</AppHeader>
					<div className='playbook-list-page-content'>
						<Tabs
							activeKey={currentTab}
							items={[
								{
									key: 'adventure',
									label: (
										<div className='section-header'>
											<div className='section-title'>Adventures</div>
											<div className='section-count'>{adventures.length}</div>
										</div>
									),
									children: getAdventuresSection(adventures)
								},
								{
									key: 'encounter',
									label: (
										<div className='section-header'>
											<div className='section-title'>Encounters</div>
											<div className='section-count'>{encounters.length}</div>
										</div>
									),
									children: getEncountersSection(encounters)
								},
								{
									key: 'montage',
									label: (
										<div className='section-header'>
											<div className='section-title'>Montages</div>
											<div className='section-count'>{montages.length}</div>
										</div>
									),
									children: getMontagesSection(montages)
								},
								{
									key: 'negotiation',
									label: (
										<div className='section-header'>
											<div className='section-title'>Negotiations</div>
											<div className='section-count'>{negotiations.length}</div>
										</div>
									),
									children: getNegotiationsSection(negotiations)
								},
								{
									key: 'tactical-map',
									label: (
										<div className='section-header'>
											<div className='section-title'>Tactical Maps</div>
											<div className='section-count'>{tacticalMaps.length}</div>
										</div>
									),
									children: getTacticalMapsSection(tacticalMaps)
								}
							]}
							onChange={k => navigation.goToPlaybookList(k as PlaybookElementKind)}
						/>
					</div>
					<AppFooter page='playbook' showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
