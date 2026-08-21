import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureRollModifier } from '@/models/feature';
import { RollModifierMarker } from '@/components/controls/roll-modifier-marker/roll-modifier-marker';
import { useMemo } from 'react';

import './roll-modifiers-card.scss';

interface Props {
	rollModifiers: FeatureRollModifier[];
}

export const RollModifiersCard = (props: Props) => {
	const rollModifiers = useMemo(
		() => props.rollModifiers,
		[ props.rollModifiers ]
	);

	return (
		<div className='roll-modifiers card'>
			<h2>Roll Modifiers</h2>
			{
				rollModifiers.map(f => (
					<div className='roll-modifier' key={f.id}>
						<div className='roll-modifier-header'>
							<span className='scope'>{FeatureLogic.getRollModifierScope(f.data)}</span>
							<RollModifierMarker modifier={f.data.modifier} />
						</div>
						{
							// Most of these can only be adjudicated at the table, so the condition is the point of the card
							f.data.condition ?
								<div className='condition'>{f.data.condition}</div>
								: null
						}
					</div>
				))
			}
		</div>
	);
};
