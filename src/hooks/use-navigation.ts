import { HeroEditTab } from '../models/hero';
import { PlaybookElementKind } from '../models/playbook';
import { SourcebookElementKind } from '../models/sourcebook';
import { useNavigate } from 'react-router';

export const useNavigation = () => {
	const navigate = useNavigate();

	return {
		goToWelcome: () => {
			return navigate('/');
		},
		goToHeroList: (folder?: string) => {
			if (folder) {
				return navigate(`/hero/${folder}`);
			}
			return navigate('/hero');
		},
		goToHeroView: (heroID: string) => {
			return navigate(`/hero/view/${heroID}`);
		},
		goToHeroEdit: (heroID: string, page: HeroEditTab) => {
			return navigate(`/hero/edit/${heroID}/${page}`);
		},
		goToLibrary: (kind: SourcebookElementKind, elementID?: string) => {
			if (elementID) {
				return navigate(`/library/${kind}/${elementID}`);
			}
			return navigate(`/library/${kind}`);
		},
		goToLibraryEdit: (kind: SourcebookElementKind, sourcebookID: string, elementID: string, subElementID?: string) => {
			if (subElementID) {
				return navigate(`/library/edit/${kind}/${sourcebookID}/${elementID}/${subElementID}`);
			}
			return navigate(`/library/edit/${kind}/${sourcebookID}/${elementID}`);
		},
		goToPlaybook: (kind: PlaybookElementKind, elementID?: string) => {
			if (elementID) {
				return navigate(`/playbook/${kind}/${elementID}`);
			}
			return navigate(`/playbook/${kind}`);
		},
		goToPlaybookEdit: (kind: PlaybookElementKind, elementID: string) => {
			return navigate(`/playbook/edit/${kind}/${elementID}`);
		},
		goToSession: () => {
			return navigate('/session/director');
		},
		goToPlayerView: () => {
			return navigate('/session/player');
		}
	};
};
