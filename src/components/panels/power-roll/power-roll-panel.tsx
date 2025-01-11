import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { Ability } from '../../../models/ability';
import { AbilityLogic } from '../../../logic/ability-logic';
import { Button } from 'antd';
import { Characteristic } from '../../../enums/characteristic';
import { Collections } from '../../../utils/collections';
import { Field } from '../../controls/field/field';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import type { PowerRoll } from '../../../models/power-roll';
import { useState } from 'react';

import './power-roll-panel.scss';

interface Props {
	powerRoll: PowerRoll;
	ability?: Ability;
	hero?: Hero;
	test?: boolean;
}

export const PowerRollPanel = (props: Props) => {
	const [ autoCalc, setAutoCalc ] = useState<boolean>(true);

	const dmgMelee = props.ability && props.hero ? HeroLogic.getMeleeDamageBonus(props.hero, props.ability) : null;
	const dmgRanged = props.ability && props.hero ? HeroLogic.getRangedDamageBonus(props.hero, props.ability) : null;
	const usesPotency = AbilityLogic.usesPotency(props.powerRoll);

	const getHeader = () => {
		if (props.test) {
			return (props.powerRoll.characteristic.length > 0) ? `${props.powerRoll.characteristic.join(' or ')} Test` : 'Test';
		}

		if (props.hero && autoCalc) {
			const values = props.powerRoll.characteristic.map(ch => HeroLogic.getCharacteristic(props.hero!, ch));
			const bonus = Collections.max(values, v => v) || 0;
			const sign = bonus >= 0 ? '+' : '';
			return `2d10 ${sign} ${bonus}`;
		}

		if (props.powerRoll.characteristic.length > 0) {
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
			if (autoCalc) {
				// Show melee and ranged damage only if we have both and they're different
				if (dmgMelee && dmgRanged) {
					if ((dmgMelee.tier1 !== dmgRanged.tier1) || (dmgMelee.tier2 !== dmgRanged.tier2) || (dmgMelee.tier3 !== dmgRanged.tier3)) {
						sections.push(<Field key='melee' label='Bonus melee damage' value={`+${dmgMelee.tier1} / +${dmgMelee.tier2} / +${dmgMelee.tier3}`} />);
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
		if (!autoCalc) {
			return value;
		}

		if (!props.hero) {
			return value;
		}

		return value
			.split(';')
			.map(section => section.trim())
			.map(section => {
				if (section.toLowerCase().includes('damage') || section.toLowerCase().includes('dmg')){
					// Modify section to calculate characteristic bonuses
					let value = 0;
					let sign = '+';
					const dice: string[] = [];
					const characteristics: Characteristic[] = [];
					const types: string[] = [];

					if (dmgMelee && !dmgRanged) {
						switch (tier) {
							case 1:
								value += dmgMelee.tier1;
								break;
							case 2:
								value += dmgMelee.tier2;
								break;
							case 3:
								value += dmgMelee.tier3;
								break;
						}
					}
					if (!dmgMelee && dmgRanged) {
						switch (tier) {
							case 1:
								value += dmgRanged.tier1;
								break;
							case 2:
								value += dmgRanged.tier2;
								break;
							case 3:
								value += dmgRanged.tier3;
								break;
						}
					}
					if (dmgMelee && dmgRanged && (dmgMelee.tier1 === dmgRanged.tier1) && (dmgMelee.tier2 === dmgRanged.tier2) && (dmgMelee.tier3 === dmgRanged.tier3)) {
						switch (tier) {
							case 1:
								value += dmgMelee.tier1;
								break;
							case 2:
								value += dmgMelee.tier2;
								break;
							case 3:
								value += dmgMelee.tier3;
								break;
						}
					}

					section.toLowerCase().split(' ').forEach(token => {
						if ((token === 'damage') || (token === 'dmg')) {
							// Damage; ignore
						} else if (token === 'or') {
							// Ignore
						} else if (/\d+d\d+/.test(token)) {
							dice.push(token);
						} else if (!isNaN(parseInt(token))) {
							value += parseInt(token);
						} else if ((token === '+') || (token === '-')) {
							sign = token;
						} else if ((token === 'might') || (token === 'm')) {
							characteristics.push(Characteristic.Might);
						} else if ((token === 'agility') || (token === 'a')) {
							characteristics.push(Characteristic.Agility);
						} else if ((token === 'reason') || (token === 'r')) {
							characteristics.push(Characteristic.Reason);
						} else if ((token === 'intuition') || (token === 'i')) {
							characteristics.push(Characteristic.Intuition);
						} else if ((token === 'presence') || (token === 'p')) {
							characteristics.push(Characteristic.Presence);
						} else {
							types.push(token);
						}
					});

					const charValues = characteristics.map(ch => HeroLogic.getCharacteristic(props.hero!, ch));
					const maxCharValue = Collections.max(charValues, n => n) || 0;
					let total: number | string = sign === '+' ? value + maxCharValue : value - maxCharValue;
					if (dice.length > 0) {
						total = `${dice.join(' + ')} + ${total}`;
					}
					const damage = [ ...types, 'damage' ].join(' ');
					return `${total} ${damage}`;
				}

				if (section.toLowerCase().includes('weak') || section.toLowerCase().includes('average') || section.toLowerCase().includes('avg') || section.toLowerCase().includes('strong')) {
					// Modify text to remove weak / average / strong
					const weak = HeroLogic.calculatePotency(props.hero!, 'weak').toString();
					const avg = HeroLogic.calculatePotency(props.hero!, 'average').toString();
					const strong = HeroLogic.calculatePotency(props.hero!, 'strong').toString();
					return section
						.replace(/weak/, weak)
						.replace(/average/, avg)
						.replace(/avg/, avg)
						.replace(/strong/, strong);
				}

				return section;
			})
			.join('; ');
	};

	try {
		const header = getHeader();
		const footer = getFooter();

		return (
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
				{
					props.ability && props.hero ?
						<Button
							className='autocalc-btn'
							type='text'
							icon={autoCalc ? <ThunderboltFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <ThunderboltOutlined />}
							onClick={e => {
								e.stopPropagation();
								setAutoCalc(!autoCalc);
							}}
						/>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
