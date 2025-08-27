import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import '../career-card/career-card.scss';

interface Props {
	character: CharacterSheet;
}

export const ComplicationCard = (props: Props) => {
	const character = props.character;

	// Only display the description if either the benefir or drawback section will be empty
	const getDescriptionSection = () => {
		if (character.complicationName?.length && !(character.complicationBenefits?.length && character.complicationDrawbacks?.length)) {
			return (
				<section className='bordered'>
					<h3>Description</h3>
					<p>{character.complicationDescription}</p>
				</section>
			);
		}
	};

	const getBenefitSection = () => {
		if (!character.complicationName?.length || character.complicationBenefits?.length) {
			return (
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
			);
		}
	};

	const getDrawbackSection = () => {
		if (!character.complicationName?.length || character.complicationDrawbacks?.length) {
			return (
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
			);
		}
	};

	return (
		<div className='complication card'>
			<h2>Complication</h2>
			<div className='name'>{character.complicationName}</div>
			{getDescriptionSection()}
			{getBenefitSection()}
			{getDrawbackSection()}
		</div>
	);
};
