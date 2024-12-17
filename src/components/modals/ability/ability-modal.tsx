import { Ability } from '../../../models/ability';
import { AbilityPanel } from '../../panels/ability-panel/ability-panel';
import { DieRollPanel } from '../../panels/die-roll-panel/die-roll-panel';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';

import './ability-modal.scss';

interface Props {
	hero: Hero;
	ability: Ability;
}

export const AbilityModal = (props: Props) => {
	try {
		return (
			<div className='ability-modal'>
				<SelectablePanel>
					<AbilityPanel ability={props.ability} hero={props.hero} mode={PanelMode.Full} />
				</SelectablePanel>
				{
					props.ability.powerRoll ?
						<DieRollPanel hero={props.hero} characteristics={props.ability.powerRoll.characteristic} />
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};