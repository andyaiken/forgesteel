import type { SourcebookElementKind } from '../models/sourcebook-element-kind';
import { useNavigate } from 'react-router';

export const useNavigation = () => {
	const rootRoute = '/forgesteel';
	const navigate = useNavigate();
	return {
		rootRoute,
		goToWelcome() {
			return navigate(rootRoute);
		},
		goToHeroList() {
			return navigate(`${rootRoute}/hero/list`);
		},
		goToHeroView(heroId: string) {
			return navigate(`${rootRoute}/hero/view/${heroId}`);
		},
		goToHeroEdit(heroId: string, tab?: string) {
			return navigate(`${rootRoute}/hero/edit/${heroId}${tab ? `/${tab}` : ''}`);
		},
		goToLibraryList(tab?: SourcebookElementKind) {
			return navigate(`${rootRoute}/library/list${tab ? `/${tab}` : ''}`);
		},
		goToLibraryEdit(sourcebookId: string, kind: SourcebookElementKind, elementId: string) {
			return navigate(`${rootRoute}/library/edit/${sourcebookId}/${kind}/${elementId}`);
		},
		goToEncounterList() {
			return navigate(`${rootRoute}/encounter/list`);
		},
		goToEncounterEdit(encounterId: string) {
			return navigate(`${rootRoute}/encounter/edit/${encounterId}`);
		}
	};
};
