import { CharacterSheet } from '../../../../models/character-sheet';
import { FeatureComponent } from '../components/feature-component';
import './culture-card.scss';

interface Props {
	character: CharacterSheet;
}

export const CultureCard = (props: Props) => {
	const character = props.character;
	return (
		<div className='culture card'>
			<h2>Culture</h2>
			<div className='name'>{character.culture?.name}</div>
			<section className='bordered'>
				<h3>Environment</h3>
				<h4>{character.culture?.environment?.name}</h4>
				{character.culture?.environment ?
					<FeatureComponent
						feature={character.culture?.environment}
						hero={character.hero}
					/>
					: undefined}
			</section>
			<section className='bordered'>
				<h3>Organization</h3>
				<h4>{character.culture?.organization?.name}</h4>
				{character.culture?.organization ?
					<FeatureComponent
						feature={character.culture?.organization}
						hero={character.hero}
					/>
					: undefined}
			</section>
			<section className='bordered'>
				<h3>Upbringing</h3>
				<h4>{character.culture?.upbringing?.name}</h4>
				{character.culture?.upbringing ?
					<FeatureComponent
						feature={character.culture?.upbringing}
						hero={character.hero}
					/>
					: undefined}
			</section>

			<section className='bordered features'>
				<h3>Features</h3>
				<ul>
					{character.cultureFeatures?.map(f => (
						<FeatureComponent
							feature={f}
							hero={character.hero}
							key={f.id}
						/>
					))}
				</ul>
			</section>
			<section className='bordered languages'>
				<h3>Languages</h3>
				<ul>
					{character.languages?.map(l =>
						<li key={l}>{l}</li>
					)}
				</ul>
			</section>
		</div>
	);
};
