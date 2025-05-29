import { Ability } from '../../../models/ability';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { AbilityLogic } from '../../../logic/ability-logic';
import { Collections } from '../../../utils/collections';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Field } from '../../controls/field/field';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { PowerRoll } from '../../../models/power-roll';

import './power-roll-panel.scss';

interface Props {
	powerRoll: PowerRoll;
	ability?: Ability;
	hero?: Hero;
	test?: boolean;
	autoCalc?: boolean;
}

export const PowerRollPanel = (props: Props) => {
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

		if (props.hero && props.ability) {
			const sections = [];

			//#region Kits

			const hasMelee = props.ability.keywords.includes(AbilityKeyword.Melee) && props.ability.keywords.includes(AbilityKeyword.Weapon);
			const hasRanged = props.ability.keywords.includes(AbilityKeyword.Ranged) && props.ability.keywords.includes(AbilityKeyword.Weapon);

			const dmgKits = HeroLogic
				.getKitDamageBonuses(props.hero)
				.filter(dmg => {
					switch (dmg.type) {
						case 'melee':
							return hasMelee;
						case 'ranged':
							return hasRanged;
					}
				});

			// Show bonuses from kits if:
			// * AutoCalc is off
			// * we have more than 1 bonus
			// * the ability has melee and ranged distances
			// ... because otherwise it should have already been applied
			const showKitBonuses = !props.autoCalc || (dmgKits.length > 1) || (hasMelee && hasRanged);
			if (showKitBonuses) {
				dmgKits.forEach((bonus, n) => {
					sections.push(
						<Field
							key={`kit-${n}`}
							label={`${bonus.kit}`}
							value={`+${bonus.tier1} / +${bonus.tier2} / +${bonus.tier3} ${bonus.type} damage`}
						/>
					);
				});
			}

			//#endregion

			//#region Damage bonuses

			if (!props.autoCalc) {
				HeroLogic
					.getFeatureDamageBonuses(props.hero, props.ability)
					.forEach((bonus, n) => {
						const value = `${bonus.value} ${bonus.type}`;
						sections.push(<Field key={`feature-${n}`} label={bonus.feature} value={value} />);
					});
			}

			//#endregion

			//#region Potency

			if (!props.autoCalc) {
				const usesPotency = AbilityLogic.usesPotency(props.powerRoll);
				if (usesPotency) {
					const potency = `weak ${HeroLogic.calculatePotency(props.hero, 'weak')}, average ${HeroLogic.calculatePotency(props.hero, 'average')}, strong ${HeroLogic.calculatePotency(props.hero, 'strong')}`;
					sections.push(<Field key='potency' label='Potency' value={potency} />);
				}
			}

			//#endregion

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
