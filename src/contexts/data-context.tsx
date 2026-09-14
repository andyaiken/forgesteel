import { ActionDispatch, PropsWithChildren, createContext, useContext, useMemo, useReducer } from 'react';
import { Analytics } from '@/utils/analytics';
import { Collections } from '@/utils/collections';
import { DataService } from '@/services/data-service';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';

interface DataManagerDispatchers {
	options: ActionDispatch<[ReducerAction<Options>]>;
	session: ActionDispatch<[ReducerAction<Session>]>;
	hiddenSourcebooks: ActionDispatch<[ReducerAction<string[]>]>;
	hero: ActionDispatch<[ReducerAction<Hero>]>;
	sourcebooks: ActionDispatch<[ReducerAction<Sourcebook>]>;
}

export class DataManager {
	private readonly dataService: DataService;
	private readonly optionsDispatch: ActionDispatch<[ReducerAction<Options>]>;
	private readonly sessionDispatch: ActionDispatch<[ReducerAction<Session>]>;
	private readonly hiddenSourcebooksDispatch:	ActionDispatch<[ReducerAction<string[]>]>;
	private readonly heroDispatch: ActionDispatch<[ReducerAction<Hero>]>;
	private readonly sourcebookDispatch: ActionDispatch<[ReducerAction<Sourcebook>]>;

	constructor(service: DataService, dispatchers: DataManagerDispatchers) {
		this.dataService = service;
		this.optionsDispatch = dispatchers.options;
		this.sessionDispatch = dispatchers.session;
		this.hiddenSourcebooksDispatch = dispatchers.hiddenSourcebooks;
		this.heroDispatch = dispatchers.hero;
		this.sourcebookDispatch = dispatchers.sourcebooks;
	};

	async saveOptions(options: Options) {
		return this.dataService.saveOptions(options)
			.then(options => {
				this.optionsDispatch({
					type: ReducerActionKind.UPDATE,
					payload: options
				});
			});
	}

	async saveSession(session: Session) {
		return this.dataService.saveSession(session)
			.then(session => {
				this.sessionDispatch({
					type: ReducerActionKind.UPDATE,
					payload: session
				});
			});
	}

	async saveHiddenSourcebookIDs(hiddenSourcebookIDs: string[]) {
		return this.dataService.saveHiddenSourcebookIDs(hiddenSourcebookIDs)
			.then(ids => {
				this.hiddenSourcebooksDispatch({
					type: ReducerActionKind.UPDATE,
					payload: ids
				});
			});
	}

	async saveHero(hero: Hero) {
		return this.dataService.saveHero(hero)
			.then(hero => {
				this.heroDispatch({
					type: ReducerActionKind.UPDATE,
					payload: hero
				});
			});
	}

	async deleteHero(hero: Hero) {
		return this.dataService.deleteHero(hero.id)
			.then(() => {
				this.heroDispatch({
					type: ReducerActionKind.DELETE,
					payload: hero
				});
			});
	}

	async saveSourcebook(sourcebook: Sourcebook) {
		return this.dataService.saveSourcebook(sourcebook)
			.then(sourcebook => {
				this.sourcebookDispatch({
					type: ReducerActionKind.UPDATE,
					payload: sourcebook
				});
			});
	}

	async deleteSourcebook(sourcebook: Sourcebook) {
		return this.dataService.deleteSourcebook(sourcebook.id)
			.then(() => {
				this.sourcebookDispatch({
					type: ReducerActionKind.DELETE,
					payload: sourcebook
				});
			});
	}
}

enum ReducerActionKind {
	UPDATE = 'Update',
	DELETE = 'Delete'
}

interface ReducerAction<T> {
	type: ReducerActionKind;
	payload: T;
}

interface DataManagerProps {
	dataService: DataService;
	initialOptions: Options;
	initialSession: Session;
	initialHiddenSourcebookIDs: string[];
	initialHeroes: Hero[];
	initialHomebrewSourcebooks: Sourcebook[];
	initialBuiltInSourcebooks: Sourcebook[];
}

export const OptionsContext = createContext<Options | null>(null);
export const HiddenSourcebookIDsContext = createContext<string[] | null>(null);
export const SessionContext = createContext<Session | null>(null);
export const HeroesContext = createContext<Hero[] | null>(null);
export const HomebrewSourcebooksContext = createContext<Sourcebook[] | null>(null);
export const BuiltInSourcebooksContext = createContext<Sourcebook[] | null>(null);
export const SourcebooksContext = createContext<Sourcebook[] | null>(null);

