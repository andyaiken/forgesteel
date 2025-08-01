import { AbilityData } from '../../../data/ability-data';
import { AbilityPanel } from '../elements/ability-panel/ability-panel';
import { Divider } from 'antd';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';

import './standard-abilities-panel.scss';

interface Props {
	hero: Hero;
}

export const StandardAbilitiesPanel = (props: Props) => {
	try {
		return (
			<div className='standard-abilities-panel'>
				<div className='standard-abilities-page' id='mains'>
					<div className='standard-abilities-row'>
						<AbilityPanel ability={AbilityData.charge} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.defend} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.freeStrike} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.heal} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.swap} hero={props.hero} mode={PanelMode.Full} />
						<div className='blank-panel' />
					</div>
					<Divider />
					<div className='standard-abilities-row'>
						<AbilityPanel ability={AbilityData.advance} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.disengage} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.ride} hero={props.hero} mode={PanelMode.Full} />
						<div className='blank-panel' />
						<AbilityPanel ability={AbilityData.opportunityAttack} hero={props.hero} mode={PanelMode.Full} />
					</div>
				</div>
				<Divider />
				<div className='standard-abilities-page' id='maneuvers'>
					<div className='standard-abilities-row'>
						<AbilityPanel ability={AbilityData.aidAttack} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.catchBreath} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.hide} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.standUp} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.escapeGrab} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.goProne} hero={props.hero} mode={PanelMode.Full} />
					</div>
					<div className='standard-abilities-row'>
						<AbilityPanel ability={AbilityData.grab} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.knockback} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.makeAssistTest} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.search} hero={props.hero} mode={PanelMode.Full} />
						<AbilityPanel ability={AbilityData.useConsumable} hero={props.hero} mode={PanelMode.Full} />
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
