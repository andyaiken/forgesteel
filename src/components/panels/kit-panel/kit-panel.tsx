import { AbilityPanel } from '../ability-panel/ability-panel';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Hero } from '../../../models/hero';
import { Kit } from '../../../models/kit';
import { PanelMode } from '../../../enums/panel-mode';

import './kit-panel.scss';

interface Props {
	kit: Kit;
	hero?: Hero;
	mode?: PanelMode;
}

export const KitPanel = (props: Props) => {
	return (
		<div className='kit-panel'>
			<div className='header-text'>{props.kit.name}</div>
			<div className='description-text'>{props.kit.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div>
						{props.kit.armor.length > 0 ? <div className='ds-text'>Armor: {props.kit.armor.join(', ')}</div> : null}
						{props.kit.weapon.length > 0 ? <div className='ds-text'>Weapon: {props.kit.weapon.join(', ')}</div> : null}
						{props.kit.implement.length > 0 ? <div className='ds-text'>Implement: {props.kit.implement.join(', ')}</div> : null}
						{props.kit.stamina > 0 ? <div className='ds-text'>Stamina: +{props.kit.stamina}</div> : null}
						{props.kit.speed > 0 ? <div className='ds-text'>Speed: +{props.kit.speed}</div> : null}
						{props.kit.stability > 0 ? <div className='ds-text'>Stability: +{props.kit.stability}</div> : null}
						{props.kit.distance > 0 ? <div className='ds-text'>Distance: +{props.kit.distance}</div> : null}
						{props.kit.reach > 0 ? <div className='ds-text'>Reach: +{props.kit.reach}</div> : null}
						{props.kit.area > 0 ? <div className='ds-text'>Area: +{props.kit.area}</div> : null}
						{
							props.kit.meleeDamage ?
								<div>Melee Damage: +{props.kit.meleeDamage.tier1} / +{props.kit.meleeDamage.tier2} / +{props.kit.meleeDamage.tier3}</div>
								: null
						}
						{
							props.kit.rangedDamage ?
								<div>Ranged Damage: +{props.kit.rangedDamage.tier1} / +{props.kit.rangedDamage.tier2} / +{props.kit.rangedDamage.tier3}</div>
								: null
						}
						{
							props.kit.magicalDamage ?
								<div>Magical Damage: +{props.kit.magicalDamage.tier1} / +{props.kit.magicalDamage.tier2} / +{props.kit.magicalDamage.tier3}</div>
								: null
						}
						{props.kit.mobility ? <div className='ds-text'>Mobility: Yes</div> : null}
						<AbilityPanel ability={props.kit.signatureAbility} mode={PanelMode.Full} />
						{props.kit.ward ? <FeaturePanel feature={props.kit.ward} hero={props.hero} /> : null}
					</div>
					: null
			}
		</div>
	);
};
