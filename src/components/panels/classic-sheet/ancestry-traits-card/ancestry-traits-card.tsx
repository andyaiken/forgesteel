import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { JSX } from 'react';

import './ancestry-traits-card.scss';

interface Props {
	character: HeroSheet;
}

export const AncestryTraitsCard = (props: Props) => {
	const character = props.character;

	const getTraits = () => {
		const results: JSX.Element[] = [];

		character.ancestryTraits?.forEach(f => {
			results.push(
				<FeatureComponent
					key={f.id}
					feature={f}
					hero={character.hero}
				/>
			);
		});
		const shownIds = character.ancestryTraits?.map(f => f.id);
		if (character.featuresReferenceOther?.find(r => (r.source === character.ancestryName) && !(shownIds?.includes(r.feature.id)))) {
			results.push(
				<li key='more'><em>Remaining traits in Reference…</em></li>
			);
		}
		return results;
	};

	return (
		<div className='ancestry-traits card'>
			<h2>Ancestry Traits</h2>
			<div className='features-container'>
				{getTraits()}
			</div>
		</div>
	);
};
