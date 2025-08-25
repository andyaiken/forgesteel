import { CharacterSheet } from '../../../../models/character-sheet';

import { useMemo } from 'react';

import './immunities-weaknesses-card.scss';

interface Props {
	character: CharacterSheet;
}

export const ImmunitiesWeaknessesCard = (props: Props) => {
	const character = useMemo(
		() => props.character,
		[ props.character ]
	);

	return (
		<div className='immunities-weaknesses card'>
			{character.immunities?.length ?
				<>
					<h3>Immunities</h3>
					<ul>
						{character.immunities?.map(im => (
							<li className='immunity' key={im.damageType}>
								{im.damageType} {im.value}
							</li>
						))}
					</ul>
				</>
				: undefined }
			{character.weaknesses?.length ?
				<>
					<h3>Weaknesses</h3>
					<ul>
						{character.weaknesses?.map(w => (
							<li className='weakness' key={w.damageType}>
								{w.damageType} {w.value}
							</li>
						))}
					</ul>
				</>
				: undefined }
		</div>
	);
};
