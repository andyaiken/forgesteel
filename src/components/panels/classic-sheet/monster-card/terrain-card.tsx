import { AbilityComponent } from '../components/ability-component';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { FeatureComponent } from '../components/feature-component';
import { FeatureText } from '@/models/feature';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { TerrainSheet } from '@/models/classic-sheets/terrain-sheet';
import { useMemo } from 'react';

import './monster-card.scss';

import activateIcon from '@/assets/icons/activation.svg';
import specialAreaIcon from '@/assets/icons/special-area.svg';
import starIcon from '@/assets/icons/star.svg';
import triggerIcon from '@/assets/icons/trigger-solid.svg';

interface Props {
	terrain: TerrainSheet;
	columns?: number;
}

export const TerrainCard = (props: Props) => {
	const terrain = useMemo(() => props.terrain, [ props.terrain ]);
	const columns = props.columns ?? 1;

	const getDetails = () => {
		return (
			<div className='details'>
				<p className='description'>
					{terrain.details}
				</p>
				<div className='stats'>
					<div className='line'>
						<div className='stat stamina'>
							<label>Stamina:</label>
							<span>{terrain.stamina}</span>
						</div>
						<div className='stat size'>
							<label>Size:</label>
							<span>{terrain.size}</span>
						</div>
					</div>
					{
						terrain.typicalSpace ?
							<div className='stat typical-space'>
								<label>Typical Space:</label>
								<span>{terrain.typicalSpace}</span>
							</div>
							: null
					}
					{
						terrain.direction ?
							<div className='stat direction'>
								<label>Direction:</label>
								<span>{terrain.direction}</span>
							</div>
							: null
					}
					{
						terrain.link ?
							<div className='stat link'>
								<label>Link:</label>
								<span>{terrain.link}</span>
							</div>
							: null
					}
					{
						terrain.immunity?.length ?? 0 > 0 ?
							<div className='stat immunity'>
								<label>Immunity:</label>
								<span>{terrain.immunity}</span>
							</div>
							: null
					}
					{
						terrain.weakness?.length ?? 0 > 0 ?
							<div className='stat weakness'>
								<label>Weakness:</label>
								<span>{terrain.weakness}</span>
							</div>
							: null
					}
				</div>
			</div>
		);
	};

	const getSections = () => {
		return (
			<>
				{terrain.sections?.map(section => {
					if (Object.hasOwn(section, 'type')) {
						return (
							<div className='wrapper' key={section.id}>
								{getSectionIcon(section.id)}
								<FeatureComponent
									feature={SheetFormatter.enhanceFeature(section as FeatureText)}
								/>
							</div>
						);
					} else {
						return (
							<div className='wrapper' key={section.id}>
								{getAbilityIcon()}
								<AbilityComponent
									ability={section as AbilitySheet}
								/>
							</div>
						);
					}
				})}
			</>
		);
	};

	const getSectionIcon = (id: string) => {
		let icon = starIcon;
		let alt = 'Feature';
		switch (id) {
			case 'deactivate':
				icon = specialAreaIcon;
				alt = 'Deactivate icon';
				break;
			case 'activate':
			case 'activate-effect':
				icon = activateIcon;
				alt = 'Activate icon';
				break;
		}
		return (
			<img src={icon} alt={alt} className='icon' />
		);
	};

	const getAbilityIcon = () => {
		const icon = triggerIcon;
		const alt = 'Ability';
		return (
			<img src={icon} alt={alt} className='icon' />
		);
	};

	const cardClasses = [ 'terrain', 'card' ];
	if (columns > 1) {
		cardClasses.push('wide');
	}
	cardClasses.push(terrain.role.toLocaleLowerCase().split(' ').join('-'));

	return (
		<div className={cardClasses.join(' ')}>
			<section className='bordered'>
				<div className='name-wrapper'>
					<h2>
						<span className='name'>{terrain.name}</span>
						<span className='type'>{terrain.description}</span>
						<span className='cost'>EV {terrain.encounterValue}</span>
					</h2>
				</div>
				{getDetails()}
				{getSections()}
			</section>
		</div>
	);
};
