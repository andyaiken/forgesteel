import { Button, Drawer, Flex, Select, Space, Tabs } from 'antd';
import { CloseOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Ancestry } from '@/models/ancestry';
import { AncestryEditPanel } from '@/components/panels/edit/ancestry-edit/ancestry-edit-panel';
import { AncestryPanel } from '@/components/panels/elements/ancestry-panel/ancestry-panel';
import { AppFooter } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { Career } from '@/models/career';
import { CareerEditPanel } from '@/components/panels/edit/career-edit/career-edit-panel';
import { CareerPanel } from '@/components/panels/elements/career-panel/career-panel';
import { ClassEditPanel } from '@/components/panels/edit/class-edit/class-edit-panel';
import { ClassPanel } from '@/components/panels/elements/class-panel/class-panel';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { ComplicationEditPanel } from '@/components/panels/edit/complication-edit/complication-edit-panel';
import { ComplicationPanel } from '@/components/panels/elements/complication-panel/complication-panel';
import { Culture } from '@/models/culture';
import { CultureEditPanel } from '@/components/panels/edit/culture-edit/culture-edit-panel';
import { CulturePanel } from '@/components/panels/elements/culture-panel/culture-panel';
import { Domain } from '@/models/domain';
import { DomainEditPanel } from '@/components/panels/edit/domain-edit/domain-edit-panel';
import { DomainPanel } from '@/components/panels/elements/domain-panel/domain-panel';
import { Element } from '@/models/element';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { ImbuementEditPanel } from '@/components/panels/edit/imbuement-edit/imbuement-edit-panel';
import { ImbuementPanel } from '@/components/panels/elements/imbuement-panel/imbuement-panel';
import { Item } from '@/models/item';
import { ItemEditPanel } from '@/components/panels/edit/item-edit/item-edit-panel';
import { ItemPanel } from '@/components/panels/elements/item-panel/item-panel';
import { Kit } from '@/models/kit';
import { KitEditPanel } from '@/components/panels/edit/kit-edit/kit-edit-panel';
import { KitPanel } from '@/components/panels/elements/kit-panel/kit-panel';
import { Monster } from '@/models/monster';
import { MonsterEditPanel } from '@/components/panels/edit/monster-edit/monster-edit-panel';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterGroupEditPanel } from '@/components/panels/edit/monster-group-edit/monster-group-edit-panel';
import { MonsterGroupPanel } from '@/components/panels/elements/monster-group-panel/monster-group-panel';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterSelectModal } from '@/components/modals/select/monster-select/monster-select-modal';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { Project } from '@/models/project';
import { ProjectEditPanel } from '@/components/panels/edit/project-edit/project-edit';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SubClass } from '@/models/subclass';
import { SubClassEditPanel } from '@/components/panels/edit/subclass-edit/subclass-edit-panel';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { Terrain } from '@/models/terrain';
import { TerrainEditPanel } from '@/components/panels/edit/terrain-edit/terrain-edit-panel';
import { TerrainPanel } from '@/components/panels/elements/terrain-panel/terrain-panel';
import { Title } from '@/models/title';
import { TitleEditPanel } from '@/components/panels/edit/title-edit/title-edit-panel';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { Utils } from '@/utils/utils';
import { useNavigation } from '@/hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

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
	saveChanges: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
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
			case 'imbuement':
				original = sourcebook.imbuements.find(e => e.id === elementID)!;
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
			case 'project':
				original = sourcebook.projects.find(e => e.id === elementID)!;
				break;
			case 'subclass':
				original = sourcebook.subclasses.find(e => e.id === elementID)!;
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
	const [ scratchpadMonsters, setScratchpadMonsters ] = useState<Monster[]>([]);
	const [ hiddenMonsterIDs, setHiddenMonsterIDs ] = useState<string[]>([]);
	const [ drawerOpen, setDrawerOpen ] = useState<boolean>(false);

	const applyChanges = (element: Element) => {
		const copy = Utils.copy(element);
		setElement(copy);
		setDirty(true);
		setRevision(revision + 1);
	};

	const getSimilarMonsters = (monster: Monster) => {
		const monsters = SourcebookLogic
			.getSimilarMonsters(props.sourcebooks, monster, props.options)
			.filter(m => !hiddenMonsterIDs.includes(m.id));

		scratchpadMonsters
			.filter(m => !monsters.map(monster => monster.id).includes(m.id))
			.forEach(m => monsters.push(m));

		return Collections.sort(monsters, m => MonsterLogic.getMonsterName(m));
	};

	const getSuggestedStatsSection = (monster: Monster) => {
		const stats = MonsterLogic.getSuggestedStats(monster);

		return (
			<div>
				<HeaderText>Stats</HeaderText>
				<Flex align='center' justify='space-around'>
					<Field orientation='vertical' label='Highest characteristic' value={stats.highestCharacteristic} />
					<Field orientation='vertical' label='EV' value={stats.ev} />
					<Field orientation='vertical' label='Stamina' value={stats.stamina} />
					<Field orientation='vertical' label='Free strike damage' value={stats.freeStrikeDamage} />
				</Flex>
				<HeaderText>Ability Damage</HeaderText>
				<Flex align='center' justify='space-around'>
					<Field orientation='vertical' label='Fewer targets' value={`${stats.damageMinus1.tier1} / ${stats.damageMinus1.tier2} / ${stats.damageMinus1.tier3}`} />
					<Field highlight={true} orientation='vertical' label='Typical targets' value={`${stats.damage.tier1} / ${stats.damage.tier2} / ${stats.damage.tier3}`} />
					<Field orientation='vertical' label='1 extra target' value={`${stats.damagePlus1.tier1} / ${stats.damagePlus1.tier2} / ${stats.damagePlus1.tier3}`} />
					<Field orientation='vertical' label='2+ extra targets' value={`${stats.damagePlus2.tier1} / ${stats.damagePlus2.tier2} / ${stats.damagePlus2.tier3}`} />
				</Flex>
			</div>
		);
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
						key={element.id}
						ancestry={element as Ancestry}
						sourcebooks={props.sourcebooks}
						options={props.options}
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
						onChange={applyChanges}
					/>
				);
			case 'class':
				if (!subElementID) {
					return (
						<ClassEditPanel
							key={element.id}
							heroClass={element as HeroClass}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={applyChanges}
							onEditSubClass={sc => navigation.goToLibraryEdit(kind!, sourcebookID!, element.id, sc.id)}
						/>
					);
				} else {
					const heroClass = element as HeroClass;
					const subclass = heroClass.subclasses.find(sc => sc.id === subElementID) as SubClass;

					return (
						<SubClassEditPanel
							key={subclass.id}
							subClass={subclass}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={sc => {
								const copy = Utils.copy(heroClass);
								const index = copy.subclasses.findIndex(s => s.id === sc.id);
								if (index !== -1) {
									copy.subclasses[index] = sc;
								}
								applyChanges(copy);
							}}
						/>
					);
				}
			case 'complication':
				return (
					<ComplicationEditPanel
						key={element.id}
						complication={element as Complication}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={applyChanges}
					/>
				);
			case 'culture':
				return (
					<CultureEditPanel
						key={element.id}
						culture={element as Culture}
						sourcebooks={props.sourcebooks}
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
						onChange={applyChanges}
					/>
				);
			case 'imbuement':
				return (
					<ImbuementEditPanel
						key={element.id}
						imbuement={element as Imbuement}
						sourcebooks={props.sourcebooks}
						options={props.options}
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
						onChange={applyChanges}
					/>
				);
			case 'monster-group':
				if (!subElementID) {
					return (
						<MonsterGroupEditPanel
							key={element.id}
							monsterGroup={element as MonsterGroup}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={applyChanges}
							onEditMonster={m => navigation.goToLibraryEdit(kind!, sourcebookID!, element.id, m.id)}
						/>
					);
				} else {
					const monsterGroup = element as MonsterGroup;
					const monster = monsterGroup.monsters.find(m => m.id === subElementID) as Monster;

					return (
						<MonsterEditPanel
							key={monster.id}
							monster={monster}
							monsterGroup={monsterGroup}
							sourcebooks={props.sourcebooks}
							options={props.options}
							similarMonsters={getSimilarMonsters(monster)}
							onChange={monster => {
								const copy = Utils.copy(monsterGroup);
								const index = copy.monsters.findIndex(m => m.id === monster.id);
								if (index !== -1) {
									copy.monsters[index] = monster;
								}
								applyChanges(copy);
							}}
						/>
					);
				}
			case 'perk':
				return (
					<FeatureEditPanel
						key={element.id}
						feature={element as Perk}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={applyChanges}
					/>
				);
			case 'project':
				return (
					<ProjectEditPanel
						key={element.id}
						project={element as Project}
						includeNameAndDescription={true}
						onChange={applyChanges}
					/>
				);
			case 'terrain':
				return (
					<TerrainEditPanel
						key={element.id}
						terrain={element as Terrain}
						sourcebooks={props.sourcebooks}
						options={props.options}
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
						onChange={applyChanges}
					/>
				);
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
					<SelectablePanel key={`${element.id}-${revision}`}>
						<AncestryPanel ancestry={element as Ancestry} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'culture':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<CulturePanel culture={element as Culture} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'career':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<CareerPanel career={element as Career} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'class':
				if (!subElementID) {
					return (
						<SelectablePanel key={`${element.id}-${revision}`}>
							<ClassPanel heroClass={element as HeroClass} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				} else {
					const heroClass = element as HeroClass;
					const subclass = heroClass.subclasses.find(sc => sc.id === subElementID) as SubClass;

					return (
						<SelectablePanel key={`${subclass.id}-${revision}`}>
							<SubclassPanel subclass={subclass} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				}
			case 'complication':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<ComplicationPanel complication={element as Complication} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'domain':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<DomainPanel domain={element as Domain} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'kit':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<KitPanel kit={element as Kit} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'perk':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<PerkPanel perk={element as Perk} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'project':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<ProjectPanel project={element as Project} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'subclass':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<SubclassPanel subclass={element as SubClass} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'terrain':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<TerrainPanel terrain={element as Terrain} showCustomizations={true} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'title':
				return (
					<SelectablePanel key={`${element.id}-${revision}`}>
						<TitlePanel title={element as Title} options={props.options} mode={PanelMode.Full} />
					</SelectablePanel>
				);
			case 'item':
				return (
					<>
						<SelectablePanel key={`${element.id}-${revision}`}>
							<ItemPanel item={element as Item} options={props.options} mode={PanelMode.Full} />
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
			case 'imbuement':
				return (
					<>
						<SelectablePanel key={`${element.id}-${revision}`}>
							<ImbuementPanel imbuement={element as Imbuement} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
						{
							(element as Imbuement).crafting ?
								<SelectablePanel>
									<ProjectPanel project={(element as Imbuement).crafting!} mode={PanelMode.Full} />
								</SelectablePanel>
								: null
						}
					</>
				);
			case 'monster-group':
				if (!subElementID) {
					return (
						<SelectablePanel key={`${element.id}-${revision}`}>
							<MonsterGroupPanel monsterGroup={element as MonsterGroup} options={props.options} mode={PanelMode.Full} />
						</SelectablePanel>
					);
				} else {
					const monsterGroup = element as MonsterGroup;
					const monster = monsterGroup.monsters.find(m => m.id === subElementID) as Monster;

					return (
						<Tabs
							items={[
								{
									key: '1',
									label: 'Preview',
									children: (
										<SelectablePanel key={`${monster.id}-${revision}`}>
											<MonsterPanel monster={monster} monsterGroup={monsterGroup} options={props.options} mode={PanelMode.Full} />
										</SelectablePanel>
									)
								},
								{
									key: '2',
									label: 'Suggested Statistics',
									children: getSuggestedStatsSection(monster)
								},
								{
									key: '3',
									label: 'Similar Monsters',
									children: getSimilarMonstersSection(monster)
								}
							]}
						/>
					);
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
				<ErrorBoundary>
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
				</ErrorBoundary>
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
