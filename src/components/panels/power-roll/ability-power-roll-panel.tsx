import { Ability } from '../../../models/ability';
import { AbilityLogic } from '../../../logic/ability-logic';
import { Collections } from '../../../utils/collections';
import { Field } from '../../controls/field/field';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { PowerRoll } from '../../../models/power-roll';
import { PowerRollPanel } from './power-roll-panel';

interface Props {
	powerRoll: PowerRoll,
	ability?: Ability;
	hero?: Hero;
}

export const AbilityPowerRollPanel = (props: Props) => {
	const getHeader = () => {
		if (props.hero) {
			const values = props.powerRoll.characteristic.map(ch => HeroLogic.getCharacteristic(props.hero!, ch));
			const bonus = Collections.max(values, v => v) || 0;
			const sign = bonus >= 0 ? '+' : '';
			return `Power Roll ${sign}${bonus}`;
		}

		if (props.powerRoll.characteristic.length > 0) {
			return `Power Roll + ${props.powerRoll.characteristic.join(' or ')}`;
		}

		const sign = props.powerRoll.bonus >= 0 ? '+' : '';
		return `Power Roll ${sign}${props.powerRoll.bonus}`;
	};

	const getFooter = () => {
		if (props.hero) {
			const dmgMelee = props.ability ? HeroLogic.getMeleeDamageBonus(props.hero, props.ability) : null;
			const dmgRanged = props.ability ? HeroLogic.getRangedDamageBonus(props.hero, props.ability) : null;

			const potency = AbilityLogic.usesPotency(props.powerRoll) ?
				`weak ${HeroLogic.calculatePotency(props.hero, 'weak')}, average ${HeroLogic.calculatePotency(props.hero, 'average')}, strong ${HeroLogic.calculatePotency(props.hero, 'strong')}`
				: null;

			if (dmgMelee || dmgRanged || potency) {
				return (
					<div>
						{dmgMelee ? <Field label='Bonus melee damage' value={`+${dmgMelee.tier1} / +${dmgMelee.tier2} / +${dmgMelee.tier3}`} /> : null}
						{dmgRanged ? <Field label='Bonus ranged damage' value={`+${dmgRanged.tier1} / +${dmgRanged.tier2} / +${dmgRanged.tier3}`} /> : null}
						{potency ? <Field label='Potency' value={potency} /> : null}
					</div>
				);
			}
		}

		return null;
	};

	try {
		return (
			<PowerRollPanel
				powerRoll={props.powerRoll}
				header={getHeader()}
				footer={getFooter()}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
