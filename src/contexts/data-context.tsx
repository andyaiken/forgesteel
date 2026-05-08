import { ActionDispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { DataService } from '@/services/data-service';
import { Options } from '@/models/options';

export const OptionsContext = createContext<Options | null>(null);
export const OptionsDispatchContext = createContext<ActionDispatch<[OptionsAction]>>(() => {});

export enum OptionsActionKind {
	UPDATE = 'Update'
}

interface OptionsAction {
	type: OptionsActionKind;
	payload: Options;
}

export class DataManager {
	private readonly dataService: DataService;
	private readonly optionsDispatch: ActionDispatch<[OptionsAction]>;

	constructor(service: DataService,
		optionsDispatch: ActionDispatch<[OptionsAction]>) {
		this.dataService = service;
		this.optionsDispatch = optionsDispatch;
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
}

interface DataManagerProps {
	dataService: DataService;
	initialOptions: Options;
}

export function DataManagerProvider(props: PropsWithChildren<DataManagerProps>) {
	const dataService = props.dataService;

	const [ options, optionsDispatch ] = useReducer(OptionsReducer, props.initialOptions);

	const dataManager = new DataManager(dataService, optionsDispatch);

	function OptionsReducer(options: Options, action: OptionsAction) {
		switch (action.type) {
			case OptionsActionKind.UPDATE: {
				return action.payload;
			}
		}
		return options;
	}

	return (
		<DataManagerContext value={dataManager}>
			<OptionsContext value={options}>
				{props.children}
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
