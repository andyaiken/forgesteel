import { Feature, FeatureTaggedFeatureData } from '@/models/feature';
import { Input, Space } from 'antd';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureTaggedFeatureData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoTaggedFeature = (props: InfoProps) => {
	return (
		<FeaturePanel key={props.data.feature.id} feature={props.data.feature} options={props.options} />
	);
};

interface EditProps {
	data: FeatureTaggedFeatureData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureTaggedFeatureData) => void;
}

export const EditTaggedFeature = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureTaggedFeatureData>(Utils.copy(props.data));

	const setTag = (value: string) => {
		const copy = Utils.copy(data);
		copy.tag = value;
		setData(copy);
		props.setData(copy);
	};

	const setTaggedFeature = (value: Feature) => {
		const copy = Utils.copy(data);
		copy.feature = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<HeaderText>Tag</HeaderText>
			<Input
				status={data.tag === '' ? 'warning' : ''}
				placeholder='Tag'
				allowClear={true}
				value={data.tag}
				onChange={e => setTag(e.target.value)}
			/>
			<Expander title='Feature'>
				<FeatureEditPanel
					feature={data.feature}
					sourcebooks={props.sourcebooks}
					options={props.options}
					onChange={setTaggedFeature}
				/>
			</Expander>
		</Space>
	);
};
