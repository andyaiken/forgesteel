import { Ability } from '../../../models/ability';
import { Collections } from '../../../utils/collections';
import { Field } from '../../controls/field/field';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { ReactNode } from 'react';

import './power-roll-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	onRoll?: () => void;
}

export const PowerRollPanel = (props: Props) => {
	try {
		if (!props.ability.powerRoll) {
			return null;
		}

		let bonus: ReactNode = null;
		if (props.hero) {
			const dmgMelee = HeroLogic.getMeleeDamageBonus(props.hero, props.ability);
			const dmgRanged = HeroLogic.getRangedDamageBonus(props.hero, props.ability);
			const dmgMagic = HeroLogic.getMagicalDamageBonus(props.hero, props.ability);

			if (dmgMelee || dmgRanged || dmgMagic) {
				bonus = (
					<div className='power-roll-row power-roll-footer'>
						<div>
							{dmgMelee ? <Field label='Bonus melee damage' value={`+${dmgMelee.tier1} / +${dmgMelee.tier2} / +${dmgMelee.tier3}`} /> : null}
							{dmgRanged ? <Field label='Bonus ranged damage' value={`+${dmgRanged.tier1} / +${dmgRanged.tier2} / +${dmgRanged.tier3}`} /> : null}
							{dmgMagic ? <Field label='Bonus magical damage' value={`+${dmgMagic.tier1} / +${dmgMagic.tier2} / +${dmgMagic.tier3}`} /> : null}
						</div>
					</div>
				);
			}
		}

		let characteristic: string | number = props.ability.powerRoll.characteristic.join(' or ');
		let sign = '+';
		if (props.hero) {
			const values = props.ability.powerRoll.characteristic.map(ch => HeroLogic.getCharacteristic(props.hero as Hero, ch));
			characteristic = Collections.max(values, v => v) || 0;
			sign = characteristic >= 0 ? '+' : '';
		}

		return (
			<div className={props.onRoll ? 'power-roll-panel clickable' : 'power-roll-panel'} onClick={props.onRoll}>
				<div className='power-roll-row power-roll-header'>
					Power Roll {sign}{characteristic}
				</div>
				<div className='power-roll-row'>
					<div className='tier'>11 -</div>
					<div className='effect'>{props.ability.powerRoll.tier1}</div>
				</div>
				<div className='power-roll-row'>
					<div className='tier'>12 - 16</div>
					<div className='effect'>{props.ability.powerRoll.tier2}</div>
				</div>
				<div className='power-roll-row'>
					<div className='tier'>17 +</div>
					<div className='effect'>{props.ability.powerRoll.tier3}</div>
				</div>
				{bonus}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
