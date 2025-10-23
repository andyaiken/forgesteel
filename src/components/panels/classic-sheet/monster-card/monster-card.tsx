import { AbilityComponent } from '@/components/panels/classic-sheet/components/ability-component';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { CharacteristicsComponent } from '../components/characteristics-component';
import { FeatureComponent } from '@/components/panels/classic-sheet/components/feature-component';
import { MonsterSheet } from '@/models/classic-sheets/monster-sheet';
import { Options } from '@/models/options';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Utils } from '@/utils/utils';
import { useMemo } from 'react';

import './monster-card.scss';

import starIcon from '@/assets/icons/star.svg';

interface Props {
	monster: MonsterSheet;
	options: Options;
}

export const MonsterCard = (props: Props) => {
	const monster = useMemo(() => props.monster, [ props.monster ]);

	const getDetails = () => {
		return (
			<div className='details'>
				<div className='field size'>
					<label>Size</label>
					<div className='value'>{monster.size}</div>
				</div>
				<div className='field speed'>
					<label>Speed</label>
					<div className='value'>{monster.speed}</div>
				</div>
				<div className='field stamina'>
					<label>Stamina</label>
					<div className='value'>{monster.stamina}</div>
				</div>
				<div className='field stability'>
					<label>Stability</label>
					<div className='value'>{monster.stability}</div>
				</div>
				<div className='field free-strike'>
					<label>Free Strike</label>
					<div className='value'>{monster.freeStrike}</div>
				</div>
				<div className='stats'>
					<div className='stat immunity'>
						<label>Immunity:</label>
						<span>{Utils.valueOrDefault(monster.immunity, '—')}</span>
					</div>
					<div className='stat weakness'>
						<label>Weakness:</label>
						<span>{Utils.valueOrDefault(monster.weakness, '—')}</span>
					</div>
					<div className='stat movement'>
						<label>Movement:</label>
						<span>{Utils.valueOrDefault(monster.movement, '—')}</span>
					</div>
					{
						monster.withCaptain.length ?
							<div className='stat with-captain'>
								<label>With Captain:</label>
								<span>{monster.withCaptain}</span>
							</div>
							: null
					}
					{
						monster.freeStrikeDamageType?.length ?
							<div className='stat fs-dmg-type'>
								<label>Free Strike Damage Type:</label>
								<span>{Utils.valueOrDefault(monster.freeStrikeDamageType, '—')}</span>
							</div>
							: null
					}
				</div>
			</div>
		);
	};

	const getAbilities = () => {
		return (
			<>
				{monster.abilities?.map(a =>
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
				{monster.features?.map(f =>
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

	const cardClasses = [ 'monster', 'card' ];
	cardClasses.push(monster.role.toLocaleLowerCase().split(' ').join('-'));

	return (
		<div className={cardClasses.join(' ')}>
			<section className='bordered'>
				<div className='name-wrapper'>
					<h2>
						<span className='name'>{monster.name}</span>
						<span className='type'>{monster.type}</span>
						<span className='keywords'>{monster.keywords}</span>
						{
							monster.cost?.length ?
								<span className='cost'>{monster.cost}</span>
								: null
						}
					</h2>
				</div>
				{getDetails()}
				<CharacteristicsComponent characteristics={monster.characteristics} />
				<div className='features-abilities'>
					{getAbilities()}
					{getFeatures()}
				</div>
			</section>
		</div>
	);
};
