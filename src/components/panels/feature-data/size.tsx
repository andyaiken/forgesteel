import { Feature, FeatureSizeData } from '@/models/feature';
import { Segmented, Space } from 'antd';
import { Field } from '@/components/controls/field/field';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSizeData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoSize = (props: InfoProps) => {
	return (
		<Field label='Size' value={FormatLogic.getSize(props.data.size)} />
	);
};

interface EditProps {
	data: FeatureSizeData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureSizeData) => void;
}

export const EditSize = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSizeData>(Utils.copy(props.data));

	const setSizeValue = (value: number) => {
		const copy = Utils.copy(data);
		copy.size.value = value;
		setData(copy);
		props.setData(copy);
	};

	const setSizeMod = (value: '' | 'T' | 'S' | 'M' | 'L') => {
		const copy = Utils.copy(data);
		copy.size.mod = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Size</HeaderText>
			<NumberSpin min={1} value={data.size.value} onChange={setSizeValue} />
			{
				data.size.value === 1 ?
					<HeaderText>Modifier</HeaderText>
					: null
			}
			{
				data.size.value === 1 ?
					<Segmented<'' | 'T' | 'S' | 'M' | 'L'>
						name='sizemodtypes'
						block={true}
						options={[ 'T', 'S', 'M', 'L' ]}
						value={data.size.mod}
						onChange={setSizeMod}
					/>
					: null
			}
		</Space>
	);
};
