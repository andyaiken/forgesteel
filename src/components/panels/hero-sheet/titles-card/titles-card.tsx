import { CharacterSheet } from '../../../../models/character-sheet';
import { Title } from '../../../../models/title';
import { TitleComponent } from '../components/title-component';
import './titles-card.scss';

interface Props {
	character: CharacterSheet;
	showLong: number | 'all';
	wide?: boolean;
}

export const TitlesCard = (props: Props) => {
	const character = props.character;

	const getTitleFragment = (title: Title, size: 'short' | 'long') => {
		if (size === 'short') {
			return (
				<li key={title.id}>
					<h4>{title.name}</h4>
				</li>
			);
		} else {
			return (
				<li key={title.id}>
					<TitleComponent
						title={title}
						hero={character.hero}
					/>
				</li>
			);
		}
	};

	const numTitles = character.titles?.length || 0;
	const fragmentSize = (props.showLong === 'all' || numTitles <= props.showLong) ? 'long' : 'short';

	const cardClasses = [ 'titles', 'card' ];
	if (props.wide)
		cardClasses.push('wide');

	return (
		<div className={cardClasses.join(' ')}>
			<h2>Titles</h2>
			<ul className='titles-container'>
				{character.titles?.map(t => getTitleFragment(t, fragmentSize))}
			</ul>
		</div>
	);
};
