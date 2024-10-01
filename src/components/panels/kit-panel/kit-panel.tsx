import { AbilityPanel } from '../ability-panel/ability-panel';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
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
	try {
		return (
			<div className='kit-panel'>
				<HeaderText level={1} tags={[ props.kit.type ]}>{props.kit.name}</HeaderText>
				<div className='ds-text description-text'>{props.kit.description}</div>
				{
					props.mode === PanelMode.Full ?
						<div>
							<Field label='Type' value={props.kit.type} />
							{props.kit.armor.length > 0 ? <Field label='Armor' value={props.kit.armor.join(', ')} /> : null}
							{props.kit.weapon.length > 0 ? <Field label='Weapon' value={props.kit.weapon.join(', ')} /> : null}
							{props.kit.implement.length > 0 ? <Field label='Implement' value={props.kit.implement.join(', ')} /> : null}
							{props.kit.stamina > 0 ? <Field label='Stamina' value={`+${props.kit.stamina}`} /> : null}
							{props.kit.speed > 0 ? <Field label='Speed' value={`+${props.kit.speed}`} /> : null}
							{props.kit.stability > 0 ? <Field label='Stability' value={`+${props.kit.stability}`} /> : null}
							{props.kit.distance > 0 ? <Field label='Distance' value={`+${props.kit.distance}`} /> : null}
							{props.kit.reach > 0 ? <Field label='Reach' value={`+${props.kit.reach}`} /> : null}
							{props.kit.area > 0 ? <Field label='Area' value={`+${props.kit.area}`} /> : null}
							{
								props.kit.meleeDamage ?
									<Field label='Melee Damage' value={`+${props.kit.meleeDamage.tier1} / +${props.kit.meleeDamage.tier2} / +${props.kit.meleeDamage.tier3}`} />
									: null
							}
							{
								props.kit.rangedDamage ?
									<Field label='Ranged Damage' value={`+${props.kit.rangedDamage.tier1} / +${props.kit.rangedDamage.tier2} / +${props.kit.rangedDamage.tier3}`} />
									: null
							}
							{
								props.kit.magicalDamage ?
									<Field label='Magical Damage' value={`+${props.kit.magicalDamage.tier1} / +${props.kit.magicalDamage.tier2} / +${props.kit.magicalDamage.tier3}`} />
									: null
							}
							{props.kit.mobility ? <Field label='Mobility' value='Yes' /> : null}
							{
								props.kit.abilities.map(a => <AbilityPanel key={a.id} ability={a} hero={props.hero} mode={PanelMode.Full} />)
							}
							{
								props.kit.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />)
							}
						</div>
						:
						<Field label='Uses' value={[ ...props.kit.armor, ...props.kit.weapon, ...props.kit.implement ].join(', ')} />
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
