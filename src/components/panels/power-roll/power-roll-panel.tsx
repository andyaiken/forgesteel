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
import { Select } from 'antd';
import { Utils } from '../../../utils/utils';

import './power-roll-panel.scss';

interface Props {
	powerRoll: PowerRoll;
	ability?: Ability;
	hero?: Hero;
	test?: boolean;
	autoCalc?: boolean;
	updateHero?: (hero: Hero) => void;
}

export const PowerRollPanel = (props: Props) => {
	const dmgMelee = props.ability && props.hero ? HeroLogic.getAllMeleeDamageBonus(props.hero, props.ability) : null;
	const dmgRanged = props.ability && props.hero ? HeroLogic.getAllRangedDamageBonus(props.hero, props.ability) : null;

	const activeMeleeBonus = props.ability && props.hero ? HeroLogic.getMeleeDamageBonus(props.hero, props.ability) : null;
	const activeRangedBonus = props.ability && props.hero ? HeroLogic.getRangedDamageBonus(props.hero, props.ability) : null;

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

				const abilityIsMelee = !!props.ability && props.ability.distance.some(d => d.type === AbilityDistanceType.Melee);
				const abilityIsRanged = !!props.ability && props.ability.distance.some(d => d.type === AbilityDistanceType.Ranged);

				// Show melee and ranged damage only if:
				// * we have both, and they're different
				// * we have only one, but the ability has melee and ranged distances
				let showBonuses = false;
				if (dmgMelee && dmgRanged) {
					//one of the two type have ambiguity, so show all bonuses
					if (dmgMelee.length > 1 || dmgRanged.length > 1) {
						showBonuses = true;
					}
					//we either have only 1 of each or there is no ambiguity between all the kits
					if (!showBonuses && activeMeleeBonus && activeRangedBonus) {
						//there is a single melee bonus, show if we have also ranged
						showBonuses = ((activeMeleeBonus.tier1 !== activeRangedBonus.tier1) || (activeMeleeBonus.tier2 !== activeRangedBonus.tier2) || (activeMeleeBonus.tier3 !== activeRangedBonus.tier3));
					}
				}

				if (dmgMelee || dmgRanged) {
					showBonuses = abilityIsMelee && abilityIsRanged;
				}

				if (showBonuses) {
					if (dmgMelee) {
						if (dmgMelee.length > 1) {
							dmgMelee.forEach((kitDmg, idx) => { sections.push(<Field key={`melee${idx}`} label={`${kitDmg.kitName} melee bonus`} value={`+${kitDmg.tier1} / +${kitDmg.tier2} / +${kitDmg.tier3}`} />); });
						} else if (activeMeleeBonus) {
							sections.push(<Field key='melee' label='Bonus melee damage' value={`+${activeMeleeBonus.tier1} / +${activeMeleeBonus.tier2} / +${activeMeleeBonus.tier3}`} />);
						}

					}
					if (dmgRanged) {
						if (dmgRanged.length > 1) {
							dmgRanged.forEach((kitDmg, idx) => { sections.push(<Field key={`ranged${idx}`} label={`${kitDmg.kitName} ranged bonus`} value={`+${kitDmg.tier1} / +${kitDmg.tier2} / +${kitDmg.tier3}`} />); });
						} else if (activeRangedBonus) {
							sections.push(<Field key='ranged' label='Bonus ranged damage' value={`+${activeRangedBonus.tier1} / +${activeRangedBonus.tier2} / +${activeRangedBonus.tier3}`} />);
						}
					}
				} else {
					//if bonus are not shown *but* we have multiple possible bonuses, we display which is currently used
					if (abilityIsMelee && dmgMelee && dmgMelee.length > 1 && activeMeleeBonus) {
						sections.push(
							<Field label='Kit Melee Bonus used' key='kit-used-field-melee' value={activeMeleeBonus.kitName} />
						);

						if (props.updateHero) {
							sections.push(
								<Field label='Set Melee Kit Bonus' key='kit-select-field-melee' value={
									<Select
										key='kit-select-melee'
										status={''}
										allowClear={false}
										placeholder='Select'
										options={dmgMelee.map(dmgBonus => ({ label: dmgBonus.kitName, value: dmgBonus.kitId, desc: '' }))}
										optionRender={option => <Field key={option.data.label} label={option.data.label} value={option.data.desc} />}
										showSearch={false}
										filterOption={(input, option) => { return (option?.label || '').toLowerCase().includes(input.toLowerCase()); }}
										value={activeMeleeBonus.kitName}
										onClick={e => { e.stopPropagation(); }}
										onChange={setMeleeKitUsed} />
								}
								/>
							);
						}
					}

					if (abilityIsRanged && dmgRanged && dmgRanged.length > 1 && activeRangedBonus) {
						sections.push(
							<Field label='Kit Ranged Bonus used' key='kit-used-field-ranged' value={activeRangedBonus.kitName} />
						);

						if (props.updateHero) {
							sections.push(
								<Field label='Set Ranged Kit Bonus' key='kit-select-field-ranged' value={
									<Select
										key='kit-select-ranged'
										status={''}
										allowClear={false}
										placeholder='Select'
										options={dmgRanged.map(dmgBonus => ({ label: dmgBonus.kitName, value: dmgBonus.kitId, desc: '' }))}
										optionRender={option => <Field key={option.data.label} label={option.data.label} value={option.data.desc} />}
										showSearch={false}
										filterOption={(input, option) => { return (option?.label || '').toLowerCase().includes(input.toLowerCase()); }}
										value={activeRangedBonus.kitName}
										onClick={e => { e.stopPropagation(); }}
										onChange={setRangedKitUsed} />
								}
								/>
							);
						}
					}
				}
			} else {
				if (dmgMelee) {
					if (dmgMelee.length > 1) {
						dmgMelee.forEach((kitDmg, idx) => { sections.push(<Field key={`melee${idx}`} label={`${kitDmg.kitName} melee bonus`} value={`+${kitDmg.tier1} / +${kitDmg.tier2} / +${kitDmg.tier3}`} />); });
					} else {
						sections.push(<Field key='melee' label='Bonus melee damage' value={`+${dmgMelee[0].tier1} / +${dmgMelee[0].tier2} / +${dmgMelee[0].tier3}`} />);
					}

				}
				if (dmgRanged) {
					if (dmgRanged.length > 1) {
						dmgRanged.forEach((kitDmg, idx) => { sections.push(<Field key={`ranged${idx}`} label={`${kitDmg.kitName} ranged bonus`} value={`+${kitDmg.tier1} / +${kitDmg.tier2} / +${kitDmg.tier3}`} />); });
					} else {
						sections.push(<Field key='ranged' label='Bonus ranged damage' value={`+${dmgRanged[0].tier1} / +${dmgRanged[0].tier2} / +${dmgRanged[0].tier3}`} />);
					}
				}

				if (usesPotency) {
					const potency = `weak ${HeroLogic.calculatePotency(props.hero, 'weak')}, average ${HeroLogic.calculatePotency(props.hero, 'average')}, strong ${HeroLogic.calculatePotency(props.hero, 'strong')}`;
					sections.push(<Field key='potency' label='Potency' value={potency} />);
				}

				HeroLogic.getFeatures(props.hero)
					.map(f => f.feature)
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

	const setMeleeKitUsed = (kitId: string) => {
		const copy = Utils.copy(props.hero) as Hero;

		copy.state.activeMeleeKitBonusId = kitId;
		if (props.updateHero) {
			props.updateHero(copy);
		}
	};

	const setRangedKitUsed = (kitId: string) => {
		const copy = Utils.copy(props.hero) as Hero;

		copy.state.activeRangedKitBonusId = kitId;
		if (props.updateHero) {
			props.updateHero(copy);
		}
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
