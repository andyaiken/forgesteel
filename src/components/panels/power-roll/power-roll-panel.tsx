import { Ability } from '../../../models/ability';
import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityLogic } from '../../../logic/ability-logic';
import { Collections } from '../../../utils/collections';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import type { PowerRoll } from '../../../models/power-roll';

import './power-roll-panel.scss';

interface Props {
	powerRoll: PowerRoll;
	ability?: Ability;
	hero?: Hero;
	test?: boolean;
	autoCalc?: boolean;
}

export const PowerRollPanel = (props: Props) => {
	const dmgMelee = props.ability && props.hero ? HeroLogic.getMeleeDamageBonus(props.hero, props.ability) : null;
	const dmgRanged = props.ability && props.hero ? HeroLogic.getRangedDamageBonus(props.hero, props.ability) : null;
	const usesPotency = AbilityLogic.usesPotency(props.powerRoll);

	const getHeader = () => {
		if (props.test) {
			if (props.powerRoll.characteristic.length === 0) {
				return 'Test';
			}
			if (props.powerRoll.characteristic.length === 5) {
				return 'Highest Characteristic Test';
			}
			return `${props.powerRoll.characteristic.join(' or ')} Test`;
		}

		if (props.hero && props.autoCalc) {
			const values = props.powerRoll.characteristic.map(ch => HeroLogic.getCharacteristic(props.hero!, ch));
			const bonus = Collections.max(values, v => v) || 0;
			const sign = bonus >= 0 ? '+' : '';
			return `2d10 ${sign} ${bonus}`;
		}

		if (props.powerRoll.characteristic.length > 0) {
			if (props.powerRoll.characteristic.length === 0) {
				return 'Power Roll';
			}
			if (props.powerRoll.characteristic.length === 5) {
				return 'Power Roll + Highest Characteristic';
			}
			return `Power Roll + ${props.powerRoll.characteristic.join(' or ')}`;
		}

		const sign = props.powerRoll.bonus >= 0 ? '+' : '';
		return `Power Roll ${sign} ${props.powerRoll.bonus}`;
	};

	const getFooter = () => {
		if (props.test) {
			return null;
		}

		if (props.hero) {
			const sections = [];
			if (props.autoCalc) {
				// Show melee and ranged damage only if:
				// * we have both, and they're different
				// * we have only one, but the ability has melee and ranged distances
				let showBonuses = false;
				if (dmgMelee && dmgRanged) {
					showBonuses = ((dmgMelee.tier1 !== dmgRanged.tier1) || (dmgMelee.tier2 !== dmgRanged.tier2) || (dmgMelee.tier3 !== dmgRanged.tier3));
				}
				if (dmgMelee || dmgRanged) {
					showBonuses = !!props.ability && props.ability.distance.some(d => d.type === AbilityDistanceType.Melee) && props.ability.distance.some(d => d.type === AbilityDistanceType.Ranged);
				}
				if (showBonuses) {
					if (dmgMelee) {
						sections.push(<Field key='melee' label='Bonus melee damage' value={`+${dmgMelee.tier1} / +${dmgMelee.tier2} / +${dmgMelee.tier3}`} />);
					}
					if (dmgRanged) {
						sections.push(<Field key='ranged' label='Bonus ranged damage' value={`+${dmgRanged.tier1} / +${dmgRanged.tier2} / +${dmgRanged.tier3}`} />);
					}
				}
			} else {
				if (dmgMelee) {
					sections.push(<Field key='melee' label='Bonus melee damage' value={`+${dmgMelee.tier1} / +${dmgMelee.tier2} / +${dmgMelee.tier3}`} />);
				}

				if (dmgRanged) {
					sections.push(<Field key='ranged' label='Bonus ranged damage' value={`+${dmgRanged.tier1} / +${dmgRanged.tier2} / +${dmgRanged.tier3}`} />);
				}

				if (usesPotency) {
					const potency = `weak ${HeroLogic.calculatePotency(props.hero, 'weak')}, average ${HeroLogic.calculatePotency(props.hero, 'average')}, strong ${HeroLogic.calculatePotency(props.hero, 'strong')}`;
					sections.push(<Field key='potency' label='Potency' value={potency} />);
				}

				HeroLogic.getFeatures(props.hero)
					.filter(f => f.type === FeatureType.AbilityDamage)
					.filter(f => f.data.keywords.every(kw => props.ability?.keywords.includes(kw)))
					.forEach(f => {
						const value = `${FormatLogic.getModifier(f.data)} ${f.data.damageType}`;
						sections.push(<Field key={f.id} label={f.name || 'Damage'} value={value} />);
					});
			}

			if (sections.length > 0) {
				return (
					<div>
						{sections}
					</div>
				);
			}
		}

		return null;
	};

	const getTier = (tier: number, value: string) => {
		if (props.autoCalc && props.ability && props.hero) {
			return AbilityLogic.getTierEffect(value, tier, props.ability, props.hero);
		}

		return value;
	};

	try {
		const header = getHeader();
		const footer = getFooter();

		return (
			<ErrorBoundary>
				<div className='power-roll-panel'>
					{header ? <div className='power-roll-row power-roll-header'>{header}</div> : null}
					<div className='power-roll-row'>
						<div className='tier'>11 -</div>
						<div className='effect'>{getTier(1, props.powerRoll.tier1)}</div>
					</div>
					<div className='power-roll-row'>
						<div className='tier'>12 - 16</div>
						<div className='effect'>{getTier(2, props.powerRoll.tier2)}</div>
					</div>
					<div className='power-roll-row'>
						<div className='tier'>17 +</div>
						<div className='effect'>{getTier(3, props.powerRoll.tier3)}</div>
					</div>
					{footer ? <div className='power-roll-row power-roll-footer'>{footer}</div> : null}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
