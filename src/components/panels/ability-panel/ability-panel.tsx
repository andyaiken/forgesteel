import { Ability } from '../../../models/ability';
import { AbilityLogic } from '../../../logic/ability-logic';
import { Field } from '../../controls/field/field';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { PanelMode } from '../../../enums/panel-mode';
import { Tag } from 'antd';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	mode?: PanelMode;
}

export const AbilityPanel = (props: Props) => {
	const getPowerRoll = () => {
		if (!props.ability.powerRoll) {
			return null;
		}

		let bonus: JSX.Element | null = null;
		if (props.hero) {
			const dmgMelee = HeroLogic.getMeleeDamageBonus(props.hero, props.ability);
			const dmgRanged = HeroLogic.getRangedDamageBonus(props.hero, props.ability);
			const dmgMagic = HeroLogic.getMagicalDamageBonus(props.hero, props.ability);

			if (dmgMelee || dmgRanged || dmgMagic) {
				bonus = (
					<div className='power-roll-row power-roll-footer'>
						<div>
							{dmgMelee ? <Field label='Bonus melee damage' value={`+${dmgMelee.tier1} / +${dmgMelee.tier2} / +${dmgMelee.tier3}`} /> : null}
							{dmgRanged ? <Field label='Bonus ranged damage' value={`+${dmgRanged.tier1} / +${dmgRanged.tier2} / +${dmgRanged.tier3}`} /> : null}
							{dmgMagic ? <Field label='Bonus magical damage' value={`+${dmgMagic.tier1} / +${dmgMagic.tier2} / +${dmgMagic.tier3}`} /> : null}
						</div>
					</div>
				);
			}
		}

		return (
			<div className='power-roll'>
				<div className='power-roll-row power-roll-header'>
					Power Roll + {props.ability.powerRoll.characteristic.join(' or ')}
				</div>
				<div className='power-roll-row'>
					<div className='tier'>11 -</div>
					<div className='effect'>{props.ability.powerRoll.tier1}</div>
				</div>
				<div className='power-roll-row'>
					<div className='tier'>12 - 16</div>
					<div className='effect'>{props.ability.powerRoll.tier2}</div>
				</div>
				<div className='power-roll-row'>
					<div className='tier'>17 +</div>
					<div className='effect'>{props.ability.powerRoll.tier3}</div>
				</div>
				{bonus}
			</div>
		);
	};

	return (
		<div className='ability-panel'>
			<div className='header-text'>
				{props.ability.name}
			</div>
			{
				props.ability.keywords.length > 0 ?
					<div>
						{
							props.ability.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)
						}
					</div>
					: null
			}
			<div className='description-text'>{props.ability.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div>
						<Field label='Type' value={AbilityLogic.getType(props.ability.type)} />
						{props.ability.type.trigger ? <Field label='Trigger' value={props.ability.type.trigger} /> : null}
						{
							props.ability.distance.length > 0 ?
								<Field label='Distance' value={props.ability.distance.map(d => AbilityLogic.getDistance(d, props.hero, props.ability)).join(' or ')} />
								: null
						}
						{props.ability.target ? <Field label='Target' value={props.ability.target} /> : null}
						{props.ability.cost > 0 ? <Field label='Cost' value={props.ability.cost} /> : null}
						{props.ability.preEffect ? <Field label='Effect' value={props.ability.preEffect} /> : null}
						{getPowerRoll()}
						{props.ability.effect ? <Field label='Effect' value={props.ability.effect} /> : null}
						{
							props.ability.spend.map((spend, n) => (
								<Field key={n} label={spend.value ? `Spend ${spend.value}` : 'Spend'} value={spend.effect} />
							))
						}
					</div>
					: null
			}
		</div>
	);
};
