import { Feature, FeatureAbilityCostData } from '@/models/feature';
import { Select, Space } from 'antd';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityLogic } from '@/logic/ability-logic';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureAbilityCostData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoAbilityCost = (props: InfoProps) => {
	return (
		<Field label={props.data.keywords.join(', ')} value={`Heroic resource cost ${props.data.modifier >= 0 ? '+' : ''}${props.data.modifier}`} />
	);
};

interface EditProps {
	data: FeatureAbilityCostData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureAbilityCostData) => void;
}

export const EditAbilityCost = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureAbilityCostData>(Utils.copy(props.data));

	const setKeywords = (value: AbilityKeyword[]) => {
		const copy = Utils.copy(data);
		copy.keywords = value;
		setData(copy);
		props.setData(copy);
	};

	const setModifier = (value: number) => {
		const copy = Utils.copy(data);
		copy.modifier = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Keywords</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select keywords'
				mode='multiple'
				allowClear={true}
				options={AbilityLogic.getKeywords().map(o => ({ value: o }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.keywords}
				onChange={setKeywords}
			/>
			<HeaderText>Modifier</HeaderText>
			<NumberSpin value={data.modifier} onChange={setModifier} />
		</Space>
	);
};
