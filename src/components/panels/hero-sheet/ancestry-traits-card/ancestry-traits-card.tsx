import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import './ancestry-traits-card.scss';

interface Props {
	character: CharacterSheet;
}

export const AncestryTraitsCard = (props: Props) => {
	const character = props.character;
	return (
		<div className='ancestry-traits card'>
			<h2>Ancestry Traits</h2>
			<ul className='features-container'>
				{character.ancestryTraits?.map(f =>
					<li key={f.id}>
						<FeatureComponent
							feature={f}
							hero={character.hero}
						/>
					</li>
				)}
			</ul>
		</div>
	);
};
