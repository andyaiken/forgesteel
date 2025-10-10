import { HeroSheet } from '@/models/classic-sheets/hero-sheet';

import { useMemo } from 'react';

import './immunities-weaknesses-card.scss';

interface Props {
	character: HeroSheet;
}

export const ImmunitiesWeaknessesCard = (props: Props) => {
	const character = useMemo(
		() => props.character,
		[ props.character ]
	);

	const getImmunities = () => {
		if (character.immunities?.length) {
			return (
				<ul>
					{character.immunities?.map(im => (
						<li className='immunity' key={im.damageType}>
							{im.damageType} {im.value}
						</li>
					))}
				</ul>
			);
		} else {
			return (
				<em>None</em>
			);
		}
	};

	const getWeaknesses = () => {
		if (character.weaknesses?.length) {
			return (
				<ul>
					{character.weaknesses?.map(w => (
						<li className='weakness' key={w.damageType}>
							{w.damageType} {w.value}
						</li>
					))}
				</ul>
			);
		} else {
			return (
				<em>None</em>
			);
		}
	};

	return (
		<div className='immunities-weaknesses card'>
			<div className='immunities'>
				<h4>Immunities</h4>
				{getImmunities()}
			</div>
			<div className='weaknesses'>
				<h4>Weaknesses</h4>
				{getWeaknesses()}
			</div>
		</div>
	);
};
