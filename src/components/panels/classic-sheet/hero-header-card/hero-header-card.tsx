import { HeaderImage } from '@/components/panels/classic-sheet/header-image/header-image';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { HeroSheetValue } from '@/enums/hero-sheet-value';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { useOptions } from '@/contexts/data-context';

import './hero-header-card.scss';

interface Props {
	character: HeroSheet;
}

export const HeroHeaderCard = (props: Props) => {
	const character = props.character;
	const options = useOptions();
	const showState = options.includePlayState;

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
					label='Class'
					content={character.className}
					additionalClasses={[ 'no-box', 'text-left' ]}
				/>
				<LabeledTextField
					label='Career'
					content={character.career?.name || ''}
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
									return <li key={`victories-marker-box-${i}`}>{currentVictories >= i + 1 ? '◼' : <>&nbsp;</>}</li>;
								})}
							</ol>
						</div>
					</div>
					<LabeledTextField
						label='Level'
						content={options.hiddenHeroSheetValues.includes(HeroSheetValue.Level) ? '' : character.level}
						additionalClasses={[ 'level', 'label-above', 'no-box' ]}
					/>
				</div>
				<LabeledTextField
					label='Wealth'
					content={options.hiddenHeroSheetValues.includes(HeroSheetValue.Wealth) ? '' : character.wealth}
					additionalClasses={[ 'label-above', 'box-both' ]}
				/>
				<LabeledTextField
					label='Renown'
					content={options.hiddenHeroSheetValues.includes(HeroSheetValue.Renown) ? '' : character.renown}
					additionalClasses={[ 'label-above', 'box-both' ]}
				/>
				<LabeledTextField
					label={character.level === 10 ? 'Epic' : 'XP'}
					content={options.hiddenHeroSheetValues.includes(HeroSheetValue.XP) ? '' : character.xp}
					additionalClasses={[ 'xp', 'label-above', 'box-both' ]}
				/>
			</section>
		</div>
	);
};
