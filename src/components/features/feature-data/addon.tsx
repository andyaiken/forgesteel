import { Segmented, Space } from 'antd';
import { FeatureAddOnData } from '@/models/feature';
import { FeatureAddOnType } from '@/enums/feature-addon-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface EditProps {
	data: FeatureAddOnData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureAddOnData) => void;
}

export const EditAddOn = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureAddOnData>(Utils.copy(props.data));

	const setAddOnType = (value: FeatureAddOnType) => {
		const copy = Utils.copy(data);
		copy.category = value;
		setData(copy);
		props.setData(copy);
	};

	const setCost = (value: number) => {
		const copy = Utils.copy(data);
		copy.cost = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Category</HeaderText>
			<Segmented
				name='categorytypes'
				block={true}
				options={[ FeatureAddOnType.Mobility, FeatureAddOnType.Defensive, FeatureAddOnType.Offensive, FeatureAddOnType.Supernatural ].map(o => ({ value: o, label: o }))}
				value={data.category}
				onChange={setAddOnType}
			/>

			<HeaderText>Cost</HeaderText>
			<NumberSpin min={1} value={data.cost} onChange={setCost} />
		</Space>
	);
};
