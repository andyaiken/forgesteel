import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { Kit } from '../../../models/kit';
import { PanelMode } from '../../../enums/panel-mode';
import { Sourcebook } from '../../../models/sourcebook';
import { Utils } from '../../../utils/utils';

import './kit-panel.scss';

interface Props {
	kit: Kit;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const KitPanel = (props: Props) => {
	try {
		return (
			<div className='kit-panel' id={props.mode === PanelMode.Full ? props.kit.id : undefined}>
				<HeaderText level={1} tags={[ props.kit.type ]}>{props.kit.name || 'Unnamed Kit'}</HeaderText>
				{props.kit.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.kit.description) }} /> : null}
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
								props.kit.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)
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
