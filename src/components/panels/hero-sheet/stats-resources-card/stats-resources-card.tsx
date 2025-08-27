import { LabeledBooleanField, LabeledTextField } from '../components/labeled-field';
import { CharacterSheet } from '../../../../models/character-sheet';
import { Options } from '../../../../models/options';

import './stats-resources-card.scss';

interface Props {
	character: CharacterSheet;
	options: Options;
}

export const StatsResourcesCard = (props: Props) => {
	const character = props.character;
	const showState = props.options.includePlayState;

	return (
		<div className='stats-resources card'>
			<div className='characteristics-measurements'>
				<div className='characteristics'>
					<LabeledTextField
						label='Might'
						content={character.might}
						additionalClasses={[ 'label-above', 'fancy' ]}
					/>
					<LabeledTextField
						label='Agility'
						content={character.agility}
						additionalClasses={[ 'label-above', 'fancy' ]}
					/>
					<LabeledTextField
						label='Reason'
						content={character.reason}
						additionalClasses={[ 'label-above', 'fancy' ]}
					/>
					<LabeledTextField
						label='Intuition'
						content={character.intuition}
						additionalClasses={[ 'label-above', 'fancy' ]}
					/>
					<LabeledTextField
						label='Presence'
						content={character.presence}
						additionalClasses={[ 'label-above', 'fancy' ]}
					/>
				</div>
				<div className='measurements'>
					<LabeledTextField
						label='Size'
						content={character.size}
					/>
					<LabeledTextField
						label='Speed'
						content={character.speed}
					/>
					<LabeledTextField
						label='Disengage'
						content={character.disengage}
					/>
					<LabeledTextField
						label='Stability'
						content={character.stability}
					/>
				</div>
			</div>
			<div className='stamina'>
				<h4>Stamina</h4>
				<div className='wrapper'>
					<div className='current-stamina'>
						<LabeledTextField
							label='Current'
							content={(showState && character.staminaCurrent?.toString()) || ''}
							additionalClasses={[ 'no-box' ]}
						/>
					</div>
				</div>
				<div className='current-state'>
					<div className='winded'>
						<LabeledBooleanField
							label='Winded'
							value={showState && (character.staminaCurrent || 1) <= (character.windedAt || 0)}
							additionalClasses={[ 'label-below' ]}
						/>
						<div className='ref'>≤ <span className='data'>{character.windedAt}</span></div>
					</div>
					<div className='dying'>
						<LabeledBooleanField
							label='Dying'
							value={showState && (character.staminaCurrent || 1) <= 0}
							additionalClasses={[ 'label-below' ]}
						/>
						<div className='ref'>0 to <span className='data'>{character.deadAt}</span></div>
					</div>
				</div>
				<div className='reference'>
					<LabeledTextField
						label='Temporary'
						content={(showState && character.staminaTemp?.toString()) || ''}
						additionalClasses={[ 'no-box' ]}
					/>
					<LabeledTextField
						label='Max'
						content={character.staminaMax}
						additionalClasses={[ 'no-box' ]}
					/>
				</div>
			</div>
			<div className='recoveries'>
				<LabeledTextField
					label='Recoveries'
					content={(showState && character.recoveriesCurrent?.toString()) || ''}
					additionalClasses={[ 'label-above', 'fancy' ]}
				/>
				<div className='reference'>
					<LabeledTextField
						label='Stamina'
						content={character.recoveryValue}
						additionalClasses={[ 'no-box' ]}
					/>
					<LabeledTextField
						label='Max'
						content={character.recoveriesMax}
						additionalClasses={[ 'no-box' ]}
					/>
				</div>
			</div>
			<div className='heroic-resource'>
				<LabeledTextField
					label='Heroic Resource'
					content={(showState && character.heroicResourceCurrent?.toString()) || ''}
					additionalClasses={[ 'label-above', 'fancy' ]}
				/>
				<LabeledTextField
					label='Name'
					content={character.heroicResourceName}
					additionalClasses={[ 'no-box' ]}
				/>
			</div>
			<div className='surges'>
				<LabeledTextField
					label='Surges'
					content={(showState && character.surgesCurrent?.toString()) || ''}
					additionalClasses={[ 'label-above', 'fancy' ]}
				/>
				<div className='reference'>
					<div>1 Surge = Damage <span className='data'>{character.surgeDamageAmount}</span></div>
					<div>2 Surges = Potency + 1</div>
				</div>
			</div>
		</div>
	);
};
