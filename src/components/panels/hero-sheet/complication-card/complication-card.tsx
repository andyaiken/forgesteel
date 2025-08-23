import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import '../career-card/career-card.scss';

interface Props {
	character: CharacterSheet;
}

export const ComplicationCard = (props: Props) => {
	const character = props.character;
	return (
		<div className='complication card'>
			<h2>Complication</h2>
			<div className='name'>{character.complicationName}</div>
			<section className='bordered'>
				<h3>Benefit</h3>
				{character.complicationBenefits?.map(f =>
					<FeatureComponent
						feature={f}
						hero={character.hero}
						key={f.id}
					/>
				)}
			</section>
			<section className='bordered'>
				<h3>Drawback</h3>
				{character.complicationDrawbacks?.map(f =>
					<FeatureComponent
						feature={f}
						hero={character.hero}
						key={f.id}
					/>
				)}
			</section>
		</div>
	);
};
