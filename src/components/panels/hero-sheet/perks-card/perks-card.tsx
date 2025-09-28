import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import './perks-card.scss';

interface Props {
	character: CharacterSheet;
}

export const PerksCard = (props: Props) => {
	const character = props.character;

	let moreInRef;
	if (character.featuresReferenceOther?.find(r => r.source === 'Perks')) {
		moreInRef = (<li key='more'><em>Remaining perks in Reference…</em></li>);
	}
	return (
		<div className='perks card'>
			<h2>Perks</h2>
			<ul className='features-container two-column'>
				{character.perks?.map(f =>
					<li key={f.id}>
						<FeatureComponent
							feature={f}
							hero={character.hero}
						/>
					</li>
				)}
				{moreInRef}
			</ul>
		</div>
	);
};
