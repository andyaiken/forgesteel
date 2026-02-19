import { Feature, FeatureBonusData } from '@/models/feature';
import { Select, Space } from 'antd';
import { Characteristic } from '@/enums/characteristic';
import { FeatureField } from '@/enums/feature-field';
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
	data: FeatureBonusData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoBonus = (props: InfoProps) => {
	return (
		<Field label={props.data.field} value={FormatLogic.getModifier(props.data)} />
	);
};

interface EditProps {
	data: FeatureBonusData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureBonusData) => void;
}

export const EditBonus = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureBonusData>(Utils.copy(props.data));

	const setField = (value: FeatureField) => {
		const copy = Utils.copy(data);
		copy.field = value;
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
			<HeaderText>Field</HeaderText>
			<Select
				style={{ width: '100%' }}
				placeholder='Select field'
				options={[ FeatureField.AncestryPoints, FeatureField.Disengage, FeatureField.ForcedMovementPush, FeatureField.ForcedMovementPull, FeatureField.ForcedMovementSlide, FeatureField.ProjectPoints, FeatureField.Recoveries, FeatureField.RecoveryValue, FeatureField.Renown, FeatureField.Save, FeatureField.Speed, FeatureField.Stability, FeatureField.Stamina, FeatureField.Wealth ].map(o => ({ value: o }))}
				optionRender={option => <div className='ds-text'>{option.data.value}</div>}
				value={data.field}
				onChange={setField}
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
