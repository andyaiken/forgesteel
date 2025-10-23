import { AbilityComponent } from '@/components/panels/classic-sheet/components/ability-component';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { CharacteristicsComponent } from '../components/characteristics-component';
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
	follower: FollowerSheet;
	options: Options;
}

export const RetainerCard = (props: Props) => {
	const follower = useMemo(() => props.follower, [ props.follower ]);

	const getSkillsLanguages = () => {
		if (follower.classification === 'Follower') {
			return (
				<>
					<div className='stat skills'>
						<label>Skills:</label>
						<span>{follower.skills?.join(', ')}</span>
					</div>
					<div className='stat languages'>
						<label>Languages:</label>
						<span>{follower.languages?.join(', ')}</span>
					</div>
				</>
			);
		}
	};

	const getDetails = () => {
		if (follower.classification === 'Retainer') {
			return (
				<div className='details'>
					<div className='field size'>
						<label>Size</label>
						<div className='value'>{follower.size}</div>
					</div>
					<div className='field speed'>
						<label>Speed</label>
						<div className='value'>{follower.speed}</div>
					</div>
					<div className='field stability'>
						<label>Stability</label>
						<div className='value'>{follower.stability}</div>
					</div>
					<div className='field free-strike'>
						<label>Free Strike</label>
						<div className='value'>{follower.freeStrike}</div>
					</div>
					<div className='stats'>
						<div className='stat immunity'>
							<label>Immunity:</label>
							<span>{Utils.valueOrDefault(follower.immunity, '—')}</span>
						</div>
						<div className='stat weakness'>
							<label>Weakness:</label>
							<span>{Utils.valueOrDefault(follower.weakness, '—')}</span>
						</div>
						<div className='stat movement'>
							<label>Movement:</label>
							<span>{Utils.valueOrDefault(follower.movement, '—')}</span>
						</div>
					</div>
				</div>
			);
		}
	};

	const getStamina = () => {
		if (follower.stamina && follower.recoveries) {
			return (
				<div className='stamina-recoveries'>
					<StaminaComponent
						stamina={follower.stamina}
						options={props.options}
					/>
					<RecoveriesComponent
						recoveries={follower.recoveries}
						options={props.options}
					/>
				</div>
			);
		}
	};

	const getAbilities = () => {
		return (
			<>
				{follower.abilities?.map(a =>
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
				{follower.advancement?.map(a =>
					<div className='advancement' key={a.ability.id}>
						<h4>Level {a.level} Retainer Advancement Ability</h4>
						{getAbilityIcon(a.ability)}
						<AbilityComponent
							ability={a.ability}
						/>
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
				{follower.features?.map(f =>
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
	cardClasses.push(follower.role.toLocaleLowerCase());

	return (
		<div className={cardClasses.join(' ')}>
			<section className='bordered'>
				<div className='name-wrapper'>
					<h2>
						<span className='name'>{follower.name}</span>
						<span className='type'>{follower.type} {follower.classification}</span>
						<span className='keywords'>{follower.keywords}</span>
					</h2>
				</div>
				{getDetails()}
				<CharacteristicsComponent characteristics={follower.characteristics} />
				{getSkillsLanguages()}
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
