import { Button, Drawer, Popover, Select, Space, Tabs } from 'antd';
import { CloseOutlined, DownOutlined, LeftOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { Sourcebook, SourcebookElementKind } from '../../../../models/sourcebook';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryEditPanel } from '../../../panels/edit/ancestry-edit/ancestry-edit-panel';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerEditPanel } from '../../../panels/edit/career-edit/career-edit-panel';
import { CareerPanel } from '../../../panels/elements/career-panel/career-panel';
import { ClassEditPanel } from '../../../panels/edit/class-edit/class-edit-panel';
import { ClassPanel } from '../../../panels/elements/class-panel/class-panel';
import { Collections } from '../../../../utils/collections';
import { Complication } from '../../../../models/complication';
import { ComplicationEditPanel } from '../../../panels/edit/complication-edit/complication-edit-panel';
import { ComplicationPanel } from '../../../panels/elements/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CultureEditPanel } from '../../../panels/edit/culture-edit/culture-edit-panel';
import { CulturePanel } from '../../../panels/elements/culture-panel/culture-panel';
import { Domain } from '../../../../models/domain';
import { DomainEditPanel } from '../../../panels/edit/domain-edit/domain-edit-panel';
import { DomainPanel } from '../../../panels/elements/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FeatureEditPanel } from '../../../panels/edit/feature-edit/feature-edit-panel';
import { Format } from '../../../../utils/format';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { Item } from '../../../../models/item';
import { ItemEditPanel } from '../../../panels/edit/item-edit/item-edit-panel';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitEditPanel } from '../../../panels/edit/kit-edit/kit-edit-panel';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { MonsterEditPanel } from '../../../panels/edit/monster-edit/monster-edit-panel';
import { MonsterGroupEditPanel } from '../../../panels/edit/monster-group-edit/monster-group-edit-panel';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { MonsterSelectModal } from '../../../modals/select/monster-select/monster-select-modal';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { ProjectPanel } from '../../../panels/elements/project-panel/project-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { SubClass } from '../../../../models/subclass';
import { SubClassEditPanel } from '../../../panels/edit/subclass-edit/subclass-edit-panel';
import { SubclassPanel } from '../../../panels/elements/subclass-panel/subclass-panel';
import { Terrain } from '../../../../models/terrain';
import { TerrainEditPanel } from '../../../panels/edit/terrain-edit/terrain-edit-panel';
import { TerrainPanel } from '../../../panels/elements/terrain-panel/terrain-panel';
import { Title } from '../../../../models/title';
import { TitleEditPanel } from '../../../panels/edit/title-edit/title-edit-panel';
import { TitlePanel } from '../../../panels/elements/title-panel/title-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './library-edit-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	showSourcebooks: () => void;
 	showMonster: (monster: Monster, monsterGroup: MonsterGroup) => void;
	saveChanges: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	setOptions: (options: Options) => void;
}

