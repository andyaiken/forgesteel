import { Button, Flex, Input, Popover, Space, Tabs } from 'antd';
import { CloseOutlined, DownOutlined, PlusOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { MonsterFilter, TerrainFilter } from '../../../../models/filter';
import { MonsterInfo, TerrainInfo } from '../../../controls/token/token';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { ReactNode, useState } from 'react';
import { Adventure } from '../../../../models/adventure';
import { AdventureEditPanel } from '../../../panels/edit/adventure-edit/adventure-edit-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Collections } from '../../../../utils/collections';
import { DropdownButton } from '../../../controls/dropdown-button/dropdown-button';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterDifficultyPanel } from '../../../panels/encounter-difficulty/encounter-difficulty-panel';
import { EncounterEditPanel } from '../../../panels/edit/encounter-edit/encounter-edit-panel';
import { EncounterLogic } from '../../../../logic/encounter-logic';import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Format } from '../../../../utils/format';
import { Hero } from '../../../../models/hero';
import { MonsterFilterPanel } from '../../../panels/monster-filter/monster-filter-panel';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { Montage } from '../../../../models/montage';
import { MontageEditPanel } from '../../../panels/edit/montage-edit/montage-edit-panel';
import { MontagePanel } from '../../../panels/elements/montage-panel/montage-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationEditPanel } from '../../../panels/edit/negotiation-edit/negotiation-edit-panel';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { TacticalMap } from '../../../../models/tactical-map';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../../../panels/elements/tactical-map-panel/tactical-map-panel';
import { Terrain } from '../../../../models/terrain';
import { TerrainFilterPanel } from '../../../panels/terrain-filter/terrain-filter-panel';
import { TerrainLogic } from '../../../../logic/terrain-logic';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './playbook-edit-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	showSourcebooks: () => void;
	showMonster: (monster: Monster, monsterGroup: MonsterGroup) => void;
	showTerrain: (terrain: Terrain, upgradeIDs: string[]) => void;
	saveChanges: (kind: PlaybookElementKind, element: Element) => void;
	setOptions: (options: Options) => void;
}

