import { Expander } from '@/components/controls/expander/expander';
import { FeatureFollowerData } from '@/models/feature';
import { Follower } from '@/models/follower';
import { FollowerEditPanel } from '@/components/panels/edit/follower-edit/follower-edit-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface EditProps {
	data: FeatureFollowerData;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureFollowerData) => void;
}

export const EditFollower = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureFollowerData>(Utils.copy(props.data));

	const setFollower = (value: Follower) => {
		const copy = Utils.copy(data) as FeatureFollowerData;
		copy.follower = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<div style={{ margin: '10px 0' }}>
			<Expander title={data.follower.name || 'Unnamed Follower'}>
				<FollowerEditPanel
					follower={data.follower}
					sourcebooks={props.sourcebooks}
					onChange={setFollower}
				/>
			</Expander>
		</div>
	);
};
