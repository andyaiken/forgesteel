import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureRollModifier } from '@/models/feature';
import { RollModifierMarker } from '@/components/controls/roll-modifier-marker/roll-modifier-marker';

import './roll-modifier-panel.scss';

interface Props {
	modifier: FeatureRollModifier;
}

export const RollModifierPanel = (props: Props) => {
	return (
		<div className='roll-modifier-panel'>
			<RollModifierMarker modifier={props.modifier.data.modifier} />
			<div className='roll-modifier-text'>
				<div className='scope'>
					{FeatureLogic.getRollModifierScope(props.modifier.data)}
				</div>
				{
					props.modifier.data.condition ?
						<div className='condition'>{props.modifier.data.condition}</div>
						: null
				}
			</div>
			<div className='roll-modifier-source'>
				{props.modifier.name}
			</div>
		</div>
	);
};
