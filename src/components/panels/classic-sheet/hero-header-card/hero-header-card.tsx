import { HeaderImage } from '@/components/panels/classic-sheet/header-image/header-image';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { Options } from '@/models/options';

import './hero-header-card.scss';

interface Props {
	character: HeroSheet;
	options: Options;
}

export const HeroHeaderCard = (props: Props) => {
	const character = props.character;
	const showState = props.options.includePlayState;

	const currentVictories = (showState && character.currentVictories) || 0;
	return (
		<div className='hero-header card'>
			<HeaderImage />
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
