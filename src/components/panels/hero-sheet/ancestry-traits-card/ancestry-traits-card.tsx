import { CharacterSheet } from '../../../../models/character-sheet';
import { CharacterSheetFormatter } from '../../../../utils/character-sheet-formatter';
import { FeatureComponent } from '../components/feature-component';
import './ancestry-traits-card.scss';

interface Props {
	character: CharacterSheet;
}

export const AncestryTraitsCard = (props: Props) => {
	const character = props.character;

	const getTraits = () => {
		let traits = character.ancestryTraits || [];
		const numLines = traits.reduce((n, f) => {
			const lines = CharacterSheetFormatter.countLines(f.description, 40);
			return n + 1 + lines;
		}, 0);

		if (numLines > 26) {
			traits = traits.map(f => {
				if (f.description.includes('…')) {
					f.description = '*See Reference for details…*';
				}
				return f;
			});
		}

		return traits.map(f =>
			<li key={f.id}>
				<FeatureComponent
					feature={f}
					hero={character.hero}
				/>
			</li>
		);
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
