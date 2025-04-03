import { Button, Input, Popover, Space, Tabs, Upload } from 'antd';
import { DownloadOutlined, PlusOutlined, SearchOutlined, SettingOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { Adventure } from '../../../../models/adventure';
import { AdventurePanel } from '../../../panels/elements/adventure-panel/adventure-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterData } from '../../../../data/encounter-data';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Montage } from '../../../../models/montage';
import { MontageData } from '../../../../data/montage-data';
import { MontagePanel } from '../../../panels/elements/montage-panel/montage-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationData } from '../../../../data/negotiation-data';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { TacticalMap } from '../../../../models/tactical-map';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapLogic } from '../../../../logic/tactical-map-logic';
import { TacticalMapPanel } from '../../../panels/elements/tactical-map-panel/tactical-map-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './playbook-list-page.scss';

interface Props {
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showRules: () => void;
	createElement: (kind: PlaybookElementKind, original: Element | null) => void;
	importElement: (kind: PlaybookElementKind, element: Element) => void;
	setOptions: (options: Options) => void;
}

export const PlaybookListPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind } = useParams<{ kind: PlaybookElementKind }>();
	const [ previousTab, setPreviousTab ] = useState<PlaybookElementKind | undefined>(kind);
	const [ currentTab, setCurrentTab ] = useState<PlaybookElementKind>(kind ?? 'encounter');
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ roomCount, setRoomCount ] = useState<number>(5);

	if (kind !== previousTab) {
		setCurrentTab(kind ?? 'encounter');
		setPreviousTab(kind);
	}

	const createElement = (original: Element | null) => {
		props.createElement(currentTab, original);
	};

	const generateMap = () => {
		const map = FactoryLogic.createTacticalMap();
		TacticalMapLogic.generate(roomCount, map);
		createElement(map);
	};

	const getAdventures = () => {
		return props.playbook.adventures
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getEncounters = () => {
		return props.playbook.encounters
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getMontages = () => {
		return props.playbook.montages
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getNegotiations = () => {
		return props.playbook.negotiations
			.filter(item => Utils.textMatches([
				item.name,
				item.description
			], searchTerm));
	};

	const getTacticalMaps = () => {
		return props.playbook.tacticalMaps
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
							<EncounterPanel encounter={e} sourcebooks={props.sourcebooks} options={props.options} />
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

		const exampleEncounters = [
			EncounterData.goblinAmbush,
			EncounterData.dragonAttack
		];

		const exampleMontages = [
			MontageData.fightFire,
			MontageData.infiltrateThePalace,
			MontageData.prepareForBattle,
			MontageData.trackTheFugitive,
			MontageData.wildernessRace
		];

		const exampleNegotiations = [
			NegotiationData.banditChief,
			NegotiationData.knight,
			NegotiationData.guildmaster,
			NegotiationData.warlord,
			NegotiationData.burgomaster,
			NegotiationData.virtuoso,
			NegotiationData.highPriest,
			NegotiationData.duke,
			NegotiationData.dragon,
			NegotiationData.monarch,
			NegotiationData.lich,
			NegotiationData.deity
		];

		return (
			<ErrorBoundary>
				<div className='playbook-list-page'>
					<AppHeader subheader='Playbook' showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll} showRules={props.showRules}>
						<Input
							placeholder='Search'
							allowClear={true}
							value={searchTerm}
							suffix={<SearchOutlined />}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<div className='divider' />
						<Popover
							trigger='click'
							placement='bottom'
							content={(
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Space>
										<Button type='primary' block={true} icon={<PlusOutlined />} onClick={() => createElement(null)}>Create</Button>
										<div className='ds-text'>or</div>
										<Upload
											style={{ width: '100%' }}
											accept={`.drawsteel-${currentTab.toLowerCase()}`}
											showUploadList={false}
											beforeUpload={file => {
												file
													.text()
													.then(json => {
														const e = (JSON.parse(json) as Element);
														props.importElement(currentTab, e);
													});
												return false;
											}}
										>
											<Button block={true} icon={<DownloadOutlined />}>Import</Button>
										</Upload>
									</Space>
									{
										currentTab === 'encounter' ?
											<div>
												<div className='ds-text centered-text'>or start with a premade example:</div>
												<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
													{
														exampleEncounters.map(n => (
															<Button key={n.id} block={true} onClick={() => createElement(n)}>{n.name}</Button>
														))
													}
												</div>
											</div>
											: null
									}
									{
										currentTab === 'negotiation' ?
											<div>
												<div className='ds-text centered-text'>or start with a premade example:</div>
												<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
													{
														exampleNegotiations.map(n => (
															<Button key={n.id} block={true} onClick={() => createElement(n)}>{n.name}</Button>
														))
													}
												</div>
											</div>
											: null
									}
									{
										currentTab === 'montage' ?
											<div>
												<div className='ds-text centered-text'>or start with a premade example:</div>
												<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
													{
														exampleMontages.map(m => (
															<Button key={m.id} block={true} onClick={() => createElement(m)}>{m.name}</Button>
														))
													}
												</div>
											</div>
											: null
									}
									{
										currentTab === 'tactical-map' ?
											<Space direction='vertical' style={{ width: '100%' }}>
												<div className='ds-text centered-text'>or generate a random dungeon:</div>
												<NumberSpin label='Rooms' min={1} value={roomCount} onChange={setRoomCount} />
												<Button block={true} icon={<ThunderboltOutlined />} onClick={generateMap}>Generate</Button>
											</Space>
											: null
									}
								</div>
							)}
						>
							<Button type='primary' icon={<PlusOutlined />}>
								Add
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
									placement='bottom'
									content={<OptionsPanel mode='encounter' options={props.options}heroes={props.heroes} setOptions={props.setOptions} />}
								>
									<Button icon={<SettingOutlined />}>
										Options
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
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
