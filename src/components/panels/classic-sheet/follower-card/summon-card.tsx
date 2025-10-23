import { AbilityComponent } from '@/components/panels/classic-sheet/components/ability-component';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { CharacteristicsComponent } from '../components/characteristics-component';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { FollowerSheet } from '@/models/classic-sheets/hero-sheet';
import { Options } from '@/models/options';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Utils } from '@/utils/utils';
import { useMemo } from 'react';

import './follower-card.scss';

import starIcon from '@/assets/icons/star.svg';

interface Props {
	summon: FollowerSheet;
	options: Options;
}

export const SummonCard = (props: Props) => {
	const summon = useMemo(() => props.summon, [ props.summon ]);

	const getDetails = () => {
		return (
			<div className='details'>
				<div className='field size'>
					<label>Size</label>
					<div className='value'>{summon.size}</div>
				</div>
				<div className='field speed'>
					<label>Speed</label>
					<div className='value'>{summon.speed}</div>
				</div>
				<div className='field stamina'>
					<label>Stamina</label>
					<div className='value'>{summon.stamina?.max}</div>
				</div>
				<div className='field stability'>
					<label>Stability</label>
					<div className='value'>{summon.stability}</div>
				</div>
				<div className='field free-strike'>
					<label>Free Strike</label>
					<div className='value'>{summon.freeStrike}</div>
				</div>
				<div className='stats'>
					<div className='stat immunity'>
						<label>Immunity:</label>
						<span>{Utils.valueOrDefault(summon.immunity, '—')}</span>
					</div>
					<div className='stat weakness'>
						<label>Weakness:</label>
						<span>{Utils.valueOrDefault(summon.weakness, '—')}</span>
					</div>
					<div className='stat movement'>
						<label>Movement:</label>
						<span>{Utils.valueOrDefault(summon.movement, '—')}</span>
					</div>
					<div className='stat fs-dmg-type'>
						<label>Free Strike Damage Type:</label>
						<span>{Utils.valueOrDefault(summon.damageType, '—')}</span>
					</div>
				</div>
			</div>
		);
	};

	const getAbilities = () => {
		return (
			<>
				{summon.abilities?.map(a =>
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
				{summon.features?.map(f =>
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

	const cardClasses = [ 'follower', 'summon', 'card' ];
	cardClasses.push(summon.role.toLocaleLowerCase());

	return (
		<div className={cardClasses.join(' ')}>
			<section className='bordered'>
				<div className='name-wrapper'>
					<h2>
						<span className='name'>{summon.name}</span>
						<span className='type'>{summon.type}</span>
						<span className='keywords'>{summon.keywords}</span>
						<span className='cost'>{summon.cost}</span>
					</h2>
				</div>
				{getDetails()}
				<CharacteristicsComponent characteristics={summon.characteristics} />
				<div className='features-abilities'>
					{getAbilities()}
					{getFeatures()}
				</div>
			</section>
		</div>
	);
};
