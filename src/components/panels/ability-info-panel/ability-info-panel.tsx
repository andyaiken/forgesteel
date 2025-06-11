import { Ability } from '../../../models/ability';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { AbilityLogic } from '../../../logic/ability-logic';
import { AbilityUsage } from '../../../enums/ability-usage';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { Hero } from '../../../models/hero';

import './ability-info-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	showAbilityName?: boolean;
	showAbilityType?: boolean;
}

export const AbilityInfoPanel = (props: Props) => {
	try {
		const getMonogram = () => {
			let monogram = '';

			switch (props.ability.type.usage) {
				case AbilityUsage.Action:
					monogram = 'action';
					break;
				case AbilityUsage.Maneuver:
					monogram = 'maneuver';
					break;
				case AbilityUsage.Trigger:
					monogram = 'trigger';
					break;
				case AbilityUsage.Move:
					monogram = 'move';
					break;
				case AbilityUsage.VillainAction:
					monogram = 'villain';
					break;
			}

			if (props.ability.type.free) {
				monogram = 'free';
			}

			if (props.ability.keywords.includes(AbilityKeyword.Routine)) {
				monogram = 'routine';
			}

			return monogram;
		};

		const type = FormatLogic.getAbilityType(props.ability.type);
		const distance = props.ability.distance.map(d => AbilityLogic.getDistance(d, props.ability, props.hero)).join(' or ');
		const monogram = getMonogram();

		return (
			<div className='ability-info-panel'>
				{
					props.showAbilityName && props.ability.name ?
						<div className='ds-text compact-text bold-text'>{props.ability.name}</div>
						: null
				}
				{
					props.showAbilityType ?
						<div className='ds-text compact-text bold-text'>{type}</div>
						: null
				}
				{
					props.ability.type.trigger ?
						<Field
							compact={true}
							label='Trigger'
							value={props.ability.type.trigger}
						/>
						: null
				}
				{
					distance ?
						<Field
							compact={true}
							label={props.ability.target !== distance ? 'Distance' : 'Distance / Target'}
							value={distance}
						/>
						: null
				}
				{
					props.ability.target && (props.ability.target !== distance) ?
						<Field
							compact={true}
							label='Target'
							value={props.ability.target}
						/>
						: null
				}
				{
					monogram ?
						<div className={`sash ${monogram}`}>{monogram}</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