export const PlaybookEditPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: PlaybookElementKind, elementID: string }>();
	const [ element, setElement ] = useState<Element>(() => {
		let original: Element;
		switch (kind!) {
			case 'adventure':
				original = props.playbook.adventures.find(e => e.id === elementID)!;
				break;
			case 'encounter':
				original = props.playbook.encounters.find(e => e.id === elementID)!;
				break;
			case 'montage':
				original = props.playbook.montages.find(e => e.id === elementID)!;
				break;
			case 'negotiation':
				original = props.playbook.negotiations.find(e => e.id === elementID)!;
				break;
			case 'tactical-map':
				original = props.playbook.tacticalMaps.find(e => e.id === elementID)!;
				break;
		}
		return Utils.copy(original);
	});
	const [ dirty, setDirty ] = useState<boolean>(false);
	const [ monsterFilter, setMonsterFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter());
	const [ terrainFilter, setTerrainFilter ] = useState<TerrainFilter>(FactoryLogic.createTerrainFilter());

	//#region Edit

	const getEditHeaderSection = () => {
		return null;
	};

	const getEditSection = () => {
		switch (kind!) {
			case 'adventure':
				return (
					<div className='adventure-container'>
						<AdventureEditPanel
							adventure={element as Adventure}
							playbook={props.playbook}
							sourcebooks={props.sourcebooks}
							heroes={props.heroes}
							options={props.options}
							onChange={adventure => {
								setElement(adventure);
								setDirty(true);
							}}
						/>
					</div>
				);
			case 'encounter':
				return (
					<EncounterEditPanel
						encounter={element as Encounter}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={encounter => {
							setElement(encounter);
							setDirty(true);
						}}
						showMonster={props.showMonster}
						showTerrain={props.showTerrain}
					/>
				);
			case 'negotiation':
				return (
					<NegotiationEditPanel
						negotiation={element as Negotiation}
						onChange={negotiation => {
							setElement(negotiation);
							setDirty(true);
						}}
					/>
				);
			case 'montage':
				return (
					<MontageEditPanel
						montage={element as Montage}
						onChange={montage => {
							setElement(montage);
							setDirty(true);
						}}
					/>
				);
			case 'tactical-map':
				return (
					<div className='tactical-map-container'>
						<TacticalMapPanel
							map={element as TacticalMap}
							display={TacticalMapDisplayType.DirectorEdit}
							options={props.options}
							mode={PanelMode.Full}
							updateMap={map => {
								setElement(map);
								setDirty(true);
							}}
						/>
					</div>
				);
		}
	};

	//#endregion

	//#region Preview

	const getEncounterPreviewSection = () => {
		return (
			<SelectablePanel>
				<EncounterPanel
					encounter={element as Encounter}
					sourcebooks={props.sourcebooks}
					heroes={props.heroes}
					options={props.options}
					mode={PanelMode.Full}
				/>
			</SelectablePanel>
		);
	};

	const getEncounterPreviewMonstersSection = () => {
		const setMonsterFilterName = (name: string) => {
			const copy = Utils.copy(monsterFilter);
			copy.name = name;
			setMonsterFilter(copy);
		};

		const addMonster = (monster: Monster, encounterGroupID: string | null) => {
			const copy = Utils.copy(element) as Encounter;

			if (encounterGroupID) {
				const group = copy.groups.find(g => g.id === encounterGroupID);
				if (group) {
					const slot = group.slots.find(s => s.monsterID === monster.id);
					if (slot) {
						slot.count += 1;
					} else {
						group.slots.push(FactoryLogic.createEncounterSlot(monster.id));
					}
				};
			} else {
				const group = FactoryLogic.createEncounterGroup();
				group.slots.push(FactoryLogic.createEncounterSlot(monster.id));
				copy.groups.push(group);
			}

			setElement(copy);
			setDirty(true);
		};

		const encounter = element as Encounter;
		const monsters = Collections.sort(props.sourcebooks.flatMap(s => s.monsterGroups.flatMap(mg => mg.monsters).filter(m => MonsterLogic.matches(m, monsterFilter))), m => m.name);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Input
					placeholder='Search'
					allowClear={true}
					value={monsterFilter.name}
					onChange={e => setMonsterFilterName(e.target.value)}
				/>
				<Expander title='Filter'>
					<MonsterFilterPanel
						monsterFilter={monsterFilter}
						monsters={props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(g => g.monsters)}
						includeNameFilter={false}
						onChange={setMonsterFilter}
					/>
				</Expander>
				{
					monsters.map(m => {
						const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, m.id) as MonsterGroup;

						let addBtn: ReactNode;
						if (encounter.groups.length === 0) {
							addBtn = (
								<Button icon={<PlusOutlined />} onClick={() => addMonster(m, null)}>Add</Button>
							);
						} else {
							const groups = encounter.groups.map((group, n) => ({
								key: group.id,
								label: <div className='ds-text centered-text'>Group {n + 1}</div>
							}));
							groups.push({
								key: '',
								label: <div className='ds-text centered-text'>New Group</div>
							});
							addBtn = (
								<DropdownButton
									label='Add'
									items={groups}
									onClick={groupID => addMonster(m, groupID !== '' ? groupID : null)}
								/>
							);
						}

						return (
							<div key={m.id} className='monster-row'>
								<MonsterInfo monster={m} />
								<Flex gap={10}>
									<Button onClick={() => props.showMonster(m, monsterGroup)}>Details</Button>
									{addBtn}
								</Flex>
							</div>
						);
					})
				}
				{
					monsters.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getEncounterPreviewTerrainSection = () => {
		const setTerrainFilterName = (name: string) => {
			const copy = Utils.copy(terrainFilter);
			copy.name = name;
			setTerrainFilter(copy);
		};

		const addTerrain = (terrain: Terrain) => {
			const copy = Utils.copy(element) as Encounter;

			const data = copy.terrain.find(t => t.terrainID === terrain.id);
			if (data) {
				data.count += 1;
			} else {
				copy.terrain.push({
					id: Utils.guid(),
					terrainID: terrain.id,
					upgradeIDs: [],
					count: 1,
					terrain: []
				});
			}

			setElement(copy);
			setDirty(true);
		};

		const allTerrains = SourcebookLogic.getTerrains(props.sourcebooks);
		const terrains = Collections.sort(allTerrains.filter(m => TerrainLogic.matches(m, terrainFilter)), t => t.name);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Input
					placeholder='Search'
					allowClear={true}
					value={terrainFilter.name}
					onChange={e => setTerrainFilterName(e.target.value)}
				/>
				<Expander title='Filter'>
					<TerrainFilterPanel
						terrainFilter={terrainFilter}
						terrain={allTerrains}
						includeNameFilter={false}
						onChange={setTerrainFilter}
					/>
				</Expander>
				{
					terrains.map(t => {
						return (
							<div key={t.id} className='terrain-row'>
								<TerrainInfo terrain={t} />
								<Flex gap={10}>
									<Button onClick={() => props.showTerrain(t, [])}>Details</Button>
									<Button icon={<PlusOutlined />} onClick={() => addTerrain(t)}>Add</Button>
								</Flex>
							</div>
						);
					})
				}
				{
					terrains.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getPreviewHeaderSection = () => {
		if (kind === 'encounter') {
			const strength = EncounterLogic.getStrength(element as Encounter, props.sourcebooks);
			const difficulty = EncounterLogic.getDifficulty(strength, props.options, props.heroes);

			return (
				<Expander title='Difficulty' tags={[ difficulty ]}>
					<EncounterDifficultyPanel
						encounter={element as Encounter}
						sourcebooks={props.sourcebooks}
						heroes={props.heroes}
						options={props.options}
					/>
				</Expander>
			);
		}

		return null;
	};

	const getPreview = () => {
		switch (kind!) {
			case 'encounter':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Preview',
								children: getEncounterPreviewSection()
							},
							{
								key: '2',
								label: 'Monsters',
								children: getEncounterPreviewMonstersSection()
							},
							{
								key: '3',
								label: 'Terrain',
								children: getEncounterPreviewTerrainSection()
							}
						]}
					/>
				);
			case 'montage':
				return (
					<SelectablePanel>
						<MontagePanel
							montage={element as Montage}
							mode={PanelMode.Full}
						/>
					</SelectablePanel>
				);
			case 'negotiation':
				return (
					<SelectablePanel>
						<NegotiationPanel
							negotiation={element as Negotiation}
							mode={PanelMode.Full}
						/>
					</SelectablePanel>
				);
		}

		return null;
	};

	//#endregion

	const getSubheader = () => {
		if (kind === 'tactical-map') {
			return 'Tactical Map';
		}

		return Format.capitalize(kind!);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='playbook-edit-page'>
					<AppHeader subheader={`${getSubheader()} Builder`} showDirectory={props.showDirectory}>
						<Button type='primary' icon={<SaveOutlined />} disabled={!dirty} onClick={() => props.saveChanges(kind!, element)}>
							Save Changes
						</Button>
						<Button icon={<CloseOutlined />} onClick={() => navigation.goToPlaybookView(kind!, element.id)}>
							Cancel
						</Button>
						{
							(kind === 'encounter') ?
								<div className='divider' />
								: null
						}
						{
							(kind === 'encounter') || (kind === 'tactical-map') ?
								<Popover
									trigger='click'
									content={<OptionsPanel mode={kind} options={props.options}heroes={props.heroes} setOptions={props.setOptions} />}
								>
									<Button icon={<SettingOutlined />}>
										Options
										<DownOutlined />
									</Button>
								</Popover>
								: null
						}
					</AppHeader>
					<div className='playbook-edit-page-content'>
						<div className='edit-column'>
							{getEditHeaderSection()}
							{getEditSection()}
						</div>
						{
							(kind !== 'adventure') && (kind !== 'tactical-map') ?
								<div className='preview-column'>
									{getPreviewHeaderSection()}
									{getPreview()}
								</div>
								: null
						}
					</div>
					<AppFooter page='playbook' heroes={props.heroes} showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} showSourcebooks={props.showSourcebooks} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
