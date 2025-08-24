import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';

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
	return (
		<div className={classes.join(' ')}>
			<h2>Other Features & Reference</h2>
			<ul className='features-container'>
				{character.featuresReferenceOther?.map(f =>
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
