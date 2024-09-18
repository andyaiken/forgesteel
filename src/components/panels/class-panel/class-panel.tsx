import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { HeroClass } from '../../../models/class';
import { PanelMode } from '../../../enums/panel-mode';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass;
	mode?: PanelMode;
}

export const ClassPanel = (props: Props) => {
	try {
		return (
			<div className='class-panel'>
				<HeaderText>{props.heroClass.name}</HeaderText>
				<div className='ds-text description-text'>{props.heroClass.description}</div>
				<Field label='Heroic Resource' value={props.heroClass.heroicResource} />
				<Field label={`${props.heroClass.subclassName}s`} value={props.heroClass.subclasses.map(c => c.name).join(', ')} />
				{
					props.mode === PanelMode.Full ?
						<div>
							<Field label='Stamina' value={`${props.heroClass.startingStamina} / ${props.heroClass.staminaPerLevel}`} />
							<Field label='Recoveries' value={props.heroClass.recoveries} />
							<Field label='Primary Characteristics' value={props.heroClass.primaryCharacteristics.join(', ')} />
							{
								props.heroClass.featuresByLevel.map(lvl => (
									<div key={lvl.level}>
										<HeaderText>{`Level ${lvl.level}`}</HeaderText>
										<Field label='Features' value={lvl.features.map(f => f.name).join(', ')} />
									</div>
								))
							}
						</div>
						:
						null
				}
			</div>
		);
	} catch {
		return null;
	}
};
