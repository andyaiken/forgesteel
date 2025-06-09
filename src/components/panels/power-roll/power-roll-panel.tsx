import { Button, Segmented, Space } from 'antd';
import { Ability } from '../../../models/ability';
import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { AbilityLogic } from '../../../logic/ability-logic';
import { BarChartOutlined } from '@ant-design/icons';
import { Collections } from '../../../utils/collections';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Field } from '../../controls/field/field';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Markdown } from '../../controls/markdown/markdown';
import { PowerRoll } from '../../../models/power-roll';
import { useState } from 'react';

import './power-roll-panel.scss';

interface Props {
	powerRoll: PowerRoll;
	ability?: Ability;
	hero?: Hero;
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

			let isMelee = props.ability.keywords.includes(AbilityKeyword.Melee) && props.ability.keywords.includes(AbilityKeyword.Weapon);
			let isRanged = props.ability.keywords.includes(AbilityKeyword.Ranged) && props.ability.keywords.includes(AbilityKeyword.Weapon);
			if (props.autoCalc && distance) {
				isMelee = distance === AbilityDistanceType.Melee;
				isRanged = distance === AbilityDistanceType.Ranged;
			}

			const dmgKits = HeroLogic
				.getKitDamageBonuses(props.hero)
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
		if (props.autoCalc && props.ability) {
			return AbilityLogic.getTierEffect(value, tier, props.ability, distance, props.hero);
		}

		return value;
	};

	try {
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
						<div className='tier'>11 -</div>
						<div className='effect'><Markdown text={getTier(1, props.powerRoll.tier1)} /></div>
						{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => n === 1).length}%</div> : null}
					</div>
					<div className={props.highlightTier === 2 ? 'power-roll-row highlight-row' : 'power-roll-row'}>
						<div className='tier'>12 - 16</div>
						<div className='effect'><Markdown text={getTier(2, props.powerRoll.tier2)} /></div>
						{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => n === 2).length}%</div> : null}
					</div>
					<div className={props.highlightTier === 3 ? 'power-roll-row highlight-row' : 'power-roll-row'}>
						<div className='tier'>17 +</div>
						<div className='effect'><Markdown text={getTier(3, props.powerRoll.tier3)} /></div>
						{showOdds && props.odds ? <div className='odds'>{props.odds.filter(n => n >= 3).length}%</div> : null}
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
