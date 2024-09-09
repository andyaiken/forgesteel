import { HeroClass } from '../../../models/class';
import { PanelMode } from '../../../enums/panel-mode';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass;
	mode?: PanelMode;
}

export const ClassPanel = (props: Props) => {
	return (
		<div className='class-panel'>
			<div className='header-text'>{props.heroClass.name}</div>
			<div className='description-text'>{props.heroClass.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div>
						<div className='ds-text'>Stamina: {props.heroClass.startingStamina} / {props.heroClass.staminaPerLevel}</div>
						<div className='ds-text'>Recoveries: {props.heroClass.recoveries}</div>
						<div className='ds-text'>Primary Characteristics: {props.heroClass.primaryCharacteristics.join(', ')}</div>
						<div className='ds-text'>Heroic Resource: {props.heroClass.heroicResource}</div>
						<div className='ds-text'>Subclasses: {props.heroClass.subclasses.map(c => c.name).join(', ')}</div>
					</div>
					: null
			}
		</div>
	);
};
