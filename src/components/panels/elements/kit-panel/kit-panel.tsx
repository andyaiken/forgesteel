import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Kit } from '../../../../models/kit';
import { KitType } from '../../../../enums/kit';
import { PanelMode } from '../../../../enums/panel-mode';
import { Utils } from '../../../../utils/utils';

import './kit-panel.scss';

interface Props {
	kit: Kit;
	hero?: Hero;
	mode?: PanelMode;
}

export const KitPanel = (props: Props) => {
	try {
		return (
			<div className='kit-panel' id={props.mode === PanelMode.Full ? props.kit.id : undefined}>
				<HeaderText level={1} tags={props.kit.type === KitType.Standard ? [] : [ props.kit.type ]}>{props.kit.name || 'Unnamed Kit'}</HeaderText>
				{props.kit.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.kit.description) }} /> : null}
				{
					props.mode === PanelMode.Full ?
						<div>
							<Field label='Type' value={props.kit.type} />
							{props.kit.armor.length > 0 ? <Field label='Armor' value={props.kit.armor.join(', ')} /> : null}
							{props.kit.weapon.length > 0 ? <Field label='Weapon' value={props.kit.weapon.join(', ')} /> : null}
							{props.kit.stamina > 0 ? <Field label='Stamina' value={`+${props.kit.stamina}`} /> : null}
							{props.kit.speed > 0 ? <Field label='Speed' value={`+${props.kit.speed}`} /> : null}
							{props.kit.stability > 0 ? <Field label='Stability' value={`+${props.kit.stability}`} /> : null}
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
							{props.kit.meleeDistance > 0 ? <Field label='Melee Distance' value={`+${props.kit.meleeDistance}`} /> : null}
							{props.kit.rangedDistance > 0 ? <Field label='Ranged Distance' value={`+${props.kit.rangedDistance}`} /> : null}
							{props.kit.disengage > 0 ? <Field label='Disengage' value={`+${props.kit.disengage}`} /> : null}
							{
								props.kit.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />)
							}
						</div>
						:
						<Field label='Uses' value={[ ...props.kit.armor, ...props.kit.weapon ].join(', ')} />
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
