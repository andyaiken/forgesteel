import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { useOptions } from '@/contexts/data-context';

import './class-features-card.scss';

interface Props {
	character: HeroSheet;
}

export const ClassFeaturesCard = (props: Props) => {
	const character = props.character;
	const options = useOptions();

	let moreInRef;
	if (character.featuresReferenceOther?.find(r => [ character.className, character.subclassName ].includes(r.source))) {
		moreInRef = (<li key='more'><em>Remaining features in Reference…</em></li>);
	}

	return (
		<div className='class-features card'>
			<h2>Class Features</h2>
			<div className={`features-container ${options.pageOrientation === 'portrait' ? 'two-column' : null}`}>
				{character.classFeatures?.map(f =>
					<FeatureComponent
						key={f.id}
						feature={f}
						hero={character.hero}
					/>
				)}
				{moreInRef}
			</div>
		</div>
	);
};
