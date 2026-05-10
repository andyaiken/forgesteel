import { ActionDispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { DataService } from '@/services/data-service';
import { Options } from '@/models/options';
import { Session } from '@/models/session';

export enum OptionsActionKind {
	UPDATE = 'Update'
}

interface OptionsAction {
	type: OptionsActionKind;
	payload: Options;
}

export const OptionsContext = createContext<Options | null>(null);

export enum HiddenSourcebookIDsActionKind {
	UPDATE = 'Update'
}

interface HiddenSourcebookIDsAction {
	type: HiddenSourcebookIDsActionKind;
	payload: string[];
}

export const HiddenSourcebookIDsContext = createContext<string[] | null>(null);

export enum SessionActionKind {
	UPDATE = 'Update'
}

interface SessionAction {
	type: SessionActionKind;
	payload: Session;
}

export const SessionContext = createContext<Session | null>(null);

export class DataManager {
	private readonly dataService: DataService;
	private readonly optionsDispatch: ActionDispatch<[OptionsAction]>;
	private readonly sessionDispatch: ActionDispatch<[SessionAction]>;
	private readonly hiddenSourcebooksDispatch: ActionDispatch<[HiddenSourcebookIDsAction]>;

	constructor(service: DataService,
		optionsDispatch: ActionDispatch<[OptionsAction]>,
		sessionDispatch: ActionDispatch<[SessionAction]>,
		hiddenSourcebooksDispatch: ActionDispatch<[HiddenSourcebookIDsAction]>) {
		this.dataService = service;
		this.optionsDispatch = optionsDispatch;
		this.sessionDispatch = sessionDispatch;
		this.hiddenSourcebooksDispatch = hiddenSourcebooksDispatch;
	};

	async saveOptions(options: Options) {
		return this.dataService.saveOptions(options)
			.then(options => {
				this.optionsDispatch({
					type: OptionsActionKind.UPDATE,
					payload: options
				});
			});
	}

	async saveSession(session: Session) {
		return this.dataService.saveSession(session)
			.then(session => {
				this.sessionDispatch({
					type: SessionActionKind.UPDATE,
					payload: session
				});
			});
	}

	async saveHiddenSourcebookIDs(hiddenSourcebookIDs: string[]) {
		return this.dataService.saveHiddenSourcebookIDs(hiddenSourcebookIDs)
			.then(ids => {
				this.hiddenSourcebooksDispatch({
					type: HiddenSourcebookIDsActionKind.UPDATE,
					payload: ids
				});
			});
	}
}

interface DataManagerProps {
	dataService: DataService;
	initialOptions: Options;
	initiaSession: Session;
	initialHiddenSourcebookIDs: string[];
}

export function DataManagerProvider(props: PropsWithChildren<DataManagerProps>) {
	const dataService = props.dataService;

	const [ options, optionsDispatch ] = useReducer(OptionsReducer, props.initialOptions);
	const [ session, sessionDispatch ] = useReducer(SessionReducer, props.initiaSession);
	const [ hiddenSourcebookIDs, hiddenSourcebookIDsDispatch ] = useReducer(HiddenSourcebookIDsReducer, props.initialHiddenSourcebookIDs);

	const dataManager = new DataManager(dataService,
		optionsDispatch,
		sessionDispatch,
		hiddenSourcebookIDsDispatch);

	function OptionsReducer(options: Options, action: OptionsAction) {
		switch (action.type) {
			case OptionsActionKind.UPDATE: {
				return action.payload;
			}
		}
		return options;
	}

	function SessionReducer(session: Session, action: SessionAction) {
		switch (action.type) {
			case SessionActionKind.UPDATE: {
				return action.payload;
			}
		}
		return session;
	}

	function HiddenSourcebookIDsReducer(hiddenIDs: string[], action: HiddenSourcebookIDsAction) {
		switch (action.type) {
			case HiddenSourcebookIDsActionKind.UPDATE: {
				return action.payload;
			}
		}
		return hiddenIDs;
	}

	return (
		<DataManagerContext value={dataManager}>
			<OptionsContext value={options}>
				<SessionContext value={session}>
					<HiddenSourcebookIDsContext value={hiddenSourcebookIDs}>
						{props.children}
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
