import { ConditionEndType, ConditionType } from '../../../../enums/condition-type';
import { Condition } from '../../../../models/condition';
import { HeroSheet } from '../../../../models/classic-sheets/hero-sheet';
import { LabeledBooleanField } from '../components/labeled-field';
import { Options } from '../../../../models/options';

import './conditions-card.scss';

interface Props {
	character: HeroSheet;
	options: Options;
}

export const ConditionsCard = (props: Props) => {
	const conditionTypes = [
		ConditionType.Bleeding,
		ConditionType.Dazed,
		ConditionType.Frightened,
		ConditionType.Grabbed,
		ConditionType.Prone,
		ConditionType.Restrained,
		ConditionType.Slowed,
		ConditionType.Taunted,
		ConditionType.Weakened
	];

	const character = props.character;
	const showState = props.options.includePlayState;

	const otherConditions: Condition[] = character.conditions?.filter(c => !conditionTypes.includes(c.type)) || [];
	if (!otherConditions.length) {
		otherConditions.push({
			id: 'empty-1',
			type: ConditionType.Custom,
			text: '',
			ends: ConditionEndType.UntilRemoved
		});
	}

	return (
		<div className='conditions card'>
			<h2>Conditions</h2>
			<div className='conditions-table'>
				<div className='header'>
					<div>Condition</div>
					<div>End of Turn</div>
					<div>Save Ends*</div>
				</div>

				{conditionTypes.map(ct => {
					const classes = [ 'condition' ];
					if (character.conditionImmunities?.includes(ct)) {
						classes.push('immune');
					}
					return (
						<div className={classes.join(' ')} key={ct}>
							<div>{ct.toString()}</div>
							<LabeledBooleanField
								value={showState && character.conditions?.find(c => c.type === ct)?.ends === ConditionEndType.EndOfTurn}
								label=''
								additionalClasses={[ 'center', 'no-label' ]}
							/>
							<LabeledBooleanField
								value={showState && character.conditions?.find(c => c.type === ct)?.ends === ConditionEndType.SaveEnds}
								label=''
								additionalClasses={[ 'center', 'no-label' ]}
							/>
						</div>
					);
				})}
				{otherConditions.map(c =>
					<div className='condition' key={c.id}>
						<div>{c.text}</div>
						<LabeledBooleanField
							value={showState && c.ends === ConditionEndType.EndOfTurn}
							label=''
							additionalClasses={[ 'center', 'no-label' ]}
						/>
						<LabeledBooleanField
							value={showState && c.ends === ConditionEndType.SaveEnds}
							label=''
							additionalClasses={[ 'center', 'no-label' ]}
						/>
					</div>
				)}
				{/* always one blank for space */}
				<div className='condition'>
					<div></div>
					<LabeledBooleanField
						value={false}
						label=''
						additionalClasses={[ 'center', 'no-label' ]}
					/>
					<LabeledBooleanField
						value={false}
						label=''
						additionalClasses={[ 'center', 'no-label' ]}
					/>
				</div>
			</div>
			<div className='save-ends-description'>* Save Ends = <span className='save-target'>{character.saveEndsTarget}</span> or higher on 1d10 at the end of your turn removes the effect.</div>
		</div>
	);
};