export function DataManagerProvider(props: PropsWithChildren<DataManagerProps>) {
	const dataService = props.dataService;

	const [ options, optionsDispatch ] = useReducer(UpdateOnlyReducer<Options>, props.initialOptions);
	const [ session, sessionDispatch ] = useReducer(UpdateOnlyReducer<Session>, props.initialSession);
	const [ hiddenSourcebookIDs, hiddenSourcebookIDsDispatch ] = useReducer(UpdateOnlyReducer<string[]>, props.initialHiddenSourcebookIDs);
	const [ heroes, heroDispatch ] = useReducer(HeroesReducer, props.initialHeroes);
	const [ sourcebooks, sourcebookDispatch ] = useReducer(SourcebooksReducer, props.initialHomebrewSourcebooks);

	// The built-in sourcebooks are loaded once, at boot, and never change after that;
	// combining them with homebrew is the list almost everything wants to read.
	const builtInSourcebooks = props.initialBuiltInSourcebooks;
	const allSourcebooks = useMemo(
		() => SourcebookLogic.getSourcebooks(builtInSourcebooks, sourcebooks),
		[ builtInSourcebooks, sourcebooks ]
	);

	const dataManager = new DataManager(dataService, {
		options: optionsDispatch,
		session: sessionDispatch,
		hiddenSourcebooks: hiddenSourcebookIDsDispatch,
		hero: heroDispatch,
		sourcebooks: sourcebookDispatch
	});

	function UpdateOnlyReducer<T>(_oldState: T, action: ReducerAction<T>) {
		switch (action.type) {
			case ReducerActionKind.UPDATE: {
				return action.payload;
			}
			default: {
				throw Error(`Unknown or unsupported action: ${action.type}`);
			}
		}
	}

	function HeroesReducer(currentHeroes: Hero[], action: ReducerAction<Hero>) {
		let newHeroes: Hero[];
		switch (action.type) {
			case ReducerActionKind.UPDATE: {
				const hero = action.payload;
				const copy = Utils.copy(currentHeroes);
				if (currentHeroes.some(h => h.id === hero.id)) {
					Analytics.logHeroEdited(hero);

					const list = copy.map(h => h.id === hero.id ? hero : h);
					newHeroes = list;
				} else {
					Analytics.logHeroCreated(hero);

					copy.push(hero);
					Collections.sort(copy, h => h.name);
					newHeroes = copy;
				}
				return newHeroes;
			}
			case ReducerActionKind.DELETE: {
				const hero = action.payload;
				const newHeroes = Utils.copy(currentHeroes.filter(h => h.id !== hero.id));
				return newHeroes;
			}
			default: {
				throw Error(`Unknown or unsupported action: ${action.type}`);
			}
		}
	}

	function SourcebooksReducer(currentSourcebooks: Sourcebook[], action: ReducerAction<Sourcebook>) {
		let newHomebrew: Sourcebook[];
		switch (action.type) {
			case ReducerActionKind.UPDATE: {
				const sourcebook = action.payload;
				const copy = Utils.copy(currentSourcebooks);
				if (currentSourcebooks.some(sb => sb.id === sourcebook.id)) {
					const list = copy.map(sb => sb.id === sourcebook.id ? sourcebook : sb);
					newHomebrew = list;
				} else {
					copy.push(sourcebook);
					Collections.sort(copy, h => h.name);
					newHomebrew = copy;
				}
				return newHomebrew;
			}
			case ReducerActionKind.DELETE: {
				const sourcebook = action.payload;
				const newHeroes = Utils.copy(currentSourcebooks.filter(sb => sb.id !== sourcebook.id));
				return newHeroes;
			}
			default: {
				throw Error(`Unknown or unsupported action: ${action.type}`);
			}
		}
	}

	return (
		<DataManagerContext value={dataManager}>
			<OptionsContext value={options}>
				<SessionContext value={session}>
					<HiddenSourcebookIDsContext value={hiddenSourcebookIDs}>
						<HomebrewSourcebooksContext value={sourcebooks}>
							<BuiltInSourcebooksContext value={builtInSourcebooks}>
								<SourcebooksContext value={allSourcebooks}>
									<HeroesContext value={heroes}>
										{props.children}
									</HeroesContext>
								</SourcebooksContext>
							</BuiltInSourcebooksContext>
						</HomebrewSourcebooksContext>
					</HiddenSourcebookIDsContext>
				</SessionContext>
			</OptionsContext>
		</DataManagerContext>
	);
}

export const DataManagerContext = createContext<DataManager | null>(null);

export function useDataManager() {
	const context = useContext(DataManagerContext);
	if (!context) {
		throw new Error('useDataManager may only be used within <DataManagerContext>');
	}
	return context;
}

export function useOptions() {
	const context = useContext(OptionsContext);
	if (!context) {
		throw new Error('useOptions may only be used within <OptionsContext>');
	}
	return context;
}

export function useSession() {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error('useSession may only be used within <SessionContext>');
	}
	return context;
}

export function useHiddenSourcebookIDs() {
	const context = useContext(HiddenSourcebookIDsContext);
	if (!context) {
		throw new Error('useHiddenSourcebookIDs may only be used within <HiddenSourcebookIDsContext>');
	}
	return context;
}

export function useHeroes() {
	const context = useContext(HeroesContext);
	if (!context) {
		throw new Error('useHeroes may only be used within <HeroesContext>');
	}
	return context;
}

export function useHomebrewSourcebooks() {
	const context = useContext(HomebrewSourcebooksContext);
	if (!context) {
		throw new Error('useHomebrewSourcebooks may only be used within <HomebrewSourcebooksContext>');
	}
	return context;
}

// The built-in sourcebooks only - for the few places that deliberately exclude homebrew.
export function useBuiltInSourcebooks() {
	const context = useContext(BuiltInSourcebooksContext);
	if (!context) {
		throw new Error('useBuiltInSourcebooks may only be used within <BuiltInSourcebooksContext>');
	}
	return context;
}

// Every sourcebook the app knows about: built-in plus homebrew.
export function useSourcebooks() {
	const context = useContext(SourcebooksContext);
	if (!context) {
		throw new Error('useSourcebooks may only be used within <SourcebooksContext>');
	}
	return context;
}
