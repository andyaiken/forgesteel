import { CharacterSheet } from '../../../../models/character-sheet';
import { Fragment } from 'react';

import './turn-reference-card.scss';

interface Props {
	character: CharacterSheet;
}

export const TurnReferenceCard = (props: Props) => {
	const character = props.character;
	const resourceGainsCount = character.heroicResourceFeature?.data.gains.length || 0;
	const resourceSection = (character.heroicResourceFeature ?
		<>
			<h3>Heroic Resource</h3>
			<p>You gain {character.heroicResourceName} in the following ways:</p>
			<div className='heroic-resource-gain'>
				<div className='header value'>Amount</div>
				<div className='header trigger'>When</div>
				{character.heroicResourceFeature.data.gains.map((g, n) =>
					<Fragment key={n}>
						<div className='value'>{g.value}</div>
						<div className='trigger'>{g.trigger}</div>
					</Fragment>
				)}
			</div>
		</>
		: undefined);

	const actionsDetails = (resourceSection
		? undefined :
		<div className='actions-maneuvers'>
			<div className='move-actions'>
				<h5>Move Actions</h5>
				<ul>
					<li>Advance</li>
					<li>Disengage</li>
					<li>Ride</li>
				</ul>
			</div>
			<div className='main-actions'>
				<h5>Main Actions</h5>
				<ul>
					<li>Charge</li>
					<li>Defend</li>
					<li>Heal</li>
					<li>Free Strike</li>
					<li>Trade for Maneuver</li>
					<li>Trade for Move</li>
				</ul>
			</div>
			<div className='maneuvers'>
				<h5>Maneuvers</h5>
				<ul>
					<li>Aid Attack</li>
					<li>Catch Breath</li>
					<li>Escape Grab</li>
					<li>Grab</li>
					<li>Make or Assist Test</li>
					<li>Search for Hidden Creature</li>
					<li>Stand Up</li>
					<li>Use Consumable</li>
				</ul>
			</div>
		</div>
	);
	return (
		<div className='turn-reference card'>
			{resourceSection}
			<h3>Spending Hero Tokens</h3>
			<p><strong>1 Token:</strong> Gain 2 Surges.</p>
			<p><strong>1 Token:</strong> Succeed on a saving throw instead of failing.</p>
			<p><strong>1 Token:</strong> Reroll a test and use the new result.</p>
			<p><strong>2 Tokens:</strong> On your turn or when you take damage, regain Stamina equal to your Recovery value without spending a Recovery.</p>
			{resourceGainsCount > 3
				? undefined :
				<>
					<h3>Your Turn</h3>
					<p>Each creature can take a move action, a maneuver, and an action on their turn — in any order</p>
					{actionsDetails}
				</>}
		</div>
	);
};
