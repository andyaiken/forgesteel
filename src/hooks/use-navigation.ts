import { SourcebookElementKind } from '../models/sourcebook';
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
		goToHeroView: (heroID: string) => {
			return navigate(`/hero/view/${heroID}`);
		},
		goToHeroEdit: (heroID: string, tab?: string) => {
			return navigate(`/hero/edit/${heroID}${tab ? `/${tab}` : ''}`);
		},
		goToLibraryList: (tab?: SourcebookElementKind) => {
			return navigate(`/library${tab ? `/${tab}` : ''}`);
		},
		goToLibraryEdit: (sourcebookID: string, kind: SourcebookElementKind, elementID: string, subElementID?: string) => {
			if (subElementID) {
				return navigate(`/library/edit/${sourcebookID}/${kind}/${elementID}/${subElementID}`);
			}
			return navigate(`/library/edit/${sourcebookID}/${kind}/${elementID}`);
		},
		goToEncounterList: () => {
			return navigate('/encounter');
		},
		goToEncounterEdit: (encounterID: string) => {
			return navigate(`/encounter/edit/${encounterID}`);
		}
	};
};
