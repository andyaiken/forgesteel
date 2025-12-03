import { Feature, FeatureSaveThresholdData } from '@/models/feature';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSaveThresholdData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoSaveThreshold = (props: InfoProps) => {
	if (!props.feature.description) {
		return (
			<Field label='Value' value={`${props.data.value}+`} />
		);
	}

	return null;
};

interface EditProps {
	data: FeatureSaveThresholdData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureSaveThresholdData) => void;
}

export const EditSaveThreshold = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSaveThresholdData>(Utils.copy(props.data));

	const setSaveThreshold = (value: number) => {
		const copy = Utils.copy(data);
		copy.value = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Save Threshold</HeaderText>
			<NumberSpin min={1} value={data.value} onChange={setSaveThreshold} />
		</Space>
	);
};
