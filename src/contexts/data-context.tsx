import { ActionDispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { DataService } from '@/services/data-service';
import { Options } from '@/models/options';

export enum OptionsActionKind {
	UPDATE = 'Update'
}

interface OptionsAction {
	type: OptionsActionKind;
	payload: Options;
}

export enum HiddenSourcebookIDsActionKind {
	UPDATE = 'Update'
}

interface HiddenSourcebookIDsAction {
	type: HiddenSourcebookIDsActionKind;
	payload: string[];
}

export class DataManager {
	private readonly dataService: DataService;
	private readonly optionsDispatch: ActionDispatch<[OptionsAction]>;
	private readonly hiddenSourcebooksDispatch: ActionDispatch<[HiddenSourcebookIDsAction]>;

	constructor(service: DataService,
		optionsDispatch: ActionDispatch<[OptionsAction]>,
		hiddenSourcebooksDispatch: ActionDispatch<[HiddenSourcebookIDsAction]>) {
		this.dataService = service;
		this.optionsDispatch = optionsDispatch;
		this.hiddenSourcebooksDispatch = hiddenSourcebooksDispatch;
	};

	saveOptions(options: Options) {
		this.dataService.saveOptions(options)
			.then(options => {
				this.optionsDispatch({
					type: OptionsActionKind.UPDATE,
					payload: options
				});
			});
	}

	saveHiddenSourcebookIDs(hiddenSourcebookIDs: string[]) {
		this.dataService.saveHiddenSourcebookIDs(hiddenSourcebookIDs)
			.then(ids => {
				this.hiddenSourcebooksDispatch({
					type: HiddenSourcebookIDsActionKind.UPDATE,
					payload: ids
				});
			});
	}
}

export const OptionsContext = createContext<Options | null>(null);
export const HiddenSourcebookIDsContext = createContext<string[] | null>(null);

interface DataManagerProps {
	dataService: DataService;
	initialOptions: Options;
	initialHiddenSourcebookIDs: string[];
}

export function DataManagerProvider(props: PropsWithChildren<DataManagerProps>) {
	const dataService = props.dataService;

	const [ options, optionsDispatch ] = useReducer(OptionsReducer, props.initialOptions);
	const [ hiddenSourcebookIDs, hiddenSourcebookIDsDispatch ] = useReducer(HiddenSourcebookIDsReducer, props.initialHiddenSourcebookIDs);

	const dataManager = new DataManager(dataService, optionsDispatch, hiddenSourcebookIDsDispatch);

	function OptionsReducer(options: Options, action: OptionsAction) {
		switch (action.type) {
			case OptionsActionKind.UPDATE: {
				return action.payload;
			}
		}
		return options;
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
				<HiddenSourcebookIDsContext value={hiddenSourcebookIDs}>
					{props.children}
				</HiddenSourcebookIDsContext>
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
	const optionsContext = useContext(OptionsContext);

	if (!optionsContext) {
		throw new Error('useOptions may only be used within <OptionsContext>');
	}

	return optionsContext;
}

export function useHiddenSourcebookIDs() {
	const context = useContext(HiddenSourcebookIDsContext);

	if (!context) {
		throw new Error('useHiddenSourcebookIDs may only be used within <HiddenSourcebookIDsContext>');
	}

	return context;
}
