import { Feature, FeatureCompanion, FeatureRetainer, FeatureSummon, FeatureSummonChoice } from '@/models/feature';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { useBuiltInSourcebooks, useDirectorSourcebooks, useHeroes, useHomebrewSourcebooks, useOptions, useSourcebooks } from '@/contexts/data-context';
import { Ability } from '@/models/ability';
import { AbilityModal } from '@/components/modals/ability/ability-modal';
import { AboutModal } from '@/components/modals/about/about-modal';
import { Characteristic } from '@/enums/characteristic';
import { ConnectionSettings } from '@/models/connection-settings';
import { DataService } from '@/services/data-service';
import { Element } from '@/models/element';
import { ElementModal } from '@/components/modals/element/element-modal';
import { Encounter } from '@/models/encounter';
import { EncounterToolsModal } from '@/components/modals/encounter-tools/encounter-tools-modal';
import { ErrorsModal } from '@/components/modals/errors/errors-modal';
import { ExtensionLogic } from '@/logic/extension-logic';
import { FeatureModal } from '@/components/modals/feature/feature-modal';
import { FeatureType } from '@/enums/feature-type';
import { Fixture } from '@/models/fixture';
import { FixtureModal } from '@/components/modals/fixture/fixture-modal';
import { Follower } from '@/models/follower';
import { FollowerModal } from '@/components/modals/follower/follower-modal';
import { Hero } from '@/models/hero';
import { HeroConditionalModal } from '@/components/modals/hero-conditional/hero-conditional-modal';
import { HeroCustomizeModal } from '@/components/modals/hero-customize/hero-customize-modal';
import { HeroInventoryModal } from '@/components/modals/hero-inventory/hero-inventory-modal';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroModalType } from '@/enums/hero-modal-type';
import { HeroNotesModal } from '@/components/modals/hero-notes/hero-notes-modal';
import { HeroProjectsModal } from '@/components/modals/hero-projects/hero-projects-modal';
import { HeroResourcesModal } from '@/components/modals/hero-resources/hero-resources-modal';
import { HeroRespiteModal } from '@/components/modals/hero-respite/hero-respite-modal';
import { HeroSettingsModal } from '@/components/modals/hero-settings/hero-settings-modal';
import { HeroTitlesModal } from '@/components/modals/hero-titles/hero-titles-modal';
import { HeroVitalsModal } from '@/components/modals/hero-vitals/hero-vitals-modal';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { PartyModal } from '@/components/modals/party/party-modal';
import { PlayerViewModal } from '@/components/modals/player-view/player-view-modal';
import { ReactNode } from 'react';
import { ReferenceModal } from '@/components/modals/reference/reference-modal';
import { RollModal } from '@/components/modals/roll/roll-modal';
import { RulesPage } from '@/enums/rules-page';
import { Session } from '@/models/session';
import { SettingsModal } from '@/components/modals/settings/settings-modal';
import { SharedElementKind } from '@/logic/sharing-logic';
import { SourcebooksModal } from '@/components/modals/sourcebooks/sourcebooks-modal';
import { SummonLogic } from '@/logic/summon-logic';
import { SummoningInfo } from '@/models/summon';
import { Terrain } from '@/models/terrain';
import { TerrainModal } from '@/components/modals/terrain/terrain-modal';
import { Utils } from '@/utils/utils';
import { notification } from 'antd';

interface Props {
	notify: ReturnType<typeof notification.useNotification>[0];
	setDrawer: (drawer: ReactNode) => void;
	setErrors: (errors: Event[]) => void;
	setPlayerView: (playerView: Window | null) => void;
	errors: Event[];
	connectionSettings: ConnectionSettings;
	dataService: DataService;
	persistHero: (hero: Hero) => Promise<void>;
	persistSession: (session: Session) => Promise<void>;
	persistHomebrewSourcebook: (sourcebook: Sourcebook) => Promise<void>;
	replaceHomebrewSourcebook: (sourcebook: Sourcebook, all: Sourcebook[]) => Promise<void>;
	deleteHomebrewSourcebook: (sourcebook: Sourcebook) => Promise<void>;
	persistConnectionSettings: (settings: ConnectionSettings) => Promise<void>;
	exportLibraryElementData: (category: string, element: Element) => void;
	copyLibraryElementCode: (kind: SharedElementKind, element: Element) => Promise<void>;
}

