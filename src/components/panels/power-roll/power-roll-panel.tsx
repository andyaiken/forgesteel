import { Ability, PowerRoll } from '../../../models/ability';
import { Collections } from '../../../utils/collections';
import { Field } from '../../controls/field/field';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { PowerRollType } from '../../../enums/power-roll-type';
import { ReactNode } from 'react';

import './power-roll-panel.scss';

interface Props {
	powerRoll: PowerRoll
	ability?: Ability;
	hero?: Hero;
	onRoll?: () => void;
}

export const PowerRollPanel = (props: Props) => {
	try {
		let bonus: ReactNode = null;
		if (props.ability && props.hero) {
			const dmgMelee = HeroLogic.getMeleeDamageBonus(props.hero, props.ability);
			const dmgRanged = HeroLogic.getRangedDamageBonus(props.hero, props.ability);

			if (dmgMelee || dmgRanged) {
				bonus = (
					<div className='power-roll-row power-roll-footer'>
						<div>
							{dmgMelee ? <Field label='Bonus melee damage' value={`+${dmgMelee.tier1} / +${dmgMelee.tier2} / +${dmgMelee.tier3}`} /> : null}
							{dmgRanged ? <Field label='Bonus ranged damage' value={`+${dmgRanged.tier1} / +${dmgRanged.tier2} / +${dmgRanged.tier3}`} /> : null}
						</div>
					</div>
				);
			}
		}

		let header: string;
		switch (props.powerRoll.type) {
			case PowerRollType.PowerRoll:
				if (props.hero) {
					const values = props.powerRoll.characteristic.map(ch => HeroLogic.getCharacteristic(props.hero as Hero, ch));
					const bonus = Collections.max(values, v => v) || 0;
					const sign = bonus >= 0 ? '+' : '';
					header = `Power Roll ${sign}${bonus}`;
				} else if (props.powerRoll.characteristic.length > 0) {
					header = `Power Roll + ${props.powerRoll.characteristic.join(' or ')}`;
				} else {
					const sign = props.powerRoll.bonus >= 0 ? '+' : '';
					header = `Power Roll ${sign}${props.powerRoll.bonus}`;
				}
				break;
			case PowerRollType.Resistance:
				header = `${props.powerRoll.characteristic.join(' or ')} Resistance Roll`;
				break;
		}

		return (
			<div className={props.onRoll ? 'power-roll-panel clickable' : 'power-roll-panel'} onClick={props.onRoll}>
				<div className='power-roll-row power-roll-header'>
					{header}
				</div>
				<div className='power-roll-row'>
					<div className='tier'>11 -</div>
					<div className='effect'>{props.powerRoll.tier1}</div>
				</div>
				<div className='power-roll-row'>
					<div className='tier'>12 - 16</div>
					<div className='effect'>{props.powerRoll.tier2}</div>
				</div>
				<div className='power-roll-row'>
					<div className='tier'>17 +</div>
					<div className='effect'>{props.powerRoll.tier3}</div>
				</div>
				{bonus}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
