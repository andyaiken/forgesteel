import { Feature, FeatureForControllerData } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Hero } from '@/models/hero';
import { Sourcebook } from '@/models/sourcebook';
import { Space } from 'antd';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureForControllerData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoForController = (props: InfoProps) => {
	return (
		<FeaturePanel feature={props.data.feature} hero={props.hero} sourcebooks={props.sourcebooks} />
	);
};

interface EditProps {
	data: FeatureForControllerData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureForControllerData) => void;
}

export const EditForController = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureForControllerData>(Utils.copy(props.data));

	const setFeature = (value: Feature) => {
		const copy = Utils.copy(data);
		copy.feature = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<FeatureEditPanel
				feature={props.data.feature}
				sourcebooks={props.sourcebooks}
				onChange={setFeature}
			/>
		</Space>
	);
};
