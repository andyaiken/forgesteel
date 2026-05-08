import { ActionDispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { DataService } from '@/services/data-service';
import { Options } from '@/models/options';

export const OptionsContext = createContext<Options | null>(null);
export const OptionsDispatchContext = createContext<ActionDispatch<[OptionsAction]>>(() => {});

interface OptionsProps {
	initialOptions: Options,
	dataService: DataService
}

export enum OptionsActionKind {
	UPDATE = 'Update'
}

interface OptionsAction {
	type: OptionsActionKind,
	payload: Options
}

export function OptionsProvider(props: PropsWithChildren<OptionsProps>) {
	const [ options, dispatch ] = useReducer(OptionsReducer, props.initialOptions);

	function OptionsReducer(options: Options, action: OptionsAction) {
		switch (action.type) {
			case 'Update': {
				return action.payload;
			}
		}
		return options;
	}

	return (
		<OptionsContext value={options}>
			<OptionsDispatchContext value={dispatch}>
				{props.children}
			</OptionsDispatchContext>
		</OptionsContext>
	);
}

export function useOptions() {
	const optionsContext = useContext(OptionsContext);

	if (!optionsContext) {
		throw new Error('useOptions may only be used within <OptionsContext>');
	}

	return optionsContext;
}

export function useOptionsDispatch() {
	const optionsDispatchContext = useContext(OptionsDispatchContext);

	if (!optionsDispatchContext) {
		throw new Error('useOptionsDispatch may only be used within <OptionsDispatchContext>');
	}

	return optionsDispatchContext;
}
