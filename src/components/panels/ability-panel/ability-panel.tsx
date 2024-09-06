import { Ability } from '../../../models/ability';
import { PanelMode } from '../../../enums/panel-mode';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	mode?: PanelMode;
}

export const AbilityPanel = (props: Props) => {
	return (
		<div className='ability-panel'>
			<div className='header-text'>{props.ability.name}</div>
			<div className='description-text'>{props.ability.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div className='ds-text'>DETAILS</div>
					: null
			}
		</div>
	);
};
