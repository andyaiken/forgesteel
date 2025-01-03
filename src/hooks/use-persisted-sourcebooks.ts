import type { Element } from '../models/element';
import type { Sourcebook } from '../models/sourcebook';
import { SourcebookData } from '../data/sourcebook-data';
import type { SourcebookElementKind } from '../models/sourcebook-element-kind';
import type { SourcebookElementsKey } from '../models/sourcebook-elements-key';
import { getSourcebookKey } from '../utils/get-sourcebook-key';
import { useMemo } from 'react';
import { usePersistedValue } from './use-persisted-value';

export const usePersistedSourcebooks = () => {
	const [ persistedSourcebooks, persistHomebrewSourcebooks ] = usePersistedValue<Sourcebook[]>('forgesteel-homebrew-settings', []);
	const [ hiddenSourcebookIds, persistHiddenSourcebookIds ] = usePersistedValue<string[]>('forgesteel-hidden-setting-ids', []);

	const homebrewSourcebooks = useMemo(
		() => persistedSourcebooks.map(s => {
			const copy: Sourcebook = { ...s };

			if (copy.domains === undefined) {
				copy.domains = [];
			}
			if (copy.items === undefined) {
				copy.items = [];
			}
			if (copy.perks === undefined) {
				copy.perks = [];
			}
			if (copy.titles === undefined) {
				copy.titles = [];
			}
			if (copy.monsterGroups === undefined) {
				copy.monsterGroups = [];
			}

			return copy;
		}),
		[ persistedSourcebooks ]
	);

	const sourcebooks = useMemo(() => [
		SourcebookData.core,
		SourcebookData.orden,
		...homebrewSourcebooks
	], [ homebrewSourcebooks ]);

	const deleteSourcebookElement = async (kind: SourcebookElementKind, elementId: string) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		const sourcebookKey = getSourcebookKey(kind);
		copy.forEach((cs: Record<SourcebookElementsKey, Element[]>) => {
			cs[sourcebookKey] = cs[sourcebookKey].filter(x => x.id !== elementId);
		});
		await persistHomebrewSourcebooks(copy);
	};

	return {
		sourcebooks,
		homebrewSourcebooks,
		hiddenSourcebookIds,
		persistHomebrewSourcebooks,
		persistHiddenSourcebookIds,
		deleteSourcebookElement
	};
};
