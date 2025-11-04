import { AbilityComponent } from '@/components/panels/classic-sheet/components/ability-component';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { CharacteristicsComponent } from '@/components/panels/classic-sheet/components/characteristics-component';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { FollowerSheet } from '@/models/classic-sheets/hero-sheet';
import { Options } from '@/models/options';
import { RecoveriesComponent } from '@/components/panels/classic-sheet/components/recoveries-component';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { StaminaComponent } from '@/components/panels/classic-sheet/components/stamina-component';
import { Utils } from '@/utils/utils';
import { useMemo } from 'react';

import './follower-card.scss';

import starIcon from '@/assets/icons/star.svg';

interface Props {
	companion: FollowerSheet;
	options: Options;
}

export const CompanionCard = (props: Props) => {
	const companion = useMemo(() => props.companion, [ props.companion ]);

	const getDetails = () => {
		return (
			<div className='details'>
				<div className='field size'>
					<label>Size</label>
					<div className='value'>{companion.size}</div>
				</div>
				<div className='field speed'>
					<label>Speed</label>
					<div className='value'>{companion.speed}</div>
				</div>
				<div className='field stability'>
					<label>Stability</label>
					<div className='value'>{companion.stability}</div>
				</div>
				<div className='field free-strike'>
					<label>Free Strike</label>
					<div className='value'>{companion.freeStrike}</div>
				</div>
				<div className='stats'>
					<div className='stat immunity'>
						<label>Immunity:</label>
						<span>{Utils.valueOrDefault(companion.immunity, '—')}</span>
					</div>
					<div className='stat weakness'>
						<label>Weakness:</label>
						<span>{Utils.valueOrDefault(companion.weakness, '—')}</span>
					</div>
					<div className='stat movement'>
						<label>Movement:</label>
						<span>{Utils.valueOrDefault(companion.movement, '—')}</span>
					</div>
					{
						companion.skills?.length ?
							<div className='stat skills'>
								<label>Skills:</label>
								<span>{companion.skills?.join(', ')}</span>
							</div>
							: null
					}
				</div>
			</div>
		);
	};

	const getStamina = () => {
		if (companion.stamina || companion.recoveries) {
			return (
				<div className='stamina-recoveries'>
					{
						companion.stamina ?
							<StaminaComponent
								stamina={companion.stamina}
								options={props.options}
							/>
							: null
					}
					{
						companion.recoveries ?
							<RecoveriesComponent
								recoveries={companion.recoveries}
								options={props.options}
							/>
							: null
					}
				</div>
			);
		}
	};

	const getAbilities = () => {
		return (
			<>
				{companion.abilities?.map(a =>
					<div className='wrapper' key={a.id}>
						{getAbilityIcon(a)}
						<AbilityComponent
							ability={a}
						/>
					</div>
				)}
			</>
		);
	};

	const getAdvancement = () => {
		return (
			<div className='advancement-abilities'>
				{companion.advancement?.map(a =>
					<div className='advancement' key={`${companion.id}-advancement-${a.level}`}>
						{
							a.ability ?
								<>
									<h4>Level {a.level} Retainer Advancement Ability</h4>
									{getAbilityIcon(a.ability)}
									<AbilityComponent
										ability={a.ability}
									/>
								</>
								: null
						}
						{
							a.features ?
								<>
									<h4>Level {a.level} {companion.name} Advancement Feature</h4>
									<img src={starIcon} className='icon' />
									{
										a.features.map(f => {
											return (
												<FeatureComponent feature={f} key={`${companion.id}-advancement-${f.id}`} />
											);
										})
									}
								</>
								: null
						}
					</div>
				)}
			</div>
		);
	};

	const getAbilityIcon = (ability: AbilitySheet) => {
		const icon = SheetFormatter.getAbilityIcon(ability);
		const alt = 'Ability';
		return (
			<img src={icon} alt={alt} className='icon' />
		);
	};

	const getFeatures = () => {
		return (
			<>
				{companion.features?.map(f =>
					<div className='wrapper' key={f.id}>
						{getFeatureIcon()}
						<FeatureComponent
							feature={SheetFormatter.enhanceFeature(f)}
						/>
					</div>
				)}
			</>
		);
	};

	const getFeatureIcon = () => {
		const icon = starIcon;
		const alt = 'Feature';
		return (
			<img src={icon} alt={alt} className='icon' />
		);
	};

	const cardClasses = [ 'follower', 'card' ];
	cardClasses.push(companion.role.toLocaleLowerCase().split(' ').join('-'));
	cardClasses.push(companion.classification.toLocaleLowerCase().split(' ').join('-'));

	const type = companion.type !== companion.classification ? `${companion.type} ${companion.classification}` : companion.type;
	return (
		<div className={cardClasses.join(' ')}>
			<section className='bordered'>
				<div className='name-wrapper'>
					<h2>
						<span className='name'>{companion.name}</span>
						<span className='type'>{type}</span>
						<span className='keywords'>{companion.keywords}</span>
					</h2>
				</div>
				{getDetails()}
				<CharacteristicsComponent characteristics={companion.characteristics} />
				{getStamina()}
				<div className='features-abilities'>
					{getAbilities()}
					{getFeatures()}
				</div>
				{getAdvancement()}
			</section>
		</div>
	);
};
