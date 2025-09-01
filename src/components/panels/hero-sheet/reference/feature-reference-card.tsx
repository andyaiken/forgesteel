import { Fragment, JSX } from 'react';

import { CharacterSheet } from '../../../../models/character-sheet';
import { CharacterSheetFormatter } from '../../../../utils/character-sheet-formatter';
import { Feature } from '../../../../models/feature';
import { FeatureComponent } from '../components/feature-component';

import './feature-reference-card.scss';

interface Props {
	character: CharacterSheet;
	classes?: string | string[];
}

export const FeatureReferenceCard = (props: Props) => {
	const character = props.character;

	let classes = [ 'feature-reference', 'card' ];
	if (props.classes) {
		const additionalClasses = (typeof props.classes === 'string') ? [ props.classes ] : props.classes;
		classes = classes.concat(additionalClasses);
	}

	const getFeatureSections = () => {
		if (character.featuresReferenceOther) {
			const bySource = character.featuresReferenceOther.reduce((m, f) => {
				const sourceFeatures = m.get(f.source) || [];
				sourceFeatures.push(f.feature);
				m.set(f.source, sourceFeatures);
				return m;
			}, new Map<string, Feature[]>());

			const sections: JSX.Element[] = [];
			bySource.forEach((features, source) => {
				features.sort(CharacterSheetFormatter.sortFeatures);
				sections.push(
					<Fragment key={source}>
						<h3>{source}</h3>
						<ul className='features-container'>
							{features.map(f =>
								<li key={f.id}>
									<FeatureComponent
										feature={CharacterSheetFormatter.enhanceFeature(f)}
										hero={character.hero}
									/>
								</li>
							)}
						</ul>
					</Fragment>
				);
			});
			return sections;
		}
	};

	return (
		<div className={classes.join(' ')}>
			<h2>Other Features & Reference</h2>
			{getFeatureSections()}
		</div>
	);
};
