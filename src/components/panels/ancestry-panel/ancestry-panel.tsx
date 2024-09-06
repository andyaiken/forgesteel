import { Ancestry } from '../../../models/ancestry';

import './ancestry-panel.scss';

interface Props {
	ancestry: Ancestry
}

export const AncestryPanel = (props: Props) => {
	return (
		<div className='ancestry-panel'>
			<div className='header-text'>{props.ancestry.name}</div>
			<div className='description-text'>{props.ancestry.description}</div>
		</div>
	);
};
