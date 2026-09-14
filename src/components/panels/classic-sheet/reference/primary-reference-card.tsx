import { Fragment, useMemo } from 'react';
import { HeroSheet } from '@/models/classic-sheets/hero-sheet';
import { ResourceGainFrequency } from '@/enums/resource-gain-frequency';
import { SheetPageSize } from '@/enums/sheet-page-size';
import { useOptions } from '@/contexts/data-context';

import './primary-reference-card.scss';

interface Props {
	character: HeroSheet;
}

export const PrimaryReferenceCard = (props: Props) => {
	const character = useMemo(
		() => props.character,
		[ props.character ]
	);
	const options = useOptions();

	const gainRows = (props.character.heroicResourceGains || []).length + (props.character.surgeGains || []).length;

	const showTriggerHelp = options.classicSheetPageSize === SheetPageSize.A4 &&
		options.pageOrientation === 'portrait' &&
		gainRows < 3;

	const showActionsManeuversReference = gainRows <= 3;

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

	const getSurgeSection = () => {
		if (character.surgeGains && (character.surgeGains.length > 0)) {
			return (
				<div className='surge-gains'>
					<h3>Gaining Surges</h3>
					<div className='heroic-resource-gain'>
						<div className='header value'>Gain</div>
						<div className='header trigger'>When</div>
						{character.surgeGains.map((g, n) => {
							const qualifiers = [ g.requirement, g.frequency === ResourceGainFrequency.AtWill ? '' : g.frequency ].filter(q => q);
							return (
								<Fragment key={n}>
									<div className='value'>{g.value}</div>
									<div className='trigger'>
										{g.trigger}
										{
											qualifiers.length > 0 ?
												<span className='qualifiers'> ({qualifiers.join(', ')})</span>
												: null
										}
										{
											g.condition ?
												<div className='condition'>{g.condition}</div>
												: null
										}
									</div>
								</Fragment>
							);
						})}
					</div>
				</div>
			);
		};
	};

	return (
		<div className='primary-reference card'>
			{getResourceSection()}
			{getSurgeSection()}
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
