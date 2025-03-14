import { Hero } from '../../../../models/hero';
import { useParams } from 'react-router';

interface Props {
	heroes: Hero[];
}

export const HeroExportPage = (props: Props) => {
	const { heroID } = useParams<{ heroID: string }>();

	try {
		return JSON.stringify(props.heroes.find(h => h.id === heroID));
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
