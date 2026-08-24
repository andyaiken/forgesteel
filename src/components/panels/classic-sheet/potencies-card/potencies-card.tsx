import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { LabeledTextField } from '@/components/panels/classic-sheet/components/labeled-field';
import './potencies-card.scss';

interface Props {
	character: HeroSheet;
}

export const PotenciesCard = (props: Props) => {
	const character = props.character;
	const resistances = character.potencyResistances || [];
	const allSame = (resistances.length === 5) && resistances.every(r => r.value === resistances[0].value);
	const resistanceText = allSame ?
		`All characteristics +${resistances[0].value}`
		:
		resistances.map(r => `${r.characteristic} +${r.value}`).join(', ');
	return (
		<div className='potencies card'>
			<h3>Potency</h3>
			<LabeledTextField
				label='Weak'
				content={character.potencyWeak}
				additionalClasses={[ 'label-above', 'box-both' ]}
			/>
			<LabeledTextField
				label='Average'
				content={character.potencyAverage}
				additionalClasses={[ 'label-above', 'box-both' ]}
			/>
			<LabeledTextField
				label='Strong'
				content={character.potencyStrong}
				additionalClasses={[ 'label-above', 'box-both' ]}
			/>
			{
				resistances.length > 0 ?
					<div className='potency-resistance'>
						Resisting potencies: <span className='data'>{resistanceText}</span>
					</div>
					: null
			}
		</div>
	);
};
