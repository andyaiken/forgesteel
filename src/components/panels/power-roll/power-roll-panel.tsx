import { Button, Segmented, Space } from 'antd';
import { Ability } from '@/models/ability';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityLogic } from '@/logic/ability-logic';
import { BarChartOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { CreatureLogic } from '@/logic/creature-logic';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { PowerRoll } from '@/models/power-roll';
import { useState } from 'react';

import './power-roll-panel.scss';

interface Props {
	powerRoll: PowerRoll;
	ability?: Ability;
	creature?: Hero | Monster;
	test?: boolean;
	autoCalc?: boolean;
	highlightTier?: number;
	odds?: number[];
}

export const PowerRollPanel = (props: Props) => {
	const [ distance, setDistance ] = useState<AbilityDistanceType | undefined>(props.ability && props.ability.distance.length > 1 ? props.ability.distance[0].type : undefined);
	const [ showOdds, setShowOdds ] = useState<boolean>(false);

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

		if ((CreatureLogic.isHero(props.creature) || (CreatureLogic.isMonster(props.creature) && props.creature.retainer)) && props.autoCalc) {
			const values = props.powerRoll.characteristic.map(ch => CreatureLogic.getCharacteristic(props.creature, ch));
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

		if (props.creature && props.ability) {
			const sections = [];

			// #region Kits

			if (CreatureLogic.isHero(props.creature)) {
				let isMelee = props.ability.keywords.includes(AbilityKeyword.Melee) && props.ability.keywords.includes(AbilityKeyword.Weapon);
				let isRanged = props.ability.keywords.includes(AbilityKeyword.Ranged) && props.ability.keywords.includes(AbilityKeyword.Weapon);
				if (props.autoCalc && distance) {
					isMelee = distance === AbilityDistanceType.Melee;
					isRanged = distance === AbilityDistanceType.Ranged;
				}

				const dmgKits = HeroLogic
					.getKitDamageBonuses(props.creature)
					.filter(dmg => {
						switch (dmg.type) {
							case 'melee':
								return isMelee;
							case 'ranged':
								return isRanged;
						}
					});

				// Show bonuses from kits if:
				// * AutoCalc is off
				// * we have more than 1 bonus
				// * the ability can be used as melee and ranged
				// ... because otherwise it should have already been applied
				const showKitBonuses = !props.autoCalc || (dmgKits.length > 1) || (isMelee && isRanged);
				if (showKitBonuses) {
					dmgKits.forEach((bonus, n) => {
						sections.push(
							<Field
								key={`kit-${n}`}
								label={`${bonus.name}`}
								value={`+${bonus.tier1} / +${bonus.tier2} / +${bonus.tier3} ${bonus.type} damage`}
							/>
						);
					});
				}
			}

			// #endregion

			// #region Damage bonuses

			if (!props.autoCalc && CreatureLogic.isHero(props.creature)) {
				HeroLogic
					.getFeatureDamageBonuses(props.creature, props.ability)
					.forEach((bonus, n) => {
						const value = `${bonus.value} ${bonus.type}`;
						sections.push(<Field key={`feature-${n}`} label={bonus.feature} value={value} />);
					});
			}

			// #endregion

			// #region Potency

			if (!props.autoCalc && CreatureLogic.isHero(props.creature)) {
				const usesPotency = AbilityLogic.usesPotency(props.powerRoll);
				if (usesPotency) {
					const weak = HeroLogic.getPotency(props.creature, 'weak');
					const avg = HeroLogic.getPotency(props.creature, 'average');
					const strong = HeroLogic.getPotency(props.creature, 'strong');
					sections.push(
						<Field
							key='potency'
							label='Potency'
							value={`weak ${weak}, average ${avg}, strong ${strong}`}
						/>
					);
				}
			}

			// #endregion

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
		if (props.autoCalc && props.ability) {
			return AbilityLogic.getTierEffectCreature(value, tier, props.ability, distance, props.creature);
		}

		return value;
	};

	const footer = getFooter();

	return (
		<ErrorBoundary>
			<div className='power-roll-panel'>
				<div className='power-roll-row power-roll-header'>
					{getHeader()}
					<Space onClick={e => e.stopPropagation()}>
						{
							props.autoCalc && props.ability && (props.ability.distance.length > 1) ?
								<Segmented
									options={props.ability.distance.map(d => d.type)}
									value={distance}
									onChange={setDistance}
								/>
								: null
						}
						{
							props.odds ?
								<Button
									type='text'
									title='Odds'
									icon={<BarChartOutlined style={showOdds ? { color: 'rgb(22, 119, 255)' } : undefined} />}
									onClick={() => setShowOdds(!showOdds)}
								/>
								: null
						}
					</Space>
				</div>
				<div className={props.highlightTier === 1 ? 'power-roll-row highlight-row' : 'power-roll-row'}>
					<div className='tier'>≤ 11</div>
					<div className='effect'><Markdown text={getTier(1, props.powerRoll.tier1)} /></div>
					{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => n === 1).length}%</div> : null}
				</div>
				<div className={props.highlightTier === 2 ? 'power-roll-row highlight-row' : 'power-roll-row'}>
					<div className='tier'>12 - 16</div>
					<div className='effect'><Markdown text={getTier(2, props.powerRoll.tier2)} /></div>
					{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => n === 2).length}%</div> : null}
				</div>
				<div className={props.highlightTier === 3 ? 'power-roll-row highlight-row' : 'power-roll-row'}>
					<div className='tier'>≥ 17</div>
					<div className='effect'><Markdown text={getTier(3, props.powerRoll.tier3)} /></div>
					{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => props.powerRoll.crit ? n === 3 : n >= 3).length}%</div> : null}
				</div>
				{
					props.powerRoll.crit ?
						<div className={props.highlightTier === 4 ? 'power-roll-row highlight-row' : 'power-roll-row'}>
							<div className='tier'>Crit</div>
							<div className='effect'><Markdown text={getTier(4, props.powerRoll.crit)} /></div>
							{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => n === 4).length}%</div> : null}
						</div>
						: null
				}
				{footer ? <div className='power-roll-row power-roll-footer'>{footer}</div> : null}
			</div>
		</ErrorBoundary>
	);
};
