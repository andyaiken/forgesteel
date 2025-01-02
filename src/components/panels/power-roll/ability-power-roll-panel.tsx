import { Ability } from '../../../models/ability';
import { Collections } from '../../../utils/collections';
import { Field } from '../../controls/field/field';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { PowerRollPanel } from './power-roll-panel';
import type { ReactNode } from 'react';

interface Props {
	ability: Ability;
	hero?: Hero;
	onRoll?: () => void;
}

export const AbilityPowerRollPanel = (props: Props) => {
	try {
		if (!props.ability.powerRoll) {
			return null;
		}

		let bonus: ReactNode = null;
		if (props.hero) {
			const dmgMelee = HeroLogic.getMeleeDamageBonus(props.hero, props.ability);
			const dmgRanged = HeroLogic.getRangedDamageBonus(props.hero, props.ability);

			if (dmgMelee || dmgRanged) {
				bonus = (
					<div>
						{dmgMelee ? <Field label='Bonus melee damage' value={`+${dmgMelee.tier1} / +${dmgMelee.tier2} / +${dmgMelee.tier3}`} /> : null}
						{dmgRanged ? <Field label='Bonus ranged damage' value={`+${dmgRanged.tier1} / +${dmgRanged.tier2} / +${dmgRanged.tier3}`} /> : null}
					</div>
				);
			}
		}

		let header: string;
		if (props.hero) {
			const values = props.ability.powerRoll.characteristic.map(ch => HeroLogic.getCharacteristic(props.hero!, ch));
			const bonus = Collections.max(values, v => v) || 0;
			const sign = bonus >= 0 ? '+' : '';
			header = `Power Roll ${sign}${bonus}`;
		} else if (props.ability.powerRoll.characteristic.length > 0) {
			header = `Power Roll + ${props.ability.powerRoll.characteristic.join(' or ')}`;
		} else {
			const sign = props.ability.powerRoll.bonus >= 0 ? '+' : '';
			header = `Power Roll ${sign}${props.ability.powerRoll.bonus}`;
		}

		return (<PowerRollPanel powerRoll={props.ability.powerRoll} header={header} footer={bonus} onRoll={props.onRoll} />);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
