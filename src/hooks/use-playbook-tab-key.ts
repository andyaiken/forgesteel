import { PlaybookElementKind } from '../models/playbook';
import { useNavigation } from './use-navigation';
import { useParams } from 'react-router';

export const usePlaybookTabKey = (): [PlaybookElementKind, (tabKey: PlaybookElementKind) => void] => {
	const navigation = useNavigation();
	const { tab } = useParams<{ tab: PlaybookElementKind }>();

	const setTabKey = (tabKey: PlaybookElementKind) => {
		navigation.goToPlaybookList(tabKey);
	};

	return [ tab ?? 'encounter', setTabKey ];
};
