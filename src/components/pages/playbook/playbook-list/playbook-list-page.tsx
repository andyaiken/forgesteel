import { Button, Divider, Flex, Input, Popover, Segmented, Space, Tabs, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, PlusOutlined, SearchOutlined, SettingOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { Adventure } from '../../../../models/adventure';
import { AdventurePanel } from '../../../panels/elements/adventure-panel/adventure-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterData } from '../../../../data/encounter-data';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Field } from '../../../controls/field/field';
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
	showReference: () => void;
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
	const [ mapImportType, setMapImportType ] = useState<'image' | 'video'>('image');
	const [ mapImportData, setMapImportData ] = useState<string>('');
	const [ mapImportWidth, setMapImportWidth ] = useState<number>(10);
	const [ mapImportHeight, setMapImportHeight ] = useState<number>(5);
	const [ mapGenerateType, setMapGenerateType ] = useState<'dungeon' | 'cavern'>('dungeon');
	const [ mapGenerateSize, setMapGenerateSize ] = useState<number>(5);

	if (kind !== previousTab) {
		setCurrentTab(kind ?? 'encounter');
		setPreviousTab(kind);
	}

	const createElement = (original: Element | null) => {
		props.createElement(currentTab, original);
	};

	const createImageMap = () => {
		const map = FactoryLogic.createTacticalMap();
		const tile = FactoryLogic.createMapTile();
		tile.dimensions.width = mapImportWidth;
		tile.dimensions.height = mapImportHeight;
		switch (mapImportType) {
			case 'image':
				tile.content = { type: 'image', imageData: mapImportData };
				break;
			case 'video':
				tile.content = { type: 'video', videoData: mapImportData };
		}
		map.items.push(tile);
		createElement(map);
	};

	const generateMap = () => {
		const map = FactoryLogic.createTacticalMap();
		switch (mapGenerateType) {
			case 'dungeon':
				TacticalMapLogic.generateDungeon(mapGenerateSize, map);
				break;
			case 'cavern':
				TacticalMapLogic.generateCavern(mapGenerateSize * 50, map);
				break;
		}
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
							content={(
								<div style={{ width: '300px' }}>
									<Flex align='center' justify='center' gap={10}>
										<Button type='primary' icon={<PlusOutlined />} onClick={() => createElement(null)}>Create</Button>
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
											<Button icon={<DownloadOutlined />}>Import</Button>
										</Upload>
									</Flex>
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
											<Space direction='vertical' style={{ width: '300px' }}>
												<Divider />
												<Expander title='Use a battlemap'>
													<Space direction='vertical' style={{ width: '100%' }}>
														<Segmented
															block={true}
															options={[
																{ value: 'image', label: 'Image' },
																{ value: 'video', label: 'Animated' }
															]}
															value={mapImportType}
															onChange={setMapImportType}
														/>
														<Upload
															style={{ width: '100%' }}
															accept={mapImportType === 'image' ? '.png,.webp,.gif.jpg,.jpeg,.svg' : '.mp4,.webm'}
															showUploadList={false}
															beforeUpload={file => {
																const reader = new FileReader();
																reader.onload = progress => {
																	if (progress.target) {
																		const content = progress.target.result as string;
																		setMapImportData(content);
																	}
																};
																reader.readAsDataURL(file);
																return false;
															}}
														>
															<Button block={true}>
																<DownloadOutlined />
																Choose file
															</Button>
														</Upload>
														{
															mapImportData ?
																<>
																	{
																		mapImportType === 'image' ?
																			<img
																				style={{ width: '100%' }}
																				src={mapImportData}
																			/>
																			:
																			<video
																				style={{ width: '100%' }}
																				src={mapImportData}
																				autoPlay={true}
																				controls={false}
																				loop={true}
																				muted={true}
																			/>
																	}
																	<Flex align='center' justify='space-between' gap={10}>
																		<NumberSpin min={1} value={mapImportWidth} onChange={setMapImportWidth}>
																			<Field orientation='vertical' label='Width' value={mapImportWidth} />
																		</NumberSpin>
																		<NumberSpin min={1} value={mapImportHeight} onChange={setMapImportHeight}>
																			<Field orientation='vertical' label='Height' value={mapImportHeight} />
																		</NumberSpin>
																	</Flex>
																	<Button block={true} type='primary' onClick={createImageMap}>Create</Button>
																</>
																: null
														}
													</Space>
												</Expander>
												<Expander title='Generate a random map'>
													<Segmented
														block={true}
														options={[
															{ value: 'dungeon', label: 'Dungeon' },
															{ value: 'cavern', label: 'Cavern' }
														]}
														value={mapGenerateType}
														onChange={setMapGenerateType}
													/>
													<NumberSpin min={1} value={mapGenerateSize} onChange={setMapGenerateSize}>
														<Field orientation='vertical' label={mapGenerateType === 'dungeon' ? 'Rooms' : 'Size'} value={mapGenerateSize} />
													</NumberSpin>
													<Button block={true} type='primary' icon={<ThunderboltOutlined />} onClick={generateMap}>Generate</Button>
												</Expander>
											</Space>
											: null
									}
								</div>
							)}
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
