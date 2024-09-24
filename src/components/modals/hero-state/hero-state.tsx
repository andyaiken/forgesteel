import { Hero } from '../../../models/hero';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { useState } from 'react';

import './hero-state.scss';

interface Props {
	hero: Hero;
	onChange: (hero: Hero) => void;
}

export const HeroStateModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(props.hero);

	const onChange = (field: string, value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		const state = copy.state as unknown;
		(state as { [field: string]: unknown })[field] = value;
		setHero(copy);
		props.onChange(copy);
	};

	try {
		return (
			<div className='hero-state-modal'>
				<NumberSpin
					label={hero.class ? hero.class.heroicResource : 'Heroic Resource'}
					value={hero.state.heroicResource}
					min={0}
					onChange={value => onChange('heroicResource', value)}
				/>
				<NumberSpin
					label='Victories'
					value={hero.state.victories}
					min={0}
					onChange={value => onChange('victories', value)}
				/>
				<NumberSpin
					label='XP'
					value={hero.state.xp}
					min={0}
					onChange={value => onChange('xp', value)}
				/>
				<NumberSpin
					label='Renown'
					value={hero.state.renown}
					min={0}
					onChange={value => onChange('renown', value)}
				/>
				<NumberSpin
					label='Hero Tokens'
					value={hero.state.heroTokens}
					min={0}
					onChange={value => onChange('heroTokens', value)}
				/>
				<NumberSpin
					label='Project Points'
					value={hero.state.projectPoints}
					min={0}
					step={5}
					onChange={value => onChange('projectPoints', value)}
				/>
			</div>
		);
	} catch {
		return null;
	}
};
