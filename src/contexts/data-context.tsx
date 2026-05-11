import { ActionDispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { Analytics } from '@/utils/analytics';
import { Collections } from '@/utils/collections';
import { DataService } from '@/services/data-service';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Session } from '@/models/session';
import { Utils } from '@/utils/utils';

interface DataManagerDispatchers {
	options: ActionDispatch<[ReducerAction<Options>]>;
	session: ActionDispatch<[ReducerAction<Session>]>;
	hiddenSourcebooks: ActionDispatch<[ReducerAction<string[]>]>;
	hero: ActionDispatch<[ReducerAction<Hero>]>;
}

export class DataManager {
	private readonly dataService: DataService;
	private readonly optionsDispatch: ActionDispatch<[ReducerAction<Options>]>;
	private readonly sessionDispatch: ActionDispatch<[ReducerAction<Session>]>;
	private readonly hiddenSourcebooksDispatch:	ActionDispatch<[ReducerAction<string[]>]>;
	private readonly heroDispatch: ActionDispatch<[ReducerAction<Hero>]>;

	constructor(service: DataService, dispatchers: DataManagerDispatchers) {
		this.dataService = service;
		this.optionsDispatch = dispatchers.options;
		this.sessionDispatch = dispatchers.session;
		this.hiddenSourcebooksDispatch = dispatchers.hiddenSourcebooks;
		this.heroDispatch = dispatchers.hero;
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
}

export const OptionsContext = createContext<Options | null>(null);
export const HiddenSourcebookIDsContext = createContext<string[] | null>(null);
export const SessionContext = createContext<Session | null>(null);
export const HeroesContext = createContext<Hero[] | null>(null);

export function DataManagerProvider(props: PropsWithChildren<DataManagerProps>) {
	const dataService = props.dataService;

	const [ options, optionsDispatch ] = useReducer(UpdateOnlyReducer<Options>, props.initialOptions);
	const [ session, sessionDispatch ] = useReducer(UpdateOnlyReducer<Session>, props.initialSession);
	const [ hiddenSourcebookIDs, hiddenSourcebookIDsDispatch ] = useReducer(UpdateOnlyReducer<string[]>, props.initialHiddenSourcebookIDs);
	const [ heroes, heroDispatch ] = useReducer(HeroesReducer, props.initialHeroes);

	const dataManager = new DataManager(dataService, {
		options: optionsDispatch,
		session: sessionDispatch,
		hiddenSourcebooks: hiddenSourcebookIDsDispatch,
		hero: heroDispatch
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

	return (
		<DataManagerContext value={dataManager}>
			<OptionsContext value={options}>
				<SessionContext value={session}>
					<HiddenSourcebookIDsContext value={hiddenSourcebookIDs}>
						<HeroesContext value={heroes}>
							{props.children}
						</HeroesContext>
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
