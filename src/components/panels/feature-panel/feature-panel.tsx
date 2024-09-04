import { Feature } from '../../../models/feature';

import './feature-panel.scss'

interface Props {
	feature: Feature
}

export const FeaturePanel = (props: Props) => {
	return (
		<div className='feature-panel'>
			{props.feature.name}
		</div>
	);
}