export const LibraryEditPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, sourcebookID, elementID, subElementID } = useParams<{ kind: SourcebookElementKind, sourcebookID: string, elementID: string, subElementID?: string }>();
	const [ element, setElement ] = useState<Element>(() => {
		const sourcebook = props.sourcebooks.find(s => s.id === sourcebookID)!;
		let original: Element;
		switch (kind!) {
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
			case 'item':
				original = sourcebook.items.find(e => e.id === elementID)!;
				break;
			case 'kit':
				original = sourcebook.kits.find(e => e.id === elementID)!;
				break;
			case 'monster-group':
				original = sourcebook.monsterGroups.find(e => e.id === elementID)!;
				break;
			case 'perk':
				original = sourcebook.perks.find(e => e.id === elementID)!;
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
	const [ scratchpadMonsters, setScratchpadMonsters ] = useState<Monster[]>([]);
	const [ hiddenMonsterIDs, setHiddenMonsterIDs ] = useState<string[]>([]);
	const [ drawerOpen, setDrawerOpen ] = useState<boolean>(false);

	const getSimilarMonsters = (monster: Monster) => {
		const monsters = SourcebookLogic
			.getSimilarMonsters(props.sourcebooks, monster, props.options)
			.filter(m => !hiddenMonsterIDs.includes(m.id));

		scratchpadMonsters
			.filter(m => !monsters.map(monster => monster.id).includes(m.id))
			.forEach(m => monsters.push(m));

		return Collections.sort(monsters, m => MonsterLogic.getMonsterName(m));
	};

	const getSimilarMonstersSection = (monster: Monster) => {
		const monsters = getSimilarMonsters(monster);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Expander title='Modify This List'>
					<Space direction='vertical' style={{ paddingTop: '15px', width: '100%' }}>
						<Button block={true} onClick={() => setDrawerOpen(true)}>Add a Monster</Button>
						<Button block={true} disabled={hiddenMonsterIDs.length === 0} onClick={() => setHiddenMonsterIDs([])}>Restore Hidden Monsters</Button>
					</Space>
				</Expander>
				{
					monsters.map(m => {
						const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, m.id);
						if (!monsterGroup) {
							return null;
						}

						return (
							<SelectablePanel
								key={m.id}
								action={{
									label: 'Hide',
									onClick: () => {
										if (scratchpadMonsters.map(spm => spm.id).includes(m.id)) {
											let copy = Utils.copy(scratchpadMonsters) as Monster[];
											copy = copy.filter(cm => cm.id !== m.id);
											setScratchpadMonsters(copy);
										} else {
											const copy = Utils.copy(hiddenMonsterIDs) as string[];
											copy.push(m.id);
											setHiddenMonsterIDs(copy);
										}
									}
								}}
								onSelect={() => props.showMonster(m, monsterGroup)}
							>
								<MonsterPanel
									monster={m}
									monsterGroup={monsterGroup}
									options={props.options}
								/>
							</SelectablePanel>
						);
					})
				}
				{
					monsters.length === 0 ?
						<Empty text='No similar monsters.' />
						: null
				}
				<Drawer open={drawerOpen} closeIcon={null} onClose={() => setDrawerOpen(false)} width='500px'>
					<MonsterSelectModal
						monsters={props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(g => g.monsters)}
						options={props.options}
						selectOriginal={true}
						onSelect={monster => {
							const copy = Utils.copy(scratchpadMonsters) as Monster[];
							copy.push(monster);
							setScratchpadMonsters(copy);
							setDrawerOpen(false);
						}}
						onClose={() => setDrawerOpen(false)}
					/>
				</Drawer>
			</Space>
		);
	};

	const getEditHeaderSection = () => {
		switch (kind) {
			case 'class': {
				const heroClass = element as HeroClass;
				if (heroClass.subclasses.length > 0) {
					return (
						<div className='edit-header-section'>
							<Select
								style={{ width: '100%' }}
								allowClear={!!subElementID}
								options={[ null, ...heroClass.subclasses ].map(sc => ({ label: sc ? `Subclass: ${sc.name || 'Unnamed Subclass'}` : 'Class', value: sc ? sc.id : '' }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={subElementID || ''}
								onChange={id => navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!, id)}
							/>
						</div>
					);
				}
				break;
			}
			case 'monster-group': {
				const monsterGroup = element as MonsterGroup;
				if (monsterGroup.monsters.length > 0) {
					return (
						<div className='edit-header-section'>
							<Select
								style={{ width: '100%' }}
								allowClear={!!subElementID}
								options={[ null, ...monsterGroup.monsters ].map(m => ({ label: m ? `Monster: ${MonsterLogic.getMonsterName(m, monsterGroup)}` : 'Monster Group', value: m ? m.id : '' }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={subElementID || ''}
								onChange={id => navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!, id)}
							/>
						</div>
					);
				}
				break;
			}
		}

		return null;
	};

	const getEditSection = () => {
		switch (kind) {
			case 'ancestry':
				return (
					<AncestryEditPanel
						ancestry={element as Ancestry}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={a => {
							setElement(a);
							setDirty(true);
						}}
					/>
				);
			case 'culture':
				return (
					<CultureEditPanel
						culture={element as Culture}
						sourcebooks={props.sourcebooks}
						onChange={c => {
							setElement(c);
							setDirty(true);
						}}
					/>
				);
			case 'career':
				return (
					<CareerEditPanel
						career={element as Career}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={c => {
							setElement(c);
							setDirty(true);
						}}
					/>
				);
			case 'class':
				if (!subElementID) {
					return (
						<ClassEditPanel
							heroClass={element as HeroClass}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={c => {
								setElement(c);
								setDirty(true);
							}}
							onEditSubClass={sc => navigation.goToLibraryEdit(kind!, sourcebookID!, element.id, sc.id)}
						/>
					);
				} else {
					const heroClass = element as HeroClass;
					const subclass = heroClass.subclasses.find(sc => sc.id === subElementID) as SubClass;

					return (
						<SubClassEditPanel
							subClass={subclass}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={sc => {
								const copy = Utils.copy(heroClass);
								const index = copy.subclasses.findIndex(s => s.id === sc.id);
								if (index !== -1) {
									copy.subclasses[index] = sc;
								}
								setElement(copy);
								setDirty(true);
							}}
						/>
					);
				}
			case 'complication':
				return (
					<ComplicationEditPanel
						complication={element as Complication}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={c => {
							setElement(c);
							setDirty(true);
						}}
					/>
				);
			case 'domain':
				return (
					<DomainEditPanel
						domain={element as Domain}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={d => {
							setElement(d);
							setDirty(true);
						}}
					/>
				);
			case 'kit':
				return (
					<KitEditPanel
						kit={element as Kit}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={k => {
							setElement(k);
							setDirty(true);
						}}
					/>
				);
			case 'perk':
				return (
					<FeatureEditPanel
						feature={element as Perk}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={perk => {
							const copy = Utils.copy(perk) as Perk;
							setElement(copy);
							setDirty(true);
						}}
					/>
				);
			case 'terrain':
				return (
					<TerrainEditPanel
						terrain={element as Terrain}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={t => {
							setElement(t);
							setDirty(true);
						}}
					/>
				);
			case 'title':
				return (
					<TitleEditPanel
						title={element as Title}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={t => {
							setElement(t);
							setDirty(true);
						}}
					/>
				);
			case 'item':
				return (
					<ItemEditPanel
						item={element as Item}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={i => {
							setElement(i);
							setDirty(true);
						}}
					/>
				);
			case 'monster-group':
				if (!subElementID) {
					return (
						<MonsterGroupEditPanel
							monsterGroup={element as MonsterGroup}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={mg => {
								setElement(mg);
								setDirty(true);
							}}
							onEditMonster={m => navigation.goToLibraryEdit(kind!, sourcebookID!, element.id, m.id)}
						/>
					);
				} else {
					const monsterGroup = element as MonsterGroup;
					const monster = monsterGroup.monsters.find(m => m.id === subElementID) as Monster;

					return (
						<MonsterEditPanel
							monster={monster}
							monsterGroup={monsterGroup}
							sourcebooks={props.sourcebooks}
							options={props.options}
							similarMonsters={props.options.showSimilarMonsters ? getSimilarMonsters(monster) : []}
							onChange={monster => {
								const copy = Utils.copy(monsterGroup);
								const index = copy.monsters.findIndex(m => m.id === monster.id);
								if (index !== -1) {
									copy.monsters[index] = monster;
								}
								setElement(copy);
								setDirty(true);
							}}
						/>
					);
				}
		}

		return null;
	};

	const getPreviewHeaderSection = () => {
		switch (kind) {
			case 'class':
				if (subElementID) {
					return (
						<div className='preview-header-section'>
							<Button icon={<LeftOutlined />} onClick={() => navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!)}>Back to Class</Button>
						</div>
					);
				}
				break;
			case 'monster-group':
				if (subElementID) {
					return (
						<div className='preview-header-section'>
							<Button icon={<LeftOutlined />} onClick={() => navigation.goToLibraryEdit(kind!, sourcebookID!, elementID!)}>Back to Monster Group</Button>
						</div>
					);
				}
				break;
		}

		return null;
	};

	const getPreview = () => {
		switch (kind) {
			case 'ancestry':
				return (
					<SelectablePanel>
						<AncestryPanel ancestry={element as Ancestry} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'culture':
				return (
					<SelectablePanel>
						<CulturePanel culture={element as Culture} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'career':
				return (
					<SelectablePanel>
						<CareerPanel career={element as Career} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'class':
				if (!subElementID) {
					return (
						<SelectablePanel>
							<ClassPanel heroClass={element as HeroClass} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				} else {
					const heroClass = element as HeroClass;
					const subclass = heroClass.subclasses.find(sc => sc.id === subElementID) as SubClass;

					return (
						<SelectablePanel>
							<SubclassPanel subclass={subclass} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				}
			case 'complication':
				return (
					<SelectablePanel>
						<ComplicationPanel complication={element as Complication} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'domain':
				return (
					<SelectablePanel>
						<DomainPanel domain={element as Domain} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'kit':
				return (
					<SelectablePanel>
						<KitPanel kit={element as Kit} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'perk':
				return (
					<SelectablePanel>
						<PerkPanel perk={element as Perk} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'terrain':
				return (
					<SelectablePanel>
						<TerrainPanel terrain={element as Terrain} showCustomizations={true} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'title':
				return (
					<SelectablePanel>
						<TitlePanel title={element as Title} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'item':
				return (
					<>
						<SelectablePanel>
							<ItemPanel item={element as Item} options={props.options} showCustomizations={true} mode={PanelMode.Full} />
						</SelectablePanel>
						{
							(element as Item).crafting ?
								<SelectablePanel>
									<ProjectPanel project={(element as Item).crafting!} mode={PanelMode.Full} />
								</SelectablePanel>
								: null
						}
					</>
				);
			case 'monster-group':
				if (!subElementID) {
					return (
						<SelectablePanel>
							<MonsterGroupPanel monsterGroup={element as MonsterGroup} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				} else {
					const monsterGroup = element as MonsterGroup;
					const monster = monsterGroup.monsters.find(m => m.id === subElementID) as Monster;

					if (props.options.showSimilarMonsters) {
						return (
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<MonsterPanel key={JSON.stringify(monster)} monster={monster} monsterGroup={monsterGroup} options={props.options} mode={PanelMode.Full} />
											</SelectablePanel>
										)
									},
									{
										key: '2',
										label: 'Similar Monsters',
										children: getSimilarMonstersSection(monster)
									}
								]}
							/>
						);
					} else {
						return (
							<SelectablePanel>
								<MonsterPanel key={JSON.stringify(monster)} monster={monster} monsterGroup={monsterGroup} options={props.options} mode={PanelMode.Full} />
							</SelectablePanel>
						);
					}
				}
		}

		return null;
	};

	const getSubheader = () => {
		if (kind === 'class') {
			if (subElementID) {
				return 'Subclass Builder';
			}
		}

		if (kind === 'monster-group') {
			if (subElementID) {
				return 'Monster Builder';
			}

			return 'Monster Group Builder';
		}

		return `${Format.capitalize(kind!)} Builder`;
	};

	try {
		let monster: Monster | null = null;
		if ((kind === 'monster-group') && !!subElementID) {
			monster = (element as MonsterGroup).monsters.find(m => m.id === subElementID) || null;
		}

		return (
			<ErrorBoundary>
				<div className='library-edit-page'>
					<AppHeader subheader={getSubheader()} showDirectory={props.showDirectory}>
						<Button type='primary' icon={<SaveOutlined />} disabled={!dirty} onClick={() => props.saveChanges(kind!, sourcebookID!, element)}>
							Save Changes
						</Button>
						<Button icon={<CloseOutlined />} onClick={() => navigation.goToLibraryView(kind!, elementID!)}>
							Cancel
						</Button>
						{
							monster ?
								<div className='divider' />
								: null
						}
						{
							monster ?
								<Popover
									trigger='click'
									content={<OptionsPanel mode='monster' options={props.options}heroes={props.heroes} setOptions={props.setOptions} />}
								>
									<Button icon={<SettingOutlined />}>
										Options
										<DownOutlined />
									</Button>
								</Popover>
								: null
						}
					</AppHeader>
					<div className='library-edit-page-content'>
						<div className='edit-column'>
							{getEditHeaderSection()}
							{getEditSection()}
						</div>
						<div className='preview-column'>
							{getPreviewHeaderSection()}
							{getPreview()}
						</div>
					</div>
					<AppFooter page='library' heroes={props.heroes} showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} showSourcebooks={props.showSourcebooks} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
