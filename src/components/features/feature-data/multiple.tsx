import { Feature, FeatureMultipleData } from '@/models/feature';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureListEditPanel } from '@/components/panels/edit/feature-list-edit/feature-list-edit-panel';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureMultipleData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoMultiple = (props: InfoProps) => {
	if (props.data.features.length === 0) {
		return null;
	}

	if (props.feature.description) {
		return (
			<Expander title='Features'>
				{props.data.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} mode={PanelMode.Full} />)}
			</Expander>
		);
	}

	return (
		<div>
			{
				props.data.features.map(f => (
					<div key={f.id} className='container'>
						<FeaturePanel feature={f} options={props.options} mode={PanelMode.Full} />
					</div>
				))
			}
		</div>
	);
};

interface EditProps {
	data: FeatureMultipleData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureMultipleData) => void;
}

export const EditMultiple = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureMultipleData>(Utils.copy(props.data));

	const onChange = (features: Feature[]) => {
		const copy = Utils.copy(data);
		copy.features = Utils.copy(features);
		setData(copy);
		props.setData(copy);
	};

	return (
		<FeatureListEditPanel
			title='Features'
			features={data.features}
			sourcebooks={props.sourcebooks}
			options={props.options}
			onChange={onChange}
		/>
	);
};
