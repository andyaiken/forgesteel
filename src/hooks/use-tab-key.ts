import { SourcebookElementKind } from '../models/sourcebook';
import { useNavigation } from './use-navigation';
import { useParams } from 'react-router';

export const useTabKey = (): [SourcebookElementKind, (tabKey: SourcebookElementKind) => void] => {
	const navigation = useNavigation();
	const { tab } = useParams<{ tab: SourcebookElementKind }>();

	const setTabKey = (tabKey: SourcebookElementKind) => {
		navigation.goToLibraryList(tabKey);
	};

	return [ tab ?? 'ancestry', setTabKey ];
};
