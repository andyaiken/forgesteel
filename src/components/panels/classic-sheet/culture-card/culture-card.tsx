import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';

import './culture-card.scss';

interface Props {
	character: HeroSheet;
}

export const CultureCard = (props: Props) => {
	const character = props.character;

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
			{/* <LabeledTextField
				label='Culture Name'
				content={character.culture?.name}
				additionalClasses={[ 'name', 'label-overlay' ]}
			/> */}

			<section className='name bordered'>
				<h3>Culture Name</h3>
				<div className='content'>
					{character.culture?.name}
				</div>
			</section>
			<section className='culture-language bordered'>
				<h3>Culture Language</h3>
				{
					character.culture?.language ?
						<FeatureComponent
							feature={character.culture?.language}
							hero={character.hero}
						/>
						: null
				}
			</section>
			<div className='culture-edge'>
				<p>
					You gain an edge on tests made to recall lore about your culture,
					and on tests made to influence and interact with people of your culture.
				</p>
			</div>
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
			<section className='bordered languages'>
				<h3>Languages</h3>
				<ul>
					{getLanguages()}
				</ul>
			</section>
		</div>
	);
};
