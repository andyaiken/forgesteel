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
		goToHeroEdit: (heroID: string, tab: string) => {
			return navigate(`/hero/edit/${heroID}/${tab}`);
		},
		goToLibraryList: (kind: SourcebookElementKind) => {
			return navigate(`/library/${kind}`);
		},
		goToLibraryView: (kind: SourcebookElementKind, elementID: string) => {
			return navigate(`/library/view/${kind}/${elementID}`);
		},
		goToLibraryEdit: (kind: SourcebookElementKind, sourcebookID: string, elementID: string, subElementID?: string) => {
			if (subElementID) {
				return navigate(`/library/edit/${kind}/${sourcebookID}/${elementID}/${subElementID}`);
			}
			return navigate(`/library/edit/${kind}/${sourcebookID}/${elementID}`);
		},
		goToEncounterList: () => {
			return navigate('/encounter');
		},
		goToEncounterEdit: (encounterID: string) => {
			return navigate(`/encounter/edit/${encounterID}`);
		}
	};
};
