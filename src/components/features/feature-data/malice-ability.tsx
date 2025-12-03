import { Ability } from '@/models/ability';
import { AbilityEditPanel } from '@/components/panels/edit/ability-edit/ability-edit-panel';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureMaliceAbilityData } from '@/models/feature';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface EditProps {
	data: FeatureMaliceAbilityData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureMaliceAbilityData) => void;
}

export const EditMaliceAbility = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureMaliceAbilityData>(Utils.copy(props.data));

	const setEchelon = (value: number) => {
		const copy = Utils.copy(data);
		copy.echelon = value;
		setData(copy);
		props.setData(copy);
	};

	const setAbility = (value: Ability) => {
		const copy = Utils.copy(data);
		copy.ability = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Echelon</HeaderText>
			<NumberSpin min={1} max={4} value={data.echelon} onChange={setEchelon} />
			<Expander title={data.ability.name || 'Unnamed Ability'}>
				<AbilityEditPanel
					ability={data.ability}
					onChange={setAbility}
				/>
			</Expander>
		</Space>
	);
};
