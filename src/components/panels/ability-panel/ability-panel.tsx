import { Ability } from '../../../models/ability';

import './ability-panel.scss';

interface Props {
	ability: Ability
}

export const AbilityPanel = (props: Props) => {
	return (
		<div className='ability-panel'>
			{props.ability.name}
		</div>
	);
};
