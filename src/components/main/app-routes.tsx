import { Dispatch, ReactNode, SetStateAction, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { useDirectorSourcebooks, useHomebrewSourcebooks, useSourcebooks } from '@/contexts/data-context';
import { ConnectionSettings } from '@/models/connection-settings';
import { FallbackPage } from '@/components/pages/fallback/fallback-page';
import { FooterParams } from '@/components/panels/app-footer/app-footer';
import { MainLayout } from '@/components/main/main-layout';
import { useHeroActions } from '@/hooks/use-hero-actions';
import { useLibraryActions } from '@/hooks/use-library-actions';
import { useModals } from '@/hooks/use-modals';
import { usePersistence } from '@/hooks/use-persistence';
import { useSessionActions } from '@/hooks/use-session-actions';

const AuthPage = lazy(() => import('@/components/pages/auth/auth-page').then(m => ({ default: m.AuthPage })));
const BackupPage = lazy(() => import('@/components/pages/backup/backup-page').then(m => ({ default: m.BackupPage })));
const ClocktowerPage = lazy(() => import('@/components/pages/clocktower/clocktower-page').then(m => ({ default: m.ClocktowerPage })));
const HeroEditPage = lazy(() => import('@/components/pages/heroes/hero-edit/hero-edit-page').then(m => ({ default: m.HeroEditPage })));
const HeroListPage = lazy(() => import('@/components/pages/heroes/hero-list/hero-list-page').then(m => ({ default: m.HeroListPage })));
const HeroSheetPreviewPage = lazy(() => import('@/components/pages/heroes/hero-sheet/hero-sheet-preview-page').then(m => ({ default: m.HeroSheetPreviewPage })));
const HeroViewPage = lazy(() => import('@/components/pages/heroes/hero-view/hero-view-page').then(m => ({ default: m.HeroViewPage })));
const LibraryEditPage = lazy(() => import('@/components/pages/library/library-edit/library-edit-page').then(m => ({ default: m.LibraryEditPage })));
const LibraryListPage = lazy(() => import('@/components/pages/library/library-list/library-list-page').then(m => ({ default: m.LibraryListPage })));
const LibraryPrintPage = lazy(() => import('@/components/pages/library/library-print/library-print-page').then(m => ({ default: m.LibraryPrintPage })));
const SessionDirectorPage = lazy(() => import('@/components/pages/session/director/session-director-page').then(m => ({ default: m.SessionDirectorPage })));
const SessionPlayerPage = lazy(() => import('@/components/pages/session/player/session-player-page').then(m => ({ default: m.SessionPlayerPage })));
const TransferPage = lazy(() => import('@/components/pages/transfer/transfer-page').then(m => ({ default: m.TransferPage })));
const WelcomePage = lazy(() => import('@/components/pages/welcome/welcome-page').then(m => ({ default: m.WelcomePage })));

interface Props {
	footerParams: FooterParams;
	connectionSettings: ConnectionSettings;
	drawer: ReactNode;
	setDrawer: Dispatch<SetStateAction<ReactNode>>;
	persistence: ReturnType<typeof usePersistence>;
	libraryActions: ReturnType<typeof useLibraryActions>;
	heroActions: ReturnType<typeof useHeroActions>;
	sessionActions: ReturnType<typeof useSessionActions>;
	modals: ReturnType<typeof useModals>;
}

export const AppRoutes = (props: Props) => {
	const { footerParams, connectionSettings, drawer, setDrawer } = props;
	const sourcebooks = useSourcebooks();
	const directorSourcebooks = useDirectorSourcebooks();
	const homebrewSourcebooks = useHomebrewSourcebooks();

	const { persistHero, persistHomebrewSourcebook, persistConnectionSettings } = props.persistence;
	const {
		createLibraryElement,
		moveLibraryElement,
		deleteLibraryElement,
		saveLibraryElement,
		importLibraryElement,
		copyLibraryElementCode,
		exportLibraryElementData,
		exportLibraryElementImage,
		exportLibraryElementPdf
	} = props.libraryActions;
	const {
		newHero,
		deleteHero,
		saveHero,
		importHero,
		copyHero,
		exportHeroData,
		exportHeroImage,
		exportHeroPdf,
		exportStandardAbilities,
		setNotes,
		addSquad,
		removeSquad,
		addMonsterToSquad,
		setControlledMonsterDefeated,
		setControlledMonsterHidden,
		selectControlledMonster,
		selectControlledSquad
	} = props.heroActions;
	const {
		startEncounter,
		startMontage,
		startNegotiation,
		startMap,
		startCounter,
		updateEncounter,
		updateMontage,
		updateNegotiation,
		updateMap,
		updateCounter,
		finishSessionElement
	} = props.sessionActions;
	const {
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
	} = props.modals;

	return (
		<Suspense fallback={<FallbackPage />}>
			<Routes>
				<Route
					path='/'
					element={<MainLayout drawer={drawer} setDrawer={setDrawer} />}
				>
					<Route
						index={true}
						element={
							<WelcomePage
								sourcebooks={sourcebooks}
								params={footerParams}
								onNewHero={() => newHero('')}
								onPregen={hero => importHero(hero, '')}
								onNewEncounter={() => createLibraryElement('encounter', '', null)}
							/>
						}
					/>
					<Route path='hero'>
						<Route
							index={true}
							path=':folder?'
							element={
								<HeroListPage
									sourcebooks={sourcebooks}
									params={footerParams}
									addHero={newHero}
									importHero={importHero}
									showParty={onShowParty}
									onActiveChanged={persistHero}
								/>
							}
						/>
						<Route
							path='view/:heroID'
							element={
								<HeroViewPage
									sourcebooks={sourcebooks}
									params={footerParams}
									exportHeroData={exportHeroData}
									exportHeroImage={exportHeroImage}
									exportHeroPdf={exportHeroPdf}
									exportStandardAbilities={exportStandardAbilities}
									copyHero={copyHero}
									deleteHero={deleteHero}
									showAncestry={ancestry => onSelectLibraryElement(ancestry, 'ancestry')}
									showCulture={culture => onSelectLibraryElement(culture, 'culture')}
									showCareer={career => onSelectLibraryElement(career, 'career')}
									showClass={heroClass => onSelectLibraryElement(heroClass, 'class')}
									showComplication={complication => onSelectLibraryElement(complication, 'complication')}
									showDomain={domain => onSelectLibraryElement(domain, 'domain')}
									showKit={kit => onSelectLibraryElement(kit, 'kit')}
									showTitle={title => onSelectLibraryElement(title, 'title')}
									showMonster={(hero, monster, summon) => onSelectMonster(hero, monster, undefined, summon)}
									showFollower={onSelectFollower}
									showFixture={onSelectFixture}
									showCharacteristic={onSelectCharacteristic}
									showFeature={onSelectFeature}
									showAbility={onSelectAbility}
									showHeroState={onShowHeroState}
									showHeroReference={onShowReference}
									setNotes={setNotes}
									onAddSquad={addSquad}
									onRemoveSquad={removeSquad}
									onAddMonsterToSquad={addMonsterToSquad}
									onSelectControlledMonster={selectControlledMonster}
									onSelectControlledSquad={selectControlledSquad}
									onSetControlledMonsterDefeated={setControlledMonsterDefeated}
									onSetControlledMonsterHidden={setControlledMonsterHidden}
								/>
							}
						/>
						<Route
							path='edit/:heroID'
							element={<Navigate to='start' replace={true} />}
						/>
						<Route
							path='edit/:heroID/:page'
							element={
								<HeroEditPage
									sourcebooks={sourcebooks}
									params={footerParams}
									saveChanges={saveHero}
									importSourcebook={persistHomebrewSourcebook}
								/>
							}
						/>
						<Route
							path='sheet/:heroID'
							element={<HeroSheetPreviewPage sourcebooks={sourcebooks} />}
						/>
					</Route>
					<Route path='library'>
						<Route
							index={true}
							element={<Navigate to='ancestry' replace={true} />}
						/>
						<Route
							path=':kind/:elementID?'
							element={
								<LibraryListPage
									sourcebooks={sourcebooks}
									params={footerParams}
									showSourcebooks={showSourcebooks}
									showMonster={monster => onSelectMonster(undefined, monster, undefined, undefined)}
									showEncounterTools={showEncounterTools}
									createElement={(kind, sourcebookID, element) => createLibraryElement(kind, sourcebookID, element)}
									importElement={importLibraryElement}
									moveElement={moveLibraryElement}
									deleteElement={deleteLibraryElement}
									exportElementData={exportLibraryElementData}
									copyElementCode={copyLibraryElementCode}
									exportElementImage={exportLibraryElementImage}
									exportElementPdf={exportLibraryElementPdf}
									startEncounter={startEncounter}
									startMontage={startMontage}
									startNegotiation={startNegotiation}
									startMap={startMap}
								/>
							}
						/>
						<Route
							path='edit/:kind/:sourcebookID/:elementID/:subElementID?'
							element={
								<LibraryEditPage
									sourcebooks={sourcebooks}
									params={footerParams}
									showMonster={(monster, monsterGroup) => onSelectMonster(undefined, monster, monsterGroup, undefined)}
									showTerrain={onSelectTerrain}
									saveChanges={saveLibraryElement}
								/>
							}
						/>
						<Route
							path='print/:kind/:sourcebookID/:elementID'
							element={
								<LibraryPrintPage
									sourcebooks={sourcebooks}
								/>
							}
						/>
					</Route>
					<Route path='session'>
						<Route
							index={true}
							element={<Navigate to='director' replace={true} />}
						/>
						<Route
							path='director'
							element={
								<SessionDirectorPage
									sourcebooks={directorSourcebooks}
									params={footerParams}
									showPlayerView={showPlayerView}
									startEncounter={startEncounter}
									startMontage={startMontage}
									startNegotiation={startNegotiation}
									startMap={startMap}
									startCounter={startCounter}
									updateHero={persistHero}
									updateEncounter={updateEncounter}
									updateMontage={updateMontage}
									updateNegotiation={updateNegotiation}
									updateMap={updateMap}
									updateCounter={updateCounter}
									finishSessionElement={finishSessionElement}
									showEncounterTools={showEncounterTools}
								/>
							}
						/>
						<Route
							path='player'
							element={
								<SessionPlayerPage
									sourcebooks={directorSourcebooks}
									params={footerParams}
								/>
							}
						/>
					</Route>
					<Route
						path='oauth-redirect'
						element={
							<AuthPage
								connectionSettings={connectionSettings}
								params={footerParams}
								setConnectionSettings={persistConnectionSettings}
							/>
						}
					/>
					<Route
						path='backup'
						element={<BackupPage homebrewSourcebooks={homebrewSourcebooks} />}
					/>
					<Route
						path='transfer'
						element={<TransferPage connectionSettings={connectionSettings} />}
					/>
					<Route
						path='clocktower'
						element={<ClocktowerPage params={footerParams} />}
					/>
				</Route>
				<Route
					path='*'
					element={<Navigate to='/' replace={true} />}
				/>
			</Routes>
		</Suspense>
	);
};
