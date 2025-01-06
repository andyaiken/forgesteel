import type { SourcebookElementKind } from '../models/sourcebook-element-kind';
import { useNavigate } from 'react-router';

export const useNavigation = () => {
	const navigate = useNavigate();

	return {
		goToWelcome: () => {
			return navigate('/');
		},
		goToHeroList: () => {
			return navigate('/hero');
		},
		goToHeroView: (heroId: string) => {
			return navigate(`/hero/view/${heroId}`);
		},
		goToHeroEdit: (heroId: string, tab?: string) => {
			return navigate(`/hero/edit/${heroId}${tab ? `/${tab}` : ''}`);
		},
		goToLibraryList: (tab?: SourcebookElementKind) => {
			return navigate(`/library${tab ? `/${tab}` : ''}`);
		},
		goToLibraryEdit: (sourcebookId: string, kind: SourcebookElementKind, elementId: string) => {
			return navigate(`/library/edit/${sourcebookId}/${kind}/${elementId}`);
		},
		goToEncounterList: () => {
			return navigate('/encounter');
		},
		goToEncounterEdit: (encounterId: string) => {
			return navigate(`/encounter/edit/${encounterId}`);
		}
	};
};
