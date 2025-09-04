import { CharacterSheet } from '../../../../models/character-sheet';
import { LabeledTextField } from '../components/labeled-field';
import { Options } from '../../../../models/options';

import './hero-header-card.scss';

import pbds from '../../../../assets/powered-by-draw-steel.png';

interface Props {
	character: CharacterSheet;
	options: Options;
}

export const HeroHeaderCard = (props: Props) => {
	const character = props.character;
	const showState = props.options.includePlayState;

	const currentVictories = (showState && character.currentVictories) || 0;
	return (
		<div className='hero-header card'>
			<div className='header-image'>
				<img src={pbds} />
			</div>
			<section className='hero-overview container'>
				<LabeledTextField
					label='Character Name'
					content={character.name}
					additionalClasses={[ 'name', 'no-box', 'text-left' ]}
				/>
				<LabeledTextField
					label='Ancestry'
					content={character.ancestryName}
					additionalClasses={[ 'no-box', 'text-left' ]}
				/>
				<LabeledTextField
					label='Career'
					content={character.career?.name || ''}
					additionalClasses={[ 'no-box', 'text-left' ]}
				/>
				<LabeledTextField
					label='Class'
					content={character.className}
					additionalClasses={[ 'no-box', 'text-left' ]}
				/>
				<LabeledTextField
					label={character.subclassTypeName ? `Subclass (${character.subclassTypeName})` : 'Subclass'}
					content={character.subclassName}
					additionalClasses={[ 'no-box', 'text-left' ]}
				/>
			</section>
			<section className='hero-advancement container'>
				<div className='victories-level'>
					<div className='victories'>
						<h3>Victories:</h3>
						<div className='victories-boxes'>
							<ol>
								{[ ...Array(15) ].map((_o, i) => {
									return <li key={i}>{currentVictories >= i + 1 ? '◼' : <>&nbsp;</>}</li>;
								})}
							</ol>
						</div>
					</div>
					<LabeledTextField
						label='Level'
						content={character.level}
						additionalClasses={[ 'level', 'label-above', 'no-box' ]}
					/>
				</div>
				<LabeledTextField
					label='Wealth'
					content={character.wealth}
					additionalClasses={[ 'label-above', 'box-both' ]}
				/>
				<LabeledTextField
					label='Renown'
					content={character.renown}
					additionalClasses={[ 'label-above', 'box-both' ]}
				/>
				<LabeledTextField
					label='XP / Epic'
					content={character.xp}
					additionalClasses={[ 'label-above', 'box-both' ]}
				/>
			</section>
		</div>
	);
};
