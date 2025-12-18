import { Ability } from '@/models/ability';
import { AbilityEditPanel } from '@/components/panels/edit/ability-edit/ability-edit-panel';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureAbilityData } from '@/models/feature';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface EditProps {
	data: FeatureAbilityData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureAbilityData) => void;
}

export const EditAbilityData = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureAbilityData>(Utils.copy(props.data));

	const setAbility = (value: Ability) => {
		const copy = Utils.copy(data);
		copy.ability = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<div style={{ margin: '10px 0' }}>
			<Expander title={data.ability.name || 'Unnamed Ability'}>
				<AbilityEditPanel
					ability={data.ability}
					onChange={setAbility}
				/>
			</Expander>
		</div>
	);
};
