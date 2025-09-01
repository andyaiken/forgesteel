import { CharacterSheet } from '../../../../models/character-sheet';
import { TitleComponent } from '../components/title-component';
import './titles-card.scss';

interface Props {
	character: CharacterSheet;
}

export const TitlesCard = (props: Props) => {
	const character = props.character;
	return (
		<div className='titles card'>
			<h2>Titles</h2>
			<ul className='titles-container'>
				{character.titles?.map(t =>
					<li key={t.id}>
						<TitleComponent
							title={t}
							hero={character.hero}
						/>
					</li>
				)}
			</ul>
		</div>
	);
};
