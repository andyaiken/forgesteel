import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import { JSX } from 'react';

import './ancestry-traits-card.scss';

interface Props {
	character: CharacterSheet;
}

export const AncestryTraitsCard = (props: Props) => {
	const character = props.character;

	const getTraits = () => {
		const results: JSX.Element[] = [];

		character.ancestryTraits?.forEach(f => {
			results.push(
				<li key={f.id}>
					<FeatureComponent
						feature={f}
						hero={character.hero}
					/>
				</li>
			);
		});
		const shownIds = character.ancestryTraits?.map(f => f.id);
		if (character.featuresReferenceOther?.find(r => (r.source === character.ancestryName) && !(shownIds?.includes(r.feature.id)))) {
			results.push(
				<li><em>More in Reference…</em></li>
			);
		}
		return results;
	};

	return (
		<div className='ancestry-traits card'>
			<h2>Ancestry Traits</h2>
			<ul className='features-container'>
				{getTraits()}
			</ul>
		</div>
	);
};
