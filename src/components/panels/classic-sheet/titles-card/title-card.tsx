import { Hero } from '@/models/hero';
import { Title } from '@/models/title';
import { TitleComponent } from '@/components/panels/classic-sheet/components/title-component';

import './titles-card.scss';

interface Props {
	title: Title;
	hero: Hero;
}

export const TitleCard = (props: Props) => {
	const title = props.title;
	return (
		<div className='title card'>
			<section className='bordered'>
				<h3>Title</h3>
				<TitleComponent title={title} hero={props.hero} />
			</section>
		</div>
	);
};
