import { Feature, FeatureSummonFormationData } from '@/models/feature';
import { FeatureListEditPanel } from '@/components/panels/edit/list-edit/list-edit-panel';
import { Hero } from '@/models/hero';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureSummonFormationData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const InfoSummonFormation = (_props: InfoProps) => {
	return null;
};

interface EditProps {
	data: FeatureSummonFormationData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureSummonFormationData) => void;
}

export const EditSummonFormation = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureSummonFormationData>(Utils.copy(props.data));

	const onChange = (features: Feature[]) => {
		const copy = Utils.copy(data);
		copy.minionFeatures = Utils.copy(features);
		setData(copy);
		props.setData(copy);
	};

	return (
		<FeatureListEditPanel
			title='Minion Features'
			features={data.minionFeatures}
			sourcebooks={props.sourcebooks}
			onChange={onChange}
		/>
	);
};
