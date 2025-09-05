import { HeroSheet } from '../../../../models/classic-sheets/hero-sheet';
import { LabeledTextField } from '../components/labeled-field';
import './potencies-card.scss';

interface Props {
	character: HeroSheet;
}

export const PotenciesCard = (props: Props) => {
	const character = props.character;
	return (
		<div className='potencies card'>
			<h3>Potencies</h3>
			<LabeledTextField
				label='Strong'
				content={character.potencyStrong}
				additionalClasses={[ 'label-above', 'box-both' ]}
			/>
			<LabeledTextField
				label='Average'
				content={character.potencyAverage}
				additionalClasses={[ 'label-above', 'box-both' ]}
			/>
			<LabeledTextField
				label='Weak'
				content={character.potencyWeak}
				additionalClasses={[ 'label-above', 'box-both' ]}
			/>
		</div>
	);
};
