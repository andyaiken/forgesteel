import { Feature, FeatureConditionImmunityData } from '@/models/feature';
import { Select, Space } from 'antd';
import { ConditionType } from '@/enums/condition-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureConditionImmunityData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoConditionImmunity = (props: InfoProps) => {
	return (
		<Field label='Cannot Be' value={props.data.conditions.join(', ')} />
	);
};

interface EditProps {
	data: FeatureConditionImmunityData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureConditionImmunityData) => void;
}

export const EditConditionImmunity = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureConditionImmunityData>(Utils.copy(props.data));

	const setConditions = (value: ConditionType[]) => {
		const copy = Utils.copy(data);
		copy.conditions = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Conditions</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select conditions'
				mode='multiple'
				allowClear={true}
				options={[ ConditionType.Bleeding, ConditionType.Dazed, ConditionType.Frightened, ConditionType.Grabbed, ConditionType.Prone, ConditionType.Restrained, ConditionType.Slowed, ConditionType.Taunted, ConditionType.Weakened ].map(o => ({ value: o }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.conditions}
				onChange={conditions => setConditions(conditions)}
			/>
		</Space>
	);
};