export const useModals = (props: Props) => {
	const { notify, setDrawer, setErrors, setPlayerView, errors, connectionSettings, dataService, persistHero, persistSession, persistHomebrewSourcebook, replaceHomebrewSourcebook, deleteHomebrewSourcebook, persistConnectionSettings, exportLibraryElementData, copyLibraryElementCode } = props;
	const options = useOptions();
	const heroes = useHeroes();
	const homebrewSourcebooks = useHomebrewSourcebooks();
	const builtInSourcebooks = useBuiltInSourcebooks();
	const sourcebooks = useSourcebooks();
	const directorSourcebooks = useDirectorSourcebooks();

	const showAbout = () => {
		setDrawer(
			<AboutModal
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const showSettings = () => {
		setDrawer(
			<SettingsModal
				connectionSettings={connectionSettings}
				dataService={dataService}
				setConnectionSettings={persistConnectionSettings}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const showErrors = () => {
		setDrawer(
			<ErrorsModal
				errors={errors}
				clearErrors={() => setErrors([])}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectLibraryElement = (element: Element, category: SourcebookElementKind) => {
		setDrawer(
			<ElementModal
				category={category}
				element={element}
				sourcebooks={sourcebooks}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectMonster = (hero: Hero | undefined, monster: Monster, monsterGroup?: MonsterGroup, summon?: SummoningInfo) => {
		setDrawer(
			<MonsterModal
				monster={monster}
				monsterGroup={monsterGroup}
				summon={summon}
				sourcebooks={sourcebooks}
				controller={hero}
				onChange={
					hero ?
						monster => {
							const heroCopy = Utils.copy(hero);
							const features = HeroLogic.getFeatures(heroCopy).map(f => f.feature);

							const companionOrRetainer = features
								.filter(f => [ FeatureType.Companion, FeatureType.Retainer ].includes(f.type))
								.map(f => f as FeatureCompanion | FeatureRetainer)
								.find(f => !!f.data.selected && f.data.selected.id === monster.id);
							if (companionOrRetainer) {
								companionOrRetainer.data.selected = Utils.copy(monster);
								persistHero(heroCopy);
								return;
							}

							const summon = features
								.filter(f => f.type === FeatureType.Summon)
								.map(f => f as FeatureSummon)
								.flatMap(f => f.data.summons)
								.find(s => s.monster.id === monster.id);
							if (summon) {
								SummonLogic.applyCustomization(summon.monster, monster);
								persistHero(heroCopy);
								return;
							}

							const summonChoice = features
								.filter(f => f.type === FeatureType.SummonChoice)
								.map(f => f as FeatureSummonChoice)
								.flatMap(f => f.data.selected)
								.find(s => s.monster.id === monster.id);
							if (summonChoice) {
								SummonLogic.applyCustomization(summonChoice.monster, monster);
								persistHero(heroCopy);
							}
						}
						: undefined
				}
				onClose={() => setDrawer(null)}
				exportElementData={exportLibraryElementData}
				copyElementCode={copyLibraryElementCode}
			/>
		);
	};

	const onSelectTerrain = (terrain: Terrain, upgradeIDs: string[]) => {
		setDrawer(
			<TerrainModal
				terrain={terrain}
				upgradeIDs={upgradeIDs}
				sourcebooks={sourcebooks}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectFollower = (hero: Hero, follower: Follower) => {
		setDrawer(
			<FollowerModal
				follower={follower}
				sourcebooks={sourcebooks}
				onChange={follower => {
					const heroCopy = Utils.copy(hero);
					const feature = HeroLogic.getFeatures(heroCopy)
						.map(f => f.feature)
						.filter(f => f.type === FeatureType.Follower)
						.find(f => f.data.follower.id === follower.id);
					if (feature) {
						feature.data.follower = Utils.copy(follower);
						persistHero(heroCopy);
					}
				}}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectFixture = (fixture: Fixture) => {
		setDrawer(
			<FixtureModal
				fixture={fixture}
				sourcebooks={sourcebooks}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectCharacteristic = (characteristic: Characteristic, hero: Hero) => {
		setDrawer(
			<RollModal
				characteristics={[ characteristic ]}
				creature={hero}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectFeature = (feature: Feature, hero: Hero) => {
		const heroSourcebooks = ExtensionLogic.getHeroSourcebooks(hero, sourcebooks);

		setDrawer(
			<FeatureModal
				feature={feature}
				hero={hero}
				sourcebooks={heroSourcebooks}
				onClose={() => setDrawer(null)}
				updateHero={persistHero}
			/>
		);
	};

	const onSelectAbility = (ability: Ability, hero: Hero) => {
		setDrawer(
			<AbilityModal
				ability={ability}
				hero={hero}
				onClose={() => setDrawer(null)}
				updateHero={persistHero}
			/>
		);
	};

	const onShowHeroState = (hero: Hero, type: HeroModalType) => {
		const heroSourcebooks = ExtensionLogic.getHeroSourcebooks(hero, sourcebooks);

		const takeRespite = (updatedHero: Hero) => {
			const copy = Utils.copy(updatedHero || hero);
			HeroLogic.takeRespite(copy);
			persistHero(copy);

			notify.info({
				title: 'Respite',
				description: 'You\'ve taken a respite. Your hero\'s stats have been reset.',
				placement: 'top'
			});
		};

		switch (type) {
			case HeroModalType.Resources:
				setDrawer(
					<HeroResourcesModal
						hero={hero}
						sourcebooks={heroSourcebooks}
						onClose={() => setDrawer(null)}
						onChange={persistHero}
					/>
				);
				break;
			case HeroModalType.Vitals:
				setDrawer(
					<HeroVitalsModal
						hero={hero}
						showEncounterControls={false}
						onClose={() => setDrawer(null)}
						onChange={persistHero}
					/>
				);
				break;
			case HeroModalType.Inventory:
				setDrawer(
					<HeroInventoryModal
						hero={hero}
						sourcebooks={heroSourcebooks}
						onClose={() => setDrawer(null)}
						onChange={persistHero}
						onCustomize={() => onShowHeroState(hero, HeroModalType.Customize)}
					/>
				);
				break;
			case HeroModalType.Projects:
				setDrawer(
					<HeroProjectsModal
						hero={hero}
						sourcebooks={heroSourcebooks}
						onClose={() => setDrawer(null)}
						onChange={persistHero}
						onCustomize={() => onShowHeroState(hero, HeroModalType.Customize)}
					/>
				);
				break;
			case HeroModalType.Titles:
				setDrawer(
					<HeroTitlesModal
						hero={hero}
						sourcebooks={heroSourcebooks}
						onClose={() => setDrawer(null)}
						onChange={persistHero}
						onCustomize={() => onShowHeroState(hero, HeroModalType.Customize)}
					/>
				);
				break;
			case HeroModalType.Respite:
				setDrawer(
					<HeroRespiteModal
						hero={hero}
						sourcebooks={heroSourcebooks}
						onTakeRespite={takeRespite}
						onChange={hero => persistHero(hero)}
						onClose={() => setDrawer(null)}
					/>
				);
				break;
			case HeroModalType.Customize:
				setDrawer(
					<HeroCustomizeModal
						hero={hero}
						sourcebooks={heroSourcebooks}
						onClose={() => setDrawer(null)}
						onChange={persistHero}
					/>
				);
				break;
			case HeroModalType.Conditional:
				setDrawer(
					<HeroConditionalModal
						hero={hero}
						sourcebooks={heroSourcebooks}
						options={options}
						onClose={() => setDrawer(null)}
						onChange={persistHero}
					/>
				);
				break;
			case HeroModalType.Settings:
				setDrawer(
					<HeroSettingsModal
						hero={hero}
						sourcebooks={heroSourcebooks}
						allSourcebooks={sourcebooks}
						onClose={() => setDrawer(null)}
						onImportSourcebook={persistHomebrewSourcebook}
						onChange={persistHero}
					/>
				);
				break;
			case HeroModalType.Notes:
				setDrawer(
					<HeroNotesModal
						hero={hero}
						onClose={() => setDrawer(null)}
						onChange={persistHero}
					/>
				);
				break;
		}
	};

	const onShowParty = (folder: string) => {
		setDrawer(
			<PartyModal
				heroes={HeroLogic.getPartyHeroes(heroes, folder)}
				sourcebooks={sourcebooks}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onShowReference = (hero: Hero | null, page?: RulesPage) => {
		setDrawer(
			<ReferenceModal
				hero={hero}
				sourcebooks={sourcebooks}
				startPage={page}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const showSourcebooks = () => {
		setDrawer(
			<SourcebooksModal
				officialSourcebooks={builtInSourcebooks}
				homebrewSourcebooks={homebrewSourcebooks}
				onClose={() => setDrawer(null)}
				onHomebrewSourcebookChange={persistHomebrewSourcebook}
				onHomebrewSourcebookReplace={replaceHomebrewSourcebook}
				onHomebrewSourcebookDelete={deleteHomebrewSourcebook}
			/>
		);
	};

	const showEncounterTools = (encounter: Encounter, tool: string) => {
		switch (tool) {
			case 'minis':
				setDrawer(
					<EncounterToolsModal
						encounter={encounter}
						sourcebooks={directorSourcebooks}
						onClose={() => setDrawer(null)}
					/>
				);
				break;
		}
	};

	const showPlayerView = () => {
		setDrawer(
			<PlayerViewModal
				updateSession={persistSession}
				openPlayerView={setPlayerView}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	return {
		showAbout,
		showSettings,
		showErrors,
		onSelectLibraryElement,
		onSelectMonster,
		onSelectTerrain,
		onSelectFollower,
		onSelectFixture,
		onSelectCharacteristic,
		onSelectFeature,
		onSelectAbility,
		onShowHeroState,
		onShowParty,
		onShowReference,
		showSourcebooks,
		showEncounterTools,
		showPlayerView
	};
};
