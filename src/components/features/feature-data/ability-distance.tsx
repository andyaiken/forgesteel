import { Feature, FeatureAbilityDistanceData } from '@/models/feature';
import { Select, Space } from 'antd';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityLogic } from '@/logic/ability-logic';
import { Characteristic } from '@/enums/characteristic';
import { Field } from '@/components/controls/field/field';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { ModifierEditor } from '@/components/panels/edit/modifier-edit/modifier-edit-panel';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureAbilityDistanceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoAbilityDistance = (props: InfoProps) => {
	return (
		<Field label={props.data.keywords.join(', ')} value={`${FormatLogic.getModifier(props.data)} distance`} />
	);
};

interface EditProps {
	data: FeatureAbilityDistanceData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureAbilityDistanceData) => void;
}

export const EditAbilityDistance = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureAbilityDistanceData>(Utils.copy(props.data));

	const setKeywords = (value: AbilityKeyword[]) => {
		const copy = Utils.copy(data);
		copy.keywords = value;
		setData(copy);
		props.setData(copy);
	};

	const setValue = (value: number) => {
		const copy = Utils.copy(data);
		copy.value = value;
		setData(copy);
		props.setData(copy);
	};

	const setValuePerLevel = (value: number) => {
		const copy = Utils.copy(data);
		copy.valuePerLevel = value;
		setData(copy);
		props.setData(copy);
	};

	const setValuePerEchelon = (value: number) => {
		const copy = Utils.copy(data);
		copy.valuePerEchelon = value;
		setData(copy);
		props.setData(copy);
	};

	const setValueCharacteristics = (value: Characteristic[]) => {
		const copy = Utils.copy(data);
		copy.valueCharacteristics = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Keywords</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select keywords'
				mode='tags'
				allowClear={true}
				options={AbilityLogic.getKeywords().map(o => ({ value: o }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.keywords}
				onChange={setKeywords}
			/>
			<HeaderText>Value</HeaderText>
			<ModifierEditor
				modifier={data}
				setValue={setValue}
				setValuePerLevel={setValuePerLevel}
				setValuePerEchelon={setValuePerEchelon}
				setValueCharacteristics={setValueCharacteristics}
			/>
		</Space>
	);
};
