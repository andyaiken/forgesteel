import { useHiddenElementIDs, useHiddenSourcebookIDs, useHomebrewSourcebooks } from '@/contexts/data-context';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { VisibilityLogic } from '@/logic/visibility-logic';

export const useVisibleSourcebooks = (sourcebooks?: Sourcebook[]) => {
	const homebrewSourcebooks = useHomebrewSourcebooks();
	const hiddenSourcebookIDs = useHiddenSourcebookIDs();
	const hiddenElementIDs = useHiddenElementIDs();
	const allSourcebooks = sourcebooks ?? SourcebookLogic.getSourcebooks(homebrewSourcebooks);

	return VisibilityLogic.getVisibleSourcebooks(allSourcebooks, hiddenSourcebookIDs, hiddenElementIDs);
};
