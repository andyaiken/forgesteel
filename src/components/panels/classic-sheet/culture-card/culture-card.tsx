import { Feature } from '@/models/feature';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import './culture-card.scss';

interface Props {
	character: HeroSheet;
}

export const CultureCard = (props: Props) => {
	const character = props.character;

	const getFeatures = () => {
		let results: Feature[] = [];
		if (character.cultureFeatures) {
			results = character.cultureFeatures.filter(f => f.id !== character.culture?.environment?.id)
				.filter(f => f.id !== character.culture?.organization?.id)
				.filter(f => f.id !== character.culture?.upbringing?.id);
		}
		return results;
	};

	const getLanguages = () => {
		return character.languages?.map(l => {
			let lang = <li key={l}>{l}</li>;
			if (l.includes('I Speak')) {
				lang = <li key={l}><em>{l}</em></li>;
			}
			return lang;
		});
	};

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
					{getFeatures().map(f => (
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
					{getLanguages()}
				</ul>
			</section>
		</div>
	);
};
