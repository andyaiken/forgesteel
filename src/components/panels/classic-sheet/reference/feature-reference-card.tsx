import { Fragment, JSX } from 'react';

import { Feature } from '../../../../models/feature';
import { FeatureComponent } from '../components/feature-component';
import { HeroSheet } from '../../../../models/classic-sheets/hero-sheet';
import { SheetFormatter } from '../../../../logic/classic-sheet/sheet-formatter';

import './feature-reference-card.scss';

interface Props {
	character: HeroSheet;
	columns?: number;
}

export const FeatureReferenceCard = (props: Props) => {
	const character = props.character;

	const columns = props.columns || 1;

	const cardClasses = [ 'feature-reference', 'card' ];
	if (columns > 2) {
		cardClasses.push('extra-wide');
	} else if (columns > 1) {
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
			if (columns === 2) {
				containerClasses.push('two-column');
			} else if (columns === 3) {
				containerClasses.push('three-column');
			}

			const sections: JSX.Element[] = [];
			bySource.forEach((features, source) => {
				features.sort(SheetFormatter.sortFeatures);
				sections.push(
					<Fragment key={source}>
						{features.map((f, i) =>
							<li key={f.id}>
								{
									i === 0 ?
										<h3>{source}</h3>
										: null
								}
								<FeatureComponent
									feature={SheetFormatter.enhanceFeature(f)}
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
		}
	};

	return (
		<div className={cardClasses.join(' ')}>
			<h2>Other Features & Reference</h2>
			{getFeatureSections()}
		</div>
	);
};
