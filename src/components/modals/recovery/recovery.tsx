import { Button, Divider } from 'antd';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { NumberSpin } from '../../controls/number-spin/number-spin';
import { useState } from 'react';

import './recovery.scss';

interface Props {
	hero: Hero;
	onChange: (hero: Hero) => void;
}

export const RecoveryModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(props.hero);

	const onChange = (field: string, value: number) => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		const state = copy.state as unknown;
		(state as { [field: string]: unknown })[field] = value;
		setHero(copy);
		props.onChange(copy);
	};

	const spendRecovery = () => {
		const copy = JSON.parse(JSON.stringify(hero)) as Hero;
		copy.state.recoveriesUsed += 1;
		copy.state.staminaDamage = Math.max(copy.state.staminaDamage - HeroLogic.getRecoveryValue(hero), 0);
		setHero(copy);
		props.onChange(copy);
	};

	try {
		return (
			<div className='recovery-modal'>
				<NumberSpin
					label='Stamina Damage'
					value={hero.state.staminaDamage}
					min={0}
					onChange={value => onChange('staminaDamage', value)}
				/>
				<NumberSpin
					label='Recoveries Used'
					value={hero.state.recoveriesUsed}
					min={0}
					onChange={value => onChange('recoveriesUsed', value)}
				/>
				<Divider />
				<Button
					type='primary'
					block={true}
					disabled={(hero.state.staminaDamage === 0) || (hero.state.recoveriesUsed >= HeroLogic.getRecoveries(hero))}
					onClick={spendRecovery}
				>
					Spend a Recovery to regain Stamina
				</Button>
			</div>
		);
	} catch {
		return null;
	}
};
