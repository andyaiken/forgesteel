import { Fragment, useMemo } from 'react';

import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { Options } from '@/models/options';
import { SheetPageSize } from '@/enums/sheet-page-size';

import './primary-reference-card.scss';

interface Props {
	character: HeroSheet;
	options: Options;
}

export const PrimaryReferenceCard = (props: Props) => {
	const character = useMemo(
		() => props.character,
		[ props.character ]
	);

	const showTriggerHelp = props.options.classicSheetPageSize === SheetPageSize.A4 &&
		props.options.pageOrientation === 'portrait' &&
		(props.character.heroicResourceGains || []).length < 3;

	const showActionsManeuversReference = (props.character.heroicResourceGains || []).length <= 3;

	const getResourceSection = () => {
		if (character.heroicResourceGains) {
			return (
				<div className='heroic-resource'>
					<h3>Gaining {character.heroicResourceName}</h3>
					<div className='heroic-resource-gain'>
						<div className='header value'>Gain</div>
						<div className='header trigger'>When</div>
						{character.heroicResourceGains.map((g, n) =>
							<Fragment key={n}>
								<div className='value'>{g.value}</div>
								<div className='trigger'>{g.trigger}</div>
							</Fragment>
						)}
					</div>
				</div>
			);
		};
	};

	return (
		<div className='primary-reference card'>
			{getResourceSection()}
			<div className='hero-tokens'>
				<h3>Spending Hero Tokens</h3>
				<p><strong>1 Token:</strong> Gain 2 Surges.</p>
				<p><strong>1 Token:</strong> Succeed on a saving throw instead of failing.</p>
				<p><strong>1 Token:</strong> Reroll a test and use the new result.</p>
				<p><strong>2 Tokens:</strong> On your turn or when you take damage, regain Stamina equal to your recovery value without spending a Recovery before taking the damage.</p>
			</div>
			<div className='turn-reference'>
				<h3>Your Turn</h3>
				<p>Each creature can take a move action, a maneuver, and a main action on their turn — in any order</p>
				{
					showTriggerHelp || !showActionsManeuversReference ?
						<p>You can also take <strong>one triggered action per round</strong> when the trigger happens. There is no limit to the number of free triggered actions you can take.</p>
						: null
				}
				{
					showActionsManeuversReference ?
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
									{
										showTriggerHelp ?
											<>
												<li>Trade for Maneuver</li>
												<li>Trade for Move</li>
											</>
											: null
									}
								</ul>
							</div>
							<div className='maneuvers'>
								<h5>Maneuvers</h5>
								<ul>
									<li>Aid Attack</li>
									<li>Catch Breath</li>
									<li>Claw Dirt</li>
									<li>Escape Grab</li>
									<li>Grab</li>
									<li>Hide</li>
									<li>Knockback</li>
									<li>Make or Assist Test</li>
									<li>Search for Hidden Creature</li>
									<li>Stand Up</li>
									<li>Use Consumable</li>
								</ul>
							</div>
						</div>
						: null
				}
			</div>
		</div>
	);
};
