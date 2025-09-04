import { Fragment, JSX } from 'react';

import { CharacterSheet } from '../../../../models/character-sheet';
import { CharacterSheetFormatter } from '../../../../utils/character-sheet-formatter';
import { Feature } from '../../../../models/feature';
import { FeatureComponent } from '../components/feature-component';

import './feature-reference-card.scss';

interface Props {
	character: CharacterSheet;
	columns?: boolean;
}

export const FeatureReferenceCard = (props: Props) => {
	const character = props.character;

	const columns = props.columns || false;

	const cardClasses = [ 'feature-reference', 'card' ];
	if (columns) {
		cardClasses.push('wide');
	}

	const getFeatureSections = () => {
		if (character.featuresReferenceOther) {
			const bySource = character.featuresReferenceOther.reduce((m, f) => {
				const sourceFeatures = m.get(f.source) || [];
				sourceFeatures.push(f.feature);
				m.set(f.source, sourceFeatures);
				return m;
			}, new Map<string, Feature[]>());

			const containerClasses = [ 'features-container' ];
			if (columns) {
				containerClasses.push('two-column');
			}

			const sections: JSX.Element[] = [];
			bySource.forEach((features, source) => {
				features.sort(CharacterSheetFormatter.sortFeatures);
				sections.push(
					<Fragment key={source}>
						<li><h3>{source}</h3></li>
						{features.map(f =>
							<li key={f.id}>
								<FeatureComponent
									feature={CharacterSheetFormatter.enhanceFeature(f)}
									hero={character.hero}
								/>
							</li>
						)}
					</Fragment>
				);
			});

			return (
				<ul className={containerClasses.join(' ')}>
					{sections}
				</ul>
			);

			// bySource.forEach((features, source) => {
			// 	features.sort(CharacterSheetFormatter.sortFeatures);
			// 	sections.push(
			// 		<Fragment key={source}>
			// 			<h3>{source}</h3>
			// 			<ul className={containerClasses.join(' ')}>
			// 				{features.map(f =>
			// 					<li key={f.id}>
			// 						<FeatureComponent
			// 							feature={CharacterSheetFormatter.enhanceFeature(f)}
			// 							hero={character.hero}
			// 						/>
			// 					</li>
			// 				)}
			// 			</ul>
			// 		</Fragment>
			// 	);
			// });
			// return sections;
		}
	};

	return (
		<div className={cardClasses.join(' ')}>
			<h2>Other Features & Reference</h2>
			{getFeatureSections()}
		</div>
	);
};
