import { HeaderImage } from '@/components/panels/classic-sheet/header-image/header-image';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import { Options } from '@/models/options';

import './hero-header-card.scss';
import { useTranslation } from 'react-i18next';

interface Props {
	character: HeroSheet;
	options: Options;
}

export const HeroHeaderCard = (props: Props) => {
	const { t, i18n } = useTranslation([ 'common', 'hero', 'ancestry' ]);
	const character = props.character;
	const showState = props.options.includePlayState;

	const currentVictories = (showState && character.currentVictories) || 0;
	return (
		<div className='hero-header card'>
			<div>
				{i18n.format(t('common:career'), 'capitalize')}
			</div>
			<HeaderImage />
			<section className='hero-overview container'>
				<LabeledTextField
					label={t('hero:characterName')}
					content={character.name}
					additionalClasses={[ 'name', 'no-box', 'text-left' ]}
				/>
				<LabeledTextField
					label={i18n.format(t('common:ancestry'), 'capitalize')}
					content={i18n.format(t(`ancestry:${character.ancestryName}.name_one`), 'capitalize')}
					additionalClasses={[ 'no-box', 'text-left' ]}
				/>
				<LabeledTextField
					label={i18n.format(t('common:class'), 'capitalize')}
					content={i18n.format(t(`class:${character.className}.name_one`), 'capitalize')}
					additionalClasses={[ 'no-box', 'text-left' ]}
				/>
				<LabeledTextField
					label={i18n.format(t('common:career'), 'capitalize')}
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
					label={character.level === 10 ? 'Epic' : 'XP'}
					content={character.xp}
					additionalClasses={[ 'xp', 'label-above', 'box-both' ]}
				/>
			</section>
		</div>
	);
};
