import { Fragment, useMemo } from 'react';

import { CharacterSheet } from '../../../../models/character-sheet';

import './primary-reference-card.scss';

interface Props {
	character: CharacterSheet;
}

export const PrimaryReferenceCard = (props: Props) => {
	const character = useMemo(
		() => props.character,
		[ props.character ]
	);

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
				<p><strong>1 Token:</strong> Reroll a test.</p>
				<p><strong>2 Tokens:</strong> On your turn or when you take damage, regain Stamina equal to your Recovery value without spending a Recovery.</p>
			</div>
		</div>
	);
};
