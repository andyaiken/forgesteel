import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import './class-features-card.scss';

interface Props {
	character: HeroSheet;
}

export const ClassFeaturesCard = (props: Props) => {
	const character = props.character;

	let moreInRef;
	if (character.featuresReferenceOther?.find(r => [ character.className, character.subclassName ].includes(r.source))) {
		moreInRef = (<li key='more'><em>Remaining features in Reference…</em></li>);
	}

	return (
		<div className='class-features card'>
			<h2>Class Features</h2>
			<ul className='features-container two-column'>
				{character.classFeatures?.map(f =>
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
