import { Button, Segmented, Space } from 'antd';
import { Ability } from '@/models/ability';
import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityLogic } from '@/logic/ability-logic';
import { BarChartOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { CreatureLogic } from '@/logic/creature-logic';
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
			let bonus;
			if (props.ability) {
				bonus = AbilityLogic.getPowerRollBonusValue(props.ability, props.creature);
			} else {
				const values = props.powerRoll.characteristic.map(ch => CreatureLogic.getCharacteristic(props.creature, ch));
				bonus = Collections.max(values, v => v) || 0;
			}
			const sign = bonus >= 0 ? '+' : '';
			return `2d10 ${sign} ${bonus}`;
		}

		let rollCharacteristics = props.powerRoll.characteristic;
		if (props.ability) {
			rollCharacteristics = AbilityLogic.getPowerRollCharacteristics(props.ability, props.creature);
		}

		if (rollCharacteristics.length > 0) {
			if (rollCharacteristics.length === 0) {
				return 'Power Roll';
			}
			if (rollCharacteristics.length === 5) {
				return 'Power Roll + Highest Characteristic';
			}
			return `Power Roll + ${rollCharacteristics.join(' or ')}`;
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
				const keywords = AbilityLogic.getKeywords(props.ability, props.creature);
				let isMelee = keywords.includes(AbilityKeyword.Melee) && keywords.includes(AbilityKeyword.Weapon);
				let isRanged = keywords.includes(AbilityKeyword.Ranged) && keywords.includes(AbilityKeyword.Weapon);
				if (props.autoCalc && distance) {
					isMelee = distance === AbilityDistanceType.Melee;
					isRanged = distance === AbilityDistanceType.Ranged;
				}

				const kitBonuses = [
					isMelee ? HeroLogic.getKitDamageBonus(props.creature, 'melee') : null,
					isRanged ? HeroLogic.getKitDamageBonus(props.creature, 'ranged') : null
				].filter(bonus => bonus !== null);

				// Auto-calculated rolls already include the selected mode's bonus. If the ability
				// has no selected mode, keep both applicable bonuses visible as a reference.
				const showKitBonuses = !props.autoCalc || (isMelee && isRanged);
				if (showKitBonuses) {
					kitBonuses.forEach((bonus, n) => {
						const format = (value: number) => value > 0 ? `+${value}` : `${value}`;
						sections.push(
							<Field
								key={`kit-${n}`}
								label={`${bonus.name}`}
								value={`${format(bonus.tier1)} / ${format(bonus.tier2)} / ${format(bonus.tier3)} ${bonus.type} damage`}
							/>
						);
					});
				}
			}

			// #endregion

			// #region Damage bonuses

			if (!props.autoCalc && CreatureLogic.isHero(props.creature)) {
				HeroLogic
					.getFeatureDamageBonuses(props.creature, props.ability, distance)
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
								icon={<BarChartOutlined style={showOdds ? { color: 'var(--fs-accent)' } : undefined} />}
								onClick={() => setShowOdds(!showOdds)}
							/>
							: null
					}
				</Space>
			</div>
			<div className={props.highlightTier === 1 ? 'power-roll-row highlight-row' : 'power-roll-row'}>
				<div className='tier'>!</div>
				<div className='effect'><Markdown text={getTier(1, props.powerRoll.tier1)} /></div>
				{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => n === 1).length}%</div> : null}
			</div>
			<div className={props.highlightTier === 2 ? 'power-roll-row highlight-row' : 'power-roll-row'}>
				<div className='tier'>@</div>
				<div className='effect'><Markdown text={getTier(2, props.powerRoll.tier2)} /></div>
				{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => n === 2).length}%</div> : null}
			</div>
			<div className={props.highlightTier === 3 ? 'power-roll-row highlight-row' : 'power-roll-row'}>
				<div className='tier'>#</div>
				<div className='effect'><Markdown text={getTier(3, props.powerRoll.tier3)} /></div>
				{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => n === 3).length}%</div> : null}
			</div>
			{footer ? <div className='power-roll-row power-roll-footer'>{footer}</div> : null}
		</div>
	);
};
